'use client'
import React, { useState } from 'react';
import { Calendar, Clock, Search, Filter, ChevronLeft, ChevronRight, Plus, X, Check, AlertCircle } from 'lucide-react';

const AppointmentPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('day'); // 'day', 'week', 'month'
  const [filterOpen, setFilterOpen] = useState(false);
  const [newAppointmentOpen, setNewAppointmentOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<{
    id: number;
    patientName: string;
    time: string;
    endTime: string;
    type: string;
    status: string;
    purpose: string;
    notes: string;
    contactNumber: string;
    insurance: string;
  } | null>(null);
  
  // Mock appointment data
  const appointments = [
    { 
      id: 1, 
      patientName: 'Abdul-Nishan', 
      time: '08:00', 
      endTime: '08:30', 
      type: 'Consultation',
      status: 'confirmed',
      purpose: 'Annual checkup',
      notes: 'Patient requested discussion about dietary changes',
      contactNumber: '+61 4XX XXX XXX',
      insurance: 'Medicare Plus'
    },
    { 
      id: 2, 
      patientName: 'Adamu', 
      time: '08:20', 
      endTime: '08:50', 
      type: 'Consultation',
      status: 'confirmed',
      purpose: 'Follow-up on medication',
      notes: 'Check blood pressure readings from home monitoring',
      contactNumber: '+61 4XX XXX XXX',
      insurance: 'Health Partners'
    },
    { 
      id: 3, 
      patientName: 'Vibha Jayarajan', 
      time: '08:30', 
      endTime: '09:00', 
      type: 'Consultation',
      status: 'confirmed',
      purpose: 'General check-up',
      notes: 'New patient, first visit',
      contactNumber: '+61 4XX XXX XXX',
      insurance: 'Bupa Health'
    },
    { 
      id: 4, 
      patientName: 'Abayomi Johnson', 
      time: '09:00', 
      endTime: '09:30', 
      type: 'Consultation',
      status: 'confirmed',
      purpose: 'Skin condition examination',
      notes: 'Follow-up from previous visit regarding persistent rash',
      contactNumber: '+61 4XX XXX XXX',
      insurance: 'Medicare Basic'
    },
    { 
      id: 5, 
      patientName: 'Rebecca Gifts', 
      time: '09:30', 
      endTime: '10:00', 
      type: 'Follow-up',
      status: 'confirmed',
      purpose: 'Post-surgery check',
      notes: 'Two weeks after minor procedure, remove stitches',
      contactNumber: '+61 4XX XXX XXX',
      insurance: 'Medibank Private'
    },
    { 
      id: 6, 
      patientName: 'ERC Report Meeting', 
      time: '10:00', 
      endTime: '10:30', 
      type: 'Administrative',
      status: 'confirmed',
      purpose: 'Ethics review committee',
      notes: 'Discuss quarterly ethics reports',
      contactNumber: '',
      insurance: ''
    },
    { 
      id: 7, 
      patientName: 'Consolation meeting', 
      time: '10:30', 
      endTime: '11:00', 
      type: 'Meeting',
      status: 'confirmed',
      purpose: 'Staff meeting',
      notes: 'Monthly department sync',
      contactNumber: '',
      insurance: ''
    },
    { 
      id: 8, 
      patientName: 'Lunch Break', 
      time: '12:00', 
      endTime: '13:00', 
      type: 'Break',
      status: 'confirmed',
      purpose: 'Personal time',
      notes: '',
      contactNumber: '',
      insurance: ''
    },
    { 
      id: 9, 
      patientName: 'Michael Chen', 
      time: '13:30', 
      endTime: '14:00', 
      type: 'Consultation',
      status: 'confirmed',
      purpose: 'Chronic pain management',
      notes: 'Review pain journal and medication efficacy',
      contactNumber: '+61 4XX XXX XXX',
      insurance: 'NIB Health'
    },
    { 
      id: 10, 
      patientName: 'Sarah Williams', 
      time: '14:00', 
      endTime: '14:30', 
      type: 'Consultation',
      status: 'rescheduled',
      purpose: 'Vaccination',
      notes: 'Annual flu shot',
      contactNumber: '+61 4XX XXX XXX',
      insurance: 'BUPA'
    },
    { 
      id: 11, 
      patientName: 'David Thompson', 
      time: '15:00', 
      endTime: '15:30', 
      type: 'Urgent Care',
      status: 'confirmed',
      purpose: 'Severe headache',
      notes: 'Patient called reporting symptoms since yesterday',
      contactNumber: '+61 4XX XXX XXX',
      insurance: 'Medibank'
    },
    { 
      id: 12, 
      patientName: 'Elena Petrova', 
      time: '16:00', 
      endTime: '16:30', 
      type: 'Virtual Consultation',
      status: 'confirmed',
      purpose: 'Test results review',
      notes: 'Video call to discuss recent blood work',
      contactNumber: '+61 4XX XXX XXX',
      insurance: 'AHM Health'
    },
  ];

  // Generate time slots for the day view
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 8; hour < 17; hour++) {
      slots.push(`${hour}:00`);
      slots.push(`${hour}:30`);
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  // Filter appointments for the selected date
  const getAppointmentsForTimeSlot = (timeSlot: string) => {
    return appointments.filter(apt => apt.time === timeSlot);
  };

  // Function to format date
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Function to navigate between dates
  const navigateDate = (direction: number) => {
    const newDate = new Date(selectedDate);
    if (viewMode === 'day') {
      newDate.setDate(selectedDate.getDate() + direction);
    } else if (viewMode === 'week') {
      newDate.setDate(selectedDate.getDate() + (direction * 7));
    } else if (viewMode === 'month') {
      newDate.setMonth(selectedDate.getMonth() + direction);
    }
    setSelectedDate(newDate);
  };

  // Function to handle appointment click
  const handleAppointmentClick = (appointment: {
    id: number;
    patientName: string;
    time: string;
    endTime: string;
    type: string;
    status: string;
    purpose: string;
    notes: string;
    contactNumber: string;
    insurance: string;
  }) => {
    setSelectedAppointment(appointment);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Appointments</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search appointments..."
                className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <button 
              onClick={() => setFilterOpen(!filterOpen)}
              className="flex items-center px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              <Filter className="h-5 w-5 mr-2" />
              Filter
            </button>
            <button 
              onClick={() => setNewAppointmentOpen(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="h-5 w-5 mr-2" />
              New Appointment
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto p-4">
          {/* Calendar Navigation */}
          <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <button 
                  onClick={() => navigateDate(-1)}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <h2 className="text-lg font-medium mx-4">
                  {formatDate(selectedDate)}
                </h2>
                <button 
                  onClick={() => navigateDate(1)}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
              <div className="flex border rounded-lg overflow-hidden">
                <button 
                  onClick={() => setViewMode('day')}
                  className={`px-4 py-2 text-sm font-medium ${
                    viewMode === 'day' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Day
                </button>
                <button 
                  onClick={() => setViewMode('week')}
                  className={`px-4 py-2 text-sm font-medium ${
                    viewMode === 'week' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Week
                </button>
                <button 
                  onClick={() => setViewMode('month')}
                  className={`px-4 py-2 text-sm font-medium ${
                    viewMode === 'month' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Month
                </button>
              </div>
            </div>
          </div>

          {/* Day View */}
          {viewMode === 'day' && (
            <div className="bg-white rounded-lg shadow-sm">
              <div className="border-b p-4">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-blue-600 mr-2" />
                  <h3 className="font-medium">
                    Daily Schedule - {selectedDate.toLocaleDateString('en-US', { weekday: 'long' })}
                  </h3>
                </div>
              </div>
              <div className="overflow-y-auto">
                {timeSlots.map((timeSlot, index) => {
                  const aptsForSlot = getAppointmentsForTimeSlot(timeSlot);
                  const isOddHour = timeSlot.endsWith(':00');
                  
                  return (
                    <div 
                      key={index}
                      className={`flex border-b ${isOddHour ? 'bg-white' : 'bg-gray-50'}`}
                    >
                      <div className="p-4 w-24 flex-shrink-0 border-r text-center">
                        <div className="font-medium text-gray-700">{timeSlot}</div>
                      </div>
                      <div className="flex-1 p-2">
                        {aptsForSlot.length > 0 ? (
                          <div className="flex flex-col space-y-2">
                            {aptsForSlot.map(apt => (
                              <div 
                                key={apt.id}
                                onClick={() => handleAppointmentClick(apt)}
                                className={`p-3 rounded-lg cursor-pointer flex items-center ${
                                  apt.type === 'Urgent Care' 
                                    ? 'bg-red-50 border-l-4 border-red-500' 
                                    : apt.type === 'Meeting' || apt.type === 'Administrative'
                                      ? 'bg-purple-50 border-l-4 border-purple-500'
                                      : apt.type === 'Break'
                                        ? 'bg-gray-50 border-l-4 border-gray-500'
                                        : apt.type === 'Virtual Consultation'
                                          ? 'bg-teal-50 border-l-4 border-teal-500'
                                          : 'bg-blue-50 border-l-4 border-blue-500'
                                }`}
                              >
                                <div className="flex-1">
                                  <div className="font-medium">{apt.patientName}</div>
                                  <div className="flex items-center text-sm text-gray-500">
                                    <Clock className="h-3 w-3 mr-1" />
                                    {apt.time} - {apt.endTime}
                                    <span className="mx-2">•</span>
                                    {apt.type}
                                  </div>
                                </div>
                                <div className="flex items-center">
                                  {apt.status === 'confirmed' ? (
                                    <span className="text-xs bg-green-100 text-green-800 py-1 px-2 rounded font-medium">
                                      Confirmed
                                    </span>
                                  ) : apt.status === 'pending' ? (
                                    <span className="text-xs bg-yellow-100 text-yellow-800 py-1 px-2 rounded font-medium">
                                      Pending
                                    </span>
                                  ) : apt.status === 'rescheduled' ? (
                                    <span className="text-xs bg-orange-100 text-orange-800 py-1 px-2 rounded font-medium">
                                      Rescheduled
                                    </span>
                                  ) : (
                                    <span className="text-xs bg-red-100 text-red-800 py-1 px-2 rounded font-medium">
                                      Cancelled
                                    </span>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="h-16 flex items-center justify-center text-sm text-gray-400">
                            No appointments
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Week View Placeholder */}
          {viewMode === 'week' && (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <Calendar className="h-10 w-10 mx-auto text-blue-600 mb-4" />
              <h3 className="text-lg font-medium">Week View</h3>
              <p className="text-gray-500 mt-2">Weekly calendar view will be displayed here.</p>
            </div>
          )}

          {/* Month View Placeholder */}
          {viewMode === 'month' && (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <Calendar className="h-10 w-10 mx-auto text-blue-600 mb-4" />
              <h3 className="text-lg font-medium">Month View</h3>
              <p className="text-gray-500 mt-2">Monthly calendar view will be displayed here.</p>
            </div>
          )}
        </div>
      </div>

      {/* Filter Sidebar */}
      {filterOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-10 flex justify-end">
          <div className="bg-white w-80 shadow-lg h-full animate-slide-in">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="font-medium">Filter Appointments</h3>
              <button 
                onClick={() => setFilterOpen(false)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            <div className="p-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Appointment Type</label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" id="type-all" />
                    <label htmlFor="type-all" className="ml-2 text-sm text-gray-700">All Types</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" id="type-consultation" />
                    <label htmlFor="type-consultation" className="ml-2 text-sm text-gray-700">Consultation</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" id="type-follow-up" />
                    <label htmlFor="type-follow-up" className="ml-2 text-sm text-gray-700">Follow-up</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" id="type-urgent" />
                    <label htmlFor="type-urgent" className="ml-2 text-sm text-gray-700">Urgent Care</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" id="type-virtual" />
                    <label htmlFor="type-virtual" className="ml-2 text-sm text-gray-700">Virtual Consultation</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" id="type-other" />
                    <label htmlFor="type-other" className="ml-2 text-sm text-gray-700">Other</label>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" id="status-all" />
                    <label htmlFor="status-all" className="ml-2 text-sm text-gray-700">All Statuses</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" id="status-confirmed" />
                    <label htmlFor="status-confirmed" className="ml-2 text-sm text-gray-700">Confirmed</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" id="status-pending" />
                    <label htmlFor="status-pending" className="ml-2 text-sm text-gray-700">Pending</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" id="status-rescheduled" />
                    <label htmlFor="status-rescheduled" className="ml-2 text-sm text-gray-700">Rescheduled</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" id="status-cancelled" />
                    <label htmlFor="status-cancelled" className="ml-2 text-sm text-gray-700">Cancelled</label>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                <div className="space-y-2">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">From</label>
                    <input type="date" className="w-full border rounded-md p-2 text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">To</label>
                    <input type="date" className="w-full border rounded-md p-2 text-sm" />
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex space-x-2">
                <button className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-md hover:bg-gray-200">
                  Reset
                </button>
                <button className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Appointment Modal */}
      {newAppointmentOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-10 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg animate-fade-in">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="font-medium">Schedule New Appointment</h3>
              <button 
                onClick={() => setNewAppointmentOpen(false)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Patient</label>
                  <input 
                    type="text" 
                    placeholder="Search or select patient"
                    className="w-full border rounded-md p-2 text-sm"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input 
                      type="date" 
                      className="w-full border rounded-md p-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                    <select className="w-full border rounded-md p-2 text-sm">
                      <option>08:00 AM</option>
                      <option>08:30 AM</option>
                      <option>09:00 AM</option>
                      <option>09:30 AM</option>
                      <option>10:00 AM</option>
                      <option>10:30 AM</option>
                      <option>11:00 AM</option>
                      <option>11:30 AM</option>
                      <option>12:00 PM</option>
                      <option>12:30 PM</option>
                      <option>01:00 PM</option>
                      <option>01:30 PM</option>
                      <option>02:00 PM</option>
                      <option>02:30 PM</option>
                      <option>03:00 PM</option>
                      <option>03:30 PM</option>
                      <option>04:00 PM</option>
                      <option>04:30 PM</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                  <select className="w-full border rounded-md p-2 text-sm">
                    <option>15 minutes</option>
                    <option>30 minutes</option>
                    <option>45 minutes</option>
                    <option>1 hour</option>
                    <option>1.5 hours</option>
                    <option>2 hours</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Appointment Type</label>
                  <select className="w-full border rounded-md p-2 text-sm">
                    <option>Consultation</option>
                    <option>Follow-up</option>
                    <option>Urgent Care</option>
                    <option>Virtual Consultation</option>
                    <option>Administrative</option>
                    <option>Meeting</option>
                    <option>Break</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Purpose</label>
                  <input 
                    type="text" 
                    placeholder="Purpose of the appointment"
                    className="w-full border rounded-md p-2 text-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <textarea 
                    rows={3}
                    placeholder="Additional notes"
                    className="w-full border rounded-md p-2 text-sm"
                  ></textarea>
                </div>
              </div>
              
              <div className="mt-6 flex space-x-2">
                <button 
                  onClick={() => setNewAppointmentOpen(false)}
                  className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => setNewAppointmentOpen(false)}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                >
                  Schedule
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Appointment Details Modal */}
      {selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-10 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg animate-fade-in">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="font-medium">Appointment Details</h3>
              <button 
                onClick={() => setSelectedAppointment(null)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-lg mr-4">
                  {selectedAppointment.patientName.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold text-lg">{selectedAppointment.patientName}</h4>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    {selectedAppointment.time} - {selectedAppointment.endTime} • {selectedAppointment.type}
                  </div>
                </div>
                <div className="ml-auto">
                  {selectedAppointment.status === 'confirmed' ? (
                    <span className="bg-green-100 text-green-800 py-1 px-2 rounded text-xs font-medium">
                      Confirmed
                    </span>
                  ) : selectedAppointment.status === 'pending' ? (
                    <span className="bg-yellow-100 text-yellow-800 py-1 px-2 rounded text-xs font-medium">
                      Pending
                    </span>
                  ) : selectedAppointment.status === 'rescheduled' ? (
                    <span className="bg-orange-100 text-orange-800 py-1 px-2 rounded text-xs font-medium">
                      Rescheduled
                    </span>
                  ) : (
                    <span className="bg-red-100 text-red-800 py-1 px-2 rounded text-xs font-medium">
                      Cancelled
                    </span>
                  )}
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Purpose</p>
                    <p className="font-medium">{selectedAppointment.purpose}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Contact</p>
                    <p className="font-medium">{selectedAppointment.contactNumber || 'N/A'}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Notes</p>
                  <p className="font-medium">{selectedAppointment.notes || 'No notes available'}</p>
                </div>
                
                {selectedAppointment.insurance && (
                  <div>
                    <p className="text-sm text-gray-500">Insurance</p>
                    <p className="font-medium">{selectedAppointment.insurance}</p>
                  </div>
                )}
                
                {selectedAppointment.status === 'confirmed' && (
                  <div className="bg-blue-50 p-4 rounded-lg flex items-start mt-4">
                    <AlertCircle className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                    <div>
                      <p className="font-medium text-blue-800">Ready to begin</p>
                      <p className="text-sm text-blue-600">This appointment is coming up in your schedule.</p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center">
                    <Check className="h-4 w-4 mr-2" />
                    Begin Appointment
                  </button>
                </div>
                <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
                  Reschedule
                </button>
                <button className="px-4 py-2 bg-white border border-gray-300 text-red-600 rounded-md hover:bg-gray-50">
                  Cancel Appointment
                </button>
              </div>
            </div>
            <div className="p-4 bg-gray-50 border-t rounded-b-lg">
              <div className="flex justify-between">
                <button className="text-blue-600 text-sm font-medium hover:text-blue-800 flex items-center">
                  <Plus className="h-4 w-4 mr-1" />
                  Add to patient record
                </button>
                <button className="text-blue-600 text-sm font-medium hover:text-blue-800 flex items-center">
                  Send reminder
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upcoming Appointments Sidebar */}
        
    </div>
  );
};

export default AppointmentPage;