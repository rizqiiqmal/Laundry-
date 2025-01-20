from app import db      
from app.model.transaksi import Transaksi      
from app.model.pelanggan import Pelanggan      
from app.model.layanan import Layanan      
from app import response      
from flask import request    
import http.client    
import json    
    
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
        data = request.get_json()          
        status_baru = data.get('status')          
        if status_baru not in ['Pending', 'Selesai']:          
            return response.badRequest([], 'Status tidak valid')          
      
        transaksi.status = status_baru          
        db.session.commit()          
      
        # Kirim pesan WhatsApp      
        send_whatsapp_message(transaksi.id_pelanggan)  # Ganti dengan ID pelanggan yang sesuai      
      
        return response.success('', 'Status transaksi berhasil diubah')          
    except Exception as e:          
        print(e)          
        return response.badRequest([], 'Terjadi kesalahan saat mengubah status transaksi')          
      
def send_whatsapp_message(id_pelanggan):      
    pelanggan = Pelanggan.query.get(id_pelanggan)      
    if pelanggan:      
        nomor_telepon = pelanggan.nomor_telepon      
        conn = http.client.HTTPSConnection("dash.pushwa.com")      
            
        payload = {      
            "token": "kZFLBmqsAMH1fiU8DWP3gdaOXuzn9wh57oyvVpxR",  # Ganti dengan token yang valid      
            "target": nomor_telepon,      
            "type": "text",      
            "delay": "1",      
            "message": "Pesanan telah selesai di proses! anda bisa mengambilnya mulai dari sekarang Terimaksih Telah Menggunakan jasa Laundry pos",      
            "url": "https://www.shutterstock.com/image-photo/red-apple-isolated-on-white-600w-1727544364.jpg"      
        }      
            
        headers = {      
            "Content-Type": "application/json"      
        }      
      
        try:      
            conn.request("POST", "/api/kirimPesan", json.dumps(payload), headers)      
            response = conn.getresponse()      
            data = response.read()      
            print('WhatsApp message response:', data.decode("utf-8"))      
        except Exception as e:      
            print('Error sending WhatsApp message:', e)      
        finally:      
            conn.close()    
    
# Fungsi untuk format transaksi      
def format_transaksi(datas):      
    array = []      
    for i in datas:      
        pelanggan = Pelanggan.query.get(i.id_pelanggan)      
        layanan = Layanan.query.get(i.id_layanan)      
        array.append({            
            'id': i.id,            
            'nama_pelanggan': pelanggan.nama if pelanggan else 'Tidak Ditemukan',        
            'nomor_telepon': pelanggan.nomor_telepon if pelanggan else 'Tidak Ditemukan',        
            'nama_layanan': layanan.nama_layanan if layanan else 'Tidak Ditemukan',        
            'berat': i.berat,            
            'total_harga': i.total_harga,            
            'status': i.status,            
            'created_at': i.created_at,            
            'updated_at': i.updated_at            
        })            
    return array      
