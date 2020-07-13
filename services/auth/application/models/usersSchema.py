from marshmallow import fields, Schema


class UsersSchema(Schema):
    class Meta:
        ordered = True

    id = fields.UUID()
