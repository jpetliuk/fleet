
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-[#1A1A1A]/90 backdrop-blur-md text-white sticky top-0 z-50 border-b border-white/10">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3">
                        <img
                            src="/src/assets/logo.png"
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
                        <button className="border border-white/30 hover:border-primary hover:text-primary hover:bg-white/5 transition-all text-sm font-semibold px-5 py-2.5 rounded-full">
                            Check Availability
                        </button>
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
                        <button className="bg-primary text-white font-semibold py-3 rounded-lg w-full">
                            Check Availability
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
}
