import React, { useState, useEffect } from "react";    
import { useNavigate } from 'react-router-dom';

const DaftarTransaksi = () => {
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
      const response = await fetch('http://localhost:5000/transaksi'); // Ganti dengan endpoint yang sesuai    
      const data = await response.json();    
      if (response.ok) {    
        // Hanya ambil transaksi yang statusnya 'Selesai'    
        const completedTransactions = data.data.filter(transaction => transaction.status === 'Selesai');    
        setTransactions(completedTransactions);    
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
    
  const filteredTransactions = transactions.filter((transaction) => {    
    return transaction.nama_pelanggan.toLowerCase().includes(searchQuery.toLowerCase()) ||    
           transaction.id.toString().includes(searchQuery);    
  });    
    
  return (    
    <div className="min-h-screen bg-blue-50 flex flex-col items-center py-10">    
      <h2 className="text-3xl font-bold text-blue-600 mb-6">Daftar Transaksi Selesai</h2>    
      <div className="flex w-full max-w-4xl justify-between mb-4">    
        {/* Pencarian */}    
        <input    
          type="text"    
          value={searchQuery}    
          onChange={handleSearch}    
          placeholder="Cari berdasarkan nama pelanggan atau ID..."    
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
              <th className="px-4 py-2">No Telepon</th> {/* Kolom baru untuk nomor telepon */}    
              <th className="px-4 py-2">Layanan</th>    
              <th className="px-4 py-2">Total Harga (Rp)</th>    
              <th className="px-4 py-2">Tanggal</th>    
              <th className="px-4 py-2">Status</th>    
            </tr>    
          </thead>    
          <tbody>    
            {filteredTransactions.length > 0 ? (    
              filteredTransactions.map((transaction) => (    
                <tr key={transaction.id} className="border-b hover:bg-blue-50">    
                  <td className="px-4 py-2">{transaction.id}</td>    
                  <td className="px-4 py-2">{transaction.nama_pelanggan}</td>    
                  <td className="px-4 py-2">{transaction.nomor_telepon}</td> {/* Menampilkan nomor telepon */}    
                  <td className="px-4 py-2">{transaction.nama_layanan}</td>    
                  <td className="px-4 py-2">{transaction.total_harga}</td>    
                  <td className="px-4 py-2">{transaction.created_at}</td> {/* Tanggal bisa disesuaikan */}    
                  <td className="px-4 py-2">{transaction.status}</td>    
                </tr>    
              ))    
            ) : (    
              <tr>    
                <td colSpan="7" className="text-center py-4">    
                  Tidak ada data transaksi yang sesuai.    
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
    </div>    
  );    
};    
    
export default DaftarTransaksi;    
