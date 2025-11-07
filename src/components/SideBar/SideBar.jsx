import "./SideBar.css";

import avatar from "../../assets/avatar.svg";

export default function SideBar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__profile">
        <img className="sidebar__avatar" src={avatar} alt="avatar image" />
        <p className="sidebar__name">Stuart UselJones</p>
      </div>
    </aside>
  );
}
