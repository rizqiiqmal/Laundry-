import unittest    
from unittest.mock import patch, MagicMock    
from werkzeug.security import generate_password_hash    
from flask import jsonify    
from app import db, response, app    
from app.model.user import User    
from app.model.pelanggan import Pelanggan    
from app.model.transaksi import Transaksi    
from app.model.layanan import Layanan    
from app.controller import (login_admin, add_pelanggan_dan_layanan,     
                             index_layanan, add_layanan, edit_layanan,   
                             delete_layanan, detail_transaksi, index_transaksi,   
                             register_admin)    
  
class TestAdminFunctions(unittest.TestCase):    
  
    @patch('app.controller.admin.request.form')    
    @patch('app.controller.admin.User.query.filter_by')    
    @patch('app.controller.admin.session')    
    def test_successful_login(self, mock_session, mock_filter_by, mock_form):    
        # Arrange    
        mock_form.get.side_effect = ['testuser', 'testpassword']    
        mock_user = User(id=1, name='testuser', password=generate_password_hash('testpassword'), role='admin')    
        mock_filter_by.return_value.first.return_value = mock_user    
  
        # Act    
        result = login_admin()    
  
        # Assert    
        mock_session._setitem_.assert_called_with('user_id', 1)    
        self.assertEqual(result, response.success({    
            'id': 1,    
            'name': 'testuser',    
            'role': 'admin'    
        }, 'Login berhasil'))    
  
    @patch('app.controller.admin.request.form')    
    def test_login_missing_username(self, mock_form):    
        # Arrange    
        mock_form.get.side_effect = [None, 'testpassword']    
  
        # Act    
        result = login_admin()    
  
        # Assert    
        self.assertEqual(result, response.badRequest([], 'Username dan password harus diisi'))    
  
    @patch('app.controller.admin.request.form')    
    def test_login_missing_password(self, mock_form):    
        # Arrange    
        mock_form.get.side_effect = ['testuser', None]    
  
        # Act    
        result = login_admin()    
  
        # Assert    
        self.assertEqual(result, response.badRequest([], 'Username dan password harus diisi'))    
  
    @patch('app.controller.admin.request.form')    
    @patch('app.controller.admin.User.query.filter_by')    
    def test_login_invalid_username(self, mock_filter_by, mock_form):    
        # Arrange    
        mock_form.get.side_effect = ['invaliduser', 'testpassword']    
        mock_filter_by.return_value.first.return_value = None    
  
        # Act    
        result = login_admin()    
  
        # Assert    
        self.assertEqual(result, response.badRequest([], 'Username atau password salah'))    
  
    @patch('app.controller.admin.request.form')    
    @patch('app.controller.admin.User.query.filter_by')    
    def test_login_incorrect_password(self, mock_filter_by, mock_form):    
        # Arrange    
        mock_form.get.side_effect = ['testuser', 'wrongpassword']    
        mock_user = User(id=1, name='testuser', password=generate_password_hash('testpassword'), role='admin')    
        mock_filter_by.return_value.first.return_value = mock_user    
  
        # Act    
        result = login_admin()    
  
        # Assert    
        self.assertEqual(result, response.badRequest([], 'Username atau password salah'))    
  
    @patch('app.controller.admin.request.form')    
    @patch('app.controller.admin.User.query.filter_by')    
    @patch('app.controller.admin.session')    
    def test_login_exception_handling(self, mock_session, mock_filter_by, mock_form):    
        # Arrange    
        mock_form.get.side_effect = ['testuser', 'testpassword']    
        mock_filter_by.side_effect = Exception('Database error')    
  
        # Act    
        result = login_admin()    
  
        # Assert    
        self.assertEqual(result, response.badRequest([], 'Terjadi kesalahan saat login'))    
  
    @patch('flask.request')    
    def test_add_pelanggan_dan_layanan_success(self, mock_request):    
        with patch('app.controller.admin.db.session') as mock_session:    
            with patch('app.controller.admin.Layanan.query.get') as mock_get:    
                # Arrange    
                mock_request.json = {    
                    'nama': 'John Doe',    
                    'nomor_telepon': '1234567890',    
                    'alamat': 'Jl. Contoh No. 123',    
                    'id_layanan': 1,    
                    'berat': '5.0'    
                }    
                layanan = Layanan(id=1, nama_layanan='Pembersihan Rumah', harga_per_kg=15000.00)    
                mock_get.return_value = layanan    
                mock_session.add = MagicMock()    
                mock_session.commit = MagicMock()    
  
                # Act    
                result = add_pelanggan_dan_layanan()    
  
                # Assert    
                self.assertEqual(result.status_code, 200)    
                self.assertEqual(result.json['message'], 'Data pelanggan dan transaksi berhasil disimpan')    
                self.assertEqual(result.json['data']['total_harga'], 75000.0)    
  
    @patch('flask.request')    
    def test_add_pelanggan_dan_layanan_missing_fields(self, mock_request):    
        with patch('app.controller.admin.db.session') as mock_session:    
            with patch('app.controller.admin.Layanan.query.get') as mock_get:    
                # Arrange    
                mock_request.json = {    
                    'nama': 'John Doe',    
                    'nomor_telepon': '1234567890',    
                    'alamat': 'Jl. Contoh No. 123',    
                    'id_layanan': 1,    
                    'berat': None    
                }    
  
                # Act    
                result = add_pelanggan_dan_layanan()    
  
                # Assert    
                self.assertEqual(result.status_code, 400)    
                self.assertEqual(result.json['message'], 'Semua field harus diisi')    
  
    @patch('flask.request')    
    def test_add_pelanggan_dan_layanan_invalid_berat(self, mock_request):    
        with patch('app.controller.admin.db.session') as mock_session:    
            with patch('app.controller.admin.Layanan.query.get') as mock_get:    
                # Arrange    
                mock_request.json = {    
                    'nama': 'John Doe',    
                    'nomor_telepon': '1234567890',    
                    'alamat': 'Jl. Contoh No. 123',    
                    'id_layanan': 1,    
                    'berat': 'abc'    
                }    
  
                # Act    
                result = add_pelanggan_dan_layanan()    
  
                # Assert    
                self.assertEqual(result.status_code, 400)    
                self.assertEqual(result.json['message'], 'Berat harus berupa angka')    
  
    @patch('flask.request')    
    def test_add_pelanggan_dan_layanan_layanan_not_found(self, mock_request):    
        with patch('app.controller.admin.db.session') as mock_session:    
            with patch('app.controller.admin.Layanan.query.get') as mock_get:    
                # Arrange    
                mock_request.json = {    
                    'nama': 'John Doe',    
                    'nomor_telepon': '1234567890',    
                    'alamat': 'Jl. Contoh No. 123',    
                    'id_layanan': 999,    
                    'berat': '5.0'    
                }    
                mock_get.return_value = None    
  
                # Act    
                result = add_pelanggan_dan_layanan()    
  
                # Assert    
                self.assertEqual(result.status_code, 400)    
                self.assertEqual(result.json['message'], 'Layanan tidak ditemukan')    
  
    @patch('flask.request')    
    def test_add_pelanggan_dan_layanan_exception(self, mock_request):    
        with patch('app.controller.admin.db.session') as mock_session:    
            with patch('app.controller.admin.Layanan.query.get') as mock_get:    
                # Arrange    
                mock_request.json = {    
                    'nama': 'John Doe',    
                    'nomor_telepon': '1234567890',    
                    'alamat': 'Jl. Contoh No. 123',    
                    'id_layanan': 1,    
                    'berat': '5.0'    
                }    
                layanan = Layanan(id=1, nama_layanan='Pembersihan Rumah', harga_per_kg=15000.00)    
                mock_get.return_value = layanan    
                mock_session.add = MagicMock()    
                mock_session.commit.side_effect = Exception('Database error')    
  
                # Act    
                result = add_pelanggan_dan_layanan()    
  
                # Assert    
                self.assertEqual(result.status_code, 400)    
                self.assertEqual(result.json['message'], 'Terjadi kesalahan saat menyimpan data pelanggan dan layanan')    
  
    @patch('flask.request')    
    def test_index_layanan_success(self, mock_request):    
        with patch('app.controller.admin.Layanan.query.all') as mock_all:    
            # Arrange    
            layanan1 = Layanan(id=1, nama_layanan='Pembersihan Rumah', harga_per_kg=15000.00, deskripsi='Layanan pembersihan rumah berkualitas tinggi')    
            layanan2 = Layanan(id=2, nama_layanan='Pencucian Mobil', harga_per_kg=20000.00, deskripsi='Layanan pencucian mobil berkualitas tinggi')    
            mock_all.return_value = [layanan1, layanan2]    
  
            # Act    
            result = index_layanan()    
  
            # Assert    
            self.assertEqual(result.status_code, 200)    
            self.assertEqual(result.json['message'], 'Data layanan berhasil diambil')    
            self.assertEqual(len(result.json['data']), 2)    
            self.assertEqual(result.json['data'][0]['nama_layanan'], 'Pembersihan Rumah')    
            self.assertEqual(result.json['data'][1]['nama_layanan'], 'Pencucian Mobil')    
  
    @patch('flask.request')    
    def test_index_layanan_no_layanan(self, mock_request):    
        with patch('app.controller.admin.Layanan.query.all') as mock_all:    
            # Arrange    
            mock_all.return_value = []    
  
            # Act    
            result = index_layanan()    
  
            # Assert    
            self.assertEqual(result.status_code, 200)    
            self.assertEqual(result.json['message'], 'Data layanan berhasil diambil')    
            self.assertEqual(len(result.json['data']), 0)    
  
    @patch('flask.request')    
    def test_add_layanan_success(self, mock_request):    
        with patch('app.controller.admin.db.session') as mock_session:    
            # Arrange    
            mock_request.get_json.return_value = {    
                'nama_layanan': 'Pembersihan Rumah',    
                'harga_per_kg': 15000.00,    
                'deskripsi': 'Layanan pembersihan rumah berkualitas tinggi'    
            }    
            mock_session.add = MagicMock()    
            mock_session.commit = MagicMock()    
  
            # Act    
            result = add_layanan()    
  
            # Assert    
            self.assertEqual(result.status_code, 200)    
            self.assertEqual(result.json['message'], 'Berhasil menambah data layanan')    
  
    @patch('flask.request')    
    def test_edit_layanan_success(self, mock_request):    
        with patch('app.controller.admin.Layanan.query.get') as mock_get:    
            with patch('app.controller.admin.db.session') as mock_session:    
                # Arrange    
                mock_request.json = {    
                    'nama_layanan': 'Pembersihan Rumah',    
                    'harga_per_kg': 16000.00,    
                    'deskripsi': 'Layanan pembersihan rumah premium'    
                }    
                layanan = Layanan(id=1, nama_layanan='Pembersihan Rumah', harga_per_kg=15000.00, deskripsi='Layanan pembersihan rumah berkualitas tinggi')    
                mock_get.return_value = layanan    
                mock_session.commit = MagicMock()    
  
                # Act    
                result = edit_layanan(1)    
  
                # Assert    
                self.assertEqual(result.status_code, 200)    
                self.assertEqual(result.json['message'], 'Berhasil mengedit data layanan')    
                self.assertEqual(layanan.harga_per_kg, 16000.00)    
  
    @patch('flask.request')    
    def test_delete_layanan_success(self, mock_request):    
        with patch('app.controller.admin.Layanan.query.get') as mock_get:    
            with patch('app.controller.admin.db.session') as mock_session:    
                # Arrange    
                layanan = Layanan(id=1, nama_layanan='Pembersihan Rumah', harga_per_kg=15000.00, deskripsi='Layanan pembersihan rumah berkualitas tinggi')    
                mock_get.return_value = layanan    
                mock_session.delete = MagicMock()    
                mock_session.commit = MagicMock()    
  
                # Act    
                result = delete_layanan(1)    
  
                # Assert    
                self.assertEqual(result.status_code, 200)    
                self.assertEqual(result.json['message'], 'Berhasil menghapus layanan')    
  
    @patch('app.controller.admin.Transaksi.query.get')    
    @patch('app.controller.admin.Pelanggan.query.get')    
    @patch('app.controller.admin.Layanan.query.get')    
    def test_detail_transaksi_success(self, mock_layanan_get, mock_pelanggan_get, mock_transaksi_get):    
        # Arrange    
        transaksi = Transaksi(id=1, id_pelanggan=1, id_layanan=1, berat=5.0, total_harga=75000.0, status='completed')    
        mock_transaksi_get.return_value = transaksi    
        pelanggan = Pelanggan(id=1, nama='John Doe', nomor_telepon='1234567890', alamat='Jl. Contoh No. 123')    
        mock_pelanggan_get.return_value = pelanggan    
        layanan = Layanan(id=1, nama_layanan='Pembersihan Rumah', harga_per_kg=15000.0, deskripsi='Layanan pembersihan rumah berkualitas tinggi')    
        mock_layanan_get.return_value = layanan    
  
        # Act    
        result = detail_transaksi(1)    
  
        # Assert    
        self.assertEqual(result.status_code, 200)    
        self.assertEqual(result.json['message'], 'Detail transaksi berhasil diambil')    
        self.assertEqual(result.json['transaksi']['id'], 1)    
        self.assertEqual(result.json['pelanggan']['nama'], 'John Doe')    
        self.assertEqual(result.json['layanan']['nama_layanan'], 'Pembersihan Rumah')    
  
    @patch('app.controller.admin.Transaksi.query.get')    
    def test_detail_transaksi_not_found(self, mock_transaksi_get):    
        # Arrange    
        mock_transaksi_get.return_value = None    
  
        # Act    
        result = detail_transaksi(999)    
  
        # Assert    
        self.assertEqual(result.status_code, 400)    
        self.assertEqual(result.json['message'], 'Transaksi tidak ditemukan')    
  
    @patch('app.controller.admin.Transaksi.query.get')    
    @patch('app.controller.admin.Pelanggan.query.get')    
    def test_detail_transaksi_pelanggan_not_found(self, mock_pelanggan_get, mock_transaksi_get):    
        # Arrange    
        transaksi = Transaksi(id=1, id_pelanggan=999, id_layanan=1, berat=5.0, total_harga=75000.0, status='completed')    
        mock_transaksi_get.return_value = transaksi    
        mock_pelanggan_get.return_value = None    
  
        # Act    
        result = detail_transaksi(1)    
  
        # Assert    
        self.assertEqual(result.status_code, 400)    
        self.assertEqual(result.json['message'], 'Pelanggan tidak ditemukan')    
  
    @patch('app.controller.admin.Transaksi.query.get')    
    @patch('app.controller.admin.Layanan.query.get')    
    def test_detail_transaksi_layanan_not_found(self, mock_layanan_get, mock_transaksi_get):    
        # Arrange    
        transaksi = Transaksi(id=1, id_pelanggan=1, id_layanan=999, berat=5.0, total_harga=75000.0, status='completed')    
        mock_transaksi_get.return_value = transaksi    
        mock_layanan_get.return_value = None    
  
        # Act    
        result = detail_transaksi(1)    
  
        # Assert    
        self.assertEqual(result.status_code, 400)    
        self.assertEqual(result.json['message'], 'Layanan tidak ditemukan')    
  
    @patch('app.controller.admin.Transaksi.query.all')    
    def test_index_transaksi_success(self, mock_all):    
        # Arrange    
        transaksi1 = Transaksi(id=1, id_pelanggan=1, id_layanan=1, berat=5.0, total_harga=75000.0, status='completed')    
        transaksi2 = Transaksi(id=2, id_pelanggan=2, id_layanan=2, berat=3.0, total_harga=60000.0, status='pending')    
        mock_all.return_value = [transaksi1, transaksi2]    
  
        # Act    
        result = index_transaksi()    
  
        # Assert    
        self.assertEqual(result.status_code, 200)    
        self.assertEqual(result.json['message'], 'Data transaksi berhasil diambil')    
        self.assertEqual(len(result.json['data']), 2)    
  
if _name_ == '_main_':    
    unittest.main()