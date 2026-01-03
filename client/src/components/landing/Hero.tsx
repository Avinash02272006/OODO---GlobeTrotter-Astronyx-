'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Calendar, Shield, Globe2, Sparkles } from 'lucide-react';
import Link from 'next/link';

const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 hero-glow">
            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-5xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] mb-8">
                            <Sparkles className="w-4 h-4 text-blue-400" />
                            <span className="text-xs font-bold tracking-widest uppercase text-gray-400">
                                Intelligent Travel Planning
                            </span>
                        </div>

                        <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8 leading-[0.9]">
                            Design your <br />
                            <span className="text-accent">dream journey.</span>
                        </h1>

                        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
                            GlobeTrotter transforms the way you plan and experience travel.
                            Dream, design, and organize multi-city trips with ease.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <Link href="/register">
                                <button className="btn-premium group flex items-center">
                                    Start Planning Free
                                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </Link>
                            <button className="btn-secondary">
                                Watch Demo
                            </button>
                        </div>
                    </motion.div>

                    {/* Features Grid */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32"
                    >
                        {[
                            {
                                icon: <MapPin className="w-6 h-6 text-blue-400" />,
                                title: "Smart Routes",
                                desc: "Optimized multi-city travel paths powered by intelligence."
                            },
                            {
                                icon: <Calendar className="w-6 h-6 text-purple-400" />,
                                title: "Visual Timelines",
                                desc: "Visualize your entire journey through structured itineraries."
                            },
                            {
                                icon: <Shield className="w-6 h-6 text-pink-400" />,
                                title: "Budget Control",
                                desc: "Make cost-effective decisions with real-time tracking."
                            }
                        ].map((item, i) => (
                            <div key={i} className="glass-card p-8 rounded-[32px] text-left group card-glow">
                                <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;

