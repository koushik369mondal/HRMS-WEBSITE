import React, { useState } from 'react';
import { Nav, Card, Badge, Button, Form, ListGroup } from 'react-bootstrap';
import { Heart, HeartFill, Chat, Share, Bookmark, BookmarkFill, ThreeDots } from 'react-bootstrap-icons';

const Feed = () => {
  // State for posts
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: 'Alison Hata',
      initials: 'AH',
      content: 'Alison just completed 2 years in the company. Congratulate her!',
      likes: 24,
      comments: 5,
      isLiked: false,
      isSaved: false
    },
    {
      id: 2,
      user: 'Harith Swanson',
      initials: 'HS',
      content: 'Thanks for leading the design sprint, Rosia! Great win for the team.',
      points: 200,
      recipient: 'Rosia Thorpe',
      likes: 42,
      comments: 3,
      isLiked: true,
      isSaved: false
    }
  ]);

  // Like handler
  const handleLike = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isLiked: !post.isLiked,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  // Save handler
  const handleSave = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isSaved: !post.isSaved
        };
      }
      return post;
    }));
  };

  return (
    <div style={styles.appContainer}>
      {/* Main Content */}
      <div style={styles.mainContent}>
        <h4 style={styles.feedHeader}>Feed</h4>
        
        {posts.map(post => (
          <Card key={post.id} style={styles.feedCard}>
            <Card.Body>
              <div style={styles.postHeader}>
                <div style={styles.userInfo}>
                  <div style={styles.avatar}>{post.initials}</div>
                  <strong>{post.user}</strong>
                </div>
                <Button variant="link" style={styles.dotsButton}>
                  <ThreeDots />
                </Button>
              </div>

              <Card.Text style={styles.postContent}>
                {post.content}
              </Card.Text>

              <div style={styles.postActions}>
                <Button variant="link" onClick={() => handleLike(post.id)} style={styles.actionButton}>
                  {post.isLiked ? <HeartFill color="red" /> : <Heart />}
                  <span style={styles.actionCount}>{post.likes}</span>
                </Button>
                <Button variant="link" style={styles.actionButton}>
                  <Chat />
                  <span style={styles.actionCount}>{post.comments}</span>
                </Button>
                <Button variant="link" style={styles.actionButton}>
                  <Share />
                </Button>
                <Button variant="link" onClick={() => handleSave(post.id)} style={styles.actionButton}>
                  {post.isSaved ? <BookmarkFill color="blue" /> : <Bookmark />}
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>

      {/* Right Panel */}
      <div style={styles.rightPanel}>
        <Card style={styles.panelCard}>
          <Card.Body>
            <div style={styles.pointsContainer}>
              <span>Your Points</span>
              <Badge bg="primary" pill>1284</Badge>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

// All styles in a JavaScript object
const styles = {
  appContainer: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#f8f9fa',
    width: '100%'
  },
  mainContent: {
    flex: 2,
    padding: '30px',
    height: '100vh',
    overflowY: 'auto',
    width: '100%'
  },
  feedHeader: {
    fontWeight: 600,
    color: '#333',
    marginBottom: '2rem',
    fontSize: '1.5rem'
  },
  feedCard: {
    borderRadius: '12px',
    border: 'none',
    boxShadow: '0 4px 8px rgba(0,0,0,0.08)',
    marginBottom: '1.5rem',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
  },
  postHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '1rem'
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  avatar: {
    width: '40px',
    height: '40px',
    backgroundColor: '#e9ecef',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 600,
    color: '#495057',
    fontSize: '14px'
  },
  postContent: {
    fontSize: '1rem',
    lineHeight: '1.6',
    color: '#333',
    marginBottom: '1rem'
  },
  postActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    paddingTop: '1rem',
    borderTop: '1px solid #f0f0f0'
  },
  actionButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 12px',
    border: 'none',
    background: 'none',
    color: '#6c757d',
    textDecoration: 'none',
    borderRadius: '20px',
    transition: 'all 0.2s ease'
  },
  actionCount: {
    fontSize: '14px',
    fontWeight: '500'
  },
  dotsButton: {
    border: 'none',
    background: 'none',
    color: '#6c757d',
    padding: '4px'
  },
  rightPanel: {
    flex: 1,
    maxWidth: '350px',
    padding: '30px 20px',
    height: '100vh',
    overflowY: 'auto'
  },
  panelCard: {
    borderRadius: '12px',
    border: 'none',
    boxShadow: '0 4px 8px rgba(0,0,0,0.08)'
  },
  pointsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '1rem',
    fontWeight: '500'
  }
};

export default Feed;