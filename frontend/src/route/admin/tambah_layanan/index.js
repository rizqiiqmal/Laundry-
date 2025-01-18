import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';      
import axios from 'axios';      
  
const LayananManager = () => {      
  const [serviceName, setServiceName] = useState("");      
  const [description, setDescription] = useState("");      
  const [price, setPrice] = useState("");      
  const [services, setServices] = useState([]);      
  const [editingService, setEditingService] = useState(null);      
  const [error, setError] = useState("");      
  const [successMessage, setSuccessMessage] = useState("");      
  
  useEffect(() => {      
    fetchServices();      
  }, []);      
  
  const fetchServices = async () => {      
    try {      
      const response = await axios.get('http://localhost:5000/layanan');        
      setServices(response.data.data);      
      setError("");      
    } catch (err) {      
      setError("Terjadi kesalahan saat mengambil data layanan");      
    }      
  };      
  
  const handleSubmit = async (e) => {      
    e.preventDefault();      
    const newService = {      
        nama_layanan: serviceName,      
        harga_per_kg: parseFloat(price),      
        deskripsi: description,      
    };      
  
    console.log("Payload yang dikirim:", newService); // Tambahkan ini untuk debugging      
  
    try {      
        if (editingService) {      
            await axios.put(`http://localhost:5000/layanan/${editingService.id}`, newService);      
            setSuccessMessage("Layanan berhasil diperbarui!");      
        } else {      
            await axios.post('http://localhost:5000/layanan', newService);      
            setSuccessMessage("Layanan berhasil ditambahkan!");      
        }      
        fetchServices();      
        resetForm();      
    } catch (err) {      
        setError("Terjadi kesalahan saat menyimpan layanan");      
    }      
};      
  
const handleEdit = (service) => {      
    setServiceName(service.nama_layanan); // Perbaiki nama properti  
    setDescription(service.deskripsi);      
    setPrice(service.harga_per_kg);      
    setEditingService(service);      
};      
  
const handleDelete = async (id) => {      
    try {      
      await axios.delete(`http://localhost:5000/layanan/${id}`); // Perbaiki URL  
      fetchServices();      
      setSuccessMessage("Layanan berhasil dihapus!");      
    } catch (err) {      
      setError("Terjadi kesalahan saat menghapus layanan");      
    }      
};      
  
const resetForm = () => {      
    setServiceName("");      
    setDescription("");      
    setPrice("");      
    setEditingService(null);      
    setSuccessMessage("");      
};      
  
return (      
    <div className="min-h-screen bg-blue-50 flex flex-col items-center py-10">      
      <h2 className="text-3xl font-bold text-blue-600 mb-6">      
        {editingService ? "Edit Layanan" : "Tambah Layanan Baru"}      
      </h2>      
      {error && <p className="text-red-500 mb-4">{error}</p>}      
      {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}      
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
  
        {/* Tombol Simpan */}      
        <div className="flex justify-between justify-items-center">      
          <button      
            type="button"      
            onClick={resetForm}      
            className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"      
          >      
            Reset      
          </button>      
          <button      
            type="submit"      
            className="mt-6 bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"      
          >      
            {editingService ? "Simpan Perubahan" : "Simpan Layanan"}      
          </button>      
        </div>      
      </form> 
      <button
        onClick={() => window.history.back()}
        className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition">
        Kembali
      </button>     
    </div>
    
     
  );      
};      
  
export default LayananManager;      
