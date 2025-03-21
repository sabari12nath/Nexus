'use client';
import React, { useState, useRef, useEffect } from 'react';
import { QrCode, Camera, ArrowLeft,  X,  Upload,  Loader2, FileText, Download, ScanLine } from 'lucide-react';

const ScanPage = () => {
  const [scanMode, setScanMode] = useState('initial'); // 'initial', 'qrcode', 'manual', 'results'
  const [codeValues, setCodeValues] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  interface ScanResult {
    id: string;
    date: string;
    type: string;
    bodyPart: string;
    patient: string;
    code: string;
    status: string;
    doctor: string;
    facility: string;
    notes: string;
  }
  
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState('');
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Initialize input refs array
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 6);
  }, []);

  // Handle input of verification code
  const handleCodeChange = (index: number, value: string) => {
    // Clear any previous errors
    if (error) setError('');
    
    // Only allow digits
    if (!/^\d*$/.test(value)) return;
    
    // Only allow single digit
    if (value.length > 1) {
      value = value.slice(0, 1);
    }
    
    const newCodeValues = [...codeValues];
    newCodeValues[index] = value;
    setCodeValues(newCodeValues);
    
    // Auto-focus next input if value is entered
    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle paste event for the code fields
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>, index: number) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    
    // Check if pasted content is a valid 6-digit code
    if (/^\d{6}$/.test(pastedData)) {
      const pastedArray = pastedData.split('');
      setCodeValues(pastedArray);
      
      // Focus the next input after the current index
      const nextIndex = Math.min(index + 1, 5);
      if (inputRefs.current[nextIndex]) {
        inputRefs.current[nextIndex].focus();
      }
    }
  };

  // Handle key press for navigation between inputs
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !codeValues[index] && index > 0) {
      // When backspace is pressed on an empty field, go to previous field
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowLeft' && index > 0) {
      // Left arrow navigates to previous field
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      // Right arrow navigates to next field
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Submit the code
  const handleSubmitCode = () => {
    const code = codeValues.join('');
    if (code.length !== 6) {
      setError('Please enter all 6 digits of the code');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      // Simulate successful result (in a real app this would come from your API)
      setScanResult({
        id: "SCN-" + Math.floor(Math.random() * 10000),
        date: new Date().toLocaleDateString(),
        type: "X-Ray",
        bodyPart: "Chest",
        patient: "Vibha Jayarajan",
        code: code,
        status: "Complete",
        doctor: "Dr. James Wilson",
        facility: "Central Medical Center",
        notes: "Examination of the chest X-ray shows clear lung fields with no evidence of consolidation, effusion, or pneumothorax. Heart size appears normal. No visible masses or nodules. Costophrenic angles are sharp. Bony structures are intact with no visible fractures or lesions."
      });
      setScanMode('results');
    }, 1500);
  };

  // Handle QR code "scanning"
  const handleQRCodeScan = () => {
    setIsLoading(true);
    setError('');
    
    // Simulate scanning process
    setTimeout(() => {
      // Generate random 6-digit code
      const randomCode = Array(6).fill(0).map(() => Math.floor(Math.random() * 10)).join('');
      setCodeValues(randomCode.split(''));
      setIsLoading(false);
      setScanMode('manual'); // Move to manual entry screen with pre-filled code
    }, 2000);
  };

  // Reset the form
  const handleReset = () => {
    setCodeValues(['', '', '', '', '', '']);
    setScanMode('initial');
    setScanResult(null);
    setError('');
  };

  // Reset focus when manual mode is activated
  useEffect(() => {
    if (scanMode === 'manual' && inputRefs.current[0]) {
      // Focus first input field when entering manual mode
      inputRefs.current[0].focus();
    }
  }, [scanMode]);

  // Check if code is complete
  const isCodeComplete = codeValues.every(val => val !== '');

  // Handle upload scan (simulated)
  const handleUploadScan = () => {
    setIsLoading(true);
    
    // Simulate upload process
    setTimeout(() => {
      setIsLoading(false);
      
      // Generate a random code and use it for the scan result
      const randomCode = Array(6).fill(0).map(() => Math.floor(Math.random() * 10)).join('');
      
      setScanResult({
        id: "SCN-" + Math.floor(Math.random() * 10000),
        date: new Date().toLocaleDateString(),
        type: "MRI",
        bodyPart: "Lumbar Spine",
        patient: "Vibha Jayarajan",
        code: randomCode,
        status: "Complete",
        doctor: "Dr. Emma Chen",
        facility: "Central Medical Center",
        notes: "MRI of the lumbar spine shows normal alignment with preserved vertebral body heights. No significant disc herniation or spinal canal stenosis. Conus medullaris is normal in position and signal. No evidence of fracture or malignancy. Paraspinal soft tissues are unremarkable."
      });
      
      setScanMode('results');
    }, 2000);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm p-4">
        <div className="max-w-7xl mx-auto flex items-center">
          <button 
            onClick={handleReset}
            className="mr-4 p-2 rounded-full hover:bg-gray-100"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-2xl font-semibold">Scan</h1>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-lg mx-auto p-6">
          {scanMode === 'initial' && (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="flex flex-col items-center space-y-6">
                <h2 className="text-xl font-medium text-gray-800">Access Medical Scan</h2>
                <p className="text-gray-600">Please select how you want to access the medical scan</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md mt-4">
                  <button 
                    onClick={() => setScanMode('qrcode')}
                    className="flex flex-col items-center p-6 border rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors"
                  >
                    <QrCode className="h-12 w-12 text-blue-600 mb-3" />
                    <span className="font-medium">Scan QR Code</span>
                  </button>
                  
                  <button 
                    onClick={() => setScanMode('manual')}
                    className="flex flex-col items-center p-6 border rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors"
                  >
                    <span className="text-xl font-bold text-blue-600 mb-3 h-12 flex items-center">123456</span>
                    <span className="font-medium">Enter Code</span>
                  </button>
                </div>
                
                <div className="mt-4 w-full max-w-md border-t pt-6">
                  <button 
                    onClick={handleUploadScan}
                    className="flex items-center justify-center w-full p-3 border border-blue-200 rounded-lg text-blue-600 hover:bg-blue-50"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    ) : (
                      <Upload className="h-5 w-5 mr-2" />
                    )}
                    Upload Scan
                  </button>
                </div>
              </div>
            </div>
          )}

          {scanMode === 'qrcode' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex flex-col items-center space-y-6">
                <h2 className="text-xl font-medium text-gray-800">Scan QR Code</h2>
                <p className="text-gray-600">Position the QR code within the frame</p>
                
                <div className="relative w-full max-w-sm aspect-square border-2 border-dashed rounded-lg flex items-center justify-center bg-gray-50 overflow-hidden">
                  {isLoading ? (
                    <div className="flex flex-col items-center">
                      <Loader2 className="h-12 w-12 text-blue-500 animate-spin mb-4" />
                      <p className="text-gray-600">Scanning...</p>
                    </div>
                  ) : (
                    <>
                      <div className="absolute inset-0 m-4 border-2 border-blue-500 rounded opacity-60"></div>
                      <Camera className="h-16 w-16 text-gray-400" />
                      
                      <button 
                        onClick={handleQRCodeScan}
                        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-6 py-2 rounded-full shadow-md hover:bg-blue-700"
                      >
                        Scan Now
                      </button>
                    </>
                  )}
                </div>
                
                <div className="w-full flex justify-between">
                  <button 
                    onClick={handleReset}
                    className="px-4 py-2 border rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  
                  <button 
                    onClick={() => setScanMode('manual')}
                    className="px-4 py-2 text-blue-600 hover:underline flex items-center"
                  >
                    Enter code manually
                    <ArrowLeft className="h-4 w-4 ml-1 transform rotate-180" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {scanMode === 'manual' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex flex-col items-center space-y-6">
                <h2 className="text-xl font-medium text-gray-800">Enter 6-Digit Code</h2>
                <p className="text-gray-600">Please enter the code from your scan document</p>
                
                <div className="flex justify-center space-x-2 w-full max-w-sm mt-4">
                  {codeValues.map((value, index) => (
                    <input
                      key={index}
                      ref={(el: HTMLInputElement | null): void => { inputRefs.current[index] = el; }}
                      type="text"
                      inputMode="numeric"
                      pattern="\d*"
                      value={value}
                      onChange={e => handleCodeChange(index, e.target.value)}
                      onKeyDown={e => handleKeyDown(index, e)}
                      onPaste={e => handlePaste(e, index)}
                      className="w-12 h-14 text-center text-xl font-bold border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      maxLength={1}
                      aria-label={`Code digit ${index + 1}`}
                    />
                  ))}
                </div>
                
                {error && (
                  <div className="text-red-500 text-sm flex items-center">
                    <X className="h-4 w-4 mr-1" />
                    {error}
                  </div>
                )}
                
                <div className="w-full max-w-sm">
                  <button 
                    onClick={handleSubmitCode}
                    disabled={!isCodeComplete || isLoading}
                    className={`w-full py-3 rounded-md flex items-center justify-center ${
                      isCodeComplete && !isLoading
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      'Access Scan'
                    )}
                  </button>
                </div>
                
                <div className="flex items-center text-sm text-gray-500">
                  <QrCode className="h-4 w-4 mr-2" />
                  <button 
                    onClick={() => setScanMode('qrcode')}
                    className="text-blue-600 hover:underline"
                  >
                    Scan QR code instead
                  </button>
                </div>
              </div>
            </div>
          )}

          {scanMode === 'results' && scanResult && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-medium text-gray-800">Scan Results</h2>
                    <p className="text-gray-500">Scan ID: {scanResult.id}</p>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    {scanResult.status}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-sm text-gray-500">Patient</p>
                    <p className="font-medium">{scanResult.patient}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-medium">{scanResult.date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Scan Type</p>
                    <p className="font-medium">{scanResult.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Body Part</p>
                    <p className="font-medium">{scanResult.bodyPart}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Facility</p>
                    <p className="font-medium">{scanResult.facility}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Access Code</p>
                    <p className="font-medium">{scanResult.code}</p>
                  </div>
                </div>
                
                <div className="border rounded-lg overflow-hidden bg-gray-50">
                  <div className="p-2 bg-gray-100 border-b flex justify-between items-center">
                    <span className="text-sm font-medium">Scan Image</span>
                    <div className="flex space-x-2">
                      <button className="text-blue-600 text-sm flex items-center">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </button>
                      <button className="text-blue-600 text-sm">View Full Size</button>
                    </div>
                  </div>
                  <div className="h-60 flex items-center justify-center p-4">
                    <div className="rounded-lg border border-dashed w-full h-full flex items-center justify-center">
                <ScanLine className="h-16 w-16 text-gray-300" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-medium mb-4">Radiologist Notes</h3>
                <p className="text-gray-600 mb-4">
                  {scanResult.notes}
                </p>
                <div className="flex justify-between items-center pt-4 border-t">
                  <span className="text-sm text-gray-500">{scanResult.doctor} • {scanResult.date}</span>
                  <div className="flex space-x-3">
                    <button className="text-blue-600 text-sm flex items-center">
                      <FileText className="h-4 w-4 mr-1" />
                      Print Report
                    </button>
                    <button className="text-blue-600 text-sm flex items-center">
                      <Download className="h-4 w-4 mr-1" />
                      Download PDF
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <button 
                  onClick={handleReset}
                  className="flex-1 py-3 px-4 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Access Another Scan
                </button>
                <button className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Send to Patient
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScanPage;