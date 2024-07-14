import { createContext, useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types"; // Add this line to import PropTypes

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  // Add prop validation for 'children'
  AuthContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user") || null)
  ); // Everything in local storage is stored as a string so we need to parse it into a JSON object or null if there's nothing stored there.

  const login = async (inputs) => {
    const result = await axios.post("/api/auth/login", inputs);
    setCurrentUser(result.data);
  };

  const logout = async () => {
    await axios.post("/api/auth/logout");
    setCurrentUser(null);
  };

  // Everytime the current user changes we store it in local storage.
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  // Now we can user currentUser, login and logout anywhere in the children of the context.
  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
