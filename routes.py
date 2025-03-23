from flask import render_template, request, flash, redirect, url_for
from __init__ import app, mail, cache
from flask_mail import Message

@app.route('/')
@cache.cached()
def home():
    return render_template('index.html')

@app.route('/about')
@cache.cached()
def cv():
    return render_template('about.html')

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        name = request.form.get('name')
        email = request.form.get('email')
        message = request.form.get('message')

        msg = Message(
            subject=f'New Contact Form Submission from {name}',
            recipients=[app.config['MAIL_DEFAULT_SENDER']],
            reply_to=email,
            body=f"""
            Name: {name}
            Email: {email}
            
            Message:
            {message}
            """
        )
        
        try:
            mail.send(msg)
            return render_template('contact.html', success=True)
        except Exception as e:
            print(e)  # For debugging
            return render_template('contact.html', error=True)

    return render_template('contact.html')

@app.route('/works')
@cache.cached()
def works():
    return render_template('works.html')