import React from "react";
import { useLocation } from "react-router-dom";
import { Lock, Mail, User2Icon } from "lucide-react";
import axiosClient from "../configs/axiosClient";
import { useDispatch } from "react-redux";
import { login } from "../app/features/authSlice";
import toast from "react-hot-toast";
const Login = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const urlState = query.get("state");

  const [state, setState] = React.useState("login");

  const dispatch = useDispatch();

  React.useEffect(() => {
    setState(urlState || "login");
  }, [urlState]);

  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add login or register logic here
    try{
        const {data} = await axiosClient.post(`/users/${state}`,formData);
        // dispatch(login({token:data.token,user:data.user}))
        // localStorage.setItem('token',data.token);
        dispatch(login({user:data.user}))
        toast.success(data.message);

    }
    catch(error)
    {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form onSubmit={handleSubmit} className="sm:w-[350px] w-full text-center border border-gray-300/60 rounded-2xl px-8 bg-white">
        <h1 className="text-gray-900 text-3xl mt-10 font-medium">
          {state === "login" ? "Login" : "Sign up"}
        </h1>
        <p className="text-gray-500 text-sm mt-2">
          Please {state} to continue
        </p>

        {state === "register" && (
          <div className="flex items-center mt-6 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
            <User2Icon size={16} className="text-amber-300" />
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="border-none outline-none ring-0"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
        )}

        <div className="flex items-center w-full mt-4 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <Mail size={13} className="text-amber-300" />
          <input
            type="email"
            name="email"
            placeholder="Email id"
            className="border-none outline-none ring-0"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <Lock size={13} className="text-amber-300" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="border-none outline-none ring-0"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mt-4 text-left text-amber-500">
          <button className="text-sm" type="reset">Forget password?</button>
        </div>

        <button type="submit" className="mt-2 w-full h-11 rounded-full text-white bg-amber-500 hover:opacity-90 transition-opacity">
          {state === "login" ? "Login" : "Sign up"}
        </button>

        <p
          onClick={() => {
            const newState = state === "login" ? "register" : "login";
            window.history.replaceState(null, "", `?state=${newState}`);
            setState(newState);
          }}
          className="text-gray-500 text-sm mt-3 mb-11 cursor-pointer"
        >
          {state === "login" ? "Don't have an account?" : "Already have an account?"}
          <span className="text-amber-500 hover:underline"> click here</span>
        </p>
      </form>
    </div>
  );
};

export default Login;