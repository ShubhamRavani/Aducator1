const expressAsyncHandler = require("express-async-handler");
const PaperCategory = require("../../model/PaperCategory/PaperCat");

//----------------------------------------------------------------
//Create Category
//----------------------------------------------------------------

const createCategoryCtrl = expressAsyncHandler(async (req, res) => {
  try {
    const category = await PaperCategory.create({
      user: req.user._id,
      title: req.body.title,
    });
    res.json(category);
  } catch (error) {
    res.json(error);
  }
});


//----------------------------------------------------------------
//fetch all Category
//----------------------------------------------------------------

const fetchCategoriesCtrl = expressAsyncHandler(async (req, res) => {
  try {
    const categories = await PaperCategory.find({})
      .populate("user")
      .sort("-createdAt");
    res.json(categories);
  } catch (error) {
    res.json(error);
  }
});


//----------------------------------------------------------------
//fetch a single category
//----------------------------------------------------------------

const fetchCategoryCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const category = await PaperCategory.findById(id)
      .populate("user")
      .sort("-createdAt");
    res.json(category);
  } catch (error) {
    res.json(error);
  }
});


//----------------------------------------------------------------
//Update Category
//----------------------------------------------------------------

const updateCategoryCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const category = await PaperCategory.findByIdAndUpdate(
      id,
      {
        title: req?.body?.title,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.json(category);
  } catch (error) {
    res.json(error);
  }
});


//----------------------------------------------------------------
//Delete Category
//----------------------------------------------------------------

const deleteCateoryCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const category = await PaperCategory.findByIdAndDelete(id);

    res.json(category);
  } catch (error) {
    res.json(error);
  }
});


module.exports = {
  createCategoryCtrl,
  updateCategoryCtrl,
  fetchCategoriesCtrl,
  fetchCategoryCtrl,
  deleteCateoryCtrl,
};
