

'use client'
import React, { useState } from 'react';
import { Search, Filter, Plus, User, Phone, Mail, Calendar, Clock, FileText, Activity, 
         Heart, MoreHorizontal,  ArrowLeft,  Edit, MessageSquare, Pill, 
         AlertCircle, X,  Download } from 'lucide-react';

const PatientsPage = () => {
  interface Patient {
    id: number;
    name: string;
    age: number;
    gender: string;
    phone: string;
    email: string;
    address: string;
    lastVisit: string;
    nextAppointment: string;
    bloodType: string;
    status: string;
    conditions: string[];
    allergies: string[];
    medications: { name: string; dosage: string; prescribed: string }[];
    visits: { date: string; reason: string; doctor: string }[];
    vitals: { height: string; weight: string; bmi: string; bp: string; heartRate: string; temperature: string };
    notes: { date: string; content: string; author: string }[];
    documents: { id: number; name: string; date: string; type: string; size: string }[];
  }

  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddNoteModal, setShowAddNoteModal] = useState(false);
  const [showAddMedicationModal, setShowAddMedicationModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  
  // Mock patients data
  const patients = [
    {
      id: 1,
      name: "Vibha Jayarajan",
      age: 34,
      gender: "Female",
      phone: "+61 4XX XXX XXX",
      email: "vibha.j@example.com",
      address: "42 Oceanic Drive, Alice Springs NT 0870",
      lastVisit: "March 21, 2025",
      nextAppointment: "April 15, 2025",
      bloodType: "O+",
      status: "Active",
      conditions: ["Mild Asthma"],
      allergies: ["Penicillin", "Shellfish"],
      medications: [
        { name: "Ventolin inhaler", dosage: "2 puffs as needed", prescribed: "Jan 10, 2025" },
        { name: "Loratadine", dosage: "10mg daily during allergy season", prescribed: "Dec 10, 2024" }
      ],
      visits: [
        { date: "March 21, 2025", reason: "General check-up", doctor: "You" },
        { date: "February 15, 2025", reason: "Asthma review", doctor: "Dr. Emma Chen" },
        { date: "December 10, 2024", reason: "Seasonal flu", doctor: "Dr. James Wilson" }
      ],
      vitals: {
        height: "168 cm",
        weight: "65 kg",
        bmi: "23.0",
        bp: "120/80 mmHg",
        heartRate: "72 bpm",
        temperature: "36.6 °C"
      },
      notes: [
        { date: "March 21, 2025", content: "Patient reports mild wheezing during morning exercise. Advised to use inhaler before physical activity.", author: "You" },
        { date: "February 15, 2025", content: "Lung function tests show normal results. Continues maintenance therapy.", author: "Dr. Emma Chen" }
      ],
      documents: [
        { id: 1, name: "Blood Test Results", date: "March 15, 2025", type: "Lab Report", size: "2.4 MB" },
        { id: 2, name: "Chest X-Ray", date: "February 15, 2025", type: "Imaging", size: "8.7 MB" },
        { id: 3, name: "Medical History", date: "January 20, 2025", type: "Document", size: "1.2 MB" }
      ]
    },
    {
      id: 2,
      name: "Abdul-Nishan",
      age: 45,
      gender: "Male",
      phone: "+61 4XX XXX XXX",
      email: "abdul.n@example.com",
      address: "78 Central Avenue, Alice Springs NT 0870",
      lastVisit: "March 12, 2025",
      nextAppointment: "March 26, 2025",
      bloodType: "A+",
      status: "Active",
      conditions: ["Hypertension", "Type 2 Diabetes"],
      allergies: ["Sulfa drugs"],
      medications: [
        { name: "Metformin", dosage: "500mg twice daily", prescribed: "Feb 15, 2025" },
        { name: "Lisinopril", dosage: "10mg daily", prescribed: "Feb 15, 2025" }
      ],
      visits: [
        { date: "March 12, 2025", reason: "Diabetes follow-up", doctor: "You" },
        { date: "February 15, 2025", reason: "Medication review", doctor: "You" },
        { date: "January 20, 2025", reason: "Annual physical", doctor: "Dr. Emma Chen" }
      ],
      vitals: {
        height: "175 cm",
        weight: "82 kg",
        bmi: "26.8",
        bp: "135/85 mmHg",
        heartRate: "78 bpm",
        temperature: "36.5 °C"
      },
      notes: [
        { date: "March 12, 2025", content: "Blood glucose levels have improved since last visit. Continue current medication regimen.", author: "You" },
        { date: "February 15, 2025", content: "Adjusted medication dosage. Patient reports better control of symptoms.", author: "You" }
      ],
      documents: [
        { id: 1, name: "Diabetes Management Plan", date: "March 12, 2025", type: "Document", size: "1.8 MB" },
        { id: 2, name: "Blood Glucose Log", date: "March 12, 2025", type: "Lab Report", size: "1.1 MB" },
        { id: 3, name: "ECG Results", date: "January 20, 2025", type: "Test Results", size: "3.5 MB" }
      ]
    },
    {
      id: 3,
      name: "Adamu",
      age: 29,
      gender: "Male",
      phone: "+61 4XX XXX XXX",
      email: "adamu@example.com",
      address: "15 Riverside Road, Alice Springs NT 0870",
      lastVisit: "March 18, 2025",
      nextAppointment: "April 2, 2025",
      bloodType: "B-",
      status: "Active",
      conditions: ["Anxiety"],
      allergies: ["Latex"],
      medications: [
        { name: "Sertraline", dosage: "50mg daily", prescribed: "Mar 18, 2025" }
      ],
      visits: [
        { date: "March 18, 2025", reason: "Anxiety follow-up", doctor: "You" },
        { date: "February 25, 2025", reason: "Initial consultation", doctor: "Dr. Sarah Johnson" }
      ],
      vitals: {
        height: "180 cm",
        weight: "75 kg",
        bmi: "23.1",
        bp: "118/75 mmHg",
        heartRate: "68 bpm",
        temperature: "36.7 °C"
      },
      notes: [
        { date: "March 18, 2025", content: "Patient reports improved sleep and reduced anxiety symptoms. Will continue current treatment plan.", author: "You" }
      ],
      documents: [
        { id: 1, name: "Mental Health Assessment", date: "February 25, 2025", type: "Document", size: "1.6 MB" }
      ]
    },
    {
      id: 4,
      name: "Abayomi Johnson",
      age: 52,
      gender: "Male",
      phone: "+61 4XX XXX XXX",
      email: "a.johnson@example.com",
      address: "203 Mountain View, Alice Springs NT 0870",
      lastVisit: "March 5, 2025",
      nextAppointment: "March 22, 2025",
      bloodType: "AB+",
      status: "Active",
      conditions: ["Osteoarthritis", "High Cholesterol"],
      allergies: ["Aspirin"],
      medications: [
        { name: "Atorvastatin", dosage: "20mg daily", prescribed: "Mar 5, 2025" },
        { name: "Ibuprofen", dosage: "400mg as needed for pain", prescribed: "Mar 5, 2025" }
      ],
      visits: [
        { date: "March 5, 2025", reason: "Joint pain", doctor: "You" },
        { date: "January 15, 2025", reason: "Cholesterol check", doctor: "Dr. James Wilson" },
        { date: "November 20, 2024", reason: "Flu vaccination", doctor: "Dr. Emma Chen" }
      ],
      vitals: {
        height: "178 cm",
        weight: "88 kg",
        bmi: "27.8",
        bp: "132/82 mmHg",
        heartRate: "74 bpm",
        temperature: "36.4 °C"
      },
      notes: [
        { date: "March 5, 2025", content: "Patient reports increased joint pain in knees. Recommended physical therapy and continued use of anti-inflammatory medication.", author: "You" }
      ],
      documents: [
        { id: 1, name: "Lipid Panel Results", date: "January 15, 2025", type: "Lab Report", size: "1.5 MB" },
        { id: 2, name: "Knee X-Ray", date: "March 5, 2025", type: "Imaging", size: "7.2 MB" }
      ]
    },
    {
      id: 5,
      name: "Rebecca Gifts",
      age: 38,
      gender: "Female",
      phone: "+61 4XX XXX XXX",
      email: "rebecca.g@example.com",
      address: "55 Harbor Lane, Alice Springs NT 0870",
      lastVisit: "March 15, 2025",
      nextAppointment: "March 29, 2025",
      bloodType: "O-",
      status: "Active",
      conditions: ["Migraines"],
      allergies: ["None"],
      medications: [
        { name: "Sumatriptan", dosage: "50mg as needed for migraine", prescribed: "Mar 15, 2025" }
      ],
      visits: [
        { date: "March 15, 2025", reason: "Migraine follow-up", doctor: "You" },
        { date: "February 2, 2025", reason: "Migraine assessment", doctor: "You" },
        { date: "December 5, 2024", reason: "Annual check-up", doctor: "Dr. Sarah Johnson" }
      ],
      vitals: {
        height: "165 cm",
        weight: "62 kg",
        bmi: "22.8",
        bp: "110/70 mmHg",
        heartRate: "65 bpm",
        temperature: "36.5 °C"
      },
      notes: [
        { date: "March 15, 2025", content: "Patient reports reduced frequency of migraines with current medication. Advised to maintain sleep hygiene and stress management techniques.", author: "You" }
      ],
      documents: [
        { id: 1, name: "Neurological Assessment", date: "February 2, 2025", type: "Document", size: "2.1 MB" },
        { id: 2, name: "Headache Diary", date: "March 15, 2025", type: "Document", size: "0.8 MB" }
      ]
    },
    {
      id: 6,
      name: "Michael Chen",
      age: 41,
      gender: "Male",
      phone: "+61 4XX XXX XXX",
      email: "m.chen@example.com",
      address: "112 Eucalyptus Street, Alice Springs NT 0870",
      lastVisit: "March 10, 2025",
      nextAppointment: "April 10, 2025",
      bloodType: "A-",
      status: "Active",
      conditions: ["Lower Back Pain", "Insomnia"],
      allergies: ["Peanuts"],
      medications: [
        { name: "Cyclobenzaprine", dosage: "10mg as needed for back pain", prescribed: "Mar 10, 2025" },
        { name: "Melatonin", dosage: "3mg before bedtime", prescribed: "Mar 10, 2025" }
      ],
      visits: [
        { date: "March 10, 2025", reason: "Sleep issues and back pain", doctor: "You" },
        { date: "January 25, 2025", reason: "Back pain assessment", doctor: "Dr. Emma Chen" }
      ],
      vitals: {
        height: "175 cm",
        weight: "70 kg",
        bmi: "22.9",
        bp: "125/78 mmHg",
        heartRate: "70 bpm",
        temperature: "36.6 °C"
      },
      notes: [
        { date: "March 10, 2025", content: "Patient reports improvement in sleep quality with melatonin. Back pain still present but less severe. Recommended continued physical therapy.", author: "You" }
      ],
      documents: [
        { id: 1, name: "Spine MRI", date: "January 25, 2025", type: "Imaging", size: "12.6 MB" },
        { id: 2, name: "Sleep Evaluation", date: "March 10, 2025", type: "Document", size: "1.4 MB" }
      ]
    }
  ];

  // Filter patients based on search query
  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.conditions.some(condition => condition.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  // Function to handle patient selection
  const handlePatientSelect = (patient: React.SetStateAction<null>) => {
    setSelectedPatient(patient);
    setActiveTab('overview');
  };

  // Function to go back to patient list
  const handleBackToList = () => {
    setSelectedPatient(null);
  };

  // Function to handle adding a new note
  const handleAddNote = (noteText: string) => {
    if (selectedPatient && noteText.trim()) {
      const newNote = {
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        content: noteText,
        author: "You"
      };
      
      // In a real app, this would update the backend
      const updatedPatient = {
        ...(selectedPatient || {}),
        notes: [newNote, ...(selectedPatient.notes || [])]
      };
      

      setSelectedPatient(updatedPatient);
      setShowAddNoteModal(false);
    }
  };

  // Function to handle adding a new medication
  const handleAddMedication = (medication: { name: any; dosage: any; }) => {
    if (selectedPatient && medication.name && medication.dosage) {
      const newMedication = {
        name: medication.name,
        dosage: medication.dosage,
        prescribed: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
      };
      
      // In a real app, this would update the backend
      const updatedPatient = {
        ...selectedPatient,
        medications: [newMedication, ...(selectedPatient.medications || [])]
      };
      
      setSelectedPatient(updatedPatient);
      setShowAddMedicationModal(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {!selectedPatient ? (
        <>
          {/* Header for Patient List */}
          <header className="bg-white shadow-sm p-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <h1 className="text-2xl font-semibold">Patients</h1>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search patients..."
                    className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
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
                <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  <Plus className="h-5 w-5 mr-2" />
                  Add Patient
                </button>
              </div>
            </div>
          </header>

          {/* Patient List */}
          <div className="flex-1 overflow-auto">
            <div className="max-w-7xl mx-auto p-4">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                {/* Patients Table */}
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Patient
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Contact
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Last Visit
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Conditions
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
                      {filteredPatients.length > 0 ? (
                        filteredPatients.map((patient) => (
                          <tr 
                            key={patient.id} 
                            className="hover:bg-blue-50 cursor-pointer"
                            onClick={() => handlePatientSelect(patient)}
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-medium">
                                  {patient.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                                  <div className="text-sm text-gray-500">{patient.age} yrs • {patient.gender}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{patient.phone}</div>
                              <div className="text-sm text-gray-500">{patient.email}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{patient.lastVisit}</div>
                              <div className="text-sm text-gray-500">{patient.visits[0]?.reason}</div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex flex-wrap gap-1">
                                {patient.conditions.map((condition, idx) => (
                                  <span key={idx} className="inline-flex px-2 text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                    {condition}
                                  </span>
                                ))}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                {patient.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex items-center space-x-3">
                                <button 
                                  className="text-blue-600 hover:text-blue-900"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handlePatientSelect(patient);
                                  }}
                                >
                                  View
                                </button>
                                <button 
                                  className="text-gray-600 hover:text-gray-900"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <MoreHorizontal className="h-5 w-5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="px-6 py-10 text-center text-gray-500">
                            No patients found matching "{searchQuery}". Try a different search term.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Full Page Patient Detail View */}
          <header className="bg-white shadow-sm p-4">
            <div className="max-w-7xl mx-auto flex items-center">
              <button 
                onClick={handleBackToList}
                className="mr-4 p-2 rounded-full hover:bg-gray-100"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-800 font-bold text-lg mr-4">
                  {selectedPatient.name.split(' ').map((n: any[]) => n[0]).join('')}
                </div>
                <div>
                  <h1 className="text-2xl font-bold">{selectedPatient.name}</h1>
                  <p className="text-gray-600">{selectedPatient.age} years • {selectedPatient.gender}</p>
                </div>
              </div>
              <div className="ml-auto flex space-x-2">
                <button 
                  className="px-4 py-2 border rounded-md flex items-center text-blue-600 hover:bg-blue-50"
                  onClick={() => setShowScheduleModal(true)}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule
                </button>
                <button className="px-4 py-2 border rounded-md flex items-center text-blue-600 hover:bg-blue-50">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Message
                </button>
                <button className="px-4 py-2 border rounded-md flex items-center text-blue-600 hover:bg-blue-50">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </button>
              </div>
            </div>
          </header>

          {/* Tabs Navigation */}
          <div className="border-b">
            <div className="max-w-7xl mx-auto">
              <nav className="flex px-4 -mb-px">
                <button 
                  onClick={() => setActiveTab('overview')}
                  className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'overview' 
                      ? 'border-blue-500 text-blue-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Overview
                </button>
                <button 
                  onClick={() => setActiveTab('appointments')}
                  className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'appointments' 
                      ? 'border-blue-500 text-blue-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Appointments
                </button>
                <button 
                  onClick={() => setActiveTab('medications')}
                  className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'medications' 
                      ? 'border-blue-500 text-blue-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Medications
                </button>
                <button 
                  onClick={() => setActiveTab('records')}
                  className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'records' 
                      ? 'border-blue-500 text-blue-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Records
                </button>
                <button 
                  onClick={() => setActiveTab('notes')}
                  className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'notes' 
                      ? 'border-blue-500 text-blue-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Notes
                </button>
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-auto bg-gray-50">
            <div className="max-w-7xl mx-auto p-6">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div>
                  {/* Alert for upcoming appointment */}
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-md">
                    <div className="flex">
                      <AlertCircle className="h-6 w-6 text-blue-500 mr-3" />
                      <div>
                        <p className="font-medium text-blue-700">Upcoming Appointment</p>
                        <p className="text-blue-600">{selectedPatient.nextAppointment} - Follow-up Appointment</p>
                      </div>
                      <button className="ml-auto bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm">
                        View Details
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Left Column */}
                    <div className="md:col-span-1 space-y-6">
                      {/* Contact Information Card */}
                      <div className="bg-white rounded-lg shadow-sm p-6">
                        <h3 className="text-lg font-medium mb-4">Contact Information</h3>
                        <div className="space-y-4">
                          <div className="flex items-start">
                            <Phone className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                            <div>
                              <p className="text-sm text-gray-500">Phone</p>
                              <p className="font-medium">{selectedPatient.phone}</p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <Mail className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                            <div>
                              <p className="text-sm text-gray-500">Email</p>
                              <p className="font-medium">{selectedPatient.email}</p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <User className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                            <div>
                              <p className="text-sm text-gray-500">Address</p>
                              <p className="font-medium">{selectedPatient.address}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Quick Info Card */}
                      <div className="bg-white rounded-lg shadow-sm p-6">
                        <h3 className="text-lg font-medium mb-4">Medical Summary</h3>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-sm text-gray-500">Blood Type</p>
                            <p className="font-medium">{selectedPatient.bloodType}</p>
                          </div>
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-sm text-gray-500">Last Visit</p>
                            <p className="font-medium
                            ">{selectedPatient.lastVisit}</p>
                          </div>
                        </div>
                        
                        <h4 className="font-medium text-gray-700 mb-2">Conditions</h4>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {selectedPatient.conditions.map((condition: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined, idx: React.Key | null | undefined) => (
                            <span key={idx} className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm">
                              {condition}
                            </span>
                          ))}
                        </div>
                        
                        <h4 className="font-medium text-gray-700 mb-2">Allergies</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedPatient.allergies.length > 0 ? (
                            selectedPatient.allergies.map((allergy: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined, idx: React.Key | null | undefined) => (
                              <span key={idx} className="px-3 py-1 rounded-full bg-red-100 text-red-800 text-sm">
                                {allergy}
                              </span>
                            ))
                          ) : (
                            <span className="text-sm text-gray-500">No known allergies</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Center and Right Columns */}
                    <div className="md:col-span-2 space-y-6">
                      {/* Vital Signs Card */}
                      <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-lg font-medium">Vital Signs</h3>
                          <span className="text-sm text-gray-500">Last updated: {selectedPatient.lastVisit}</span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          <div className="flex items-center p-3 border rounded-md">
                            <Heart className="h-5 w-5 text-red-500 mr-3" />
                            <div>
                              <p className="text-sm text-gray-500">Heart Rate</p>
                              <p className="font-medium">{selectedPatient.vitals.heartRate}</p>
                            </div>
                          </div>
                          <div className="flex items-center p-3 border rounded-md">
                            <Activity className="h-5 w-5 text-blue-500 mr-3" />
                            <div>
                              <p className="text-sm text-gray-500">Blood Pressure</p>
                              <p className="font-medium">{selectedPatient.vitals.bp}</p>
                            </div>
                          </div>
                          <div className="flex items-center p-3 border rounded-md">
                            <Activity className="h-5 w-5 text-green-500 mr-3" />
                            <div>
                              <p className="text-sm text-gray-500">Temperature</p>
                              <p className="font-medium">{selectedPatient.vitals.temperature}</p>
                            </div>
                          </div>
                          <div className="flex items-center p-3 border rounded-md">
                            <User className="h-5 w-5 text-indigo-500 mr-3" />
                            <div>
                              <p className="text-sm text-gray-500">Height</p>
                              <p className="font-medium">{selectedPatient.vitals.height}</p>
                            </div>
                          </div>
                          <div className="flex items-center p-3 border rounded-md">
                            <User className="h-5 w-5 text-indigo-500 mr-3" />
                            <div>
                              <p className="text-sm text-gray-500">Weight</p>
                              <p className="font-medium">{selectedPatient.vitals.weight}</p>
                            </div>
                          </div>
                          <div className="flex items-center p-3 border rounded-md">
                            <Activity className="h-5 w-5 text-purple-500 mr-3" />
                            <div>
                              <p className="text-sm text-gray-500">BMI</p>
                              <p className="font-medium">{selectedPatient.vitals.bmi}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Current Medications */}
                      <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-lg font-medium">Current Medications</h3>
                          <button 
                            className="text-sm text-blue-600 font-medium"
                            onClick={() => setShowAddMedicationModal(true)}
                          >
                            Add Medication
                          </button>
                        </div>
                        <div className="space-y-3">
                          {selectedPatient.medications.map((medication: { name: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; dosage: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; prescribed: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }, idx: React.Key | null | undefined) => (
                            <div key={idx} className="flex items-start p-4 border rounded-md">
                              <Pill className="h-5 w-5 text-blue-500 mt-0.5 mr-3" />
                              <div className="flex-1">
                                <p className="font-medium">{medication.name}</p>
                                <p className="text-sm">{medication.dosage}</p>
                                <p className="text-sm text-gray-500">Prescribed: {medication.prescribed}</p>
                              </div>
                              <div className="flex space-x-2">
                                <button className="text-sm text-blue-600">Refill</button>
                                <button className="text-sm text-red-600">Discontinue</button>
                              </div>
                            </div>
                          ))}
                          
                          {selectedPatient.medications.length === 0 && (
                            <div className="p-4 text-center text-gray-500 border rounded-md">
                              No medications currently prescribed.
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Recent Visits */}
                      <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-lg font-medium">Recent Visits</h3>
                          <button className="text-sm text-blue-600 font-medium">View All</button>
                        </div>
                        <div className="space-y-4">
                          {selectedPatient.visits.slice(0, 3).map((visit: { date: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; reason: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; doctor: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }, idx: React.Key | null | undefined) => (
                            <div key={idx} className="p-4 border rounded-lg">
                              <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center">
                                  <Calendar className="h-5 w-5 text-blue-500 mr-2" />
                                  <span className="font-medium">{visit.date}</span>
                                </div>
                                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                                  Completed
                                </span>
                              </div>
                              <h4 className="font-medium mb-1">{visit.reason}</h4>
                              <p className="text-sm text-gray-500">Doctor: {visit.doctor}</p>
                              <div className="mt-3 flex justify-end space-x-2">
                                <button className="text-sm text-blue-600">View Details</button>
                              </div>
                            </div>
                          ))}
                          
                          {selectedPatient.visits.length === 0 && (
                            <div className="p-4 text-center text-gray-500 border rounded-md">
                              No previous visits recorded.
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Clinical Notes */}
                      <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-lg font-medium">Recent Clinical Notes</h3>
                          <button 
                            className="text-sm text-blue-600 font-medium"
                            onClick={() => setShowAddNoteModal(true)}
                          >
                            Add Note
                          </button>
                        </div>
                        <div className="space-y-4">
                          {selectedPatient.notes && selectedPatient.notes.slice(0, 2).map((note: { date: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; author: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; content: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }, idx: React.Key | null | undefined) => (
                            <div key={idx} className="p-4 border rounded-lg">
                              <div className="flex justify-between items-start mb-2">
                                <span className="text-sm text-gray-500">{note.date} by {note.author}</span>
                                <div className="flex space-x-2">
                                  <button className="text-sm text-blue-600">Edit</button>
                                </div>
                              </div>
                              <p className="text-sm">{note.content}</p>
                            </div>
                          ))}
                          
                          {(!selectedPatient.notes || selectedPatient.notes.length === 0) && (
                            <div className="p-4 text-center text-gray-500 border rounded-md">
                              No clinical notes found.
                            </div>
                          )}
                          
                          {selectedPatient.notes && selectedPatient.notes.length > 2 && (
                            <button 
                              className="text-blue-600 text-sm font-medium hover:text-blue-800 w-full text-center py-2 border border-blue-100 rounded-md hover:bg-blue-50"
                              onClick={() => setActiveTab('notes')}
                            >
                              View All Notes
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Appointments Tab */}
              {activeTab === 'appointments' && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-medium">Appointment History</h3>
                    <button 
                      className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm"
                      onClick={() => setShowScheduleModal(true)}
                    >
                      Schedule New Appointment
                    </button>
                  </div>

                  {/* Upcoming Appointment */}
                  <div className="mb-8">
                    <h4 className="text-md font-medium mb-4 text-gray-700">Upcoming Appointment</h4>
                    <div className="p-4 border rounded-lg border-blue-200 bg-blue-50">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center">
                          <Calendar className="h-5 w-5 text-blue-500 mr-2" />
                          <span className="font-medium">{selectedPatient.nextAppointment}</span>
                        </div>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          Upcoming
                        </span>
                      </div>
                      <h4 className="font-medium mb-1">Follow-up Appointment</h4>
                      <div className="flex items-center text-sm text-gray-700 mb-3">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>10:30 AM - 11:00 AM</span>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm">
                          Reschedule
                        </button>
                        <button className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm">
                          Begin Appointment
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Past Appointments */}
                  <div>
                    <h4 className="text-md font-medium mb-4 text-gray-700">Past Appointments</h4>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Date
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Purpose
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Doctor
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {selectedPatient.visits.map((visit: { date: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; reason: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; doctor: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }, idx: React.Key | null | undefined) => (
                            <tr key={idx}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {visit.date}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {visit.reason}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {visit.doctor}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <button className="text-blue-600 hover:text-blue-900 mr-3">View Notes</button>
                                <button className="text-blue-600 hover:text-blue-900">View Tests</button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    
                    {selectedPatient.visits.length === 0 && (
                      <div className="p-8 text-center text-gray-500 border rounded-lg">
                        No past appointments found.
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Medications Tab */}
              {activeTab === 'medications' && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-medium">Medications</h3>
                    <button 
                      className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm"
                      onClick={() => setShowAddMedicationModal(true)}
                    >
                      Add Prescription
                    </button>
                  </div>

                  {/* Current Medications */}
                  <div className="mb-8">
                    <h4 className="text-md font-medium mb-4 text-gray-700">Current Medications</h4>
                    {selectedPatient.medications.length > 0 ? (
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Medication
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Dosage
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Prescribed Date
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {selectedPatient.medications.map((medication: { name: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; dosage: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; prescribed: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }, idx: React.Key | null | undefined) => (
                              <tr key={idx}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                  {medication.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {medication.dosage}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {medication.prescribed}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                  <button className="text-blue-600 hover:text-blue-900 mr-3">Refill</button>
                                  <button className="text-red-600 hover:text-red-900">Discontinue</button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="p-8 text-center text-gray-500 border rounded-lg">
                        No medications currently prescribed.
                      </div>
                    )}
                  </div>

                  {/* Medication History */}
                  <div>
                    <h4 className="text-md font-medium mb-4 text-gray-700">Medication History</h4>
                    <div className="p-8 border rounded-lg flex items-center justify-center text-gray-500">
                      <p>No discontinued medications in patient history.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Records Tab */}
              {activeTab === 'records' && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-medium">Medical Records</h3>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm">
                      Upload New Record
                    </button>
                  </div>

                  {/* Records Categories */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="p-4 border rounded-lg text-center hover:bg-blue-50 cursor-pointer">
                      <div className="rounded-full bg-blue-100 h-16 w-16 flex items-center justify-center mx-auto mb-2">
                        <FileText className="h-8 w-8 text-blue-600" />
                      </div>
                      <h4 className="font-medium">Lab Results</h4>
                      <p className="text-sm text-gray-500">
                        {selectedPatient.documents.filter((doc: { type: string; }) => doc.type === 'Lab Report').length} documents
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg text-center hover:bg-blue-50 cursor-pointer">
                      <div className="rounded-full bg-purple-100 h-16 w-16 flex items-center justify-center mx-auto mb-2">
                        <FileText className="h-8 w-8 text-purple-600" />
                      </div>
                      <h4 className="font-medium">Imaging</h4>
                      <p className="text-sm text-gray-500">
                        {selectedPatient.documents.filter((doc: { type: string; }) => doc.type === 'Imaging').length} documents
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg text-center hover:bg-blue-50 cursor-pointer">
                      <div className="rounded-full bg-green-100 h-16 w-16 flex items-center justify-center mx-auto mb-2">
                        <FileText className="h-8 w-8 text-green-600" />
                      </div>
                      <h4 className="font-medium">Clinical Documents</h4>
                      <p className="text-sm text-gray-500">
                        {selectedPatient.documents.filter((doc: { type: string; }) => doc.type === 'Document').length} documents
                      </p>
                    </div>
                  </div>

                  {/* Recent Documents */}
                  <h4 className="text-md font-medium mb-4 text-gray-700">Recent Documents</h4>
                  {selectedPatient.documents && selectedPatient.documents.length > 0 ? (
                    <div className="space-y-4">
                      {selectedPatient.documents.map((document: { name: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; date: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; type: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; size: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }, idx: React.Key | null | undefined) => (
                        <div key={idx} className="p-4 border rounded-lg">
                          <div className="flex items-start">
                            <FileText className="h-8 w-8 text-blue-500 mr-3" />
                            <div className="flex-1">
                              <h4 className="font-medium">{document.name}</h4>
                              <p className="text-sm text-gray-500">Uploaded on {document.date}</p>
                              <div className="flex items-center mt-2">
                                <span className={`text-xs px-2 py-1 rounded-full mr-2 ${
                                  document.type === 'Lab Report' 
                                    ? 'bg-green-100 text-green-800' 
                                    : document.type === 'Imaging'
                                      ? 'bg-purple-100 text-purple-800'
                                      : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {document.type}
                                </span>
                                <span className="text-xs text-gray-500">{document.size}</span>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <button className="text-blue-600 text-sm hover:text-blue-800">
                                View
                              </button>
                              <button className="text-blue-600 text-sm hover:text-blue-800">
                                <Download className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center text-gray-500 border rounded-lg">
                      No documents found for this patient.
                    </div>
                  )}
                </div>
              )}

              {/* Notes Tab */}
              {activeTab === 'notes' && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-medium">Clinical Notes</h3>
                    <button 
                      className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm"
                      onClick={() => setShowAddNoteModal(true)}
                    >
                      Add New Note
                    </button>
                  </div>

                  <div className="space-y-6">
                    {selectedPatient.notes && selectedPatient.notes.length > 0 ? (
                      selectedPatient.notes.map((note: { date: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; author: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; content: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }, idx: React.Key | null | undefined) => (
                        <div key={idx} className="border rounded-md p-4">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <span className="font-medium">{note.date}</span>
                              <p className="text-sm text-gray-500">By {note.author}</p>
                            </div>
                            <div className="flex space-x-2">
                              <button className="text-sm text-blue-600 hover:text-blue-800">Edit</button>
                              <button className="text-sm text-gray-600 hover:text-gray-800">Print</button>
                            </div>
                          </div>
                          <p className="text-sm whitespace-pre-line">{note.content}</p>
                        </div>
                      ))
                    ) : (
                      <div className="p-8 border rounded-lg flex items-center justify-center text-gray-500">
                        <p>No clinical notes found for this patient.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* Filter Sidebar (Hidden by default) */}
      {filterOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-10 flex justify-end">
          <div className="bg-white w-80 shadow-lg h-full animate-slide-in">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="font-medium">Filter Patients</h3>
              <button 
                onClick={() => setFilterOpen(false)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            <div className="p-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" id="gender-all" />
                    <label htmlFor="gender-all" className="ml-2 text-sm text-gray-700">All</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" id="gender-male" />
                    <label htmlFor="gender-male" className="ml-2 text-sm text-gray-700">Male</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" id="gender-female" />
                    <label htmlFor="gender-female" className="ml-2 text-sm text-gray-700">Female</label>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Age Range</label>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">From</label>
                    <input type="number" className="w-full border rounded-md p-2 text-sm" placeholder="0" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">To</label>
                    <input type="number" className="w-full border rounded-md p-2 text-sm" placeholder="100" />
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Conditions</label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" id="condition-asthma" />
                    <label htmlFor="condition-asthma" className="ml-2 text-sm text-gray-700">Asthma</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" id="condition-diabetes" />
                    <label htmlFor="condition-diabetes" className="ml-2 text-sm text-gray-700">Diabetes</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" id="condition-hypertension" />
                    <label htmlFor="condition-hypertension" className="ml-2 text-sm text-gray-700">Hypertension</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" id="condition-anxiety" />
                    <label htmlFor="condition-anxiety" className="ml-2 text-sm text-gray-700">Anxiety</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" id="condition-arthritis" />
                    <label htmlFor="condition-arthritis" className="ml-2 text-sm text-gray-700">Arthritis</label>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Visit</label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="radio" name="last-visit" className="h-4 w-4 text-blue-600" id="visit-all" />
                    <label htmlFor="visit-all" className="ml-2 text-sm text-gray-700">Any time</label>
                  </div>
                  <div className="flex items-center">
                    <input type="radio" name="last-visit" className="h-4 w-4 text-blue-600" id="visit-week" />
                    <label htmlFor="visit-week" className="ml-2
                    text-sm text-gray-700">Last week</label>
                  </div>
                  <div className="flex items-center">
                    <input type="radio" name="last-visit" className="h-4 w-4 text-blue-600" id="visit-month" />
                    <label htmlFor="visit-month" className="ml-2 text-sm text-gray-700">Last month</label>
                  </div>
                  <div className="flex items-center">
                    <input type="radio" name="last-visit" className="h-4 w-4 text-blue-600" id="visit-3-months" />
                    <label htmlFor="visit-3-months" className="ml-2 text-sm text-gray-700">Last 3 months</label>
                  </div>
                  <div className="flex items-center">
                    <input type="radio" name="last-visit" className="h-4 w-4 text-blue-600" id="visit-year" />
                    <label htmlFor="visit-year" className="ml-2 text-sm text-gray-700">Last year</label>
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

      {/* Add Note Modal */}
      {showAddNoteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-10 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg animate-fade-in">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="font-medium">Add Clinical Note</h3>
              <button 
                onClick={() => setShowAddNoteModal(false)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Patient</label>
                <div className="flex items-center p-2 border rounded-md bg-gray-50">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-medium mr-2">
                    {selectedPatient.name.split(' ').map((n: any[]) => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-medium">{selectedPatient.name}</p>
                    <p className="text-xs text-gray-500">{selectedPatient.age} years • {selectedPatient.gender}</p>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Note</label>
                <textarea 
                  id="clinical-note"
                  rows="8"
                  className="w-full border rounded-md p-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter clinical notes here..."
                ></textarea>
              </div>
              
              <div className="flex space-x-2 justify-end">
                <button 
                  onClick={() => setShowAddNoteModal(false)}
                  className="px-4 py-2 border rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    const noteText = document.getElementById('clinical-note').value;
                    handleAddNote(noteText);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Save Note
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Medication Modal */}
      {showAddMedicationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-10 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg animate-fade-in">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="font-medium">Add Medication</h3>
              <button 
                onClick={() => setShowAddMedicationModal(false)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Patient</label>
                <div className="flex items-center p-2 border rounded-md bg-gray-50">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-medium mr-2">
                    {selectedPatient.name.split(' ').map((n: any[]) => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-medium">{selectedPatient.name}</p>
                    <p className="text-xs text-gray-500">{selectedPatient.age} years • {selectedPatient.gender}</p>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="medication-name">
                  Medication Name
                </label>
                <input 
                  type="text" 
                  id="medication-name"
                  className="w-full border rounded-md p-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Amoxicillin"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="medication-dosage">
                  Dosage Instructions
                </label>
                <input 
                  type="text" 
                  id="medication-dosage"
                  className="w-full border rounded-md p-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., 500mg twice daily"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="medication-duration">
                  Duration
                </label>
                <div className="flex space-x-2">
                  <input 
                    type="number" 
                    id="medication-duration"
                    className="w-1/3 border rounded-md p-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., 14"
                  />
                  <select className="w-2/3 border rounded-md p-2 text-sm focus:ring-blue-500 focus:border-blue-500">
                    <option>Days</option>
                    <option>Weeks</option>
                    <option>Months</option>
                    <option>As needed</option>
                    <option>Indefinitely</option>
                  </select>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="medication-notes">
                  Additional Instructions
                </label>
                <textarea 
                  id="medication-notes"
                  rows={2}
                  className="w-full border rounded-md p-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Take with food to reduce stomach upset"
                ></textarea>
              </div>
              
              <div className="flex space-x-2 justify-end">
                <button 
                  onClick={() => setShowAddMedicationModal(false)}
                  className="px-4 py-2 border rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    const medication = {
                      name: document.getElementById('medication-name').value,
                      dosage: document.getElementById('medication-dosage').value
                    };
                    handleAddMedication(medication);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Prescribe
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-10 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg animate-fade-in">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="font-medium">Schedule Appointment</h3>
              <button 
                onClick={() => setShowScheduleModal(false)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Patient</label>
                <div className="flex items-center p-2 border rounded-md bg-gray-50">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-medium mr-2">
                    {selectedPatient.name.split(' ').map((n: any[]) => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-medium">{selectedPatient.name}</p>
                    <p className="text-xs text-gray-500">{selectedPatient.age} years • {selectedPatient.gender}</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input 
                    type="date" 
                    className="w-full border rounded-md p-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Time
                  </label>
                  <select className="w-full border rounded-md p-2 text-sm focus:ring-blue-500 focus:border-blue-500">
                    <option>08:00 AM</option>
                    <option>08:30 AM</option>
                    <option>09:00 AM</option>
                    <option>09:30 AM</option>
                    <option>10:00 AM</option>
                    <option>10:30 AM</option>
                    <option>11:00 AM</option>
                    <option>11:30 AM</option>
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
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration
                </label>
                <select className="w-full border rounded-md p-2 text-sm focus:ring-blue-500 focus:border-blue-500">
                  <option>15 minutes</option>
                  <option selected>30 minutes</option>
                  <option>45 minutes</option>
                  <option>1 hour</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Appointment Type
                </label>
                <select className="w-full border rounded-md p-2 text-sm focus:ring-blue-500 focus:border-blue-500">
                  <option>General Consultation</option>
                  <option>Follow-up</option>
                  <option>Urgent Care</option>
                  <option>Annual Physical</option>
                  <option>Medication Review</option>
                  <option>Lab Results Review</option>
                  <option>Specialist Referral</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea 
                  rows="2"
                  className="w-full border rounded-md p-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Add any notes about the appointment"
                ></textarea>
              </div>
              
              <div className="flex space-x-2 justify-end">
                <button 
                  onClick={() => setShowScheduleModal(false)}
                  className="px-4 py-2 border rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => setShowScheduleModal(false)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Schedule
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientsPage;

// Add these CSS animations to your global styles
/*
@keyframes slide-in {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-slide-in {
  animation: slide-in 0.2s ease-out;
}

.animate-fade-in {
  animation: fade-in 0.2s ease-out;
}
*/