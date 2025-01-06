from app import db
from app.model.pelanggan import Pelanggan
from app.model.layanan import Layanan
  
class Transaksi(db.Model):  
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)  
    id_pelanggan = db.Column(db.Integer, db.ForeignKey('pelanggan.id'))  
    id_layanan = db.Column(db.Integer, db.ForeignKey('layanan.id'))  
    berat = db.Column(db.Numeric(10, 2), nullable=False)  
    total_harga = db.Column(db.Numeric(10, 2), nullable=False)  
    status = db.Column(db.Enum('Pending', 'Selesai'), default='Pending')  
    created_at = db.Column(db.DateTime, server_default=db.func.current_timestamp())  
    updated_at = db.Column(db.DateTime, server_default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())  

    def __repr__(self):
        return '<Transaksi {}>'.format(self.name)