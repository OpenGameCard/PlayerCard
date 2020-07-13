from flask_marshmallow.fields import Hyperlinks, URLFor
from marshmallow import fields, Schema
from sqlalchemy import create_engine, Column, Integer, String, DateTime, \
    ForeignKey, func, Boolean, JSON
from sqlalchemy.orm import scoped_session, sessionmaker, relationship, backref
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.dialects.postgresql import UUID

from passlib.hash import sha256_crypt

from application.models.users import Users

import uuid


from application.shared.models import db_session, model, engine


class UserEvents(model):
    query = db_session.query_property()

    __tablename__ = 'user_events'
    id = Column('user_event_id', UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, unique=True, nullable=False)

    log = Column(String(512), unique=False, nullable=False)
    meta = Column(JSON, nullable=True)
    created_on = Column(DateTime, server_default=func.now())

    user_id = Column(UUID(as_uuid=True), ForeignKey('users.user_id'), nullable=False)
    user = relationship('Users', backref="user_events", lazy=True)

    def __init__(self, user: Users, log: str, meta=None):
        if meta is None:
            meta = {}
        self.user = user
        self.log = log
        self.meta = meta

    def __eq__(self, other):
        return type(self) is type(other) and self.id == other.id

    def __ne__(self, other):
        return not self.__eq__(other)
