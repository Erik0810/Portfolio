from flask import Flask, send_from_directory
from flask_mail import Mail
from flask_caching import Cache
import os

app = Flask(__name__)

# Cache all static pages for 5 minutes for smoother UX
cache = Cache(app, config={
    'CACHE_TYPE': 'SimpleCache',
    'CACHE_DEFAULT_TIMEOUT': 300  
})

# Security configuration
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY') or 'dev-key-not-secure'

# Mail configuration
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = os.environ.get('EMAIL_USER')
app.config['MAIL_PASSWORD'] = os.environ.get('EMAIL_PASS')
app.config['MAIL_DEFAULT_SENDER'] = os.environ.get('EMAIL_USER')

mail = Mail(app)

import routes