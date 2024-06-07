/* /pages/login.js */

import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Alert
} from "reactstrap";
import { login } from "../components/auth";
import AppContext from "../components/context";
import Cookies from "js-cookie";

function Login(props) {
  const [data, updateData] = useState({ identifier: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const appContext = useContext(AppContext);
  
  // useEffect(() => {
  //   if (appContext.isAuthenticated) {
  //     router.push("/"); // redirect if you're already logged in
  //   }
  // }, []);

  function onChange(event) {
    updateData({ ...data, [event.target.name]: event.target.value });
  }

  const handleLogin = () => {
    setLoading(true);
    setError(null);

    if (data.identifier == "" || data.password == "") {
      setError("Please input email and password.");
      setLoading(false);
      return;
    }

    setLoading(true);
    login(data.identifier, data.password)
      .then((res) => {
        setLoading(false);
        // set authed User in global context to update header/app state
        appContext.setUser(res.data.user);
        Cookies.set('user', JSON.stringify(res.data.user));
      })
      .catch((error) => {
        setError("Login failed. " +  error.response.data.message);
        setLoading(false);
      });
  };

  return (
    <Container>
      <Row>
        <Col sm="12" md={{ size: 5, offset: 3 }}>
          <div className="paper">
            <div className="header">
              <h2>Sign In</h2>
            </div>
            <section className="wrapper">
              <Form>
                <fieldset disabled={loading}>
                  <FormGroup>
                    <Label>Email</Label>
                    <Input
                      onChange={(event) => onChange(event)}
                      name="identifier"
                    />
                  </FormGroup>
                  <FormGroup style={{ marginBottom: 30 }}>
                    <Label>Password</Label>
                    <Input
                      onChange={(event) => onChange(event)}
                      type="password"
                      name="password"
                    />
                  </FormGroup>

                  <FormGroup>
                    <Button
                      color="primary"
                      className="btn-block"
                      onClick={handleLogin}
                    >
                      {loading ? "Loading... " : "Sign In"}
                    </Button>
                  </FormGroup>
                  {error && (
                    <Alert color="danger" toggle={() => setError(null)}>
                      {error}
                    </Alert>
                  )}
                </fieldset>
              </Form>
            </section>
          </div>
        </Col>
      </Row>
      <style jsx>
        {`
          .paper {
            border: 1px solid lightgray;
            box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
              0px 1px 1px 0px rgba(0, 0, 0, 0.14),
              0px 2px 1px -1px rgba(0, 0, 0, 0.12);
            border-radius: 6px;
            margin-top: 90px;
          }
          .notification {
            color: #ab003c;
          }
          .header {
            width: 100%;
            padding: 10px;
            background-color: #5C2FC2;
            color: white;
            text-align:center;
            border-radius-top: 6px;
          }
          .wrapper {
            padding: 10px 30px 20px 30px !important;
          }
          a {
            color: blue !important;
          }
          img {
            margin: 15px 30px 10px 50px;
          }
        `}
      </style>
    </Container>
  );
}

export default Login;
