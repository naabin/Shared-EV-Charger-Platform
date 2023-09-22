import "./App.css";
import LoginForm  from "./components/Login/LoginForm";
import RegisterForm from "./components/Register/RegisterForm";
import RetrieveForm from "./components/Retrieve/RetrieveForm";
import AppHeader from "./components/CoverPage/app_header";
import AlterImage from "./components/CoverPage/AlterImage";
import React, { useState } from "react";
import JoinUsBlock from "./components/CoverPage/JoinUsBlock";
import LowCarbonBlock from "./components/CoverPage/LowCarbonBlock";
import AdvantageBlock from "./components/CoverPage/AdvantageBlock";
import AppBottom from "./components/CoverPage/app-bottom";
import ModalForm from "./components/CoverPage/ModalForm";
import rightImg1 from "./matirial/Image/rightimg-1.png";
import rightImg2 from "./matirial/Image/rightimg-2.png";
import rightImg3 from "./matirial/Image/righting-3.png";
import ButtonAppBar from "./components/MainPage/ButtonAppBar";
import Transaction from "./components/MainPage/Transaction";
import MyCharger from "./components/MainPage/MyCharger";
import AdminPage from "./components/Admin/AdminPage";

import {

  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Outlet,
  useNavigate,
} from "react-router-dom";

import HelpModel from "./components/MainPage/HelpModel";
import AddChargerModel from "./components/MainPage/AddChargerModel";
import GoogleMapReact from 'google-map-react';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/mapPage" element={<MapPage />} />
          <Route path="/transcationPage" element={<TranscationPage />} />
          <Route path="/myCharger" element={<MyChargerPage />} />
          <Route path="/AdminPage" element={<Adminpage />} />
          <Route path="/login/" element={<LoginForm />} />
          <Route path="/register/" element={<RegisterForm />} />
          <Route path="/retrieve/" element={<RetrieveForm />} />
        </Routes>
      </div>
    </Router>
  );
}

function MainPage() {
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(false);


  const showDialogEvent = () => {
    setShowDialog(true);
  };

  const closeDialogEvent = () => {
    setShowDialog(false);
  };


  return (
    <div className="App">
      <AppHeader change={showDialogEvent}></AppHeader>
      <div className={"img-block"}>
        <div>
          <AlterImage
            leftImage={rightImg1}
            rightImage={rightImg1}
            btnText="Show on Map"
            btnShow={true}
          />
        </div>
        <div>
          <AlterImage
            leftImage={rightImg2}
            rightImage={rightImg2}
            btnText={"See More Details"}
            btnShow={true}
          />
        </div>
        <div>
          <AlterImage
            leftImage={rightImg3}
            rightImage={rightImg3}
            btnText="Contact Now"
            btnShow={true}
          />
        </div>
      </div>


      <JoinUsBlock />
      <LowCarbonBlock />
      <AdvantageBlock />
      <AppBottom />
      <ModalForm
      />
    </div>

  );



}

function MapPage() {
    const navigate = useNavigate();

    const defaultProps = {
        center: {
            lat: -33.8688, // Latitude for Sydney
            lng: 151.2093  // Longitude for Sydney
        },
        zoom: 11
    };

    return (
        <div style={{ position: 'relative', height: '100vh', width: '100vw' }}>
            <ButtonAppBar
                transactionpage={() => navigate("/TranscationPage")}
                adminpage={() => navigate("/Adminpage")}
                myChargers={() => navigate("/myCharger")}
            />

            <div style={{
                position: 'absolute',
                top: '10%',
                left: '10%',
                height: '80%',
                width: '80%'
            }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyDnRpQ2BiFb6skH2qkvgCW0Bthwb83PVf0' }}
                    defaultCenter={defaultProps.center}
                    defaultZoom={defaultProps.zoom}
                >
                </GoogleMapReact>
            </div>
        </div>
    );
}




function MyChargerPage() {
  const [showDialog, setShowDialog] = useState(false);

  const showDialogEvent = () => {
    setShowDialog(true);
  };

  const closeDialogEvent = () => {
    setShowDialog(false);
  };
  return (
    <div>
      <MyCharger change={showDialogEvent} />
      <AddChargerModel showDialog={showDialog} closeEvent={closeDialogEvent} />
    </div>
  );
}

function TranscationPage() {
  const [showDialog, setShowDialog] = useState(false);

  const showDialogEvent = () => {
    setShowDialog(true);
  };

  const closeDialogEvent = () => {
    setShowDialog(false);
  };
  return (
    <div>
      <Transaction change={showDialogEvent} />
      <HelpModel showDialog={showDialog} closeEvent={closeDialogEvent} />
    </div>
  );
}

function Adminpage() {
  return <AdminPage />;
}

export default App;
