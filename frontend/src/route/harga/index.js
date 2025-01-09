import React from "react";
import { useNavigate } from "react-router-dom";

const Harga = () => {
    const navigate = useNavigate();
    function homeBtn(){
      navigate('/')
    }  
    function layananBtn(){
      navigate('/layanan')
    }
    function hargaBtn(){
      navigate('/harga') 
    }
    function tentangBtn(){
      navigate('/tentang')  
    }
  function hubungiBtn(){
    navigate('/hubungi')  
    }
  return (
    <div className="bg-gray-100 h-screen flex flex-col">
      {/* Header */}
      <header className="bg-blue-500 text-white py-4">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-lg font-bold">Laundry POS</h1>
          <nav>
            <ul className="flex space-x-6">
              <li><a href="#home" onClick={homeBtn}  className="hover:underline">Home</a></li>
              <li><a href="#services" onClick={layananBtn} className="hover:underline">Layanan Kami</a></li>
              <li><a href="#pricing" onClick={hargaBtn} className="hover:underline">Harga</a></li>
              <li><a href="#about" onClick={tentangBtn}  className="hover:underline">Tentang Kami</a></li>
            </ul>
          </nav>
          <button onClick={hubungiBtn} className="bg-green-500 px-4 py-2 rounded text-white hover:bg-green-600">
            Hubungi Kami 
          </button>
        </div>
      </header>

      {/* Daftar Harga */}
      <section className="flex-grow py-20 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">Daftar Harga</h2>
        <table className="table-auto w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-blue-100">
              <th className="py-2 px-4 text-left">Layanan</th>
              <th className="py-2 px-4 text-left">Harga per Kg</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-4">Cuci Kering</td>
              <td className="py-2 px-4">Rp 10,000</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="py-2 px-4">Cuci Kering Setrika</td>
              <td className="py-2 px-4">Rp 15,000</td>
            </tr>
            <tr>
              <td className="py-2 px-4">Setrika Saja</td>
              <td className="py-2 px-4">Rp 8,000</td>
            </tr>
            <tr>
              <td className="py-2 px-4">Laundry Sepatu</td>
              <td className="py-2 px-4">Rp 25,000</td>
            </tr>
            <tr>
              <td className="py-2 px-4">Laundry karpet</td>
              <td className="py-2 px-4">Rp 60,000</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-200 py-6">
        <div className="container mx-auto text-center">
          <p>&copy; 2025 Laundry POS. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Harga;
