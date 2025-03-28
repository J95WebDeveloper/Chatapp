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
    const { profilePic, profileBio } = req.body;

    const profileUrl = `http://localhost:3000/uploads/${req.file.filename}`;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { profilePic: profileUrl, profileBio },
      { new: true }
    );

    res.status(201).json({
      success: true,
      message: "Profile update Successfully",
      profilePic: user.profilePic,
      profileBio: user.profileBio,
    });
  } catch (error) {
    res.status(501).json({
      message: "upload image Internal error",
      error: error.message,
    });
  }
};

export default { getUser, updateUser };
