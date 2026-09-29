import React from 'react';
import { Link } from 'react-router-dom';

function Owner() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Top Header */}
        <div className="flex justify-between items-center mb-8 border-b border-gray-800 pb-4">
          <div>
            <h1 className="text-3xl font-extrabold text-white">JD Sir's Admin Portal</h1>
            <p className="text-sm text-gray-400 mt-1">Manage website materials, enrollments, and student accounts.</p>
          </div>
          <Link
            to="/"
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-sm font-medium transition"
          >
            ← View Main Website
          </Link>
        </div>

        {/* Profile Card */}
        <div className="flex flex-col sm:flex-row items-center gap-6 bg-gray-800 border border-gray-700 rounded-2xl p-6 mb-10 shadow-xl">
          <img
            src="/jd.png"
            alt="Owner"
            className="rounded-full shadow-lg w-28 h-28 object-cover border-4 border-blue-500"
          />
          <div>
            <h2 className="text-2xl font-bold text-white">Er. Jagannath Dutta (JD Sir)</h2>
            <p className="text-blue-400 font-medium text-sm">Physics Mentor | Irodov + Classes</p>
            <p className="text-gray-400 text-xs mt-1">
              Baripada, Odisha | Preparing future IITians & Doctors
            </p>
          </div>
        </div>

        {/* Action Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Upload Class Material PDF */}
          <Link
            to="/owner/resources"
            className="bg-gray-800 hover:bg-gray-750 border border-blue-500/40 hover:border-blue-500 rounded-2xl p-6 shadow-lg transition duration-200 flex items-start gap-4 group"
          >
            <div className="p-3 bg-blue-600/20 text-blue-400 rounded-xl text-3xl group-hover:scale-110 transition-transform">
              📚
            </div>
            <div>
              <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                Upload Class Material (PDF)
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                Upload lecture notes, practice sheets, and Irodov problem sets for students to view & download.
              </p>
              <span className="inline-block mt-3 text-xs font-semibold text-blue-400">
                Manage PDFs →
              </span>
            </div>
          </Link>

          {/* Card 2: Registered Student Database */}
          <Link
            to="/owner/students"
            className="bg-gray-800 hover:bg-gray-750 border border-emerald-500/40 hover:border-emerald-500 rounded-2xl p-6 shadow-lg transition duration-200 flex items-start gap-4 group"
          >
            <div className="p-3 bg-emerald-600/20 text-emerald-400 rounded-xl text-3xl group-hover:scale-110 transition-transform">
              🎓
            </div>
            <div>
              <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                Registered Students Database
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                View all students registered on the website portal, their emails, phone numbers, and class grades.
              </p>
              <span className="inline-block mt-3 text-xs font-semibold text-emerald-400">
                View Student Database →
              </span>
            </div>
          </Link>

          {/* Card 3: See Course Enrollments */}
          <Link
            to="/seeenroll"
            className="bg-gray-800 hover:bg-gray-750 border border-purple-500/40 hover:border-purple-500 rounded-2xl p-6 shadow-lg transition duration-200 flex items-start gap-4 group"
          >
            <div className="p-3 bg-purple-600/20 text-purple-400 rounded-xl text-3xl group-hover:scale-110 transition-transform">
              📝
            </div>
            <div>
              <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors">
                See Course Enrollments
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                Check prospective student enrollments, payment screenshots, and 10th marks.
              </p>
              <span className="inline-block mt-3 text-xs font-semibold text-purple-400">
                View Applications →
              </span>
            </div>
          </Link>

          {/* Card 4: Upload Photo */}
          <Link
            to="/ownerupload"
            className="bg-gray-800 hover:bg-gray-750 border border-amber-500/40 hover:border-amber-500 rounded-2xl p-6 shadow-lg transition duration-200 flex items-start gap-4 group"
          >
            <div className="p-3 bg-amber-600/20 text-amber-400 rounded-xl text-3xl group-hover:scale-110 transition-transform">
              🖼️
            </div>
            <div>
              <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                Upload Gallery Photo
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                Upload classroom pictures, student achievements, and institute events to the homepage gallery.
              </p>
              <span className="inline-block mt-3 text-xs font-semibold text-amber-400">
                Upload Photos →
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Owner;