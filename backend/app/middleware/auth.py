from functools import wraps  
from flask import session, redirect, url_for  
  
def login_required(f):  
    @wraps(f)  
    def decorated_function(*args, **kwargs):  
        if 'user_id' not in session:  
            return redirect(url_for('login'))  # Ganti dengan rute login Anda  
        return f(*args, **kwargs)  
    return decorated_function  
