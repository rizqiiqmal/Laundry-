import React, { useState, useEffect } from "react";          
import { useNavigate } from 'react-router-dom';    
    
const KelolaDataTransaksi = () => {    
  const navigate = useNavigate();          
  const [searchQuery, setSearchQuery] = useState("");          
  const [transactions, setTransactions] = useState([]);          
      
  // Mengambil data transaksi dari API saat komponen dimuat          
  useEffect(() => {          
    fetchTransactions();          
    const user = JSON.parse(sessionStorage.getItem("user"));      
    if (!user) {      
      // Jika pengguna tidak login, redirect ke halaman login      
      navigate('/login');      
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
      
  const filteredTransactions = transactions.filter((transaction) =>          
    transaction.nama_pelanggan.toLowerCase().includes(searchQuery.toLowerCase())          
  );          

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

  return (          
    <div className="min-h-screen flex">         
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
      <div className="w-full md:w-3/4 p-6" style={{
        backgroundImage: 'url("bg2.jpg")', // Replace with your image URL
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}>           
        <div className="flex w-full py-5 max-w-4xl justify-between mt-5 mb-4">          
          <input          
            type="text"          
            value={searchQuery}          
            onChange={handleSearch}          
            placeholder="Cari berdasarkan nama pelanggan..."          
            className="w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"          
          />          
        </div>          
        <div className="flex w-full max-w-4xl justify-between mb-4">          
          <table className="w-full border-collapse">          
            <thead>          
              <tr className="bg-blue-500 text-white">          
                <th className="px-4 py-2">ID</th>          
                <th className="px-4 py-2">Nama Pelanggan</th>          
                <th className="px-4 py-2">No Telepon</th> {/* Kolom baru untuk nomor telepon */}      
                <th className="px-4 py-2">Nama Layanan</th>          
                <th className="px-4 py-2">Total Harga (Rp)</th>          
                <th className="px-4 py-2">Aksi</th>          
              </tr>          
            </thead>          
            <tbody>          
              {filteredTransactions.length > 0 ? (          
                filteredTransactions.map((transaction) => (          
                  <tr key={transaction.id} className="text-center">          
                    <td className="px-4 py-2">{transaction.id}</td>          
                    <td className="px-4 py-2">{transaction.nama_pelanggan}</td>          
                    <td className="px-4 py-2">{transaction.nomor_telepon}</td> {/* Menampilkan nomor telepon */}      
                    <td className="px-4 py-2">{transaction.nama_layanan}</td>          
                    <td className="px-4 py-2">Rp.{transaction.total_harga}</td>          
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
        <button          
          onClick={() => window.history.back()}          
          className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition">          
          Kembali          
        </button>          
      </div>
    </div>          
  );          
};          
      
export default KelolaDataTransaksi;          
