import React, { useState, useEffect } from "react";
import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  Tabs,
  Tab,
  TextField,
  Grow,
} from "@material-ui/core";
//import { Typography } from '../../components/Wrappers'
import { withRouter } from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "./styles";

//Colors Styles
import colorStyles from '../../themes/colors';

// logo
import logo from "./logo.svg";
//import google from "../../images/google.svg";

// context
//import { useUserDispatch, loginUser } from "../../context/UserContext";

//Redux actions
import { connect } from 'react-redux';
import { userActions } from '../../redux/actions';

import { useTheme, makeStyles } from "@material-ui/styles";

function Login(props) {
  var classes = useStyles();
  var colors = colorStyles();

  // global
  //var userDispatch = useUserDispatch();

  // local
  //var [isLoading, setIsLoading] = useState(false);
  //var [error, setError] = useState(null);
  var [activeTabId, setActiveTabId] = useState(0);
  //var [nameValue, setNameValue] = useState("");
  var [loginValue, setLoginValue] = useState("");
  var [passwordValue, setPasswordValue] = useState("");

  
  //Handle init state
  const {dispatch} = props;
  
  useEffect(() => {
    dispatch(userActions.logout())
  }, [dispatch]);

  //Handle login
  var handleLogin = (e) =>{
    const { dispatch } = props;
    dispatch(userActions.login(loginValue, passwordValue));
    
  };

  const { loggingIn } = props;
  const { alert } = props;

  //setError()
  const get_error = alert.has_error ? true : false

  var show_error = alert.message ? 'true' : 'false'

  return (
    <Grid container className={classes.container}>
      <div className={classes.logotypeContainer}>
        <img src={logo} alt="logo" className={classes.logotypeImage} />
        <Typography className={classes.logotypeText}>Gestagro</Typography>
      </div>
      <div className={classes.formContainer}>
        <div className={classes.form}>
          <Tabs
            value={activeTabId}
            onChange={(e, id) => setActiveTabId(id)}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Login" classes={{ root: classes.tab }} />
            {/*<Tab label="New User" classes={{ root: classes.tab }} />*/}
          </Tabs>
          {activeTabId === 0 && (
            <React.Fragment>
              <Typography variant="h4" className={classes.greeting}>
                Bienvenido, ingresa tus credenciales para acceder al sistema 
                
              </Typography>
              <Grow in={ alert.message ? true : false}>
                <Typography  color="primary" className={classnames(
                  classes.errorMessage, alert.has_error ? colors.red : colors.green )
                }>
                  {alert.message}
                </Typography>
              </Grow>
              <TextField
                id="email"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={loginValue}
                onChange={e => setLoginValue(e.target.value)}
                margin="normal"
                placeholder="Nombre de usuario"
                type="text"
                fullWidth
              />
              <TextField
                id="password"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={passwordValue}
                onChange={e => setPasswordValue(e.target.value)}
                margin="normal"
                placeholder="Contraseña"
                type="password"
                fullWidth
                onKeyPress={(ev) => {
                  if (ev.key === 'Enter') {
                    handleLogin()
                  }
                }}
              />
              <div className={classes.formButtonsCenter}>
                {loggingIn ? (
                  <CircularProgress size={26} className={classes.loginLoader} />
                ) : (
                  <Button
                    disabled={
                      loginValue.length === 0 || passwordValue.length === 0
                    }
                    onClick={() =>
                      handleLogin()
                    }
                    variant="contained"
                    color="primary"
                    size="large"
                    type="submit"
                    onKeyPress={(ev) => {
                      console.log(`Pressed keyCode ${ev.key}`);
                      if (ev.key === 'Enter') {
                        alert("presionó enter!")
                      }
                    }}
                  >
                    Ingresar
                  </Button>
                )}
                {/* 
                <Button
                  color="primary"
                  size="large"
                  className={classes.forgetButton}
                >
                  Forget Password
                </Button>*/}
              </div>
            </React.Fragment>
          )}
        </div>
        <Typography color="primary" className={classes.copyright}>
          © 2019 El Pedregal S.A. All rights reserved.
        </Typography>
      </div>
    </Grid>
  );
}

function mapStateToProps(state) {
  const { loggingIn } = state.authentication;
  const { alert } = state
  return {
    loggingIn,
    alert
  };
}


function Typography2({
  children,
  color,
  ...props
}) {


  return (
    <Typography
      style={{
        color: "blue",
      }}
      {...props}
    >
      {children}
    </Typography>
  );
}


const connectedLoginPage = connect(mapStateToProps)(Login);

export default withRouter( connectedLoginPage );




//export default connectedLoginPage;
