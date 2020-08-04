import React, { useEffect, useState } from 'react';
import { BasicProps } from 'contexts/stored';
import './HomeSidebar.css';

const HomeSidebar: React.FC<BasicProps> = (props) => {
    const theme = props.theme.option[props.theme.index] || props.theme.option[0],
        [contas, setContas] = useState({});
    useEffect(() => {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://my-json-server.typicode.com/EnkiGroup/DesafioReactEncontact/menus', true);

        xhr.onreadystatechange = function () {
            if (this.readyState === 4) {
                let data = {};
                if (this.status >= 200 && this.status < 400) {
                    try {
                        data = JSON.parse(this.responseText);
                    } catch (e) {}
                }
                console.log(data);
                setContas(data);
            }
        };
        xhr.send();
    }, []);
    return (
        <div className={`home-sidebar ${theme}`}>
            <div>
                <div className="userMenu">
                    <span>OA</span>
                </div>
            </div>
            <div className="contas"></div>
        </div>
    );
};
export default HomeSidebar;
