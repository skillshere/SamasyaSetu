const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

const sendIssueEmail = async (issue, userEmail) => {
  try {
    await resend.emails.send({
      from: 'SamasyaSetu <onboarding@resend.dev>',
      to: userEmail,
      subject: '🚨 New Issue Reported | SamasyaSetu',
      html: `
      <div style="font-family: Arial, sans-serif; background:#f4f7f6; padding:20px;">
        <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 4px 10px rgba(0,0,0,0.05);">
          <div style="background:#0f6e56; padding:20px; text-align:center;">
            <h1 style="color:#ffffff; margin:0;">SamasyaSetu</h1>
            <p style="color:#9FE1CB; margin:5px 0 0; font-size:13px;">Citizen Complaint System</p>
          </div>
          <div style="padding:20px;">
            <h2 style="color:#333;">🚨 New Issue Submitted</h2>
            <p style="color:#666; font-size:14px;">A new complaint has been registered on <strong>SamasyaSetu</strong>.</p>
            <div style="background:#f0f9f7; padding:15px; border-radius:8px; margin-top:15px;">
              <p><strong>📌 Title:</strong> ${issue.title}</p>
              <p><strong>📂 Category:</strong> ${issue.category}</p>
              <p><strong>📝 Description:</strong> ${issue.description}</p>
              <p><strong>📍 Location:</strong> ${issue.city}, ${issue.state}</p>
              <p><strong>🏠 Address:</strong> ${issue.address}</p>
              <p><strong>📅 Date:</strong> ${new Date().toLocaleString()}</p>
            </div>
            <div style="text-align:center; margin-top:20px;">
              <a href="https://samasya-setu.vercel.app/myissue" style="background:#0f6e56; color:white; padding:10px 20px; border-radius:5px; text-decoration:none; font-size:14px; display:inline-block;">
                View in Dashboard
              </a>
            </div>
          </div>
          <div style="background:#f4f7f6; padding:15px; text-align:center;">
            <p style="font-size:12px; color:#999;">© 2024 SamasyaSetu — Awaaz Uthao, Badlaav Lao</p>
          </div>
        </div>
      </div>
      `,
    });
    console.log("✅ Issue email sent");
  } catch (error) {
    console.log("❌ Email error:", error);
  }
};

module.exports = { sendIssueEmail };