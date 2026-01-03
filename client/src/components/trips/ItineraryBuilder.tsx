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

    const handleAddStop = async () => {
        setIsLoading(true);
        try {
            await api.post(`/trips/${tripId}/stops`, {
                ...stopForm,
                order: stops.length
            });
            setIsAddingStop(false);
            onUpdate();
        } catch (error) {
            console.error('Failed to add stop:', error);
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
                    className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Add Stop
                </button>
            </div>

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

            {/* Add Stop Modal */}
            <AnimatePresence>
                {isAddingStop && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="w-full max-w-md glass-dark p-8 rounded-[32px] border border-white/10"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-2xl font-bold">Add Stop</h3>
                                <button onClick={() => setIsAddingStop(false)}><X className="w-6 h-6" /></button>
                            </div>
                            <div className="space-y-4">
                                <input
                                    type="text"
                                    placeholder="City"
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-blue-500"
                                    value={stopForm.city}
                                    onChange={(e) => setStopForm({ ...stopForm, city: e.target.value })}
                                />
                                <input
                                    type="text"
                                    placeholder="Country"
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-blue-500"
                                    value={stopForm.country}
                                    onChange={(e) => setStopForm({ ...stopForm, country: e.target.value })}
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs text-gray-500 mb-1 block">Arrival</label>
                                        <input
                                            type="date"
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-blue-500 text-sm"
                                            value={stopForm.arrivalDate}
                                            onChange={(e) => setStopForm({ ...stopForm, arrivalDate: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-500 mb-1 block">Departure</label>
                                        <input
                                            type="date"
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-blue-500 text-sm"
                                            value={stopForm.departureDate}
                                            onChange={(e) => setStopForm({ ...stopForm, departureDate: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <button
                                    onClick={handleAddStop}
                                    disabled={isLoading}
                                    className="w-full py-4 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold transition-colors flex items-center justify-center gap-2"
                                >
                                    {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                                    Add Stop
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

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
