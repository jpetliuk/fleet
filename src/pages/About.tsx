
import Layout from '../components/layout/Layout';
import { Truck, Scale, Wrench, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
    return (
        <Layout>
            {/* Hero Section */}
            <div className="relative h-[400px] w-full overflow-hidden bg-[#111111]">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity"
                    style={{
                        backgroundImage: 'url("https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80")',
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent" />
                <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
                    <span className="text-primary font-bold tracking-widest text-sm uppercase mb-3">Est. 1969</span>
                    <h1 className="text-white text-4xl md:text-6xl font-extrabold mb-4 uppercase tracking-tighter">
                        Our <span className="text-primary">Story</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 max-w-2xl font-light leading-relaxed">
                        Providing expert trailer solutions to the Southeast for over 50 years.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="bg-white py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center mb-24">
                        <div className="lg:w-1/2 order-2 lg:order-1">
                            <h2 className="text-2xl md:text-4xl font-black text-gray-900 mb-6 leading-tight uppercase tracking-tight">
                                The Longest Independently Owned Trailer Leasing Outfit in the Southeast.
                            </h2>
                            <div className="space-y-6 text-gray-600 leading-relaxed text-base md:text-lg">
                                <p>
                                    Established in 1969, Fleetco has built a legacy on one simple promise: <strong className="text-primary">doing business the right way.</strong>
                                    Headquartered in Charlotte, N.C., we have spent over half a century perfecting the art of flexible fleet management.
                                </p>
                                <p>
                                    We specialize in providing tailored solutions for small to medium-sized trailer fleets. Unlike large corporate entities,
                                    we understand that your business needs change rapidly. That's why we offer leasing models that allow you to increase
                                    or decrease your fleet size instantly — without the penalty of additional costs.
                                </p>
                                <p>
                                    Whether you need specific road trailers for a logistical contract or water-tight storage units for on-site inventory,
                                    Fleetco is your partner in growth.
                                </p>
                            </div>
                        </div>

                        {/* Image Grid */}
                        <div className="lg:w-1/2 order-1 lg:order-2 grid grid-cols-2 gap-4">
                            <div className="space-y-4 mt-8 md:mt-12">
                                <img
                                    src="https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&q=80"
                                    alt="Fleetco Yard"
                                    className="w-full h-40 md:h-64 object-cover rounded shadow-lg grayscale hover:grayscale-0 transition-all duration-700"
                                />
                                <div className="bg-gray-100 p-6 rounded h-40 md:h-64 flex flex-col justify-center">
                                    <span className="text-4xl md:text-5xl font-black text-gray-300 mb-2">50+</span>
                                    <span className="font-bold text-gray-900 uppercase tracking-wider text-sm">Years of Service</span>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="bg-primary p-6 rounded h-40 md:h-64 flex flex-col justify-center text-white">
                                    <span className="text-3xl md:text-4xl font-black mb-2">100%</span>
                                    <span className="font-bold uppercase tracking-wider text-sm opacity-90">Customer Satisfaction</span>
                                </div>
                                <img
                                    src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80"
                                    alt="Team working"
                                    className="w-full h-40 md:h-64 object-cover rounded shadow-lg grayscale hover:grayscale-0 transition-all duration-700"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Core Values */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="group p-6 md:p-8 bg-gray-50 rounded-xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-gray-100">
                            <div className="bg-white w-12 h-12 rounded-lg flex items-center justify-center mb-6 shadow-sm group-hover:bg-primary group-hover:text-white transition-colors">
                                <Users className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-lg mb-3 uppercase tracking-tight">Personal Service</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                Come on in and meet Mr. Gil. We believe in face-to-face relationships and expert guidance, not automated phone trees.
                            </p>
                        </div>

                        <div className="group p-6 md:p-8 bg-gray-50 rounded-xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-gray-100">
                            <div className="bg-white w-12 h-12 rounded-lg flex items-center justify-center mb-6 shadow-sm group-hover:bg-primary group-hover:text-white transition-colors">
                                <Scale className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-lg mb-3 uppercase tracking-tight">Extreme Flexibility</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                Scale your fleet up or down as your business demands. Terminate leases at any time with zero penalty costs.
                            </p>
                        </div>

                        <div className="group p-6 md:p-8 bg-gray-50 rounded-xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-gray-100">
                            <div className="bg-white w-12 h-12 rounded-lg flex items-center justify-center mb-6 shadow-sm group-hover:bg-primary group-hover:text-white transition-colors">
                                <Wrench className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-lg mb-3 uppercase tracking-tight">Full Maintenance</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                We don't just lease; we maintain. Our full-scale on-site repair shop ensures every trailer is road-ready and reliable.
                            </p>
                        </div>

                        <div className="group p-6 md:p-8 bg-gray-50 rounded-xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-gray-100">
                            <div className="bg-white w-12 h-12 rounded-lg flex items-center justify-center mb-6 shadow-sm group-hover:bg-primary group-hover:text-white transition-colors">
                                <Truck className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-lg mb-3 uppercase tracking-tight">Local Expert</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                Based in Charlotte since 69'. Pick-up and delivery services available right where you need them.
                            </p>
                        </div>
                    </div>

                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-[#111111] py-20 md:py-32 text-center px-4 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
                <div className="relative z-10 container mx-auto">
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter">Ready to expand your fleet?</h2>
                    <p className="text-gray-400 mb-10 max-w-xl mx-auto text-lg">
                        Join the hundreds of businesses in the Southeast who trust Fleetco for their logistical and storage needs.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button className="bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded font-bold transition-all hover:scale-105 flex items-center justify-center gap-2">
                            Contact Us Today <ArrowRight size={18} />
                        </button>
                        <Link to="/rentals" className="border border-white/20 hover:bg-white/10 text-white px-8 py-4 rounded font-bold transition-colors">
                            View Our Fleet
                        </Link>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

