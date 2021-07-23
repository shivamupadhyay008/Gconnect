import "./sidenav.css";
import { BiHome } from "react-icons/bi";
import { BsCompass } from "react-icons/bs";
import { GoSearch } from "react-icons/go";
import { RiGroupLine } from "react-icons/ri";
import { IoMdNotificationsOutline } from "react-icons/io";
import { RiSettingsLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box } from "@chakra-ui/react";
export function SideNav() {
  const username = useSelector((state) => state.user.userData.username);
  return (
    <section className="sidenav-sec br-cr">
      <div className="">
        <div className="sidenav-div">
          <NavLink
            to="/"
            className="sd-nv-icon"
            activeClassName="sd-active"
            end
          >
            <button>
              <BiHome />
            </button>
            <Box w="70%"> HOME</Box>
          </NavLink>
          <NavLink
            className="sd-nv-icon"
            activeClassName="sd-active"
            to="/connection"
            end
          >
            <button>
              <RiGroupLine />
            </button>
            <Box w="70%">CONNECT</Box>
          </NavLink>
          <NavLink
            className="sd-nv-icon"
            activeClassName="sd-active"
            to="/search"
            end
          >
            <button>
              <GoSearch />
            </button>
            <Box w="70%">SEARCH</Box>
          </NavLink>
          <NavLink
            className="sd-nv-icon"
            activeClassName="sd-active"
            to="/explore"
            end
          >
            <button>
              <BsCompass />
            </button>
            <Box w="70%"> EXPLORE</Box>
          </NavLink>
          <NavLink
            className="sd-nv-icon"
            activeClassName="sd-active"
            to={`/user/${username}`}
            end
          >
            <button>
              <RiSettingsLine />
            </button>
            <Box w="70%">PROFILE</Box>
          </NavLink>
        </div>
      </div>
    </section>
  );
}
