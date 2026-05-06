const express = require('express');
const router = express.Router();
const multer = require('multer');
const { submitIssue, getMyIssues, getAdminIssues, updateIssueStatus , issueDetails } = require('../controllers/issueController');
const { isAuth } = require('../middleware/isAuth');
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
  });
  const upload = multer({ storage });
// Route to submit a new issue
router.post('/submit',isAuth, upload.single('image'), submitIssue);
// Route to get issues of logged in user
router.get('/myIssue', isAuth, getMyIssues);
// Route to update issue status
router.get('/adminIssues', getAdminIssues);       // ← admin issues
router.patch('/updateStatus', updateIssueStatus);
router.get('/details/:issueId', issueDetails);
module.exports = router;