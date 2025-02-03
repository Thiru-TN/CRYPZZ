import {
  benefitIcon1,
  benefitIcon2,
  benefitIcon3,
  benefitIcon4,
  benefitImage2,
  chromecast,
  disc02,
  discord,
  discordBlack,
  facebook,
  figma,
  file02,
  framer,
  homeSmile,
  instagram,
  notification2,
  notification3,
  notification4,
  notion,
  photoshop,
  plusSquare,
  protopie,
  raindrop,
  recording01,
  recording03,
  roadmap1,
  roadmap2,
  roadmap4,
  searchMd,
  slack,
  sliders04,
  telegram,
  twitter,
} from "../assets";
import roadmapVideo from "../assets/roadmap/image-3.mp4";
import icon1 from "../assets/icon1.png";
import icon2 from "../assets/icon2.png";
import icon3 from "../assets/icon3.png";
import icon4 from "../assets/icon4.png";
import icon5 from "../assets/icon5.png";
import social from "../assets/social.mp4"
import data from "../assets/data.mp4"
import result from "../assets/result.mp4"

export const navigation = [
  {
    id: "0",
    title: "Features",
    url: "#features",
  },
  {
    id: "1",
    title: "Pricing",
    url: "#pricing",
  },
  {
    id: "2",
    title: "How to use",
    url: "#how-to-use",
  },
  {
    id: "3",
    title: "Roadmap",
    url: "#roadmap",
  },
  {
    id: "4",
    title: "New account",
    url: "#signup",
    onlyMobile: true,
  },
  {
    id: "5",
    title: "Sign in",
    url: "#login",
    onlyMobile: true,
  },
];

export const heroIcons = [homeSmile, file02, searchMd, plusSquare];

export const notificationImages = [notification4, notification3, notification2];

export const companyLogos = [icon1, icon2, icon3, icon4, icon5];

export const brainwaveServices = [
  "Credibility Ratings Algorithm",
  "Social Media Engagement",
  "AI-Driven Coin Recommendations",
];


export const brainwaveServicesIcons = [
  recording03,
  recording01,
  disc02,
  chromecast,
  sliders04,
];

export const roadmap = [
  {
    id: "0",
    title: "Credibility Ratings Algorithm",
    text: "Develop a machine learning-powered algorithm to evaluate analysts' prediction accuracy and reviews, providing evolving credibility ratings.",
    date: "2025-02-03 10:00 AM",
    status: "done",
    imageUrl: roadmap1,
    colorful: true,
  },
  {
    id: "1",
    title: "Real-Time Market Data",
    text: "Implement live updates for coin prices and in-depth market analysis to keep users informed about the latest trends.",
    date: "2025-02-03 12:00 PM",
    status: "progress",
    imageUrl: roadmap2,
  },
  {
    id: "2",
    title: "Social Media Engagement",
    text: "Allow users to follow analysts, comment on their posts, and engage in discussions, creating a more interactive platform.",
    date: "2025-02-03 02:00 PM",
    status: "done",
    imageUrl: roadmapVideo,
  },
  {
    id: "3",
    title: "AI-Driven Coin Recommendations",
    text: "Leverage AI to provide personalized coin suggestions based on users' portfolios and trading behaviors.",
    date: "2025-02-03 04:00 PM",
    status: "progress",
    imageUrl: data,
  },
];


export const collabText =
  "With smart automation and top-notch security, it's the perfect solution for teams looking to work smarter.";

export const collabContent = [
  {
    id: "0",
    title: "Seamless Integration",
    text: collabText,
  },
  {
    id: "1",
    title: "Smart Automation",
  },
  {
    id: "2",
    title: "Top-notch Security",
  },
];

export const collabApps = [
  {
    id: "0",
    title: "Figma",
    icon: figma,
    width: 26,
    height: 36,
  },
  {
    id: "1",
    title: "Notion",
    icon: notion,
    width: 34,
    height: 36,
  },
  {
    id: "2",
    title: "Discord",
    icon: discord,
    width: 36,
    height: 28,
  },
  {
    id: "3",
    title: "Slack",
    icon: slack,
    width: 34,
    height: 35,
  },
  {
    id: "4",
    title: "Photoshop",
    icon: photoshop,
    width: 34,
    height: 34,
  },
  {
    id: "5",
    title: "Protopie",
    icon: protopie,
    width: 34,
    height: 34,
  },
  {
    id: "6",
    title: "Framer",
    icon: framer,
    width: 26,
    height: 34,
  },
  {
    id: "7",
    title: "Raindrop",
    icon: raindrop,
    width: 38,
    height: 32,
  },
];

export const pricing = [
  {
    id: "0",
    title: "Basic",
    description: "Access to live market data, follow analysts, and basic predictions",
    price: "0",
    features: [
      "Live coin prices and basic crypto analysis",
      "Follow your favorite analysts and engage with their content",
      "Basic personalized coin suggestions based on past performance",
    ],
  },
  {
    id: "1",
    title: "Premium",
    description: "Insights from all social media, enhanced connectivity, and priority support",
    price: "9.99",
    features: [
      "Access to insights from all social media platforms related to crypto trends",
      "Enhanced connectivity with real-time market data and news feeds",
      "Advanced analysis of market sentiments from top analysts on social platforms"
    ],
  },
  {
    id: "2",
    title: "Enterprise",
    description: "Custom AI-driven analysis, advanced portfolio management, and dedicated support",
    price: null,
    features: [
      "Custom AI analysis for your specific portfolio needs",
      "Advanced insights and suggestions based on your investments",
      "24/7 dedicated support and enterprise-grade security",
    ],
  },
];


export const benefits = [
  {
    id: "0",
    title: "Real-Time Predictions",
    text: "Access accurate, up-to-the-minute predictions on crypto trends based on expert analysis and AI models.",
    backgroundUrl: "./src/assets/benefits/card-1.svg",
    iconUrl: benefitIcon1,
    imageUrl: benefitImage2,
  },
  {
    id: "1",
    title: "Tailored Suggestions",
    text: "Get personalized coin recommendations based on your past investments and trading behavior.",
    backgroundUrl: "./src/assets/benefits/card-2.svg",
    iconUrl: benefitIcon2,
    imageUrl: benefitImage2,
    light: true,
  },
  {
    id: "2",
    title: "Connect everywhere",
    text: "Connect with the website from anywhere, on any device, making it more accessible and convenient.",
    backgroundUrl: "./src/assets/benefits/card-3.svg",
    iconUrl: benefitIcon3,
    imageUrl: benefitImage2,
  },
  {
    id: "3",
    title: "Engage with Experts",
    text: "Follow and interact with top analysts, learning from their strategies and insights.",
    backgroundUrl: "./src/assets/benefits/card-4.svg",
    iconUrl: benefitIcon4,
    imageUrl: benefitImage2,
    light: true,
  },
  {
    id: "4",
    title: "Enhanced Portfolio Management",
    text: "Track the performance of your crypto investments with detailed historical data and AI-powered predictions.",
    backgroundUrl: "./src/assets/benefits/card-5.svg",
    iconUrl: benefitIcon1,
    imageUrl: benefitImage2,
  },
  {
    id: "5",
    title: "24/7 Market Insights",
    text: "Stay ahead with around-the-clock market updates, helping you make informed decisions at any time.",
    backgroundUrl: "./src/assets/benefits/card-6.svg",
    iconUrl: benefitIcon2,
    imageUrl: benefitImage2,
  },
];

export const socials = [
  {
    id: "0",
    title: "Discord",
    iconUrl: discordBlack,
    url: "https://discord.com",
  },
  {
    id: "1",
    title: "Twitter",
    iconUrl: twitter,
    url: "https://twitter.com",
  },
  {
    id: "2",
    title: "Instagram",
    iconUrl: instagram,
    url: "https://instagram.com",
  },
  {
    id: "3",
    title: "Telegram",
    iconUrl: telegram,
    url: "https://telegram.org",
  },
  {
    id: "4",
    title: "Facebook",
    iconUrl: facebook,
    url: "https://facebook.com",
  },
];
