import React, { useState } from "react";  
import { useNavigate } from 'react-router-dom';  
  
const Admin = () => {  
  const navigate = useNavigate();  
  const [formData, setFormData] = useState({  
    nama: '',  
    nomor_telepon: '',  
    alamat: '',  
    id_layanan: '',  
    berat: ''  
  });  
  
  const handleChange = (e) => {  
    setFormData({  
      ...formData,  
      [e.target.name]: e.target.value  
    });  
  };  
  
  const handleSubmit = async (e) => {    
    e.preventDefault();    
    console.log('Form Data:', formData); // Tambahkan log ini    
    try {    
        const response = await fetch('http://localhost:5000/add_pelanggan_dan_layanan', {    
            method: 'POST',    
            headers: {    
                'Content-Type': 'application/json'    
            },    
            body: JSON.stringify({    
                nama: formData.nama,    
                nomor_telepon: formData.nomor_telepon,    
                alamat: formData.alamat,    
                id_layanan: formData.id_layanan,    
                berat: formData.berat // Kirim berat sebagai string, konversi di backend  
            })    
        });    
        const data = await response.json();    
        if (response.ok) {    
            alert('Data berhasil disimpan: ' + data.message);    
            navigate('/dashboard');    
        } else {    
            alert('Error: ' + data.message);    
        }    
    } catch (error) {    
        console.error('Error:', error);    
        alert('Terjadi kesalahan saat mengirim data');    
    }    
};   
 
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
              <li><a href="#landing_page" onClick={() => navigate('/landing_page')} className="bg-green-500 px-4 py-2 text-sm text-white rounded hover:bg-green-600">Logout</a></li>  
            </ul>  
          </nav>  
        </div>  
      </header>  
  
      {/* Main Content */}  
      <main className="flex-grow container mx-auto py-10 px-6">  
        {/* Form Section */}  
        <div className="bg-white shadow rounded-lg p-6 max-w-lg mx-auto">  
          <h1 className="text-2xl font-semibold text-gray-700 mb-4 text-center">Form Input Data</h1>  
          <form className="space-y-6" onSubmit={handleSubmit}>  
            <div>  
              <label className="block text-sm font-medium text-gray-700">Nama</label>  
              <input  
                type="text"  
                name="nama"  
                value={formData.nama}  
                onChange={handleChange}  
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-lg"  
              />  
            </div>  
            <div>  
              <label className="block text-sm font-medium text-gray-700">Alamat</label>  
              <input  
                type="text"  
                name="alamat"  
                value={formData.alamat}  
                onChange={handleChange}  
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-lg"  
              />  
            </div>  
            <div>  
              <label className="block text-sm font-medium text-gray-700">No Hp</label>  
              <input  
                type="text"  
                name="nomor_telepon"  
                value={formData.nomor_telepon}  
                onChange={handleChange}  
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-lg"  
              />  
            </div>  
            <div>  
              <label className="block text-sm font-medium text-gray-700">ID Layanan</label>  
              <input  
                type="text"  
                name="id_layanan"  
                value={formData.id_layanan}  
                onChange={handleChange}  
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-lg"  
              />  
            </div>  
            <div>  
              <label className="block text-sm font-medium text-gray-700">Berat (kg)</label>  
              <input  
                type="number"  
                name="berat"  
                value={formData.berat}  
                onChange={handleChange}  
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-lg"  
              />  
            </div>  
            <div className="flex justify-between mt-6">  
              <button  
                type="button"  
                onClick={() => navigate('/dashboard')}  
                className="bg-green-500 px-4 py-2 text-sm text-white rounded hover:bg-green-600"  
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
