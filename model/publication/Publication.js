const mongoose = require("mongoose");

//create schema
const publicationSchema = new mongoose.Schema(
    {
        publicationlink: { 
            type: Array,
            //required: [true, "Publication link is required."],
        },
        category: {
            type: String,
            required: [true, "Paper category is required"],
          },

        title: { 
            type: String,
            required: [true, "Title is required."],
        },
        
        keywords: {
            type: Array,
            required: [true, "Keywords are required."], 
        },

        abstract: {
            type: String,
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
            type: String,
        },

        viewCount: {
            type: Number,
            default: 0,
        },

        isLiked: {
            type: Boolean,
            default: false,
        },

        likes: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: "User",
            },
        ],
        
        user: {
            type: mongoose.Schema.Types.ObjectId,
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