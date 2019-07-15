import React from "react";
import "./stylesheet/stylesheet.css";
import Inputfield from "../../components/inputField/inputField";
import { Button } from "reactstrap";
import request from "../../utils/request";
import defaultState from "../../defaultState/login";
import { withAlert } from "react-alert";
import config from "../../config";
class Loginpage extends React.Component {
  constructor(props) {
    super(props);
    this.loginSubmit = this.loginSubmit.bind(this);
    this.commonStateChange = this.commonStateChange.bind(this);
    this.state = JSON.parse(JSON.stringify(defaultState));
  }
  commonStateChange = async (e, value) => {
    this.setState({
      [value]: e.target.value
    });
  };
  loginSubmit = async (evt, alert) => {
    evt.preventDefault();
    const { username, password } = this.state;
    let data = {
      type: config.loginType,
      [config.loginType]: username,
      password
    };
    try {
      const userData = await request(config.apiURL, "POST", data);
      console.log(userData);
    } catch (err) {
      console.log(err);
      alert.error("Can't connect to server. Please contact the admin");
    }
  };
  render() {
    const { email, password } = this.state;
    return (
      <div>
        <div className="login">
          <div>
            <h2>Login</h2>
          </div>
          <form onSubmit={e => this.loginSubmit(e, this.props.alert)}>
            <Inputfield
              name="Username"
              type="text"
              defaultValue={email}
              onChange={e => this.commonStateChange(e, "username")}
            />
            <Inputfield
              name="Password"
              type="password"
              defaultValue={password}
              onChange={e => this.commonStateChange(e, "password")}
            />
            <div style={{ paddingTop: "32px" }}>
              <Button className="loginButton" type="submit">
                Log in
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withAlert()(Loginpage);
