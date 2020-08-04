import React, { useState, useContext } from 'react';
import AppContext, { BasicProps } from 'contexts/stored';
import './Login.css';

const Login: React.FC<BasicProps> = (props) => {
    const theme = props.theme.option[props.theme.index] || props.theme.option[0],
        [username, setUsername] = useState(''),
        [password, setPassword] = useState(''),
        context = useContext(AppContext) || {},
        click = () => {
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
                    <p>Bem vindo</p>
                    <input
                        type="text"
                        placeholder="Usuário"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button onClick={click}>
                        <span>Entrar</span>
                    </button>
                </form>
            </div>
        </div>
    );
};
export default Login;
