import React from "react";
import { Link } from "react-router-dom";

const TentangKami = () => {
  return (
    <div className="bg-gray-100 h-screen flex flex-col">
      {/* Navbar */}
      <header className="bg-blue-500 text-white py-4">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-lg font-bold">Laundry POS</h1>
          <nav>
            <ul className="flex space-x-6">
              <li><Link to="/" className="hover:underline">Back</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Tentang Kami Section */}
      <section className="flex-grow py-20" id="about">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-blue-600 mb-8 text-center">
            Tentang Kami
          </h2>
          <div className="flex flex-col md:flex-row items-center">
            {/* Gambar atau Ilustrasi */}
            <div className="md:w-1/2 mb-6 md:mb-0">
              <img
                src="https://via.placeholder.com/500x300"
                alt="Tentang Kami"
                className="rounded-lg shadow-lg"
              />
            </div>

            {/* Informasi dan Logo */}
            <div className="md:w-1/2 md:pl-8 flex flex-col items-start">
              <p className="text-lg text-gray-700 mb-4">
                Laundry POS adalah solusi terbaik untuk kebutuhan laundry Anda. Kami
                hadir untuk memberikan layanan terbaik dengan proses yang cepat,
                bersih, dan terpercaya. Dengan pengalaman bertahun-tahun di industri
                laundry, kami memahami pentingnya menjaga kualitas dan kepercayaan
                pelanggan.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                Kami menawarkan berbagai layanan, mulai dari cuci kering, setrika,
                hingga laundry sepatu dan karpet. Visi kami adalah menjadi penyedia
                layanan laundry terbaik dengan teknologi modern dan tenaga kerja
                profesional.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Jadi, percayakan pakaian Anda kepada kami, dan nikmati kemudahan
                serta hasil yang memuaskan!
              </p>

              {/* Logo */}
              <div className="mt-4">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Logo Laundry POS"
                  className="w-24 h-24 rounded-full shadow-md"
                />
              </div>
            </div>
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

export default TentangKami;