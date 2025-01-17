from app import db, response  
from app.model.user import User  
from flask import request  
from werkzeug.security import check_password_hash  
  
# Fungsi untuk login admin  
def login_admin():  
    try:  
        # Ambil data dari request  
        username = request.form.get('username')  
        password = request.form.get('password')  
  
        # Validasi input  
        if not username or not password:  
            return response.badRequest([], 'Username dan password harus diisi')  
  
        # Cek apakah pengguna ada  
        user = User.query.filter_by(name=username).first()  
        if not user:  
            return response.badRequest([], 'Username atau password salah')  
  
        # Verifikasi password  
        if not check_password_hash(user.password, password):  
            return response.badRequest([], 'Username atau password salah')  
  
        # Jika login berhasil, kembalikan data pengguna  
        return response.success({  
            'id': user.id,  
            'name': user.name,  
            'role': user.role  
        }, 'Login berhasil')  
  
    except Exception as e:  
        print(e)  
        return response.badRequest([], 'Terjadi kesalahan saat login')  
