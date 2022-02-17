import os

from flask import Flask
from flask_cors import CORS

from routes.event import event_bp
from routes.person import person_bp

app = Flask(__name__)
CORS(app, origins=[os.getenv("FRONTEND")])

# https://stackoverflow.com/questions/49355010/how-do-i-watch-python-source-code-files-and-restart-when-i-save

app.register_blueprint(person_bp, url_prefix='/person')
app.register_blueprint(event_bp, url_prefix='/event')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=4000)
