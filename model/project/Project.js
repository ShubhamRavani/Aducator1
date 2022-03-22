const mongoose = require("mongoose");

//create schema
const projectSchema = new mongoose.Schema(
    {
        title: { 
            type: String,
            required: [true, "Project title is required."],
        },
        
        keywords: {
            type: Array,
            required: [true, "Keywords are required."], 
        },

        abstract: {
            type: String,
            required: [true, "Abstract/Description is required."],
        },

        languages: {
            type: Array,
            required: [true, "Language/Tools are required."],
        },

        refrences: {
            type: Array,
        },

        screenshot: {
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

//Compile Project schema into model
const Project = mongoose.model("Project", projectSchema);

module.exports = Project;