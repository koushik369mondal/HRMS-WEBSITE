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

  return (
    <div style={styles.appContainer}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <h1 style={styles.firmsTitle}>HRMS</h1>
          <div style={styles.userProfile}>
            <h2 style={styles.userName}>Maria</h2>
            <p style={styles.userRole}>HR Manager</p>
          </div>
        </div>

        <div style={styles.dashboardSection}>
          <Nav className="flex-column">
            {['Dashboard', 'Chat', 'Employees', 'Feed', 'Recognition', 'Event', 'Profile', 'Settings'].map((item) => (
              <Nav.Link key={item} style={styles.navItem}>
                {item}
              </Nav.Link>
            ))}
          </Nav>
        </div>
      </div>

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
                <Button variant="link" onClick={() => handleLike(post.id)}>
                  {post.isLiked ? <HeartFill color="red" /> : <Heart />}
                  <span style={styles.actionCount}>{post.likes}</span>
                </Button>
                {/* Add other action buttons here */}
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
    backgroundColor: '#f8f9fa'
  },
  sidebar: {
    width: '250px',
    backgroundColor: '#2c3e50',
    color: 'white',
    padding: '20px',
    position: 'fixed',
    height: '100vh'
  },
  sidebarHeader: {
    paddingBottom: '20px',
    borderBottom: '1px solid rgba(255,255,255,0.1)'
  },
  firmsTitle: {
    fontSize: '1.5rem',
    marginBottom: '1rem',
    color: '#fff'
  },
  userProfile: {
    marginTop: '1rem'
  },
  userName: {
    fontSize: '1.2rem',
    marginBottom: '0.2rem'
  },
  userRole: {
    color: '#b8c7ce',
    fontSize: '0.9rem'
  },
  navItem: {
    color: '#b8c7ce',
    padding: '10px 15px',
    margin: '5px 0',
    borderRadius: '4px',
    textDecoration: 'none',
    ':hover': {
      backgroundColor: '#1a2226',
      color: '#fff'
    }
  },
  mainContent: {
    flex: 2,
    marginLeft: '250px',
    padding: '20px',
    height: '100vh',
    overflowY: 'auto'
  },
  feedHeader: {
    fontWeight: 600,
    color: '#333',
    marginBottom: '1rem'
  },
  feedCard: {
    borderRadius: '10px',
    border: '1px solid #e9ecef',
    boxShadow: '0 2px 4px rgba(0,0,0,0.03)',
    marginBottom: '1rem'
  },
  postHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '0.5rem'
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  avatar: {
    width: '36px',
    height: '36px',
    backgroundColor: '#f0f2f5',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 600,
    color: '#495057'
  },
  rightPanel: {
    flex: 1,
    maxWidth: '350px',
    padding: '20px',
    height: '100vh',
    overflowY: 'auto'
  },
  // Add more styles as needed
};

export default Feed;