import "./Navbar.css";
import { BiHome } from "react-icons/bi";
import { BsCompass } from "react-icons/bs";
import { GoSearch } from "react-icons/go";
import { RiGroupLine } from "react-icons/ri";
import { RiSettingsLine } from "react-icons/ri";
import { NavLink,useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
export function Navbar() {
  const {pathname}=useLocation()
  const username = useSelector((state) => state.user.userData.username);
  return (
    <section className="nav-sec br-cr mobile-nav">
      <div className="nav-bar-div">
        <div className={"nav-bar"}>
          <NavLink
            to="/"
            className="nav-div-icon"
            activeClassName="icon-active"
            state={{ from: pathname }}
            end
          >
            <button>
              <BiHome />
            </button>
          </NavLink>
          <NavLink
            className="nav-div-icon"
            activeClassName="icon-active"
            to="/connection"
            state={{ from: pathname }}
            end
          >
            <button>
              <RiGroupLine />
            </button>
          </NavLink>
          <NavLink
            className="nav-div-icon"
            activeClassName="icon-active"
            to="search"
            state={{ from: pathname }}
            end
          >
            <button>
              <GoSearch size="1.3rem" />
            </button>
          </NavLink>
          <NavLink
            className="nav-div-icon"
            activeClassName="icon-active"
            to="/explore"
            state={{ from: pathname }}
            end
          >
            <button>
              <BsCompass />
            </button>
          </NavLink>
          <NavLink
            className="nav-div-icon"
            activeClassName="icon-active"
            to={`/user/${username}`}
            state={{ from: pathname }}
            end
          >
            <button>
              <RiSettingsLine />
            </button>
          </NavLink>
        </div>
      </div>
    </section>
  );
}
