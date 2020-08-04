import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import AppContext from 'contexts/stored';
import Login from 'pages/Login';
import Home from 'pages/Home';

const App: React.FC<any> = (props) => {
    const context = useContext(AppContext) || {},
        log = !context.state.authed;
    function LoginWrap() {
        return (
            <AppContext.Consumer>
                {(context) => {
                    const state = context.state;
                    return <Login theme={state.theme} lang={state.lang} />;
                }}
            </AppContext.Consumer>
        );
    }
    function HomeWrap() {
        return (
            <AppContext.Consumer>
                {(context) => {
                    const state = context.state;
                    return <Home theme={state.theme} lang={state.lang} />;
                }}
            </AppContext.Consumer>
        );
    }
    return (
        <div className="App">
            <Router>
                <Switch>
                    {log ? (
                        <Route path="/login">
                            <LoginWrap></LoginWrap>
                        </Route>
                    ) : null}
                    {log ? <Redirect to="/login" /> : null}
                    <Route exact path="/">
                        <HomeWrap></HomeWrap>
                    </Route>
                    <Route path="*">
                        <Redirect to="/" />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
};
export default App;
