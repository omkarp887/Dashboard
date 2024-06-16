import React, { useContext, useState } from "react";
import { TiHome } from "react-icons/ti";
import { RiLogoutBoxFill } from "react-icons/ri";
import { AiFillMessage } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserDoctor } from "react-icons/fa6";
import { MdAddModerator } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.get(
        "https://hms-backend-eis7.onrender.com/api/v1/user/admin/logout",
        {
          withCredentials: true,
        }
      );
      toast.success(res.data.message);
      setIsAuthenticated(false);
      navigateTo("/login");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const gotoHomePage = () => {
    navigateTo("/");
    setShow(false);
  };

  const gotoDoctorsPage = () => {
    navigateTo("/doctors");
    setShow(false);
  };

  const gotoMessagesPage = () => {
    navigateTo("/messages");
    setShow(false);
  };

  const gotoAddNewDoctor = () => {
    navigateTo("/doctor/addnew");
    setShow(false);
  };

  const gotoAddNewAdmin = () => {
    navigateTo("/admin/addnew");
    setShow(false);
  };

  // Logging to ensure the state is correct
  // console.log("isAuthenticated:", isAuthenticated);
  // console.log("show:", show);

  return (
    <>
      {isAuthenticated && ( // Corrected this line
        <>
          <nav className={`sidebar ${show ? "show" : ""}`}>
            <div className="links">
              <TiHome onClick={gotoHomePage} />
              <FaUserDoctor onClick={gotoDoctorsPage} />
              <MdAddModerator onClick={gotoAddNewAdmin} />
              <IoPersonAddSharp onClick={gotoAddNewDoctor} />
              <AiFillMessage onClick={gotoMessagesPage} />
              <RiLogoutBoxFill onClick={handleLogout} />
            </div>
          </nav>
          <div className="wrapper">
            <GiHamburgerMenu
              className="hamburger"
              onClick={() => setShow(!show)}
            />
          </div>
        </>
      )}
    </>
  );
};

export default Sidebar;
