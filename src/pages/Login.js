import React from "react";
import {
  Container,
  Row,
  Col,
  InputGroup,
  Input,
  Button,
} from "reactstrap";
import "./styles.css";
import { withAlert } from "react-alert";

import defaultState from "../defaultState/login";
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = JSON.parse(JSON.stringify(defaultState));
    this.loginMe = this.loginMe.bind(this);
  }
  stateChange = (value, e) => {
    this.setState({
      [value]: e.target.value
    });
  };
  loginMe = () => {
    const { username, password } = this.state;
    if (
      username === null ||
      password === null ||
      username.length < 6 ||
      password.length <= 7
    ) {
      this.props.alert.error("Please fill in the form");
    } else {
      this.props.alert.success("Login Successfull");
    }
  };
  render() {
    const { username, password } = this.state;
    return (
      <Container fluid={true}>
        <Row>
          <Col className={"header"} lg={{ offset: 4, size: 4 }}>
            <h3>NAC Admin Console</h3>
            <br />
            <InputGroup>
              {/* <InputGroupAddon addonType="prepend">email</InputGroupAddon> */}
              <Input
                placeholder="username"
                type={"text"}
                defaultValue={username}
                onChange={e => this.stateChange("username", e)}
              />
            </InputGroup>
            <br />
            <InputGroup>
              {/* <InputGroupAddon addonType="prepend">passw</InputGroupAddon> */}
              <Input
                placeholder="password"
                type={"password"}
                defaultValue={password}
                onChange={e => this.stateChange("password", e)}
              />
            </InputGroup>
            <br />
            <Button color="primary" onClick={e => this.loginMe()}>
              Login
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withAlert()(Login);
