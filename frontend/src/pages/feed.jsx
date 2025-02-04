// still need to add reply and likes counter

import "./css/feed.css";
import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate} from "react-router-dom";
import { brainwave } from "../assets";
import { FaBell, FaSyncAlt, FaHome, FaSearch, FaUser, FaCog, FaEnvelope, FaArrowRight, FaArrowLeft, FaPlus, FaAt, FaComment, FaShareAlt, FaRedoAlt, FaThumbsUp, FaThumbsDown } from "react-icons/fa";
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

  
  const [isPosted, setIsPosted] = useState(false);
  const [commentInput, setCommentInput] = useState(""); // Comment input

  const handleLike = async (postid, index) => {
    try {
      const response = await axios.post('http://localhost:8000/api/feed/liked', { postid }, { withCredentials: true });
  
      if (response.status === 200 && response.data) {
  
        setPosts(prevPosts => {
          const updatedPosts = [...prevPosts];
          
          updatedPosts[index] = {
            ...updatedPosts[index], 
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
  // Function to handle new post creation
  const handlePost = async () => {
    if (newPost.trim()) {
      const newPostData = {
        text: newPost, 
        postType: "general",
      };
  
      try {
        // Sending a POST request to the backend
          const response = await axios.post('http://localhost:8000/api/feed', newPostData, { withCredentials: true });
          if(response.status === 201){
          setNewPost(""); 
          setIsPosted(true); // Show the "Posted" message

      // Hide the "Posted" message after 2 seconds
      setTimeout(() => {
        setIsPosted(false);
      }, 2000);// Reset input field after posting
        } else {
          console.error("Failed to create post", response.data);
        }
      } catch (error) {
        console.error("Error posting the data", error);
      }
    }
  };

    const navigate = useNavigate();
            
        const handlenav = () => {
            navigate("/api/home");
        };
  

  // Toggle comments section visibility
  const toggleComments = (index) => {
    const updatedPosts = [...posts];
    updatedPosts[index].showComments = !updatedPosts[index].showComments;
    setPosts(updatedPosts);
  };


  const handleCommentPost = async (e, postIndex) => {
    if (e.key === "Enter" && commentInput.trim()) {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/feed/post/reply",
          { postid: posts[postIndex]._id, text: commentInput },
          { withCredentials: true }
        );
        if (response.status === 200) {
          const newReply = response.data.reply;
  
          setPosts(prevPosts => {
            return prevPosts.map((post, index) => {
              if (index === postIndex) {
                return {
                  ...post,
                  comments: [...post.comments, { user: newReply.author, text: newReply.text }]
                };
              }
              return post;
            });
          });
  
          setCommentInput("");
        } else {
          console.error("Failed to post reply", response.data);
        }
      } catch (error) {
        console.error("Error posting reply", error);
      }
    }
  };
  

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, []);

  

  // State for followed users and graph names

  // Graph name state and logic for switching names
  const [graphNames, setGraphNames] = useState(["Bitcoin", "Etherium", "Cardano"]);
  const graphLinks = [
    "https://ssltvc.investing.com/?pair_ID=7&height=480&width=550&interval=1800&plotStyle=bars&domain_ID=56&lang_ID=56&timezone_ID=20",  // Bitcoin Example
    "https://ssltvc.investing.com/?pair_ID=1057391&height=480&width=550&interval=1800&plotStyle=bars&domain_ID=56&lang_ID=56&timezone_ID=20", // Ethereum Example
    "https://ssltvc.investing.com/?pair_ID=1061443&height=480&width=550&interval=1800&plotStyle=bars&domain_ID=56&lang_ID=56&timezone_ID=20"  // Cardano Example
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
        <FaHome className="icon cursor-pointer mx-4" onClick={handlenav} />
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
        <h2 style={{ fontSize: '3rem', padding: '25px', marginLeft: '350px' }} className="left-title">
            Feed
            {isPosted && <span style={{ marginLeft: '20px', color: 'green', fontSize: '1.5rem' }}>Posted</span>} {/* Display Posted message */}
        </h2>
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
    <FaThumbsUp style={{marginLeft:'10px'}} className="attach-icon-fix" /> {/* Like icon */}
  </button>
  <button className="post-button-fix" onClick={() => handleDislike(post._id, index)}>
    {post.dislikes}
    <FaThumbsDown style={{marginLeft:'10px'}} className="attach-icon-fix" /> {/* Dislike icon */}
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
                        onKeyDown={(e) => handleCommentPost(e, posts.findIndex(p => p._id === post._id))}
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
                <iframe
                    src={graphLinks[currentNameIndex]}
                    className="graph-iframe"
                    title={graphNames[currentNameIndex]}
                    frameBorder="0"
                    width="100%"
                    height="500px"
                ></iframe>
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
