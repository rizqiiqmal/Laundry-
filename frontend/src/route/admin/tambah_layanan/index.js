import React, { useState } from "react";
import { Routes, Route } from 'react-router-dom';


const Tambahlayanan = () => {
  const [serviceName, setServiceName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newService = {
      serviceName,
      description,
      price,
      duration,
    };
    console.log("Service Added:", newService);
    alert("Layanan berhasil ditambahkan!");
    setServiceName("");
    setDescription("");
    setPrice("");
    setDuration("");
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center py-10">
      <h2 className="text-3xl font-bold text-blue-600 mb-6">Tambah Layanan Baru</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg"
      >
        {/* Nama Layanan */}
        <div className="mb-4">
          <label
            htmlFor="serviceName"
            className="block text-gray-700 font-medium mb-2"
          >
            Nama Layanan
          </label>
          <input
            type="text"
            id="serviceName"
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
            placeholder="Masukkan nama layanan"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Deskripsi Layanan */}
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 font-medium mb-2"
          >
            Deskripsi Layanan
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Deskripsi singkat layanan"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            required
          ></textarea>
        </div>

        {/* Harga */}
        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-gray-700 font-medium mb-2"
          >
            Harga
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Masukkan harga layanan (Rp)"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Durasi */}
        <div className="mb-4">
          <label
            htmlFor="duration"
            className="block text-gray-700 font-medium mb-2"
          >
            Durasi (Menit)
          </label>
          <input
            type="number"
            id="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="Durasi layanan (dalam menit)"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Tombol Simpan */}
        <div className="flex justify-between justify-items-center">
        <button
          type=""
          className="bg-red-500 text-white px-6 py-3 rounded-lg w- hover:bg-red-600 transition"
        >
          Batalkan Layanan
        </button>
        <button
          type="submit"
          className="bg-green-500 text-white px-6 py-3 rounded-lg w- hover:bg-green-600 transition"
        >
          Simpan Layanan
        </button>
        </div>
      </form>
    </div>
  );
};

export default Tambahlayanan;
