import React from "react";
import { connect } from "react-redux";
import "./stylesheet/stylesheet.css";
import { withRouter } from "react-router-dom";
import Inputfield from "../../components/inputField/inputField";
import { Button } from "reactstrap";
import defaultState from "../../defaultState/login";
import { withAlert } from "react-alert";
import config from "../../config";
import { logMeIn } from "../../actions/authentication";
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
  loginSubmit = async (evt) => {
    evt.preventDefault();
    const { username, password } = this.state;
    let data = {
      type: config.loginType,
      [config.loginType]: username,
      password
    };
    this.props.logMeIn(data);
  };
  componentDidMount() {
    const { user } = this.props;
    if (user && user.user_id) {
      this.props.history.push("/listing");
    }
  }
  componentWillReceiveProps({ user }) {
    if (user && user.user_id) {
      this.props.history.push("/listing");
    }
  }
  render() {
    const { errors } = this.props;
    const { username, password } = this.state;
    return (
      <div>
        <div className="login">
          <div>
            <h2>NAC Admin login</h2>
          </div>
          <form onSubmit={e => this.loginSubmit(e)}>
            <Inputfield
              name="Username:"
              type="text"
              defaultValue={username}
              onChange={e => this.commonStateChange(e, "username")}
            />
            {errors.email}
            <Inputfield
              name="Password:"
              type="password"
              defaultValue={password}
              onChange={e => this.commonStateChange(e, "password")}
            />
            <span
              style={{
                color: "red"
              }}
            >
              {errors.password}
            </span>

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
const mapStateToProps = state => ({
  user: state.user,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { logMeIn }
)(withRouter(withAlert()(Loginpage)));
