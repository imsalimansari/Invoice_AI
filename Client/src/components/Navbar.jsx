import React, { useCallback, useEffect, useRef, useState } from "react";
import { navbarStyles } from "../assets/dummyStyles";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useClerk, useUser, SignedOut } from "@clerk/clerk-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const { user } = useUser();
  const { getToken, isSignedIn } = useUser();
  const clerk = useClerk();

  const navigate = useNavigate();
  const profileRef = useRef(null);
  const TOKEN_KEY = "token";


  //for token generation and storage in local storage
  const fetchAndStoreToken = useCallback(async () => {
    try {
      if (!getToken) {
        return null;
      }
      const token = await getToken().catch(() => null);
      if (token) {
        try {
        localStorage.setItem(TOKEN_KEY, token);
        console.log("Token stored in localStorage:", token);
        } catch (e) {
          // ignore localStorage errors (e.g., quota exceeded, private mode)
          // console.error("Error storing token in localStorage:", e);
        }
      }
      else {
        return null;
      }
    } catch (err) {
      // console.error("Error fetching token:", error);
      return null;
    }
  }, [getToken]);
  
  // Keep the localstorage token in sync with Clerk's session
  useEffect(() => {
    let mounted = true;
    (async () => {
      if (isSignedIn) {
      const t = await fetchAndStoreToken({template: "default"}).catch(() => null);
        if (!t && mounted) {
          await fetchAndStoreToken({forceRefresh: true}).catch(() => null);
        }
      } else {
        try {
          localStorage.removeItem(TOKEN_KEY);
          // console.log("Token removed from localStorage");
        } catch {
          // ignore localStorage errors
          // console.error("Error removing token from localStorage:", e);
        }
      }
    })();
  return () => {
    mounted = false;
  }
},[isSignedIn, user, fetchAndStoreToken]);

// After successful sign-in, redirect to dashboard and fetch token
useEffect(() => {
  if (isSignedIn) {
    const pathname = window.location.pathname || "/";
    if (
      pathname === "/login" ||
      pathname === "/signup" || 
      pathname.startsWith("/auth") ||
      pathname === "/" 
    ) {
      navigate("/app/dashboard", { replace: true });
    }
  }
});

// Close profile popover on outside click
useEffect(() => {
  function onDocClick(e) {
    if (!profileRef.current) return;
    if (!profileRef.current.contains(e.target)) {
      setProfileOpen(false);
    }
  }
  if (profileOpen) {
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("touchstart", onDocClick);
  }
  return () => {
    document.removeEventListener("mousedown", onDocClick);
    document.removeEventListener("touchstart", onDocClick);
  };
}, [profileOpen]);

  // Function to handle sign-in
  function openSignIn() {
    try {
      if (clerk && typeof clerk.openSignIn === "function") {
        clerk.openSignIn();
      } else {
        navigate("/login");
      }
    } catch (e) {
      console.error("Error opening sign-in:", e);
      navigate("/login");
    }
  }

  // Function to handle sign-Up
  function openSignUp() {
    try {
      if (clerk && typeof clerk.openSignUp === "function") {
        clerk.openSignUp();
      } else {
        navigate("/signup");
      }
    } catch (e) {
      console.error("Error opening sign-up:", e);
      navigate("/signup");
    }
  }

  return (
    <header className={navbarStyles.header}>
      <div className={navbarStyles.container}>
        <nav className={navbarStyles.nav}>
          <div className={navbarStyles.logoSection}>
            <Link to="/" className={navbarStyles.logoLink}>
              <img src={logo} alt="Logo" className={navbarStyles.logoImage} />
              <span className={navbarStyles.logoText}>Invoice AI</span>
            </Link>
            <div className={navbarStyles.desktopNav}>
              <a href="#features" className={navbarStyles.navLink}>
                Features
              </a>
              <a href="#pricing" className={navbarStyles.navLink}>
                Pricing
              </a>
            </div>
          </div>
          <div className=" flex items-center gap-4">
            <div className={navbarStyles.authSection}>
              <SignedOut>
                <button
                  onClick={openSignIn}
                  className={navbarStyles.signInButton}
                  type="button"
                >
                  Sign In
                </button>

                <button
                  onClick={openSignUp}
                  className={navbarStyles.signUpButton}
                  type="button"
                >
                  <div className={navbarStyles.signUpOverlay}></div>
                  <span className={navbarStyles.signUpText}>Get Started</span>
                  <svg
                    className={navbarStyles.signUpIcon}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14m-7-7l7 7-7 7" />
                  </svg>
                </button>
              </SignedOut>
            </div>

            {/* mobile toggle */}
            <button 
            onClick={()=> setOpen(!open)}
            className={navbarStyles.mobileMenuButton}
            >
                <div className={navbarStyles.mobileMenuIcon}>
                    <span className={`${navbarStyles.mobileMenuLine1} ${
                        open ? navbarStyles.mobileMenuLine1Open
                        : navbarStyles.mobileMenuLine1Closed
                        }`}>
                    </span>

                    <span className={`${navbarStyles.mobileMenuLine2} ${
                        open ? navbarStyles.mobileMenuLine2Open
                        : navbarStyles.mobileMenuLine2Closed
                        }`}>
                    </span>

                    <span className={`${navbarStyles.mobileMenuLine3} ${
                        open ? navbarStyles.mobileMenuLine3Open
                        : navbarStyles.mobileMenuLine3Closed
                        }`}>
                    </span>
                </div>
            </button>
          </div>
        </nav>
      </div>

      <div className={`${open ? "block" : "hidden"} ${navbarStyles.mobileMenu}`}>
        <div className={navbarStyles.mobileMenuContainer}>
            <a href="#features" className={navbarStyles.mobileNavLink}>Features</a>
            <a href="#pricing" className={navbarStyles.mobileNavLink}>Pricing</a>
            <div className={navbarStyles.mobileAuthSection}>
              <SignedOut>
                <button
                  onClick={openSignIn}
                  className={navbarStyles.mobileSignIn}
                  type="button"
                >
                  Sign In
                </button>
                <button
                  onClick={openSignUp}
                  className={navbarStyles.mobileSignUp}
                  type="button"
                >
                  Get Started
                </button>
              </SignedOut>
            </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
