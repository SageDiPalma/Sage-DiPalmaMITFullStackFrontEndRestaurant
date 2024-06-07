/* /pages/register.js */

import React, { useState, useContext } from "react";

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
import { registerUser } from "../components/auth";
import AppContext from "../components/context";

const Register = () => {
  const [data, setData] = useState({ email: "", username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const appContext = useContext(AppContext);

  const handleRegister = () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    if(data.username == "" || data.email == "" || data.password == ""){
      setError("Please input all field.");
      setLoading(false);
      return;
    }

    registerUser(data.username, data.email, data.password)
      .then((res) => {
        // appContext.setUser(res.data.user);
        setSuccess("Registration successful!. Please sign in to start your session.");
        setLoading(false);
        setData({ email: "", username: "", password: "" })
      })
      .catch((error) => {
        setError("Registration failed. " +  error.response.data.message);
        setLoading(false);
      });
  };

  return (
    <Container>
      <Row>
        <Col sm="12" md={{ size: 5, offset: 3 }}>
          <div className="paper">
            <div className="header">
              <h2>Sign Up</h2>
            </div>
            <section className="wrapper">
              <Form>
                <fieldset disabled={loading}>
                  <FormGroup>
                    <Label>Username</Label>
                    <Input
                      disabled={loading}
                      onChange={(e) =>
                        setData({ ...data, username: e.target.value })
                      }
                      value={data.username}
                      type="text"
                      name="username"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Email</Label>
                    <Input
                      onChange={(e) =>
                        setData({ ...data, email: e.target.value })
                      }
                      value={data.email}
                      type="email"
                      name="email"
                    />
                  </FormGroup>
                  <FormGroup style={{ marginBottom: 30 }}>
                    <Label>Password</Label>
                    <Input
                      onChange={(e) =>
                        setData({ ...data, password: e.target.value })
                      }
                      value={data.password}
                      type="password"
                      name="password"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Button
                      color="primary"
                      className="btn-block"
                      disabled={loading}
                      onClick={handleRegister}
                    >
                      {loading ? "Loading.." : "Register"}
                    </Button>
                  </FormGroup>
                  {success && (
                    <Alert color="success" toggle={() => setSuccess(null)}>
                      {success}
                    </Alert>
                  )}
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
};
export default Register;
