import React, { useState } from "react";

const DaftarTransaksi = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua");
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      customerName: "Iqmal Rizqi",
      service: "Cuci Kering",
      totalPrice: 30000,
      date: "2025-01-10",
      status: "Selesai",
    },
    {
      id: 2,
      customerName: "Dewi Lestari",
      service: "Setrika",
      totalPrice: 15000,
      date: "2025-01-11",
      status: "Proses",
    },
    {
      id: 3,
      customerName: "Budi Santoso",
      service: "Cuci Lipat",
      totalPrice: 25000,
      date: "2025-01-12",
      status: "Selesai",
    },
  ]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value);
  };

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.id.toString().includes(searchQuery);

    const matchesStatus =
      statusFilter === "Semua" || transaction.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center py-10">
      <h2 className="text-3xl font-bold text-blue-600 mb-6">Daftar Transaksi</h2>
      <div className="flex w-full max-w-4xl justify-between mb-4">
        {/* Pencarian */}
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Cari berdasarkan nama pelanggan atau ID..."
          className="w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {/* Filter Status */}
        <select
          value={statusFilter}
          onChange={handleStatusFilter}
          className="w-1/4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Semua">Semua Status</option>
          <option value="Selesai">Selesai</option>
          <option value="Proses">Proses</option>
        </select>
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
              <th className="px-4 py-2">Tanggal</th>
              <th className="px-4 py-2">Status</th>
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
                  <td className="px-4 py-2">{transaction.date}</td>
                  <td className="px-4 py-2">{transaction.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">
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
