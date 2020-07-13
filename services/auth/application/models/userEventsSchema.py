from marshmallow import fields, Schema


class UserEventsSchema(Schema):
    class Meta:
        ordered = True

    id = fields.UUID()
    log = fields.String()
    user = fields.Nested('UsersSchema', many=False)
