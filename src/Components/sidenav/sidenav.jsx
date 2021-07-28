import "./sidenav.css";
import { BiHome } from "react-icons/bi";
import { BsCompass } from "react-icons/bs";
import { GoSearch } from "react-icons/go";
import { RiGroupLine } from "react-icons/ri";
import { RiSettingsLine } from "react-icons/ri";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box } from "@chakra-ui/react";
export function SideNav() {
  const { pathname } = useLocation();
  const username = useSelector((state) => state.user.userData.username);
  return (
    <section className="sidenav-sec br-cr">
      <Box
        fontFamily="robot"
        fontSize="2rem"
        color="var(--BRAND_BLUE)"
        fontWeight="bold"
        textAlign="center"
        p="1rem"
        pt='2rem'
        mb="1rem"
      >
        Gconnect
      </Box>
      <div className="">
        <div className="sidenav-div">
          <NavLink
            to="/"
            className="sd-nv-icon"
            activeClassName="sd-active"
            state={{ from: pathname }}
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
            state={{ from: pathname }}
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
            state={{ from: pathname }}
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
            state={{ from: pathname }}
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
            state={{ from: pathname }}
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
