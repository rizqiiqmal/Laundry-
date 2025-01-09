from app import db  
from app.model.transaksi import Transaksi  
from app.model.pelanggan import Pelanggan  
from app.model.layanan import Layanan  
from app import response  
  
# Fungsi untuk menampilkan detail transaksi berdasarkan ID  
def detail_transaksi(id):  
    try:  
        transaksi = Transaksi.query.get(id)  
        if not transaksi:  
            return response.badRequest([], 'Transaksi tidak ditemukan')  
  
        # Ambil informasi pelanggan  
        pelanggan = Pelanggan.query.get(transaksi.id_pelanggan)  
        if not pelanggan:  
            return response.badRequest([], 'Pelanggan tidak ditemukan')  
  
        # Ambil informasi layanan  
        layanan = Layanan.query.get(transaksi.id_layanan)  
        if not layanan:  
            return response.badRequest([], 'Layanan tidak ditemukan')  
  
        # Format data detail  
        data = {  
            'transaksi': {  
                'id': transaksi.id,  
                'berat': transaksi.berat,  
                'total_harga': transaksi.total_harga,  
                'status': transaksi.status,  
                'created_at': transaksi.created_at,  
                'updated_at': transaksi.updated_at  
            },  
            'pelanggan': {  
                'id': pelanggan.id,  
                'nama': pelanggan.nama,  
                'nomor_telepon': pelanggan.nomor_telepon,  
                'alamat': pelanggan.alamat  
            },  
            'layanan': {  
                'id': layanan.id,  
                'nama_layanan': layanan.nama_layanan,  
                'harga_per_kg': float(layanan.harga_per_kg),  
                'deskripsi': layanan.deskripsi  
            }  
        }  
  
        return response.success(data, "Detail transaksi berhasil diambil")  
    except Exception as e:  
        print(e)  
        return response.badRequest([], 'Terjadi kesalahan saat mengambil detail transaksi')  
