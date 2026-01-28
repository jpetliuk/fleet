
import Layout from '../components/layout/Layout';
import {
    User, Bell, Shield, CreditCard, ChevronLeft,
    Lock, LogOut, Upload, Check
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { MOCK_USER } from '../data/mock_user_data';

const SectionHeader = ({ title, description }: { title: string, description: string }) => (
    <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        <p className="text-sm text-gray-500">{description}</p>
    </div>
);

const InputField = ({ label, defaultValue, type = "text" }: { label: string, defaultValue: string, type?: string }) => (
    <div className="mb-4">
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">{label}</label>
        <input
            type={type}
            defaultValue={defaultValue}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-gray-900"
        />
    </div>
);

const Toggle = ({ label, description, defaultChecked }: { label: string, description: string, defaultChecked: boolean }) => {
    const [checked, setChecked] = useState(defaultChecked);
    return (
        <div className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0">
            <div>
                <p className="font-bold text-gray-900">{label}</p>
                <p className="text-xs text-gray-500">{description}</p>
            </div>
            <button
                onClick={() => setChecked(!checked)}
                className={`w-12 h-7 rounded-full transition-colors relative ${checked ? 'bg-primary' : 'bg-gray-200'}`}
            >
                <div className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
        </div>
    );
};

export default function Settings() {
    const user = MOCK_USER;
    const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'security' | 'billing'>('profile');

    const menuItems = [
        { id: 'profile', label: 'Profile Settings', icon: User },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'security', label: 'Security & Login', icon: Shield },
        { id: 'billing', label: 'Payment Methods', icon: CreditCard },
    ];

    return (
        <Layout>
            <div className="bg-[#050505] pt-24 pb-32 px-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 blur-[150px] rounded-full pointer-events-none mix-blend-screen" />
                <div className="container mx-auto relative z-10">
                    <Link to="/dashboard" className="text-gray-400 hover:text-white flex items-center gap-2 text-sm font-bold uppercase tracking-wider transition-colors mb-4">
                        <ChevronLeft size={16} /> Back to Dashboard
                    </Link>
                    <h1 className="text-4xl font-black text-white tracking-tight mb-2">
                        Account <span className="text-gray-500">Settings</span>
                    </h1>
                    <p className="text-gray-400 text-lg font-light max-w-2xl">
                        Manage your personal information, preferences, and account security.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 pb-20 -mt-20 relative z-20">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Navigation */}
                    <div className="w-full lg:w-72 shrink-0 space-y-4">
                        <div className="bg-white rounded-2xl p-2 shadow-sm border border-gray-100 sticky top-24">
                            {menuItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveTab(item.id as any)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === item.id
                                        ? 'bg-primary text-white shadow-md shadow-primary/30'
                                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                                        }`}
                                >
                                    <item.icon size={18} strokeWidth={2} />
                                    {item.label}
                                </button>
                            ))}
                            <div className="h-px bg-gray-100 my-2 mx-2" />
                            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 transition-colors">
                                <LogOut size={18} /> Sign Out
                            </button>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 min-h-[600px] animate-fade-in-up">

                            {activeTab === 'profile' && (
                                <>
                                    <SectionHeader title="Profile Information" description="Update your personal details and driver credentials." />

                                    <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-100">
                                        <div className="h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center border-4 border-white shadow-lg overflow-hidden relative group cursor-pointer">
                                            {/* Placeholder Avatar */}
                                            <User size={40} className="text-gray-400" />
                                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Upload size={20} className="text-white" />
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900">{user.name}</h3>
                                            <p className="text-gray-500 text-sm mb-2">Verified Driver • Member since 2024</p>
                                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-100">
                                                <Check size={12} /> CDL Active
                                            </span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <InputField label="Full Name" defaultValue={user.name} />
                                        <InputField label="Email Address" defaultValue={user.email} type="email" />
                                        <InputField label="Phone Number" defaultValue="+1 (555) 123-4567" type="tel" />
                                        <InputField label="Company Name" defaultValue="Independent Operator" />
                                        <div className="md:col-span-2">
                                            <InputField label="Street Address" defaultValue="123 Hauler Lane" />
                                        </div>
                                        <InputField label="City" defaultValue="Des Moines" />
                                        <InputField label="State / Province" defaultValue="Iowa" />
                                    </div>

                                    <div className="mt-8 flex justify-end">
                                        <button className="bg-primary text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-primary/30 hover:bg-primary-hover hover:-translate-y-0.5 transition-all">
                                            Save Changes
                                        </button>
                                    </div>
                                </>
                            )}

                            {activeTab === 'notifications' && (
                                <>
                                    <SectionHeader title="Notification Preferences" description="Manage how and when we communicate with you." />
                                    <div className="space-y-2">
                                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4 mt-6">Rental Updates</h3>
                                        <Toggle label="Rental Status Changes" description="Get notified when your rental is approved or active." defaultChecked={true} />
                                        <Toggle label="Payment Reminders" description="Receive alerts before upcoming automated payments." defaultChecked={true} />
                                        <Toggle label="Return Deadlines" description="Reminders for upcoming trailer return dates." defaultChecked={true} />

                                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4 mt-8">Marketing</h3>
                                        <Toggle label="Promotional Offers" description="Emails about new features and special discounts." defaultChecked={false} />
                                        <Toggle label="Newsletter" description="Weekly digest of trucking news and events." defaultChecked={false} />
                                    </div>
                                </>
                            )}

                            {activeTab === 'security' && (
                                <>
                                    <SectionHeader title="Security & Login" description="Protect your account with updated credentials." />

                                    <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-4 mb-8 flex gap-4">
                                        <div className="p-2 bg-yellow-100 rounded-lg h-fit text-yellow-700">
                                            <Lock size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-yellow-800 text-sm">Two-Factor Authentication</h4>
                                            <p className="text-yellow-700 text-xs mt-1">We recommend enabling 2FA for an extra layer of security.</p>
                                            <button className="text-yellow-800 font-bold text-xs underline mt-2 hover:text-yellow-900">Enable 2FA</button>
                                        </div>
                                    </div>

                                    <div className="max-w-md">
                                        <InputField label="Current Password" defaultValue="" type="password" />
                                        <InputField label="New Password" defaultValue="" type="password" />
                                        <InputField label="Confirm New Password" defaultValue="" type="password" />

                                        <div className="mt-6">
                                            <button className="bg-gray-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-black transition-all">
                                                Update Password
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}

                            {activeTab === 'billing' && (
                                <>
                                    <SectionHeader title="Payment Methods" description="Manage your cards and billing information." />

                                    <div className="grid gap-4">
                                        <div className="border border-primary bg-primary/5 rounded-xl p-4 flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="bg-white p-2 rounded border border-gray-200">
                                                    <CreditCard size={24} className="text-gray-700" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900">Visa ending in 4242</p>
                                                    <p className="text-xs text-gray-500">Expires 12/28 • Default</p>
                                                </div>
                                            </div>
                                            <span className="text-xs font-bold bg-primary text-white px-2 py-1 rounded">Primary</span>
                                        </div>

                                        <div className="border border-gray-200 rounded-xl p-4 flex items-center justify-between group hover:border-gray-300 transition-colors">
                                            <div className="flex items-center gap-4">
                                                <div className="bg-gray-50 p-2 rounded border border-gray-200">
                                                    <CreditCard size={24} className="text-gray-400" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900">Mastercard ending in 8832</p>
                                                    <p className="text-xs text-gray-500">Expires 10/26</p>
                                                </div>
                                            </div>
                                            <button className="text-gray-400 hover:text-red-500 transition-colors">
                                                <LogOut size={16} /> {/* Using LogOut as a generic remove icon visually if needed or replace with Trash */}
                                            </button>
                                        </div>
                                    </div>

                                    <button className="mt-6 flex items-center gap-2 text-primary font-bold text-sm hover:text-primary-hover transition-colors">
                                        <div className="w-5 h-5 rounded-full border-2 border-primary flex items-center justify-center text-lg leading-none pb-0.5">+</div>
                                        Add New Payment Method
                                    </button>
                                </>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
