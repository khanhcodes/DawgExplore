from flask import Blueprint

event_bp = Blueprint('event', __name__)


@event_bp.route('/browse')
def hello():
    return "Browsing events"
