import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
import { API_BASE_URL } from '../utils/api';

function Resources() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [selectedClass, setSelectedClass] = useState('All');

  const subjects = [
    'All',
    'Physics',
    'Mechanics',
    'Electromagnetism',
    'Optics & Waves',
    'Thermodynamics',
    'Modern Physics'
  ];

  const classes = [
    'All',
    'Class 11',
    'Class 12',
    'JEE Main & Advanced',
    'NEET',
    'All Classes'
  ];

  const fetchResources = async () => {
    setLoading(true);
    setError('');
    try {
      let queryParams = [];
      if (selectedSubject !== 'All') queryParams.push(`subject=${encodeURIComponent(selectedSubject)}`);
      if (selectedClass !== 'All') queryParams.push(`classGrade=${encodeURIComponent(selectedClass)}`);
      if (search.trim() !== '') queryParams.push(`search=${encodeURIComponent(search.trim())}`);

      const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
      const response = await axios.get(`${API_BASE_URL}/api/resources${queryString}`);

      if (response.data && response.data.success) {
        setResources(response.data.resources || []);
      } else {
        setResources([]);
      }
    } catch (err) {
      console.error('Failed to load resources:', err);
      setError('Unable to load resources at this moment. Please check back soon.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, [selectedSubject, selectedClass]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchResources();
  };

  const formatFileSize = (bytes) => {
    if (!bytes || bytes === 0) return 'Unknown size';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <Navbar />

      <main className="flex-grow pt-24 pb-16 px-4 md:px-12 max-w-7xl mx-auto w-full">
        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-block bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
            Official Course Materials
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Study Resources & Lecture Notes
          </h1>
          <p className="mt-3 text-base md:text-lg text-gray-600 dark:text-gray-300">
            Download PDFs of lecture notes, HCV & Irodov practice sheets, revision mindmaps, and formula sheets curated by JD Sir.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 md:p-6 mb-8">
          <form onSubmit={handleSearchSubmit} className="flex flex-col md:flex-row gap-3 mb-4">
            <div className="relative flex-grow">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                🔍
              </span>
              <input
                type="text"
                placeholder="Search notes by title, topic, or chapter..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl text-sm transition-colors shadow cursor-pointer"
            >
              Search
            </button>
            {(search || selectedSubject !== 'All' || selectedClass !== 'All') && (
              <button
                type="button"
                onClick={() => {
                  setSearch('');
                  setSelectedSubject('All');
                  setSelectedClass('All');
                }}
                className="px-4 py-2.5 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-medium rounded-xl text-sm transition-colors cursor-pointer"
              >
                Reset
              </button>
            )}
          </form>

          {/* Filter Chips */}
          <div className="space-y-3">
            {/* Subject Filters */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mr-1">
                Subject:
              </span>
              {subjects.map((sub) => (
                <button
                  key={sub}
                  type="button"
                  onClick={() => setSelectedSubject(sub)}
                  className={`text-xs px-3 py-1.5 rounded-full transition-all cursor-pointer font-medium ${
                    selectedSubject === sub
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>

            {/* Class/Target Filters */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mr-1">
                Target:
              </span>
              {classes.map((cls) => (
                <button
                  key={cls}
                  type="button"
                  onClick={() => setSelectedClass(cls)}
                  className={`text-xs px-3 py-1.5 rounded-full transition-all cursor-pointer font-medium ${
                    selectedClass === cls
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {cls}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Resources Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <span className="loading loading-spinner loading-lg text-blue-600"></span>
            <p className="mt-4 text-sm text-gray-500">Loading study materials...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-300 p-6 rounded-2xl text-center my-6">
            <p className="font-semibold">{error}</p>
            <button
              onClick={fetchResources}
              className="mt-3 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-medium"
            >
              Retry
            </button>
          </div>
        ) : resources.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-12 text-center my-6">
            <div className="text-5xl mb-3">📚</div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">
              No Study Materials Found
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto mt-2">
              There are currently no uploaded PDF notes matching your filter criteria. Try resetting filters or check back later!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((item) => (
              <div
                key={item._id}
                className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between overflow-hidden"
              >
                <div className="p-6">
                  {/* Badges */}
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-semibold px-2.5 py-1 rounded-md">
                      {item.subject || 'Physics'}
                    </span>
                    <span className="bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 text-xs font-semibold px-2.5 py-1 rounded-md">
                      {item.classGrade || 'All Classes'}
                    </span>
                  </div>

                  {/* Title & Chapter */}
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-snug">
                    {item.title}
                  </h3>
                  {item.chapter && (
                    <p className="text-xs font-medium text-blue-600 dark:text-blue-400 mt-1">
                      📖 Chapter: {item.chapter}
                    </p>
                  )}

                  {/* Description */}
                  {item.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 line-clamp-3">
                      {item.description}
                    </p>
                  )}

                  {/* File Metadata */}
                  <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700/60 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      📄 {formatFileSize(item.pdf?.fileSize)}
                    </span>
                    <span>{formatDate(item.createdAt)}</span>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="bg-gray-50 dark:bg-gray-850 p-4 border-t border-gray-100 dark:border-gray-700 grid grid-cols-2 gap-2">
                  <a
                    href={`${API_BASE_URL}/api/resources/${item._id}/view`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 px-3 text-center bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-blue-600 dark:text-blue-300 border border-gray-300 dark:border-gray-600 rounded-xl text-xs font-semibold transition duration-150 flex items-center justify-center gap-1.5"
                  >
                    <span>👁️</span> View PDF
                  </a>
                  <a
                    href={`${API_BASE_URL}/api/resources/${item._id}/download?download=true`}
                    download
                    className="py-2 px-3 text-center bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition duration-150 flex items-center justify-center gap-1.5 shadow"
                  >
                    <span>⬇️</span> Download
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default Resources;
