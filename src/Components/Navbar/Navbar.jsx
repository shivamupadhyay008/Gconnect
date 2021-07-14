import "./Navbar.css";
import { BiHome } from "react-icons/bi";
import { HiOutlineChatAlt2 } from "react-icons/hi";
import { RiGroupLine } from "react-icons/ri";
import { IoMdTime } from "react-icons/io";
import { CgFlagAlt } from "react-icons/cg";
import { RiSettingsLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
export function Navbar() {
  const username = useSelector((state) => state.user.userData.username);
  return (
    <section className="nav-sec">
      <div className="nav-bar-div">
        <div className={"nav-bar"}>
          <Link to="/">
            <div className={`nav-div-icon icon-active`}>
              <BiHome />
            </div>
          </Link>
          <Link to="/connection">
            <div className={`nav-div-icon`}>
              <RiGroupLine />
            </div>
          </Link>
          <div className={`nav-div-icon`}>
            <HiOutlineChatAlt2 />
          </div>
          <Link to="notification">
            <div className={`nav-div-icon`}>
              <IoMdTime />
            </div>
          </Link>
          <div className={`nav-div-icon`}>
            <CgFlagAlt />
          </div>
          <Link to={`/user/${username}`}>
            <div className={`nav-div-icon`}>
              <RiSettingsLine />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
