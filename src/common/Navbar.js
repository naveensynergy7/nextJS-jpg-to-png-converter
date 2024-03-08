import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const router = useRouter();
  const [activePath, setActivePath] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setActivePath(router.pathname);
    setMenuOpen(false);
  }, [router.pathname]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <header id="header">
        <div className="header">
          <h1 className="logo">
            <Link href="/">
              <img src="/logo.svg" style={{ height: '30px', width: 'auto' }} />
            </Link>
            <GiHamburgerMenu className="menuIcon" onClick={toggleMenu} />
          </h1>
          <ul className={`main-nav ${menuOpen ? 'active' : ''}`}>
            <li className={activePath === "/" ? "active" : ""}>
              <Link href="/">JPG To PNG</Link>
            </li>
            <li className={activePath === "/heic-to-jpg" ? "active" : ""}>
              <Link href="/heic-to-jpg">HEIC To JPG</Link>
            </li>
            <li className={activePath === "/privacy-policy" ? "active" : ""}>
              <Link href="/privacy-policy">Privacy Policy</Link>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
};

export default Navbar;
