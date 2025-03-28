import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Chat from "./pages/chat/Chat";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Profile from "./pages/profile/Profile";
import { useAuth } from "./context/AuthProvider";
import { ToastContainer } from 'react-toastify'


function App() {
  
  const { authUser } = useAuth();
  return (
    <>
      <Routes>
        <Route path="/" element={authUser ? <Chat /> : <Navigate to={"/login"} />}/>
        <Route path="/login" element={authUser ? <Navigate to={"/"} /> : <Login />}/>
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
