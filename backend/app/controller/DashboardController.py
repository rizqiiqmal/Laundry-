from app.model.pelanggan import Pelanggan    
from app.model.transaksi import Transaksi, Layanan    
from app import response, app, db    
from flask import request    
  
# Fungsi untuk menambahkan pelanggan dan layanan  
def add_pelanggan_dan_layanan():      
    try:      
        # Input data pelanggan    
        nama = request.form.get('nama')      
        nomor_telepon = request.form.get('nomor_telepon')      
        alamat = request.form.get('alamat')      
    
        # Input data layanan    
        id_layanan = request.form.get('id_layanan')      
        berat = float(request.form.get('berat'))  # Pastikan ini hanya angka  
  
        # Validasi input  
        if not nama or not nomor_telepon or not alamat or not id_layanan or not berat:  
            return response.badRequest([], 'Semua field harus diisi')  
  
        # Cek apakah layanan ada    
        layanan = Layanan.query.get(id_layanan)      
        if not layanan:      
            return response.badRequest([], 'Layanan tidak ditemukan')      
  
        # Hitung total harga    
        total_harga = berat * float(layanan.harga_per_kg)  # Konversi harga ke float  
  
        # Simpan data pelanggan    
        pelanggan = Pelanggan(nama=nama, nomor_telepon=nomor_telepon, alamat=alamat)      
        db.session.add(pelanggan)      
        db.session.commit()      
  
        # Simpan transaksi    
        transaksi = Transaksi(id_pelanggan=pelanggan.id, id_layanan=id_layanan, berat=berat, total_harga=total_harga)      
        db.session.add(transaksi)      
        db.session.commit()      
  
        return response.success({'total_harga': total_harga}, 'Data pelanggan dan transaksi berhasil disimpan')      
    except Exception as e:      
        print(f"Error: {str(e)}")      
        return response.badRequest([], 'Terjadi kesalahan saat menyimpan data pelanggan dan layanan')      
    
# Fungsi untuk menampilkan semua layanan  
def index_layanan():    
    try:    
        layanan = Layanan.query.all()    
        data = format_layanan(layanan)    
        return response.success(data, "Data layanan berhasil diambil")    
    except Exception as e:    
        print(e)    
        return response.badRequest([], 'Terjadi kesalahan saat mengambil data layanan')    
  
# Fungsi untuk format layanan    
def format_layanan(datas):    
    array = []    
    for i in datas:    
        array.append(
            {    
            'id': i.id,    
            'nama': i.nama_layanan,    
            'harga_per_kg': float(i.harga_per_kg)   
            }
        )    
    return array    