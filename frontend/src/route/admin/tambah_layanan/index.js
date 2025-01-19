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
        // Jika pengguna tidak login, redirect ke halaman login  
        navigate('/login');  
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
  
    return (  
        <div className="min-h-screen flex flex-col bg-gray-50">  
            {/* Header */}  
            <header className="bg-blue-500 text-white py-4 px-6 flex justify-between items-center">  
                <h1 className="text-xl font-bold">Tambah Layanan</h1>  
            </header>  
  
            {/* Main Content */}  
            <main className="flex-grow container mx-auto py-10 px-6">  
                {/* Form Section */}  
                <div className="bg-white shadow rounded-lg p-6 max-w-lg mx-auto">  
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
  
            {/* Footer */}  
            <footer className="bg-blue-500 text-white py-4 text-center text-sm">  
                © 2025 Laundry POS. All Rights Reserved.  
            </footer>  
        </div>  
    );  
};  
  
export default TambahLayanan;  
