import React from "react";
import { useNavigate } from 'react-router-dom';


const Admin = () => {
  const navigate = useNavigate();
    function adminBtn(){
    navigate ('/dashboard')
    } 
    function AdminFormBtn(){
    navigate ('/dashboard')
    } 
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-blue-500 text-white py-4 px-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold">Laundry POS</h1>
        </div>
        <div className="flex gap-2"> 
          <nav>
            <ul className="flex space-x-6"> 
              <li><a href="#adminDashboard" onClick={adminBtn}  className="bg-green-500 px-4 py-2 text-sm text-white rounded hover:bg-green-600">Back</a></li>
              <li><a href="#adminDashboard" onClick={AdminFormBtn}  className="bg-green-500 px-4 py-2 text-sm text-white rounded hover:bg-green-600">Logout</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto py-10 px-6">
        {/* Form Section */}
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-2xl font-semibold text-gray-700 mb-4 text-center">Form Input Data</h1>
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Field 1</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Field 2</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Field 3</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Field 4</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="flex justify-between mt-6">
              <button
                type="button"
                className="bg-gray-200 px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 px-4 py-2 rounded-md text-sm font-medium text-white hover:bg-blue-600"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-blue-500 text-white py-4 text-center text-sm">
        © 2025 Laundry POS. All Rights Reserved.
      </footer>
    </div>
  );
};
export default Admin;
