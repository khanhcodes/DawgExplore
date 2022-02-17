from flask import Blueprint

person_bp = Blueprint('person', __name__)


@person_bp.route('/hello')
def hello():
    return "Person saying besttt"
