import os
from gettext import bind_textdomain_codeset

import requests as req
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

event_put_args = reqparse.RequestParser()
event_put_args.add_argument("Title", type=str, help="Title of the event.")
event_put_args.add_argument("Description", type=str, help="Description of the event.")
event_put_args.add_argument("Location", type=str, help="Location of the event.")
event_put_args.add_argument("Date", type=str, help="Date of the event.")
event_put_args.add_argument("Topic", type=str, help="Topic of the event.")
event_put_args.add_argument("Photo", type=str, help="Photo of the event.")

event_resource_fields = {
    'id': fields.Integer,
    'title': fields.String,
    'description': fields.String,
    'location': fields.String,
    'date': fields.String,
    'topic': fields.String,
    'photo': fields.String
}

class Event(Resource):
    @marshal_with(event_resource_fields)
    def get(self, event_id):
        result = EventModel.query.filter_by(id=event_id).first()
        return result

    @marshal_with(event_resource_fields)
    def post(self, event_id):
        args = event_put_args.parse_args()
        result = EventModel.query.filter_by(id=event_id).first()
        if result:
            abort(409, message="Event id taken...")
        
        event = EventModel(id=event_id, title=args['Title'], description=args['Description'], location=args['Location'], date=args['Date'], topic=args['Topic'], photo=args['Photo'])
        db.session.add(event)
        db.session.commit()
        return event, 201

    @marshal_with(event_resource_fields)
    def patch(self, event_id):
        args = event_put_args.parse_args()
        result = EventModel.query.filter_by(id=event_id).first()
        if not result:
            abort(404, message="Event doesn't exist, can't update.")

        if args['Title']:
            result.title = args['Title'] 
        if args['Description']:
            result.description = args['Description']
        if args['Location']:
            result.location = args['Location']
        if args['Date']:
            result.date = args['Date']
        if args['Topic']:
            result.topic = args['Topic']
        if args['Photo']:
            result.photo = args['Photo']

        db.session.add(result)
        db.session.commit()

        return result


class Events(Resource):
    def get(self):
        result = EventModel.query.all()

        output = []
        for event in result:
            event_data = {'id': event.id, 'title': event.title, 'description': event.description, 'location': event.location, 'date': event.date, 'topic': event.topic, 'photo': event.photo}
            output.append(event_data)

        return {"events": output}

class SearchEventsExclusive(Resource):
    def get(self, query_id):
        result = EventModel.query.all()

        q_ids = query_id.split('_')
        output = []
        for event in result:
            if all(str.lower(q_id) in str.lower(event.title) or str.lower(q_id) in str.lower(event.description) for q_id in q_ids):
                event_data = {'id': event.id, 'title': event.title, 'description': event.description, 'location': event.location, 'date': event.date, 'topic': event.topic, 'photo': event.photo}
                output.append(event_data)
                    

        return {"events": output}

class SearchEventsInclusive(Resource):
    def get(self, query_id):
        result = EventModel.query.all()

        q_ids = query_id.split('_')
        output = []
        for event in result:
            if any(str.lower(q_id) in str.lower(event.title) or str.lower(q_id) in str.lower(event.description) for q_id in q_ids):
                event_data = {'id': event.id, 'title': event.title, 'description': event.description, 'location': event.location, 'date': event.date, 'topic': event.topic, 'photo': event.photo}
                output.append(event_data)
                    

        return {"events": output}

class UserModel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False)

    def __repr__(self):
        return f"User(name = {self.name})"

user_put_args = reqparse.RequestParser()
user_put_args.add_argument("Name", type=str, help="Name of the user.")

user_resource_fields = {
    'id': fields.Integer,
    'name': fields.String
}

class User(Resource):
    @marshal_with(user_resource_fields)
    def get(self, user_id):
        result = UserModel.query.filter_by(id=user_id).first()
        return result

    @marshal_with(user_resource_fields)
    def post(self, user_id):
        args = user_put_args.parse_args()
        result = UserModel.query.filter_by(id=user_id).first()
        if result:
            abort(409, message="User id taken...")
            
        user = UserModel(id=user_id, name=args['Name'])
        db.session.add(user)
        db.session.commit()
        return user, 201

class Users(Resource):
    def get(self):
        result = UserModel.query.all()

        output = []
        for user in result:
            user_data = {'id': user.id, 'name': user.name}
            output.append(user_data)

        return {"users": output}

api.add_resource(Event, "/event/<int:event_id>")
api.add_resource(Events, "/events")
api.add_resource(SearchEventsExclusive, "/searchevents/exclusive/<string:query_id>")
api.add_resource(SearchEventsInclusive, "/searchevents/inclusive/<string:query_id>")
api.add_resource(User, "/user/<int:user_id>")
api.add_resource(Users, "/users")

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=4000)
