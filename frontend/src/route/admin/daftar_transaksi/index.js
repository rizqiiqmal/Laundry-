import React, { useState, useEffect } from "react";    
import { useNavigate } from 'react-router-dom';

const DaftarTransaksi = () => {
  const navigate = useNavigate();    
  const [searchQuery, setSearchQuery] = useState("");    
  const [transactions, setTransactions] = useState([]);    
  const [currentPage, setCurrentPage] = useState(1); 
  const [selectedTransaction, setSelectedTransaction] = useState(null); // State for selected transaction
  const transactionsPerPage = 5; 

  useEffect(() => {    
    fetchTransactions();
    const user = JSON.parse(sessionStorage.getItem("user"));  
    if (!user) {  
      navigate('/login');  
    }  
  }, [navigate]);    
    
  const fetchTransactions = async () => {    
    try {    
      const response = await fetch('http://localhost:5000/transaksi');    
      const data = await response.json();    
      if (response.ok) {    
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
    setCurrentPage(1); 
  };    
    
  const filteredTransactions = transactions.filter((transaction) => {    
    return transaction.nama_pelanggan.toLowerCase().includes(searchQuery.toLowerCase()) ||    
           transaction.id.toString().includes(searchQuery);    
  });    

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = filteredTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

  const handleLogout = () => {
    sessionStorage.removeItem("user"); 
    navigate('/login'); 
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

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const goBack = () => {
    window.history.back();
  };

  const handleClick = (transaction) => {
    setSelectedTransaction(transaction); // Set the selected transaction
  };

  return (    
    <div className="min-h-screen flex">         
      <aside className="w-64 bg-blue-500 text-white p-6 hidden md:block">
        <div className="flex items-center gap-4 mb-8">
          <img src="logo.png" alt="Logo" className="h-12 w-13" />
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
                Kelola Data Transaksi
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
                Tambah Layanan
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
        <div className="flex w-full py-5 max-w-4xl justify-between mb-4">    
          <input    
            type="text"    
            value={searchQuery}    
            onChange={handleSearch}    
            placeholder="Cari berdasarkan nama pelanggan atau ID..."    
            className="w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"    
          />    
        </div>    
        <div className="flex w-full max-w-4xl justify-between mb-4">    
          <table className="w-full border-collapse">    
            <thead>    
              <tr className="bg-blue-600 text-white">    
                <th className="px-4 py-2">ID</th>    
                <th className="px-4 py-2">Nama Pelanggan</th>    
                <th className="px-4 py-2">No Telepon</th>    
                <th className="px-4 py-2">Layanan</th>    
                <th className="px-4 py-2">Total Harga (Rp)</th>    
                <th className="px-4 py-2">Tanggal</th>    
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Struk</th>    
              </tr>    
            </thead>    
            <tbody>    
              {currentTransactions.length > 0 ? (    
                currentTransactions.map((transaction) => (    
                  <tr key={transaction.id} className="border-b hover:bg-blue-50">    
                    <td className="px-4 py-2">{transaction.id}</td>    
                    <td className="px-4 py-2">{transaction.nama_pelanggan}</td>    
                    <td className="px-4 py-2">{transaction.nomor_telepon}</td>    
                    <td className="px-4 py-2">{transaction.nama_layanan}</td>    
                    <td className="px-4 py-2">Rp.{transaction.total_harga}</td>    
                    <td className="px-4 py-2">{transaction.created_at}</td>
                    <td className="px-4 py-2">{transaction.status}</td>    
                    <td className="px-4 py-2 border">
                      <button
                      onClick={() => handleClick(transaction)} // Add click handler
                      className="bg-yellow-500 text-white px-3 py-1 rounded-lg mr-2 hover:bg-yellow-600 transition" 
                      >
                      Cetak
                      </button>
                    </td>    
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
        <div className="flex justify-between mt-6">
          <button    
            onClick={goBack}    
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"    
          >    
            Kembali    
          </button>  
          <div className="ml-auto flex space-x-4">
            <button
              onClick={prevPage}
              disabled={currentPage === 1} 
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Previous
            </button>
            <button
              onClick={nextPage}
              disabled={currentTransactions.length < transactionsPerPage} 
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Next
            </button>
          </div>
        </div>

        {/* Display Receipt Form if a transaction is selected */}
        {selectedTransaction && (
          <div className="mt-6 p-4 border rounded-lg bg-gray-100">
            <h2 className="text-lg font-bold">Struk Transaksi</h2>
            <p><strong>ID:</strong> {selectedTransaction.id}</p>
            <p><strong>Nama Pelanggan:</strong> {selectedTransaction.nama_pelanggan}</p>
            <p><strong>No Telepon:</strong> {selectedTransaction.nomor_telepon}</p>
            <p><strong>Layanan:</strong> {selectedTransaction.nama_layanan}</p>
            <p><strong>Total Harga:</strong>{selectedTransaction.total_harga}</p>
            <p><strong>Tanggal:</strong> {selectedTransaction.created_at}</p>
            <button 
              onClick={() => setSelectedTransaction(null)} 
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Tutup
            </button>
          </div>
        )}
      </div>   
    </div>    
  );    
};    
    
export default DaftarTransaksi;    
