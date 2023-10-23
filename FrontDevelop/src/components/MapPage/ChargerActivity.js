import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Modal } from "antd";
import { StepContent, Alert } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  LocalizationProvider,
  MobileDateTimePicker,
} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import PayPage from "../Pay_Page/PayPage";
import axios from "axios";
export const ChargerActivity = (props) => {
  const [activeStep, setActiveStep] = useState(0);
  const { charger, handleOk, handleCancel } = props;
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [startError, setStartError] = useState(null);
  const [endTimeError, setEndTimeError] = useState(null);
  const [hours, setHours] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };
  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };
  const onOk = () => {
    handleOk();
  };
  const onCancel = () => {
    handleCancel();
  };
  const handleSubmit = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.access && user.id) {
      const data = {
        state: "request",
        user: user.id,
        start_time: startTime,
        end_time: endTime,
        duration: hours,
        charger: charger.id,
        total_price: hours * charger.hourly_rate,
      };
      axios
        .post("http://localhost:8000/charger-activity/", JSON.stringify(data), {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.access}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          setShowInfo(true);
          handleNext();
        })
        .catch((err) => console.log(err));
    }
  };
  const handleStartTime = (startTime) => {
    if (dayjs(startTime).isBefore(new Date())) {
      setStartError("Start time cannot be in the past time. Change the time");
      return;
    }
    setStartTime(startTime);
    if (endTime !== null) {
      handleEndTime(endTime);
    }
    setStartError(null);
  };
  const handleEndTime = (endTime) => {
    if (endTime) {
      if (dayjs(endTime).isBefore(startTime)) {
        setEndTimeError(
          "End time cannot be before start time. Change the end time"
        );
        return;
      }
      const hours = dayjs(endTime).diff(startTime, "hour");
      if (hours < 2) {
        setEndTimeError("Duration should be more than 2 hours");
        return;
      }
      if (hours > 8) {
        setEndTimeError(
          "Duration cannot be greater than 8 hours. Change your time."
        );
      }
      setHours(hours);
      setEndTimeError(null);
      setEndTime(endTime);
    }
  };
  return (
    <Modal
      onOk={onOk}
      onCancel={onCancel}
      open={true}
      title="Schedule charge for your vehicle"
    >
      <Box width={"100%"}>
        <Stepper activeStep={activeStep} orientation="vertical">
          <Step>
            <StepLabel>Charger Details</StepLabel>
            <StepContent>
              <Grid container>
                <Grid item xs={12}>
                  <Typography>You have selected {charger.name}</Typography>
                  <p>
                    <strong>Location: </strong> {charger.address.street_address}
                    , {charger.address.suburb}
                  </p>
                  <p>
                    <strong>Hourly Rate: </strong> {charger.hourly_rate}
                  </p>
                  <p>
                    <strong>Status: </strong>{" "}
                    {charger.status ? "Available" : "Unavailable"}{" "}
                  </p>
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" onClick={handleNext}>
                    Next
                  </Button>
                </Grid>
              </Grid>
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Schedule</StepLabel>
            <StepContent>
              <Grid container spacing={2}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Grid item xs={12}>
                    <MobileDateTimePicker
                      value={dayjs(startTime)}
                      closeOnSelect
                      format="DD/MM/YYYY hh:mm a"
                      disablePast
                      onAccept={(e) => handleStartTime(e.$d)}
                      defaultValue={dayjs(new Date())}
                      label="Start Time"
                    />
                    {startError && <Alert severity="error">{startError}</Alert>}
                  </Grid>
                  <Grid item xs={6}>
                    <MobileDateTimePicker
                      format="DD/MM/YYYY hh:mm a"
                      disablePast
                      closeOnSelect
                      value={dayjs(endTime)}
                      onAccept={(e) => handleEndTime(e.$d)}
                      label="Finish Time"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    {endTimeError && (
                      <Alert severity="error">{endTimeError}</Alert>
                    )}
                    {hours > 0 && (
                      <Alert severity="info">
                        You have selected for {hours} hours
                      </Alert>
                    )}
                  </Grid>
                </LocalizationProvider>

                <Grid item xs={12}>
                  <Button onClick={handleBack}>Back</Button>
                  <Button
                    disabled={
                      endTimeError !== null ||
                      startError !== null ||
                      hours < 2 ||
                      hours > 8
                    }
                    variant="contained"
                    onClick={handleNext}
                  >
                    Next
                  </Button>
                </Grid>
              </Grid>
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Payment</StepLabel>
            <StepContent>
              <PayPage hours={hours} rate={charger.hourly_rate} />
              <Grid item xs={12}>
                <Button onClick={handleBack}>Back</Button>
                <Button variant="contained" onClick={handleSubmit}>
                  Next
                </Button>
              </Grid>
            </StepContent>
          </Step>
        </Stepper>
        <Grid container>
          {showInfo && (
            <Grid item xs={12}>
              <Typography>
                <p>
                  You have been scheduled from{" "}
                  <strong>{startTime.toLocaleDateString()}</strong> to{" "}
                  <strong>{endTime.toLocaleDateString()}</strong> for{" "}
                  <strong>{hours} hours </strong>to charger your vehicle. You
                  will shortly get confirmation email.
                </p>
              </Typography>
            </Grid>
          )}
        </Grid>
      </Box>
    </Modal>
  );
};
