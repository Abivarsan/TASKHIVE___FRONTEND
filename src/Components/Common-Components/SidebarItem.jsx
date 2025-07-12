import { useState } from "react";
import { Link } from "react-router-dom";
import "./Styles/Sidebaritemstyle.css";
import { useAuth } from '../../Auth/AuthContext'; // Import the useAuth hook

export default function SidebarItem({ item }) {
  const [open, setOpen] = useState(false);
  const { user } = useAuth(); // Get the user from the AuthContext

  // Check if the user has access to the item
  const hasAccess = (item) => {
    if (!item.roles) return true; // If no roles are specified, allow access
    return item.roles.includes(user.userCategoryId); // Check if the user's role is in the allowed roles
  };

  if (!hasAccess(item)) {
    return null; // Do not render the item if the user does not have access
  }

  if (item.childrens) {
    return (
      <div className={open ? "sidebar-item open" : "sidebar-item"}>
        <div className="sidebar-title">
          <span>
            {item.icon && <i className={item.icon}></i>}
            {item.title}
          </span>
          <i className="bi-chevron-down toggle-btn" onClick={() => setOpen(!open)}></i>
        </div>
        <div className="sidebar-content">
          {item.childrens.map((child, index) => (
            <SidebarItem key={index} item={child} />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <Link to={item.path || "#"} className="sidebar-item plain">
        {item.icon && <i className={item.icon}></i>}
        {item.title}
      </Link>
    );
  }
}
