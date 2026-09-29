import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../utils/api';

function Login() {
  const navigate = useNavigate();
  // authType: 'student' or 'owner'
  const [authRole, setAuthRole] = useState('student');
  // authMode: 'login' or 'register' (for student)
  const [authMode, setAuthMode] = useState('login');
  const [serverMsg, setServerMsg] = useState({ text: '', type: '' });
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const handleRoleChange = (role) => {
    setAuthRole(role);
    setServerMsg({ text: '', type: '' });
    reset();
  };

  const handleModeChange = (mode) => {
    setAuthMode(mode);
    setServerMsg({ text: '', type: '' });
    reset();
  };

  const closeModal = () => {
    const modal = document.getElementById('my_modal_3');
    if (modal) modal.close();
    setServerMsg({ text: '', type: '' });
    reset();
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    setServerMsg({ text: '', type: '' });

    try {
      if (authRole === 'owner') {
        // Owner Login
        const response = await axios.post(`${API_BASE_URL}/owners/login`, {
          email: data.email,
          password: data.password
        });

        if (response.data === 'Success') {
          closeModal();
          navigate('/owner');
        } else {
          setServerMsg({ text: response.data || 'Invalid owner credentials', type: 'error' });
        }
      } else {
        // Student Flow
        if (authMode === 'login') {
          // Student Login
          const response = await axios.post(`${API_BASE_URL}/api/students/login`, {
            email: data.email,
            password: data.password
          });

          if (response.data.success) {
            localStorage.setItem('studentUser', JSON.stringify(response.data.student));
            localStorage.setItem('studentToken', response.data.token);
            window.dispatchEvent(new Event('studentAuthChange'));
            setServerMsg({ text: 'Logged in successfully!', type: 'success' });
            setTimeout(() => {
              closeModal();
            }, 600);
          } else {
            setServerMsg({ text: response.data.message || 'Login failed', type: 'error' });
          }
        } else {
          // Student Register
          const response = await axios.post(`${API_BASE_URL}/api/students/register`, {
            fullname: data.fullname,
            email: data.email,
            password: data.password,
            phone: data.phone,
            classGrade: data.classGrade
          });

          if (response.data.success) {
            localStorage.setItem('studentUser', JSON.stringify(response.data.student));
            localStorage.setItem('studentToken', response.data.token);
            window.dispatchEvent(new Event('studentAuthChange'));
            setServerMsg({ text: 'Registration successful! You are now logged in.', type: 'success' });
            setTimeout(() => {
              closeModal();
            }, 800);
          } else {
            setServerMsg({ text: response.data.message || 'Registration failed', type: 'error' });
          }
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
      const errMsg = error.response?.data?.message || 'Something went wrong. Please check your credentials and try again.';
      setServerMsg({ text: errMsg, type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 max-w-md w-full shadow-2xl rounded-2xl border border-gray-200 dark:border-gray-800">
          {/* Close button */}
          <button
            type="button"
            className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3 text-gray-500 hover:text-gray-800 dark:hover:text-white"
            onClick={closeModal}
          >
            ✕
          </button>

          {/* Role selector tabs */}
          <div className="flex border-b border-gray-200 dark:border-gray-700 mt-2 mb-4">
            <button
              type="button"
              onClick={() => handleRoleChange('student')}
              className={`flex-1 py-2 text-center font-semibold text-sm transition-colors border-b-2 ${
                authRole === 'student'
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              🎓 Student Portal
            </button>
            <button
              type="button"
              onClick={() => handleRoleChange('owner')}
              className={`flex-1 py-2 text-center font-semibold text-sm transition-colors border-b-2 ${
                authRole === 'owner'
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              👨‍🏫 Owner / Admin
            </button>
          </div>

          {/* Title & Mode switch for student */}
          <div className="mb-4">
            <h3 className="font-bold text-xl text-center">
              {authRole === 'owner'
                ? 'Owner / Teacher Login'
                : authMode === 'login'
                ? 'Student Login'
                : 'Create Student Account'}
            </h3>
            {authRole === 'student' && (
              <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-1">
                {authMode === 'login' ? (
                  <>
                    Don't have an account?{' '}
                    <button
                      type="button"
                      onClick={() => handleModeChange('register')}
                      className="text-blue-600 hover:underline font-semibold cursor-pointer"
                    >
                      Register here
                    </button>
                  </>
                ) : (
                  <>
                    Already registered?{' '}
                    <button
                      type="button"
                      onClick={() => handleModeChange('login')}
                      className="text-blue-600 hover:underline font-semibold cursor-pointer"
                    >
                      Login here
                    </button>
                  </>
                )}
              </p>
            )}
          </div>

          {/* Status Message */}
          {serverMsg.text && (
            <div
              className={`p-3 rounded-lg text-sm mb-4 ${
                serverMsg.type === 'error'
                  ? 'bg-red-100 text-red-700 border border-red-300 dark:bg-red-900/30 dark:text-red-400'
                  : 'bg-green-100 text-green-700 border border-green-300 dark:bg-green-900/30 dark:text-green-400'
              }`}
            >
              {serverMsg.text}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            {/* Student Registration additional fields */}
            {authRole === 'student' && authMode === 'register' && (
              <>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-gray-600 dark:text-gray-300">
                    Full Name *
                  </label>
                  <input
                    {...register('fullname', { required: 'Full name is required' })}
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.fullname && (
                    <span className="text-xs text-red-500 mt-0.5 block">{errors.fullname.message}</span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-gray-600 dark:text-gray-300">
                      Phone Number
                    </label>
                    <input
                      {...register('phone')}
                      type="tel"
                      placeholder="10-digit number"
                      className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-gray-600 dark:text-gray-300">
                      Class / Target
                    </label>
                    <select
                      {...register('classGrade')}
                      defaultValue="Class 12"
                      className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Class 11">Class 11</option>
                      <option value="Class 12">Class 12</option>
                      <option value="JEE Dropper / Target">JEE Dropper</option>
                      <option value="NEET">NEET Target</option>
                      <option value="Foundation">Foundation (9/10)</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-gray-600 dark:text-gray-300">
                Email Address *
              </label>
              <input
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: 'Please enter a valid email address'
                  }
                })}
                type="email"
                placeholder="name@example.com"
                className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && (
                <span className="text-xs text-red-500 mt-0.5 block">{errors.email.message}</span>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-gray-600 dark:text-gray-300">
                Password *
              </label>
              <input
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters'
                  }
                })}
                type="password"
                placeholder="••••••••"
                className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.password && (
                <span className="text-xs text-red-500 mt-0.5 block">{errors.password.message}</span>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-lg shadow transition duration-200 cursor-pointer flex justify-center items-center"
              >
                {isLoading ? (
                  <span className="inline-block animate-spin mr-2">⏳</span>
                ) : null}
                {authRole === 'owner'
                  ? 'Login as Owner'
                  : authMode === 'login'
                  ? 'Login to Student Account'
                  : 'Complete Registration'}
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}

export default Login;
