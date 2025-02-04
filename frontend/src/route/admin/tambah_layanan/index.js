import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const TambahLayanan = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nama_layanan: '',
        harga_per_kg: '',
        deskripsi: ''
    });

    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem("user"));
        if (!user) {
            navigate('/login'); // Jika pengguna tidak login, redirect ke halaman login
        }
    }, [navigate]);

    const handleChange = (e) => {  
        setFormData({  
            ...formData,  
            [e.target.name]: e.target.value  
        });  
    };  
  
    const handleSubmit = async (e) => {  
        e.preventDefault();  
        console.log('Form Data:', formData); // Tambahkan log ini  
  
        try {  
            const response = await fetch('http://localhost:5000/layanan', {  
                method: 'POST',  
                headers: {  
                    'Content-Type': 'application/json' // Menggunakan application/json  
                },  
                body: JSON.stringify(formData) // Mengirim data sebagai JSON  
            });  
  
            const data = await response.json();  
  
            if (response.ok) {  
                alert('Layanan berhasil ditambahkan: ' + data.message);  
                navigate('/dashboard');  
            } else {  
                alert('Error: ' + data.message);  
            }  
        } catch (error) {  
            console.error('Error:', error);  
            alert('Terjadi kesalahan saat mengirim data');  
        }  
    };  

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
            <main className="flex-grow mx-auto py-10 px-4" style={{
        backgroundImage: 'url("bg1.png")', // Replace with your image URL
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}>     
                {/* Form Section */}  
                <div className="bg-white shadow rounded-lg p-6 max-w-lg mt-20 mx-auto">  
                    <h1 className="text-2xl font-semibold text-gray-700 mb-4 text-center">Form Tambah Layanan</h1>  
                    <form className="space-y-6" onSubmit={handleSubmit}>  
                        <div>  
                            <label className="block text-sm font-medium text-gray-700">Nama Layanan</label>  
                            <input  
                                type="text"  
                                name="nama_layanan"  
                                value={formData.nama_layanan}  
                                onChange={handleChange}  
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-lg"  
                                required  
                            />  
                        </div>  
                        <div>  
                            <label className="block text-sm font-medium text-gray-700">Harga per Kg</label>  
                            <input  
                                type="number"  
                                name="harga_per_kg"  
                                value={formData.harga_per_kg}  
                                onChange={handleChange}  
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-lg"  
                                required  
                            />  
                        </div>  
                        <div>  
                            <label className="block text-sm font-medium text-gray-700">Deskripsi</label>  
                            <textarea  
                                name="deskripsi"  
                                value={formData.deskripsi}  
                                onChange={handleChange}  
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-lg"  
                                required  
                            ></textarea>  
                        </div>  
                        <div className="flex justify-between mt-6">  
                            <button  
                                type="button"  
                                onClick={() => navigate('/dashboard')}  
                                className="bg-green-500 px-4 py-2 text-sm text-white rounded hover:bg-green-600"  
                            >  
                                Cancel  
                            </button>  
                            <button  
                                type="submit"  
                                className="bg-blue-500 px-4 py-2 rounded-md text-sm font-medium text-white hover:bg-blue-600"  
                            >  
                                Submit  
                            </button>  
                        </div>  
                    </form>  
                </div>  
            </main>
        </div>  
    );  
};  
  
export default TambahLayanan;  
