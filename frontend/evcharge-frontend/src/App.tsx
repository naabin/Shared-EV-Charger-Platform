import axios from "axios";
import React, { useEffect, useState } from "react";
const BASE_URL = "http://127.0.0.1:8000/";
function App() {
  const [title, setTitle] = useState("");
  useEffect(() => {
    axios.get(BASE_URL).then((res) => {
      setTitle(res.data.message);
    });
  });
  return (
    <div style={{ display: "flex", justifyContent: "center" }} className="App">
      <h1>{title && title}</h1>
    </div>
  );
}

export default App;
