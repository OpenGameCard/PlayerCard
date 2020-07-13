from flask import Blueprint
import smtplib
import datetime
import threading

from flask_jwt_extended import jwt_required

from flask import request, jsonify, url_for
from flask_jwt_extended import (get_jwt_identity, create_refresh_token, jwt_refresh_token_required, create_access_token)
from itsdangerous import TimedJSONWebSignatureSerializer
from passlib.hash import sha256_crypt

from application.exceptions.createdRelationExistException import CreatedRelationExistException
from application.exceptions.invalidTokenException import InvalidTokenException
from application.exceptions.missingParametersException import MissingParametersException
from application.exceptions.notAuthorizedLoggingException import NotAuthorizedLoggingException
from application.exceptions.notValidRequestException import NotValidRequestException
from application.exceptions.userExistException import UserExistException
from application.exceptions.userIsConfirmedException import UserIsConfirmedException
from application.exceptions.userIsNotConfirmedException import UserIsNotConfirmedException
from application.exceptions.userNotExistException import UserNotExistException

from application.shared.models import db_session
from application.models.usersSchema import UsersSchema

from application.models.userEvents import UserEvents
from application.models.userAgreements import UserAgreements
from application.models.agreements import Agreements
from application.models.userAgreementsSchema import UserAgreementsSchema

from application.models.users import Users

auth = Blueprint(
    'auth',
    __name__,
    url_prefix='/api/v1/user'
)


def email_from_confirm_token(token):
    serializer = TimedJSONWebSignatureSerializer('SECRET_KEY', expires_in=3600)
    try:
        email = serializer.loads(
            token,
            salt='SECURITY_PASSWORD_SALT'
        )
    except:
        return False
    return email


def send_async_email(to, confirm_url):
    sender = 'no-reply@example.com'
    message = "Verify: {}".format(confirm_url)
    server = smtplib.SMTP('mailhog:1025')
    server.login(sender, "sample")
    server.sendmail(sender, to, message)
    server.quit()


def send_email(to, confirm_url):
    thr = threading.Thread(target=send_async_email, args=[to, confirm_url])
    thr.start()
    return thr


def generate_confirmation_token(email):
    serializer = TimedJSONWebSignatureSerializer('SECRET_KEY')
    return serializer.dumps(email, salt='SECURITY_PASSWORD_SALT')


user_schema = UsersSchema()
user_agreements_schema = UserAgreementsSchema()


@auth.errorhandler(UserExistException)
def user_exist_exception(e):
    return jsonify({"message": e.message}), 400


@auth.errorhandler(MissingParametersException)
def missing_parameters_exception(e):
    return jsonify({"message": e.message}), 422


@auth.errorhandler(NotAuthorizedLoggingException)
def not_authorized_logging_exception(e):
    user = Users.query.filter_by(id=e.user.id).first()
    user_event = UserEvents(user, "not authorized logging", dict(request.headers))
    db_session.add(user_event)
    db_session.commit()

    return jsonify({"message": e.message}), 403


@auth.errorhandler(InvalidTokenException)
def not_valid_token_exception(e):
    return jsonify({"message": e.message}), 406


@auth.errorhandler(NotValidRequestException)
def not_valid_request_exception(e):
    return jsonify({"message": e.message}), 400


@auth.errorhandler(UserIsNotConfirmedException)
def user_is_not_confirmed_exception(e):
    user = Users.query.filter_by(id=e.user.id).first()
    user_event = UserEvents(user, "not confirmed logging", dict(request.headers))
    db_session.add(user_event)
    db_session.commit()

    return jsonify({"message": e.message}),


@auth.errorhandler(UserIsConfirmedException)
def user_is_confirmed_exception(e):
    user = Users.query.filter_by(id=e.user.id).first()
    user_event = UserEvents(user, "confirmed user try another confirmation", dict(request.headers))
    db_session.add(user_event)
    db_session.commit()

    return jsonify({"message": e.message}), 403


@auth.errorhandler(UserNotExistException)
def user_not_exist_exception(e):
    return jsonify({"message": e.message}), 406


@auth.errorhandler(CreatedRelationExistException)
def created_relation_exist_exception(e):
    return jsonify({"message": e.message}), 400


# https://flask-jwt-extended.readthedocs.io/en/stable/
# https://www.programcreek.com/python/example/101081/itsdangerous.URLSafeTimedSerializer


@auth.route('/login', methods=['POST'])
def login():
    if not request.is_json:
        raise NotValidRequestException("POST doesn't have JSON payload.")

    username = request.json.get('username', None)
    password = request.json.get('password', None)
    if not username or not password:
        raise MissingParametersException("Missing username or password")

    user = Users.query.filter_by(name=username).first()

    if not user:
        raise UserNotExistException("User do not exist.")

    if user and not user.confirmed:
        raise UserIsNotConfirmedException("User is not confirmed", user)

    if sha256_crypt.verify(password, user.password):

        user_event = UserEvents(user, "correctly logged", dict(request.headers))
        db_session.add(user_event)

        # https://flask-jwt-extended.readthedocs.io/en/stable/add_custom_data_claims/
        access_token = create_access_token(identity=username)
        refresh_token = create_refresh_token(identity=username)

        user_event = UserEvents(user, "generated tokens",
                                {"access_token": access_token, "refresh_token": refresh_token})
        db_session.add(user_event)
        db_session.commit()
        return jsonify(
            {
                'access_token': access_token,
                'refresh_token': refresh_token
            }
        ), 200
    else:
        raise NotAuthorizedLoggingException("User is not authorized or not exist.", user)


@auth.route('/refresh', methods=['POST'])
@jwt_refresh_token_required
def refresh():
    access_token = create_access_token(identity=get_jwt_identity())
    refresh_token = create_refresh_token(identity=get_jwt_identity())
    return jsonify(
        {
            'access_token': access_token,
            'refresh_token': refresh_token
        }
    ), 200


@auth.route('/register', methods=['POST'])
def register():
    if not request.is_json:
        raise NotValidRequestException("POST doesn't have JSON payload.")

    email = request.json.get('email', None)
    username = request.json.get('username', None)
    password = request.json.get('password', None)
    if not email:
        raise MissingParametersException("Missing email.")
    if not username:
        raise MissingParametersException("Missing username.")
    if not password:
        raise MissingParametersException("Missing password.")

    user = Users.query.filter_by(name=username).first()
    if user:
        raise UserExistException("User exist.")

    user = Users(email=email, name=username, password=password)

    db_session.add(user)
    db_session.commit()

    user_event = UserEvents(user, "registered user")
    db_session.add(user_event)
    db_session.commit()

    token = generate_confirmation_token(user.email)

    # confirm_url = url_for('auth.confirmation', token=token, _external=True)
    confirm_url = 'http://localhost/register/confirmation?token=' + token.decode("utf-8")
    send_email(user.email, confirm_url)

    user_event = UserEvents(user, "confirmation email sender")
    db_session.add(user_event)

    db_session.commit()
    return user_schema.dump(user)


@auth.route('/resend_confirmation', methods=['POST'])
def resend_confirmation():
    if not request.is_json:
        raise NotValidRequestException("POST doesn't have payload.")

    email = request.json.get('email', None)
    username = request.json.get('username', None)
    if not email:
        raise MissingParametersException("Missing email.")
    if not username:
        raise MissingParametersException("Missing username.")

    user = Users.query.filter_by(name=username, email=email).first()

    if user and user.confirmed:
        raise UserIsConfirmedException("User is confirmed", user)

    token = generate_confirmation_token(user.email)

    # confirm_url = url_for('auth.confirmation', token=token, _external=True)
    confirm_url = 'http://localhost/register/confirmation?token=' + token.decode("utf-8")
    send_email(user.email, confirm_url)

    user_event = UserEvents(user, "confirmation email sender again")
    db_session.add(user_event)

    db_session.commit()
    return user_schema.dump(user)


@auth.route('/confirmation/<token>', methods=['GET'])
def confirmation(token):
    try:
        email = email_from_confirm_token(token)
    except:
        raise InvalidTokenException("URL Token is not valid.")

    print(email)

    user = Users.query.filter_by(email=email).first()
    if user.confirmed:
        raise UserIsConfirmedException("User is confirmed", user)
    else:
        user.confirmed = True
        user.confirmed_on = datetime.datetime.now()
        db_session.add(user)
        db_session.commit()
    return jsonify({"msg": "Confirmed!"}), 200


@auth.route('/password', methods=['POST'])
def password_request():
    if not request.is_json:
        raise NotValidRequestException("POST doesn't have JSON payload.")

    email = request.json.get('email', None)

    user = Users.query.filter_by(email=email).first()
    if not user:
        return jsonify({"msg": "User not exist."}), 406

    token = generate_confirmation_token(user.email)

    confirm_url = 'http://localhost/register/confirmation' + token.decode("utf-8")
    # confirm_url = url_for('auth.password_change', token=token, _external=True)
    send_email(user.email, confirm_url)

    user_event = UserEvents(user, "password_change email sender")
    db_session.add(user_event)

    return jsonify({"msg": "Email send."}), 200


@auth.route('/password/<token>', methods=['POST'])
def password_change(token):
    if not request.is_json:
        raise NotValidRequestException("POST doesn't have JSON payload.")

    new_password = request.json.get('password', None)

    try:
        email = email_from_confirm_token(token)
    except:
        raise InvalidTokenException("URL Token is not valid.")

    user = Users.query.filter_by(email=email).first()

    if user and not user.confirmed:
        raise UserIsNotConfirmedException("User is not confirmed", user)

    user.password = sha256_crypt.encrypt(new_password)
    db_session.add(user)
    db_session.commit()
    return jsonify({"msg": "Password changed."}), 200


@auth.route('/agreements', methods=['POST'])
@jwt_required
def add_agreements():
    if not request.is_json:
        raise NotValidRequestException("POST doesn't have JSON payload.")

    agreement_id = request.json.get('agreement_id', None)
    if not agreement_id:
        raise MissingParametersException("Missing agreement_id.")

    is_accepted = request.json.get('is_accepted', None)

    current_user = get_jwt_identity()

    user = Users.query.filter_by(name=current_user).first()
    agreement = Agreements.query.filter_by(id=agreement_id).first()

    existing_user_agreements = UserAgreements.query.filter_by(user=user, agreement=agreement).first()

    if existing_user_agreements:
        raise CreatedRelationExistException("User has Agreement relation exist.")

    user_agreements = UserAgreements(user=user, agreement=agreement, is_accepted=is_accepted)
    user_agreements.is_read = True

    db_session.add(user_agreements)
    db_session.commit()
    return jsonify(user_agreements_schema.dump(user_agreements))


@auth.route('/agreements', methods=['GET'])
@jwt_required
def get_agreements():
    current_user = get_jwt_identity()

    user = Users.query.filter_by(name=current_user).first()
    user_agreements = UserAgreements.query.filter_by(user=user).order_by("created_on").all()

    return jsonify(user_agreements_schema.dump(user_agreements, many=True))
