const Leave = require("../models/Leave.model");
const User = require("../models/Users.model");

exports.createLeave = async (data) => {
    const { userId } = data;

    // 1️⃣ Create leave
    const leave = await Leave.create(data);

    // 2️⃣ Fetch user email
    const user = await User.findOne({ user_id: userId });

    return {
        ...leave.toObject(),
        email: user?.email || null
    };
};

// exports.getAllLeaves = async () => {
//     return await Leave.find().sort({ _id: -1 });
// };
exports.getAllLeaves = async () => {
    return await Leave.aggregate([
        {
            $lookup: {
                from: "users",              // collection name
                localField: "userId",       // leaves.userId
                foreignField: "user_id",    // users.user_id
                as: "user"
            }
        },
        {
            $unwind: {
                path: "$user",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $project: {
                reason: 1,
                formdate: 1,
                todate: 1,
                status: 1,
                "user.name": 1,
                "user.email": 1
            }
        },
        {
            $sort: { _id: -1 }
        }
    ]);
};

exports.updateStatus = async (id, status) => {
    const leave = await Leave.findByIdAndUpdate(
        id,
        { status },
        { new: true }
    );

    if (!leave) return null;

    // Fetch user email
    const user = await User.findOne({ user_id: leave.userId });

    return {
        ...leave.toObject(),
        email: user?.email || null
    };
};

exports.getUserLeaves = async (userId) => {
    return await Leave.find({ userId }).sort({ _id: -1 });
};
