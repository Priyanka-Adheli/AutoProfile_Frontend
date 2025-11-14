// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { logout } from "../app/features/authSlice";

// const Navbar = () => {
//   const { user } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const logoutUser = () => {
//     dispatch(logout());
//     navigate("/");
//   };

//   return (
//     <div className="shadow bg-white">
//       <nav className="flex items-center justify-between max-w-7xl mx-auto px-4 py-3.5 text-slate-800 transition-all">
//         <Link to="/">
//           <img src="./logo.svg" alt="logo" className="h-11 w-auto" />
//         </Link>
//         <div className="flex items-center gap-4 text-sm">
//           <p className="max-sm:hidden">Hi, {user?.name}</p>
//           <button
//             onClick={logoutUser}
//             className="bg-white hover:bg-slate-50 border border-gray-300 px-7 py-1.5 rounded-full active:scale-95 transition-all"
//           >
//             Logout
//           </button>
//         </div>
//       </nav>
//     </div>
//   );
// };

// export default Navbar;

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axiosClient from "../configs/axiosClient";
import { logout } from "../app/features/authSlice";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutUser = async () => {
    try {
      await axiosClient.post("/users/logout", {}, { withCredentials: true });
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  return (
    <div className="shadow bg-white">
  <nav className="flex items-center justify-between max-w-7xl mx-auto px-4 py-3.5 text-slate-800 transition-all">
    <Link to="/">
      <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 bg-clip-text text-transparent">
  AutoProfile
</span>
    </Link>
    <div className="flex items-center gap-4 text-sm">
      <p className="max-sm:hidden">Hi, {user?.name}</p>
      <button
        onClick={logoutUser}
        className="bg-white hover:bg-slate-50 border border-gray-300 px-7 py-1.5 rounded-full active:scale-95 transition-all"
      >
        Logout
      </button>
    </div>
  </nav>
</div>
  );
};

export default Navbar;