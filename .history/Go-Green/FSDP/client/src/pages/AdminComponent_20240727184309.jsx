import React from "react";

const AdminComponent = () => (
  <div>
    <h1>Admin Dashboard</h1>
    {/* Add admin-specific components or links here */}
    <div>
      <Link to="/addtutorial">Add Tutorial</Link>
      <Link to="/addannouncement">Add Announcement</Link>
    </div>
  </div>
);

export default AdminComponent;
