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


class AgreementsSchema(Schema):
    class Meta:
        ordered = True

    id = fields.UUID()

    title = fields.String()
    description = fields.String()
    body = fields.String()
    valid_from = fields.DateTime()
    valid_to = fields.DateTime()
    is_active = fields.Boolean()
    is_required = fields.Boolean()
    created_on = fields.DateTime()
    updated_on = fields.DateTime()

    _links = Hyperlinks(
        {"self": URLFor("agreements.get", id="<id>"), "collection": URLFor("agreements.get_all")}
    )
