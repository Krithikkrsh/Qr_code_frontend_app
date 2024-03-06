import { useState } from "react";
import "./styles/LoginForm.css";
import { useSharedState } from "./SharedContext";


const Login = () => {
  const [submitted, setSubmitted] = useState(false);
  const { state } = useSharedState();
  console.log(state,"own state");

  const formSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ userName: event.target[0].value, "password": event.target[1].value, "token": state.updatedState }),
    };

    console.log(requestOptions, "request");
    fetch('http://192.168.76.211:8080/login', requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log("Login Api Data", data);
        if (data.status === "200") {
          // props.changeUser(data.userName);
          console.log('login user', data.user);
          // window.open("about:blank", "_self");
          // window.close();
        }

      })
      .catch(err => console.log("Login", err));
  }

  return (
    <>
      <div className="login-container">
        <form className="login-form" onSubmit={formSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
          />

          <button type="submit">Submit</button>
        </form>

        {submitted && (
          <div className="acknowledgment">
            <p>Submitted.</p>
          </div>
        )}
      </div>
    </>
  )
}

export default Login;