const nodemailer = require("nodemailer");
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS);

// transporter setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// send issue email
const sendIssueEmail = async (issue ,userEmail) => {
  try {
    const mailOptions = {
      from: `"SamasyaSetu" <${process.env.EMAIL_USER}>`,
      to: userEmail, // admin email
      subject: "🚨 New Issue Reported | SamasyaSetu",
      html: `
      <div style="font-family: Arial, sans-serif; background:#f4f7f6; padding:20px;">
        
        <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 4px 10px rgba(0,0,0,0.05);">

          <!-- Header -->
          <div style="background:#0f6e56; padding:20px; text-align:center;">
            <h1 style="color:#ffffff; margin:0;">SamasyaSetu</h1>
            <p style="color:#9FE1CB; margin:5px 0 0; font-size:13px;">
              Citizen Complaint System
            </p>
          </div>

          <!-- Body -->
          <div style="padding:20px;">
            <h2 style="color:#333;">🚨 New Issue Submitted</h2>
            <p style="color:#666; font-size:14px;">
              A new complaint has been registered on <strong>SamasyaSetu</strong>.
            </p>

            <!-- Details -->
            <div style="background:#f0f9f7; padding:15px; border-radius:8px; margin-top:15px;">
              <p><strong>📌 Title:</strong> ${issue.title}</p>
              <p><strong>📂 Category:</strong> ${issue.category}</p>
              <p><strong>📝 Description:</strong> ${issue.description}</p>
              <p><strong>📍 Location:</strong> ${issue.city}, ${issue.state}</p>
              <p><strong>🏠 Address:</strong> ${issue.address}</p>
              <p><strong>📅 Date:</strong> ${new Date().toLocaleString()}</p>
            </div>

            <!-- Button -->
            <div style="text-align:center; margin-top:20px;">
              <a href="http://localhost:5173/myissue" style="
                background:#0f6e56;
                color:white;
                padding:10px 20px;
                border-radius:5px;
                text-decoration:none;
                font-size:14px;
                display:inline-block;
              ">
                View in Dashboard
              </a>
            </div>
          </div>

          <!-- Footer -->
          <div style="background:#f4f7f6; padding:15px; text-align:center;">
            <p style="font-size:12px; color:#999;">
              © 2024 SamasyaSetu — Awaaz Uthao, Badlaav Lao
            </p>
          </div>

        </div>
      </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Issue email sent");
  } catch (error) {
    console.log("❌ Email error:", error);
  }
};

// ✅ EXPORT FIX
module.exports = { sendIssueEmail };