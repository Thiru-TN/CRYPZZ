import { useLocation, useNavigate, Link } from "react-router-dom";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { brainwave } from "../assets";
import Button from "/src/components/Button";
import MenuSvg from "../assets/svg/MenuSvg";
import { useState } from "react";

const iframes = [
  "/public/html/text.html",
  "/public/html/header.html",
  "/public/html/gradient.html",
  "/public/html/collect.html",
  "/public/html/links.html",
  "/public/html/wand.html",
  "/public/html/detail.html",
  "/public/html/glow.html",
  "/public/html/menu.html",
  "/public/html/one.html"
];

const Roadmap = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [openNavigation, setOpenNavigation] = useState(false);

  const toggleNavigation = () => {
    setOpenNavigation(!openNavigation);
    openNavigation ? enablePageScroll() : disablePageScroll();
  };

  const handleSignIn = () => {
    enablePageScroll();
    setOpenNavigation(false);
    navigate("/login");
  };

  const handlehome = () => {
    enablePageScroll();
    setOpenNavigation(false);
    navigate("/");
  };

  return (
    <>
      {/* Top bar */}
      <div className="fixed top-0 left-0 w-full z-50 border-b border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm">
        <div className="flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
          <Link to="/" className="block w-[12rem] xl:mr-8">
            <img src={brainwave} width={190} height={40} alt="crypzz" />
          </Link>
          <a onClick={handlehome} className="button hidden mr-8 text-n-1/50 hover:text-n-1 lg:block" style={{ marginLeft: "450px" }}>
            Home
          </a>
          <a onClick={handleSignIn} className="button hidden mr-8 text-n-1/50 hover:text-n-1 lg:block" style={{ marginLeft: "300px", width: "185px" }}>
            New account
          </a>
          <Button className="hidden lg:flex" style={{ width: "185px" }} onClick={handleSignIn}>
            Sign in
          </Button>
          <Button className="ml-auto lg:hidden" px="px-3" onClick={toggleNavigation}>
            <MenuSvg openNavigation={openNavigation} />
          </Button>
        </div>
      </div>

      {/* Full-page stacked iframes with scroll */}
      <div className="w-full h-screen overflow-y-auto snap-y snap-mandatory">
        {iframes.map((src, index) => (
          <div key={index} className="w-full h-screen snap-start">
            <iframe
              src={src}
              width="100%"
              height="100%"
              className="border-none"
              title={`Page ${index + 1}`}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Roadmap;
