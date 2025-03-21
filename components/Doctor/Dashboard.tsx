"use client"
import React, { useState } from 'react';
import { Calendar, ChevronDown, Search, Bell, Settings, User, CreditCard, FileText, Users, Activity, PlusCircle } from 'lucide-react';

const DoctorDashboard = () => {
  const [expandedAppointment, setExpandedAppointment] = useState('vibha');
  
  // Mock data
  const appointments = [
    { id: 'abdul', time: '8:00', name: 'Abdul-Nishan', type: 'Consultation', status: 'scheduled' },
    { id: 'adamu', time: '8:20', name: 'Adamu', type: 'Consultation', status: 'scheduled' },
    { id: 'vibha', time: '8:30', name: 'Vibha Jayarajan', type: 'Consultation', purpose: 'General check-up', status: 'next' },
    { id: 'abayomi', time: '9:00', name: 'Abayomi Johnson', type: 'Consultation', status: 'scheduled' },
    { id: 'rebecca', time: '9:30', name: 'Rebecca Gifts', type: 'Follow-up', status: 'scheduled' },
    { id: 'erc', time: '10:00', name: 'ERC Report', type: 'Administrative', status: 'scheduled' },
    { id: 'meeting', time: '10:30', name: 'Consolation meeting', type: 'Meeting', status: 'scheduled' },
  ];
  
  const stats = [
    { title: 'Appointments', count: 25, change: '+0.28%', icon: <Calendar className="h-6 w-6 text-blue-500" /> },
    { title: 'Patients', count: 148, change: '+1.12%', icon: <Users className="h-6 w-6 text-green-500" /> },
    { title: 'Revenue', count: '$5,240', change: '+3.5%', icon: <CreditCard className="h-6 w-6 text-purple-500" /> },
    { title: 'Satisfaction', count: '98%', change: '+0.8%', icon: <Activity className="h-6 w-6 text-yellow-500" /> },
  ];
  
  const recentPatients = [
    { name: 'Emma Wilson', age: 42, condition: 'Hypertension', lastVisit: '2 days ago' },
    { name: 'Daniel Lee', age: 35, condition: 'Diabetes Type 2', lastVisit: '1 week ago' },
    { name: 'Sofia Martinez', age: 28, condition: 'Pregnancy (2nd trimester)', lastVisit: '3 days ago' },
    { name: 'James Taylor', age: 67, condition: 'Post-op recovery', lastVisit: 'Yesterday' },
  ];

  const tasks = [
    { task: 'Review lab results for Emma Wilson', priority: 'high', due: 'Today' },
    { task: 'Complete medical report for insurance', priority: 'medium', due: 'Tomorrow' },
    { task: 'Call specialist about Daniel Lee referral', priority: 'medium', due: 'Today' },
    { task: 'Sign off on prescription renewals', priority: 'high', due: 'Today' },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <div>
              <h1 className="text-2xl font-semibold">
                <span className="text-blue-500">Welcome,</span> Doctor
              </h1>
              <p className="text-sm text-gray-500">Friday, March 21, 2025</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              <button className="p-2 rounded-full hover:bg-gray-100 relative">
                <Bell className="h-6 w-6 text-gray-500" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Settings className="h-6 w-6 text-gray-500" />
              </button>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </div>
          </div>
        </header>
        
        {/* Dashboard Content */}
        <div className="px-6 py-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6 transition-all hover:shadow-md">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                    <h3 className="text-2xl font-bold mt-1">{stat.count}</h3>
                    <span className="text-xs font-medium text-green-500 mt-1 inline-block">
                      {stat.change} this week
                    </span>
                  </div>
                  <div className="p-3 rounded-md bg-gray-50">
                    {stat.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Main Dashboard Content */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Column */}
            <div className="w-full lg:w-2/3 space-y-6">
              {/* Schedule Card */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="flex justify-between items-center p-6 border-b">
                  <h2 className="text-lg font-semibold">Upcoming Schedule</h2>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500 mr-3">March 21, 2025</span>
                    <button className="text-sm text-blue-600 font-medium">View All</button>
                  </div>
                </div>
                <div className="p-2">
                  {appointments.map((appointment) => (
                    <div 
                      key={appointment.id} 
                      className={`border-l-4 ${
                        appointment.status === 'next' 
                          ? 'border-green-500 bg-green-50' 
                          : 'border-transparent hover:bg-gray-50'
                      } rounded-lg mb-2 transition-all cursor-pointer`}
                    >
                      <div 
                        className="flex items-center p-4"
                        onClick={() => setExpandedAppointment(
                          expandedAppointment === appointment.id ? '' : appointment.id
                        )}
                      >
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-800 font-medium mr-4">
                          {appointment.time}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{appointment.name}</p>
                          <p className="text-sm text-gray-500">{appointment.type}</p>
                        </div>
                        <div className="flex items-center">
                          {appointment.status === 'next' && (
                            <span className="text-xs font-medium bg-green-100 text-green-800 py-1 px-2 rounded-md mr-3">
                              Next
                            </span>
                          )}
                          <ChevronDown 
                            className={`h-5 w-5 text-gray-400 transform transition-transform ${
                              expandedAppointment === appointment.id ? 'rotate-180' : ''
                            }`} 
                          />
                        </div>
                      </div>
                      {expandedAppointment === appointment.id && (
                        <div className="px-4 pb-4 pt-0">
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Analytics Card */}
              
            </div>
            
            {/* Right Column */}
            <div className="w-full lg:w-1/3 space-y-6">
              {/* Doctor Actions Card */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
                <div className="grid grid-cols-2 gap-4">
                  <button className="flex flex-col items-center justify-center p-4 border rounded-lg hover:bg-blue-50 hover:border-blue-100 transition-colors">
                    <Users className="h-8 w-8 text-blue-500 mb-2" />
                    <span className="text-sm font-medium">New Patient</span>
                  </button>
                  <button className="flex flex-col items-center justify-center p-4 border rounded-lg hover:bg-blue-50 hover:border-blue-100 transition-colors">
                    <Calendar className="h-8 w-8 text-blue-500 mb-2" />
                    <span className="text-sm font-medium">Schedule</span>
                  </button>
                  <button className="flex flex-col items-center justify-center p-4 border rounded-lg hover:bg-blue-50 hover:border-blue-100 transition-colors">
                    <FileText className="h-8 w-8 text-blue-500 mb-2" />
                    <span className="text-sm font-medium">Prescription</span>
                  </button>
                  <button className="flex flex-col items-center justify-center p-4 border rounded-lg hover:bg-blue-50 hover:border-blue-100 transition-colors">
                    <Activity className="h-8 w-8 text-blue-500 mb-2" />
                    <span className="text-sm font-medium">Lab Results</span>
                  </button>
                </div>
              </div>
              
              {/* Recent Patients Card */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="flex justify-between items-center p-6 border-b">
                  <h2 className="text-lg font-semibold">Recent Patients</h2>
                  <button className="text-sm text-blue-600 font-medium">View All</button>
                </div>
                <div className="p-4">
                  {recentPatients.map((patient, index) => (
                    <div key={index} className="flex items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                        <User className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{patient.name}</p>
                        <p className="text-sm text-gray-500">{patient.condition} • {patient.age} years</p>
                      </div>
                      <div className="text-xs text-gray-500">
                        {patient.lastVisit}
                      </div>
                    </div>
                  ))}
                  <button className="w-full mt-2 text-sm text-blue-600 font-medium py-2 border-t flex items-center justify-center">
                    <PlusCircle className="h-4 w-4 mr-1" />
                    Add New Patient
                  </button>
                </div>
              </div>
              
              {/* Tasks Card */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="flex justify-between items-center p-6 border-b">
                  <h2 className="text-lg font-semibold">Tasks</h2>
                  <div className="flex items-center">
                    <span className="text-sm bg-blue-100 text-blue-800 py-1 px-2 rounded-md mr-3">
                      4 Pending
                    </span>
                    <button className="text-sm text-blue-600 font-medium">View All</button>
                  </div>
                </div>
                <div className="p-4">
                  {tasks.map((task, index) => (
                    <div key={index} className="flex items-start p-3 hover:bg-gray-50 rounded-lg">
                      <input type="checkbox" className="mt-1 h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
                      <div className="ml-3 flex-1">
                        <p className="font-medium">{task.task}</p>
                        <div className="flex items-center mt-1">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            task.priority === 'high' 
                              ? 'bg-red-100 text-red-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {task.priority}
                          </span>
                          <span className="text-xs text-gray-500 ml-2">Due: {task.due}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;