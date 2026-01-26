import { useState } from "react";
import Login from "./Login";
import Dashboard from "./Dashboard";
import "./index.css";

export default function App() {
  const [user, setUser] = useState(null);

  return user ? <Dashboard /> : <Login onLogin={setUser} />;
}
