
import { useState } from 'react';
import { MOCK_USER, type Rental } from '../data/mock_user_data';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/layout/Layout';
import {
    Calendar, Truck, Clock, CheckCircle, Search,
    History, ChevronRight,
    LifeBuoy, ArrowUpRight,
    CreditCard, Settings, Download, ShieldCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';

const StatusBadge = ({ status }: { status: Rental['status'] }) => {
    switch (status) {
        case 'Active':
            return (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 uppercase tracking-wider backdrop-blur-sm">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    Active
                </span>
            );
        case 'Completed':
            return (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-500 border border-gray-200 uppercase tracking-wider">
                    <CheckCircle size={12} /> Completed
                </span>
            );
        case 'Upcoming':
            return (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-600 border border-blue-200 uppercase tracking-wider">
                    <Clock size={12} /> Upcoming
                </span>
            );
        default:
            return null;
    }
};

const StatCard = ({ label, value, subtext, icon: Icon, delay }: { label: string, value: string | number, subtext: string, icon: any, delay: string }) => (
    <div
        className="bg-white p-6 rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 hover:-translate-y-1 transition-transform duration-300 animate-fade-in-up"
        style={{ animationDelay: delay, animationFillMode: 'both' }}
    >
        <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-xl bg-gray-50 text-gray-900`}>
                <Icon size={24} strokeWidth={1.5} />
            </div>
            {subtext.includes('+') && (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                    <ArrowUpRight size={12} /> {subtext}
                </span>
            )}
        </div>
        <div>
            <h3 className="text-3xl font-black text-gray-900 tracking-tight mb-1">{value}</h3>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">{label}</p>
        </div>
    </div>
);

const ActivityItem = ({ title, time, type }: { title: string, time: string, type: 'invoice' | 'alert' | 'info' }) => (
    <div className="flex gap-4 items-start group cursor-pointer p-2 rounded-lg hover:bg-gray-50 transition-colors">
        <div className={`mt-1 h-2 w-2 rounded-full ring-4 ${type === 'invoice' ? 'bg-blue-500 ring-blue-50' :
            type === 'alert' ? 'bg-orange-500 ring-orange-50' : 'bg-gray-400 ring-gray-100'
            }`} />
        <div>
            <p className="text-sm font-semibold text-gray-800 group-hover:text-primary transition-colors">{title}</p>
            <p className="text-xs text-gray-400 font-medium">{time}</p>
        </div>
    </div>
);


export default function Dashboard() {
    const { user } = useAuth();
    // Fallback to mock rentals for now as requested
    const rentals = MOCK_USER.rentals;
    const [filter, setFilter] = useState<'active' | 'completed' | 'upcoming'>('active');

    const activeRental = rentals.find(r => r.status === 'Active');

    const filteredRentals = rentals.filter(rental => {
        return rental.status.toLowerCase() === filter;
    });

    if (!user) {
        return null; // Or redirect to login
    }

    const displayName = user.firstName || user.email.split('@')[0];

    return (
        <Layout>
            {/* Immersive Header */}
            <div className="bg-[#050505] pt-32 pb-32 px-4 relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
                    <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full mix-blend-screen" />
                    <div className="absolute left-10 bottom-0 w-[300px] h-[300px] bg-blue-500/10 blur-[100px] rounded-full mix-blend-screen" />
                </div>

                <div className="container mx-auto relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-8 animate-fade-in-up">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                                <span className="text-emerald-500 font-mono text-xs font-bold uppercase tracking-widest">Driver Account Verified</span>
                            </div>
                            <h1 className="text-white text-5xl font-black tracking-tight mb-4">
                                Hello, <span className="text-gray-500">{displayName}</span>
                            </h1>
                            <p className="text-gray-400 max-w-xl text-lg font-light leading-relaxed">
                                {activeRental
                                    ? <span>You have <strong>1 active rental</strong>. Everything looks good for your current haul.</span>
                                    : <span>You have no active rentals. Ready to get back on the road?</span>
                                }
                            </p>
                        </div>
                        <div className="flex gap-3">

                            <Link to="/settings" className="h-12 w-12 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors backdrop-blur-md">
                                <Settings size={20} />
                            </Link>
                            <Link to="/rentals" className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-6 h-12 rounded-xl font-bold uppercase tracking-wide transition-all shadow-[0_0_20px_rgba(230,57,70,0.3)] hover:shadow-[0_0_30px_rgba(230,57,70,0.5)] hover:scale-105">
                                <Truck size={18} /> Rent Trailer
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content - Overlapping Cards */}
            <div className="bg-[#F8F9FA] min-h-screen px-4 pb-20 -mt-20 relative z-20">
                <div className="container mx-auto">

                    {/* Stats Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 mb-12">
                        <StatCard
                            label="Current Status"
                            value={activeRental ? 'On Rent' : 'Inactive'}
                            subtext={activeRental ? 'Unit Active' : 'Browse Fleet'}
                            icon={Truck}
                            delay="0ms"
                        />
                        <StatCard
                            label={activeRental ? "Payment Due" : "Last Payment"}
                            value={activeRental ? "$450.00" : "$0.00"}
                            subtext={activeRental ? "Due: Oct 1" : "Paid"}
                            icon={CreditCard}
                            delay="100ms"
                        />
                        <StatCard
                            label="Rental Days"
                            value={activeRental ? "15 Days" : "0 Days"}
                            subtext={activeRental ? "Remaining" : "Current"}
                            icon={Clock}
                            delay="200ms"
                        />
                        <StatCard
                            label="Driver Status"
                            value="Verified"
                            subtext="Approved"
                            icon={ShieldCheck}
                            delay="300ms"
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column: Rentals */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="flex items-center justify-between pb-4 border-b border-gray-200/60 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                                <div className="flex items-center gap-6">
                                    {['active', 'upcoming', 'completed'].map((tab) => (
                                        <button
                                            key={tab}
                                            onClick={() => setFilter(tab as any)}
                                            className={`text-sm font-bold uppercase tracking-wider px-1 pb-4 border-b-2 transition-all ${filter === tab
                                                ? 'border-primary text-gray-900'
                                                : 'border-transparent text-gray-400 hover:text-gray-600'
                                                }`}
                                        >
                                            {tab === 'completed' ? 'History' : tab}
                                        </button>
                                    ))}
                                </div>
                                <div className="hidden sm:block text-xs font-mono text-gray-400 uppercase">
                                    {filteredRentals.length} Item{filteredRentals.length !== 1 ? 's' : ''}
                                </div>
                            </div>

                            <div className="space-y-4">
                                {filteredRentals.map((rental, idx) => (
                                    <div
                                        key={rental.id}
                                        className="bg-white rounded-2xl p-2 border border-gray-100 shadow-sm hover:shadow-lg hover:border-primary/20 transition-all duration-300 group animate-fade-in-up"
                                        style={{ animationDelay: `${idx * 100}ms` }}
                                    >
                                        <div className="flex flex-col md:flex-row gap-6 p-4">
                                            <div className="md:w-48 h-32 rounded-xl bg-gray-100 overflow-hidden relative shrink-0">
                                                <img src={rental.trailerImage} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            </div>

                                            <div className="flex-1 flex flex-col justify-between">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <div className="flex items-center gap-3 mb-2">
                                                            <h3 className="text-xl font-black text-gray-900">{rental.trailerName}</h3>
                                                            <StatusBadge status={rental.status} />
                                                        </div>
                                                        <p className="text-sm font-medium text-gray-500 flex items-center gap-2">
                                                            UNIT: <span className="font-mono text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-700">{rental.id.toUpperCase()}</span>
                                                        </p>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-lg font-black text-gray-900">{rental.price}</div>
                                                        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Per Month</div>
                                                    </div>
                                                </div>

                                                <div className="mt-4">
                                                    {/* Progress Mockup */}
                                                    {rental.status === 'Active' && (
                                                        <div className="mb-4">
                                                            <div className="flex justify-between text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                                                                <span>Rental Period</span>
                                                                <span>15 Days Remaining</span>
                                                            </div>
                                                            <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                                                <div className="h-full bg-primary rounded-full w-[65%]"></div>
                                                            </div>
                                                        </div>
                                                    )}

                                                    <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                                                        <div className="flex gap-4 text-xs font-bold text-gray-500">
                                                            <span className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded">
                                                                <Calendar size={12} /> {rental.startDate}
                                                            </span>
                                                            <span className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded">
                                                                <ArrowUpRight size={12} /> {rental.endDate || 'Auto-Renew'}
                                                            </span>
                                                        </div>

                                                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                                                            <button className="text-gray-400 hover:text-primary p-2 hover:bg-primary/5 rounded-lg transition-colors">
                                                                <Download size={18} />
                                                            </button>
                                                            <button className="text-primary font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                                                                Manage Trailer <ChevronRight size={14} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {filteredRentals.length === 0 && (
                                    <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 p-12 text-center animate-fade-in-up">
                                        <div className="bg-blue-50 h-16 w-16 mx-auto rounded-full flex items-center justify-center mb-6">
                                            <Search size={32} className="text-blue-500" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">No rentals match your filter</h3>
                                        <p className="text-gray-500">Try changing your search criteria or browse our fleet.</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right Column: Sidebar */}
                        <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
                            {/* Activity Feed */}
                            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                                <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider mb-6 flex items-center gap-2">
                                    <History size={16} className="text-primary" /> Activity Log
                                </h3>
                                <div className="space-y-4 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-100">
                                    <ActivityItem
                                        title="Invoice #4920 Paid"
                                        time="Today, 9:41 AM"
                                        type="invoice"
                                    />
                                    <ActivityItem
                                        title="Maintenance Request Created"
                                        time="Yesterday, 4:20 PM"
                                        type="alert"
                                    />
                                    <ActivityItem
                                        title="Rental Agreement Updated"
                                        time="Oct 24, 2:30 PM"
                                        type="info"
                                    />
                                </div>
                                <Link to="/activity" className="block text-center w-full mt-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                                    View Full History
                                </Link>
                            </div>

                            {/* Help / Support Card */}
                            <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d] rounded-2xl p-6 text-white text-center shadow-lg">
                                <div className="bg-white/10 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                                    <LifeBuoy size={24} />
                                </div>
                                <h3 className="font-bold text-lg mb-2">Need Assistance?</h3>
                                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                                    Our fleet support team is available 24/7 to help with any issues on the road.
                                </p>
                                <button className="bg-white text-black w-full py-3 rounded-xl font-bold text-sm uppercase tracking-wide hover:bg-gray-100 transition-colors">
                                    Contact Support
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
