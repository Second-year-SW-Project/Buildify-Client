import React from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../MoleculesComponents/User_navbar_and_footer/Navbar'
import Footer from '../../MoleculesComponents/User_navbar_and_footer/Footer'

const supportOptions = [
  {
    title: 'Complaints',
    description: 'Submit and track your complaints',
    icon: (
      <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-purple-400"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 20h9" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20V4a2 2 0 00-2-2H7a2 2 0 00-2 2v16l7-3 7 3z" /></svg>
    ),
    to: '/user/complaint',
  },
  {
    title: 'Order Status',
    description: 'Check the status of your order',
    icon: (
      <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-purple-400"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" /></svg>
    ),
    to: '/user/orders',
  },
  {
    title: 'RMA Status',
    description: 'Check the status of your RMA',
    icon: (
      <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-purple-400"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2a4 4 0 014-4h4m0 0V7m0 4l-4-4-4 4" /></svg>
    ),
    to: '/user/rmaSupport',
  },
  {
    title: 'FAQ/Knowledge Base',
    description: 'Troubleshooting tips and how-to guides',
    icon: (
      <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-purple-400"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8s-9-3.582-9-8 4.03-8 9-8 9 3.582 9 8z" /></svg>
    ),
    to: '/home',
  },
  {
    title: 'Warranty',
    description: 'Limited Warranty Policy Terms, Conditions & Coverage',
    icon: (
      <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-purple-400"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    ),
    to: '/user/orderHistory',
  },
  {
    title: 'Driver Downloads',
    description: 'BIOS and Drivers for Custom Parts',
    icon: (
      <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-purple-400"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
    ),
    to: '/home',
  },
]

const Supportus = () => {
  const navigate = useNavigate()
  return (
    <div className="bg-gradient-to-b from-black via-gray-900 to-black min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-14 px-6 md:px-20">
        <div className="max-w-6xl mx-auto bg-white/10 backdrop-blur-lg rounded-3xl p-10 md:p-16 shadow-2xl">
          <h1 className="text-4xl md:text-5xl font-extrabold text-center text-white mb-8">
            Support <span className="text-purple-500">Center</span>
          </h1>
          <p className="text-lg text-gray-300 text-center mb-12 leading-relaxed">
            Get help, track your orders, manage RMAs, and find answers to your questions — all in one place.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {supportOptions.map((option, idx) => (
              <button
                key={option.title}
                onClick={() => navigate(option.to)}
                className="flex flex-col items-center justify-center bg-white/80 hover:bg-purple-50 rounded-2xl shadow-xl hover:shadow-2xl transition p-8 border-2 border-white/30 hover:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-300 group relative overflow-hidden"
                style={{ minHeight: 220 }}
              >
                <div className="mb-4 group-hover:scale-110 transition-transform">{option.icon}</div>
                <div className="text-lg font-bold mb-2 text-gray-900 group-hover:text-purple-700 transition-colors">{option.title}</div>
                <div className="text-sm text-gray-600 text-center">{option.description}</div>
                <span className="absolute inset-0 pointer-events-none rounded-2xl group-hover:ring-4 group-hover:ring-purple-200 transition"></span>
              </button>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Supportus  