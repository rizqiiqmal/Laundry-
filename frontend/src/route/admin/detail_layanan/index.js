import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { FaChartLine, FaClipboardList, FaUsers, FaMoneyBillWave, FaSignOutAlt } from "react-icons/fa";

const DetailLayananPage = () => {
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
  const [layananList, setLayananList] = useState([]);
  const [editingLayanan, setEditingLayanan] = useState(null);
  const [formData, setFormData] = useState({
    nama_layanan: '',
    harga_per_kg: '',
    deskripsi: ''
  });

  // Cek apakah pengguna sudah login
  useEffect(() => {
    const user = sessionStorage.getItem("user");
    if (!user) {
      navigate('/login'); // Arahkan ke halaman login jika belum login
    } else {
      fetchLayanan(); // Ambil data layanan jika sudah login
    }
  }, [navigate]);

  // Fungsi untuk mengambil data layanan dari server
  const fetchLayanan = async () => {
    try {
      const response = await fetch('http://localhost:5000/layanan');
      const data = await response.json();
      if (response.ok) {
        setLayananList(data.data);
      } else {
        alert('Error fetching data: ' + data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Terjadi kesalahan saat mengambil data');
    }
  };

  // Fungsi untuk mengatur data layanan yang akan diedit
  const handleEdit = (layanan) => {
    setEditingLayanan(layanan.id);
    setFormData({
      nama_layanan: layanan.nama_layanan,
      harga_per_kg: layanan.harga_per_kg,
      deskripsi: layanan.deskripsi
    });
  };

  // Fungsi untuk memperbarui data layanan
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/layanan/${editingLayanan}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok) {
        alert('Layanan berhasil diperbarui: ' + data.message);
        fetchLayanan();
        setEditingLayanan(null);
        setFormData({ nama_layanan: '', harga_per_kg: '', deskripsi: '' });
      } else {
        alert('Error: ' + data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Terjadi kesalahan saat memperbarui data');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-blue-50">
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
        <h2 className="text-3xl font-bold text-blue-600 mb-6">Daftar Layanan</h2>

        <div className="bg-white w-full max-w-4xl p-6 rounded-lg shadow-lg">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="px-4 py-2 border">Nama Layanan</th>
                <th className="px-4 py-2 border">Deskripsi</th>
                <th className="px-4 py-2 border">Harga</th>
                <th className="px-4 py-2 border">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {layananList.map((layanan) => (
                <tr key={layanan.id} className="text-center">
                  <td className="px-4 py-2 border">{layanan.nama_layanan}</td>
                  <td className="px-4 py-2 border">{layanan.deskripsi}</td>
                  <td className="px-4 py-2 border">Rp {layanan.harga_per_kg}</td>
                  <td className="px-4 py-2 border">
                    <button
                      onClick={() => handleEdit(layanan)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded-lg mr-2 hover:bg-yellow-600 transition"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {editingLayanan && (
          <div className="bg-white w-full max-w-4xl p-6 rounded-lg shadow-lg mt-6">
            <h3 className="text-xl font-semibold mb-4">Edit Layanan</h3>
            <form onSubmit={handleUpdate}>
              <div>
                <label className="block text-sm font-medium text-gray-700">Nama Layanan</label>
                <input
                  type="text"
                  name="nama_layanan"
                  value={formData.nama_layanan}
                  onChange={(e) => setFormData({ ...formData, nama_layanan: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Harga per Kg</label>
                <input
                  type="number"
                  name="harga_per_kg"
                  value={formData.harga_per_kg}
                  onChange={(e) => setFormData({ ...formData, harga_per_kg: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Deskripsi</label>
                <textarea
                  name="deskripsi"
                  value={formData.deskripsi}
                  onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-lg"
                  required
                ></textarea>
              </div>
              <div className="flex justify-end mt-4">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};

export default DetailLayananPage;
