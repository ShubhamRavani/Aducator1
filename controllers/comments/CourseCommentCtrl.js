const expressAsyncHandler = require("express-async-handler");
const CourseComment = require("../../model/comment/CourseComment");
const validateMongodbId = require("../../utils/validateMongodbID");

//-------------------------------------------------------------
//Create
//-------------------------------------------------------------
const createCourseCommentCtrl = expressAsyncHandler(async (req, res) => {
    //1.Get the user
    const user = req.user;
    //2.Get the project & publication Id
    const { projectId , description } = req.body;
    try {
      const comment = await CourseComment.create({
        course: projectId,
        user,
        description,
      });
      res.json(comment);
    } catch (error) {
      res.json(error);
    }
  });
  
  //-------------------------------
  //fetch all comments
  //-------------------------------
  
  const fetchAllCourseCommentsCtrl = expressAsyncHandler(async (req, res) => {
    try {
      const comments = await CourseComment.find({}).sort("-created");
      res.json(comments);
    } catch (error) {
      res.json(error);
    }
  });
  
  //------------------------------
  //comment details
  //------------------------------
  const fetchCourseCommentCtrl = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    try {
      const comment = await CourseComment.findById(id);
      res.json(comment);
    } catch (error) {
      res.json(error);
    }
  });
  
  //------------------------------
  //Update
  //------------------------------
  
  const updateCourseCommentCtrl = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    try {
      const update = await CourseComment.findByIdAndUpdate(
        id,
        {
          course: req.body?.projectId,
          user: req?.user,
          description: req?.body?.description,
        },
        {
          new: true,
          runValidators: true,
        }
      );
      res.json(update);
    } catch (error) {
      res.json(error);
    }
  });
  
  //------------------------------
  //delete
  //------------------------------
  
  const deleteCourseCommentCtrl = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    try {
      const comment = await CourseComment.findByIdAndDelete(id);
      res.json(comment);
    } catch (error) {
      res.json(error);
    }
  });
  
  module.exports = {
    createCourseCommentCtrl,
    fetchAllCourseCommentsCtrl,
    fetchCourseCommentCtrl,
    updateCourseCommentCtrl,
    deleteCourseCommentCtrl,
  };
  