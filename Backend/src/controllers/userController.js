import User from "../schemas/authSchema.js";

const getUser = async (req, res) => {
  try {
    const loggedId = req.user.id;
    const filterUser = await User.find({ _id: { $ne: loggedId } }).select(
      "-password"
    );
    res.status(200).json(filterUser);
  } catch (error) {
    return res.status(501).json({
      message: "Internal server error",
      error: error.message,
      success: false,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { profileBio } = req.body;

    let profileUrl = null;

    if (req.file) {
      profileUrl = req.file.filename;
    }

    const updateData = {
      profileBio,
    };

    if (profileUrl) {
      updateData.profilePic = profileUrl;
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      updateData,
      { new: true }
    );

    res.status(201).json({
      success: true,
      message: "Profile updated successfully",
      profilePic: user.profilePic,
      profileBio: user.profileBio,
    });
  } catch (error) {
    res.status(500).json({
      message: "Upload image internal error",
      error: error.message,
    });
  }
};

export default { getUser, updateUser };
