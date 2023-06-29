import { default as Logo } from "../assets/logo.svg";
import { Link, useLocation } from 'react-router-dom';
import './NavBar.css';
import { useState, useEffect } from "react";
import gsap from "gsap";


const NavBar = () => {
    const location = useLocation();
    const [activeLink, setActiveLink] = useState('');

    useEffect(() => {
        const onScroll = () => {
            const isScrolled = window.scrollY > 20;
            gsap.to("#navbar", {
                background: isScrolled ?
                    "linear-gradient(0deg, rgba(0, 0, 0, 0.95) 0%, rgba(28, 37, 68, 0.95) 100%)"
                    : "rgba(28, 37, 68, 0.95)", duration: 0.2, ease: "power1.inOut"
            });
        };

        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const onUpdateActiveLink = (value) => {
        setActiveLink(value);
    }

    if (location.pathname === '/') {
        return null;
    }

    return (
        <section id="navbar">
            <div className="id-container">
                <Link to="/" className="title">
                    <div className="logo-container"> <img className="logo" src={Logo} alt="logo" /></div>
                    <h2>Top 50 Charts</h2>

                </Link>
                <div className="links-container">
                    <Link to="/albums" className={activeLink === 'albums' ? 'navbar-links-text active' : 'navbar-links-text'} onClick={() => { onUpdateActiveLink('albums') }}>
                        Albums
                    </Link>
                    <Link to="/songs" className={activeLink === 'songs' ? 'navbar-links-text active' : 'navbar-links-text'} onClick={() => { onUpdateActiveLink('songs') }}>
                        Songs
                    </Link>
                </div>
            </div>
        </section>
    )



}

export default NavBar;