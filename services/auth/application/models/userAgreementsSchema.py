from flask_marshmallow.fields import Hyperlinks, URLFor
from marshmallow import fields, Schema
from sqlalchemy import create_engine, Column, Integer, String, DateTime, \
    ForeignKey, func, Boolean, JSON
from sqlalchemy.orm import scoped_session, sessionmaker, relationship, backref
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.dialects.postgresql import UUID

from passlib.hash import sha256_crypt
import uuid

import numpy as np

from flask_marshmallow.fields import Hyperlinks, URLFor
from marshmallow import fields, Schema
from sqlalchemy import create_engine, Column, Integer, String, DateTime, \
    ForeignKey, func, Boolean, JSON
from sqlalchemy.orm import scoped_session, sessionmaker, relationship, backref
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.dialects.postgresql import UUID

from application.models.users import Users

import uuid


class UserAgreementsSchema(Schema):
    class Meta:
        ordered = True

    id = fields.UUID()

    is_read = fields.Boolean()
    is_accepted = fields.Boolean()
    created_on = fields.DateTime()
    updated_on = fields.DateTime()
    agreement = fields.Nested('AgreementsSchema', many=False, exclude=['_links'])

    _agreement_links = Hyperlinks(
        {"self": URLFor("agreements.get", id="<agreements_id>"), "collection": URLFor("agreements.get_all")}
    )
