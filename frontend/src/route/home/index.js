import React from "react";
import { useNavigate } from 'react-router-dom';

const Home = () => {
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
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-blue-500 text-white py-4">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-lg font-bold">Laundry POS</h1>
          <nav>
            <ul className="flex space-x-6">
              <li><a href="#home" onClick={homeBtn}  className="hover:underline">Home</a></li>
              <li><a href="#layanan" onClick={layananBtn} className="hover:underline">Layanan Kami</a></li>
              <li><a href="#harga" onClick={hargaBtn} className="hover:underline">Harga</a></li>
              <li><a href="#tentang" onClick={tentangBtn}  className="hover:underline">Tentang Kami</a></li>
            </ul>
          </nav>
          <button onClick={hubungiBtn} className="bg-green-500 px-4 py-2 rounded text-white hover:bg-green-600">
            Hubungi Kami 
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-blue-100 flex-grow py-20">
        <div className="container mx-auto flex flex-col md:flex-row items-center px-4">
          <div className="text-center md:text-left md:w-1/2">
            <h2 className="text-3xl font-bold text-blue-600 mb-4">Laundry POS</h2>
            <p className="text-lg text-gray-700 mb-6">
              Kiloan Premium dan Standar. Cepat, Bersih, dan Terpercaya. 
              Pesan layanan laundry Anda kapan saja!
            </p>
            <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
            <a
                  href="https://wa.me/6281234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-white-500 hover:underline"
                >
                  Pesan Sekarang
                </a>
                
                 
            </button>
          </div>
          <div className="md:w-1/2 mt-10 md:mt-0">
            <img
              src="logo.png"
              alt="Laundry Illustration"
            />
          </div>
        </div>
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

export default Home;
