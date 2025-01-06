from app import db
from datetime import datetime

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)  
    name = db.Column(db.String(50), unique=True, nullable=False)  
    password = db.Column(db.String(255), nullable=False)  
    email = db.Column(db.String(100),index=True, unique=True, nullable=False)  
    nomor_telepon = db.Column(db.String(15), nullable=False)  
    role = db.Column(db.Enum('admin'), default='admin')  
    created_at = db.Column(db.DateTime, default=datetime.utcnow)  
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return '<User {}>'.format(self.name)