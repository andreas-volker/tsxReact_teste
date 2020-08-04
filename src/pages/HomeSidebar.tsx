import React, { useEffect, useState } from 'react';
import { BasicProps } from 'contexts/stored';
import './HomeSidebar.css';

interface Menu {
    id: number;
    name: string;
    subMenus: Menu[];
}

interface Sidebar extends BasicProps {
    setId: (id: number) => void;
}

const HomeSidebar: React.FC<Sidebar> = (props) => {
    const theme = props.theme.option[props.theme.index] || props.theme.option[0],
        [selected, setSelected] = useState(-1),
        [contas, setContas] = useState<Menu[]>([
            {
                id: 0,
                name: '',
                subMenus: [],
            },
        ]);
    useEffect(() => {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://my-json-server.typicode.com/EnkiGroup/DesafioReactEncontact/menus', true);
        xhr.onreadystatechange = function () {
            if (this.readyState === 4) {
                let data = [];
                if (this.status >= 200 && this.status < 400) {
                    try {
                        data = JSON.parse(this.responseText);
                    } catch (e) {}
                }
                setContas(data);
            }
        };
        xhr.send();
    }, []);
    return (
        <div className={`home-sidebar ${theme}`}>
            <div className="header">
                <div className="top">
                    <div className="userMenu">
                        <span>OA</span>
                    </div>
                    <button>New</button>
                </div>
                <div className="fav">
                    Favoritas &#10247;
                    <span>30</span>
                </div>
            </div>
            <div className="menu">
                <ul>
                    <li>
                        <span>Mudar idioma</span>
                    </li>
                    <li>
                        <span>Mudar tema</span>
                    </li>
                    <li>
                        <span>Logout</span>
                    </li>
                </ul>
            </div>
            <ul className="contas">
                {contas.map((item: Menu) => {
                    return (
                        <li key={item.id} className={item.id === selected ? 'selected' : ''}>
                            <div className="icon">&#128898;</div>
                            <span
                                className="name"
                                data-id={item.id}
                                onClick={(e) => {
                                    let id = (e.target as HTMLElement).dataset.id || '';
                                    setSelected(parseInt(id, 10));
                                }}
                            >
                                {item.name}
                            </span>
                            {item.id !== selected ? null : (
                                <ul className="inbox">
                                    {item.subMenus.map((item2) => {
                                        return (
                                            <li key={item2.id}>
                                                <span
                                                    data-id={item2.id}
                                                    onClick={(e) => {
                                                        let id = (e.target as HTMLElement).dataset.id || '';
                                                        props.setId(parseInt(id, 10));
                                                    }}
                                                >
                                                    {item2.name}
                                                </span>
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
export default HomeSidebar;
