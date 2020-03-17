import React from 'react'
import { connect } from 'react-redux'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { Button, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { logout } from './../../redux/auth-reducer'


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
    authControls: {
        display: 'flex',
        flexWrap: "nowrap",
        alignItems: "center"
    },
}));

const NavBar = ({isAuth, logout, authUserEmail}) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h5" className={classes.title}>
                        Todo App
                    </Typography>
                    {isAuth
                        && 
                        <Box className={classes.authControls}>
                            <Typography component="div">
                                <Box color="success.main" mr={2}>
                                    {authUserEmail}
                                </Box>
                            </Typography>
                            <Button color="inherit" onClick={() => logout()}>Logout</Button>
                        </Box>
                    }
                </Toolbar>
            </AppBar>
        </div>
    )
}


const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    authUserEmail: state.auth.currentUser.email
})
export default connect(mapStateToProps,{
    logout
})(NavBar)