const leaveService = require("../services/leave.service");
const leaveMail = require("../utils/leaveMail");

const formatDate = (date) =>
    date
        ? new Date(date).toLocaleDateString("en-GB").replace(/\//g, "-")
        : "";

exports.createLeave = async (req, res, next) => {
    try {
        const result = await leaveService.createLeave(req.body);

        if (result.email) {
            await leaveMail({
                to: result.email,
                subject: "Leave Request Submitted",
                html: `
          <h3>iTWINE - Vijay</h3>
         
          <p>Your leave request has been submitted.</p>
          <p><b>From:</b> ${formatDate(result.formdate)}</p>
          <p><b>To:</b> ${formatDate(result.todate)}</p>
          <p><b>Status:</b> Pending</p>
        `
            });
        }

        res.json({ data: result, status: 200 });
    } catch (err) {
        next(err);
    }
};

exports.getAllLeaves = async (req, res, next) => {
    try {
        const data = await leaveService.getAllLeaves();
        res.json({ data, status: 200 });
    } catch (err) {
        next(err);
    }
};

exports.updateLeaveStatus = async (req, res, next) => {
    try {
        const updated = await leaveService.updateStatus(
            req.params.id,
            req.body.status
        );

        if (!updated) {
            return res.status(404).json({ message: "Leave not found" });
        }

        if (updated.email) {
            try {
                console.log("📧 Sending mail to:", updated.email);

                const statusText =
                    updated.status == 1
                        ? "Approved"
                        : updated.status == 2
                            ? "Rejected"
                            : "Pending";

                await leaveMail({
                    to: updated.email,
                    subject: "Leave Status Updated",
                    html: `
                        <h3>iTWINE - Vijay</h3>
                      
                        <p>Your leave status has been updated.</p>
                        <p><b>From Date:</b> ${formatDate(updated.formdate)}</p>
                        <p><b>To Date:</b> ${formatDate(updated.todate)}</p>
                    
                        <p><b>Reason:</b> ${updated.reason}</p>
                        <p><b>Status:</b> ${statusText}</p>
                    `
                });

                console.log("✅ Mail sent successfully");
            } catch (mailErr) {
                console.error("❌ Mail error:", mailErr.message);
            }
        } else {
            console.log("⚠️ Email not found in DB");
        }

        // Send final response
        res.json({
            data: updated,
            message: "Leave status updated successfully",
            status: 200,
        });
    } catch (err) {
        next(err);
    }
};


exports.getUserLeaves = async (req, res, next) => {
    try {
        const data = await leaveService.getUserLeaves(req.params.userId);
        res.json({ data, status: 200 });
    } catch (err) {
        next(err);
    }
};
