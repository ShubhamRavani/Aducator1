const express = require("express");
const { 
    createPublicationCtrl,
    fetchPublicationsCtrl,
    fetchPublicationCtrl,
    updatePublicationCtrl,
    deletePublicationCtrl,
    toggleAddLikeToPublicationCtrl,

} = require("../../controllers/publication/publicationCtrl");

const authMiddleware = require("../../middlewares/auth/authMiddleware");

const publicationRoute = express.Router();

publicationRoute.post("/", authMiddleware, createPublicationCtrl);
publicationRoute.put("/likes", authMiddleware, toggleAddLikeToPublicationCtrl,);
publicationRoute.get("/", fetchPublicationsCtrl);
publicationRoute.get("/:id", fetchPublicationCtrl);
publicationRoute.put("/:id", authMiddleware, updatePublicationCtrl);
publicationRoute.delete("/:id", authMiddleware, deletePublicationCtrl);


module.exports = publicationRoute;
