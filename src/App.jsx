import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import ResumeBuilder from "./pages/ResumeBuilder";
import Preview from "./pages/Preview";
import Login from "./pages/Login";
import { useDispatch } from "react-redux";
import axiosClient from "./configs/axiosClient";
import { login, setLoading } from "./app/features/authSlice";
import {Toaster} from "react-hot-toast";

const App = () =>{

    const dispatch = useDispatch()

    const getUserData = async () => {
    try {
      const { data } = await axiosClient.get("/users/data", {
        withCredentials: true,
      });

      if (data.user) {
        dispatch(login({ user: data.user }));
      }

      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      console.log("Error fetching user data:", error.message);
    }
  };

    useEffect(()=>{
      getUserData();
    },[])
    return(
      <>
      <Toaster/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        
        <Route path='app' element={<Layout/>}>
          <Route index element={<Dashboard/>}/>
          <Route path='builder/:resumeId' element={<ResumeBuilder/>}/>
        </Route>

        <Route path='view/:resumeId' element={<Preview/>}/>
        <Route path='login' element={<Login/>}/>
      </Routes>
      </>
    )
}

export default App;