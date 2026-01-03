'use client';

import React, { useState } from 'react';
import { motion, Reorder } from 'framer-motion';
import { Plus, Clock, MapPin, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

interface ItineraryBuilderProps {
    stops: any[];
}

const ItineraryBuilder = ({ stops: initialStops }: ItineraryBuilderProps) => {
    const [stops, setStops] = useState(initialStops);

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Itinerary</h2>
                <button className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors">
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
                            <button className="p-2 text-gray-500 hover:text-red-400 transition-colors">
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
                            <button className="flex items-center gap-2 text-xs text-gray-500 hover:text-white transition-colors mt-2">
                                <Plus className="w-3 h-3" />
                                Add Activity
                            </button>
                        </div>
                    </Reorder.Item>
                ))}
            </Reorder.Group>
        </div>
    );
};

export default ItineraryBuilder;
