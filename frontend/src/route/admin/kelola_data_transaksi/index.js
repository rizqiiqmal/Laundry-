import React, { useState } from "react";

const KelolaDataTransaksi = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      customerName: "Iqmal Rizqi",
      service: "Cuci Kering",
      totalPrice: 30000,
      status: "Selesai",
    },
    {
      id: 2,
      customerName: "Dewi Lestari",
      service: "Setrika",
      totalPrice: 15000,
      status: "Proses",
    },
    {
      id: 3,
      customerName: "Budi Santoso",
      service: "Cuci Lipat",
      totalPrice: 25000,
      status: "Selesai",
    },
  ]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDelete = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus transaksi ini?")) {
      setTransactions(transactions.filter((transaction) => transaction.id !== id));
    }
  };

  const filteredTransactions = transactions.filter((transaction) =>
    transaction.customerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center py-10">
      <h2 className="text-3xl font-bold text-blue-600 mb-6">Kelola Data Transaksi</h2>
      <div className="flex w-full max-w-4xl justify-between mb-4">
        {/* Pencarian */}
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Cari berdasarkan nama pelanggan..."
          className="w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {/* Tombol Tambah Transaksi */}
        <button
          onClick={() => alert("Navigasi ke halaman tambah transaksi!")}
          className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"
        >
          Tambah Transaksi
        </button>
      </div>
      {/* Tabel Transaksi */}
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
        <table className="table-auto w-full text-left">
          <thead>
            <tr className="bg-blue-100">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Nama Pelanggan</th>
              <th className="px-4 py-2">Layanan</th>
              <th className="px-4 py-2">Total Harga (Rp)</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="border-b hover:bg-blue-50">
                  <td className="px-4 py-2">{transaction.id}</td>
                  <td className="px-4 py-2">{transaction.customerName}</td>
                  <td className="px-4 py-2">{transaction.service}</td>
                  <td className="px-4 py-2">{transaction.totalPrice}</td>
                  <td className="px-4 py-2">{transaction.status}</td>
                  <td className="px-4 py-2">
                    {/* Tombol Edit */}
                    <button
                      onClick={() => alert(`Edit transaksi ID: ${transaction.id}`)}
                      className="bg-yellow-400 text-white px-4 py-2 rounded-lg mr-2 hover:bg-yellow-500 transition"
                    >
                      Edit
                    </button>
                    {/* Tombol Hapus */}
                    <button
                      onClick={() => handleDelete(transaction.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                    >
                      Hapus
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
        <button
        onClick={() => window.history.back()}
        className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
      >
        Kembali
      </button>
      </div>
    </div>
  );
};

export default KelolaDataTransaksi;
