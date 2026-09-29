import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../utils/api';

function OwnerResourceUpload() {
  const [resources, setResources] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [statusMsg, setStatusMsg] = useState({ text: '', type: '' });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const fetchResources = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/resources`);
      if (res.data && res.data.success) {
        setResources(res.data.resources || []);
      }
    } catch (err) {
      console.error('Error fetching resources:', err);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
        alert('Please choose a valid PDF file (.pdf)');
        e.target.value = null;
        setSelectedFile(null);
        return;
      }
      setSelectedFile(file);
    }
  };

  const onSubmit = async (data) => {
    if (!selectedFile) {
      setStatusMsg({ text: 'Please select a PDF file to upload', type: 'error' });
      return;
    }

    setIsUploading(true);
    setStatusMsg({ text: '', type: '' });

    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('subject', data.subject);
    formData.append('classGrade', data.classGrade);
    formData.append('chapter', data.chapter || '');
    formData.append('description', data.description || '');
    formData.append('pdf', selectedFile);

    try {
      const res = await axios.post(`${API_BASE_URL}/api/resources/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (res.data && res.data.success) {
        setStatusMsg({ text: 'PDF Class Material uploaded successfully!', type: 'success' });
        reset();
        setSelectedFile(null);
        // Clear file input manually
        const fileInput = document.getElementById('pdf-file-input');
        if (fileInput) fileInput.value = null;
        fetchResources();
      } else {
        setStatusMsg({ text: res.data.message || 'Upload failed', type: 'error' });
      }
    } catch (err) {
      console.error('Upload error:', err);
      setStatusMsg({
        text: err.response?.data?.message || 'Upload failed. Please check the file and try again.',
        type: 'error'
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) {
      return;
    }

    try {
      const res = await axios.delete(`${API_BASE_URL}/api/resources/${id}`);
      if (res.data && res.data.success) {
        setStatusMsg({ text: `"${title}" was deleted successfully.`, type: 'success' });
        fetchResources();
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('Failed to delete resource');
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes || bytes === 0) return '0 KB';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 md:p-8">
      {/* Header bar */}
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center mb-8 gap-4 border-b border-gray-800 pb-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
            <span>📚</span> Admin - Upload Class Material (PDF)
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Upload notes, lecture slides, and question sheets for students to download.
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            to="/owner"
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-sm font-medium transition"
          >
            ← Back to Dashboard
          </Link>
          <Link
            to="/resources"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition"
          >
            View Public Resources
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Upload Form (Left Column) */}
        <div className="lg:col-span-5">
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 shadow-xl sticky top-8">
            <h2 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
              <span>📤</span> Upload New PDF Material
            </h2>

            {statusMsg.text && (
              <div
                className={`p-3 rounded-xl text-sm mb-4 ${
                  statusMsg.type === 'error'
                    ? 'bg-red-900/40 border border-red-700 text-red-300'
                    : 'bg-green-900/40 border border-green-700 text-green-300'
                }`}
              >
                {statusMsg.text}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1">
                  Material Title *
                </label>
                <input
                  {...register('title', { required: 'Title is required' })}
                  placeholder="e.g. Kinematics Lecture Notes & Problem Sheet"
                  className="w-full px-3.5 py-2.5 bg-gray-900 border border-gray-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.title && (
                  <span className="text-xs text-red-400 mt-1 block">{errors.title.message}</span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1">
                    Subject *
                  </label>
                  <select
                    {...register('subject')}
                    defaultValue="Physics"
                    className="w-full px-3 py-2.5 bg-gray-900 border border-gray-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Physics">Physics</option>
                    <option value="Mechanics">Mechanics</option>
                    <option value="Electromagnetism">Electromagnetism</option>
                    <option value="Optics & Waves">Optics & Waves</option>
                    <option value="Thermodynamics">Thermodynamics</option>
                    <option value="Modern Physics">Modern Physics</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1">
                    Target Class *
                  </label>
                  <select
                    {...register('classGrade')}
                    defaultValue="Class 12"
                    className="w-full px-3 py-2.5 bg-gray-900 border border-gray-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="All Classes">All Classes</option>
                    <option value="Class 11">Class 11</option>
                    <option value="Class 12">Class 12</option>
                    <option value="JEE Main & Advanced">JEE Main & Adv</option>
                    <option value="NEET">NEET Target</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1">
                  Chapter / Topic (Optional)
                </label>
                <input
                  {...register('chapter')}
                  placeholder="e.g. Work, Energy and Power"
                  className="w-full px-3.5 py-2.5 bg-gray-900 border border-gray-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1">
                  Description / Hints (Optional)
                </label>
                <textarea
                  {...register('description')}
                  rows="2"
                  placeholder="e.g. Includes Irodov problems 1.1 to 1.35 solved with steps"
                  className="w-full px-3.5 py-2.5 bg-gray-900 border border-gray-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              {/* PDF File Picker */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1">
                  Select PDF File * (Max 30 MB)
                </label>
                <div className="border-2 border-dashed border-gray-600 rounded-xl p-4 text-center hover:border-blue-500 transition-colors bg-gray-900/50">
                  <input
                    id="pdf-file-input"
                    type="file"
                    accept=".pdf,application/pdf"
                    onChange={handleFileChange}
                    className="block w-full text-xs text-gray-400 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
                  />
                  {selectedFile && (
                    <div className="mt-2 text-xs text-green-400 flex items-center justify-center gap-1">
                      <span>✓</span> Selected: {selectedFile.name} ({formatFileSize(selectedFile.size)})
                    </div>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={isUploading}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-semibold rounded-xl transition duration-150 shadow-lg cursor-pointer flex justify-center items-center gap-2"
              >
                {isUploading ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    <span>Uploading PDF to Database...</span>
                  </>
                ) : (
                  <>
                    <span>📤</span>
                    <span>Upload Resource</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Existing Uploaded Resources (Right Column) */}
        <div className="lg:col-span-7">
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span>📑</span> Uploaded Materials ({resources.length})
              </h2>
              <button
                onClick={fetchResources}
                className="text-xs text-gray-400 hover:text-white flex items-center gap-1 cursor-pointer bg-gray-700 px-3 py-1.5 rounded-lg"
              >
                <span>🔄</span> Refresh
              </button>
            </div>

            {resources.length === 0 ? (
              <div className="py-12 text-center text-gray-400">
                <p className="text-3xl mb-2">📂</p>
                <p>No materials uploaded yet.</p>
                <p className="text-xs text-gray-500 mt-1">Use the form on the left to upload your first class PDF!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {resources.map((item) => (
                  <div
                    key={item._id}
                    className="p-4 bg-gray-900 rounded-xl border border-gray-700/80 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 hover:border-gray-600 transition"
                  >
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-blue-900/60 text-blue-300">
                          {item.subject}
                        </span>
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-purple-900/60 text-purple-300">
                          {item.classGrade}
                        </span>
                        {item.chapter && (
                          <span className="text-xs text-gray-400">
                            • {item.chapter}
                          </span>
                        )}
                      </div>
                      <h3 className="font-semibold text-white text-sm">{item.title}</h3>
                      <p className="text-xs text-gray-400 mt-1">
                        📄 {item.pdf?.fileName || 'Document.pdf'} ({formatFileSize(item.pdf?.fileSize)})
                      </p>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                      <a
                        href={`${API_BASE_URL}/api/resources/${item._id}/view`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-blue-300 rounded-lg text-xs font-medium transition"
                      >
                        👁️ View
                      </a>
                      <button
                        onClick={() => handleDelete(item._id, item.title)}
                        className="px-3 py-1.5 bg-red-900/40 hover:bg-red-800 text-red-300 border border-red-800 rounded-lg text-xs font-medium transition cursor-pointer"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OwnerResourceUpload;
