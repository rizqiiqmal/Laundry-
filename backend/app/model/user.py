from app import db  
from datetime import datetime  
  
class User(db.Model):  
    __tablename__ = 'users'  # Menentukan nama tabel jika berbeda dari nama kelas  
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)    
    name = db.Column(db.String(50), unique=True, nullable=False)  # Nama pengguna  
    password = db.Column(db.String(255), nullable=False)  # Kata sandi  
    email = db.Column(db.String(100), index=True, unique=True, nullable=False)  # Email pengguna  
    nomor_telepon = db.Column(db.String(15), nullable=False)  # Nomor telepon  
    role = db.Column(db.Enum('admin', 'user'), default='user')  # Menambahkan role user  
    created_at = db.Column(db.DateTime, default=datetime.utcnow)  # Tanggal dibuat  
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)  # Tanggal diperbarui  
  
    def __repr__(self):  
        return '<User {}>'.format(self.name)  
