import React, { useEffect } from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import { connect } from "react-redux"
import "./App.css"

import NavBar from "./components/NavBar/NavBar"
import Login from "./components/Login/Login"
import Registration from './components/Registration/Registration'
import Todos from "./components/Todos/Todos"

import { Backdrop } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core/styles'

import { initializeApp } from './redux/app-reducer'



const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}))

const App = (props) => {
  const classes = useStyles()

  useEffect(() => {
    props.initializeApp()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!props.initialized) {
    return (
      <Backdrop className={classes.backdrop} open={true}>
        <CircularProgress color="inherit" />
      </Backdrop>
    )
  }
  return (
    <div className="App">
      <NavBar />
      <div className="App-content">
        <Switch>
          <Route exact path='/' render={() => <Redirect to="/todos" />} />
          <Route path='/todos' render={() => <Todos />} />
          <Route path='/registration' component={Registration} />
          <Route path='/login' component={Login} />
        </Switch>
      </div>
    </div>
  )

}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})

export default connect(mapStateToProps, {
  initializeApp
})(App)
