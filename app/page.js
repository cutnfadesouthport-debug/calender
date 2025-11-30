"use client";
import React, { useState, useEffect } from "react";

const page = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadUsers = () => {
      fetch("/api/get-users")
        .then((r) => r.json())
        .then((data) => setUsers(data.users || []));
    };

    loadUsers();
    const interval = setInterval(loadUsers, 1000);

    return () => clearInterval(interval);
  }, []);

  const checkedUsers = users.filter((u) => u.checked);

  const times = [
    "12 AM",
    "1 AM",
    "2 AM",
    "3 AM",
    "4 AM",
    "5 AM",
    "6 AM",
    "7 AM",
    "8 AM",
    "9 AM",
    "10 AM",
    "11 AM",
    "12 PM",
    "1 PM",
    "2 PM",
    "3 PM",
    "4 PM",
    "5 PM",
    "6 PM",
    "7 PM",
    "8 PM",
    "9 PM",
    "10 PM",
    "11 PM",
  ];

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #000000 0%, #111111 100%)",
        fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
        color: "#e2e8f0",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        padding: "20px",
        margin: 0,
        overflow: "auto",
      }}
    >
      <h1
        style={{
          fontSize: "24px",
          paddingBottom: "15px",
          borderBottom: "2px solid #333333",
          marginBottom: "25px",
          color: "#ffffff",
          fontWeight: "600",
          textShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
        }}
      >
        Choose the slot that are available for you
      </h1>

      {checkedUsers.length > 0 ? (
        <div
          style={{
            maxHeight: "500px",
            overflowY: "auto",
            border: "1px solid #333333",
            borderRadius: "12px",
            background: "rgba(20, 20, 20, 0.8)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `60px repeat(${checkedUsers.length}, 1fr)`,
              gap: 0,
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: "15px 10px",
                borderBottom: "2px solid #333333",
                fontWeight: "600",
                background: "linear-gradient(145deg, #1a1a1a, #0a0a0a)",
                color: "#ffffff",
              }}
            ></div>
            {checkedUsers.map((user) => (
              <div
                key={user._id}
                style={{
                  padding: "15px",
                  borderBottom: "2px solid #333333",
                  borderLeft: "1px solid #333333",
                  fontWeight: "600",
                  textAlign: "center",
                  background: "linear-gradient(145deg, #1a1a1a, #0a0a0a)",
                  color: "#ffffff",
                  textShadow: "0 1px 2px rgba(0, 0, 0, 0.5)",
                }}
              >
                {user.name}
              </div>
            ))}

            {/* Time rows */}
            {times.map((time) => (
              <React.Fragment key={time}>
                <div
                  style={{
                    padding: "12px 10px",
                    fontWeight: "500",
                    color: "#888888",
                    fontSize: "13px",
                    borderBottom: "1px solid #333333",
                    borderRight: "1px solid #333333",
                    background: "linear-gradient(145deg, #1a1a1a, #0a0a0a)",
                  }}
                >
                  {time}
                </div>
                {checkedUsers.map((user) => (
                  <div
                    key={`${time}-${user._id}`}
                    style={{
                      padding: 0,
                      borderBottom: "1px solid #333333",
                      borderLeft: "1px solid #333333",
                      minHeight: "55px",
                      background: "#0a0a0a",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        minHeight: "50px",
                      }}
                    >
                      <div
                        style={{
                          background:
                            "linear-gradient(180deg, #10b981, #059669)",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "11px",
                          color: "#ffffff",
                          fontWeight: "600",
                          padding: "3px",
                          textAlign: "center",
                          minHeight: "22px",
                          height: "100%",
                        }}
                      >
                        <span>60min</span>
                      </div>
                    </div>
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      ) : (
        <div
          style={{
            textAlign: "center",
            padding: "30px",
            color: "#94a3b8",
            fontSize: "16px",
            fontWeight: "500",
          }}
        >
          Loading users...
        </div>
      )}
    </div>
  );
};

export default page;
