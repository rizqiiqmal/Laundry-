import React from "react";

const DetailLayananPage = () => {

  const handleDelete = () => {
    alert("apakah anda ingin menghapus data ini?")
  };

  // Data dummy untuk daftar layanan
  const layananList = [
    { id: 1, nama_layanan: "Cuci Kering", deskripsi: "Pakaian dicuci dan dikeringkan", harga_per_kg: 10000 },
    { id: 2, nama_layanan: "Setrika", deskripsi: "Pakaian disetrika dengan rapi", harga_per_kg: 5000 },
    { id: 3, nama_layanan: "Cuci Lengkap", deskripsi: "Cuci, kering, dan setrika", harga_per_kg: 15000 },
  ];

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center py-10">
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
                  <button className="bg-yellow-500 text-white px-3 py-1 rounded-lg mr-2 hover:bg-yellow-600 transition">
                    Edit
                  </button>
                  <button onClick={() => handleDelete()} className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition">
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        onClick={() => window.history.back()}
        className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition">
        Kembali
      </button>
    </div>
  );
};

export default DetailLayananPage;
