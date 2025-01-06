from app import db  
  
class Layanan(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)  
    nama_layanan = db.Column(db.String(100), nullable=False)  
    harga_per_kg = db.Column(db.Numeric(10, 2), nullable=False)  
    deskripsi = db.Column(db.Text)  
    created_at = db.Column(db.DateTime, server_default=db.func.current_timestamp())  

    def __repr__(self):
        return '<Layanan {}>'.format(self.name)