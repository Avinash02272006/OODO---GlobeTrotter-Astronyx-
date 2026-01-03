'use client';

import React, { useState } from 'react';
import { motion, Reorder } from 'framer-motion';
import { Plus, Clock, MapPin, Trash2, X, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import api from '@/lib/api';
import { AnimatePresence } from 'framer-motion';

interface ItineraryBuilderProps {
    stops: any[];
    tripId: string;
    onUpdate: () => void;
}

const ItineraryBuilder = ({ stops: initialStops, tripId, onUpdate }: ItineraryBuilderProps) => {
    const [stops, setStops] = useState(initialStops);
    const [isAddingStop, setIsAddingStop] = useState(false);
    const [isAddingActivity, setIsAddingActivity] = useState<{ stopId: string } | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Sync state with props
    React.useEffect(() => {
        setStops(initialStops);
    }, [initialStops]);

    const [stopForm, setStopForm] = useState({
        city: '',
        country: '',
        arrivalDate: '',
        departureDate: '',
        latitude: 0,
        longitude: 0
    });

    const [activityForm, setActivityForm] = useState({
        title: '',
        cost: 0,
        category: 'Sightseeing'
    });

    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [isSearching, setIsSearching] = useState(false);

    const handleLocationSearch = async (query: string) => {
        setSearchQuery(query);
        if (query.length < 3) {
            setSuggestions([]);
            return;
        }
        setIsSearching(true);
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`);
            const data = await response.json();
            setSuggestions(data);
        } catch (error) {
            console.error('Search failed:', error);
        } finally {
            setIsSearching(false);
        }
    };

    const selectLocation = (place: any) => {
        const address = place.display_name.split(', ');
        setStopForm({
            ...stopForm,
            city: address[0] || '',
            country: address[address.length - 1] || '',
            latitude: parseFloat(place.lat),
            longitude: parseFloat(place.lon)
        });
        setSearchQuery(place.display_name);
        setSuggestions([]);
    };

    const handleAddStop = async () => {
        if (!stopForm.city || !stopForm.arrivalDate || !stopForm.departureDate) {
            alert('Please fill in all required fields');
            return;
        }
        setIsLoading(true);
        try {
            await api.post(`/trips/${tripId}/stops`, {
                ...stopForm,
                order: stops.length
            });
            setIsAddingStop(false);
            setStopForm({ city: '', country: '', arrivalDate: '', departureDate: '', latitude: 0, longitude: 0 });
            setSearchQuery('');
            onUpdate();
        } catch (error) {
            console.error('Failed to add stop:', error);
            alert('Failed to add stop. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddActivity = async () => {
        if (!isAddingActivity) return;
        setIsLoading(true);
        try {
            await api.post(`/trips/stops/${isAddingActivity.stopId}/activities`, activityForm);
            setIsAddingActivity(null);
            onUpdate();
        } catch (error) {
            console.error('Failed to add activity:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteStop = async (stopId: string) => {
        if (!confirm('Are you sure you want to delete this stop?')) return;
        try {
            await api.delete(`/trips/stops/${stopId}`);
            onUpdate();
        } catch (error) {
            console.error('Failed to delete stop:', error);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Itinerary</h2>
                <button
                    onClick={() => setIsAddingStop(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600/10 text-blue-400 rounded-xl hover:bg-blue-600/20 transition-all border border-blue-600/20"
                >
                    <Plus className="w-4 h-4" />
                    <span className="font-medium">Add Stop</span>
                </button>
            </div>

            {/* Inline Add Stop Form */}
            <AnimatePresence>
                {isAddingStop && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mb-8 overflow-hidden"
                    >
                        <div className="glass-dark p-6 rounded-3xl border border-blue-500/30 bg-blue-500/5 shadow-[0_0_20px_rgba(59,130,246,0.1)]">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                    <MapPin className="w-5 h-5 text-blue-400" />
                                    New Stop
                                </h3>
                                <button
                                    onClick={() => setIsAddingStop(false)}
                                    className="p-1.5 hover:bg-white/10 rounded-full transition-colors text-gray-400"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search city..."
                                        className="w-full pl-4 pr-10 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-blue-500 text-sm text-white"
                                        value={searchQuery}
                                        onChange={(e) => handleLocationSearch(e.target.value)}
                                    />
                                    {isSearching && (
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                            <Loader2 className="w-3 h-3 animate-spin text-blue-500" />
                                        </div>
                                    )}

                                    {/* Inline Suggestions */}
                                    <AnimatePresence>
                                        {suggestions.length > 0 && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 5 }}
                                                className="absolute left-0 right-0 top-full mt-1 bg-[#1a1a1a] border border-white/10 rounded-xl overflow-hidden z-[50] shadow-2xl"
                                            >
                                                {suggestions.map((place, idx) => (
                                                    <button
                                                        key={idx}
                                                        type="button"
                                                        onClick={() => selectLocation(place)}
                                                        className="w-full px-4 py-3 text-left hover:bg-white/5 transition-colors border-b border-white/5 last:border-none text-xs text-gray-300"
                                                    >
                                                        {place.display_name.split(',').slice(0, 2).join(',')}
                                                    </button>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider ml-1">Arrival</label>
                                        <input
                                            type="date"
                                            className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-blue-500 text-xs text-white"
                                            value={stopForm.arrivalDate}
                                            onChange={(e) => setStopForm({ ...stopForm, arrivalDate: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider ml-1">Departure</label>
                                        <input
                                            type="date"
                                            className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-blue-500 text-xs text-white"
                                            value={stopForm.departureDate}
                                            onChange={(e) => setStopForm({ ...stopForm, departureDate: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <button
                                    onClick={handleAddStop}
                                    disabled={isLoading || !stopForm.city}
                                    className="w-full py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2"
                                >
                                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                                    Add to Itinerary
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Reorder.Group axis="y" values={stops} onReorder={setStops} className="space-y-4">
                {stops.map((stop, idx) => (
                    <Reorder.Item
                        key={stop.id}
                        value={stop}
                        className="glass-dark p-6 rounded-3xl border border-white/5 hover:border-white/10 transition-colors cursor-grab active:cursor-grabbing"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-400 font-bold">
                                    {idx + 1}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold">{stop.city}, {stop.country}</h3>
                                    <p className="text-sm text-gray-400">
                                        {format(new Date(stop.arrivalDate), 'MMM d')} - {format(new Date(stop.departureDate), 'MMM d')}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => handleDeleteStop(stop.id)}
                                className="p-2 text-gray-500 hover:text-red-400 transition-colors"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Activities */}
                        <div className="ml-14 space-y-3">
                            {stop.activities?.map((activity: any) => (
                                <div key={activity.id} className="flex items-center justify-between p-3 bg-white/5 rounded-xl text-sm">
                                    <div className="flex items-center gap-3">
                                        <Clock className="w-4 h-4 text-gray-500" />
                                        <span>{activity.title}</span>
                                    </div>
                                    <span className="text-gray-400">${activity.cost}</span>
                                </div>
                            ))}
                            <button
                                onClick={() => setIsAddingActivity({ stopId: stop.id })}
                                className="flex items-center gap-2 text-xs text-gray-500 hover:text-white transition-colors mt-2"
                            >
                                <Plus className="w-3 h-3" />
                                Add Activity
                            </button>
                        </div>
                    </Reorder.Item>
                ))}
            </Reorder.Group>

            {/* Add Activity Modal */}
            <AnimatePresence>
                {isAddingActivity && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="w-full max-w-md glass-dark p-8 rounded-[32px] border border-white/10"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-2xl font-bold">Add Activity</h3>
                                <button onClick={() => setIsAddingActivity(null)}><X className="w-6 h-6" /></button>
                            </div>
                            <div className="space-y-4">
                                <input
                                    type="text"
                                    placeholder="Activity Title"
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-blue-500"
                                    value={activityForm.title}
                                    onChange={(e) => setActivityForm({ ...activityForm, title: e.target.value })}
                                />
                                <input
                                    type="number"
                                    placeholder="Cost"
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-blue-500"
                                    value={activityForm.cost}
                                    onChange={(e) => setActivityForm({ ...activityForm, cost: Number(e.target.value) })}
                                />
                                <select
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-blue-500"
                                    value={activityForm.category}
                                    onChange={(e) => setActivityForm({ ...activityForm, category: e.target.value })}
                                >
                                    <option value="Sightseeing">Sightseeing</option>
                                    <option value="Food">Food</option>
                                    <option value="Transport">Transport</option>
                                    <option value="Accommodation">Accommodation</option>
                                </select>
                                <button
                                    onClick={handleAddActivity}
                                    disabled={isLoading}
                                    className="w-full py-4 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold transition-colors flex items-center justify-center gap-2"
                                >
                                    {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                                    Add Activity
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ItineraryBuilder;
