
import { Facebook, Linkedin } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-[#111111] text-gray-400 py-16 border-t border-white/5">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

                    {/* Brand */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <img src="/src/assets/logo.png" alt="Fleetco" className="h-8 w-auto brightness-0 invert" />
                            <span className="text-lg font-bold text-white tracking-tight">FLEETCO</span>
                        </div>
                        <div className="text-sm space-y-2">
                            <p>801 Carrier Drive<br />Charlotte, N.C. 28216</p>
                            <p><a href="tel:704-394-0391" className="hover:text-primary transition-colors">704-394-0391</a></p>
                            <p><a href="mailto:office@fleetcotrailers.com" className="hover:text-primary transition-colors">office@fleetcotrailers.com</a></p>
                        </div>
                        <div className="flex gap-4">
                            <a href="#" className="hover:text-primary transition-colors"><Facebook size={20} /></a>
                            <a href="#" className="hover:text-primary transition-colors"><Linkedin size={20} /></a>
                        </div>
                        <div className="text-xs text-gray-500 pt-2">
                            <p>Se Habla Español</p>
                            <p>Closed on the Sabbath</p>
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Our Services</h4>
                        <ul className="space-y-3 text-sm">
                            <li><a href="/rentals" className="hover:text-primary transition-colors">Road Trailers</a></li>
                            <li><a href="/rentals" className="hover:text-primary transition-colors">Storage Trailers</a></li>
                            <li><a href="/rentals" className="hover:text-primary transition-colors">Flatbeds</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Maintenance & Repair</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">Business Solutions</h4>
                        <ul className="space-y-3 text-sm">
                            <li><a href="#" className="hover:text-primary transition-colors">Register Business</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Travel Agencies</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Partner Program</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Corporate Rates</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">About Us</h4>
                        <ul className="space-y-3 text-sm">
                            <li><a href="#" className="hover:text-primary transition-colors">Fleetco Group</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Sustainability</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Press & News</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Investor Relations</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs gap-4">
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white">Help</a>
                        <a href="#" className="hover:text-white">Rental Information</a>
                        <a href="#" className="hover:text-white">Terms & Conditions</a>
                        <a href="#" className="hover:text-white">Privacy Policy</a>
                    </div>
                    <div>
                        © 2026 Fleetco Trailer Rentals. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
}
