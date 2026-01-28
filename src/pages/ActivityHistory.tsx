
import Layout from '../components/layout/Layout';
import {
    History, Search, Download,
    FileText, AlertCircle, Clock,
    CreditCard, ChevronLeft, ChevronRight,
    Filter, ChevronDown
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

// Mock Data for Activity History
const MOCK_ACTIVITY = [
    {
        id: 'act-001',
        type: 'invoice',
        title: 'Monthly Payment Processed',
        description: 'Invoice #INV-2024-001 for October Rental',
        date: 'Oct 24, 2024',
        time: '09:41 AM',
        amount: '$450.00',
        status: 'Completed'
    },
    {
        id: 'act-002',
        type: 'maintenance',
        title: 'Maintenance Request Created',
        description: 'Reported brake light issue on Unit #TR-8854',
        date: 'Oct 23, 2024',
        time: '04:20 PM',
        status: 'In Progress'
    },
    {
        id: 'act-003',
        type: 'document',
        title: 'Rental Agreement Updated',
        description: 'New terms accepted for 2025 Fleet Program',
        date: 'Oct 20, 2024',
        time: '02:30 PM',
        status: 'Signed'
    },
    {
        id: 'act-004',
        type: 'rental',
        title: 'Trailer Pickup Confirmed',
        description: 'Unit #TR-8854 picked up from Des Moines Hub',
        date: 'Oct 01, 2024',
        time: '08:00 AM',
        status: 'Completed'
    },
    {
        id: 'act-005',
        type: 'invoice',
        title: 'Security Deposit Refund',
        description: 'Refund for Unit #TR-9921 processed',
        date: 'Sep 28, 2024',
        time: '11:15 AM',
        amount: '+$1,200.00',
        status: 'Refunded'
    },
    {
        id: 'act-006',
        type: 'system',
        title: 'Driver License Verified',
        description: 'CDL verification successful',
        date: 'Sep 15, 2024',
        time: '10:00 AM',
        status: 'Verified'
    }
];

const ActivityIcon = ({ type }: { type: string }) => {
    switch (type) {
        case 'invoice':
            return <CreditCard className="text-blue-500" size={20} />;
        case 'maintenance':
            return <AlertCircle className="text-orange-500" size={20} />;
        case 'document':
            return <FileText className="text-purple-500" size={20} />;
        case 'rental':
            return <Clock className="text-emerald-500" size={20} />;
        default:
            return <History className="text-gray-500" size={20} />;
    }
};

const ActivityStatus = ({ status }: { status: string }) => {
    const getStyle = (s: string) => {
        switch (s.toLowerCase()) {
            case 'completed': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
            case 'in progress': return 'bg-orange-50 text-orange-700 border-orange-100';
            case 'refunded': return 'bg-gray-50 text-gray-700 border-gray-100';
            case 'signed': return 'bg-purple-50 text-purple-700 border-purple-100';
            default: return 'bg-blue-50 text-blue-700 border-blue-100';
        }
    };

    return (
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border capitalize ${getStyle(status)}`}>
            {status}
        </span>
    );
};

export default function ActivityHistory() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const filteredActivity = MOCK_ACTIVITY.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterType === 'all' || item.type === filterType;
        return matchesSearch && matchesFilter;
    });

    return (
        <Layout>
            <div className="bg-[#050505] pt-24 pb-12 px-4 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 blur-[150px] rounded-full pointer-events-none mix-blend-screen" />

                <div className="container mx-auto relative z-10">
                    <div className="mb-6">
                        <Link to="/dashboard" className="text-gray-400 hover:text-white flex items-center gap-2 text-sm font-bold uppercase tracking-wider transition-colors mb-4">
                            <ChevronLeft size={16} /> Back to Dashboard
                        </Link>
                        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-2">
                            Activity <span className="text-gray-500">History</span>
                        </h1>
                        <p className="text-gray-400 text-lg font-light max-w-2xl">
                            View all your transactions, rental updates, and system notifications in one place.
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-[#F8F9FA] min-h-screen px-4 py-8 -mt-6 relative z-20 rounded-t-3xl">
                <div className="container mx-auto">
                    {/* Controls */}
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div className="relative w-full md:w-96">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search activity..."
                                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="flex gap-2 w-full md:w-auto relative z-30">
                            <div className="relative">
                                <button
                                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                                    className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors w-full md:w-48 justify-between"
                                >
                                    <span className="flex items-center gap-2">
                                        <Filter size={16} className="text-gray-400" />
                                        {filterType === 'all' ? 'All Activity' : filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                                    </span>
                                    <ChevronDown size={16} className={`transition-transform duration-200 ${isFilterOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {isFilterOpen && (
                                    <div className="absolute top-full mt-2 w-full bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden flex flex-col z-50 animate-fade-in-up">
                                        {[
                                            { id: 'all', label: 'All Activity' },
                                            { id: 'invoice', label: 'Payments' },
                                            { id: 'maintenance', label: 'Maintenance' },
                                            { id: 'rental', label: 'Rentals' },
                                            { id: 'document', label: 'Documents' }
                                        ].map((opt) => (
                                            <button
                                                key={opt.id}
                                                onClick={() => {
                                                    setFilterType(opt.id);
                                                    setIsFilterOpen(false);
                                                }}
                                                className={`px-4 py-3 text-left text-sm font-medium transition-colors hover:bg-gray-50 flex items-center justify-between ${filterType === opt.id ? 'text-primary bg-primary/5' : 'text-gray-700'
                                                    }`}
                                            >
                                                {opt.label}
                                                {filterType === opt.id && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors">
                                <Download size={16} /> <span className="hidden sm:inline">Export</span>
                            </button>
                        </div>
                    </div>

                    {/* List */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        {filteredActivity.length > 0 ? (
                            <div className="divide-y divide-gray-100">
                                {filteredActivity.map((item, idx) => (
                                    <div
                                        key={item.id}
                                        className="p-6 hover:bg-gray-50 transition-colors flex flex-col md:flex-row gap-6 items-start md:items-center animate-fade-in-up"
                                        style={{ animationDelay: `${idx * 50}ms`, animationFillMode: 'both' }}
                                    >
                                        <div className={`p-3 rounded-xl bg-gray-100 shrink-0`}>
                                            <ActivityIcon type={item.type} />
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-3 mb-1">
                                                <h3 className="font-bold text-gray-900 truncate">{item.title}</h3>
                                                <ActivityStatus status={item.status} />
                                            </div>
                                            <p className="text-gray-500 text-sm truncate">{item.description}</p>
                                        </div>

                                        <div className="text-left md:text-right shrink-0">
                                            {item.amount && (
                                                <div className={`font-bold ${item.amount.startsWith('+') ? 'text-emerald-600' : 'text-gray-900'} mb-1`}>
                                                    {item.amount}
                                                </div>
                                            )}
                                            <div className="flex items-center gap-2 text-xs font-medium text-gray-400 uppercase tracking-wide">
                                                <span>{item.date}</span>
                                                <span>•</span>
                                                <span>{item.time}</span>
                                            </div>
                                        </div>

                                        <div className="hidden md:block text-gray-300">
                                            <ChevronRight size={18} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="p-12 text-center">
                                <div className="bg-gray-50 h-16 w-16 mx-auto rounded-full flex items-center justify-center mb-4">
                                    <Search size={24} className="text-gray-400" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900">No activity found</h3>
                                <p className="text-gray-500 text-sm">Try adjusting your search or filters.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}
