import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useHistory, Redirect } from "react-router-dom"

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

import { login } from './../../redux/auth-reducer'





const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

const Login = (props) => {
  const classes = useStyles()
  const history = useHistory()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [snackOpen, setSnackOpen] = useState(false)
  const [snackOptions, setSnackOptions] = useState({
    snackMsg: '',
    snackType: '',
  })

  const snackHandleClose = (event, reason) => {
    if (reason === 'clickaway') return
    setSnackOpen(false);
  }

  const onLoginHandler =  (e) => {
    e.preventDefault()
    let promise = props.login(email, password)
      // debugger
      promise.catch(error => {
        // var errorCode = error.code;
        var errorMessage = error.message;
        setSnackOptions({
          snackMsg: errorMessage,
          snackType: 'error'
        })
        setSnackOpen(true);
      })
  }
  const onRegistrationRedirectHandler = (e) => {
    e.preventDefault()
    history.push('/registration')
  }

  if (props.isAuth) return <Redirect to='/todos' />
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={onLoginHandler}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={e => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={e => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link href="" variant="body2" onClick={onRegistrationRedirectHandler}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Snackbar open={snackOpen} autoHideDuration={5000} onClose={snackHandleClose}>
        <MuiAlert onClose={snackHandleClose} severity={snackOptions.snackType} elevation={6} variant="filled" >
          {snackOptions.snackMsg}
        </MuiAlert>
      </Snackbar>
    </Container>
  )
}

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth
})
export default connect(mapStateToProps,{
  login
})(Login)