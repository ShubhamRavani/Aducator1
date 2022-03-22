const mongoose = require("mongoose");

//create schema
const publicationSchema = new mongoose.Schema(
    {
        title: { 
            type: String,
            required: [true, "Title is required."],
        },
        
        keywords: {
            type: Array,
            required: [true, "Keywords are required."], 
        },

        abstract: {
            type: String, maxlength: 200,
            required: [true, "Abstract/Summary is required."],
        },

        introduction: {
            type: String,
            required: [true, "Introduction is required."],
        },

        conclusion: {
            type: String,
            required: [true, "Conclusion is required."]
        },

        refrences: {
            type: Array,
        },

        viewCount: {
            type: Number,
            default: 0,
        },
        
        user: {
            type: mongoose.Schema.Types,ObjectId,
            ref: "User",
            required: [true, "Please Author is required."]
        },
    },
    { 
        toJSON: {
            virtuals: true,
        },
        toObject: {
            virtuals: true,
        },
        timestamps: true,
    }

);

//Compile Publication schema into model
const Publication = mongoose.model("Publication", publicationSchema);

module.exports = Publication;