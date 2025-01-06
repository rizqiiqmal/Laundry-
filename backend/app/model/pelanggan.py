from app import db  
  
class Pelanggan(db.Model):  
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)  
    nama = db.Column(db.String(100), nullable=False)  
    nomor_telepon = db.Column(db.String(15), nullable=False)  
    alamat = db.Column(db.String(255))  
    created_at = db.Column(db.DateTime, server_default=db.func.current_timestamp()) 

    def __repr__(self):
        return '<Pelanggan {}>'.format(self.name)