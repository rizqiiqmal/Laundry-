from app import db  
from app.model.transaksi import Transaksi  
  
class Notifikasi(db.Model):  
    __tablename__ = 'notifikasi'  # Menentukan nama tabel jika berbeda dari nama kelas  
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)    
    id_transaksi = db.Column(db.Integer, db.ForeignKey('transaksi.id'), nullable=False)  # Menambahkan nullable=False jika diperlukan  
    pesan = db.Column(db.Text, nullable=False)  # Pesan notifikasi  
    tanggal_kirim = db.Column(db.DateTime, server_default=db.func.current_timestamp())  # Tanggal kirim  
  
    def __repr__(self):  
        return '<Notifikasi {}>'.format(self.pesan)  # Memperbaiki referensi ke pesan  
