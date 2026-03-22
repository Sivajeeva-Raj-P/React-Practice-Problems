import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const register = () => {
    if (!name || !email || !password) {
      alert("All fields required");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    users.push({ name, email, password, urls: [] });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registered successfully");
    navigate("/");
  };

  return (
    <>
      <Navbar />
      <div className="card">
        <h2>Register</h2>
        <input placeholder="Name" onChange={e => setName(e.target.value)} />
        <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <input
          type="password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />
        <button onClick={register}>Register</button>
      </div>
    </>
  );
}

export default Register;
