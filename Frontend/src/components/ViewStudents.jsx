import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../utils/api';

function ViewStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/api/students/all`);
      if (res.data && res.data.success) {
        setStudents(res.data.students || []);
      }
    } catch (err) {
      console.error('Failed to fetch students:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const filteredStudents = students.filter(
    (s) =>
      s.fullname?.toLowerCase().includes(search.toLowerCase()) ||
      s.email?.toLowerCase().includes(search.toLowerCase()) ||
      s.phone?.includes(search) ||
      s.classGrade?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4 border-b border-gray-800 pb-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
              <span>🎓</span> Registered Students Database ({students.length})
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              List of all student accounts registered through the portal.
            </p>
          </div>
          <div className="flex gap-2">
            <Link
              to="/owner"
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-sm font-medium transition"
            >
              ← Back to Dashboard
            </Link>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6 max-w-md">
          <input
            type="text"
            placeholder="Search by student name, email, phone, or class..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Student Table */}
        {loading ? (
          <div className="py-20 text-center">
            <span className="loading loading-spinner loading-lg text-blue-500"></span>
            <p className="mt-3 text-sm text-gray-400">Loading student accounts...</p>
          </div>
        ) : filteredStudents.length === 0 ? (
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-12 text-center text-gray-400">
            <p className="text-4xl mb-2">🧑‍🎓</p>
            <p className="text-lg font-semibold text-white">No registered students found</p>
            <p className="text-xs text-gray-400 mt-1">
              Students will appear here once they register on the website portal.
            </p>
          </div>
        ) : (
          <div className="bg-gray-800 border border-gray-700 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-950 text-gray-400 uppercase text-xs tracking-wider">
                  <tr>
                    <th className="py-3 px-4">#</th>
                    <th className="py-3 px-4">Full Name</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Phone</th>
                    <th className="py-3 px-4">Class / Target</th>
                    <th className="py-3 px-4">Registered Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {filteredStudents.map((s, index) => (
                    <tr key={s._id} className="hover:bg-gray-750 transition-colors">
                      <td className="py-3 px-4 text-gray-500">{index + 1}</td>
                      <td className="py-3 px-4 font-semibold text-white">{s.fullname}</td>
                      <td className="py-3 px-4 text-gray-300">{s.email}</td>
                      <td className="py-3 px-4 text-gray-300">{s.phone || '—'}</td>
                      <td className="py-3 px-4">
                        <span className="bg-blue-900/60 text-blue-300 text-xs px-2.5 py-1 rounded-md font-medium">
                          {s.classGrade || 'Class 12'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-400 text-xs">
                        {s.createdAt ? new Date(s.createdAt).toLocaleDateString('en-IN') : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewStudents;
