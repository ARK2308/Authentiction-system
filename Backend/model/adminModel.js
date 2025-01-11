const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "asuekygdlzb";

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid email format");
            }
        },
    },
    password: {
        type: String,
        required: true,
    },
    tokens: [
        {
            token: {
                type: String,
                required: true,
            },
        },
    ],
});

// Hash password before saving to the database
adminSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
});

// Generate authentication token
adminSchema.methods.generateAuthToken = async function () {
    try {
        const newToken = jwt.sign({ _id: this._id }, SECRET_KEY, { expiresIn: "1d" });
        this.tokens = this.tokens.concat({ token: newToken });
        await this.save();
        return newToken;
    } catch (error) {
        console.error("Error generating token:", error);
        throw error;
    }
};

// Define the model
const adminDB = mongoose.model("Admin", adminSchema);

module.exports = adminDB;