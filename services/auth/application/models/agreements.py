import uuid

from sqlalchemy import Column, String, DateTime, func, Boolean
from sqlalchemy.dialects.postgresql import UUID

from application.models.users import Users

from application.shared.models import db_session, model


class Agreements(model):
    query = db_session.query_property()

    __tablename__ = 'agreements'

    id = Column('agreement_id', UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, unique=True, nullable=False)

    title = Column(String(200), nullable=False)
    description = Column(String(64000), nullable=True)
    body = Column(String(), nullable=True)
    valid_from = Column(DateTime)
    valid_to = Column(DateTime)
    is_active = Column(Boolean, default=False)
    is_required = Column(Boolean, default=False)
    created_on = Column(DateTime, server_default=func.now())
    updated_on = Column(DateTime, server_default=func.now(), server_onupdate=func.now())

    def __init__(self, title: str):
        self.title = title

    def to_json(self):
        return dict(name=self.description)

    def __eq__(self, other):
        return type(self) is type(other) and self.id == other.id

    def __ne__(self, other):
        return not self.__eq__(other)
