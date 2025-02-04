import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (!user) {
      // Jika pengguna tidak login, redirect ke halaman login
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("user"); // Hapus data pengguna dari sessionStorage
    navigate('/login'); // Redirect ke halaman login
  };

  const AdminFormBtn = () => {
    navigate('/admin_form');
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
      <main className="flex-grow flex items-center justify-center" style={{
        backgroundImage: 'url("bg1.png")', // Replace with your image URL
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}>
        {/* Title Section */}
        <div className="">
          <button onClick={AdminFormBtn} className="bg-white shadow rounded-lg p-6 text-center hover:bg-blue-100 transition">
            <h1 className="text-2xl font-semibold text-gray-700">Menambahkan Transaksi Pelanggan</h1>
          </button>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
