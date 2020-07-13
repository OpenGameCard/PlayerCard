from flask_marshmallow.fields import Hyperlinks, URLFor
from marshmallow import fields, Schema
from sqlalchemy import create_engine, Column, Integer, String, DateTime, \
    ForeignKey, func, Boolean, JSON
from sqlalchemy.orm import scoped_session, sessionmaker, relationship, backref
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.dialects.postgresql import UUID

import uuid
from passlib.hash import sha256_crypt


from application.shared.models import db_session, model, engine


class Users(model):
    query = db_session.query_property()

    __tablename__ = 'users'

    id = Column('user_id', UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, unique=True, nullable=False)

    email = Column(String(200), unique=True, nullable=False)
    name = Column(String(200), unique=True, nullable=False)
    password = Column(String(100))

    first_name = Column(String(200))
    last_name = Column(String(200))

    created_on = Column(DateTime, server_default=func.now())

    confirmed = Column(Boolean, nullable=False, default=False)
    confirmed_on = Column(DateTime, nullable=True)

    agreements = relationship("Agreements", secondary="user_agreements")

    def __init__(self, email, name, password):
        self.email = email
        self.name = name
        self.password = sha256_crypt.encrypt(password)

    def __eq__(self, other):
        return type(self) is type(other) and self.id == other.id

    def __ne__(self, other):
        return not self.__eq__(other)
