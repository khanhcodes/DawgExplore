import os

from flask import Flask
from flask_cors import CORS
from flask_restful import Api, Resource, abort, fields, marshal_with, reqparse
from flask_sqlalchemy import SQLAlchemy

from routes.event import event_bp
from routes.person import person_bp

app = Flask(__name__)
CORS(app, origins=[os.getenv("FRONTEND")])

# https://stackoverflow.com/questions/49355010/how-do-i-watch-python-source-code-files-and-restart-when-i-save

app.register_blueprint(person_bp, url_prefix='/person')
app.register_blueprint(event_bp, url_prefix='/event')

api = Api(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
db = SQLAlchemy(app)

class EventModel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(400))
    description = db.Column(db.String(2000))
    date = db.Column(db.String(50))
    location = db.Column(db.String(100))
    topic = db.Column(db.String(200))
    photo = db.Column(db.String(100))

    def __repr__(self):
        return f"Event(title = {self.title}, description = {self.description}, location = {self.location}, date = {self.date}, topic = {self.topic}, photo = {self.photo})"

db.create_all()

event_put_args = reqparse.RequestParser()
event_put_args.add_argument("Title", type=str, help="Title of the event.")
event_put_args.add_argument("Description", type=str, help="Description of the event.")
event_put_args.add_argument("Location", type=str, help="Description of the event.")
event_put_args.add_argument("Date", type=str, help="Description of the event.")
event_put_args.add_argument("Topic", type=str, help="Topic of the event.")
event_put_args.add_argument("Photo", type=str, help="Description of the event.")

resource_fields = {
    'id': fields.Integer,
    'title': fields.String,
    'description': fields.String,
    'location': fields.String,
    'date': fields.String,
    'topic': fields.String,
    'photo': fields.String
}

class Event(Resource):
    @marshal_with(resource_fields)
    def get(self, event_id):
        result = EventModel.query.filter_by(id=event_id).first()
        return result

    @marshal_with(resource_fields)
    def put(self, event_id):
        args = event_put_args.parse_args()
        result = EventModel.query.filter_by(id=event_id).first()
        if result:
            abort(409, message="Event id taken...")
        
        event = EventModel(id=event_id, title=args['Title'], description=args['Description'], location=args['Location'], date=args['Date'], topic=args['Topic'], photo=args['Photo'])
        db.session.add(event)
        db.session.commit()
        return event, 201

api.add_resource(Event, "/event/<int:event_id>")

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=4000)
