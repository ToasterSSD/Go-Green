import React from "react";
import { Link } from "react-router-dom";

const UserComponent = () => (
  <div>
    <h1>User Dashboard</h1>
    {/* Add user-specific components or links here */}
    <div>
      <Link to="/tutorials">View Tutorials</Link>
      <Link to="/announcement">View Announcements</Link>
    </div>
  </div>
);

export default UserComponent;
