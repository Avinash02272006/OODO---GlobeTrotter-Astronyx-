'use client';

import React from 'react';
import Link from 'next/link';
import { Calendar, MapPin, MoreVertical, ArrowRight, Users } from 'lucide-react';
import { format } from 'date-fns';

interface TripCardProps {
    trip: any;
}

const TripCard = ({ trip }: TripCardProps) => {
    return (
        <Link href={`/trips/${trip.id}`}>
            <div className="glass-card rounded-[32px] overflow-hidden group cursor-pointer card-glow">
                <div className="h-48 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-4 right-4 z-10">
                        <button className="p-2 bg-black/20 backdrop-blur-md rounded-full hover:bg-black/40 transition-colors border border-white/10">
                            <MoreVertical className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="absolute bottom-4 left-4 z-10">
                        <div className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[10px] font-bold uppercase tracking-widest">
                            {trip.stops?.length || 0} Stops
                        </div>
                    </div>
                </div>
                <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl font-bold tracking-tight group-hover:text-blue-400 transition-colors">{trip.title}</h3>
                        <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </div>

                    <div className="flex items-center text-gray-500 text-xs mb-6 space-x-4">
                        <div className="flex items-center">
                            <Calendar className="w-3.5 h-3.5 mr-1.5" />
                            {format(new Date(trip.startDate), 'MMM d')} - {format(new Date(trip.endDate), 'MMM d, yyyy')}
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                        <div className="flex -space-x-2">
                            {[1, 2].map((i) => (
                                <div key={i} className="w-7 h-7 rounded-full bg-white/[0.03] border border-black flex items-center justify-center text-[8px] font-bold">
                                    U{i}
                                </div>
                            ))}
                            <div className="w-7 h-7 rounded-full bg-white/[0.03] border border-black flex items-center justify-center text-[8px] font-bold text-gray-500">
                                +
                            </div>
                        </div>
                        <div className="flex items-center text-[10px] font-bold uppercase tracking-widest text-gray-500">
                            <Users className="w-3 h-3 mr-1" />
                            Collaborative
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default TripCard;

