import mongoose from 'mongoose'

const post_schema = mongoose.Schema({
    
    caption: {
        type: String,
        required: true,
        min: 8,
        max: 255,
        trim: true
    },
    selected_file: {
        type: String,
        required: true,
        min: 6,
        max: 255,
        trim: true
    },
    creator: {
        type: String,
        required: true,
        min: 8,
        max: 1024,
        trim: true
    },
    date_posted: {
        type: Date,
        default: new Date()
    }
},
    {
        timestamps: true
    }
)

const Post = mongoose.model('posts', post_schema)

export default Post