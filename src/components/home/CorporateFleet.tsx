
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CorporateFleet() {
    return (
        <section className="bg-[#111111] py-20 text-white">
            <div className="container mx-auto px-4">
                <div className="mb-12">
                    <h2 className="text-3xl font-extrabold mb-4 uppercase tracking-wide">Fleetco Rentals</h2>
                    <p className="text-gray-400 max-w-3xl text-sm leading-relaxed">
                        Our extensive fleet offers businesses of every size access to premium trailer rentals.
                        From 53' road trailers for logistics to secure on-site storage units, we have the inventory
                        to support your operations.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {/* Card 1: Road Trailers */}
                    <Link to="/rentals" className="bg-[#1A1A1A] rounded-xl overflow-hidden group cursor-pointer border border-white/5 hover:border-gray-600 transition-all">
                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-1">Road Trailers</h3>
                            <p className="text-xs text-gray-400">Dry Vans, Reefers, Pups</p>
                        </div>
                        <div className="h-48 overflow-hidden flex items-center justify-center p-4">
                            <img
                                src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80"
                                alt="Road Trailer"
                                className="w-full h-full object-cover rounded-lg opacity-80 group-hover:opacity-100 transition-opacity"
                            />
                        </div>
                    </Link>

                    {/* Card 2: Storage Trailers */}
                    <Link to="/rentals" className="bg-[#1A1A1A] rounded-xl overflow-hidden group cursor-pointer border border-white/5 hover:border-gray-600 transition-all">
                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-1">Storage Trailers</h3>
                            <p className="text-xs text-gray-400">Secure, Water-Tight On-site Storage</p>
                        </div>
                        <div className="h-48 overflow-hidden flex items-center justify-center p-4">
                            <img
                                src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80"
                                alt="Storage Trailer"
                                className="w-full h-full object-cover rounded-lg opacity-80 group-hover:opacity-100 transition-opacity"
                            />
                        </div>
                    </Link>

                    {/* Card 3: Flatbed */}
                    <Link to="/rentals" className="bg-[#1A1A1A] rounded-xl overflow-hidden group cursor-pointer border border-white/5 hover:border-gray-600 transition-all">
                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-1">Flatbed</h3>
                            <p className="text-xs text-gray-400">Heavy Duty Transport</p>
                        </div>
                        <div className="h-48 overflow-hidden flex items-center justify-center p-4">
                            <img
                                src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80"
                                alt="Flatbed"
                                className="w-full h-full object-cover rounded-lg opacity-80 group-hover:opacity-100 transition-opacity"
                            />
                        </div>
                    </Link>
                </div>

                <div className="flex justify-between items-center text-xs text-gray-500 mb-8">
                    <div className="flex gap-2">
                        <span>*Flexible terms available. Ask about our referral incentive!</span>
                    </div>
                    <div className="flex gap-2">
                        <button className="p-2 hover:bg-white/10 rounded-full"><ChevronLeft size={16} /></button>
                        <button className="p-2 hover:bg-white/10 rounded-full"><ChevronRight size={16} /></button>
                    </div>
                </div>

                <div className="flex justify-center">
                    <button className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded font-bold text-sm tracking-wide transition-colors">
                        Register as a business customer
                    </button>
                </div>

            </div>
        </section>
    );
}
