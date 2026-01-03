'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Mail, Lock, ArrowRight, Loader2, Sparkles, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            await login(formData.email, formData.password);
            router.push('/dashboard');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Invalid email or password');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-black text-white flex overflow-hidden">
            {/* Left Side - Visual */}
            <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center p-12">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1436491865332-7a61a109c0f3?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40" />
                <div className="absolute inset-0 bg-gradient-to-br from-black via-black/20 to-transparent" />

                <div className="relative z-10 max-w-lg">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-2xl shadow-white/10">
                            <Globe className="w-10 h-10 text-black" />
                        </div>
                        <h1 className="text-6xl font-bold tracking-tight mb-6 leading-[0.9]">
                            Welcome <br />
                            <span className="text-accent">back home.</span>
                        </h1>
                        <p className="text-gray-400 text-lg leading-relaxed">
                            Your next adventure is waiting for you. Log in to continue planning your dream journey.
                        </p>
                    </motion.div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute bottom-12 left-12 flex items-center space-x-4">
                    <div className="flex -space-x-3">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="w-10 h-10 rounded-full border-2 border-black bg-white/[0.05] backdrop-blur-md" />
                        ))}
                    </div>
                    <span className="text-sm text-gray-500 font-medium">+2.4k travelers joined today</span>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 relative">
                <div className="absolute top-12 left-12 lg:hidden">
                    <Link href="/" className="flex items-center space-x-2">
                        <Globe className="w-8 h-8 text-white" />
                        <span className="text-xl font-bold">GlobeTrotter</span>
                    </Link>
                </div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="w-full max-w-md"
                >
                    <div className="mb-10">
                        <Link href="/" className="inline-flex items-center text-sm text-gray-500 hover:text-white transition-colors mb-8 group">
                            <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
                            Back to website
                        </Link>
                        <h2 className="text-3xl font-bold tracking-tight mb-2">Sign In</h2>
                        <p className="text-gray-500">Enter your credentials to access your account.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm"
                            >
                                {error}
                            </motion.div>
                        )}

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
                                <input
                                    type="email"
                                    required
                                    className="w-full pl-12 pr-4 py-4 bg-white/[0.03] border border-white/[0.08] rounded-2xl focus:outline-none focus:border-white/20 transition-all placeholder:text-gray-700"
                                    placeholder="name@example.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between ml-1">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Password</label>
                                <Link href="#" className="text-xs font-bold uppercase tracking-widest text-blue-400 hover:text-blue-300 transition-colors">Forgot?</Link>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
                                <input
                                    type="password"
                                    required
                                    className="w-full pl-12 pr-4 py-4 bg-white/[0.03] border border-white/[0.08] rounded-2xl focus:outline-none focus:border-white/20 transition-all placeholder:text-gray-700"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full btn-premium py-4 flex items-center justify-center group"
                        >
                            {isLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    Sign In
                                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <p className="mt-8 text-center text-gray-500 text-sm">
                        Don't have an account?{' '}
                        <Link href="/register" className="text-white font-bold hover:underline underline-offset-4">
                            Create one for free
                        </Link>
                    </p>
                </motion.div>
            </div>
        </main>
    );
};

export default LoginPage;
