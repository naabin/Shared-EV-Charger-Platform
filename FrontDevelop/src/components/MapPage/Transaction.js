import React from "react";
import {
  Typography,
  IconButton,
  Container,
  Chip,
  Tooltip,
} from "@mui/material";
import ButtonAppBar from "../utils/ButtonAppBar";
import "../../styles/MainPage/Transaction.css";
import { useState, useEffect } from "react";
import axios from "axios";
import DoneRounded from "@mui/icons-material/DoneRounded";
import HighlightOff from "@mui/icons-material/HighlightOff";
import ElectricalServices from "@mui/icons-material/ElectricalServices";

import { DataGrid } from "@mui/x-data-grid";
import dayjs from "dayjs";
import LiveChat from "./LiveChat";
import { useNavigate } from "react-router-dom";

const Transaction = (props) => {
  const navigate = useNavigate();
  const [activities, setActivities] = useState([]);
  const [titleOpacity, setTitleOpacity] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);
  const [showLiveChat, setShowLiveChat] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const [requestedUsers, setRequestedUsers] = useState([]);
  const [chargers, setChargers] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleApprove = (activityId) => {
    axios
      .post(
        `http://localhost:8000/charger-activity/approve/`,
        {},
        {
          params: {
            activityId,
          },
          headers: {
            Authorization: `Bearer ${currentUser.access}`,
          },
        }
      )
      .then((res) => {
        const updatedActivity = res.data;
        const arr = [...activities];
        const updatedAcitivityIndex = arr.findIndex(
          (act) => act.id === updatedActivity.id
        );
        arr.splice(updatedAcitivityIndex, 1, updatedActivity);
        setActivities(arr);
      })
      .catch((err) => console.log(err));
  };
  const handleRejected = (activityId) => {
    axios
      .post(
        `http://localhost:8000/charger-activity/reject/`,
        {},
        {
          params: {
            activityId,
          },
          headers: {
            Authorization: `Bearer ${currentUser.access}`,
          },
        }
      )
      .then((res) => {
        const updatedActivity = res.data;
        const arr = [...activities];
        const updatedAcitivityIndex = arr.findIndex(
          (act) => act.id === updatedActivity.id
        );
        arr.splice(updatedAcitivityIndex, 1, updatedActivity);
        setActivities(arr);
      })
      .catch((err) => console.log(err));
  };
  const columns = [
    {
      field: "charger",
      headerName: "Charer",
      width: 150,
      renderCell: (p) => {
        const row = p.row;
        const charger = chargers.filter((curr) => curr.id === row.charger);
        return (
          <Tooltip key={charger[0] && charger[0].id} arrow>
            <IconButton>
              <ElectricalServices color="warning"></ElectricalServices>
              <span style={{ fontSize: "15px" }}>
                {charger[0] && charger[0].name}
              </span>
            </IconButton>
          </Tooltip>
        );
      },
    },
    {
      field: "user",
      headerName: "Requested By",
      width: 130,

      renderCell: (p) => {
        const row = p.row;
        const currUser = requestedUsers.filter((curr) => curr.id === row.user);
        if (currUser.length > 0) {
          return (
            <>
              <Chip
                onClick={(e) => console.log(e)}
                size="small"
                color="secondary"
                label={currUser[0].username}
              />
            </>
          );
        }
      },
    },
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
      width: 100,
      renderCell: (params) => {
        if (params.row && params.row.owner) {
          if (params.row.owner === currentUser.id) {
            if (params.row.approve || params.row.reject) {
              const state = params.row.state;
              return (
                <Chip
                  size="small"
                  label={state}
                  color={state === "Approved" ? "success" : "error"}
                />
              );
            }
            return (
              <>
                <div>
                  <IconButton
                    onClick={() => handleApprove(params.row.id)}
                    color="success"
                  >
                    <DoneRounded />
                  </IconButton>
                  <IconButton
                    onClick={() => handleRejected(params.row.id)}
                    color="error"
                  >
                    <HighlightOff />
                  </IconButton>
                </div>
              </>
            );
          } else {
            const approved = params.row.approve;
            if (approved) {
              return <Chip color="success" size="small" label="Approved" />;
            } else if (params.row.reject) {
              return <Chip color="error" size="small" label="Rejected" />;
            }
            return <Chip size="small" color="primary" label="Pending" />;
          }
        }
      },
    },
    {
      field: "action2",
      headerName: "",
      width: 150,
      renderCell: (params) => {
        const row = params.row;
        if (row && row.owner) {
          if (row.owner === currentUser.id) {
            if (!row.approve && !row.reject) {
              return <Chip size="small" label="new" color="success" />;
            }
          }
        }
      },
    },
  ];
  useEffect(() => {
    setTitleOpacity(1);
    setCurrentUser(user);
    setLoading(true);
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
        .then((res) => {
          setActivities(res.data);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:8000/charger/")
      .then((res) => setChargers(res.data));
  }, []);
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:8000/user/")
      .then((res) => setRequestedUsers(res.data));
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
            // variant="h4"
            style={{
              margin: "30px 0",
              transition: "opacity 1s",
              opacity: titleOpacity,
            }}
          >
            <Typography>{`${user.username}'s Transaction History`}</Typography>
          </Typography>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid loading={loading} rows={activities} columns={columns} />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Transaction;
