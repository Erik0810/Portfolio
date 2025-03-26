from flask import render_template, request, flash, redirect, url_for, send_from_directory
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

@app.route('/static/images/tech_icons/<path:filename>')
def serve_tech_icons(filename):
    try:
        print(f'Serving tech icon: {filename}')  # Debug log
        if not filename.endswith('.svg'):
            return f'Invalid file type. Expected .svg, got: {filename}', 400
        response = send_from_directory('static/images/tech_icons', filename)
        response.headers['Cache-Control'] = 'public, max-age=3600, must-revalidate'
        print(f'Successfully served: {filename}')  # Debug log
        return response
    except Exception as e:
        print(f'Error serving {filename}: {str(e)}')  # Debug log
        return str(e), 500

@app.route('/static/images/<path:filename>')
def serve_static(filename):
    if 'tech_icons' not in filename:  # Skip tech_icons as they're handled above
        response = send_from_directory('static/images', filename)
        if filename.endswith('.svg'):
            response.headers['Cache-Control'] = 'public, max-age=3600, must-revalidate'
            response.headers['Expires'] = 'Thu, 01 Dec 2023 16:00:00 GMT'
        return response
    if filename.endswith('.svg'):
        response.headers['Cache-Control'] = 'public, max-age=3600, must-revalidate'
        response.headers['Expires'] = 'Thu, 01 Dec 2023 16:00:00 GMT'
    return response


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