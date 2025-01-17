from app import db, response  
from app.model.user import User  
from flask import request  
from werkzeug.security import generate_password_hash  
  
# Fungsi untuk registrasi admin  
def register_admin():  
    try:  
        name = request.form.get('name')  
        password = request.form.get('password')  
        email = request.form.get('email')  
        nomor_telepon = request.form.get('nomor_telepon')  
  
        # Validasi input  
        if not name or not password or not email or not nomor_telepon:  
            return response.badRequest([], 'Semua field harus diisi')  
  
        # Hash password  
        hashed_password = generate_password_hash(password)  
  
        # Buat pengguna baru dengan role admin  
        admin = User(name=name, password=hashed_password, email=email, nomor_telepon=nomor_telepon, role='admin')  
        db.session.add(admin)  
        db.session.commit()  
  
        return response.success('', 'Berhasil mendaftar sebagai admin')  
    except Exception as e:  
        print(e)  
        return response.badRequest([], 'Terjadi kesalahan saat mendaftar admin')  