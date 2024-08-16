import React from "react";

const Notification = ({ notification }) => {
  if (!notification.message) {
    return null;
  }

  const color = notification.type === "success" ? "green" : "red";

  const style = {
    color,
    fontSize: "20px",
    borderStyle: "solid",
    borderColor: color,
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };

  return <div style={style}>{notification.message}</div>;
};

export default Notification;
