import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  Button,
  Container,
  ListItemText,
  Divider,
  IconButton,
} from "@mui/material";
import ButtonAppBar from "../utils/ButtonAppBar";
import "../../styles/MainPage/Transaction.css";
import { useState, useEffect } from "react";
import LiveChat from "../MapPage/LiveChat";


const Transaction = (props) => {
  const [titleOpacity, setTitleOpacity] = useState(0);
  const [showLiveChat, setShowLiveChat] = useState(false);
  useEffect(() => {
    setTitleOpacity(1);
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
            // onClick={() => window.history.back()}
            onClick={() => window.location.href = "/mapPage"}
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
            XXX's Transaction History
          </Typography>

          <List>
            {transactions.map((transaction, index) => (
              <div key={transaction.id}>
                <ListItem>
                  <ListItemText
                    primary={`${transaction.position} - ${transaction.Date}`}
                    secondary={`${transaction.Time} - ${transaction.Price}`}
                  />
                  <Button style={{ marginLeft: "auto" }} onClick={props.change}>
                    Need Help With Transaction
                  </Button>
                </ListItem>
                {index !== transactions.length - 1 && <Divider />}
              </div>
            ))}
          </List>
        </Container>
      </div>
    </div>
  );
};

export default Transaction;
