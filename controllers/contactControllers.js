const Contact = require("../models/contactModels.js");
const asyncHandler = require("express-async-handler");

const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({
        user_id: req.user.id
    });

    res.status(200).json({
        message: "Retrieved all contacts.",
        contacts
    });
});

const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findOne({
        _id: req.params.id,
        user_id: req.user.id
    });

    if (!contact) {
        res.status(404);
        throw new Error("Contact not found.");
    }

    res.status(200).json({
        message: "Retrieved contact successfully.",
        contact
    });
});

const createContact = asyncHandler(async (req, res) => {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are mandatory.");
    }

    const contact = await Contact.create({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        user_id: req.user.id
    });

    res.status(201).json({
        message: "Created new contact successfully.",
        contact
    });
});

const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findOne({
        _id: req.params.id,
        user_id: req.user.id
    });

    if (!contact) {
        res.status(404);
        throw new Error("Contact not found.");
    }

    const { name, email, phone } = req.body;

    if (name !== undefined) {
        contact.name = name.trim();
    }

    if (email !== undefined) {
        contact.email = email.trim();
    }

    if (phone !== undefined) {
        contact.phone = phone.trim();
    }

    const updatedContact = await contact.save();

    res.status(200).json({
        message: "Contact updated successfully.",
        updatedContact
    });
});

const deletContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findOne({
        _id: req.params.id,
        user_id: req.user.id
    });

    if (!contact) {
        res.status(404);
        throw new Error("Contact not found.");
    }

    await contact.deleteOne();

    res.status(200).json({
        message: "Contact deleted successfully.",
        contact
    });
});

module.exports = {
    getContacts,
    getContact,
    createContact,
    updateContact,
    deletContact
};