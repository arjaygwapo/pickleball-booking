import React, { useState, useEffect } from 'react';
import { 
  Calendar, Clock, MapPin, Phone, Mail, ChevronRight, CheckCircle2, 
  AlertCircle, DollarSign, Users, Shield, Award, Sparkles, X, QrCode, 
  Share2, ArrowLeft, Star, Camera, Info, Check, Play, Globe
} from 'lucide-react';

export default function PickleballBookingApp() {
  const [activeTab, setActiveTab] = useState('booking'); // 'booking', 'qstack', 'coaches', 'about'
  const [selectedDate, setSelectedDate] = useState('2026-03-30');
  const [selectedSlots, setSelectedSlots] = useState([]); // Array of strings like "court-1-9AM"
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartSlot, setDragStartSlot] = useState(null);
  
  // Checkout & Modal states
  const [showCheckout, setShowCheckout] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('gcash');
  const [activePhoto, setActivePhoto] = useState(0);

  const venue = {
    name: "Bluepro Pickleball Courts",
    location: "Cagayan de Oro · Burgos Street",
    rate: 200,
    courtsCount: 4,
    openHours: "6AM–12AM",
    photos: [
      "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=1200"
    ]
  };

  const courts = [
    { id: 1, name: "Court 1", type: "Covered Pro", rate: 200 },
    { id: 2, name: "Court 2", type: "Covered Pro", rate: 200 },
    { id: 3, name: "Court 3", type: "Covered Standard", rate: 200 },
    { id: 4, name: "Court 4", type: "Covered Standard", rate: 200 }
  ];

  const timeSlots = [
    "6AM-7AM", "7AM-8AM", "8AM-9AM", "9AM-10AM", "10AM-11AM", "11AM-12PM",
    "12PM-1PM", "1PM-2PM", "2PM-3PM", "3PM-4PM", "4PM-5PM", "5PM-6PM",
    "6PM-7PM", "7PM-8PM", "8PM-9PM", "9PM-10PM", "10PM-11PM", "11PM-12AM"
  ];

  // Pre-seeded booked or reserved slots
  const [bookedSlots, setBookedSlots] = useState([
    "court-1-9AM-10AM", "court-1-10AM-11AM",
    "court-2-5PM-6PM", "court-2-6PM-7PM",
    "court-3-7PM-8PM"
  ]);

  const handleSlotClick = (courtId, time) => {
    const slotKey = `court-${courtId}-${time}`;
    if (bookedSlots.includes(slotKey)) return;

    setSelectedSlots(prev => 
      prev.includes(slotKey) 
        ? prev.filter(s => s !== slotKey)
        : [...prev, slotKey]
    );
  };

  const calculateTotal = () => {
    return selectedSlots.length * venue.rate;
  };

  const handleProceedToCheckout = () => {
    if (selectedSlots.length === 0) return;
    setShowCheckout(true);
  };

  const handleConfirmBooking = (e) => {
    e.preventDefault();
    const newBooking = {
      id: "BP-" + Math.floor(100000 + Math.random() * 900000),
      name: customerName || "Guest Player",
      phone: customerPhone || "09171234567",
      date: selectedDate,
      slots: selectedSlots,
      total: calculateTotal(),
      payment: paymentMethod.toUpperCase(),
      timestamp: new Date().toLocaleString()
    };

    // Add to booked slots
    setBookedSlots(prev => [...prev, ...selectedSlots]);
    setBookingDetails(newBooking);
    setShowCheckout(false);
    setShowPass(true);
    setSelectedSlots([]);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('booking')}>
            <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-md">
              BP
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-xl tracking-tight text-slate-900">Courtogo</span>
                <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-0.5 rounded-full font-semibold">Verified Venue</span>
              </div>
              <p className="text-xs text-slate-500">Sports Venue & Open Play Booking</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-8 font-medium text-sm text-slate-600">
            <button 
              onClick={() => setActiveTab('booking')}
              className={`hover:text-emerald-600 transition ${activeTab === 'booking' ? 'text-emerald-600 font-bold border-b-2 border-emerald-600 pb-1' : ''}`}
            >
              Court Booking
            </button>
            <button 
              onClick={() => setActiveTab('qstack')}
              className={`hover:text-emerald-600 transition flex items-center space-x-1 ${activeTab === 'qstack' ? 'text-emerald-600 font-bold border-b-2 border-emerald-600 pb-1' : ''}`}
            >
              <span>qStack Open Play</span>
              <span className="bg-amber-100 text-amber-800 text-[10px] px-1.5 py-0.5 rounded-full font-bold">Live</span>
            </button>
            <button 
              onClick={() => setActiveTab('coaches')}
              className={`hover:text-emerald-600 transition ${activeTab === 'coaches' ? 'text-emerald-600 font-bold border-b-2 border-emerald-600 pb-1' : ''}`}
            >
              Coaches
            </button>
            <button 
              onClick={() => setActiveTab('about')}
              className={`hover:text-emerald-600 transition ${activeTab === 'about' ? 'text-emerald-600 font-bold border-b-2 border-emerald-600 pb-1' : ''}`}
            >
              Venue Info & Rules
            </button>
          </nav>

          <div className="flex items-center space-x-3">
            <a 
              href="https://www.facebook.com/courtogo" 
              target="_blank" 
              rel="noreferrer"
              className="hidden sm:inline-flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-xl text-sm font-semibold transition"
            >
              Venue Portal
            </a>
            <button 
              onClick={() => setActiveTab('booking')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition"
            >
              Book Now
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      {activeTab === 'booking' && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Venue Hero Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8 mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-start space-x-5">
                <img 
                  src={venue.photos[0]} 
                  alt={venue.name} 
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover shadow-sm border border-slate-200 shrink-0" 
                />
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h1 className="text-2xl sm:text-3xl font-black text-slate-900">{venue.name}</h1>
                    <span className="bg-blue-50 text-blue-700 border border-blue-200 text-xs px-2.5 py-0.5 rounded-md font-semibold">Pickleball & Badminton</span>
                  </div>
                  <p className="text-slate-600 flex items-center space-x-1.5 text-sm mb-4">
                    <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{venue.location}</span>
                  </p>
                  <div className="flex flex-wrap items-center gap-6 text-sm">
                    <div>
                      <span className="text-slate-500 block text-xs">From Rate</span>
                      <span className="font-bold text-slate-900 text-base">₱{venue.rate} <span className="text-xs font-normal text-slate-500">/hr</span></span>
                    </div>
                    <div className="border-l border-slate-200 pl-6">
                      <span className="text-slate-500 block text-xs">Courts Available</span>
                      <span className="font-bold text-slate-900 text-base">{venue.courtsCount} Covered Courts</span>
                    </div>
                    <div className="border-l border-slate-200 pl-6">
                      <span className="text-slate-500 block text-xs">Operating Hours</span>
                      <span className="font-bold text-slate-900 text-base">{venue.openHours}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Date Selector */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col justify-center">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center space-x-1">
                  <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Select Booking Date</span>
                </label>
                <input 
                  type="date" 
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Photo Gallery Thumbnails */}
            <div className="grid grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-100">
              {venue.photos.map((photo, idx) => (
                <div 
                  key={idx} 
                  onClick={() => setActivePhoto(idx)}
                  className={`h-20 rounded-xl overflow-hidden cursor-pointer border-2 transition ${activePhoto === idx ? 'border-emerald-600 shadow-sm' : 'border-transparent opacity-70 hover:opacity-100'}`}
                >
                  <img src={photo} alt="Venue preview" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Booking Grid Section */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden mb-12">
            <div className="p-6 border-b border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
                  <span>Court Schedule & Availability</span>
                  <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-0.5 rounded-full">₱200/hr Flat Rate</span>
                </h2>
                <p className="text-xs text-slate-600 mt-0.5">Click time slots below to select your desired booking hours for {selectedDate}.</p>
              </div>

              <div className="flex items-center space-x-4 text-xs font-medium text-slate-600">
                <div className="flex items-center space-x-1.5">
                  <div className="w-3 h-3 bg-white border border-slate-300 rounded-xs"></div>
                  <span>Available</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <div className="w-3 h-3 bg-emerald-600 rounded-xs"></div>
                  <span>Selected</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <div className="w-3 h-3 bg-slate-200 rounded-xs"></div>
                  <span>Booked</span>
                </div>
              </div>
            </div>

            {/* Grid Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-200 text-xs font-bold text-slate-600 uppercase tracking-wider">
                    <th className="py-3 px-4 text-left w-32 border-r border-slate-200 sticky left-0 bg-slate-100 z-10">Time</th>
                    {courts.map(court => (
                      <th key={court.id} className="py-3 px-4 text-center border-r border-slate-200 min-w-[150px]">
                        <div className="font-bold text-slate-900">{court.name}</div>
                        <div className="text-[10px] text-slate-500 font-normal">{court.type} · ₱{court.rate}/hr</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-sm">
                  {timeSlots.map((time, timeIdx) => (
                    <tr key={timeIdx} className="hover:bg-slate-50/50 transition">
                      <td className="py-3 px-4 font-semibold text-slate-700 border-r border-slate-200 bg-slate-50/80 sticky left-0 z-10 text-xs">
                        {time}
                      </td>
                      {courts.map(court => {
                        const slotKey = `court-${court.id}-${time}`;
                        const isBooked = bookedSlots.includes(slotKey);
                        const isSelected = selectedSlots.includes(slotKey);

                        return (
                          <td key={court.id} className="p-2 text-center border-r border-slate-200">
                            <button
                              disabled={isBooked}
                              onClick={() => handleSlotClick(court.id, time)}
                              className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1 ${
                                isBooked 
                                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                                  : isSelected
                                    ? 'bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-600 ring-offset-1'
                                    : 'bg-white border border-slate-200 text-slate-700 hover:border-emerald-500 hover:bg-emerald-50/30'
                              }`}
                            >
                              {isBooked ? (
                                <span>Booked</span>
                              ) : isSelected ? (
                                <>
                                  <Check className="w-3.5 h-3.5" />
                                  <span>Selected</span>
                                </>
                              ) : (
                                <span className="text-emerald-700 font-semibold">₱{court.rate}</span>
                              )}
                            </button>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Sticky Floating Action Bar for Selected Slots */}
            {selectedSlots.length > 0 && (
              <div className="bg-slate-900 text-white p-4 sm:px-8 sticky bottom-0 z-40 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl border-t border-slate-800 animate-slide-up">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center font-bold text-slate-900 shadow-sm">
                    {selectedSlots.length}
                  </div>
                  <div>
                    <p className="text-sm font-bold">{selectedSlots.length} slot(s) selected for {selectedDate}</p>
                    <p className="text-xs text-slate-400">Standard flat rate: ₱200/hr per court</p>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="text-right">
                    <span className="text-xs text-slate-400 block">Total Amount</span>
                    <span className="text-2xl font-black text-emerald-400">₱{calculateTotal()}</span>
                  </div>
                  <button 
                    onClick={handleProceedToCheckout}
                    className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-6 py-3 rounded-xl text-sm transition shadow-lg flex items-center space-x-2"
                  >
                    <span>Proceed to Checkout</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      )}

      {/* qStack Open Play Tab */}
      {activeTab === 'qstack' && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-gradient-to-r from-emerald-900 to-slate-900 text-white rounded-3xl p-8 sm:p-12 mb-12 shadow-xl relative overflow-hidden">
            <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="max-w-2xl relative z-10">
              <span className="bg-emerald-500 text-slate-950 font-black text-xs px-3 py-1 rounded-full uppercase tracking-widest mb-4 inline-block">
                qStack Social Queue
              </span>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">
                Join CDO Open Play Stacks
              </h1>
              <p className="text-slate-300 text-base sm:text-lg mb-8 leading-relaxed">
                No partner? No problem! Join our automated queue system to rotate in competitive and social matches grouped by skill level (DUPR 3.0 to 4.5+).
              </p>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => alert("Successfully joined the Evening Social Queue! You are #4 in line.")}
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-6 py-3.5 rounded-xl text-sm transition shadow-md"
                >
                  Join Tonight's 6PM-9PM Stack (₱150)
                </button>
                <button 
                  onClick={() => alert("Viewing queue rankings...")}
                  className="bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3.5 rounded-xl text-sm transition backdrop-blur-md"
                >
                  View Active Queue Board
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
              <div className="w-10 h-10 bg-emerald-100 text-emerald-800 rounded-xl flex items-center justify-center font-bold mb-4">1</div>
              <h3 className="font-bold text-lg mb-2 text-slate-900">Beginner / Intermediate Stack</h3>
              <p className="text-slate-600 text-sm mb-4">Perfect for casual players looking for fun rallies and basic game rotation.</p>
              <div className="text-xs font-semibold text-emerald-700 bg-emerald-50 py-2 px-3 rounded-lg">6 Players Active · 2 Spots Left</div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
              <div className="w-10 h-10 bg-blue-100 text-blue-800 rounded-xl flex items-center justify-center font-bold mb-4">2</div>
              <h3 className="font-bold text-lg mb-2 text-slate-900">Intermediate / Advanced DUPR</h3>
              <p className="text-slate-600 text-sm mb-4">Fast-paced competitive matches with verified scoring and queue rotation.</p>
              <div className="text-xs font-semibold text-blue-700 bg-blue-50 py-2 px-3 rounded-lg">8 Players Active · Full (Join Waitlist)</div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
              <div className="w-10 h-10 bg-amber-100 text-amber-800 rounded-xl flex items-center justify-center font-bold mb-4">3</div>
              <h3 className="font-bold text-lg mb-2 text-slate-900">Weekend King of the Court</h3>
              <p className="text-slate-600 text-sm mb-4">High intensity ladder tournament format every Saturday afternoon.</p>
              <div className="text-xs font-semibold text-amber-700 bg-amber-50 py-2 px-3 rounded-lg">Saturday 3PM · 12 Registered</div>
            </div>
          </div>
        </main>
      )}

      {/* Coaches Tab */}
      {activeTab === 'coaches' && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h1 className="text-3xl font-black text-slate-900 mb-3">Certified Pickleball Coaches</h1>
            <p className="text-slate-600">Elevate your dinking, drops, and third-shot drops with professional coaching sessions at Bluepro.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col sm:flex-row items-center gap-6 shadow-xs">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400" alt="Coach" className="w-32 h-32 rounded-2xl object-cover shrink-0" />
              <div>
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full">PPA Certified Instructor</span>
                <h3 className="text-xl font-bold text-slate-900 mt-2">Coach Sarah Jenkins</h3>
                <p className="text-slate-600 text-sm my-2">Specializes in beginner fundamentals, footwork, and tactical court positioning.</p>
                <div className="flex items-center space-x-4 text-sm font-bold text-slate-900">
                  <span>₱600 / hour</span>
                  <button onClick={() => alert("Booking request sent to Coach Sarah!")} className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition">
                    Book Lesson
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col sm:flex-row items-center gap-6 shadow-xs">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400" alt="Coach" className="w-32 h-32 rounded-2xl object-cover shrink-0" />
              <div>
                <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-0.5 rounded-full">DUPR 4.8 Pro Player</span>
                <h3 className="text-xl font-bold text-slate-900 mt-2">Coach Miguel Tan</h3>
                <p className="text-slate-600 text-sm my-2">Advanced strategy, power drives, aggressive kitchen battles, and tournament prep.</p>
                <div className="flex items-center space-x-4 text-sm font-bold text-slate-900">
                  <span>₱800 / hour</span>
                  <button onClick={() => alert("Booking request sent to Coach Miguel!")} className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition">
                    Book Lesson
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* About Tab */}
      {activeTab === 'about' && (
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-xs">
            <h1 className="text-3xl font-black text-slate-900 mb-6">Venue Guidelines & Policies</h1>
            <div className="space-y-6 text-slate-600 text-sm leading-relaxed">
              <div>
                <h3 className="font-bold text-slate-900 text-base mb-2">1. Booking & Payment Policy</h3>
                <p>All bookings require confirmation via GCash, Maya, or QR Ph within 15 minutes of reservation. Unpaid slots will be automatically released back to the schedule.</p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base mb-2">2. Cancellation & Rescheduling</h3>
                <p>Cancellations made at least 12 hours prior to the booked slot are eligible for a full rescheduling voucher. Late cancellations are non-refundable.</p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base mb-2">3. Equipment & Attire</h3>
                <p>Non-marking court shoes are strictly required on all indoor courts. Pickleball paddles and balls are available for rent at the front desk for ₱50.</p>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 animate-scale-up">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-black text-slate-900">Complete Your Booking</h3>
              <button onClick={() => setShowCheckout(false)} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 mb-6 border border-slate-200">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-slate-500 uppercase">Date</span>
                <span className="text-sm font-bold text-slate-900">{selectedDate}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-slate-500 uppercase">Selected Slots</span>
                <span className="text-sm font-bold text-slate-900">{selectedSlots.length} hour(s)</span>
              </div>
              <div className="border-t border-slate-200 pt-2 mt-2 flex justify-between items-center">
                <span className="text-sm font-extrabold text-slate-900">Total Amount Due</span>
                <span className="text-xl font-black text-emerald-600">₱{calculateTotal()}</span>
              </div>
            </div>

            <form onSubmit={handleConfirmBooking} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Full Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Juan Dela Cruz" 
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Mobile Number (GCash/Maya)</label>
                <input 
                  type="text" 
                  required
                  placeholder="09171234567" 
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Payment Method</label>
                <div className="grid grid-cols-3 gap-3">
                  {['gcash', 'maya', 'qrph'].map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setPaymentMethod(method)}
                      className={`py-3 px-4 rounded-xl border text-xs font-bold uppercase transition ${paymentMethod === method ? 'border-emerald-600 bg-emerald-50 text-emerald-800' : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'}`}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <button 
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl shadow-md transition text-sm flex items-center justify-center space-x-2"
                >
                  <span>Pay ₱{calculateTotal()} & Confirm Booking</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Digital Booking Pass Modal */}
      {showPass && bookingDetails && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-100 text-center animate-scale-up">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 mb-1">Booking Confirmed!</h2>
            <p className="text-xs text-slate-500 mb-6">Show this digital pass at the Bluepro front desk upon arrival.</p>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-6 text-left space-y-3">
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Booking Reference</span>
                <span className="font-bold text-slate-900">{bookingDetails.id}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Name</span>
                <span className="font-bold text-slate-900">{bookingDetails.name}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Date</span>
                <span className="font-bold text-slate-900">{bookingDetails.date}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Paid via</span>
                <span className="font-bold text-emerald-600">{bookingDetails.payment} (₱{bookingDetails.total})</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-dashed border-slate-300 flex items-center justify-center mb-6">
              <div className="w-32 h-32 bg-slate-900 rounded-xl flex items-center justify-center text-white font-mono text-xs text-center p-2">
                [ QR CODE PASS ]
              </div>
            </div>

            <button 
              onClick={() => setShowPass(false)}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl text-sm transition"
            >
              Done / Return to Schedule
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-slate-500">
          <div>
            <p className="font-bold text-slate-800">Bluepro Pickleball Courts · Cagayan de Oro</p>
            <p className="mt-1">Powered by Courtogo Booking Engine © 2026. All rights reserved.</p>
          </div>
          <div className="flex space-x-6">
            <a href="#terms" className="hover:text-slate-800">Terms of Service</a>
            <a href="#privacy" className="hover:text-slate-800">Privacy Policy</a>
            <a href="#support" className="hover:text-slate-800">Venue Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
