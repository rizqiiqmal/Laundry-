import React from "react";
import { useNavigate } from 'react-router-dom';


 const AdminDashboard = () => {
   const navigate = useNavigate();
     function adminBtn(){
       navigate ('./admin/dashboad')
     } 
     function AdminFormBtn(){
       navigate ('/admin_form')
     } 
     function layananBtn(){
        navigate ('/tambahlayanan')
      } 
      function kelolaBtn(){
        navigate ('/kelola_data_transaksi')
      } 
      function DaftarBtn(){
        navigate ('/daftar_transaksi')
      } 
      function kontakBtn(){
        navigate ('/kontak')
      } 

   return (
    <div className="min-h-screen flex flex-col bg-blue-50">
       {/* Header */}
       <header className="bg-blue-500 text-white py-4 px-6 flex justify-between items-center">
         <div className="flex items-center gap-4">
         <h1 className="text-xl font-bold">Laundry POS</h1>
         </div>
         <div className="flex gap-2">
           <nav>
               <ul className="flex space-x-6"> 
                 <li><a href="#landing page" onClick={adminBtn}  className="bg-green-500 px-4 py-2 text-sm text-white rounded hover:bg-green-600">Logout</a></li>
               </ul>
           </nav>
         </div>
       </header>

       {/* Main Content */}
       <main className="flex-grow container mx-auto py-10 px-6">
         {/* Title Section */}
         <div className="bg-white shadow rounded-lg p-6 text-center">
         <button onClick={AdminFormBtn} className="bg-white shadow rounded-lg p-6 text-center hover:bg-blue-100 transition">
           <h1 className="text-2xl font-semibold text-gray-700">Menambahkan Transaksi Pelanggan</h1>
         </button>
         </div>

         {/* Action Buttons */}
         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
           <button  onClick={layananBtn} className="bg-white shadow rounded-lg p-6 text-center hover:bg-blue-100 transition">
             <h2 className="text-lg font-medium text-gray-700">Menambahkan Layanan</h2>
           </button>
           <button onClick={kelolaBtn} className="bg-white shadow rounded-lg p-6 text-center hover:bg-blue-100 transition">
             <h2 className="text-lg font-medium text-gray-700">Mengelola Data Transaksi</h2>
           </button>
           <button onClick={DaftarBtn} className="bg-white shadow rounded-lg p-6 text-center hover:bg-blue-100 transition">
             <h2 className="text-lg font-medium text-gray-700">Daftar Transaksi</h2>
           </button>
           <button onClick={kontakBtn} className="bg-white shadow rounded-lg p-6 text-center hover:bg-blue-100 transition">
             <h2 className="text-lg font-medium text-gray-700">Kontak</h2>
           </button>
         </div>
       </main>

       {/* Footer */}
       <footer className="bg-blue-500 text-white py-4 text-center text-sm">
         © 2025 Laundry POS. All Rights Reserved.
       </footer>
     </div>
   );
 };

export default AdminDashboard;
