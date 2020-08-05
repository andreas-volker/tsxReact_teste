import React, { useState, useContext, MouseEvent } from 'react';
import AppContext, { BasicProps } from 'contexts/stored';
import './Login.css';

const Login: React.FC<BasicProps> = (props) => {
    const localeData = require('./Login.json'),
        theme = props.theme.option[props.theme.index] || props.theme.option[0],
        lang = props.lang.option[props.lang.index] || props.lang.option[0],
        locale = localeData[lang],
        [username, setUsername] = useState(''),
        [password, setPassword] = useState(''),
        context = useContext(AppContext) || {},
        click = (e: MouseEvent) => {
            e.preventDefault();
            if (username !== 'admin' || password !== 'admin') {
                alert('admin\nadmin');
                return;
            } else if (context.update) {
                context.state.authed = true;
                localStorage.authed = true;
                context.update(context);
            }
        };
    return (
        <div className={`login ${theme}`}>
            <div>
                <form action="">
                    <p>{locale.header}</p>
                    <input
                        type="text"
                        placeholder={locale.user}
                        value={username}
                        onChange={(e) => setUsername(e.currentTarget.value)}
                    />
                    <input
                        type="text"
                        placeholder={locale.password}
                        value={password}
                        onChange={(e) => setPassword(e.currentTarget.value)}
                    />
                    <button onClick={click}>
                        <span>{locale.button}</span>
                    </button>
                </form>
            </div>
        </div>
    );
};
export default Login;
