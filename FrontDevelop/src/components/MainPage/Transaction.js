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
import ButtonAppBar from "./ButtonAppBar";
import "../../styles/MainPage/Transaction.css";
import { useState, useEffect } from "react";

const transactions = [
  {
    id: 1,
    position: "Auguest 1 Street",
    Time: "1 Hours",
    Price: "$10",
    Date: "01/09/2023",
  },
  {
    id: 2,
    position: "Auguest 2 Street",
    Time: "2 Hours",
    Price: "$20",
    Date: "02/09/2023",
  },
  {
    id: 3,
    position: "Auguest 3 Street",
    Time: "3 Hours",
    Price: "$30",
    Date: "03/09/2023",
  },
];

const Transaction = (props) => {
  const [titleOpacity, setTitleOpacity] = useState(0);

  useEffect(() => {
    setTitleOpacity(1);
  }, []);
  return (
    <div className="pageContainer">
      <ButtonAppBar />
      <div style={{ marginTop: 100 }}>
        <Container>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="back"
            onClick={() => window.history.back()}
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
