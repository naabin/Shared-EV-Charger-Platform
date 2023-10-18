import "../../styles/CoverPage/app_header.css";
import React from "react";
import { Button, Col, Row } from "antd";
import { useNavigate } from "react-router-dom"; // Use this import for React Router v6
import carLogo from "../../matirial/Image/car.png";
import header from "../../matirial/Image/header.png";

function AppHeader(props) {
  const navigate = useNavigate(); // Use this line for React Router v6

  const handleLoginClick = () => {
    if (props.change) {
      props.change();
    }
    navigate("/login");
  };

  const handleRegisterClick = () => {
    if (props.change) {
      props.change();
    }
    navigate("/register");
  };

  return (
    <>
    <div className="app-header">
  <Row align="middle">
    <Col span={1}>
      <div>
        <img src={header} alt="Logo" className="logo" />
      </div>
    </Col>
    <Col span={1}>
      <div className="title">EV Shared Charger</div>
    </Col>
    <Col span={1}>
      <div className="operate-btn">
        <Button
          className="btn-register"
          type="text"
          style={{ color: "white",fontSize:"20px" }}
          onClick={handleRegisterClick}
        >
          Register
        </Button>
        <Button
          className="btn-login"
          type="text"
          style={{ color: "white", fontSize:"20px" }}
          onClick={handleLoginClick}
        >
          Login
        </Button>
      </div>
    </Col>
  </Row>
</div>





      {/* <div className="app-header">
        <Row>
           <div>
            <img src={header} alt="Logo" className="logo"></img>   
            <div className="title">EV Shared Charger</div>
            </div>
          
          <Col span={2} style={{ margin: "15px 10px" }}>
            <div className="operate-btn">
              <Button
                className="btn-register"
                type="text"
                style={{ color: "white" }}
                onClick={handleRegisterClick}
              >
                Register
              </Button>
              <Button
                className="btn-login"
                type="text"
                style={{ color: "white" }}
                onClick={handleLoginClick}
              >
                Login
              </Button>
            </div>
          </Col>
        </Row>
      </div> */}

    </>
  );
}

export default AppHeader;
