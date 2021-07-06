import './Navbar.css';
import { BiHome} from "react-icons/bi";
import { HiOutlineChatAlt2} from "react-icons/hi";
import {RiGroupLine} from "react-icons/ri";
import {IoMdTime} from "react-icons/io";
import {CgFlagAlt} from "react-icons/cg";
import {RiSettingsLine} from "react-icons/ri"
const data=[
    {
        image:"https://via.placeholder.com/150"
    }
]

export function Navbar() {
return (
<section className="nav-sec">
    <div className="nav-bar-div">
        <div className={'nav-bar'}>
            <div className={`nav-div-icon icon-active`}>
                <BiHome />
            </div>
            <div className={`nav-div-icon`}>
                <RiGroupLine/>
            </div>
            <div className={`nav-div-icon`}>
                < HiOutlineChatAlt2/>
            </div>
            <div className={`nav-div-icon`}>
                <IoMdTime/>
            </div>
            <div className={`nav-div-icon`}>
                <CgFlagAlt/>
            </div>
            <div className={`nav-div-icon`}>
                <RiSettingsLine/>
            </div>
        </div>
    </div>
</section>
);
}