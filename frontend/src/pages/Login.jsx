import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"

const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    
    const navigate = useNavigate();
        
    const onButtonClick = () => {
        setEmailError("");
        setPasswordError("");

        // Check if the user has entered both fields correctly
        if ("" === email) {
            setEmailError("Vui lòng nhập tên đăng nhập");
            return;
        }

        // if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        //     setEmailError("Vui lòng nhập tên đăng nhập hợp lệ");
        //     return;
        // }

        if ("" === password) {
            setPasswordError("Vui lòng nhập mật khẩu");
            return;
        }

        if (password.length < 7) {
            setPasswordError("Mật khẩu phải lớn hơn hoặc bằng 8 ký tư");
            return;
        }
    }

    return (
    <div className="mainContainer">
        <div className="titleContainer">
            <div>Magic Post</div>
        </div>
        <br />
        <div className="inputContainer">
            <input
                value={email}
                placeholder="Tên đăng nhập"
                onChange={ev => setEmail(ev.target.value)}
                className={"inputBox"} />
            <label className="errorLabel">{emailError}</label>
        </div>
        <br />
        <div className="inputContainer">
            <input
                value={password}
                placeholder="Mật khâu"
                onChange={ev => setPassword(ev.target.value)}
                className="inputBox"/>
            <label className="errorLabel">{passwordError}</label>
        </div>
        <br />
        <div className="inputContainer">
            <input
                className="inputButton"
                type="button"
                onClick={onButtonClick}
                value={"Đăng nhập"} />
        </div>
    </div>
    );
};

export default Login;