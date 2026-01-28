
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming react-router v6 based on App.tsx structure
import Layout from '../components/layout/Layout';

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate login logic
        console.log('Logging in with:', email, password);
        // In a real app, you'd validate credentials against the backend.
        // For now, regardless of input, we redirect to dashboard.
        navigate('/dashboard');
    };

    return (
        <Layout>
            <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center py-20 px-4">
                <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md border border-gray-100">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight">Welcome Back</h2>
                        <p className="text-gray-500 mt-2 text-sm">Sign in to manage your fleet rentals.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                placeholder="name@company.com"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-3.5 rounded-lg uppercase tracking-wide transition-colors shadow-lg hover:shadow-xl mt-4"
                        >
                            Sign In
                        </button>
                    </form>

                    <div className="mt-6 text-center text-xs text-gray-400">
                        <p>Don't have an account? <a href="#" className="text-primary hover:underline font-bold">Contact Us</a></p>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
