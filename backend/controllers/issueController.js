const Issue = require("../models/Issue");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { sendIssueEmail } = require("../utils/email");
const submitIssue = async (req, res) => {
  try {
    // Token se user id lo
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Not authorized" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    const { title, description, category, address, state, city } = req.body;

    const issue = await Issue.create({
      title,
      description,
      category,
      address,
      state,
      city,
      image: req.file ? req.file.path : "", // ← cloudinary ya local
      userId: decoded.id,
    });
    await sendIssueEmail(issue, user.email);
    res.status(201).json({ message: "Issue submitted successfully", issue });
  } catch (error) {
    console.log("Issue error:", error.message);
    res.status(500).json({ message: error.message });
  }
};
const getMyIssues = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Sirf us user ki issues jo login hai
    const issues = await Issue.find({ userId: decoded.id }).sort({
      createdAt: -1,
    }); // ← latest pehle

    res.status(200).json(issues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Admin — apni state/city ki issues lo
const getAdminIssues = async (req, res) => {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Admin user dhundo
    const admin = await User.findById(decoded.id);
    console.log("Admin:", admin.username, admin.state, admin.city);
    if (admin.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    // Sirf us admin ki state/city ki issues
    const issues = await Issue.find({
      state: { $regex: new RegExp('^' + admin.state + '$', 'i') },
      city: { $regex: new RegExp('^' + admin.city + '$', 'i') },
    }).populate('userId', 'username email').sort({ createdAt: -1 });
    

    res.status(200).json(issues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Status update karo
const updateIssueStatus = async (req, res) => {
  try {
    const { issueId, status } = req.body;

    const issue = await Issue.findByIdAndUpdate(
      issueId,
      { status },
      { new: true }
    );

    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    res.status(200).json({ message: "Status updated", issue });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const issueDetails = async (req, res) => {
  try{
    const { issueId } = req.params;
    const details = await Issue.findById(issueId).populate('userId', 'username email');
    if(!details){
      return res.status(404).json({ message: "Issue not found" });
    }
    res.status(200).json(details);

  }
  catch(error){
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  submitIssue,
  getMyIssues,
  getAdminIssues,
  updateIssueStatus,
  issueDetails
};

