import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { FaChartLine, FaClipboardList, FaUsers, FaMoneyBillWave, FaSignOutAlt } from "react-icons/fa";

const Admin = () => {
  const AdminFormBtn = () => {
    navigate('/dashboard');
  };

  const layananBtn = () => {
    navigate('/tambahlayanan');
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

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center py-10">
        <h2 className="text-3xl font-bold text-blue-600 mb-6">Form Input Data</h2>

        {/* Form Section */}
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg w-full">
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
