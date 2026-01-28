import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/logo.png';

export default function Navbar() {
    const { isAuthenticated, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const controlNavbar = () => {
            if (typeof window !== 'undefined') {
                // Determine scrolling direction and position
                const currentScrollY = window.scrollY;

                if (currentScrollY > lastScrollY && currentScrollY > 100) {
                    // Scrolling down & past threshold: hide navbar
                    setIsVisible(false);
                    setIsOpen(false); // Close mobile menu if open when scrolling down
                } else {
                    // Scrolling up or at top: show navbar
                    setIsVisible(true);
                }

                setLastScrollY(currentScrollY);
            }
        };

        window.addEventListener('scroll', controlNavbar);

        return () => {
            window.removeEventListener('scroll', controlNavbar);
        };
    }, [lastScrollY]);

    return (
        <nav
            className={`bg-[#1A1A1A]/90 backdrop-blur-md text-white sticky top-0 z-50 border-b border-white/10 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'
                }`}
        >
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3">
                        <img
                            src={logo}
                            alt="Fleetco"
                            className="h-10 w-auto"
                            style={{ filter: 'brightness(0) saturate(100%) invert(18%) sepia(88%) saturate(3436%) hue-rotate(224deg) brightness(94%) contrast(96%)' }}
                        />
                        <div className="flex flex-col">
                            <span className="text-xl font-bold leading-none tracking-tight text-white">FLEETCO</span>
                            <span className="text-[10px] text-gray-400 font-medium tracking-widest uppercase">Trailer Rentals</span>
                        </div>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
                        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                        <Link to="/about" className="hover:text-primary transition-colors">About</Link>
                        <Link to="/rentals" className="hover:text-primary transition-colors">Trailer Rentals</Link>
                    </div>

                    {/* CTA Button */}
                    <div className="hidden md:block">
                        {isAuthenticated ? (
                            <Link
                                to="/dashboard"
                                className="bg-primary text-white hover:bg-[#3b82f6] px-6 py-2.5 rounded-full font-bold shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:shadow-primary/40 active:translate-y-0 cursor-pointer text-sm"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <Link
                                to="/login"
                                className="bg-primary text-white hover:bg-[#3b82f6] px-6 py-2.5 rounded-full font-bold shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:shadow-primary/40 active:translate-y-0 cursor-pointer text-sm"
                            >
                                Sign In
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-gray-300 hover:text-white"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <div className="md:hidden bg-[#1A1A1A] border-t border-white/10">
                    <div className="flex flex-col p-4 gap-4">
                        <Link to="/" className="text-gray-300 hover:text-primary sticky" onClick={() => setIsOpen(false)}>Home</Link>
                        <Link to="/about" className="text-gray-300 hover:text-primary sticky" onClick={() => setIsOpen(false)}>About</Link>
                        <Link to="/rentals" className="text-gray-300 hover:text-primary" onClick={() => setIsOpen(false)}>Trailer Rentals</Link>
                        {isAuthenticated ? (
                            <>
                                <Link to="/dashboard" className="bg-primary text-white font-semibold py-3 rounded-lg w-full text-center block hover:bg-primary-hover shadow-lg shadow-primary/20" onClick={() => setIsOpen(false)}>
                                    Dashboard
                                </Link>
                                <button onClick={() => { logout(); setIsOpen(false); }} className="bg-white/10 text-white font-semibold py-3 rounded-lg w-full text-center block hover:bg-white/20">
                                    Log Out
                                </button>
                            </>
                        ) : (
                            <Link to="/login" className="bg-primary text-white font-semibold py-3 rounded-lg w-full text-center block hover:bg-primary-hover shadow-lg shadow-primary/20" onClick={() => setIsOpen(false)}>
                                Sign In
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
