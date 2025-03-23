from __init__ import app
import os

if __name__ == '__main__':
    #Heroku config
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=False)

    #Local config
    #app.run(debug=True)