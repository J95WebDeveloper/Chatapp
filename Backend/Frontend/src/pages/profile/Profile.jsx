import React, { useEffect, useRef, useState } from "react";
import avatar from "../../assets/avatar.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { handleSuccess } from "../../components/Toaster";
import { ToastContainer } from "react-toastify";
import { useAuth } from "../../context/AuthProvider";
import { useUpdateProfile } from "../../hooks/useUpdateProfile";


function Profile() {
  
  const { authUser, setAuthUser } = useAuth();
  const {updateProfile} = useUpdateProfile()
  const [bio, setBio] = useState("");
  const [newBio, setNewBio] = useState("");
  const [profilePic, setProfilePic] = useState(null); // To store the file object
  const [imagePreview, setImagePreview] = useState(null); // To store the image preview URL
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  useEffect(() => {
    // Or fetch from API
    if (authUser) {
      setNewBio(authUser.profileBio);
      setBio(authUser.profileBio);
    }
  }, [authUser]);

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setProfilePic(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("profile-image", profilePic);
    formData.append("profileBio", newBio);

    updateProfile(formData, navigate, setNewBio)
  };

  return (
    <div className="h-[92vh] md:h-screen bg flex items-center justify-center">
      <div className="lg:w-[800px] md:w-[400px] w-[320px] cart py-10 md:p-10">
        <h1 className="md:hidden text-center text-4xl mb-10"> Profile </h1>
        <h1 className="hidden md:block text-center lg:text-4xl mb-18">
          Update your Profile
        </h1>
        <div className="flex items-center justify-center md:justify-evenly md:gap-10">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center justify-center md:gap-3"
              autoComplete="off">
              <div
                onClick={handleFileInputClick}
                className="flex items-center justify-center mb-4">
                <img
                  src={imagePreview || authUser.profilePic || avatar}
                  className="w-34 h-34 md:w-28 md:h-28 rounded-full object-cover cursor-pointer"
                />
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  name="'profile-image"
                  accept=".jpg, .png, .jpeg, .webp"
                  hidden
                />
              </div>
              <div className="flex flex-col gap-6">
                <input
                  type="text"
                  value={authUser.fullname}
                  disabled
                  className="border-2 border-border px-4 py-2 rounded-md w-full"
                />
                <textarea
                  type="text"
                  value={newBio}
                  name="profileBio"
                  onChange={(e) => setNewBio(e.target.value)}
                  className="border-2 border-border px-4 py-2 rounded-md"></textarea>
                <div className="flex justify-evenly gap-5 mt-2">
                  <Link to={"/"}>
                    <button className="px-4 py-3 cursor-pointer hover:scale-105 rounded-md bg-[#bb4b17] text-white active:scale-95 w-[130px]">
                      Cancle
                    </button>
                  </Link>
                  <button
                    type="submit"
                    className="px-4 py-3 flex gap-2 cursor-pointer hover:scale-105 rounded-md bg-darkBlue active:scale-95 w-[130px] md:w-full">
                    <span className="text-center w-full">Save</span> <span className="hidden md:block">Changes</span>
                  </button>
                </div>
              </div>
            </form>
          <div className="divider md:divider-horizontal"></div>
          <div className="hidden md:block">
            <img
              src={imagePreview || authUser.profilePic || avatar}
              className="w-52 h-52 rounded-full object-cover"
            />
          </div>
        </div>
        <div></div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default Profile;
