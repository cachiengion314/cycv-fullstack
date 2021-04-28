const {
    Schema, model
} = require(`mongoose`);

const customSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        default: "user",
    },
    savesData: {
        type: Array,
        default: []
    }
}, { timestamps: true });

exports.cycvuser = model(`cycvuser`, customSchema);