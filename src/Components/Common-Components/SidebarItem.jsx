import { useState } from "react";
import { Link } from "react-router-dom";
import "./Styles/Sidebaritemstyle.css";
import { useAuth } from "../../Auth/AuthContext";

export default function SidebarItem({ item }) {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  

  // Check if the user has access to the item
  const hasAccess = (item) => {
    if (!item.roles) return true;
  
    return item.roles.includes(String(user.userCategoryId));
  };

  // DEBUG: Log access check result
  const accessResult = hasAccess(item);


  if (!accessResult) {
  
    return null;
  }

  const handleToggle = () => {
    
    setOpen(!open);
  
  };

  if (item.childrens) {
    
    return (
      <div className={open ? "sidebar-item open" : "sidebar-item"}>
        <div className="sidebar-title" onClick={handleToggle}>
          <span>
            {item.icon && <i className={item.icon}></i>}
            {item.title}
          </span>
          <i 
            className="bi-chevron-down toggle-btn" 
            style={{color: 'white'}} // Remove red color - it's working now
          ></i>
</div>
        <div className="sidebar-content">
          {item.childrens.map((child, index) => {
          
            return <SidebarItem key={index} item={child} />;
          })}
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
