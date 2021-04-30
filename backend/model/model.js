const {
    Schema, model, ObjectId
} = require(`mongoose`);

const CycUserSchema = new Schema({
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
        default: "your_name_here",
    },
    savesData: {
        type: Array,
        default: []
    }
}, { timestamps: true })

const CycShowCaseSaveFile = new Schema({
    data: {
        type: Object,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    isPublic: {
        type: Boolean,
        required: true,
        default: true
    },
    createdBy: {
        type: ObjectId,
        required: true,
        ref: "cycvuser"
    }
}, { timestamps: true })

exports.cycShowCaseSaveFile = model(`cycshowcasesavefile`, CycShowCaseSaveFile)

exports.cycvuser = model(`cycvuser`, CycUserSchema);