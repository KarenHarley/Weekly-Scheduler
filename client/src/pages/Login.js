import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../../utils/mutations";

const Login = (props) => {
    const classes = useStyles();
    const [formState, setFormState] = useState({ email: "", password: "" });
    const [login, { error, data }] = useMutation(LOGIN_USER);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
  
      setFormState({
        ...formState,
        [name]: value,
      });
    };
    const handleFormSubmit  = async (e) => {
      e.preventDefault();
      console.log(formState);
  
      try {
        const { data } = await login({
          variables: { ...formState },
        });
  
        Auth.login(data.login.token);
        window.location.replace("/lista_contacto");
      } catch (e) {
        console.error(e);
      }
  
      // clear form values
      setFormState({
        email: "",
        password: "",
      });
    };
    return (
      <div className={classes.root}>
        <NavBar />
        <div className={classes.separatorStyle}></div>
        <form onSubmit={handleFormSubmit}>
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
    );
  };
  export default Login;