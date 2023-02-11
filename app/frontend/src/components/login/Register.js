import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/auth';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import InputMask from 'react-input-mask';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export class Register extends Component {

    static propTypes = {
        register: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool,
    };

    render() {
        this.state = {
            value: null,
        }
        if (this.props.isAuthenticated && this.props.isActive) {
            return <Redirect to="/" />;
        }
        const theme = createTheme();
        const handleSubmit = (e) => {
            e.preventDefault();
            const data = new FormData(e.currentTarget);
            if (data.get("password") !== data.get("passwordConfirm")) {
                alert('Пароли не совпадают');
            } else {
                const newUser = {
                    firstName: data.get("firstName"),
                    lastName: data.get("lastName"),
                    password: data.get("password"),
                    email: data.get("email"),
                    phone: data.get("phone"),
                };
                this.props.register(newUser);
                alert('Ваша заявка отправлена на рассмотрение. Вы сможете войти, когда мы активируем Вашу учетную запись.');
            }
        };
        return (
            <>
                <ThemeProvider theme={theme}>
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <Box
                            sx={{
                                marginTop: 8,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: 'primary' }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Регистрация
                            </Typography>
                            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            autoComplete="fname"
                                            name="firstName"
                                            required
                                            fullWidth
                                            id="firstName"
                                            label="Имя"
                                            autoFocus />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="lastName"
                                            label="Фамилия"
                                            name="lastName"
                                            autoComplete="lname" />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="email"
                                            label="Email"
                                            name="email"
                                            autoComplete="email" />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <InputMask
                                            mask="+7 (999) 999 99 99"
                                            value={this.state.phone}
                                            disabled={false}
                                            maskChar=" "
                                        >
                                            {() => <TextField
                                                name="phone"
                                                id="phone"
                                                type="text"
                                                label="Телефон"
                                                autoComplete="phone"
                                                required
                                                fullWidth
                                            />}
                                        </InputMask>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            name="password"
                                            label="Пароль"
                                            type="password"
                                            id="password"
                                            autoComplete="new-password" />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            onChange={this.handleChanged}
                                            fullWidth
                                            name="passwordConfirm"
                                            label="Подтверждение пароля"
                                            type="password"
                                            id="passwordConfirm" />
                                    </Grid>
                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Регистрация
                                </Button>
                                <Grid container justifyContent="flex-start">
                                    <Grid item>
                                        <Typography variant="subtitle2">
                                            Уже есть учетная запись?
                                        </Typography>
                                        <Link href="#/login" variant="body2" underline="hover" color="inherit">
                                            {"Вход."}
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Container>
                </ThemeProvider>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    isActive: state.auth.isActive
});

export default connect(mapStateToProps, { register })(Register);