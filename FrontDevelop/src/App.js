import "./App.css";
import LoginForm from "./components/Login/LoginForm";
import RegisterForm from "./components/Register/RegisterForm";
import RetrieveForm from "./components/Retrieve/RetrieveForm";
import AppHeader from "./components/CoverPage/app_header";
import AlterImage from "./components/CoverPage/AlterImage";
import React, { useContext, useState } from "react";
import JoinUsBlock from "./components/CoverPage/JoinUsBlock";
import LowCarbonBlock from "./components/CoverPage/LowCarbonBlock";
import AdvantageBlock from "./components/CoverPage/AdvantageBlock";
import AppBottom from "./components/CoverPage/app-bottom";
import ModalForm from "./components/CoverPage/ModalForm";
import rightImg1 from "./matirial/Image/rightimg-1.png";
import rightImg2 from "./matirial/Image/rightimg-2.png";
import rightImg3 from "./matirial/Image/righting-3.png";
import ButtonAppBar from "./components/utils/ButtonAppBar";
import Transaction from "./components/MapPage/Transaction";
import MyCharger from "./components/MapPage/MyCharger";
import GoogleMapComponent from "./components/MapPage/GoogleMapComponent";
import LiveChat from "./components/MapPage/LiveChat";
import AdminPage from "./components/Admin/AdminPage";
import LoadingImg from "./components/utils/LoadingImg";
import UpdatingCharger from "./components/MainPage/UpdatingChargerModel";
import { AuthContext, AuthProvider } from "./services/AuthContext";
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
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { LoadScript } from "@react-google-maps/api";
import ProfilePage from "./components/MapPage/Profile";
import { ProtectedRoute } from "./services/ProtectedRoute";

function App() {
  return (
    <LoadScript
      googleMapsApiKey="AIzaSyDnRpQ2BiFb6skH2qkvgCW0Bthwb83PVf0"
      libraries={["places"]}
    >
      <AuthProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route index path="/" element={<MainPage />} />
              <Route
                path="/mapPage"
                element={
                  <ProtectedRoute>
                    <MapPage />
                  </ProtectedRoute>
                }
              />
              <Route path="/TransactionPage" element={<TranscationPage />} />
              <Route
                path="/myCharger"
                element={
                  <ProtectedRoute>
                    <MyChargerPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/AdminPage"
                element={
                  <ProtectedRoute>
                    <Adminpage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/ProfilePage"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route path="/login/" element={<LoginForm />} />
              <Route path="/register/" element={<RegisterForm />} />
              <Route path="/retrieve/" element={<RetrieveForm />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </LoadScript>
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
      <LoadingImg />
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
      <ModalForm />
    </div>
  );
}

function MapPage() {
  const { authData } = useContext(AuthContext);
  console.log(authData); // Log the authData to see if it's being passed down correctly

  const navigate = useNavigate();
  const [showLiveChat, setShowLiveChat] = useState(false);
  const [center, setCenter] = useState({
    lat: -33.8688, // Latitude for Sydney
    lng: 151.2093, // Longitude for Sydney
  });

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete();

  const defaultProps = {
    zoom: 10,
  };

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      setCenter({ lat, lng });
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="map-wrapper">
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

      <GoogleMapComponent
        bootstrapURLKeys={{ key: "AIzaSyDnRpQ2BiFb6skH2qkvgCW0Bthwb83PVf0" }}
        center={center}
        defaultProps={defaultProps}
        onPlaceSelect={handleSelect}
        ready={ready}
        value={value}
        suggestions={{ status, data }}
        setValue={setValue}
      />
    </div>
  );
}

function LiveChatPage() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <LiveChat />
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

function Profile() {
  const [showDialog, setShowDialog] = useState(false);
  return <ProfilePage />;
}

export default App;
