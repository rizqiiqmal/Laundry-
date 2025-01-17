from app import db  
  
class Layanan(db.Model):  
    __tablename__ = 'layanan'  # Menentukan nama tabel jika berbeda dari nama kelas  
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)    
    nama_layanan = db.Column(db.String(100), nullable=False)  # Nama layanan  
    harga_per_kg = db.Column(db.Numeric(10, 2), nullable=False)  # Harga per kg, tipe data decimal  
    deskripsi = db.Column(db.Text)  # Deskripsi layanan  
    created_at = db.Column(db.DateTime, server_default=db.func.current_timestamp())  # Tanggal dibuat  
  
    def __repr__(self):  
        return '<Layanan {}>'.format(self.nama_layanan)  # Memperbaiki referensi ke nama_layanan  
