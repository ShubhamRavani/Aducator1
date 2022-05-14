const expressAsyncHandler = require("express-async-handler");
const Comment = require("../../model/PaperComment/PaperComment");
const validateMongodbId = require("../../utils/validateMongodbID");

//-------------------------------------------------------------
//Create
//-------------------------------------------------------------
const createCommentCtrl = expressAsyncHandler(async (req, res) => {
    //1.Get the user
    const user = req.user;
    //2.Get the project & publication Id
    const { paperId , description } = req.body;
    try {
      const comment = await Comment.create({
        project: paperId,
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
  
  const fetchAllCommentsCtrl = expressAsyncHandler(async (req, res) => {
    try {
      const comments = await Comment.find({}).sort("-created");
      res.json(comments);
    } catch (error) {
      res.json(error);
    }
  });
  
  //------------------------------
  //comment details
  //------------------------------
  const fetchCommentCtrl = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    try {
      const comment = await Comment.findById(id);
      res.json(comment);
    } catch (error) {
      res.json(error);
    }
  });
  
  //------------------------------
  //Update
  //------------------------------
  
  const updateCommentCtrl = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    try {
      const update = await Comment.findByIdAndUpdate(
        id,
        {
          project: req.body?.projectId,
          publication: req.body?.publicationId,
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
  
  const deleteCommentCtrl = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    try {
      const comment = await Comment.findByIdAndDelete(id);
      res.json(comment);
    } catch (error) {
      res.json(error);
    }
  });
  
  module.exports = {
    deleteCommentCtrl,
    updateCommentCtrl,
    createCommentCtrl,
    fetchAllCommentsCtrl,
    fetchCommentCtrl,
  };
  