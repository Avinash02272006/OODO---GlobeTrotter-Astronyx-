'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { Globe, Menu, X, User, LogOut, ChevronDown } from 'lucide-react';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { user, logout } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'My Trips', href: '/dashboard' },
        { name: 'Community', href: '/community' },
        { name: 'Calendar', href: '/calendar' },
        { name: 'Search', href: '/search' },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-black/80 backdrop-blur-lg border-b border-white/5 py-3' : 'bg-transparent py-6'
                }`}
        >
            <div className="container mx-auto px-6 flex justify-between items-center">
                <Link href="/" className="flex items-center space-x-3 group">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center group-hover:rotate-[10deg] transition-transform duration-500 shadow-xl shadow-white/10">
                        <Globe className="w-6 h-6 text-black" />
                    </div>
                    <span className="text-xl font-bold tracking-tight">GlobeTrotter</span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-1">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                        >
                            {link.name}
                        </Link>
                    ))}

                    <div className="h-4 w-[1px] bg-white/10 mx-4" />

                    {user ? (
                        <div className="flex items-center space-x-4">
                            <Link href="/profile" className="flex items-center space-x-3 pl-2 pr-1 py-1 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all group">
                                <span className="text-sm font-medium pl-2">{user.firstName}</span>
                                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                                    <User className="w-4 h-4 text-black" />
                                </div>
                            </Link>
                            <button
                                onClick={logout}
                                className="p-2.5 text-gray-500 hover:text-red-400 hover:bg-red-400/10 rounded-full transition-all"
                                title="Logout"
                            >
                                <LogOut className="w-5 h-5" />
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-3">
                            <Link href="/login" className="px-5 py-2 text-sm font-medium hover:text-white text-gray-400 transition-colors">
                                Login
                            </Link>
                            <Link href="/register" className="btn-premium py-2 px-6 text-sm">
                                Get Started
                            </Link>
                        </div>
                    )}
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden p-2 text-gray-400 hover:text-white"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-black border-b border-white/5 overflow-hidden"
                    >
                        <div className="p-6 flex flex-col space-y-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-lg font-medium text-gray-400 hover:text-white"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="pt-4 border-t border-white/5 flex flex-col space-y-4">
                                {user ? (
                                    <>
                                        <Link href="/profile" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center space-x-3">
                                            <User className="w-5 h-5 text-gray-400" />
                                            <span>{user.firstName} {user.lastName}</span>
                                        </Link>
                                        <button
                                            onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                                            className="text-red-400 flex items-center space-x-3"
                                        >
                                            <LogOut className="w-5 h-5" />
                                            <span>Logout</span>
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="w-full text-center py-3 border border-white/10 rounded-xl">
                                            Login
                                        </Link>
                                        <Link href="/register" onClick={() => setIsMobileMenuOpen(false)} className="w-full text-center py-3 bg-white text-black font-bold rounded-xl">
                                            Get Started
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;

