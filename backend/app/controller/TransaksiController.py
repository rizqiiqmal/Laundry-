from app import db  
from app.model.transaksi import Transaksi
from app.model.pelanggan import Pelanggan
from app.model.layanan import Layanan  
from app import response  
from flask import request  
  
# Fungsi untuk menampilkan semua transaksi  
def index_transaksi():  
    try:  
        transaksi = Transaksi.query.all()  
        data = format_transaksi(transaksi)  
        return response.success(data, "Data transaksi berhasil diambil")  
    except Exception as e:  
        print(e)  
        return response.badRequest([], 'Terjadi kesalahan saat mengambil data transaksi')  
  
# Fungsi untuk mengubah status transaksi  
def update_status_transaksi(id):  
    try:  
        transaksi = Transaksi.query.get(id)  
        if not transaksi:  
            return response.badRequest([], 'Transaksi tidak ditemukan')  
  
        # Mengambil status baru dari permintaan  
        data = request.get_json()  # Pastikan Anda menggunakan get_json() untuk mengambil data JSON  
        status_baru = data.get('status')  
        if status_baru not in ['Pending', 'Selesai']:  
            return response.badRequest([], 'Status tidak valid')  
  
        transaksi.status = status_baru  
        db.session.commit()  
        return response.success('', 'Status transaksi berhasil diubah')  
    except Exception as e:  
        print(e)  
        return response.badRequest([], 'Terjadi kesalahan saat mengubah status transaksi')  

# Fungsi untuk format transaksi    
def format_transaksi(datas):      
    array = []      
    for i in datas:      
        # Ambil nama pelanggan dan nama layanan berdasarkan ID      
        pelanggan = Pelanggan.query.get(i.id_pelanggan)      
        layanan = Layanan.query.get(i.id_layanan)      
              
        array.append({      
            'id': i.id,      
            'nama_pelanggan': pelanggan.nama if pelanggan else 'Tidak Ditemukan',  # Ganti ID pelanggan dengan nama      
            'nomor_telepon': pelanggan.nomor_telepon if pelanggan else 'Tidak Ditemukan',  # Ambil nomor telepon      
            'nama_layanan': layanan.nama_layanan if layanan else 'Tidak Ditemukan',  # Ganti ID layanan dengan nama_layanan      
            'berat': i.berat,      
            'total_harga': i.total_harga,      
            'status': i.status,      
            'created_at': i.created_at,      
            'updated_at': i.updated_at      
        })      
    return array     
