import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Login from './Login';

function Navbar() {
  const [sticky, setSticky] = useState(false);
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const loadStudent = () => {
      const saved = localStorage.getItem('studentUser');
      if (saved) {
        try {
          setStudent(JSON.parse(saved));
        } catch (e) {
          setStudent(null);
        }
      } else {
        setStudent(null);
      }
    };
    loadStudent();
    window.addEventListener('studentAuthChange', loadStudent);
    return () => window.removeEventListener('studentAuthChange', loadStudent);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('studentUser');
    localStorage.removeItem('studentToken');
    setStudent(null);
    window.dispatchEvent(new Event('studentAuthChange'));
  };

  const navitems = (
    <>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/resources">Study Material</Link></li>
      <li><Link to="/result">Result</Link></li>
      {student && <li><Link to="/enroll">Enroll</Link></li>}
      <li><Link to="/contact">Contact</Link></li>
      <li><Link to="/about">About us</Link></li>
    </>
  );

  return (
    <div
      className={`max-w-screen-2xl container bg-gray-900 mx-auto md:px-20 px-4 fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        sticky ? 'shadow-lg bg-gray-900/95 backdrop-blur-md' : ''
      }`}
    >
      <div className="navbar shadow-sm text-white">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-gray-800 text-white rounded-box z-50 mt-3 w-52 p-2 shadow-lg"
            >
              {navitems}
            </ul>
          </div>
          <Link to="/" className="flex items-center">
            <img className="w-8 sm:w-10 mr-2" src="/logo.png" alt="Irodov logo" />
            <span className="text-sm sm:text-xl sm:font-bold tracking-tight">Irodov + Classes</span>
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-1 font-medium">
            {navitems}
          </ul>
        </div>

        <div className="navbar-end flex items-center space-x-2">
          {student ? (
            <div className="flex items-center space-x-2">
              <span className="text-xs sm:text-sm font-medium bg-blue-900/60 border border-blue-500/40 text-blue-200 px-3 py-1.5 rounded-full flex items-center gap-1.5">
                <span>🎓</span>
                <span className="max-w-[120px] truncate">{student.fullname}</span>
              </span>
              <button
                onClick={handleLogout}
                className="btn btn-sm btn-outline border-red-500 text-red-400 hover:bg-red-600 hover:border-red-600 hover:text-white rounded-lg transition-colors"
                title="Log out of student account"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              className="btn btn-sm sm:btn-md bg-blue-600 hover:bg-blue-700 text-white border-none rounded-lg shadow font-medium cursor-pointer"
              onClick={() => document.getElementById('my_modal_3').showModal()}
            >
              Login / Register
            </button>
          )}
          <Login />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
