const express = require("express");

const router = express.Router();

const {
    getContacts,
    getContact,
    createContact,
    updateContact,
    deletContact
} = require("../controllers/contactControllers.js");

const validateToken = require("../middlewares/validateToken.js");

router.use(validateToken);

router.route("/")
    .get(getContacts)
    .post(createContact);

router.route("/:id")
    .get(getContact)
    .put(updateContact)
    .delete(deletContact);

module.exports = router;