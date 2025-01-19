from app import db, response    
from app.model.user import User    
from flask import request, session    
from werkzeug.security import check_password_hash    
  
def login_admin():    
    try:    
        username = request.form.get('username')    
        password = request.form.get('password')    
  
        if not username or not password:    
            return response.badRequest([], 'Username dan password harus diisi')    
  
        user = User.query.filter_by(name=username).first()    
        if not user:    
            return response.badRequest([], 'Username atau password salah')    
  
        if not check_password_hash(user.password, password):    
            return response.badRequest([], 'Username atau password salah')    
  
        # Simpan user_id di session  
        session['user_id'] = user.id    
  
        return response.success({    
            'id': user.id,    
            'name': user.name,    
            'role': user.role    
        }, 'Login berhasil')    
  
    except Exception as e:    
        print(e)    
        return response.badRequest([], 'Terjadi kesalahan saat login')    
