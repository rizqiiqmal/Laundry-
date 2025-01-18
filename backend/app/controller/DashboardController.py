from app.model.pelanggan import Pelanggan    
from app.model.transaksi import Transaksi
from app.model.layanan import Layanan    
from app import response, app, db    
from flask import request    
  
# Fungsi untuk menambahkan pelanggan dan layanan  
def add_pelanggan_dan_layanan():        
    try:        
        # Input data pelanggan      
        nama = request.json.get('nama')  # Ubah ke request.json  
        nomor_telepon = request.json.get('nomor_telepon')  # Ubah ke request.json  
        alamat = request.json.get('alamat')  # Ubah ke request.json  
      
        # Input data layanan      
        id_layanan = request.json.get('id_layanan')  # Ubah ke request.json  
        berat = request.json.get('berat')  # Ambil berat sebagai string  
  
        # Validasi input    
        if not nama or not nomor_telepon or not alamat or not id_layanan or berat is None:    
            return response.badRequest([], 'Semua field harus diisi')    
    
        # Cek apakah berat dapat dikonversi menjadi float  
        try:  
            berat = float(berat)  
        except ValueError:  
            return response.badRequest([], 'Berat harus berupa angka')  
  
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