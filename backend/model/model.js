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
    saveData: {
        type: Object,
        required: true
    },
    createdBy: {
        type: ObjectId,
        required: true,
        ref: "cycvuser"
    }
}, { timestamps: true })

exports.cycShowCaseSaveFile = model(`cycshowcasesavefile`, CycShowCaseSaveFile)

exports.cycvuser = model(`cycvuser`, CycUserSchema);