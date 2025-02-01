import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { FaChartLine, FaClipboardList, FaUsers, FaMoneyBillWave, FaSignOutAlt } from "react-icons/fa";

const Admin = () => {
  const AdminFormBtn = () => {
    navigate('/dashboard');
  };

  const tambahBtn = () => {
    navigate('/admin_form');
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

  
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nama: '',
    nomor_telepon: '',
    alamat: '',
    id_layanan: '',
    berat: ''
  });

  const [layananList, setLayananList] = useState([]); // State untuk menyimpan daftar layanan

  useEffect(() => {
    fetchLayanan(); // Ambil data layanan saat komponen dimuat
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (!user) {
      navigate('/login'); // Jika pengguna tidak login, redirect ke halaman login
    }
  }, [navigate]);

  const fetchLayanan = async () => {
    try {
      const response = await fetch('http://localhost:5000/layanan');
      const data = await response.json();
      if (response.ok) {
        setLayananList(data.data); // Simpan data layanan ke state
      } else {
        alert('Error fetching layanan: ' + data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Terjadi kesalahan saat mengambil data layanan');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validasi untuk nomor telepon
    if (name === "nomor_telepon") {
      if (/^\d*$/.test(value) && value.length <= 14) {
        setFormData({
          ...formData,
          [name]: value
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
      alert("Nomor telepon tidak boleh lebih dari 14 digit.");
      return;
    }

    console.log('Form Data:', formData);
    try {
      const response = await fetch('http://localhost:5000/add_pelanggan_dan_layanan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
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

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-600 text-white p-5 flex flex-col space-y-4">
        <h1 className="text-xl font-bold">Laundry POS</h1>
        <nav className="flex flex-col space-y-3">
          <a href="" onClick={AdminFormBtn} className="flex items-center space-x-3 p-2 hover:bg-blue-700 rounded">
                <FaChartLine /> <span>Dashboard</span>
            </a>
            <a href="" onClick={kelolaBtn} className="flex items-center space-x-3 p-2 hover:bg-blue-700 rounded">
                <FaClipboardList /> <span>Kelola Transaksi</span>
            </a>
            <a href="" onClick={DaftarBtn} className="flex items-center space-x-3 p-2 hover:bg-blue-700 rounded">
                    <FaUsers /> <span>History</span>
            </a>
            <a href="" onClick={detailBtn} className="flex items-center space-x-3 p-2 hover:bg-blue-700 rounded">
              <FaMoneyBillWave /> <span>Detail Layanan</span>
          </a>
        </nav>
        <button onClick={handleLogout} className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 p-3 rounded text-white mt-auto">
          <FaSignOutAlt /> <span>Logout</span>
        </button>
      </aside>
      <div className="flex-grow container mx-auto py-52 px-6 text-center">
        <div className="bg-white shadow-lg rounded-xl p-8 max-w-xl mx-auto transform hover:scale-105 transition duration-300">
          <button 
            onClick={tambahBtn} 
            className="text-2xl font-semibold text-gray-800 hover:text-blue-600 transition duration-300">
            Tambahkan Transaksi Pelanggan
          </button>
        </div>
      </div>

    </div>
  );
};

export default Admin;
