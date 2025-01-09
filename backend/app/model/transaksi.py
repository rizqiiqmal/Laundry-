from app import db  
from app.model.pelanggan import Pelanggan  
from app.model.layanan import Layanan  
  
class Transaksi(db.Model):  
    __tablename__ = 'transaksi'  # Menentukan nama tabel jika berbeda dari nama kelas  
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)    
    id_pelanggan = db.Column(db.Integer, db.ForeignKey('pelanggan.id'), nullable=False)  # Menambahkan nullable=False jika diperlukan  
    id_layanan = db.Column(db.Integer, db.ForeignKey('layanan.id'), nullable=False)  # Menambahkan nullable=False jika diperlukan  
    berat = db.Column(db.Numeric(10, 2), nullable=False)  # Berat dalam format decimal  
    total_harga = db.Column(db.Numeric(10, 2), nullable=False)  # Total harga dalam format decimal  
    status = db.Column(db.Enum('Pending', 'Selesai'), default='Pending')  # Status transaksi  
    created_at = db.Column(db.DateTime, server_default=db.func.current_timestamp())  # Tanggal dibuat  
    updated_at = db.Column(db.DateTime, server_default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())  # Tanggal diperbarui  
  
    def __repr__(self):  
        return '<Transaksi {}>'.format(self.id)  # Memperbaiki referensi ke id  
