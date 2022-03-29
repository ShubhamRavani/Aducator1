const expressAsyncHandler = require("express-async-handler");
const Project = require("../../model/project/Project");
const validateMongodbId = require("../../utils/validateMongodbID");
const User = require("../../model/user/User");

//----------------------------------------------------------------
//CREATE PROJECT
//----------------------------------------------------------------

const createProjectCtrl = expressAsyncHandler(async (req, res) => {
  validateMongodbId(req.body.user);
  try {
    const project = await Project.create(req.body);
    res.json(project);
  } catch (error) {
    res.json(error);
  }
});

//-------------------------------
//Fetch all projects
//-------------------------------
const fetchProjectsCtrl = expressAsyncHandler(async (req, res) => {
  try {
    const projects = await Project.find({}).populate("user");
    res.json(projects);
  } catch (error) {}
});

//------------------------------
//Fetch a single project
//------------------------------

const fetchProjectCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const project = await Project.findById(id).populate("user");
    //update number of views
    await Project.findByIdAndUpdate(
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
  console.log(req.user);
  const { id } = req.params;
  validateMongodbId(id);

  try {
    const project = await Project.findByIdAndUpdate(
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
    const project = await Project.findOneAndDelete(id);
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
  const project = await Project.findById(projectId);
  //2. Find the login user
  const loginUserId = req?.user?._id;
  //3. Find is this user has liked this project?
  const isLiked = project?.isLiked;
  
  //Toggle
  //4. Remove the user if he has liked the project
  if (isLiked) {
    const project = await Project.findByIdAndUpdate(
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
    const project = await Project.findByIdAndUpdate(
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


module.exports = { 
  createProjectCtrl, 
  fetchProjectsCtrl, 
  fetchProjectCtrl,
  updateProjectCtrl,
  deleteProjectCtrl,
  toggleAddLikeToProjectCtrl
};
