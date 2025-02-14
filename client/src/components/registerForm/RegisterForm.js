import "./RegisterForm.css";
import React, { useState, useContext, useEffect } from "react";
import AppContext from "../../state/AppContext";
import { useLocation, useNavigate } from "react-router-dom";

const RegisterForm = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const { user } = useContext(AppContext);
    const [email, setEmail] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [password, setPassword] = useState("");
    const location = useLocation();
    const navigate = useNavigate();

    const handleRegisterClick = () => {
        if (password === confirmPassword) {
            user.register(email, password);
            // user.login(email, password);
        }
    };

    useEffect(() => {
        user.emitter.addListener("REGISTER_SUCCESS", () => {
            setIsAuthenticated(true);
            window.localStorage.setItem("token", user.data.token);
            navigate("/");
        });
    }, []);

    return (
        <div className="login-form">
            <div className="form-container">
                <h1>Register</h1>
                <input
                    type="text"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button onClick={handleRegisterClick}>Register</button>
            </div>
        </div>
    );
};

export default RegisterForm;
