import { useAuth } from "../context/AuthProvider";
import axios from "axios";
import { handleSuccess } from '../components/Toaster'



export const useUpdateProfile = () => {
   
    const { authUser, setAuthUser } = useAuth();

    const updateProfile = async(formData, navigate, setNewBio) => {
        try {
            const res = await axios.post("/api/user/upload", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            });
            if (res.data.success) {
              setAuthUser({
                ...authUser,
                profilePic: res.data.profilePic,
                profileBio: res.data.profileBio,
              });
              setNewBio(res.data.profileBio);
              handleSuccess(res.data.message);
              setTimeout(() => {
                navigate("/");
              }, 1000);
            }
          } catch (err) {
            console.log(err);
          }
    }

    return { updateProfile }
}