import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Login from './login/Login';
import Register from './login/Register';
import ApplicationBar from './layout/applicationBar';
import AdvtsListPage from './advts/advts';
import Advt from './advts/advt';
import store from '../store';
import PrivateRoute from './common/PrivateRoute';
import { loadUser } from '../actions/auth';

const App = () => {
    store.dispatch(loadUser());
    return (
        <Provider store={store}>
            <Router>
                <Fragment>
                    <ApplicationBar />
                    <main>
                        <div>
                            <Switch>
                                <PrivateRoute exact path="/" component={AdvtsListPage} />
                                <PrivateRoute exact path="/advt/:id" > <Advt /> </PrivateRoute>
                                <Route exact path="/register" component={Register} />
                                <Route exact path="/login" component={Login} />
                            </Switch>
                        </div>
                    </main>
                </Fragment>
            </Router>
        </Provider>
    )
}

ReactDOM.render(<App />, document.getElementById('app'));