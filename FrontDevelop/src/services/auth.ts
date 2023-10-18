import axios from 'axios';

export const login = async (email: string, password: string) => {
  const response = await fetch("http://localhost:8000/user/auth/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (response.status === 200) {
    return { status: 200, data: await response.json() };
  } else {
    const errorData = await response.json();
    return { status: response.status, ...errorData };
  }
};

export const register = async (user: any) => {
  try {
    await fetch("http://localhost:8000/user/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));

    // return await response.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getChargers = async () => {
  try {
    const response = await axios.get("http://localhost:8000/charger/");
    localStorage.setItem("chargers", JSON.stringify(response.data));
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const setLocalAuth = (user: any) => {
  localStorage.setItem("user", JSON.stringify(user));
};


export const getUserById = async (userId: any) => {
  try {
    const response = await axios.get(`http://localhost:8000/user/${userId}`);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to retrieve user information.");
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getOwnerDetails = async (renterId: any) => {
  try {
    const response = await axios.get(`http://localhost:8000/user/${renterId}`);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to retrieve owner information.");
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

