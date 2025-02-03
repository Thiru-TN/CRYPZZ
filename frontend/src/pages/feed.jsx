import "./css/feed.css";
import { useEffect, useState } from "react";
import { brainwave } from "../assets";
import profileImage from "../assets/notification/image-1.png";
import { FaBell, FaSyncAlt, FaSearch, FaUser, FaCog, FaEnvelope, FaArrowRight, FaArrowLeft, FaPlus, FaAt, FaComment, FaShareAlt, FaRedoAlt, FaThumbsUp, FaThumbsDown } from "react-icons/fa";

const Feed = () => {
  const [newPost, setNewPost] = useState(""); // New post input
  const [posts, setPosts] = useState([
    {
      user: { name: "Elon Musk", profile: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaEA2WHKMS-636j42g1gvuRSfNqwS1ZUh55w&s" },
      text: "Exploring new frontiers in space travel. Excited for the upcoming mission!",
      comments: [{ user: "Jane", text: "Amazing!" }],
      showComments: false,
      rating: 3.7,  // Rating out of 10
      datePosted: "2025-02-04 || 10:30 AM",  // Date and time posted
    },
    {
      user: { name: "Bill Gates", profile: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2c-3.33 0-10 1.67-10 5v3h20v-3c0-3.33-6.67-5-10-5z'/%3E%3C/svg%3E" },
      text: "Bitcoin's future looks brighter than ever. Stay tuned for the next big update!",
      comments: [{ user: "Mark", text: "Great insight!" }],
      showComments: false,
      rating: 3.4,
      datePosted: "2025-02-03 || 8:45 PM",
    },
    {
      user: { name: "Andreas Antonopoulos", profile: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2c-3.33 0-10 1.67-10 5v3h20v-3c0-3.33-6.67-5-10-5z'/%3E%3C/svg%3E" },
      text: "Blockchain is not just about money, it's about trust, transparency, and freedom.",
      comments: [{ user: "Alice", text: "Well said!" }],
      showComments: false,
      rating: 7,
      datePosted: "2025-02-02 || 3:00 PM",
    },
    {
      user: { name: "Sundar Pichai", profile: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2c-3.33 0-10 1.67-10 5v3h20v-3c0-3.33-6.67-5-10-5z'/%3E%3C/svg%3E" },
      text: "The decentralized web is the future. Let's make it happen, together!",
      comments: [],
      showComments: false,
      rating: 1.4,
      datePosted: "2025-02-01 || 1:15 PM",
    },
    {
      user: { name: "Vitalik Buterin", profile: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2c-3.33 0-10 1.67-10 5v3h20v-3c0-3.33-6.67-5-10-5z'/%3E%3C/svg%3E" },
      text: "Ethereum is about more than just smart contracts. It's about a decentralized future.",
      comments: [{ user: "Bob", text: "Exciting vision!" }],
      showComments: false,
      rating: 7.8,
      datePosted: "2025-02-04 || 12:00 PM",
    },
]);

  
  const [commentInput, setCommentInput] = useState(""); // Comment input

  const handleLike = (index) => {
    // Update the like count or state
    setPosts(prevPosts => {
      const updatedPosts = [...prevPosts];
      updatedPosts[index].likes += 1; // Increment like count
      return updatedPosts;
    });
  };
  
  const handleDislike = (index) => {
    // Update the dislike count or state
    setPosts(prevPosts => {
      const updatedPosts = [...prevPosts];
      updatedPosts[index].dislikes += 1; // Increment dislike count
      return updatedPosts;
    });
  };
  
  const handleShare = (index) => {
    // Logic for sharing post
    console.log(`Post ${index} shared!`);
  };
  
  const handleRepost = (index) => {
    // Logic for reposting
    console.log(`Post ${index} reposted!`);
  };  

  // Handle new post
  const handlePost = () => {
    if (newPost.trim()) {
      const newPostObject = {
        user: { name: "User", profile: profileImage }, // Updated profile image path
        text: newPost,
        comments: [],
        showComments: false,
      };
      setPosts([newPostObject, ...posts]); // Add new post to the feed
      setNewPost(""); // Reset input field
    }
  };
  

  // Toggle comments section visibility
  const toggleComments = (index) => {
    const updatedPosts = [...posts];
    updatedPosts[index].showComments = !updatedPosts[index].showComments;
    setPosts(updatedPosts);
  };

  // Handle comment submission
  const handleCommentPost = (e, postIndex) => {
    if (e.key === "Enter" && commentInput.trim()) {
      const updatedPosts = [...posts];
      updatedPosts[postIndex].comments.push({
        user: "User",
        text: commentInput,
      });
      setPosts(updatedPosts);
      setCommentInput(""); // Reset comment input
    }
  };

  useEffect(() => {
    // Disable scrolling on the root when the feed page is active
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      // Re-enable scrolling when leaving the feed page
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, []);

  // State for followed users and graph names
  const [followedUsers] = useState([
    { name: "Elon Musk", profile: "src/assets/notification/image-2.png" },
    { name: "Andreas Antonopoulos", profile: "src/assets/notification/image-4.png" },
    { name: "Vitalik Buterin", profile: "src/assets/notification/image-3.png" },
    { name: "Satoshi Nakamoto", profile: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2c-3.33 0-10 1.67-10 5v3h20v-3c0-3.33-6.67-5-10-5z'/%3E%3C/svg%3E" },
    { name: "Changpeng Zhao", profile: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2c-3.33 0-10 1.67-10 5v3h20v-3c0-3.33-6.67-5-10-5z'/%3E%3C/svg%3E" },
  ]);

  // Graph name state and logic for switching names
  const [graphNames, setGraphNames] = useState(["Bitcoin", "Etherium", "Solana"]);
  const graphImages = [
    "https://assets.hongkiat.com/uploads/websites-track-bitcoin-value/BitcoinWisdom.jpg?2",
    "https://images.ctfassets.net/h62aj7eo1csj/3tUMblWWXbT6ucoVvfmclM/cd94c37a8febbb2fd43e2f366fcb233e/Filers-AppStatus-ETH-ETFs_1792w.jpg?w=1100&q=60&fm=jpg",
    "https://miro.medium.com/v2/resize:fit:1400/1*1QQVqedE2_8N71qHb-X9Yw.png"
  ];
  const [currentNameIndex, setCurrentNameIndex] = useState(0);

  const handleNextName = () => {
    setCurrentNameIndex((prevIndex) => (prevIndex + 1) % graphNames.length); // Loop back to the first name
  };

  const handlePrevName = () => {
    setCurrentNameIndex((prevIndex) => (prevIndex - 1 + graphNames.length) % graphNames.length); // Loop back to the last name
  };

  return (
    <div className="feed">

      {/* Top Bar */}
      <div className="top-bar">
        {/* Left Section - Title Logo */}
        <div className="logo">
          <img src={brainwave} alt="Brainwave Logo" className="h-10" />
        </div>

        {/* Search Bar */}
        <div className="search-bar">
          <input type="text" placeholder="Search..." className="search-input" />
          <FaSearch className="search-icon" />
        </div>

        {/* Icons and User Icon */}
        <div className="icon-group">
          <FaSyncAlt className="icon" />
          <FaBell className="icon" />
          <FaCog className="icon" /> {/* Replaced Friends Icon with Settings */}
          <div className="user-icon-container"> 
            <img src="/src/assets/notification/image-1.png" alt="User Icon" className="user-icon" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Left Section */}
        <div className="left-section">
          <h2 style={{fontSize:"3rem", padding: "25px", marginLeft: "350px"}} className="left-title">Feed</h2> {/* Changed title to Feed */}
          {/* Post Input Section */}
          <div className="post-section">
            <div className="post-header">
              <img src={"/src/assets/notification/image-1.png"} alt="Profile" className="profile-pic" /> {/* User profile pic */}
              <input
                type="text"
                placeholder="What's on your mind?"
                className="post-input"
                value={newPost}
                style={{height:"100px"}}
                onChange={(e) => setNewPost(e.target.value)} // Handle post input
              />
            </div>
            <div className="line">
            <FaPlus className="attach-icon" /> {/* Plus icon for attachment */}
            <FaAt className="attach-icon" /> {/* @ icon to tag users */}
            <button className="post-button" onClick={handlePost}> {/* Post Button with action */}
              Post
              <FaArrowRight className="attach-icon" />
            </button>
            </div>
          </div>
          {/* Feed Section */}
          <div className="feed-section">
            {posts.map((post, index) => (
              <div key={index} className="post">
                <div className="post-header">
                  {followedUsers.length > 0 && (
                    <img 
                      src={
                        followedUsers.find(user => user.name === post.user.name)?.profile 
                        || followedUsers[4]?.profile 
                        || "default-profile.png"
                      } 
                      alt={post.user.name} 
                      className="profile-pic" 
                    />
                  )}
                  <span className="username">{post.user.name}</span>
                  <span className="post-rating">Rating: {post.rating} / 10</span> {/* Display Rating */}
                  <span className="post-date">{post.datePosted}</span> {/* Display Date/Time */}
                </div>
                <p className="post-text">{post.text}</p>
                <div className="post-footer">
                <div className="line-fix">
                  <button onClick={() => toggleComments(index)} className="toggle-comments-button">
                    <FaComment className="comment-icon" />
                  </button>
                  <button onClick={() => handleShare(index)} className="share-button">
                    <FaShareAlt className="attach-icon" /> {/* Share icon */}
                  </button>
                  <button onClick={() => handleRepost(index)} className="repost-button">
                    <FaRedoAlt className="attach-icon" /> {/* Repost icon */}
                  </button>
                  <button className="post-button-fix" onClick={() => handleLike(index)}>
                    Like
                    <FaThumbsUp className="attach-icon-fix" /> {/* Like icon */}
                  </button>
                  <button className="post-button-fix" onClick={() => handleDislike(index)}>
                    Dislike
                    <FaThumbsDown className="attach-icon-fix" /> {/* Dislike icon */}
                  </button>
                </div>
                  {/* The comments section will initially be visible but can be toggled */}
                  {post.showComments && (
                    <div className="comments-section">
                      <a style={{fontSize:"1.5rem", color: "#9c5bd9", padding: "25px", marginBottom: "20px"}}><u>Comments:</u></a>
                      {post.comments.map((comment, idx) => (
                        <div key={idx} className="comment" style={{marginTop: "10px", marginLeft: "10px"}}>
                          <span className="comment-user">{comment.user}</span>: {comment.text}
                        </div>
                      ))}
                      <input
                        type="text"
                        placeholder="Write a comment..."
                        className="comment-input"
                        value={commentInput}
                        onChange={(e) => setCommentInput(e.target.value)}
                        onKeyDown={(e) => handleCommentPost(e, index)} // Add comment on Enter
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Right Section */}
        <div className="right-section">
          {/* Live Graph Section */}
          <div className="live-section">
            <h2 className="section-title">Live</h2>
            <div className="feed-graph-placeholder">
              <img src={graphImages[currentNameIndex]} alt={graphNames[currentNameIndex]} className="graph-image" />
            </div>
            {/* Graph Name Section */}
            <div className="graph-name-section">
              <button className="icon-button" onClick={handlePrevName}>
                <FaArrowLeft className="nav-icon" />
              </button>
              <span className="graph-name">{graphNames[currentNameIndex]}</span>
              <button className="icon-button" onClick={handleNextName}>
                <FaArrowRight className="nav-icon" />
              </button>
            </div>
          </div>

          {/* Followed Section */}
          <div className="followed-section">
            <div className="followed-header">
              <h2 className="section-title">Following</h2>
              <div className="followers-count">
                <FaUser className="followers-icon" />
                <span>3</span>
              </div>
            </div>
            <div className="followed-list">
              {followedUsers.map((user, index) => (
                <div key={index} className="followed-user">
                  <img src={user.profile} alt={user.name} className="user-profile-pic" />
                  <span className="username">{user.name}</span>
                  <FaEnvelope className="message-icon" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
