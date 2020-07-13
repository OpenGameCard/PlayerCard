from flask import Blueprint, request, jsonify, abort
from sqlalchemy import func

from application.models.agreements import Agreements
from application.models.agreementsSchema import AgreementsSchema

from application.shared.models import db_session

mod = Blueprint(
    'agreements',
    __name__,
    url_prefix='/api/v1/agreements'
)

agreement_schema = AgreementsSchema()
agreements_schema = AgreementsSchema(many=True)


@mod.route('/', methods=['GET'])
def get_all():
    return jsonify(agreements_schema.dump(Agreements.query.all()))


@mod.route('/<uuid:id>', methods=['GET'])
def get(id):
    return jsonify(agreement_schema.dump(Agreements.query.get(id)))


@mod.route('/', methods=['POST'])
def post():
    if not request.json or not 'title' in request.json:
        abort(400)
    title = request.json['title']
    agreement = Agreements(title)
    agreement.description = request.json['description']
    agreement.body = request.json['body']
    agreement.valid_from = request.json['valid_from']
    agreement.valid_to = request.json['valid_to']

    db_session.add(agreement)
    db_session.commit()
    return agreement_schema.dump(agreement)


@mod.route('/<uuid:id>', methods=['PUT'])
def update(id):
    agreement = Agreements.query.get(id)
    agreement.title = request.json.get('title', agreement.title)
    agreement.description = request.json.get('description', agreement.description)
    agreement.body = request.json.get('body', agreement.body)
    agreement.valid_from = request.json.get('valid_from', agreement.valid_from)
    agreement.valid_to = request.json.get('valid_to', agreement.valid_to)
    agreement.is_active = request.json.get('is_active', agreement.is_active)
    agreement.updated_on = func.now()

    db_session.commit()
    return jsonify(agreement_schema.dump(Agreements.query.get(id)))
