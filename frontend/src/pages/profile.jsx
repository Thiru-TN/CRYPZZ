import "./css/profile.css";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import profileImage from "../assets/notification/image-1.png";
import { FaBell, FaSyncAlt, FaSearch, FaCog, FaThumbsUp, FaComment } from "react-icons/fa";

const Profile = () => {
  const [isFollowed, setIsFollowed] = useState(false);
  const [userStats, setUserStats] = useState({
    username: 'Anto',
    posts: 120,
    followers: 400,
    following: 180,
  });

  const navigate = useNavigate();
  const handlenav = () => {
    handleClick();
    navigate("/home"); // Navigates to Login Page
  };

  const [selectedFilter, setSelectedFilter] = useState("posts");
  const [postsData, setPostsData] = useState([
    { id: 1, content: "Had an amazing weekend hiking in the mountains! The views were breathtaking, and it felt great to disconnect from the digital world for a while. Highly recommend taking a break from screens and enjoying the beauty of nature. 🌄🍃", liked: false, disliked: false, likes: 10, comments: 5 },
    { id: 2, content: "Just finished reading an incredible book on mindfulness! It’s amazing how small changes in mindset can lead to huge improvements in daily life. Anyone else into mindfulness? Would love to swap book recommendations! 📖✨", liked: true, disliked: false, likes: 25, comments: 8 },
    { id: 3, content: "Can’t believe how much progress I’ve made with learning to cook! Made my first homemade pizza tonight and it was a success! 🍕🔥 Any tips for improving my dough game? 😂", liked: false, disliked: true, likes: 5, comments: 2 },
    // Add more posts as necessary
  ]);

  const toggleFollow = () => {
    setIsFollowed(!isFollowed);
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  const getFilteredPosts = () => {
    if (selectedFilter === "likes") {
      return postsData.filter(post => post.liked);
    } else if (selectedFilter === "dislikes") {
      return postsData.filter(post => post.disliked);
    } else {
      return postsData; // Default to "posts"
    }
  };

  return (
    <div className="profile">
      {/* Top Bar */}
      <div className="top-bar">
      <Link to="/home">
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
            Likes
          </button>
          <button
            className={`filter-btn ${selectedFilter === "dislikes" ? "active" : ""}`}
            onClick={() => handleFilterChange("dislikes")}
          >
            Dislikes
          </button>
        </div>

        <div className="posts-list">
          {getFilteredPosts().map((post) => (
            <div key={post.id} className="post">
              <p>{post.content}</p>
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
