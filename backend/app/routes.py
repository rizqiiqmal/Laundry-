from app import app
from flask import Flask, request, jsonify   
from app.controller.DashboardController import add_pelanggan_dan_layanan, index_layanan    
from app.controller.LayananController import index_layanan, add_layanan, edit_layanan, delete_layanan    
from app.controller.TransaksiController import index_transaksi, update_status_transaksi, send_whatsapp_message    
from app.controller.DetailController import detail_transaksi  
from app.controller.AuthController import login_admin    
from app.controller.UserController import register_admin    
from app.middleware.auth import login_required    
    
@app.route('/login', methods=['POST'])    
def login():    
    return login_admin()    
    
@app.route('/admin/dashboard', methods=['GET'])    
@login_required    
def dashboard():    
    return "Welcome to the admin dashboard!"  # Ganti dengan logika dashboard Anda   
   
# Route untuk registrasi admin    
@app.route('/register_admin', methods=['POST'])    
def register_new_admin():    
    return register_admin()     
  
# Route untuk menampilkan detail transaksi    
@app.route('/transaksi/<int:id>', methods=['GET'])    
def detail_transaksi_route(id):    
    return detail_transaksi(id)  
  
# Route untuk menampilkan semua transaksi    
@app.route('/transaksi', methods=['GET'])    
def index_transaksi_route():    
    return index_transaksi()    
    
# Route untuk mengubah status transaksi    
@app.route('/transaksi/<int:id>', methods=['PUT'])    
def update_status_transaksi_route(id):    
    return update_status_transaksi(id)  
  
# Route untuk menampilkan semua layanan    
@app.route('/layanan', methods=['GET'])    
def index_layanan_route():    
    return index_layanan()    
    
# Route untuk menambahkan layanan    
@app.route('/layanan', methods=['POST'])    
def add_layanan_route():    
    return add_layanan()    
    
# Route untuk mengedit layanan    
@app.route('/layanan/<int:id>', methods=['PUT'])    
def edit_layanan_route(id):    
    return edit_layanan(id)    
    
# Route untuk menghapus layanan    
@app.route('/layanan/<int:id>', methods=['DELETE'])    
def delete_layanan_route(id):    
    return delete_layanan(id)  
  
# Route untuk menambahkan pelanggan dan layanan    
@app.route('/add_pelanggan_dan_layanan', methods=['POST'])    
def add_pelanggan_dan_layanan_route():    
    return add_pelanggan_dan_layanan()  

# Route untuk mengirim pesan WhatsApp
@app.route('/send-whatsapp', methods=['POST'])
def send_whatsapp_route():
    data = request.get_json()
    
    if not data or 'id_pelanggan' not in data:
        return jsonify({'error': 'Invalid request. Please provide a valid JSON with id_pelanggan.'}), 400
    
    id_pelanggan = data['id_pelanggan']
    
    try:
        send_whatsapp_message(id_pelanggan)
        return jsonify({'message': 'WhatsApp message sent successfully.'}), 200
    except Exception as e:
        return jsonify({'error': f'Failed to send WhatsApp message: {str(e)}'}), 500