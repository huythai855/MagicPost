import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"

const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    
    const navigate = useNavigate();

    setCookie('username', '', 1);
    setCookie('id', '', 1);
    setCookie('fullname', '', 1);
    setCookie('role', '', 1);

    function setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        let expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
        
    const onButtonClick = () => {
        setEmailError("");
        setPasswordError("");
        // Check if the user has entered both fields correctly
        if ("" === email) {
            setEmailError("Vui lòng nhập tên đăng nhập");
            return;
        }

        if ("" === password) {
            setPasswordError("Vui lòng nhập mật khẩu");
            return;
        }

        if (password.length < 7) {
            setPasswordError("Mật khẩu phải lớn hơn hoặc bằng 8 ký tư");
            return;
        }
        var data = {
            username: email,
            password: password
        };

        console.log(data);
        var request = new XMLHttpRequest();
        request.open('POST', 'http://localhost:3001/api/login', true);
        request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        request.send(JSON.stringify(data));

        request.onload = function() {
            if (request.status >= 200 && request.status < 400) {
                var data = JSON.parse(request.responseText);
                console.log(data);
                if (data.message == 'Login success') {
                    // document.cookie = 'token=' + data.user;
                    setCookie('username', data.username, 1);
                    setCookie('id', data.id, 1);
                    setCookie('fullname', data.fullname, 1);
                    setCookie('role', data.role, 1);
                    setCookie('department_id', data.department_id, 1);

                    console.log(document.cookie);
                    window.location.href = 'http://localhost:3001/home';
                } else {
                    alert('Invalid username or password');
                }
            } else {
                console.log('error');
            }
        };
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
            <button 
            onClick={onButtonClick}
            className="focus:outline-none text-white bg-buttonCreate hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 fl">
            Đăng nhập</button>
        </div>
    </div>
    );
};

export default Login;