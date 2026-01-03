'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Mail, Lock, ArrowRight, Loader2, User, Phone, MapPin, ChevronLeft, Camera, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        city: '',
        country: '',
        password: '',
        additionalInfo: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { register } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            await register(formData);
            router.push('/dashboard');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <main className="min-h-screen bg-black text-white flex overflow-hidden">
            {/* Left Side - Visual */}
            <div className="hidden lg:flex lg:w-1/3 relative items-center justify-center p-12 border-r border-white/5">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-30" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                <div className="relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-2xl shadow-white/10">
                            <Globe className="w-10 h-10 text-black" />
                        </div>
                        <h1 className="text-5xl font-bold tracking-tight mb-6 leading-[0.9]">
                            Join the <br />
                            <span className="text-accent">elite circle.</span>
                        </h1>
                        <p className="text-gray-400 text-lg leading-relaxed">
                            Start your journey with GlobeTrotter today. Experience travel planning like never before.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-2/3 flex items-center justify-center p-6 md:p-12 overflow-y-auto custom-scrollbar">
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="w-full max-w-2xl"
                >
                    <div className="mb-12">
                        <Link href="/" className="inline-flex items-center text-sm text-gray-500 hover:text-white transition-colors mb-8 group">
                            <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
                            Back to website
                        </Link>
                        <h2 className="text-4xl font-bold tracking-tight mb-2">Create Account</h2>
                        <p className="text-gray-500">Join thousands of travelers planning their dream trips.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {error && (
                            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm">
                                {error}
                            </div>
                        )}

                        {/* Profile Photo Placeholder */}
                        <div className="flex items-center space-x-6 mb-12">
                            <div className="w-24 h-24 rounded-[32px] bg-white/[0.03] border border-white/[0.08] border-dashed flex items-center justify-center group cursor-pointer hover:bg-white/[0.05] transition-all">
                                <Camera className="w-8 h-8 text-gray-600 group-hover:scale-110 transition-transform" />
                            </div>
                            <div>
                                <h4 className="font-bold mb-1">Profile Photo</h4>
                                <p className="text-xs text-gray-500">Optional • JPG, PNG up to 5MB</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">First Name</label>
                                <input
                                    name="firstName"
                                    type="text"
                                    required
                                    className="w-full px-6 py-4 bg-white/[0.03] border border-white/[0.08] rounded-2xl focus:outline-none focus:border-white/20 transition-all placeholder:text-gray-700"
                                    placeholder="John"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Last Name</label>
                                <input
                                    name="lastName"
                                    type="text"
                                    required
                                    className="w-full px-6 py-4 bg-white/[0.03] border border-white/[0.08] rounded-2xl focus:outline-none focus:border-white/20 transition-all placeholder:text-gray-700"
                                    placeholder="Doe"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    className="w-full pl-16 pr-6 py-4 bg-white/[0.03] border border-white/[0.08] rounded-2xl focus:outline-none focus:border-white/20 transition-all placeholder:text-gray-700"
                                    placeholder="john@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Phone Number</label>
                                <div className="relative">
                                    <Phone className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
                                    <input
                                        name="phoneNumber"
                                        type="tel"
                                        className="w-full pl-16 pr-6 py-4 bg-white/[0.03] border border-white/[0.08] rounded-2xl focus:outline-none focus:border-white/20 transition-all placeholder:text-gray-700"
                                        placeholder="+1 (555) 000-0000"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
                                    <input
                                        name="password"
                                        type="password"
                                        required
                                        className="w-full pl-16 pr-6 py-4 bg-white/[0.03] border border-white/[0.08] rounded-2xl focus:outline-none focus:border-white/20 transition-all placeholder:text-gray-700"
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">City</label>
                                <input
                                    name="city"
                                    type="text"
                                    className="w-full px-6 py-4 bg-white/[0.03] border border-white/[0.08] rounded-2xl focus:outline-none focus:border-white/20 transition-all placeholder:text-gray-700"
                                    placeholder="New York"
                                    value={formData.city}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Country</label>
                                <input
                                    name="country"
                                    type="text"
                                    className="w-full px-6 py-4 bg-white/[0.03] border border-white/[0.08] rounded-2xl focus:outline-none focus:border-white/20 transition-all placeholder:text-gray-700"
                                    placeholder="United States"
                                    value={formData.country}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Tell us about yourself</label>
                            <textarea
                                name="additionalInfo"
                                rows={3}
                                className="w-full px-6 py-4 bg-white/[0.03] border border-white/[0.08] rounded-2xl focus:outline-none focus:border-white/20 transition-all placeholder:text-gray-700 resize-none"
                                placeholder="I love exploring hidden gems and local cuisines..."
                                value={formData.additionalInfo}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full btn-premium py-4 flex items-center justify-center group"
                            >
                                {isLoading ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <>
                                        Create Account
                                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>

                    <p className="mt-12 text-center text-gray-500 text-sm">
                        Already have an account?{' '}
                        <Link href="/login" className="text-white font-bold hover:underline underline-offset-4">
                            Sign in instead
                        </Link>
                    </p>
                </motion.div>
            </div>
        </main>
    );
};

export default RegisterPage;
