import unittest  
from unittest.mock import patch, MagicMock  
from flask import session, redirect, url_for  
from functools import wraps  
from app.model.user import User
  
# Define the login_required decorator for testing  
def login_required(f):  
    @wraps(f)  
    def decorated_function(*args, **kwargs):  
        if 'user_id' not in session:  
            return redirect(url_for('login'))  # Ganti dengan rute login Anda  
        return f(*args, **kwargs)  
    return decorated_function  
  
# Mock the decorated function  
def mock_decorated_function(*args, **kwargs):  
    return "Function executed successfully"  
  
# Apply the login_required decorator to the mock function  
decorated_mock_function = login_required(mock_decorated_function)  
  
class TestLoginRequiredDecorator(unittest.TestCase):  
  
    @patch('flask.session')  
    @patch('flask.redirect')  
    @patch('flask.url_for')  
    def test_user_logged_in(self, mock_url_for, mock_redirect, mock_session):  
        # Arrange  
        mock_session._contains_.return_value = True  
        mock_url_for.return_value = '/login'  
  
        # Act  
        result = decorated_mock_function()  
  
        # Assert  
        mock_redirect.assert_not_called()  
        self.assertEqual(result, "Function executed successfully")  
  
    @patch('flask.session')  
    @patch('flask.redirect')  
    @patch('flask.url_for')  
    def test_user_not_logged_in(self, mock_url_for, mock_redirect, mock_session):  
        # Arrange  
        mock_session._contains_.return_value = False  
        mock_url_for.return_value = '/login'  
        mock_redirect.return_value = "Redirected to login"  
  
        # Act  
        result = decorated_mock_function()  
  
        # Assert  
        mock_url_for.assert_called_with('login')  
        mock_redirect.assert_called_with('/login')  
        self.assertEqual(result, "Redirected to login")  
  
if _name_ == '_main_':  
    unittest.main()