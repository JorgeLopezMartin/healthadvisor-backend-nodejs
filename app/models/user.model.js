const MUUID = require('uuid-mongodb');
module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            _id: {
                type: 'String',
                value: { type: 'Buffer' },
                default: () => MUUID.v1(),
            },
            username: {type: String, required: true},
            email: {type: String, required: true},
            firstname: {type: String, required: true},
            lastname: {type: String, required: true},
            password: {type: String, required: true},
            token: {type: String, required: false},
            roles: []
        },
        { timestamps: true }
    );

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const User = mongoose.model("User", schema);
    // Mongoose automatically looks for the plural, lowered version of your model name
    return User;
};
