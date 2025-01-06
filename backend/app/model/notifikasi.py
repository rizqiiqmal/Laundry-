from app import db  
from app.model.transaksi import Transaksi

class Notifikasi(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)  
    id_transaksi = db.Column(db.Integer, db.ForeignKey('transaksi.id'))  
    pesan = db.Column(db.Text, nullable=False)  
    tanggal_kirim = db.Column(db.DateTime, server_default=db.func.current_timestamp())  

    def __repr__(self):
        return '<Notifikasi {}>'.format(self.name)
