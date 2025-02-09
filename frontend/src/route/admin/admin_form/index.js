import React, { useState, useEffect } from "react";        
import { useNavigate } from 'react-router-dom';        
import {addCSSInHead} from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.1.6/element.js";
import Swal from 'https://cdn.jsdelivr.net/npm/sweetalert2@11/src/sweetalert2.js';

await addCSSInHead("https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.css");
  
const Admin = () => {        
  const navigate = useNavigate();        
  const [formData, setFormData] = useState({        
    nama: '',        
    nomor_telepon: '',        
    alamat: '',        
    id_layanan: '',        
    berat: ''        
  });        
  const handleLogout = () => {
    sessionStorage.removeItem("user"); // Hapus data pengguna dari sessionStorage
    navigate('/login'); // Redirect ke halaman login
  };

  const tambahBtn = () => {
    navigate('/dashboard');
  };

  const kelolaBtn = () => {
    navigate('/kelola_data_transaksi');
  };

  const DaftarBtn = () => {
    navigate('/daftar_transaksi');
  };

  const detailBtn = () => {
    navigate('/detail_layanan');
  };

  const layananBtn = () => {
    navigate('/tambahlayanan');
  };

  const [layananList, setLayananList] = useState([]); // State untuk menyimpan daftar layanan      
  
  useEffect(() => {  
      fetchLayanan(); // Ambil data layanan saat komponen dimuat
      const user = JSON.parse(sessionStorage.getItem("user"));  
      if (!user) {  
        // Jika pengguna tidak login, redirect ke halaman login  
        navigate('/login');    
      }  
    }, [navigate]);    
  
  const fetchLayanan = async () => {      
    try {      
      const response = await fetch('http://localhost:5000/layanan'); // Ganti dengan endpoint yang sesuai      
      const data = await response.json();      
      if (response.ok) {      
        setLayananList(data.data); // Simpan data layanan ke state      
      } else {      
        Swal.fire({
          icon: "error",
          title: "Error",
          text: 'Error fetching layanan: ' + data.message,
        });
      }      
    } catch (error) {      
      console.error('Error:', error);      
      Swal.fire({
        icon: "error",
        title: "Error",
        text: 'Terjadi kesalahan saat mengambil data layanan',
      });
    }      
  };      
  
  const handleChange = (e) => {        
    const { name, value } = e.target;  
  
    // Validasi untuk nomor telepon  
    if (name === "nomor_telepon") {  
      // Hanya izinkan angka dan batasi panjangnya  
      if (/^\d*$/.test(value) && value.length <= 14) {  
        setFormData({        
          ...formData,        
          [name]: value        
        });  
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Nomor telepon hanya boleh mengandung angka dan tidak boleh lebih dari 14 digit.",
        });
      }
    } else {  
      setFormData({        
        ...formData,        
        [name]: value        
      });  
    }  
  };        
  
  const handleSubmit = async (e) => {          
    e.preventDefault();          
      
    // Validasi nomor telepon  
    if (formData.nomor_telepon.length > 14) {  
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Nomor telepon tidak boleh lebih dari 14 digit.",
      });
      return;  
    }  
  
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
        Swal.fire('Berhasil', 'Data pelanggan telah di inputkan.', 'success');  
        navigate('/dashboard');          
      } else {          
        Swal.fire({
          icon: "error",
          title: "Error",
          text: 'Error: ' + data.message,
        });
      }          
    } catch (error) {          
      console.error('Error:', error);          
      Swal.fire({
        icon: "error",
        title: "Error",
        text: 'Terjadi kesalahan saat mengirim data',
      });
    }          
  };         
  
  return (        
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-500 text-white p-6 hidden md:block">
        <div className="flex items-center gap-4 mb-8">
          <img src="logo.png" alt="Logo" className="h-12 w-13" /> {/* Logo */}
          <h1 className="text-xl font-bold">Laundry POS</h1>
        </div>
        <nav>
          <ul className="space-y-4">
          <li>
              <button onClick={tambahBtn} className="w-full text-left px-4 py-2 text-sm rounded hover:bg-blue-600 transition">
              Tambah Transaksi
              </button>
            </li>
            <li>
              <button onClick={kelolaBtn} className="w-full text-left px-4 py-2 text-sm rounded hover:bg-blue-600 transition">
                Mengelola Data Transaksi
              </button>
            </li>
            <li>
              <button onClick={DaftarBtn} className="w-full text-left px-4 py-2 text-sm rounded hover:bg-blue-600 transition">
                Daftar Transaksi
              </button>
            </li>
            <li>
              <button onClick={detailBtn} className="w-full text-left px-4 py-2 text-sm rounded hover:bg-blue-600 transition">
                Detail Layanan
              </button>
            </li>
            <li>
              <button onClick={layananBtn} className="w-full text-left px-4 py-2 text-sm rounded hover:bg-blue-600 transition">
                tambah Layanan
              </button>
            </li>
            <li>
              <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm rounded hover:bg-red-400 transition">
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>      
  
      {/* Main Content */}        
      <main className="flex-grow mx-auto py-10 px-4" style={{
        backgroundImage: 'url("bg1.png")', // Replace with your image URL
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}>            
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
                onChange={(e) => {
                  const inputValue = e.target.value;
                  // Cek apakah input dimulai dengan '0'
                  if (inputValue.startsWith('0')) {
                    // Ganti '0' dengan '62'
                    const newValue = '62' + inputValue.slice(1);
                    handleChange({ target: { name: 'nomor_telepon', value: newValue } });
                  } else {
                    handleChange(e);
                  }
                }}        
                placeholder="Contoh : 6283149869096"        
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-lg"        
              />        
            </div>        
            <div>        
              <label className="block text-sm font-medium text-gray-700">Layanan</label>        
              <select      
                name="id_layanan"      
                value={formData.id_layanan}      
                onChange={handleChange}      
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-lg"      
              >      
                <option value="">Pilih Layanan</option>      
                {layananList.map((layanan) => (      
                  <option key={layanan.id} value={layanan.id}>      
                    {layanan.nama_layanan}      
                  </option>      
                ))}      
              </select>      
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
    </div>        
  );        
};        
  
export default Admin;        
