const { Schema, model } = require('mongoose')

const postSchema = new Schema({
    status: {
        type: String,
    },
    title: {
        type: String
    },
    category: {
        type: String
    },
    body: {
        type: String,
        maxlength: 5000000
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    author_name: {
        type: String
    },
    thumbnail: {
        type: String
    },
    file: {
        type: String
    },
    readTime: {
        type: String
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    dislikes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }]
}, {
    timestamps: true
})

const Post = model('Post', postSchema)
module.exports = Post