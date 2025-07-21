import React from 'react';
import Navbar from '../MoleculesComponents/User_navbar_and_footer/Navbar';
import Footer from '../MoleculesComponents/User_navbar_and_footer/Footer';
import { Phone, LocationOn, Email, AccessTime, Chat, Support } from '@mui/icons-material';

const Contact = () => {
    const handleChatWithBot = () => {
        // Add your chatbot functionality here
        console.log('Opening chat bot...');
    };

    const contactMethods = [
        {
            icon: <Phone className="text-purple-400" style={{ fontSize: 40 }} />,
            title: "Customer Service",
            description: "If you have any issues with your computer order, please contact one of our customer service specialists.",
            details: ["Phone: (94) 702389925", "Mon - Fri: 8:30 am - 5:20 pm"]
        },
        {
            icon: <Support className="text-purple-400" style={{ fontSize: 40 }} />,
            title: "Technical Support",
            description: "If you have any technical issues with your computer, please contact one of our technicians.",
            details: ["Phone: (94) 788604051", "Mon - Fri: 8:30 am - 5:00 pm"]
        }
    ];

    const locationInfo = [
        {
            name: "Dehiwala Showroom & Service Center",
            address: "No 110A Galle Road, Dehiwala-Mount Lavinia"
        },
        {
            name: "Colombo 03 Showroom",
            address: "No 37 School Lane, Colombo 03"
        }
    ];

    return (
        <div className="bg-gradient-to-b from-black via-gray-900 to-black min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-grow py-14 px-6 md:px-20">
                {/* Hero Section */}
                <div className="max-w-6xl mx-auto bg-white/10 backdrop-blur-lg rounded-3xl p-10 md:p-16 shadow-2xl mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-center text-white mb-8">
                        Contact <span className="text-purple-500">Buildify</span>
                    </h1>
                    <p className="text-lg text-gray-300 text-center mb-12 leading-relaxed">
                        Looking for a help. We're here to help with all your gaming and PC building needs — reach out anytime!
                    </p>

                    {/* Chat Bot Section */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-10 bg-purple-500/15 backdrop-blur-sm rounded-3xl p-12 border border-purple-500/30 max-w-4xl mx-auto">
                            <div className="flex-shrink-0">
                                <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-purple-700 rounded-3xl flex items-center justify-center shadow-lg">
                                    <Chat className="text-white" style={{ fontSize: 72 }} />
                                </div>
                            </div>
                            <div className="text-left">
                                <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Need Instant Help?</h2>
                                <button
                                    onClick={handleChatWithBot}
                                    className="bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white px-10 py-3 rounded-full text-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-xl mb-4"
                                >
                                    CHAT WITH AI BOT
                                </button>
                                <div className="text-purple-200">
                                    <p className="flex items-center gap-3 text-lg">
                                        <AccessTime style={{ fontSize: 28 }} />
                                        <span className="font-semibold">Live Chat Available:</span>
                                    </p>
                                    <p className="text-base mt-1 ml-7">Mon - Fri: 9:00am - 4:00pm</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Methods */}
                <div className="max-w-6xl mx-auto mb-12">
                    <div className="grid md:grid-cols-2 gap-8">
                        {contactMethods.map((method, index) => (
                            <div key={index} className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/10">
                                <div className="flex items-start gap-4 mb-6">
                                    <div className="p-3 bg-purple-500/20 rounded-xl">
                                        {method.icon}
                                    </div>
                                    <div className='align-middle'>
                                        <h3 className="text-2xl font-bold text-purple-300 mb-2">{method.title}</h3>
                                    </div>
                                </div>
                                <p className="text-gray-300 leading-relaxed mb-6">
                                    {method.description}
                                </p>
                                <div className="space-y-2">
                                    {method.details.map((detail, idx) => (
                                        <p key={idx} className="text-purple-200 font-medium">
                                            {detail}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Location & Map Section */}
                <div className="max-w-6xl mx-auto">
                    <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-2xl border border-white/10">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-purple-300 mb-4">Visit Our Showrooms</h2>
                            <p className="text-gray-300 leading-relaxed">
                                Come see our latest builds and get hands-on assistance from our experts.
                            </p>
                        </div>

                        {/* Map */}
                        <div className="bg-gray-800/50 rounded-2xl p-6 mb-8">
                            <div className="h-96 relative overflow-hidden">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.798473176029!2d79.8612!3d6.9271!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2596d3b72c2d9%3A0x4a35b903f9c64c1e!2sColombo%2003%2C%20Sri%20Lanka!5e0!3m2!1sen!2slk!4v1642678901234!5m2!1sen!2slk"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="rounded-xl"
                                />

                                {/* Location Info Overlay */}
                                <div className="absolute top-16 left-2 bg-gradient-to-br from-purple-600 to-purple-800 text-white p-6 rounded-2xl max-w-xs shadow-xl border border-purple-400/30">
                                    {locationInfo.map((location, index) => (
                                        <div key={index} className={index > 0 ? "mt-4 pt-4 border-t border-purple-400/30" : ""}>
                                            <div className="flex items-start gap-2 mb-2">
                                                <LocationOn className="text-purple-300 mt-1" style={{ fontSize: 20 }} />
                                                <h3 className="font-bold text-lg text-white">{location.name}</h3>
                                            </div>
                                            <p className="text-purple-100 text-sm font-medium">{location.address}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Additional Contact Info */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-purple-500/10 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
                                <h3 className="text-xl font-bold text-purple-300 mb-4 flex items-center gap-2">
                                    <Email className="text-purple-400" />
                                    Email Us
                                </h3>
                                <p className="text-gray-300">
                                    General Inquiries: <a href="mailto:info@buildify.com" className="text-purple-400 hover:text-purple-300 transition-colors">info@buildify.com</a>
                                </p>
                                <p className="text-gray-300">
                                    Support: <a href="mailto:support@buildify.com" className="text-purple-400 hover:text-purple-300 transition-colors">support@buildify.com</a>
                                </p>
                            </div>
                            <div className="bg-purple-500/10 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
                                <h3 className="text-xl font-bold text-purple-300 mb-4 flex items-center gap-2">
                                    <AccessTime className="text-purple-400" />
                                    Business Hours
                                </h3>
                                <p className="text-gray-300">Monday - Friday: 9:00 AM - 6:00 PM</p>
                                <p className="text-gray-300">Saturday: 10:00 AM - 4:00 PM</p>
                                <p className="text-gray-300">Sunday: Closed</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Contact;