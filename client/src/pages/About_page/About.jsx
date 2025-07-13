import React from 'react';
import Footer from '../../MoleculesComponents/User_navbar_and_footer/Footer';
import Navbar from '../../MoleculesComponents/User_navbar_and_footer/Navbar';

const About = () => {
  return (
    <div className="bg-gradient-to-b from-black via-gray-900 to-black min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow py-14 px-6 md:px-20">
        <div className="max-w-6xl mx-auto bg-white/10 backdrop-blur-lg rounded-3xl p-10 md:p-16 shadow-2xl">
          <h1 className="text-4xl md:text-5xl font-extrabold text-center text-white mb-8">
            About <span className="text-purple-500">Buildify</span>
          </h1>
          <p className="text-lg text-gray-300 text-center mb-12 leading-relaxed">
            Where your dream PC becomes a reality — crafted with passion, precision, and power.
          </p>

          <div className="space-y-12">
            {/* Mission */}
            <section>
              <h2 className="text-3xl font-bold text-purple-300 mb-4">Our Mission</h2>
              <p className="text-gray-300 leading-relaxed">
                At <span className="font-semibold text-blue-300">Buildify</span>, we are deeply committed to helping you craft the perfect PC. 
                Whether you're a gamer chasing frame rates, a content creator pushing boundaries, 
                or a professional seeking peak performance — our platform simplifies, empowers, and 
                elevates your building experience. We believe technology should be exciting, accessible, and personal.
              </p>
            </section>

            {/* What We Offer */}
            <section>
              <h2 className="text-3xl font-bold text-purple-300 mb-4">What We Offer</h2>
              <ul className="list-disc list-inside space-y-4 text-gray-300">
                <li>
                  <span className="font-semibold text-blue-300">Customize Your PC</span> — 
                  Dive deep into our intelligent Custom PC Builder. Plan, adjust, and perfect your rig 
                  with performance scoring that ensures optimal compatibility and output.
                </li>
                <li>
                  <span className="font-semibold text-blue-300">PPC (Pre-Planned Configurations)</span> — 
                  Set your budget and preferences, and receive expertly tailored builds instantly. Save time without sacrificing quality.
                </li>
                <li>
                  <span className="font-semibold text-blue-300">Adaptive Filtering System</span> — 
                  Enjoy lightning-fast product searches with smart, real-time filter adjustments based on your exact needs.
                </li>
              </ul>
            </section>

            {/* Services */}
            <section>
              <h2 className="text-3xl font-bold text-purple-300 mb-4">Our Services</h2>
              <ul className="list-disc list-inside space-y-4 text-gray-300">
                <li>
                  <span className="font-semibold text-blue-300">RMA System</span> — 
                  Hassle-free returns and replacements. Received a faulty product? We'll take care of it quickly.
                </li>
                <li>
                  <span className="font-semibold text-blue-300">Order Tracking</span> — 
                  Stay updated from order placement to delivery with our detailed real-time tracking system.
                </li>
              </ul>
            </section>

            {/* Final Call-to-Action */}
            <section className="text-center pt-12">
              <h2 className="text-4xl font-extrabold text-white mb-4">
                Start building with <span className="text-purple-500">Buildify</span> today!
              </h2>
              <p className="text-lg text-gray-300">
                Build it. Love it. Live it. — Your dream PC is just a few clicks away.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
