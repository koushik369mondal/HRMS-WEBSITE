import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button, InputGroup, Form } from 'react-bootstrap';
import { ThreeDotsVertical, SendFill } from 'react-bootstrap-icons';

const styles = `
* {
    font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
    box-sizing: border-box;
}
/* ---------------------------------------
Sidebar CSS (Replace this when needed)
---------------------------------------- */
.sidebar {
    width: 15%;
    height: 100vh;
    background-color: #5a6cf3;
    color: white;
    display: flex;
    flex-direction: column;
    padding: 0px 15px;
    box-sizing: border-box;
    font-family: 'Segoe UI', sans-serif;
}

.logo-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 10px;
    text-align: center;
}

.logo {
    width: 200px;
    height: 100px;
    border-radius: 2px;
    margin-bottom: 5px;
}

.brand-name {
    font-size: 13px;
    font-weight: 600;
    color: #ffffff;
    line-height: 1.2;
}

.user-section {
    display: flex;
    align-items: center;
    background-color: #4a5cd4;
    border-radius: 8px;
    padding: 10px;
    margin-bottom: 30px;
}

.profile-pic {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 10px;
}

.user-details {
    display: flex;
    flex-direction: column;
}

.user-name {
    font-weight: bold;
    font-size: 15px;
    margin: 0;
}

.user-role {
    font-size: 12px;
    color: #e0e0e0;
    margin: 0;
}

.nav-links {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.nav-item {
    display: flex;
    align-items: center;
    padding: 10px 14px;
    font-size: 14px;
    cursor: pointer;
    transition: 0.3s;
    border-radius: 8px;
    color: white;
}

.nav-item .icon {
    margin-right: 10px;
    font-size: 16px;
    font-style: normal;
}

.nav-item:hover {
    background-color: #4a5cd4;
}

.nav-item.active {
    background-color: white;
    color: #5a6cf3;
    font-weight: bold;
}

/* ---------------------------------------
Chat Layout & ChatList
---------------------------------------- */
.app-container {
    display: flex;
    height: 100vh;
}

.chatlist {
    padding: 20px;
    width: 35%;
    position: relative;
    height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: #f9f9f9;
    box-sizing: border-box;
}

.chatlist-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}

.chatlist-heading {
    font-size: 1.4rem;
    font-weight: bold;
}

.chatlist-items {
    list-style: none;
    padding: 0;
    margin: 0;
}

.chat-filter {
    padding: 6px 10px;
    font-size: 0.9rem;
    border: 1px solid #ccc;
    border-radius: 6px;
    outline: none;
    cursor: pointer;
}

.chatlist-item {
    display: flex;
    align-items: center;
    padding: 12px;
    border-radius: 10px;
    cursor: pointer;
    transition: background 0.2s;
    position: relative;
}

.chatlist-item:hover {
    background-color: #f0f0f0;
}

.icon {
    font-size: 1.8rem;
    margin-right: 12px;
}

.chat-info {
    flex: 1;
}

.chat-name {
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 6px;
}

.chat-status {
    font-size: 0.9rem;
    color: gray;
}

.chat-time {
    margin-left: 6px;
}

.dot {
    width: 10px;
    height: 10px;
    background-color: #0f88f2;
    border-radius: 50%;
    position: absolute;
    right: 12px;
}

.unread-badge {
    background-color: #28a745;
    color: white;
    border-radius: 12px;
    padding: 0 8px;
    font-size: 0.75rem;
    font-weight: bold;
    margin-left: 8px;
    display: inline-block;
    min-width: 20px;
    text-align: center;
    line-height: 1.5;
}

.chat-search {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 0.9rem;
}

.chatlist-scroll {
    flex: 1;
    overflow-y: auto;
    margin-top: 1rem;
    padding-right: 6px;
}

.chatlist-scroll::-webkit-scrollbar {
    width: 5px;
}

.chatlist-scroll::-webkit-scrollbar-thumb {
    background-color: hsl(0, 0%, 90%);
    border-radius: 5px;
}

.chatlist-item.selected {
    background-color: #e6f0ff;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
}

.chatlist-item.selected .icon {
    transform: scale(1.05);
}

.chatlist-item.selected .chat-info {
    font-weight: 500;
}

.favourite-star {
    font-size: 1.1em;
    color: #ffae00;
    vertical-align: middle;
}

.chatlist-item:hover .favourite-star {
    opacity: 0.85;
}

/* ---------------------------------------
Chat Window & Messages
---------------------------------------- */
.chat-window {
    width: 50%;
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
    border-left: 1px solid #ddd;
    height: 100vh;
}

.chat-window-inner {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 0;
}

.chat-header {
    padding: 1rem;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.user-info {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.user-avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    object-fit: cover;
}

.user-name {
    font-weight: 600;
    font-size: 1rem;
}

.user-status {
    font-size: 0.85rem;
    color: #666;
}

.user-note {
    font-size: 0.75rem;
    color: #aaa;
    max-width: 300px;
}

.three-dots {
    font-size: 1.4rem;
    cursor: pointer;
    color: #999;
}

.chat-body {
    flex-grow: 1;
    padding: 1rem 2rem;
    overflow-y: auto;
    background-color: #fafafa;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.message {
    display: flex;
    flex-direction: column;
    max-width: 65%;
}

.message.sent {
    align-self: flex-end;
}

.message.received {
    align-self: flex-start;
}

.bubble {
    padding: 12px 16px;
    border-radius: 12px;
    word-break: break-word;
    font-size: 0.95rem;
    line-height: 1.4;
}

.bubble.purple {
    background-color: #5c4ce1;
    color: white;
}

.bubble.gray {
    background-color: #f1f1f1;
    color: #333;
    border: 1px solid #ddd;
}

.reply-options {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 0.5rem;
    color: #fff;
    font-weight: 500;
    cursor: pointer;
}

.timestamp {
    font-size: 0.75rem;
    color: #999;
    margin-top: 4px;
    text-align: left;
}

.message.sent .timestamp {
    text-align: right;
}

.chat-footer {
    padding: 1rem;
    border-top: 1px solid #eee;
    background-color: white;
}

.send-button {
    background-color: #5c4ce1 !important;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
}

/* ---------------------------------------
Three Dots Dropdown
---------------------------------------- */
.dots-wrapper {
    position: relative;
}

.dropdown-float {
    position: absolute;
    top: 0;
    right: 120%;
    background-color: #fff;
    border: 1px solid #ddd;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    border-radius: 6px;
    z-index: 100;
}

.dropdown-btn {
    padding: 0.3rem 0.6rem;
    font-size: 0.8rem;
    background-color: #f8f8f8;
    border: 1px solid #ddd;
    border-radius: 4px;
    cursor: pointer;
    text-align: left;
}

.dropdown-btn:hover {
    background-color: #eaeaea;
}

/* ---------------------------------------
Right Click Context Menu
---------------------------------------- */
.context-menu {
    background-color: #fff;
    border: 1px solid #ddd;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    list-style: none;
    padding: 0.5rem 0;
    margin: 0;
    z-index: 2000;
    width: 150px;
    border-radius: 4px;
    position: absolute;
}

.context-menu li {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
    cursor: pointer;
    user-select: none;
}

.context-menu li:hover {
    background-color: #f5f5f5;
}

/* ---------------------------------------
Responsiveness
---------------------------------------- */
@media (max-width: 1024px) {
    .sidebar {
        display: none;
    }
    .chatlist {
        width: 40%;
    }
    .chat-window {
        width: 60%;
    }
}

@media (max-width: 768px) {
    .sidebar,
    .chatlist {
        display: none;
    }
    .chat-window {
        width: 100%;
        height: 100vh;
        margin: 0;
    }
}
/*input box*/
.chat-footer {
    padding: 1rem;
    border-top: 1px solid #eee;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
}

.input-group {
    width: 100%;   /* ⬅️ Increase width here */
    display: flex;
    max-width: 800px; /* Optional limit for desktop */
}

.input-group .form-control {
    flex: 1; /* Let input expand fully */
    border-radius: 20px 0 0 20px;
    border: 1px solid #ccc;
    padding: 10px 15px;
}

.input-group .btn {
    border-radius: 0 20px 20px 0;
    background-color: #5c4ce1;
    color: white;
    padding: 0 25px; /* Make button wider */
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
}
.input-group .btn:hover {
    background-color: #4b3cd1;
}
`;


// ----------------------------------
// Sidebar (Marking this for later replacement)
// ----------------------------------
function Sidebar() {
    return (
        <div className="sidebar">
            <div className="logo-section">
                <img src="src\assets\logo.jpg" alt="Logo" className="logo" />
                <p className="brand-name">Human Resource Management System</p>
            </div>
            <div className="user-section">
                <img src="src\assets\maria.png" alt="Profile" className="profile-pic" />
                <div className="user-details">
                    <p className="user-name">Maria</p>
                    <p className="user-role">HR Manager</p>
                </div>
            </div>
            <nav className="nav-links">
                <div className="nav-item"><i className="icon">🏠</i> Dashboard</div>
                <div className="nav-item active"><i className="icon">💬</i> Chat</div>
                <div className="nav-item"><i className="icon">👥</i> Employees</div>
                <div className="nav-item"><i className="icon">👍</i> Feed</div>
                <div className="nav-item"><i className="icon">🔔</i> Recognition</div>
                <div className="nav-item"><i className="icon">📅</i> Events</div>
                <div className="nav-item"><i className="icon">👤</i> Profile</div>
                <div className="nav-item"><i className="icon">⚙️</i> Settings</div>
            </nav>
        </div>
    );
}

// ----------------------------------
// Chat List Section
// ----------------------------------
const chatData = [
    { name: "Meg Griffin", status: "Sent you a message", time: "34m", unread: true, type: "single", favourite: true },
    { name: "The Boyz", status: "joe68: sent a message", time: "34m", unread: true, type: "group", favourite: false },
    { name: "Stewie Griffin", status: "Sent you a message", time: "17h", unread: true, type: "single", favourite: true },
    { name: "Joe Swanson", status: "Sent you a message", time: "20h", unread: false, type: "single", favourite: false },
    { name: "Glenn Quagmire", status: "The silence lmao", time: "20h", unread: false, type: "single", favourite: true },
    { name: "Herbert", status: "Active", time: "6m ago", unread: false, type: "single", favourite: false },
    { name: "Adam West", status: "Active", time: "today", unread: false, type: "single", favourite: false },
    { name: "Philip J. Fry", status: "Frozen for 1000 years", time: "20h", unread: false, type: "single", favourite: false },
    { name: "Cleveland Brown", status: "Active", time: "5h ago", unread: false, type: "single", favourite: false },
    { name: "Chris Griffin", status: "Active", time: "today", unread: false, type: "single", favourite: true }
];

function ChatList({ onSelectChat, selectedChat }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all');

    const filteredChats = chatData.filter(chat => {
        const matchSearch = chat.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchFilter =
            filter === 'all' ? true :
                filter === 'groups' ? chat.type === 'group' :
                    filter === 'unread' ? chat.unread :
                        filter === 'read' ? !chat.unread :
                            filter === 'favourites' ? chat.favourite : true;

        return matchSearch && matchFilter;
    });

    const unreadCount = chatData.filter(chat => chat.unread).length;

    return (
        <div className="chatlist">
            <div className="chatlist-header">
                <h3 className="chatlist-heading">Messages {unreadCount > 0 && <span className="unread-badge">{unreadCount}</span>}</h3>
                <select className="chat-filter" value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option value="all"> 🔽 All </option>
                    <option value="groups">👥 Groups</option>
                    <option value="unread">🔵 Unread</option>
                    <option value="read">✅ Read</option>
                    <option value="favourites">⭐ Favourites</option>
                </select>
            </div>

            <input type="text" placeholder="Search chats..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="chat-search" />

            <div className="chatlist-scroll">
                <ul className="chatlist-items">
                    {filteredChats.map((chat, index) => (
                        <li
                            className={`chatlist-item ${chat.name === selectedChat ? 'selected' : ''} ${chat.favourite ? 'favourite' : ''}`}
                            key={index}
                            onClick={() => onSelectChat(chat.name)}
                        >
                            <div className="icon">👤</div>
                            <div className="chat-info">
                                <div className="chat-name">{chat.name}{chat.favourite && <span className="favourite-star">★</span>}</div>
                                <div className="chat-status">{chat.status}{chat.time && <span className="chat-time"> · {chat.time}</span>}</div>
                            </div>
                            {chat.unread && <div className="dot"></div>}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

// ----------------------------------
// Chat Window
// ----------------------------------
const userProfiles = {
    "Meg Griffin": {
        img: "https://randomuser.me/api/portraits/women/1.jpg",
        name: "Meg Griffin",
        handle: "@mmmmeg",
        status: "Web dev, Django Guy",
        note: "Z476 is aware and is waiting for instructions..."
    },
    "The Boyz": { img: "", name: "The Boyz", handle: "", status: "Group Chat", note: "" },
    "Stewie Griffin": { img: "", name: "Stewie Griffin", handle: "", status: "Baby Genius", note: "" },
    "Joe Swanson": { img: "", name: "Joe Swanson", handle: "", status: "", note: "" },
    "Glenn Quagmire": { img: "", name: "Glenn Quagmire", handle: "", status: "", note: "" },
    "Herbert": { img: "", name: "Herbert", handle: "", status: "", note: "" },
    "Adam West": { img: "", name: "Adam West", handle: "", status: "", note: "" },
    "Philip J. Fry": { img: "", name: "Philip J. Fry", handle: "", status: "", note: "" },
    "Cleveland Brown": { img: "", name: "Cleveland Brown", handle: "", status: "", note: "" },
    "Chris Griffin": { img: "", name: "Chris Griffin", handle: "", status: "", note: "" }
};

function ChatWindow({ selectedChat }) {
    const profile = userProfiles[selectedChat] || {};
    const [messages, setMessages] = useState(selectedChat === "Meg Griffin" ? [
        { id: 1, text: "Hey Eric, have you collaborated with Fred yet?\nNot yet    Yes", sender: "other", specialReply: true, time: "10:30 AM" },
        { id: 2, text: "So... question. How long has server been unconscious?", sender: "other", time: "10:32 AM" },
        { id: 3, text: "Oh my god, Chris. The server is not working and it is showing some problem indication...", sender: "me", time: "10:34 AM" },
        { id: 4, text: "Y fear when Chris is here... I’ve taught you well. You have the right instincts...", sender: "other", time: "10:35 AM" }
    ] : []);

    useEffect(() => {
        setMessages(selectedChat === "Meg Griffin" ? [
            { id: 1, text: "Hey Eric, have you collaborated with Fred yet?\nNot yet    Yes", sender: "other", specialReply: true, time: "10:30 AM" },
            { id: 2, text: "So... question. How long has server been unconscious?", sender: "other", time: "10:32 AM" },
            { id: 3, text: "Oh my god, Chris. The server is not working and it is showing some problem indication...", sender: "me", time: "10:34 AM" },
            { id: 4, text: "Y fear when Chris is here... I’ve taught you well. You have the right instincts...", sender: "other", time: "10:35 AM" }
        ] : []);
    }, [selectedChat]);

    const [showMenu, setShowMenu] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [contextMenu, setContextMenu] = useState(null);
    const menuRef = useRef(null);
    const chatBodyRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) setShowMenu(false);
            setContextMenu(null);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (chatBodyRef.current) chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }, [messages]);

    const handleSend = (newMessage) => {
        if (!newMessage.trim()) return;
        const now = new Date();
        const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const newMsg = { id: Date.now(), text: newMessage, sender: 'me', time: formattedTime };
        setMessages([...messages, newMsg]);
    };

    const handleContextMenu = (e, sender) => {
        e.preventDefault();
        const rect = e.currentTarget.getBoundingClientRect();
        const left = sender === 'me' ? rect.left - 160 : rect.right + 10;
        setContextMenu({ top: rect.top + window.scrollY, left: left + window.scrollX });
    };

    return (
        <>
            <div className="chat-window">
                <div className="chat-window-inner">
                    <div className="chat-header">
                        <div className="user-info" onClick={() => setShowProfile(true)} style={{ cursor: 'pointer' }}>
                            <img src={profile.img || "https://via.placeholder.com/48"} alt="Profile" className="user-avatar" />
                            <div>
                                <div className="user-name">{profile.name}</div>
                                <div className="user-status">{profile.status}</div>
                                <div className="user-note">{profile.note}</div>
                            </div>
                        </div>
                        <div ref={menuRef} className="dots-wrapper">
                            <ThreeDotsVertical className="three-dots" onClick={() => setShowMenu(!showMenu)} />
                            {showMenu && (
                                <div className="dropdown-float">
                                    <button className="dropdown-btn">Delete</button>
                                    <button className="dropdown-btn">Mute</button>
                                    <button className="dropdown-btn">Block</button>
                                    <button className="dropdown-btn">Report</button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="chat-body" ref={chatBodyRef}>
                        {messages.map((msg) => (
                            <Message key={msg.id} text={msg.text} sender={msg.sender} specialReply={msg.specialReply} time={msg.time} onContextMenu={handleContextMenu} />
                        ))}
                    </div>

                    <InputBox onSend={handleSend} />
                </div>
            </div>

            {contextMenu && (
                <ul className="context-menu" style={{ top: `${contextMenu.top}px`, left: `${contextMenu.left}px`, position: 'absolute' }}>
                    <li>Reply</li>
                    <li>Copy</li>
                    <li>Forward</li>
                    <li>Select</li>
                    <li>Delete</li>
                    <li>Pin</li>
                </ul>
            )}

            <Modal show={showProfile} onHide={() => setShowProfile(false)} centered>
                <Modal.Header closeButton><Modal.Title>User Profile</Modal.Title></Modal.Header>
                <Modal.Body className="text-center">
                    <img src={profile.img || "https://via.placeholder.com/100"} alt="Profile" style={{ width: '100px', height: '100px', borderRadius: '50%', marginBottom: '1rem' }} />
                    <h5>{profile.name}</h5>
                    <p>{profile.handle}</p>
                    <p>{profile.status}</p>
                    <p>Status: {profile.note}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowProfile(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

// ----------------------------------
// Message Component
// ----------------------------------
function Message({ text, sender, specialReply, onContextMenu, time }) {
    const lines = text.split('\n');
    return (
        <div className={`message ${sender === 'me' ? 'sent' : 'received'}`} onContextMenu={(e) => onContextMenu(e, sender)}>
            <div className={`bubble ${sender === 'me' ? 'gray' : 'purple'}`}>
                <div>{lines[0]}</div>
                {specialReply && <div className="reply-options">Not yet &nbsp;&nbsp; Yes</div>}
            </div>
            <div className="timestamp">{time}</div>
        </div>
    );
}

// ----------------------------------
// Input Box Component
// ----------------------------------
function InputBox({ onSend }) {
    const [inputValue, setInputValue] = useState('');
    const handleSendClick = () => {
        onSend(inputValue);
        setInputValue('');
    };
    return (
        <div className="chat-footer">
            <InputGroup>
                <Form.Control placeholder="What would you like to say?" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSendClick()} />
                <Button variant="primary" className="send-button" onClick={handleSendClick}><SendFill /></Button>
            </InputGroup>
        </div>
    );
}

// ----------------------------------
// Root Chat Component
// ----------------------------------
function Chat() {
    const [selectedChat, setSelectedChat] = useState('Meg Griffin');
    return (
        <>
            <style>{styles}</style>

            <div className="app-container">
                <Sidebar />
                <ChatList selectedChat={selectedChat} onSelectChat={setSelectedChat} />
                <ChatWindow selectedChat={selectedChat} />
            </div>
        </>
    );
}

export default Chat;

