import React from "react";
import { Typography, IconButton, Container, Chip } from "@mui/material";
import ButtonAppBar from "../utils/ButtonAppBar";
import "../../styles/MainPage/Transaction.css";
import { useState, useEffect } from "react";
import axios from "axios";
import DoneRounded from "@mui/icons-material/DoneRounded";
import HighlightOff from "@mui/icons-material/HighlightOff";

import { DataGrid } from "@mui/x-data-grid";
import dayjs from "dayjs";
import LiveChat from "./LiveChat";
import { useNavigate } from "react-router-dom";

const columns = [
  {
    field: "charger",
    headerName: "Charer",
    width: 100,
  },
  { field: "user", headerName: "Requested By", width: 130 },
  {
    field: "start_time",
    headerName: "Start time",
    width: 200,
    valueFormatter: (p) => dayjs(p.value).format("DD/MM/YYYY ddd HH:mm A"),
  },
  {
    field: "end_time",
    headerName: "End Time",
    width: 200,
    valueFormatter: (p) => dayjs(p.value).format("DD/MM/YYYY ddd HH:mm A"),
  },
  {
    field: "duration",
    headerName: "Duration",
    width: 150,
    valueFormatter: (p) => `${p.value} hrs`,
  },
  {
    field: "total_price",
    headerName: "Price",
    width: 150,
    valueFormatter: (p) => `AUD ${p.value}`,
  },
  {
    field: "action",
    headerName: "Approval",
    width: 150,
    renderCell: (params) => {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log(params.row);
      if (params.row && params.row.owner) {
        if (params.row.owner === user.id) {
          return (
            <div>
              <IconButton color="success">
                <DoneRounded />
              </IconButton>
              <IconButton color="error">
                <HighlightOff />
              </IconButton>
            </div>
          );
        } else {
          const approved = params.row.approve;
          if (approved) {
            return <Chip label="You request have been accepted" />;
          } else return <Chip label="Pending approval" />;
        }
      }
    },
  },
];

const Transaction = (props) => {
  const navigate = useNavigate();
  const [activities, setActivities] = useState([]);
  const [titleOpacity, setTitleOpacity] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);
  const [showLiveChat, setShowLiveChat] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    setTitleOpacity(1);

    setCurrentUser(user);
    if (user && user.access) {
      axios
        .get("http://localhost:8000/charger-activity/get_activity_by_owner", {
          params: {
            owner: user.id,
          },
          headers: {
            Authorization: `Bearer ${user.access}`,
          },
        })
        .then((res) => setActivities(res.data))
        .catch((err) => console.log(err));
    }
  }, []);
  return (
    <div className="pageContainer">
      <ButtonAppBar
        transactionpage={() => navigate("/TransactionPage")}
        adminpage={() => navigate("/Adminpage")}
        myChargers={() => navigate("/myCharger")}
        showLiveChat={showLiveChat}
        toggleLiveChat={() => setShowLiveChat(!showLiveChat)}
        profile={() => navigate("/ProfilePage")}
      />
      {showLiveChat && (
        <LiveChat onClose={() => setShowLiveChat(false)} show={showLiveChat} />
      )}
      <div style={{ marginTop: 100 }}>
        <Container>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="back"
            onClick={() => (window.location.href = "/mapPage")}
          >
            <Typography variant="h5">&lt; Back To Map</Typography>
          </IconButton>
          <Typography
            variant="h4"
            style={{
              margin: "30px 0",
              transition: "opacity 1s",
              opacity: titleOpacity,
            }}
          >
            <Typography variant="h4">
              {`${user.username}'s Transaction History`}
            </Typography>
          </Typography>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid rows={activities} columns={columns} />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Transaction;
