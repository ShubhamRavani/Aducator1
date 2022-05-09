const expressAsyncHandler = require("express-async-handler");
const Course = require("../../model/Courses/courses");
const validateMongodbId = require("../../utils/validateMongodbID");
const fs = require("fs");
const cloudinaryUploadImg = require("../../utils/cloudinary");

//----------------------------------------------------------------
//CREATE PROJECT
//----------------------------------------------------------------

const createProjectCtrl = expressAsyncHandler(async (req, res) => {
  console.log(req.file);
  const { _id } = req.user;

  try {
    const project = await Course.create({
      ...req.body,
      user: _id,
    });
    res.json(project);
  } catch (error) {
    res.json(error);
  }
});

//-------------------------------
//Fetch all projects
//-------------------------------
const fetchProjectsCtrl = expressAsyncHandler(async (req, res) => {
  const hasCourseCategory = req.query.category
  try {
    if(hasCourseCategory){
      const projects = await Course.find({category:hasCourseCategory}).populate("user").populate("projectComment");
      res.json(projects);
    }
    else{
    const projects = await Course.find({}).populate("user").populate("projectComment");
    res.json(projects);
    }
    
  } catch (error) {
    res.json(error);
  }
});

//------------------------------
//Fetch a single project
//------------------------------

const fetchProjectCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const project = await Course.findById(id).populate("user").populate("projectComment");
    //update number of views
    await Course.findByIdAndUpdate(
      id,
      {
        $inc: { viewCount: 1 },
      },
      { new: true }
    );
    res.json(project);
  } catch (error) {
    res.json(error);
  }
});

//------------------------------
// Update project
//------------------------------

const updateProjectCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);

  try {
    const project = await Course.findByIdAndUpdate(
      id,
      {
        ...req.body,
        user: req.user?._id,
      },
      {
        new: true,
      }
    );
    res.json(project);
  } catch (error) {
    res.json(error);
  }
});

//------------------------------
//Delete Project
//------------------------------

const deleteProjectCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const project = await Course.findOneAndDelete(id);
    res.json(project);
  } catch (error) {
    res.json(error);
  }
}); 

//------------------------------
//Likes
//------------------------------

const toggleAddLikeToProjectCtrl = expressAsyncHandler(async (req, res) => {
  //1.Find the project to be liked
  const { projectId } = req.body;
  const project = await Course.findById(projectId);
  //2. Find the login user
  const loginUserId = req?.user?._id;
  //3. Find is this user has liked this project?
  const isLiked = project?.isLiked;
  
  //Toggle
  //4. Remove the user if he has liked the project
  if (isLiked) {
    const project = await Course.findByIdAndUpdate(
      projectId,
      {
        $pull: { likes: loginUserId },
        isLiked: false,
      },
      { new: true }
    );
    res.json(project);
  } else {
    //add to likes
    const project = await Course.findByIdAndUpdate(
      projectId,
      {
        $push: { likes: loginUserId },
        isLiked: true,
      },
      { new: true }
    );
    res.json(project);
  }
});

//------------------------------
//Screen Shot Upload
//------------------------------

// const screenShotUploadCtrl = expressAsyncHandler(async (req, res) => {
//   console.log(req.user);
//   const { id } = req.params;
//   validateMongodbId(id);

//   

//   const project = await Project.findById(id);
  
//   await Project.findByIdAndUpdate(
//     id,
//     {
//       screenshot: imgUploaded?.url,
//     },
//     { new: true }
//   );
//   //remove the saved img
//   fs.unlinkSync(localPath);
//   res.json(project);
// });

module.exports = { 
  createProjectCtrl, 
  fetchProjectsCtrl, 
  fetchProjectCtrl,
  updateProjectCtrl,
  deleteProjectCtrl,
  toggleAddLikeToProjectCtrl,
};
