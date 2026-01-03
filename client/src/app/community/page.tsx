"use client";

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { Search, Filter, ArrowUpAz, MessageSquare, Heart, Share2, User, MapPin, Star, Sparkles, Plus, ListFilter, X, Image as ImageIcon, Send, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { useSocket } from '@/context/SocketContext';

interface Post {
    id: string;
    title: string;
    content: string;
    image: string | null;
    location: string | null;
    likes: number;
    createdAt: string;
    author: {
        id: string;
        firstName: string;
        lastName: string;
        avatar: string | null;
    };
}

const Community = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [newPost, setNewPost] = useState({ title: '', content: '', location: '', image: '' });
    const [searchQuery, setSearchQuery] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { user } = useAuth();
    const { socket } = useSocket();

    useEffect(() => {
        fetchPosts();
    }, []);

    useEffect(() => {
        if (socket) {
            socket.on('new-post', (post: Post) => {
                setPosts((prev) => [post, ...prev]);
            });

            socket.on('post-liked', ({ postId, likes }: { postId: string, likes: number }) => {
                setPosts((prev) => prev.map(p => p.id === postId ? { ...p, likes } : p));
            });

            return () => {
                socket.off('new-post');
                socket.off('post-liked');
            };
        }
    }, [socket]);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchPosts();
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery]);

    const fetchPosts = async () => {
        try {
            const { data } = await api.get('/community', {
                params: { search: searchQuery }
            });
            setPosts(data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreatePost = async () => {
        if (!user) return alert('Please login to share your journey');
        if (!newPost.title || !newPost.content) return alert('Please fill in all fields');

        setIsSubmitting(true);
        try {
            await api.post('/community', newPost);
            setIsShareModalOpen(false);
            setNewPost({ title: '', content: '', location: '', image: '' });
        } catch (error) {
            console.error('Error creating post:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleLike = async (postId: string) => {
        if (!user) return alert('Please login to like posts');
        try {
            await api.post(`/community/${postId}/like`);
        } catch (error) {
            console.error('Error liking post:', error);
        }
    };

    return (
        <main className="min-h-screen bg-black text-white">
            <Navbar />

            <div className="container mx-auto px-6 pt-32 pb-12">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
                    <div>
                        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-4">
                            <Sparkles className="w-3 h-3 text-blue-400" />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">GlobeTrotter Social</span>
                        </div>
                        <h1 className="text-5xl font-bold tracking-tight mb-2">Travel Community</h1>
                        <p className="text-gray-500 text-lg">Discover itineraries, tips, and stories from fellow travelers.</p>
                    </div>
                    <button
                        onClick={() => setIsShareModalOpen(true)}
                        className="btn-premium"
                    >
                        Share Your Journey
                    </button>
                </div>

                {/* Search and Filters Bar */}
                <div className="glass-card p-2 rounded-[24px] border border-white/10 shadow-2xl shadow-black/50 backdrop-blur-xl mb-16">
                    <div className="flex flex-col lg:flex-row items-center gap-2">
                        <div className="relative flex-1 w-full">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search itineraries, destinations, or travelers..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-14 pr-6 py-5 bg-transparent rounded-2xl focus:outline-none text-base placeholder:text-gray-600"
                            />
                        </div>

                        <div className="h-10 w-[1px] bg-white/10 hidden lg:block" />

                        <div className="flex items-center gap-2 w-full lg:w-auto p-1">
                            <button className="flex-1 lg:flex-none px-6 py-4 bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 rounded-xl flex items-center justify-center gap-2 transition-all group">
                                <ListFilter className="w-4 h-4 text-gray-400 group-hover:text-white" />
                                <span className="text-sm font-medium">Group by</span>
                            </button>
                            <button className="flex-1 lg:flex-none px-6 py-4 bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 rounded-xl flex items-center justify-center gap-2 transition-all group">
                                <Filter className="w-4 h-4 text-gray-400 group-hover:text-white" />
                                <span className="text-sm font-medium">Filter</span>
                            </button>
                            <button className="flex-1 lg:flex-none px-6 py-4 bg-blue-600 hover:bg-blue-500 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/20">
                                <ArrowUpAz className="w-4 h-4" />
                                <span className="text-sm font-medium">Sort by</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Community Feed */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Feed */}
                    <div className="lg:col-span-2 space-y-12">
                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-24 space-y-4">
                                <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
                                <p className="text-gray-500 font-medium">Loading community stories...</p>
                            </div>
                        ) : posts.length === 0 ? (
                            <div className="glass-card p-12 rounded-[40px] text-center">
                                <Sparkles className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                                <h3 className="text-xl font-bold mb-2">No stories yet</h3>
                                <p className="text-gray-500">Be the first to share your journey with the community!</p>
                            </div>
                        ) : (
                            posts.map((post) => (
                                <motion.div
                                    key={post.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="glass-card rounded-[40px] overflow-hidden group"
                                >
                                    <div className="p-8">
                                        <div className="flex items-center justify-between mb-8">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center font-bold text-lg">
                                                    {post.author.avatar ? (
                                                        <img src={post.author.avatar} alt={post.author.firstName} className="w-full h-full object-cover rounded-2xl" />
                                                    ) : (
                                                        post.author.firstName.charAt(0)
                                                    )}
                                                </div>
                                                <div>
                                                    <h4 className="font-bold">{post.author.firstName} {post.author.lastName}</h4>
                                                    <p className="text-xs text-gray-500">
                                                        {new Date(post.createdAt).toLocaleDateString()} • Traveler
                                                    </p>
                                                </div>
                                            </div>
                                            <button className="px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs font-bold hover:bg-white/10 transition-colors">
                                                Follow
                                            </button>
                                        </div>

                                        <h3 className="text-2xl font-bold mb-4 group-hover:text-blue-400 transition-colors">
                                            {post.title}
                                        </h3>
                                        <p className="text-gray-400 leading-relaxed mb-8">
                                            {post.content}
                                        </p>

                                        {post.image && (
                                            <div className="aspect-video rounded-[32px] overflow-hidden mb-8 relative">
                                                <img
                                                    src={post.image}
                                                    alt={post.title}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                />
                                                {post.location && (
                                                    <div className="absolute bottom-6 left-6">
                                                        <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
                                                            <MapPin className="w-3 h-3 text-blue-400" />
                                                            <span className="text-[10px] font-bold uppercase tracking-widest">{post.location}</span>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        <div className="flex items-center justify-between pt-8 border-t border-white/5">
                                            <div className="flex items-center space-x-8">
                                                <button
                                                    onClick={() => handleLike(post.id)}
                                                    className="flex items-center space-x-2 text-gray-500 hover:text-red-400 transition-colors"
                                                >
                                                    <Heart className={`w-5 h-5 ${post.likes > 0 ? 'fill-red-400 text-red-400' : ''}`} />
                                                    <span className="text-sm font-medium">{post.likes}</span>
                                                </button>
                                                <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-400 transition-colors">
                                                    <MessageSquare className="w-5 h-5" />
                                                    <span className="text-sm font-medium">0</span>
                                                </button>
                                                <button className="flex items-center space-x-2 text-gray-500 hover:text-white transition-colors">
                                                    <Share2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                                <span className="text-sm font-bold">4.9</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-12">
                        {/* Trending Destinations */}
                        <div className="glass-card p-8 rounded-[40px]">
                            <h3 className="text-xl font-bold mb-8">Trending Now</h3>
                            <div className="space-y-6">
                                {[
                                    { name: 'Kyoto, Japan', posts: '2.4k posts', img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e' },
                                    { name: 'Santorini, Greece', posts: '1.8k posts', img: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff' },
                                    { name: 'Bali, Indonesia', posts: '1.5k posts', img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4' },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center space-x-4 group cursor-pointer">
                                        <div className="w-16 h-16 rounded-2xl overflow-hidden">
                                            <img src={`${item.img}?q=80&w=200&auto=format&fit=crop`} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm group-hover:text-blue-400 transition-colors">{item.name}</h4>
                                            <p className="text-xs text-gray-500">{item.posts}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Top Contributors */}
                        <div className="glass-card p-8 rounded-[40px]">
                            <h3 className="text-xl font-bold mb-8">Top Contributors</h3>
                            <div className="space-y-6">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/[0.08] flex items-center justify-center">
                                                <User className="w-5 h-5 text-gray-600" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-sm">User_{i}</h4>
                                                <p className="text-[10px] text-gray-500 uppercase tracking-widest">Level {10 - i}</p>
                                            </div>
                                        </div>
                                        <button className="text-blue-400 hover:text-blue-300 transition-colors">
                                            <Plus className="w-5 h-5" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Share Experience Modal */}
            <AnimatePresence>
                {isShareModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsShareModalOpen(false)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-2xl glass-card rounded-[40px] border border-white/10 overflow-hidden"
                        >
                            <div className="p-8">
                                <div className="flex items-center justify-between mb-8">
                                    <h2 className="text-3xl font-bold">Share Your Experience</h2>
                                    <button
                                        onClick={() => setIsShareModalOpen(false)}
                                        className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2 uppercase tracking-widest">Trip Title</label>
                                        <input
                                            type="text"
                                            value={newPost.title}
                                            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                                            placeholder="e.g., Summer in Santorini"
                                            className="w-full px-6 py-4 bg-white/[0.03] border border-white/10 rounded-2xl focus:outline-none focus:border-blue-500/50 transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2 uppercase tracking-widest">Your Story</label>
                                        <textarea
                                            rows={4}
                                            value={newPost.content}
                                            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                                            placeholder="Tell the community about your journey..."
                                            className="w-full px-6 py-4 bg-white/[0.03] border border-white/10 rounded-2xl focus:outline-none focus:border-blue-500/50 transition-all resize-none"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="relative">
                                            <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400" />
                                            <input
                                                type="text"
                                                value={newPost.image}
                                                onChange={(e) => setNewPost({ ...newPost, image: e.target.value })}
                                                placeholder="Image URL"
                                                className="w-full pl-12 pr-4 py-4 bg-white/[0.03] border border-white/10 rounded-2xl focus:outline-none focus:border-blue-500/50 transition-all text-sm"
                                            />
                                        </div>
                                        <div className="relative">
                                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-red-400" />
                                            <input
                                                type="text"
                                                value={newPost.location}
                                                onChange={(e) => setNewPost({ ...newPost, location: e.target.value })}
                                                placeholder="Location"
                                                className="w-full pl-12 pr-4 py-4 bg-white/[0.03] border border-white/10 rounded-2xl focus:outline-none focus:border-blue-500/50 transition-all text-sm"
                                            />
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleCreatePost}
                                        disabled={isSubmitting}
                                        className="w-full py-5 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:cursor-not-allowed rounded-2xl font-bold flex items-center justify-center gap-3 transition-all shadow-xl shadow-blue-600/20"
                                    >
                                        {isSubmitting ? (
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                        ) : (
                                            <Send className="w-5 h-5" />
                                        )}
                                        Post to Community
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </main>
    );
};

export default Community;
