import React, { useEffect, useState } from 'react';

function Banner() {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const loadStudent = () => {
      const saved = localStorage.getItem('studentUser');
      setStudent(saved ? JSON.parse(saved) : null);
    };
    loadStudent();
    window.addEventListener('studentAuthChange', loadStudent);
    return () => window.removeEventListener('studentAuthChange', loadStudent);
  }, []);

  return (
    <>
      <div>
        <img className="w-full" src="/Banner.png" alt="Irodov Plus Classes Banner" />
        <div className="text-center mt-7">
          <h1 className="text-xl sm:text-3xl flex flex-wrap items-center justify-center gap-3">
            <span>Want to join us?</span>
            {student ? (
              <a
                href="/enroll"
                className="bg-red-500 sm:text-2xl rounded-lg p-2 px-4 hover:bg-red-700 text-white font-semibold transition"
              >
                Enroll now
              </a>
            ) : (
              <button
                type="button"
                onClick={() => document.getElementById('my_modal_3')?.showModal()}
                className="bg-blue-600 sm:text-2xl rounded-lg p-2 px-4 hover:bg-blue-800 text-white font-semibold cursor-pointer transition shadow"
              >
                Login to Enroll
              </button>
            )}
          </h1>
        </div>
      </div>
    </>
  );
}

export default Banner;
