from flask_marshmallow.fields import Hyperlinks, URLFor
from marshmallow import fields, Schema
from sqlalchemy import create_engine, Column, Integer, String, DateTime, \
    ForeignKey, func, Boolean, JSON
from sqlalchemy.orm import scoped_session, sessionmaker, relationship, backref
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.dialects.postgresql import UUID

from passlib.hash import sha256_crypt
import uuid

from application.models.users import Users
from application.models.agreements import Agreements

from application.shared.models import db_session, model, engine


class UserAgreements(model):
    query = db_session.query_property()

    __tablename__ = 'user_agreements'

    id = Column('user_agreements_id', UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, unique=True,
                nullable=False)
    user_id = Column(UUID(as_uuid=True), ForeignKey('users.user_id'), unique=False)
    agreements_id = Column(UUID(as_uuid=True), ForeignKey('agreements.agreement_id'), unique=False)

    is_read = Column(Boolean, default=False)
    is_accepted = Column(Boolean, default=False)

    created_on = Column(DateTime, server_default=func.now())
    updated_on = Column(DateTime, server_default=func.now(), server_onupdate=func.now())

    user = relationship("Users", backref="agreements_user_agreements")
    agreement = relationship("Agreements", backref="users_user_agreements")

    def __init__(self, user: Users, agreement: Agreements, is_accepted: Boolean):
        self.user = user
        self.agreement = agreement
        self.is_accepted = is_accepted
