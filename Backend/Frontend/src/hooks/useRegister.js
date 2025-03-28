import axios  from "axios"
import { handleError, handleSuccess } from "../components/Toaster"

export const useRegister = async(values, navigate) => {
   try {
     await axios.post('/api/register', values)
     .then((res) => {
        handleSuccess(res.data.message)
        setTimeout(() => {
           navigate('/login')
        }, 1000)
     })
     .catch((err) => {
        handleError(err.response.data.message);
     })
   } catch (error) {
      console.log(error)
   }
}