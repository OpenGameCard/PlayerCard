from __future__ import absolute_import, print_function

from flask import (Flask, g)
from flask_jwt_extended import JWTManager, jwt_required, get_raw_jwt
from flask_uuid import FlaskUUID

from flask import jsonify

from flask_cors import CORS

import numpy as np

from flask_marshmallow.fields import Hyperlinks, URLFor
from marshmallow import fields, Schema
from pykafka import KafkaClient
from sqlalchemy import create_engine, Column, Integer, String, DateTime, \
    ForeignKey, func, Boolean, JSON
from sqlalchemy.orm import scoped_session, sessionmaker, relationship, backref
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.dialects.postgresql import UUID

from application.models.usersSchema import UsersSchema
from application.models.userEvents import UserEvents

from application.models.users import Users

from application.modules.api.agreements.views import agreements
from application.modules.api.auth.views import auth

from application.shared.models import db_session


def create_app():
    app = Flask(__name__, static_url_path='/static')

    app.config.from_object('application.config.Config')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.url_map.strict_slashes = False

    CORS(app)

    with app.app_context():
        jwt = JWTManager(app)
        blacklist = set()

        flask_uuid = FlaskUUID()
        flask_uuid.init_app(app)

        app.register_blueprint(auth.auth)
        app.register_blueprint(agreements.mod)

        @jwt.token_in_blacklist_loader
        def check_if_token_in_blacklist(decrypted_token):
            jti = decrypted_token['jti']
            return jti in blacklist

        @app.before_request
        def clear_trailing():
            from flask import redirect, request

            rp = request.path
            if rp != '/' and rp.endswith('/'):
                return redirect(rp[:-1])

        @app.teardown_request
        def remove_db_session(exception):
            db_session.remove()

        @app.route('/api/v1/user/logout', methods=['GET'])
        @jwt_required
        def logout():
            jti = get_raw_jwt()['jti']
            blacklist.add(jti)
            return jsonify({"msg": "Successfully logged out"}), 200

        @app.route('/test', methods=['GET', 'POST'])
        def test():
            return jsonify({"msg": "OK!"}), 200

    return app
