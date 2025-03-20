"use client"
import React, { useState } from 'react';
import { MapPin, ChevronDown, ChevronUp } from 'lucide-react';

export default function DoctorDashboard ()  {
    const [expandedAppointment, setExpandedAppointment] = useState('vibha');

    const toggleAppointment = (id) => {
        if (expandedAppointment === id) {
            setExpandedAppointment(null);
        } else {
            setExpandedAppointment(id);
        }
    };

    return (
    <div className='flex flex-col w-full h-screen overflow-clip'>


    <div className="grid grid-cols-2 p-4 gap-4 bg-gray-50">            
                {/* Appointment Stats */}
                <div className="grid col-span-1 row-span-1 justify-between mb-4">
                        <div className="pr-5 flex w-full">
                            <h1 className="text-3xl"><span className="text-blue-500">Welcome,</span>Doctor</h1>
                        </div>
                    <div className='flex flex-row'>
                    <div className="w-full px-2">
                        <div className="border rounded-lg p-4">
                            <div className="text-xs text-gray-500 mb-1">Appointments</div>
                            <div className="text-3xl font-bold">25</div>
                            <div className="text-xs text-green-500">+0.28%</div>
                        </div>
                    </div>
                    <div className="w-full px-2">
                        <div className="border rounded-lg p-4">
                            <div className="text-xs text-gray-500 mb-1">Appointments</div>
                            <div className="text-3xl font-bold">25</div>
                            <div className="text-xs text-green-500">+0.28%</div>
                        </div>
                    </div>
                    <div className="w-full px-2">
                        <div className="border rounded-lg p-4">
                            <div className="text-xs text-gray-500 mb-1">Appointments</div>
                            <div className="text-3xl font-bold">25</div>
                            <div className="text-xs text-green-500">+0.28%</div>
                        </div>
                    </div>
                    </div>
                </div>
                
                
                <div className="w-full grid col-span-1 row-span-2 bg-white rounded-lg shadow p-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-medium">Upcoming schedule</h2>
                    <a href="#" className="text-blue-500 text-sm">View All</a>
                </div>

                {/* Timeline */}
                <div className="relative">
                    {/* Time markers */}
                    <div className="flex mb-4">
                        <div className="w-16 text-gray-500">8 : 00</div>
                        <div className="w-4 flex justify-center">
                            <div className="w-2 h-2 rounded-full bg-gray-300 mt-2"></div>
                        </div>
                    </div>

                    {/* Appointment 1 */}
                    <div className="flex mb-4">
                        <div className="w-16 text-gray-500">8 : 00</div>
                        <div className="w-4 flex justify-center">
                            <div className="w-2 h-2 rounded-full bg-gray-300 mt-2"></div>
                        </div>
                        <div className="ml-2 flex-1 text-gray-500">Consultation-Abdul-Nishan</div>
                    </div>

                    {/* Appointment 2 */}
                    <div className="flex mb-4">
                        <div className="w-16 text-gray-500">8 : 20</div>
                        <div className="w-4 flex justify-center">
                            <div className="w-2 h-2 rounded-full bg-gray-300 mt-2"></div>
                        </div>
                        <div className="ml-2 flex-1 text-gray-500">Consultation-Adamu</div>
                    </div>

                    {/* Appointment 3 - Expanded */}
                    <div className="mb-4">
                        <div className="flex">
                            <div className="w-16 text-gray-500">8 : 30</div>
                            <div className="w-4 flex justify-center">
                                <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
                            </div>
                            <div className="ml-2 flex-1">
                                <div className="flex justify-between">
                                    <span className="text-blue-500">Consultation Vibha</span>
                                    <button onClick={() => toggleAppointment('vibha')}>
                                        {expandedAppointment === 'vibha' ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {expandedAppointment === 'vibha' && (
                            <div className="ml-20 mt-2 p-3 border-l-4 border-red-500">
                                <div className="grid grid-cols-3 gap-2 mb-2">
                                    <div className="text-gray-500">Patient</div>
                                    <div className="col-span-2">Vibha Jayarajan</div>
                                </div>
                                <div className="grid grid-cols-3 gap-2 mb-2">
                                    <div className="text-gray-500">Time</div>
                                    <div className="col-span-2">8:30 - 9:00</div>
                                </div>
                                <div className="grid grid-cols-3 gap-2 mb-3">
                                    <div className="text-gray-500">Purpose</div>
                                    <div className="col-span-2">General check-up</div>
                                </div>
                                <div className="text-right">
                                    <button className="bg-blue-500 text-white px-4 py-1 rounded text-sm">Begin appointment</button>
                                </div>
                            </div>
                        )}
                    </div>
                    {/* Time marker */}
                    <div className="flex mb-4">
                        <div className="w-16 text-gray-500">9 : 00</div>
                        <div className="w-4 flex justify-center">
                            <div className="w-2 h-2 rounded-full bg-gray-300 mt-2"></div>
                        </div>
                    </div>

                    {/* Appointment 4 */}
                    <div className="flex mb-4">
                        <div className="w-16 text-gray-500">9 : 00</div>
                        <div className="w-4 flex justify-center">
                            <div className="w-2 h-2 rounded-full bg-gray-300 mt-2"></div>
                        </div>
                        <div className="ml-2 flex-1 text-gray-500">Consultation-Abayomi Johnson</div>
                    </div>

                    {/* Appointment 5 */}
                    <div className="flex mb-4">
                        <div className="w-16 text-gray-500">9 : 30</div>
                        <div className="w-4 flex justify-center">
                            <div className="w-2 h-2 rounded-full bg-gray-300 mt-2"></div>
                        </div>
                        <div className="ml-2 flex-1 text-gray-500">Rebecca Gifts</div>
                    </div>

                    {/* Time marker */}
                    <div className="flex mb-4">
                        <div className="w-16 text-gray-500">10 : 00</div>
                        <div className="w-4 flex justify-center">
                            <div className="w-2 h-2 rounded-full bg-gray-300 mt-2"></div>
                        </div>
                    </div>

                    {/* Appointment 6 */}
                    <div className="flex mb-4">
                        <div className="w-16 text-gray-500">10 : 00</div>
                        <div className="w-4 flex justify-center">
                            <div className="w-2 h-2 rounded-full bg-gray-300 mt-2"></div>
                        </div>
                        <div className="ml-2 flex-1 text-gray-500">ERC Report</div>
                    </div>

                    {/* Appointment 7 */}
                    <div className="flex mb-4">
                        <div className="w-16 text-gray-500">10 : 30</div>
                        <div className="w-4 flex justify-center">
                            <div className="w-2 h-2 rounded-full bg-gray-300 mt-2"></div>
                        </div>
                        <div className="ml-2 flex-1 text-gray-500">Consolation meeting</div>
                    </div>

                    {/* Time marker */}
                    <div className="flex mb-4">
                        <div className="w-16 text-gray-500">11 : 00</div>
                        <div className="w-4 flex justify-center">
                            <div className="w-2 h-2 rounded-full bg-gray-300 mt-2"></div>
                        </div>
                    </div>

                </div>
            </div>


            <div className="w-full col-span-1 row-span-1 grid bg-white rounded-lg shadow p-4">
                {/* Patient Details */}
                <div className="mb-4">
                    <div className="flex justify-between mb-2">
                        <div className="font-medium">Patient Name</div>
                        <div className="text-blue-600">Age, Gender</div>
                    </div>
                    <div className="flex items-center text-gray-500 text-sm mb-4">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>Hospital Name, City</span>
                    </div>

                    <div className="mb-4">
                        <div className="font-medium mb-1">Description</div>
                        <p className="text-gray-500 text-sm">
                            Aston Hotel, Alice Springs NT 0870, Australia is a modern hotel, elegant 5 star hotel overlooking the sea, perfect for a romantic, charming...
                            <span className="text-blue-500">Read More...</span>
                        </p>
                    </div>

                    <div className="mb-4">
                        <div className="font-medium mb-2">Preview</div>
                        <div className="flex space-x-2">
                            <img src="/api/placeholder/113/84" alt="Room preview" className="rounded-lg w-28 h-20 object-cover" />
                            <img src="/api/placeholder/113/84" alt="Room preview" className="rounded-lg w-28 h-20 object-cover" />
                            <img src="/api/placeholder/113/84" alt="Room preview" className="rounded-lg w-28 h-20 object-cover" />
                        </div>
                    </div>

                    <button className="w-full py-3 bg-indigo-600 text-white rounded-lg">View Full History</button>
                </div>
            </div>

            {/* Right Panel - Schedule */}
            
        </div>
        
        </div>
    );
};
