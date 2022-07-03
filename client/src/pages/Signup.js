import React, { useState } from "react";
import { useMutation } from "@apollo/client";
//import { SIGNUP_USER } from "../../../utils/mutations";

const Signup = (props) => {
  const classes = useStyles();
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [signup, { error, data }] = useMutation(LOGIN_USER);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(formState);

    try {
      const { data } = await signup({
        variables: { ...formState },
      });

      Auth.login(data.signup.token);
      window.location.replace(`/tasks/${id}`); //get id from data
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: "",
      password: "",
      username: "",
    });
  };
  return (
    <div>
      <NavBar />
      <div className="div-form">
      <form className="form" onSubmit={handleFormSubmit}>
        <Grid container align="center">
          <Grid item xs={12}>
            <TextField
              id="userName"
              label="Correo electrónico"
              variant="outlined"
              size="small"
              className={classes.formSyle}
              name="email"
              type="email"
              value={formState.email}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="userEmail"
              name="password"
              type="password"
              value={formState.password}
              onChange={handleChange}
              label="Contraseña"
              variant="outlined"
              size="small"
              className={classes.formSyle}
              required
            />
            <Grid item xs={12}>
            <TextField
              id="password"
              label="Password"
              variant="outlined"
              size="small"
              className="password-field"
              name="password"
              type="password"
              value={formState.password}
              onChange={handleChange}
              required
            />
          </Grid>
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="outlined"
              className={classes.buttonStyle}
            >
              Ingresar
            </Button>
          </Grid>
        </Grid>
      </form>
      </div>
    </div>
  );
};
export default Signup;
