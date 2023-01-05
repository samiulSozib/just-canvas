const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    googleId: {
        type: String
    },
    name: {
        type: String
    },
    avatar: {
        type: String
    },
    department_id: {
        type: String
    },
    student_id: {
        type: String
    },
    session: {
        type: String
    },
    email: {
        type: String
    },
    department_name: {
        type: String
    },
    university_name: {
        type: String
    },
    role: {
        type: String
    },
    status: {
        type: String
    }
}, {
    timestamps: true
})

const User = model('User', userSchema)
module.exports = User