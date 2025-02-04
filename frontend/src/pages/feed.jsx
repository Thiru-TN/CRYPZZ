// still need to add reply and likes counter

import "./css/feed.css";
import { useEffect, useState } from "react";
import axios from 'axios';
import { brainwave } from "../assets";
import { FaBell, FaSyncAlt, FaSearch, FaUser, FaCog, FaEnvelope, FaArrowRight, FaArrowLeft, FaPlus, FaAt, FaComment, FaShareAlt, FaRedoAlt, FaThumbsUp, FaThumbsDown } from "react-icons/fa";
const Feed = () => {
  const [newPost, setNewPost] = useState(""); // New post input
  const [posts, setPosts] = useState([]); // Initialize with an empty array
  const [followedUsers, setFollowedUsers] = useState([]); // Initialize followed users

  useEffect(() => {
    // Fetch posts from the API
    axios.get('http://localhost:8000/api/feed', { withCredentials: true })
      .then(response => {
        const fetchedPosts = response.data.map(post => ({
          _id:post._id,
          user: { name: post.author || "Unknown" }, 
          text: post.text,
          comments: post.replies.map(reply => ({
            user: reply.author, 
            text: reply.text
          })),
          likes: post.likes || 0,
          dislikes: post.dislikes || 0,
          showComments: false,
          rating: (post.likes - post.dislikes) / 10,  // Simple rating calculation
          datePosted: new Date(post.createdAt).toLocaleString(), // Format date
        }));
        setPosts(fetchedPosts);
      })
      .catch(error => {
        console.error("Error fetching posts", error);
      });

    // Fetch followed users for the authenticated user
    axios.get('http://localhost:8000/api/feed/followedUsers', { withCredentials: true })
      .then(response => {
        // Assuming the backend response contains the list of followed users
        const followedUsersList = response.data; // Update this line based on your backend response
        setFollowedUsers(followedUsersList);
      })
      .catch(error => {
        console.error("Error fetching followed users", error);
      });

  }, []);


  const [commentInput, setCommentInput] = useState(""); // Comment input

  const handleLike = async (postid, index) => {
    try {
      // Send a POST request to like the post
      const response = await axios.post('http://localhost:8000/api/feed/liked', { postid }, { withCredentials: true });
  
      if (response.status === 200 && response.data) {
  
        setPosts(prevPosts => {
          const updatedPosts = [...prevPosts];
          
          // Update the post at the given index with the new data
          updatedPosts[index] = {
            ...updatedPosts[index],  // Keep other properties
            likes: response.data.likes, 
            dislikes: response.data.dislikes
          };
  
          return updatedPosts;
        });
      } else {
        console.error("Unexpected response format:", response.data);
      }
    } catch (error) {
      console.error("Error liking the post", error);
    }
  };
  
  
  const handleDislike = async (postid, index) => {
    try {
      // Send a POST request to like the post
      const response = await axios.post('http://localhost:8000/api/feed/disliked', { postid }, { withCredentials: true });
  
      if (response.status === 200 && response.data) {
  
        setPosts(prevPosts => {
          const updatedPosts = [...prevPosts];
          
          // Update the post at the given index with the new data
          updatedPosts[index] = {
            ...updatedPosts[index],  // Keep other properties
            likes: response.data.likes, 
            dislikes: response.data.dislikes
          };
  
          return updatedPosts;
        });
      } else {
        console.error("Unexpected response format:", response.data);
      }
    } catch (error) {
      console.error("Error liking the post", error);
    }
  };
  
  
  const handleShare = (index) => {
    // Logic for sharing post
    console.log(`Post ${index} shared!`);
  };
  
  const handleRepost = (index) => {
    // Logic for reposting
    console.log(`Post ${index} reposted!`);
  };  

  // Handle new pos

  // Function to handle new post creation
  const handlePost = async () => {
    if (newPost.trim()) {
      const newPostData = {
        text: newPost,  // Post text from user input
        postType: "general",  // Adjust according to your use case (could be regular, image, etc.)
      };
  
      try {
        // Sending a POST request to the backend
          const response = await axios.post('http://localhost:8000/api/feed', newPostData, { withCredentials: true });
          if(response.status === 201){
          setNewPost(""); // Reset input field after posting
        } else {
          console.error("Failed to create post", response.data);
        }
      } catch (error) {
        console.error("Error posting the data", error);
      }
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
      className="profile-pic" 
    />
  )}
                  <span className="username">{post.user.name}</span>  {/* Display name once */}
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
  <button className="post-button-fix" onClick={() => handleLike(post._id, index)}>
    {post.likes}
    <FaThumbsUp className="attach-icon-fix" /> {/* Like icon */}
  </button>
  <button className="post-button-fix" onClick={() => handleDislike(post._id, index)}>
    {post.dislikes}
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
                <span>{followedUsers.length} followers</span>
              </div>
            </div>
            
            <div className="followed-list">
              {followedUsers.map((user, index) => (
                <div key={index} className="followed-user">
                  <img className="user-profile-pic" />
                  <span className="username">{user}</span>
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
