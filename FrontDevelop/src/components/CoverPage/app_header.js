import "../../styles/CoverPage/app_header.css";
import React from "react";
import { Button, Col, Row } from "antd";
import { useNavigate } from 'react-router-dom'; // Use this import for React Router v6
import carLogo from "../../matirial/Image/car.png";

function AppHeader(props) {
  const navigate = useNavigate(); // Use this line for React Router v6

  const handleLoginClick = () => {
    if (props.change) {
      props.change();
    }
    navigate('/login');
  };

  const handleRegisterClick = () => {
    if (props.change) {
      props.change();
    }
    navigate('/register');
  };

  return (
      <>
        <div className="app-header">
          <Row>
            <Col span={3}>
              <div className="title">EV Shared Charger</div>
            </Col>
            <Col span={2}>
              <div className="operate-btn">
                <Button
                    className="btn-register"
                    type="text"
                    onClick={handleRegisterClick}
                >
                  Register
                </Button>
                <Button
                    className="btn-login"
                    type="text"
                    onClick={handleLoginClick}
                >
                  Login
                </Button>
              </div>
            </Col>
          </Row>
        </div>
        <div className="app-image">
          <img className="header-image" src={carLogo} alt="car" />
        </div>
      </>
  );
}

export default AppHeader;
