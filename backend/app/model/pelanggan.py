from app import db  
  
class Pelanggan(db.Model):  
    __tablename__ = 'pelanggan'  # Menentukan nama tabel jika berbeda dari nama kelas  
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)    
    nama = db.Column(db.String(100), nullable=False)  # Nama pelanggan  
    nomor_telepon = db.Column(db.String(15), nullable=False)  # Nomor telepon  
    alamat = db.Column(db.String(255))  # Alamat pelanggan  
    created_at = db.Column(db.DateTime, server_default=db.func.current_timestamp())  # Tanggal dibuat  
  
    def __repr__(self):  
        return '<Pelanggan {}>'.format(self.nama)  # Memperbaiki referensi ke nama  
