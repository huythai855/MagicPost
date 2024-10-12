import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import waveImage from "../data/wave.png";
import avatar from "../data/avatar.svg";
import bg from "../data/bg.svg";
import MagicPost from "./MagicPost";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  // setCookie("username", "", 1);
  // setCookie("id", "", 1);
  // setCookie("fullname", "", 1);
  // setCookie("role", "", 1);

  function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
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

    if (password.length < 2) {
      setPasswordError("Mật khẩu phải lớn hơn hoặc bằng 8 ký tư");
      return;
    }
    var data = {
      username: email,
      password: password,
    };

    console.log(data);
    var request = new XMLHttpRequest();
    request.open("POST", "http://localhost:3001/api/login", true);
    request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    request.send(JSON.stringify(data));

    request.onload = function () {
      if (request.status >= 200 && request.status < 400) {
        var data = JSON.parse(request.responseText);
        console.log(data);
        if (data.message == "Login success") {
          // document.cookie = 'token=' + data.user;
          setCookie("username", data.username, 1);
          setCookie("id", data.id, 1);
          setCookie("fullname", data.fullname, 1);
          setCookie("role", data.role, 1);
          setCookie("department_id", data.department_id, 1);

          console.log(document.cookie);
          localStorage.setItem("role", data.role);
          localStorage.setItem("username", data.username);
          localStorage.setItem("fullname", data.fullname);
          localStorage.setItem("department_id", data.department_id);

          if (data.role === "director")
            window.location.href = "http://localhost:3000/director";
          else if (data.role === "gathering_point_leader")
            window.location.href = "http://localhost:3000/gp_lead";
          else if (data.role === "transaction_point_leader")
            window.location.href = "http://localhost:3000/tp_lead";
          else if (data.role === "gathering_point_staff")
            window.location.href = "http://localhost:3000/gp_employee";
          else if (data.role === "transaction_point_staff")
            window.location.href = "http://localhost:3000/tp_employee";
          else if (data.role === "shipper")
            window.location.href = "http://localhost:3000/shipper";
          else {
            alert("Invalid username or password");
          }
        }
      } else {
        console.log("error");
      }
    };
  };

  return (
    <div>
      <img className="wave" src={waveImage} alt="Wave" />
      <div className="container_login">
        <div className="img">
          <img src={bg} />
        </div>
        <div className="login-content">
          <form onSubmit={onButtonClick}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img className="h-28" src={avatar} alt="Avatar" />
            </div>

            <h2 className="title">Welcome</h2>
            <div className="input-div one">
              <div className="i">
                <FontAwesomeIcon icon={faUser} />
              </div>
              <div className="div">
                <input
                  type="text"
                  value={email}
                  placeholder="Tên đăng nhập"
                  onChange={(ev) => setEmail(ev.target.value)}
                  className="input"
                />
                <label className="errorLabel">{emailError}</label>
              </div>
            </div>
            <div className="input-div pass">
              <div className="i">
                <FontAwesomeIcon icon={faLock} />
              </div>
              <div className="div">
                <input
                  type="password"
                  value={password}
                  placeholder="Mật khâu"
                  onChange={(ev) => setPassword(ev.target.value)}
                  className="input"
                />
                <label className="errorLabel">{passwordError}</label>
              </div>
            </div>
            <input type="submit" value={"Đăng nhập"} className="btn" />
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
