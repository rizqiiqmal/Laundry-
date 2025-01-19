from flask import Flask  
from config import Config  
from flask_sqlalchemy import SQLAlchemy  
from flask_migrate import Migrate  
from flask_cors import CORS  
import os  # Import os untuk menghasilkan secret key  
  
app = Flask(__name__)  
CORS(app)  
app.config.from_object(Config)  
  
# Set secret key  
app.secret_key = os.urandom(24)  # Menghasilkan secret key acak  
  
db = SQLAlchemy(app)  
migrate = Migrate(app, db)  
  
from app.model import pelanggan, user, layanan, notifikasi, transaksi  
from app import routes  
