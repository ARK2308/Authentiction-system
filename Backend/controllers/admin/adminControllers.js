const adminDB = require("../../model/admin/adminModel");
const bcrypt = require("bcryptjs");

// Register Controller
exports.Register = async (req, res) => {
    const { name, email, password } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        // Check if the email already exists
        const existingUser = await adminDB.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "This email is already registered" });
        }

        // Create new admin user
        const adminData = new adminDB({ name, email, password });
        await adminData.save();

        res.status(201).json({ message: "Registration successful", adminData });
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Login Controller
exports.Login = async (req, res) => {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        // Check if the email exists
        const adminValid = await adminDB.findOne({ email });
        if (!adminValid) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, adminValid.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        // Generate token
        const token = await adminValid.generateAuthToken();
        res.status(200).json({ admin: adminValid, token });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.AdminVerify = async (req, res) => {
    try {
        const verifyadmin = await adminDB.findOne({ _id: req.userId });
        if (!verifyadmin) {
            return res.status(400).json({ error: "Admin not verified" });
        }
        return res.status(200).json(verifyadmin);
    } catch (error) {
        res.status(500).json({ error: "Invalid Credentials" });
    }
};
// admin logout controller
// Get method
exports.Logout = async (req, res) => {
    try {
        req.rootUser.tokens = req.rootUser.tokens.filter((currentUser) => {
            return currentUser.token !== req.token;
        });

        req.rootUser.save();
        res.status(200).json({ message: "Admin Successfully Logout" });
    } catch (error) {
        res.status(400).json(error);
    }
}
