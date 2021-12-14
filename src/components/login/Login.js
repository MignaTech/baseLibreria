import { Component } from "react";
import axios from "axios";
import { useState } from "react";
import { Form, Alert, FormGroup, Label, Input, Button } from "reactstrap";
import "./Login.css";

const LoginUsingHooks = (props) => {
  const [estado, guardarEstado] = useState({
    UserName: "",
    Password: "",
    error: false,
    prev: props.location.state.from.pathname,
  });

  const doLogin = () => {
    axios
      .post(
        "http://localhost:5000/api/users/authenticate",
        {
          firstName: "",
          lastName: "",
          userName: estado.UserName,
          password: estado.Password,
          token: "",
        },
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      )
      .then(
        (response) => {
          if (response.status === 200) {
            const json = response.data;
            localStorage.setItem("ACCESS_TOKEN", json.token);
            props.history.push(estado.prev);
          }
        },
        (error) => {
          if (error.response.status === 400) {
            guardarEstado((prevState) => {
              return {
                ...prevState,
                error: true,
              };
            });
          }
          console.log("Exception " + error);
        }
      );
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const val = e.target.value;

    guardarEstado((prevState) => {
      return {
        ...prevState,
        [name]: val,
      };
    });
  };

  return (
    <div>
      <Alert
        isOpen={estado.error}
        color="danger"
        toggle={() => {
          guardarEstado((prevState) => {
            return { ...prevState, error: false };
          });
        }}
      >
        User or Password Incorrect!
      </Alert>
      <div className="Login">
        <Form>
          <FormGroup>
            <Label>Usuario</Label>
            <Input
              name="UserName"
              type="text"
              onChange={handleChange}
              value={estado.UserName}
            />
          </FormGroup>
          <FormGroup>
            <Label>Contraseña</Label>
            <Input
              type="password"
              name="Password"
              onChange={handleChange}
              value={estado.namePassword}
            />
          </FormGroup>
          <Button block type="button" onClick={doLogin}>
            login
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default LoginUsingHooks;
