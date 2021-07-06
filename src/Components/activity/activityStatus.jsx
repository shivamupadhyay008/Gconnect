import "./activity.css";
import { AiOutlineSearch, AiFillAndroid } from "react-icons/ai";
const data = [
    {
    name: "shivam",
    image: "https://via.placeholder.com/150",
    isActive: true,
    },
    {
    name: "udit",
    image: "https://via.placeholder.com/150",
    isActive: "2 min ago",
    },
    {
    name: "vaibhav",
    image: "https://via.placeholder.com/150",
    isActive: "3 min ago",
    },
    {
    name: "udit",
    image: "https://via.placeholder.com/150",
    isActive: "2 min ago",
    },
    {
    name: "vaibhav",
    image: "https://via.placeholder.com/150",
    isActive: "3 min ago",
    },
    {
    name: "vaibhav",
    image: "https://via.placeholder.com/150",
    isActive: "3 min ago",
    },
    {
        name: "vaibhav",
        image: "https://via.placeholder.com/150",
        isActive: "3 min ago",
    },
    {
    name: "vaibhav",
    image: "https://via.placeholder.com/150",
    isActive: "3 min ago",
    },
    ];
export function UserStatus({ image, name, activityStatus }) {
console.log(typeof activityStatus === "boolean");
return (
<section className="usr-stat-sec">
    <div className="av-nm-div">
        <img class="activity-avatar" src={image} alt="not found" />
        <div className="user-name-div">{name}</div>
    </div>
    <div>{typeof activityStatus === "boolean" ? <div className="online-status"></div>: <div className="inact-div">{activityStatus}</div>  }</div>
</section>
);
}
export function GetActivity({ title, data ,userHeight }) {
return (
<section>
    <div className="act-title-div">{title}</div>
    <div className="user-stat-div" style={{height:userHeight}}>
        {data.map(({image,name,isActive})=>{
            return (
                <UserStatus image={image} name={name} activityStatus={isActive} />
            )
        })}
    </div>
</section>
);
}
export default function ActivityStatus() {
return (
<section className="activity-section">
    <div className="activity-hero">
        <div className="hero-icon">
            <AiFillAndroid className="act-icon" />
        </div>
        <div className="search-div">
            <AiOutlineSearch className="act-ico" />
            <input placeholder="Search" className="activity-input" type="text" />
        </div>
    </div>
    <div>
        <GetActivity title={"YOUR GROUP"} data={data} userHeight="160px"/>
        <GetActivity title={"FRIEND"} data={data} userHeight="49.1vh"/>
    </div>
</section>
);
}