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

    let profilePic;
    if (req.file) {
      profilePic = req.file.path;
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { profilePic: profilePic, profileBio },
      { new: true },
    );

    res.status(201).json({
      success: true,
      message: "Profile update Successfully",
      profilePic: user.profilePic,
      profileBio: user.profileBio,
    });
  } catch (error) {
    return res.status(501).json({
      message: "Update Internal server error",
      error: error.message,
      success: false,
    });
  }
};


export default { getUser, updateUser };
