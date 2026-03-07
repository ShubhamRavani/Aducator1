const expressAsyncHandler = require("express-async-handler");
const PaperComment = require("../../model/PaperComment/PaperComment");
const validateMongodbId = require("../../utils/validateMongodbID");

//-------------------------------------------------------------
//Create
//-------------------------------------------------------------
const createPaperCommentCtrl = expressAsyncHandler(async (req, res) => {
    //1.Get the user
    const user = req.user;
    //2.Get the project & publication Id
    const { paperId , description } = req.body;
    try {
      const comment = await PaperComment.create({
        paper: paperId,
        user,
        description,
      });
      res.json(comment);
    } catch (error) {
      res.json(error);
    }
  });
  
  //-------------------------------
  //fetch all Paper Comments
  //-------------------------------
  
  const fetchAllPaperCommentsCtrl = expressAsyncHandler(async (req, res) => {
    try {
      const comments = await PaperComment.find({}).sort("-created");
      res.json(comments);
    } catch (error) {
      res.json(error);
    }
  });
  
  //------------------------------
  //Paper Comment Details
  //------------------------------
  const fetchPaperCommentCtrl = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    try {
      const comment = await PaperComment.findById(id);
      res.json(comment);
    } catch (error) {
      res.json(error);
    }
  });
  
  //------------------------------
  //Update Paper Comment
  //------------------------------
  
  const updatePaperCommentCtrl = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    try {
      const update = await PaperComment.findByIdAndUpdate(
        id,
        {
          paper: req.body?.paperId,
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
  //Delete Paper Comment
  //------------------------------
  
  const deletePaperCommentCtrl = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    try {
      const comment = await PaperComment.findByIdAndDelete(id);
      res.json(comment);
    } catch (error) {
      res.json(error);
    }
  });
  
  module.exports = {
    deletePaperCommentCtrl,
    updatePaperCommentCtrl,
    createPaperCommentCtrl,
    fetchAllPaperCommentsCtrl,
    fetchPaperCommentCtrl,
  };
  