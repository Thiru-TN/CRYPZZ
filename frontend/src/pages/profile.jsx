import "./css/profile.css";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import profileImage from "../assets/notification/image-1.png";
import { FaBell, FaSyncAlt, FaSearch, FaCog, FaThumbsUp, FaComment } from "react-icons/fa";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { username } = useParams(); // Extract username from URL
  const navigate = useNavigate();
  
  // State for user stats
  const [userStats, setUserStats] = useState({
    username: '',
    posts: 0,
    followers: 0,
    following: 0,
    crypzzRatting: 0
  });

  // State for posts
  const [postsData, setPostsData] = useState([]);
  const [isFollowed, setIsFollowed] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("posts");

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        console.log("Fetching stats for:", username);
        
        const response = await fetch(`http://localhost:8000/api/profile/stats/${username}`);
        
        if (!response.ok) throw new Error("Failed to fetch stats");

        const data = await response.json();
        console.log(data)
        console.log("API Response:", data);

        setUserStats(data);
      } catch (error) {
        console.error("Error fetching user stats:", error);
      }
    };

    fetchUserStats();
  }, [username]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const url = selectedFilter === "likes"
          ? `http://localhost:8000/api/profile/posts/${username}/liked`
          : selectedFilter === "dislikes"
          ? `http://localhost:8000/api/profile/posts/${username}/disliked`
          : `http://localhost:8000/api/profile/posts/${username}`;
          
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch posts");
        const data = await response.json();
        console.log(data);
        setPostsData(data);
      } catch (error) {
        console.error("Error fetching user posts:", error);
      }
    };
    fetchUserPosts();
  }, [username, selectedFilter]);

  const handlenav = () => {
    handleClick();
    navigate("/api/home"); // Navigates to Home Page
  };

  const toggleFollow = () => {
    setIsFollowed(!isFollowed);
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  return (
    <div className="profile">
      {/* Top Bar */}
      <div className="top-bar">
        <Link to="/api/home">
          <img src="/src/assets/brainwave.svg" alt="Brainwave Logo" className="h-10" />
        </Link>
        <div className="search-bar">
          <input type="text" placeholder="Search..." className="search-input" />
          <FaSearch className="search-icon" />
        </div>

        <div className="icon-group">
          <FaSyncAlt className="icon" />
          <FaBell className="icon" />
          <FaCog className="icon" />
          <div className="user-icon-container">
            <img src={profileImage} alt="User Icon" className="user-icon" />
          </div>
        </div>
      </div>

      {/* Profile Section */}
      <div className="profile-info">
        <div className="profile-card">
          <div className="profile-content">
            {/* Left Section (Image) */}
            <div className="profile-image-container">
              <img src={profileImage} alt="User Icon" className="user-icon-large" />
            </div>

            {/* Right Section (Header + Stats) */}
            <div className="profile-right">
              <div className="profile-header">
                <div className="username-follow">
                  <span className="username">{userStats.username}</span>
                  <button
                    className={`follow-btn ${isFollowed ? "followed" : ""}`}
                    onClick={toggleFollow}
                  >
                    {isFollowed ? "Following" : "Follow"}
                  </button>
                  <span className="stat-label">Rating</span>
                  <span className="stat-value">{userStats.rating}</span>
                </div>
              </div>

              <div className="profile-stats">
                <div className="stats">
                  <span className="stat-value">{userStats.posts}</span>
                  <span className="stat-label">Posts</span>
                </div>
                <div className="stats">
                  <span className="stat-value">{userStats.followers}</span>
                  <span className="stat-label">Followers</span>
                </div>
                <div className="stats">
                  <span className="stat-value">{userStats.following}</span>
                  <span className="stat-label">Following</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section with Filters */}
      <div className="content">
        <div className="filter-buttons">
          <button
            className={`filter-btn ${selectedFilter === "posts" ? "active" : ""}`}
            onClick={() => handleFilterChange("posts")}
          >
            Posts
          </button>
          <button
            className={`filter-btn ${selectedFilter === "likes" ? "active" : ""}`}
            onClick={() => handleFilterChange("likes")}
          >
            Liked
          </button>
          <button
            className={`filter-btn ${selectedFilter === "dislikes" ? "active" : ""}`}
            onClick={() => handleFilterChange("dislikes")}
          >
            Disliked
          </button>
        </div>

        <div className="posts-list">
          {postsData.map((post) => (
            <div key={post._id} className="post">
              {/* Render Post Text */}
              <p>{post.text}</p>

              {/* Thumbs Up Icon and Likes Count */}
              <div className="post-info">
                <div className="likes">
                  <FaThumbsUp className="icon" /> {post.likes}
                </div>
                <div className="comments">
                  <FaComment className="icon" /> {post.comments}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
