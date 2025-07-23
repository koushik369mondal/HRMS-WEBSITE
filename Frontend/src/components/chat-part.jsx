import React, { useState, useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Only Bootstrap CSS here
import { Modal, Dropdown, Form } from 'react-bootstrap'; // Import Bootstrap components from react-bootstrap
import './chat-part.css'; // Import your custom CSS (which now imports Bootstrap Icons)

// Import Picker from emoji-mart
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data'; // Emoji data

// --- Helper Functions ---
// Function to check if a message is editable (within 4 hours)
const isMessageEditable = (messageTimestamp) => {
  if (!messageTimestamp) return false;
  const messageTime = new Date(messageTimestamp).getTime();
  const currentTime = new Date().getTime();
  const fourHoursInMillis = 4 * 60 * 60 * 1000;
  return (currentTime - messageTime) <= fourHoursInMillis;
};

// Function to format time for display
const formatMessageTime = (isoTimestamp) => {
  const date = new Date(isoTimestamp);
  const now = new Date();
  const diffMillis = now.getTime() - date.getTime();
  const minutes = Math.floor(diffMillis / (1000 * 60));
  const hours = Math.floor(minutes / 60);

  if (minutes < 60) {
    return `${minutes}m ago`;
  } else if (hours < 24) {
    return `${hours}h ago`;
  } else {
    // Format as "Jul 17"
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
};

// --- Reusable Components ---

// Avatar Component for profile pictures
const Avatar = ({ src, alt, size = 'md', className = '' }) => {
  let avatarSizeClass = '';
  if (size === 'sm') avatarSizeClass = 'avatar-sm'; // Small for group avatars
  if (size === 'md') avatarSizeClass = 'avatar-md'; // Medium for chat list
  if (size === 'lg') avatarSizeClass = 'avatar-lg'; // Large for main profile

  return (
    <img
      src={src || 'https://placehold.co/50x50/cccccc/000000?text=P'} // Placeholder if no src
      alt={alt}
      className={`rounded-circle ${avatarSizeClass} ${className} border border-light`}
      style={{ objectFit: 'cover' }} // Ensure image covers the circle
    />
  );
};

// ChatListItem Component
const ChatListItem = ({ chat, onSelectChat, isActive, onTogglePin, handleArchiveChat, handleUnarchiveChat }) => {
  const lastMessage = chat.messages.length > 0 ? chat.messages[chat.messages.length - 1] : null;
  const lastMessageTime = lastMessage ? formatMessageTime(lastMessage.timestamp) : '';

  return (
    <li
      className={`list-group-item list-group-item-action py-3 px-3 d-flex align-items-center ${isActive ? 'active-chat' : ''}`}
      onClick={() => onSelectChat(chat.id)}
      style={{ cursor: 'pointer' }}
    >
      <Avatar src={chat.profileSrc} alt={chat.name} size="md" className="me-3" />
      <div className="flex-grow-1">
        <div className="d-flex justify-content-between align-items-center">
          <h6 className="mb-0 text-truncate chat-list-name" style={{ maxWidth: '150px' }}>
            {chat.name}
            {chat.isPinned && <i className="bi bi-pin-fill ms-2 small-icon text-muted"></i>}
          </h6>
          <small className="text-muted chat-list-time">{lastMessageTime}</small>
        </div>
        <p className="mb-0 text-muted text-truncate small chat-list-last-message" style={{ maxWidth: '200px' }}>
          {lastMessage ? lastMessage.text : 'No messages yet.'}
        </p>
      </div>
      {/* Dropdown for chat actions - Removed 'no-arrow' to show default Bootstrap arrow */}
      <Dropdown align="end" onClick={(e) => e.stopPropagation()}> {/* Stop propagation to prevent selecting chat */}
        <Dropdown.Toggle as="button" variant="link" className="btn btn-sm text-muted custom-dropdown-toggle chat-list-dropdown-toggle">
          <i className="bi bi-three-dots-vertical"></i>
        </Dropdown.Toggle>
        <Dropdown.Menu className="shadow-sm">
          <Dropdown.Item onClick={() => onTogglePin(chat.id)}>
            <i className={`bi ${chat.isPinned ? 'bi-pin-angle-fill' : 'bi-pin-angle'} me-2`}></i>
            {chat.isPinned ? 'Unpin Chat' : 'Pin Chat'}
          </Dropdown.Item>
          {/* Archive/Unarchive option */}
          {!chat.isArchived ? (
            <Dropdown.Item onClick={() => handleArchiveChat(chat.id)}>
              <i className="bi bi-archive me-2"></i> Archive Chat
            </Dropdown.Item>
          ) : (
            <Dropdown.Item onClick={() => handleUnarchiveChat(chat.id)}>
              <i className="bi bi-arrow-counterclockwise me-2"></i> Unarchive Chat
            </Dropdown.Item>
          )}
          <Dropdown.Item className="text-danger" onClick={() => console.log('Delete Chat clicked for', chat.name)}>
            <i className="bi bi-trash me-2"></i> Delete Chat
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </li>
  );
};

// MessageBubble Component
const MessageBubble = ({ message, isMine, isSelected, onToggleSelect, onStarMessage, onEditMessage, onDeleteMessage, isMultiSelectMode, onReplyMessage, onForwardMessage, isGroupChat }) => {
  // Use CSS classes to control colors based on isMine
  const bubbleClass = isMine ? 'bubble-mine ms-auto' : 'bubble-other';
  const timestampClass = isMine ? 'text-white-50' : 'text-muted'; // Text color for timestamp

  const [showEditInput, setShowEditInput] = useState(false);
  const [editedText, setEditedText] = useState(message.text);
  const isEditable = isMessageEditable(message.timestamp);

  const handleSaveEdit = () => {
    if (editedText.trim() !== '' && editedText !== message.text) {
      onEditMessage(message.id, editedText.trim());
    }
    setShowEditInput(false);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      onDeleteMessage(message.id);
    }
  };

  return (
    <div
      className={`message-bubble d-flex align-items-end mb-2 p-2 rounded-3 shadow-sm ${bubbleClass} ${isSelected ? 'selected-bubble' : ''} ${isMultiSelectMode ? 'multi-select-mode' : ''}`}
    >
      {isMultiSelectMode && (
        <div className="form-check me-2 mb-auto">
          <input
            className="form-check-input"
            type="checkbox"
            checked={isSelected}
            onChange={() => onToggleSelect(message.id)}
            onClick={(e) => e.stopPropagation()} // Prevent bubble click when clicking checkbox
          />
        </div>
      )}

      <div className="flex-grow-1">
        {isGroupChat && !isMine && ( // Display sender name for others' messages in group chats
            <small className="message-sender-name mb-1 d-block fw-bold" style={{ color: 'var(--custom-secondary-purple)' }}>
                {message.sender}
            </small>
        )}
        {message.repliedToId && (
            <div className="replied-to-preview p-1 mb-1 rounded">
                <small className="text-muted">Replying to {message.repliedToSender}: </small>
                <small className="text-muted fst-italic">{message.repliedToText.substring(0, 30)}{message.repliedToText.length > 30 ? '...' : ''}</small>
            </div>
        )}
        {message.forwardedFromId && (
            <div className="forwarded-from-preview p-1 mb-1 rounded">
                <small className="text-muted">Forwarded from {message.forwardedFromSender}: </small>
                <small className="text-muted fst-italic">{message.forwardedFromText.substring(0, 30)}{message.forwardedFromText.length > 30 ? '...' : ''}</small>
            </div>
        )}
        {showEditInput ? (
          <div className="d-flex align-items-center">
            <input
              type="text"
              className="form-control form-control-sm me-2"
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSaveEdit()}
              onBlur={handleSaveEdit} // Save on blur
              autoFocus
            />
            <button className="btn btn-sm btn-primary" onClick={handleSaveEdit}>
              <i className="bi bi-check"></i>
            </button>
          </div>
        ) : (
          <p className="mb-1">{message.text}</p>
        )}
        <div className="d-flex justify-content-end align-items-center">
          {message.isEdited && <small className={`me-2 ${timestampClass}`} style={{ fontSize: '0.75em' }}>Edited</small>}
          {message.isStarred && <i className={`bi bi-star-fill me-2 ${timestampClass}`} style={{ fontSize: '0.75em' }}></i>}
          <small className={timestampClass} style={{ fontSize: '0.75em' }}>{formatMessageTime(message.timestamp)}</small>
          {/* Message Status Dot - Assuming 'isSeen' property on message object */}
          {isMine && (
            <span className={`ms-1 status-dot ${message.isSeen ? 'bg-success' : 'bg-secondary'}`}></span>
          )}
        </div>
      </div>

      {/* Message Bubble Dropdown - Now placed outside the flex-grow-1 div, at the end of the bubble */}
      <Dropdown align="end" className="message-bubble-dropdown" onClick={(e) => e.stopPropagation()}>
        <Dropdown.Toggle as="button" variant="link" className="btn btn-sm custom-dropdown-toggle message-bubble-dropdown-toggle">
          <i className="bi bi-three-dots-vertical"></i> {/* Changed to vertical dots for better visibility */}
        </Dropdown.Toggle>
        <Dropdown.Menu className="shadow-sm">
          <Dropdown.Item onClick={() => onStarMessage(message.id)}>
            <i className={`bi ${message.isStarred ? 'bi-star-fill' : 'bi-star'} me-2`}></i>
            {message.isStarred ? 'Unstar Message' : 'Star Message'}
          </Dropdown.Item>
          <Dropdown.Item onClick={() => onReplyMessage(message)}>
            <i className="bi bi-reply me-2"></i> Reply
          </Dropdown.Item>
          <Dropdown.Item onClick={() => onForwardMessage(message)}>
            <i className="bi bi-arrow-right me-2"></i> Forward
          </Dropdown.Item>
          <Dropdown.Item onClick={() => document.execCommand('copy').then(() => alert('Message copied!'))}>
            <i className="bi bi-copy me-2"></i> Copy
          </Dropdown.Item>
          <Dropdown.Item onClick={() => onToggleSelect(message.id)}>
            <i className="bi bi-check-square me-2"></i> Select
          </Dropdown.Item>
          {isMine && isEditable && ( // Only show edit if mine and editable (within 4 hours)
            <Dropdown.Item onClick={() => setShowEditInput(true)}>
              <i className="bi bi-pencil me-2"></i> Edit Message
            </Dropdown.Item>
          )}
          {isMine && ( // Only show delete if mine
            <Dropdown.Item className="text-danger" onClick={handleDelete}>
              <i className="bi bi-trash me-2"></i> Delete Message
            </Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

// Main App Component
function App() {
  const [chats, setChats] = useState([
    {
      id: 'chat1',
      name: 'Alice Smith',
      profileSrc: 'https://placehold.co/50x50/ADD8E6/000000?text=AS',
      isOnline: true,
      isPinned: false,
      isArchived: false,
      type: 'individual', // New: chat type
      messages: [
        { id: 'msg1', text: 'Hey there! How are you?', sender: 'Alice Smith', timestamp: '2025-07-17T10:00:00Z', isMine: false, isStarred: false, isEdited: false, isSeen: true },
        { id: 'msg2', text: 'I am doing great, thanks for asking!', sender: 'You', timestamp: '2025-07-17T10:01:00Z', isMine: true, isStarred: false, isEdited: false, isSeen: true },
        { id: 'msg3', text: 'Are we still on for the meeting tomorrow?', sender: 'Alice Smith', timestamp: '2025-07-17T10:05:00Z', isMine: false, isStarred: true, isEdited: false, isSeen: true },
        { id: 'msg9', text: 'This is a longer message to test scrolling and wrapping within the bubble. It should wrap nicely and the dropdown icon should remain visible.', sender: 'Alice Smith', timestamp: '2025-07-17T10:10:00Z', isMine: false, isStarred: false, isEdited: false, isSeen: true },
        { id: 'msg10', text: 'Another message from me to test the dropdown on my side.', sender: 'You', timestamp: '2025-07-17T10:11:00Z', isMine: true, isStarred: false, isEdited: false, isSeen: false },
      ],
    },
    {
      id: 'chat2',
      name: 'Bob Johnson',
      profileSrc: 'https://placehold.co/50x50/90EE90/000000?text=BJ',
      isOnline: false,
      isPinned: true,
      isArchived: false,
      type: 'individual',
      messages: [
        { id: 'msg4', text: 'Don\'t forget to submit the report.', sender: 'Bob Johnson', timestamp: '2025-07-16T15:30:00Z', isMine: false, isStarred: false, isEdited: false, isSeen: true },
        { id: 'msg5', text: 'Got it! Will do by EOD.', sender: 'You', timestamp: '2025-07-16T15:35:00Z', isMine: true, isStarred: false, isEdited: false, isSeen: false }, // Not seen
      ],
    },
    {
      id: 'chat3',
      name: 'Development Team',
      profileSrc: 'https://placehold.co/50x50/B0C4DE/000000?text=Dev',
      isOnline: true, // For group, this might represent active members or just general status
      isPinned: false,
      isArchived: false,
      type: 'group', // New: chat type
      members: ['You', 'Alice Smith', 'Bob Johnson', 'Charlie Brown'], // New: members for group chat
      messages: [
        { id: 'msg6', text: 'Daily standup at 10 AM?', sender: 'Alice Smith', timestamp: '2025-07-17T09:00:00Z', isMine: false, isStarred: false, isEdited: false, isSeen: true },
        { id: 'msg7', text: 'Sounds good to me!', sender: 'You', timestamp: '2025-07-17T09:02:00Z', isMine: true, isStarred: false, isEdited: false, isSeen: true },
        { id: 'msg8', text: 'I might be a few minutes late.', sender: 'Bob Johnson', timestamp: '2025-07-17T09:05:00Z', isMine: false, isStarred: false, isEdited: false, isSeen: true },
      ],
    },
    {
      id: 'chat4',
      name: 'Project Alpha',
      profileSrc: 'https://placehold.co/50x50/D2B48C/000000?text=PA',
      isOnline: true,
      isPinned: false,
      isArchived: false,
      type: 'group',
      members: ['You', 'Alice Smith', 'Charlie Brown'],
      messages: [
        { id: 'msg11', text: 'Remember the deadline is next Friday.', sender: 'You', timestamp: '2025-07-16T11:00:00Z', isMine: true, isStarred: false, isEdited: false, isSeen: true },
        { id: 'msg12', text: 'Got it. Working on the final review.', sender: 'Charlie Brown', timestamp: '2025-07-16T11:05:00Z', isMine: false, isStarred: false, isEdited: false, isSeen: true },
      ],
    },
    {
      id: 'chat5',
      name: 'Marketing Team',
      profileSrc: 'https://placehold.co/50x50/AFEEEE/000000?text=MT',
      isOnline: false,
      isPinned: false,
      isArchived: false,
      type: 'group',
      members: ['You', 'Diana Prince', 'Clark Kent'],
      messages: [
        { id: 'msg13', text: 'New campaign ideas needed by end of day.', sender: 'Diana Prince', timestamp: '2025-07-15T14:00:00Z', isMine: false, isStarred: false, isEdited: false, isSeen: true },
      ],
    },
  ]);

  const [activeChatId, setActiveChatId] = useState(chats[0]?.id || null);
  const [currentMessage, setCurrentMessage] = useState('');
  const [multiSelectMode, setMultiSelectMode] = useState(false);
  const [selectedMessages, setSelectedMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const [connectionRequests, setConnectionRequests] = useState([
    { id: 'req1', name: 'Diana Prince', profileSrc: 'https://placehold.co/50x50/DDA0DD/000000?text=DP', status: 'pending' },
    { id: 'req2', name: 'Clark Kent', profileSrc: 'https://placehold.co/50x50/F0E68C/000000?text=CK', status: 'pending' },
  ]);

  const [starredMessages, setStarredMessages] = useState([]);
  const [showStarredMessagesModal, setShowStarredMessagesModal] = useState(false);
  const [showConnectionRequestsModal, setShowConnectionRequestsModal] = useState(false);
  const [showArchivedChatsModal, setShowArchivedChatsModal] = useState(false);
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false); // New state for group modal
  const [newGroupName, setNewGroupName] = useState(''); // State for new group name
  const [selectedGroupMembers, setSelectedGroupMembers] = useState([]); // State for selected members

  // States for reply and forward functionality
  const [replyingTo, setReplyingTo] = useState(null); // Stores the message object being replied to
  const [forwardingMessage, setForwardingMessage] = useState(null); // Stores the message object being forwarded
  const [showForwardModal, setShowForwardModal] = useState(false); // For selecting chats to forward to
  const [forwardTargetChats, setForwardTargetChats] = useState([]); // Chats selected for forwarding

  // State for sidebar visibility (for mobile responsiveness)
  const [isMainSidebarOpen, setIsMainSidebarOpen] = useState(true); // Leftmost empty sidebar
  const [isChatMenuOpen, setIsChatMenuOpen] = useState(true); // Chat list sidebar (now toggleable with chat window)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false); // State for emoji picker visibility


  const activeChat = chats.find(chat => chat.id === activeChatId);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'auto' }); // Changed to 'auto' for faster scrolling
  }, [activeChat?.messages]);

  const sortedChats = [...chats].sort((a, b) => {
    // Pinned chats first (only unarchived)
    const isAPinned = a.isPinned && !a.isArchived;
    const isBPinned = b.isPinned && !b.isArchived;

    if (isAPinned && !isBPinned) return -1;
    if (!isAPinned && isBPinned) return 1;

    // Then online chats (only unarchived, for individuals) or active groups
    const isAOnline = a.isOnline && !a.isArchived;
    const isBOnline = b.isOnline && !b.isArchived;

    if (isAOnline && !isBOnline) return -1;
    if (!isAOnline && isBOnline) return 1;

    // Finally, by most recent message (latest timestamp first)
    const lastMessageA = a.messages.length > 0 ? a.messages[a.messages.length - 1] : { timestamp: '1970-01-01T00:00:00Z' };
    const lastMessageB = b.messages.length > 0 ? b.messages[b.messages.length - 1] : { timestamp: '1970-01-01T00:00:00Z' };
    return new Date(lastMessageB.timestamp) - new Date(lastMessageA.timestamp);
  });

  const handleReplyMessage = (message) => {
    setReplyingTo(message);
    setForwardingMessage(null); // Ensure only one mode is active
    setCurrentMessage(''); // Clear input for new reply
  };

  const handleForwardMessage = (message) => {
    setForwardingMessage(message);
    setReplyingTo(null); // Ensure only one mode is active
    setShowForwardModal(true); // Open modal to select chats
  };

  const handleClearReplyForward = () => {
    setReplyingTo(null);
    setForwardingMessage(null);
  };

  const handleSendMessage = () => {
    if (currentMessage.trim() === '' || !activeChatId) return;

    let newMessage = {
      id: Date.now().toString(), // Simple unique ID
      text: currentMessage.trim(),
      sender: 'You', // Assuming 'You' is the sender for the current user
      timestamp: new Date().toISOString(),
      isMine: true,
      isStarred: false,
      isEdited: false,
      isSeen: false, // Default for sent messages
    };

    if (replyingTo) {
      newMessage.repliedToId = replyingTo.id;
      newMessage.repliedToSender = replyingTo.sender;
      newMessage.repliedToText = replyingTo.text;
    }
    if (forwardingMessage) {
      newMessage.forwardedFromId = forwardingMessage.id;
      newMessage.forwardedFromSender = forwardingMessage.sender;
      newMessage.forwardedFromText = forwardingMessage.text;
    }

    setChats(prevChats =>
      prevChats.map(chat =>
        chat.id === activeChatId
          ? { ...chat, messages: [...chat.messages, newMessage] }
          : chat
      )
    );
    setCurrentMessage('');
    handleClearReplyForward(); // Clear reply/forward mode after sending
    setShowEmojiPicker(false); // Hide emoji picker after sending
  };

  const handleForwardToSelectedChats = () => {
    if (!forwardingMessage || forwardTargetChats.length === 0) {
      alert("Please select a message and at least one chat to forward to.");
      return;
    }

    const forwardedMsgContent = {
      id: Date.now().toString(),
      text: forwardingMessage.text,
      sender: 'You', // Sender of the forwarded message is 'You'
      timestamp: new Date().toISOString(),
      isMine: true,
      isStarred: false,
      isEdited: false,
      isSeen: false,
      forwardedFromId: forwardingMessage.id,
      forwardedFromSender: forwardingMessage.sender,
      forwardedFromText: forwardingMessage.text,
    };

    setChats(prevChats =>
      prevChats.map(chat => {
        if (forwardTargetChats.includes(chat.id)) {
          return {
            ...chat,
            messages: [...chat.messages, forwardedMsgContent],
          };
        }
        return chat;
      })
    );

    alert(`Message forwarded to ${forwardTargetChats.length} chat(s)!`);
    setForwardingMessage(null);
    setForwardTargetChats([]);
    setShowForwardModal(false);
  };


  const handleEditMessage = (messageId, newText) => {
    setChats(prevChats =>
      prevChats.map(chat =>
        chat.id === activeChatId
          ? {
              ...chat,
              messages: chat.messages.map(msg =>
                msg.id === messageId ? { ...msg, text: newText, isEdited: true } : msg
              ),
            }
          : chat
      )
    );
  };

  const handleDeleteMessage = (messageId) => {
    setChats(prevChats =>
      prevChats.map(chat =>
        chat.id === activeChatId
          ? {
              ...chat,
              messages: chat.messages.filter(msg => !selectedMessages.includes(msg.id)), // Filter out selected messages
            }
          : chat
      )
    );
    setSelectedMessages(prevSelected => prevSelected.filter(id => id !== messageId)); // Also remove from selected list
  };

  const handleStarMessage = (messageId) => {
    setChats(prevChats => {
      let updatedStarredMessages = [...starredMessages];
      const updatedChats = prevChats.map(chat => ({
        ...chat,
        messages: chat.messages.map(msg => {
          if (msg.id === messageId) {
            const updatedMsg = { ...msg, isStarred: !msg.isStarred };
            if (updatedMsg.isStarred) {
              updatedStarredMessages.push({
                chatId: chat.id,
                chatName: chat.name,
                profileSrc: chat.profileSrc,
                messageId: updatedMsg.id,
                text: updatedMsg.text,
                sender: updatedMsg.sender,
                timestamp: updatedMsg.timestamp
              });
            } else {
              updatedStarredMessages = updatedStarredMessages.filter(starred => starred.messageId !== updatedMsg.id);
            }
            return updatedMsg;
          }
          return msg;
        }),
      }));
      setStarredMessages(updatedStarredMessages);
      return updatedChats;
    });
  };

  const handleTogglePin = (chatId) => {
    setChats(prevChats => prevChats.map(chat => chat.id === chatId ? { ...chat, isPinned: !chat.isPinned } : chat ) );
  };

  const handleArchiveChat = (chatId) => {
    setChats(prevChats => prevChats.map(chat => chat.id === chatId ? { ...chat, isArchived: true, isPinned: false } : chat ) );
    if (activeChatId === chatId) {
      setActiveChatId(null); // Deselect chat if it's archived
    }
  };

  const handleUnarchiveChat = (chatId) => {
    setChats(prevChats => prevChats.map(chat => chat.id === chatId ? { ...chat, isArchived: false } : chat ) );
  };

  const handleAttachmentClick = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        alert(`Attachment selected: ${file.name}`);
      }
    };
    fileInput.click();
  };

  const handleAcceptRequest = (requestId) => {
    setConnectionRequests(prevRequests => prevRequests.map(req => req.id === requestId ? { ...req, status: 'accepted' } : req ) );
    const acceptedRequest = connectionRequests.find(req => req.id === requestId);
    if (acceptedRequest) {
      setChats(prevChats => [
        ...prevChats,
        {
          id: `chat-${requestId}`,
          name: acceptedRequest.name,
          profileSrc: acceptedRequest.profileSrc,
          isOnline: true,
          isPinned: false,
          isArchived: false, // Newly accepted chats are not archived
          type: 'individual', // Accepted request is an individual chat
          messages: [{ id: Date.now().toString(), text: `Hello ${acceptedRequest.name}!`, sender: acceptedRequest.name, timestamp: new Date().toISOString(), isMine: false, isStarred: false, isEdited: false, isSeen: false }],
        },
      ]);
    }
  };

  const handleDeclineRequest = (requestId) => {
    setConnectionRequests(prevRequests => prevRequests.map(req => req.id === requestId ? { ...req, status: 'declined' } : req ) );
  };

  const handleToggleMultiSelectMode = () => {
    setMultiSelectMode(prevMode => !prevMode);
    setSelectedMessages([]); // Clear selection when toggling mode
  };

  const handleToggleMessageSelect = (messageId) => {
    setSelectedMessages(prevSelected => prevSelected.includes(messageId) ? prevSelected.filter(id => id !== messageId) : [...prevSelected, messageId] );
  };

  const handleDeleteSelectedMessages = () => {
    if (selectedMessages.length === 0) return;
    if (window.confirm(`Are you sure you want to delete ${selectedMessages.length} selected messages?`)) {
      setChats(prevChats => prevChats.map(chat => {
        if (chat.id === activeChatId) {
          return {
            ...chat,
            messages: chat.messages.filter(msg => !selectedMessages.includes(msg.id))
          };
        }
        return chat;
      }));
      setSelectedMessages([]);
      setMultiSelectMode(false); // Exit multi-select mode after action
    }
  };

  const handleCopySelectedMessages = () => {
    if (selectedMessages.length === 0) return;
    const messagesToCopy = activeChat.messages
      .filter(msg => selectedMessages.includes(msg.id))
      .map(msg => msg.text)
      .join('\n');
    navigator.clipboard.writeText(messagesToCopy);
    alert('Selected messages copied to clipboard!');
    setSelectedMessages([]);
    setMultiSelectMode(false); // Exit multi-select mode after action
  };

  const handleStarSelectedMessages = () => {
    if (selectedMessages.length === 0) return;

    setChats(prevChats => {
      let updatedStarredMessages = [...starredMessages];
      const updatedChats = prevChats.map(chat => ({
        ...chat,
        messages: chat.messages.map(msg => {
          if (selectedMessages.includes(msg.id) && !msg.isStarred) {
            const updatedMsg = { ...msg, isStarred: true };
            updatedStarredMessages.push({
              chatId: chat.id,
              chatName: chat.name,
              profileSrc: chat.profileSrc,
              messageId: updatedMsg.id,
              text: updatedMsg.text,
              sender: updatedMsg.sender,
              timestamp: updatedMsg.timestamp
            });
            return updatedMsg;
          }
          return msg;
        }),
      }));
      setStarredMessages(updatedStarredMessages);
      return updatedChats;
    });

    alert('Selected messages starred!');
    setSelectedMessages([]);
    setMultiSelectMode(false); // Exit multi-select mode after action
  };

  // Function to toggle selection of a chat for forwarding
  const handleToggleForwardChatSelection = (chatId) => {
    setForwardTargetChats(prevSelected =>
      prevSelected.includes(chatId)
        ? prevSelected.filter(id => id !== chatId)
        : [...prevSelected, chatId]
    );
  };

  const handleCreateGroup = () => {
    if (newGroupName.trim() === '') {
      alert('Please enter a group name.');
      return;
    }
    if (selectedGroupMembers.length === 0) {
      alert('Please select at least one member for the group.');
      return;
    }

    const newGroupId = `group-${Date.now()}`;
    const newGroup = {
      id: newGroupId,
      name: newGroupName.trim(),
      profileSrc: 'https://placehold.co/50x50/B0C4DE/000000?text=NewG', // Generic group avatar
      isOnline: true, // For groups, might represent active status
      isPinned: false,
      isArchived: false,
      type: 'group',
      members: ['You', ...selectedGroupMembers.map(memberId => {
        const memberChat = chats.find(c => c.id === memberId);
        return memberChat ? memberChat.name : ''; // Get name, handle if not found
      }).filter(Boolean)], // Filter out any empty strings from map
      messages: [{ id: Date.now().toString(), text: `Welcome to ${newGroupName}!`, sender: 'You', timestamp: new Date().toISOString(), isMine: true, isStarred: false, isEdited: false, isSeen: true }],
    };

    setChats(prevChats => [...prevChats, newGroup]);
    setNewGroupName('');
    setSelectedGroupMembers([]);
    setShowCreateGroupModal(false);
    setActiveChatId(newGroupId); // Automatically open the new group chat
  };

  // Filter out existing group chats and archived individual chats from available members
  const availableMembersForGroup = chats.filter(chat => chat.type === 'individual' && !chat.isArchived);

  const handleEmojiSelect = (emoji) => {
    setCurrentMessage(prevMessage => prevMessage + emoji.native);
  };


  return (
    <div className="container-fluid h-100 p-0">
      <div className="row g-0 h-100">
        {/* Main Empty Sidebar (Leftmost) */}
        <div className={`col-auto custom-empty-sidebar-bg d-flex flex-column h-100 py-3
          ${isMainSidebarOpen ? 'expanded-sidebar' : 'collapsed-sidebar'}`}>
          <div className="d-flex justify-content-center mb-4">
            <button
              className="btn btn-link text-white toggle-sidebar-btn"
              onClick={() => setIsMainSidebarOpen(!isMainSidebarOpen)}
              title={isMainSidebarOpen ? 'Collapse Sidebar' : 'Expand Sidebar'}
            >
              <i className={`bi bi-arrow-${isMainSidebarOpen ? 'left' : 'right'}-circle-fill fs-4`}></i>
            </button>
          </div>
          {/* Add more icons or content here if sidebar is expanded */}
          {isMainSidebarOpen && (
            <div className="flex-grow-1 text-center text-white-50 small">
              {/* Optional: Add profile pic, name, and more options here */}
              <p>User Profile</p>
              <i className="bi bi-person-circle fs-1 mb-2"></i>
              <p>Horilla Chat</p>
            </div>
          )}
        </div>

        {/* Chat Menu (Chat List - Middle Column) */}
        <div className={`col-12 col-md-4 col-lg-3 custom-chat-menu-bg p-3 d-flex flex-column h-100
          ${isChatMenuOpen ? '' : 'd-none'} d-md-flex`} // Responsive visibility: d-md-flex ensures it's always flex on md+
        >
          {/* Top Padding / Visual Space */}
          <div className="chat-menu-top-padding"></div> {/* Added this div for consistent top space */}

          {/* Chat Menu Header with Search and Buttons */}
          <div className="d-flex flex-column mb-3">
            <h4 className="text-dark-gray mb-3">Chats</h4> {/* Changed to text-dark-gray */}
            {/* Starred, Requests, Archived Buttons side-by-side */}
            <div className="d-flex justify-content-between align-items-center mb-3">
              <button
                className="btn btn-sm btn-link text-dark-gray d-flex align-items-center chat-menu-action-btn"
                onClick={() => setShowStarredMessagesModal(true)}
                title="View Starred Messages"
              >
                <i className="bi bi-star-fill me-1"></i> Starred
              </button>
              <button
                className="btn btn-sm btn-link text-dark-gray position-relative d-flex align-items-center chat-menu-action-btn"
                onClick={() => setShowConnectionRequestsModal(true)}
                title="Connection Requests"
              >
                <i className="bi bi-person-plus-fill me-1"></i> Requests
                {connectionRequests.filter(req => req.status === 'pending').length > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {connectionRequests.filter(req => req.status === 'pending').length}
                    <span className="visually-hidden">unread requests</span>
                  </span>
                )}
              </button>
              <button
                className="btn btn-sm btn-link text-dark-gray d-flex align-items-center chat-menu-action-btn"
                onClick={() => setShowArchivedChatsModal(true)}
                title="View Archived Chats"
              >
                <i className="bi bi-archive-fill me-1"></i> Archived
              </button>
            </div>
            {/* New Group Button */}
            <button
              className="btn btn-primary btn-block mb-3" // Using Bootstrap's btn-primary
              onClick={() => setShowCreateGroupModal(true)}
            >
              <i className="bi bi-people-fill me-2"></i> Create New Group
            </button>
            {/* Search Bar */}
            <input type="text" className="form-control rounded-pill custom-input-field" placeholder="Search chats..." />
          </div>

          {/* Chat List */}
          <ul className="list-group list-group-flush custom-chat-list flex-grow-1 overflow-auto custom-scrollbar">
            {sortedChats.filter(chat => !chat.isArchived).map(chat => ( // Filter out archived chats
              <ChatListItem
                key={chat.id}
                chat={chat}
                onSelectChat={setActiveChatId}
                isActive={chat.id === activeChatId}
                onTogglePin={handleTogglePin}
                handleArchiveChat={handleArchiveChat}
                handleUnarchiveChat={handleUnarchiveChat}
              />
            ))}
          </ul>
        </div>

        {/* Chat Window (Rightmost Column) */}
        <div className={`col-12 col-md-8 col-lg-7 d-flex flex-column h-100 chat-window-column
          ${isChatMenuOpen ? 'd-none d-md-flex' : 'd-flex flex-grow-1'}`} // Adjust visibility based on chat menu
        >
          {activeChat ? (
            <>
              {/* Top Padding / Visual Space */}
              <div className="chat-window-top-padding"></div> {/* Added this div for consistent top space */}

              {/* Chat Header */}
              <div className="custom-secondary-bg text-white p-3 d-flex align-items-center shadow-sm chat-header-bottom-border"> {/* Added custom border class */}
                {/* Burger icon for mobile to open chat menu */}
                <button
                  className="btn btn-sm btn-link text-white d-md-none me-2"
                  onClick={() => setIsChatMenuOpen(true)}
                  title="Open Chats Menu"
                >
                  <i className="bi bi-list"></i>
                </button>
                <Avatar src={activeChat.profileSrc} alt={activeChat.name} size="md" className="me-3" />
                <div className="flex-grow-1">
                  <h5 className="mb-0 text-white">{activeChat.name}</h5>
                  {activeChat.type === 'individual' ? (
                    <small className="text-white-50">{activeChat.isOnline ? 'Online' : 'Offline'}</small>
                  ) : (
                    <small className="text-white-50">Group ({activeChat.members.length} members)</small>
                  )}
                </div>
                {/* Call and Screen Share Buttons */}
                <button className="btn btn-link text-white p-0 mx-2 fs-4" title="Start Call">
                  <i className="bi bi-telephone-fill"></i>
                </button>
                <button className="btn btn-link text-white p-0 mx-2 fs-4" title="Share Screen">
                  <i className="bi bi-display-fill"></i>
                </button>
                {/* Chat Header Dropdown */}
                <Dropdown align="end">
                  <Dropdown.Toggle as="button" variant="link" className="btn btn-sm text-white custom-dropdown-toggle no-arrow">
                    <i className="bi bi-three-dots-vertical"></i>
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="shadow-sm">
                    <Dropdown.Item onClick={() => console.log('View Contact clicked')}>
                      <i className="bi bi-person-circle me-2"></i> View {activeChat.type === 'individual' ? 'Contact' : 'Group Info'}
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => console.log('Mute Notifications clicked')}>
                      <i className="bi bi-bell-slash me-2"></i> Mute Notifications
                    </Dropdown.Item>
                    {activeChat.type === 'group' && (
                        <Dropdown.Item className="text-danger" onClick={() => console.log('Leave Group clicked')}>
                            <i className="bi bi-box-arrow-right me-2"></i> Leave Group
                        </Dropdown.Item>
                    )}
                    <Dropdown.Item className="text-danger" onClick={() => console.log('Clear Chat clicked')}>
                      <i className="bi bi-trash me-2"></i> Clear Chat
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handleToggleMultiSelectMode}>
                        <i className="bi bi-check-square me-2"></i> Select Messages
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>

              {/* Multi-Select Actions Bar - Positioned below chat header */}
              {multiSelectMode && (
                <div className="multi-select-actions d-flex justify-content-between align-items-center p-3 shadow-sm">
                  <span className="text-dark-gray">{selectedMessages.length} selected</span>
                  <div>
                    <button className="btn btn-danger me-2" onClick={handleDeleteSelectedMessages} disabled={selectedMessages.length === 0}>
                      <i className="bi bi-trash me-2"></i> Delete
                    </button>
                    <button className="btn btn-primary me-2" onClick={handleCopySelectedMessages} disabled={selectedMessages.length === 0}>
                        <i className="bi bi-copy me-2"></i> Copy
                    </button>
                    <button className="btn btn-warning me-2" onClick={handleStarSelectedMessages} disabled={selectedMessages.length === 0}>
                        <i className="bi bi-star me-2"></i> Star
                    </button>
                    <button className="btn btn-info me-2" onClick={() => {
                        if (selectedMessages.length > 0) {
                            // For simplicity, let's just take the first selected message for forwarding content
                            // In a real app, you might combine them or handle multiple forwards
                            const firstSelectedMessage = activeChat.messages.find(msg => msg.id === selectedMessages[0]);
                            if (firstSelectedMessage) {
                                handleForwardMessage(firstSelectedMessage);
                            }
                        }
                    }} disabled={selectedMessages.length === 0}>
                        <i className="bi bi-arrow-right me-2"></i> Forward
                    </button>
                    <button className="btn btn-secondary" onClick={handleToggleMultiSelectMode}>
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Message Area */}
              <div className="chat-messages flex-grow-1 p-3 overflow-auto custom-chat-window-bg custom-scrollbar">
                {activeChat.messages.map(message => (
                  <MessageBubble
                    key={message.id}
                    message={message}
                    isMine={message.isMine}
                    isSelected={selectedMessages.includes(message.id)}
                    onToggleSelect={handleToggleMessageSelect}
                    onStarMessage={handleStarMessage}
                    onEditMessage={handleEditMessage}
                    onDeleteMessage={handleDeleteMessage}
                    isMultiSelectMode={multiSelectMode}
                    onReplyMessage={handleReplyMessage}
                    onForwardMessage={handleForwardMessage}
                    isGroupChat={activeChat.type === 'group'} // Pass group chat status
                  />
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input Area */}
              <div className="message-input-area p-3 bg-white border-top shadow-sm">
                {/* Reply/Forward Bar */}
                {(replyingTo || forwardingMessage) && (
                  <div className="reply-edit-bar d-flex align-items-center p-2 mb-2 rounded border">
                    <div className="flex-grow-1">
                      {replyingTo && (
                        <small className="text-muted">Replying to: <strong>{replyingTo.text.substring(0, 50)}{replyingTo.text.length > 50 ? '...' : ''}</strong></small>
                      )}
                      {forwardingMessage && (
                        <small className="text-muted">Forwarding: <strong>{forwardingMessage.text.substring(0, 50)}{forwardingMessage.text.length > 50 ? '...' : ''}</strong></small>
                      )}
                    </div>
                    <button className="btn btn-sm btn-link text-dark-gray" onClick={handleClearReplyForward}>
                      <i className="bi bi-x-lg"></i>
                    </button>
                  </div>
                )}

                <div className="d-flex align-items-center">
                  <button className="btn btn-link text-dark-gray p-0 me-2 fs-4" title="Attach file" onClick={handleAttachmentClick}>
                    <i className="bi bi-paperclip"></i> {/* Confirmed: This is the clip icon */}
                  </button>
                  {/* Emoji Icon and Picker */}
                  <div style={{ position: 'relative' }}>
                    <button className="btn btn-link text-dark-gray p-0 me-2 fs-4" title="Emojis" onClick={() => setShowEmojiPicker(prev => !prev)}>
                      <i className="bi bi-emoji-smile"></i>
                    </button>
                    {showEmojiPicker && (
                      <div className="emoji-picker-container"> {/* Added a container for styling */}
                        <Picker data={data} onEmojiSelect={handleEmojiSelect} theme="light" />
                      </div>
                    )}
                  </div>

                  <input
                    type="text"
                    className="form-control me-2 rounded-pill custom-input-field"
                    placeholder="Type a message..."
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleSendMessage();
                      }
                    }}
                  />
                  <button
                    className="btn custom-send-btn rounded-circle p-2"
                    onClick={handleSendMessage}
                  >
                    <i className="bi bi-send-fill fs-5"></i> {/* Confirmed: This is the paper rocket icon */}
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="d-flex justify-content-center align-items-center flex-grow-1 bg-white rounded-3 shadow-sm">
              <p className="text-muted fs-5">Select a chat to start messaging.</p>
            </div>
          )}
        </div>
      </div>

      {/* Modals for Starred Messages, Connection Requests, Archived Chats, Forward, and New Group */}
      {/* Starred Messages Modal */}
      <Modal show={showStarredMessagesModal} onHide={() => setShowStarredMessagesModal(false)} centered>
        <Modal.Header className="custom-secondary-bg text-white" closeButton closeVariant="white">
          <Modal.Title><i className="bi bi-star-fill me-2"></i> Starred Messages</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-dark-gray custom-scrollbar">
          {starredMessages.length === 0 ? (
            <p className="text-center text-muted">No starred messages yet.</p>
          ) : (
            <ul className="list-unstyled">
              {starredMessages.map(msg => (
                <li key={msg.messageId} className="mb-3 p-2 border-bottom">
                  <div className="d-flex align-items-center mb-1">
                    <Avatar src={msg.profileSrc} alt={msg.chatName} size="sm" className="me-2" />
                    <strong className="me-2">{msg.chatName} ({msg.sender})</strong>
                    <small className="text-muted">{new Date(msg.timestamp).toLocaleString()}</small>
                  </div>
                  <p className="mb-0">{msg.text}</p>
                </li>
              ))}
            </ul>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button type="button" className="btn btn-secondary" onClick={() => setShowStarredMessagesModal(false)}>Close</button>
        </Modal.Footer>
      </Modal>

      {/* Connection Requests Modal */}
      <Modal show={showConnectionRequestsModal} onHide={() => setShowConnectionRequestsModal(false)} centered>
        <Modal.Header className="custom-secondary-bg text-white" closeButton closeVariant="white">
          <Modal.Title><i className="bi bi-person-plus-fill me-2"></i> Connection Requests</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-dark-gray requests-modal-body custom-scrollbar">
          {connectionRequests.filter(req => req.status === 'pending').length === 0 ? (
            <p className="text-center text-muted">No pending connection requests at the moment.</p>
          ) : (
            <ul className="list-unstyled">
              {connectionRequests.map(req => (
                <li key={req.id} className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
                  <div className="d-flex align-items-center">
                    <Avatar src={req.profileSrc} alt={req.name} size="sm" className="me-3" />
                    <strong className="text-dark-gray">{req.name}</strong>
                  </div>
                  <div className="d-flex">
                    {req.status === 'pending' && (
                      <>
                        <button className="btn btn-success btn-sm me-2" onClick={() => handleAcceptRequest(req.id)}>
                          <i className="bi bi-check-lg"></i> Accept
                        </button>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDeclineRequest(req.id)}>
                          <i className="bi bi-x-lg"></i> Decline
                        </button>
                      </>
                    )}
                    {req.status === 'accepted' && (
                      <span className="text-success small">Accepted <i className="bi bi-check-circle-fill"></i></span>
                    )}
                    {req.status === 'declined' && (
                      <span className="text-danger small">Declined <i className="bi bi-x-circle-fill"></i></span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button type="button" className="btn btn-secondary" onClick={() => setShowConnectionRequestsModal(false)}>Close</button>
        </Modal.Footer>
      </Modal>

      {/* Archived Chats Modal */}
      <Modal show={showArchivedChatsModal} onHide={() => setShowArchivedChatsModal(false)} centered>
        <Modal.Header className="custom-secondary-bg text-white" closeButton closeVariant="white">
          <Modal.Title><i className="bi bi-archive-fill me-2"></i> Archived Chats</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-dark-gray custom-scrollbar">
          {chats.filter(chat => chat.isArchived).length === 0 ? (
            <p className="text-center text-muted">No archived chats.</p>
          ) : (
            <ul className="list-unstyled">
              {chats.filter(chat => chat.isArchived).map(chat => (
                <li key={chat.id} className="d-flex justify-content-between align-items-center mb-3 p-2 border-bottom">
                  <div className="d-flex align-items-center">
                    <Avatar src={chat.profileSrc} alt={chat.name} size="sm" className="me-3" />
                    <strong className="text-dark-gray">{chat.name}</strong>
                  </div>
                  <div>
                    <button className="btn btn-sm btn-outline-primary" onClick={() => handleUnarchiveChat(chat.id)}>
                      <i className="bi bi-box-arrow-in-down-right me-1"></i> Unarchive
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button type="button" className="btn btn-secondary" onClick={() => setShowArchivedChatsModal(false)}>Close</button>
        </Modal.Footer>
      </Modal>

      {/* Forward Message Modal */}
      <Modal show={showForwardModal} onHide={() => setShowForwardModal(false)} centered>
        <Modal.Header className="custom-secondary-bg text-white" closeButton closeVariant="white">
          <Modal.Title><i className="bi bi-arrow-right me-2"></i> Forward Message</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-dark-gray custom-scrollbar">
          {forwardingMessage && (
            <div className="alert alert-info small mb-3">
              Forwarding: "<strong>{forwardingMessage.text.substring(0, 70)}{forwardingMessage.text.length > 70 ? '...' : ''}</strong>"
            </div>
          )}
          <h6>Select chats to forward to:</h6>
          <ul className="list-group">
            {chats.filter(chat => chat.id !== activeChatId && !chat.isArchived).map(chat => (
              <li key={chat.id} className="list-group-item d-flex align-items-center">
                <input
                  type="checkbox"
                  className="form-check-input me-3"
                  checked={forwardTargetChats.includes(chat.id)}
                  onChange={() => handleToggleForwardChatSelection(chat.id)}
                />
                <Avatar src={chat.profileSrc} alt={chat.name} size="sm" className="me-2" />
                {chat.name} {chat.type === 'group' && <span className="badge bg-info ms-1">Group</span>}
              </li>
            ))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <button type="button" className="btn btn-secondary" onClick={() => setShowForwardModal(false)}>Cancel</button>
          <button type="button" className="btn btn-primary" onClick={handleForwardToSelectedChats} disabled={forwardTargetChats.length === 0}>
            Forward ({forwardTargetChats.length})
          </button>
        </Modal.Footer>
      </Modal>

      {/* Create New Group Modal */}
      <Modal show={showCreateGroupModal} onHide={() => setShowCreateGroupModal(false)} centered>
        <Modal.Header className="custom-secondary-bg text-white" closeButton closeVariant="white">
          <Modal.Title><i className="bi bi-people-fill me-2"></i> Create New Group</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-dark-gray custom-scrollbar">
          <Form.Group className="mb-3">
            <Form.Label>Group Name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter group name"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Select Members:</Form.Label>
            <div className="members-selection-list">
              {availableMembersForGroup.length === 0 ? (
                <p className="text-muted">No available contacts to add.</p>
              ) : (
                <ul className="list-group">
                  {availableMembersForGroup.map(member => (
                    <li key={member.id} className="list-group-item d-flex align-items-center">
                      <Form.Check
                        type="checkbox"
                        id={`member-${member.id}`}
                        label={member.name}
                        checked={selectedGroupMembers.includes(member.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedGroupMembers(prev => [...prev, member.id]);
                          } else {
                            setSelectedGroupMembers(prev => prev.filter(id => id !== member.id));
                          }
                        }}
                      />
                      <Avatar src={member.profileSrc} alt={member.name} size="sm" className="ms-auto" />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <button type="button" className="btn btn-secondary" onClick={() => {
            setShowCreateGroupModal(false);
            setNewGroupName('');
            setSelectedGroupMembers([]);
          }}>Cancel</button>
          <button type="button" className="btn btn-primary" onClick={handleCreateGroup} disabled={newGroupName.trim() === '' || selectedGroupMembers.length === 0}>
            Create Group
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;
