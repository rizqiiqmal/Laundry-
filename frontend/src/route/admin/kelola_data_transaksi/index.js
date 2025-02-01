import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { FaChartLine, FaClipboardList, FaUsers, FaMoneyBillWave, FaSignOutAlt } from "react-icons/fa";

const KelolaDataTransaksi = () => {
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
  const [searchQuery, setSearchQuery] = useState("");
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (!user) {
      navigate('/login'); // Jika pengguna tidak login, redirect ke halaman login
    }
  }, [navigate]);

  const fetchTransactions = async () => {
    try {
      const response = await fetch('http://localhost:5000/transaksi');
      const data = await response.json();
      if (response.ok) {
        setTransactions(data.data.filter(transaction => transaction.status === 'Pending'));
      } else {
        alert('Error fetching transactions: ' + data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Terjadi kesalahan saat mengambil data transaksi');
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleStatusChange = async (id, nomorTelepon) => {
    const confirmChange = window.confirm("Apakah Anda yakin ingin mengubah status menjadi Selesai?");
    if (!confirmChange) return;

    try {
      const response = await fetch(`http://localhost:5000/transaksi/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'Selesai' }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Status transaksi berhasil diubah: ' + data.message);
        fetchTransactions();
      } else {
        alert('Error: ' + data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Terjadi kesalahan saat mengubah status transaksi');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    navigate('/login');
  };

  const filteredTransactions = transactions.filter((transaction) =>
    transaction.nama_pelanggan.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        <h2 className="text-3xl font-bold text-blue-600 mb-6">Kelola Data Transaksi</h2>

        {/* Pencarian */}
        <div className="flex w-full max-w-4xl justify-between mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Cari berdasarkan nama pelanggan..."
            className="w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Tabel Transaksi */}
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
          <table className="table-auto w-full text-left">
            <thead>
              <tr className="bg-blue-100">
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Nama Pelanggan</th>
                <th className="px-4 py-2">No Telepon</th>
                <th className="px-4 py-2">Nama Layanan</th>
                <th className="px-4 py-2">Total Harga (Rp)</th>
                <th className="px-4 py-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b hover:bg-blue-50">
                    <td className="px-4 py-2">{transaction.id}</td>
                    <td className="px-4 py-2">{transaction.nama_pelanggan}</td>
                    <td className="px-4 py-2">{transaction.nomor_telepon}</td>
                    <td className="px-4 py-2">{transaction.nama_layanan}</td>
                    <td className="px-4 py-2">{transaction.total_harga}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleStatusChange(transaction.id, transaction.nomor_telepon)}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                      >
                        Selesaikan
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    Tidak ada data transaksi.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Tombol Kembali */}
        <button
          onClick={() => window.history.back()}
          className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Kembali
        </button>
      </main>
    </div>
  );
};

export default KelolaDataTransaksi;
