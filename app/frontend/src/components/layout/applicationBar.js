import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import { Typography, CssBaseline, AppBar, Toolbar, Box, Grid, Button, ButtonGroup } from "@material-ui/core"

const ApplicationBar = props => {

    const { isAuthenticated, isActive, user } = props.auth;

    const authLinks = (
        <Box display="flex" alignItems="center" >
            <Typography style={{ marginRight: 10 }} variant="button" component="div" > {user ? `Добро пожаловать, ${user.first_name} ${user.last_name}` : ''} </Typography>
            <Button onClick={props.logout} variant="outlined" color="inherit"> Выход </Button>
        </Box>
    );

    const guestLinks = (
        <ButtonGroup variant="outlined" aria-label="text button group">
            <Button component={Link} to="/register">Регистрация</Button>
            <Button component={Link} to="/login">Вход</Button>
        </ButtonGroup>
    );

    return (
        <>
            <CssBaseline />
            <AppBar position="static" color="default" style={{ padding: 10 }}>
                <Toolbar>
                    <Grid
                        justifyContent="space-between"
                        alignItems="center"
                        container
                    >
                        <Grid item>
                            <a href="/">
                                <img src="../../../static/img/IO.svg" alt="logo" style={{ maxHeight: 100 }} />
                            </a>
                        </Grid>
                        <Grid item>
                            {isAuthenticated && isActive ? authLinks : guestLinks}
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </>
    )
}

ApplicationBar.propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { logout })(ApplicationBar);