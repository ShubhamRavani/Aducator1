const expressAsyncHandler = require("express-async-handler");
const Project = require("../../model/project/Project");
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
    const project = await Project.create({
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
  const hasProjectCategory = req.query.category
  try {
    if(hasProjectCategory){
      const projects = await Project.find({category:hasProjectCategory}).populate("user").populate("projectComment").sort('-createdAt');
      res.json(projects);
    }
    else{
    const projects = await Project.find({}).populate("user").populate("projectComment").sort('-createdAt');
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
    const project = await Project.findById(id).populate("user").populate("projectComment");
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
  //1.Find the post to be liked
  const { postId } = req.body;
  const post = await Project.findById(postId);
  //2. Find the login user
  const loginUserId = req?.user?._id;
  //3. Find is this user has liked this post?
  const isLiked = post?.isLiked;
  //4.Chech if this user has dislikes this post
  const alreadyDisliked = post?.disLikes?.find(
    userId => userId?.toString() === loginUserId?.toString()
  );
  //5.remove the user from dislikes array if exists
  if (alreadyDisliked) {
    const post = await Project.findByIdAndUpdate(
      postId,
      {
        $pull: { disLikes: loginUserId },
        isDisLiked: false,
      },
      { new: true }
    );
    res.json(post);
  }
  //Toggle
  //Remove the user if he has liked the post
  if (isLiked) {
    const post = await Project.findByIdAndUpdate(
      postId,
      {
        $pull: { likes: loginUserId },
        isLiked: false,
      },
      { new: true }
    );
    res.json(post);
  } else {
    //add to likes
    const post = await Project.findByIdAndUpdate(
      postId,
      {
        $push: { likes: loginUserId },
        isLiked: true,
      },
      { new: true }
    );
    res.json(post);
  }
});

// ------------------------------------

// const toggleAddLikeToProjectCtrl = expressAsyncHandler(async (req, res) => {
//   //1.Find the project to be liked
//   const { projectId } = req.body;
//   const project = await Project.findById(projectId);
//   //2. Find the login user
//   const loginUserId = req?.user?._id;
//   //3. Find is this user has liked this project?
//   const isLiked = project?.isLiked;
  
//   //Toggle
//   //4. Remove the user if he has liked the project
//   if (isLiked) {
//     const project = await Project.findByIdAndUpdate(
//       projectId,
//       {
//         $pull: { likes: loginUserId },
//         isLiked: false,
//       },
//       { new: true }
//     );
//     res.json(project);
//   } else {
//     //add to likes
//     const project = await Project.findByIdAndUpdate(
//       projectId,
//       {
//         $push: { likes: loginUserId },
//         isLiked: true,
//       },
//       { new: true }
//     );
//     res.json(project);
//   }
// });

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
