'use client'
import React, { useState } from 'react';
import { 
  ArrowLeft, User, Search, Plus, FileText, Calendar, Clock, Pill, 
  Edit, Trash2, ChevronDown, ChevronUp, Check, X, Download, Printer
} from 'lucide-react';

interface Prescription {
  id: string;
  patientName: string;
  patientId: string;
  medication: string;
  dosage: string;
  frequency: string;
  duration: string;
  status: 'Active' | 'Completed' | 'Expired';
  prescribedDate: string;
  expiryDate: string;
  instructions: string;
  prescribedBy: string;
  refills: number;
  refillsRemaining: number;
  pharmacy: string;
}

const PrescriptionPage = () => {
  const [activeTab, setActiveTab] = useState<'current' | 'past'>('current');
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);
  const [showNewPrescription, setShowNewPrescription] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock prescription data
  const prescriptions = {
    current: [
      {
        id: 'P-1001',
        patientName: 'Vibha Jayarajan',
        patientId: 'PT-5423',
        medication: 'Amoxicillin',
        dosage: '500mg',
        frequency: 'Three times daily',
        duration: '7 days',
        status: 'Active',
        prescribedDate: '2025-03-18',
        expiryDate: '2025-06-18',
        instructions: 'Take with food to reduce stomach upset.',
        prescribedBy: 'Dr. Emma Chen',
        refills: 2,
        refillsRemaining: 2,
        pharmacy: 'Central Pharmacy'
      },
      {
        id: 'P-1002',
        patientName: 'Abdul-Nishan',
        patientId: 'PT-3867',
        medication: 'Lisinopril',
        dosage: '10mg',
        frequency: 'Once daily',
        duration: '30 days',
        status: 'Active',
        prescribedDate: '2025-03-15',
        expiryDate: '2026-03-15',
        instructions: 'Take in the morning.',
        prescribedBy: 'You',
        refills: 12,
        refillsRemaining: 11,
        pharmacy: 'MediCare Pharmacy'
      },
      {
        id: 'P-1003',
        patientName: 'Abayomi Johnson',
        patientId: 'PT-4219',
        medication: 'Atorvastatin',
        dosage: '20mg',
        frequency: 'Once daily',
        duration: '30 days',
        status: 'Active',
        prescribedDate: '2025-03-05',
        expiryDate: '2026-03-05',
        instructions: 'Take in the evening.',
        prescribedBy: 'You',
        refills: 12,
        refillsRemaining: 11,
        pharmacy: 'HealthPlus Pharmacy'
      }
    ],
    past: [
      {
        id: 'P-0987',
        patientName: 'Vibha Jayarajan',
        patientId: 'PT-5423',
        medication: 'Cetirizine',
        dosage: '10mg',
        frequency: 'Once daily',
        duration: '14 days',
        status: 'Completed',
        prescribedDate: '2025-02-10',
        expiryDate: '2025-05-10',
        instructions: 'Take at night for allergies.',
        prescribedBy: 'Dr. Emma Chen',
        refills: 0,
        refillsRemaining: 0,
        pharmacy: 'Central Pharmacy'
      },
      {
        id: 'P-0975',
        patientName: 'Rebecca Gifts',
        patientId: 'PT-6135',
        medication: 'Sumatriptan',
        dosage: '50mg',
        frequency: 'As needed for migraine',
        duration: '30 days',
        status: 'Expired',
        prescribedDate: '2024-12-15',
        expiryDate: '2025-03-15',
        instructions: 'Take at first sign of migraine. Do not exceed 200mg in 24 hours.',
        prescribedBy: 'You',
        refills: 2,
        refillsRemaining: 1,
        pharmacy: 'MediCare Pharmacy'
      }
    ]
  };

  // Helper functions
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleSelectPrescription = (prescription: Prescription) => {
    setSelectedPrescription(prescription);
    setShowNewPrescription(false);
  };

  const handleNewPrescription = () => {
    setSelectedPrescription(null);
    setShowNewPrescription(true);
  };

  const handleBack = () => {
    setSelectedPrescription(null);
    setShowNewPrescription(false);
  };

  // Filter prescriptions based on search query
  const filteredPrescriptions = {
    current: prescriptions.current.filter(prescription => 
      prescription.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prescription.medication.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    past: prescriptions.past.filter(prescription => 
      prescription.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prescription.medication.toLowerCase().includes(searchQuery.toLowerCase())
    )
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm p-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center">
          {(selectedPrescription || showNewPrescription) && (
            <button 
              onClick={handleBack}
              className="mr-4 p-2 rounded-full hover:bg-gray-100"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
          )}
          <h1 className="text-2xl font-semibold">Prescriptions</h1>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1">
        <div className="max-w-7xl mx-auto p-6">
          {selectedPrescription ? (
            // Prescription Details View
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-medium text-gray-800">Prescription Details</h2>
                    <p className="text-gray-500">Prescription ID: {selectedPrescription.id}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    selectedPrescription.status === 'Active' 
                      ? 'bg-green-100 text-green-800' 
                      : selectedPrescription.status === 'Expired'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-gray-100 text-gray-800'
                  }`}>
                    {selectedPrescription.status}
                  </span>
                </div>
                
                {/* Patient Info */}
                <div className="flex items-center mb-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0 h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-medium mr-4">
                    {selectedPrescription.patientName.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">{selectedPrescription.patientName}</h3>
                    <p className="text-gray-500">Patient ID: {selectedPrescription.patientId}</p>
                  </div>
                  <button className="ml-auto text-blue-600 flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    View Patient
                  </button>
                </div>
                
                {/* Medication Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-md font-medium mb-4 text-gray-700">Medication Information</h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500">Medication</p>
                        <p className="font-medium">{selectedPrescription.medication}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Dosage</p>
                        <p className="font-medium">{selectedPrescription.dosage}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Frequency</p>
                        <p className="font-medium">{selectedPrescription.frequency}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Duration</p>
                        <p className="font-medium">{selectedPrescription.duration}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-md font-medium mb-4 text-gray-700">Prescription Details</h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500">Prescribed Date</p>
                        <p className="font-medium">{formatDate(selectedPrescription.prescribedDate)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Expiry Date</p>
                        <p className="font-medium">{formatDate(selectedPrescription.expiryDate)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Prescribed By</p>
                        <p className="font-medium">{selectedPrescription.prescribedBy}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Pharmacy</p>
                        <p className="font-medium">{selectedPrescription.pharmacy}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Refill Information */}
                <div className="border-t pt-6 mb-6">
                  <h3 className="text-md font-medium mb-4 text-gray-700">Refill Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500">Total Refills</p>
                      <p className="text-xl font-medium">{selectedPrescription.refills}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500">Refills Remaining</p>
                      <p className="text-xl font-medium">{selectedPrescription.refillsRemaining}</p>
                    </div>
                  </div>
                </div>
                
                {/* Special Instructions */}
                <div className="border-t pt-6">
                  <h3 className="text-md font-medium mb-4 text-gray-700">Special Instructions</h3>
                  <p className="text-gray-600 p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                    {selectedPrescription.instructions || "No special instructions provided."}
                  </p>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex flex-wrap gap-4">
                  <button 
                    className="flex-1 min-w-[150px] px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center"
                    disabled={selectedPrescription.status !== 'Active'}
                  >
                    <Pill className="h-4 w-4 mr-2" />
                    Renew Prescription
                  </button>
                  <button 
                    className="flex-1 min-w-[150px] px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 flex items-center justify-center"
                    disabled={selectedPrescription.status !== 'Active'}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Prescription
                  </button>
                  <button 
                    className="flex-1 min-w-[150px] px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 flex items-center justify-center"
                  >
                    <Printer className="h-4 w-4 mr-2" />
                    Print Prescription
                  </button>
                  <button 
                    className="flex-1 min-w-[150px] px-4 py-2 bg-white border border-gray-300 text-red-600 rounded-md hover:bg-gray-50 flex items-center justify-center"
                    disabled={selectedPrescription.status !== 'Active'}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel Prescription
                  </button>
                </div>
              </div>
            </div>
          ) : showNewPrescription ? (
            // New Prescription Form
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-medium text-gray-800 mb-6">New Prescription</h2>
                
                {/* Patient Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Patient</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Search for patient..." 
                      className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>
                
                {/* Medication Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-md font-medium mb-4 text-gray-700">Medication Information</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Medication</label>
                        <input 
                          type="text" 
                          placeholder="Medication name" 
                          className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Dosage</label>
                        <input 
                          type="text" 
                          placeholder="e.g., 500mg" 
                          className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
                        <select className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option value="">Select frequency</option>
                          <option value="once-daily">Once daily</option>
                          <option value="twice-daily">Twice daily</option>
                          <option value="three-times-daily">Three times daily</option>
                          <option value="four-times-daily">Four times daily</option>
                          <option value="as-needed">As needed</option>
                          <option value="other">Other (specify in instructions)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                        <div className="flex space-x-2">
                          <input 
                            type="number" 
                            placeholder="Length" 
                            className="w-1/3 border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <select className="w-2/3 border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="days">Days</option>
                            <option value="weeks">Weeks</option>
                            <option value="months">Months</option>
                            <option value="ongoing">Ongoing</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-md font-medium mb-4 text-gray-700">Prescription Details</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                        <input 
                          type="date" 
                          className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Number of Refills</label>
                        <input 
                          type="number" 
                          placeholder="0" 
                          className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Pharmacy</label>
                        <select className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option value="">Select pharmacy</option>
                          <option value="central">Central Pharmacy</option>
                          <option value="medicare">MediCare Pharmacy</option>
                          <option value="healthplus">HealthPlus Pharmacy</option>
                          <option value="other">Other (patient's choice)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Special Instructions */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Special Instructions</label>
                  <textarea 
                    rows="4" 
                    placeholder="Enter any special instructions or notes for the patient..."
                    className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button 
                  onClick={handleBack}
                  className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center">
                  <Check className="h-4 w-4 mr-2" />
                  Save Prescription
                </button>
              </div>
            </div>
          ) : (
            // Prescription List View
            <>
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 space-y-4 md:space-y-0">
                {/* Tab Controls */}
                <div className="flex">
                  <button 
                    onClick={() => setActiveTab('current')}
                    className={`px-4 py-2 rounded-l-md text-sm font-medium ${
                      activeTab === 'current' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-white text-gray-700 border-y border-l hover:bg-gray-50'
                    }`}
                  >
                    Current Prescriptions
                  </button>
                  <button 
                    onClick={() => setActiveTab('past')}
                    className={`px-4 py-2 rounded-r-md text-sm font-medium ${
                      activeTab === 'past' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-white text-gray-700 border hover:bg-gray-50'
                    }`}
                  >
                    Past Prescriptions
                  </button>
                </div>

                {/* Search and New Prescription */}
                <div className="flex space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search prescriptions..."
                      className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <button 
                    onClick={handleNewPrescription}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    New Prescription
                  </button>
                </div>
              </div>

              {/* Prescription List */}
              <div className="bg-white rounded-lg shadow-sm">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Patient
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Medication
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Prescribed
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredPrescriptions[activeTab].length > 0 ? (
                        filteredPrescriptions[activeTab].map((prescription) => (
                          <tr 
                            key={prescription.id} 
                            className="hover:bg-blue-50 cursor-pointer"
                            onClick={() => handleSelectPrescription(prescription)}
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-medium">
                                  {prescription.patientName.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{prescription.patientName}</div>
                                  <div className="text-sm text-gray-500">ID: {prescription.patientId}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{prescription.medication}</div>
                              <div className="text-sm text-gray-500">{prescription.dosage}, {prescription.frequency}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{formatDate(prescription.prescribedDate)}</div>
                              <div className="text-sm text-gray-500">By: {prescription.prescribedBy}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                prescription.status === 'Active' 
                                  ? 'bg-green-100 text-green-800' 
                                  : prescription.status === 'Expired'
                                    ? 'bg-red-100 text-red-800'
                                    : 'bg-gray-100 text-gray-800'
                              }`}>
                                {prescription.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button 
                                className="text-blue-600 hover:text-blue-900 mr-3"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleSelectPrescription(prescription);
                                }}
                              >
                                View
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="px-6 py-10 text-center text-gray-500">
                            {searchQuery 
                              ? `No prescriptions found matching "${searchQuery}"`
                              : `No ${activeTab} prescriptions found`
                            }
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PrescriptionPage;