import React, { useEffect, useState, useContext, MouseEvent } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from 'contexts/stored';
import { BasicProps, Select } from 'contexts/stored';
import './HomeSidebar.css';

interface Menu {
    id: number;
    name: string;
    subMenus: Menu[];
}

interface Sidebar extends BasicProps {
    setId: (id: number, nome: string) => void;
    menuId: number;
}

const HomeSidebar: React.FC<Sidebar> = (props) => {
    const localeData = require('./HomeSidebar.json'),
        theme = props.theme.option[props.theme.index] || props.theme.option[0],
        lang = props.lang.option[props.lang.index] || props.lang.option[0],
        locale = localeData[lang],
        context = useContext(AppContext) || {},
        history = useHistory(),
        [settings, setSettings] = useState(JSON.parse(localStorage.settings || 'false')),
        [selected, setSelected] = useState(JSON.parse(localStorage.selected || 'false')),
        [contas, setContas] = useState<Menu[]>([
            {
                id: 0,
                name: '',
                subMenus: [],
            },
        ]),
        openSettings = () => {
            setSettings(!settings);
            localStorage.settings = !settings;
        },
        contextOption = (e: MouseEvent, select: Select, nome: string) => {
            let el: HTMLElement | null = e.currentTarget as HTMLElement,
                dir = el?.dataset.dir || 'right';
            if (!context.update) return;
            let limit = select.option.length;
            if (dir === 'right') {
                select.index++;
            } else {
                select.index--;
            }
            if (select.index >= limit) select.index = 0;
            else if (select.index < 0) select.index = limit - 1;
            if (nome === 'lang') context.state.lang = select;
            else if (nome === 'theme') context.state.theme = select;
            context.update(context);
        },
        setLang = (e: MouseEvent) => {
            contextOption(e, context.state.lang, 'lang');
            localStorage.lang = context.state.lang.index;
        },
        setTheme = (e: MouseEvent) => {
            contextOption(e, context.state.theme, 'theme');
            localStorage.theme = context.state.theme.index;
        },
        logout = () => {
            if (context.update) {
                localStorage.removeItem('authed');
                localStorage.removeItem('settings');
                localStorage.removeItem('menuId');
                localStorage.removeItem('selected');
                localStorage.removeItem('itens');
                localStorage.removeItem('nome');
                localStorage.removeItem('checked');
                localStorage.removeItem('archive');
                context.state.authed = false;
                context.update(context);
                history.push('/login');
            }
        },
        selecionar = (e: MouseEvent) => {
            let el: HTMLElement | null = e.currentTarget as HTMLElement,
                id = el?.dataset.id || '-1';
            if (id === selected.toString()) id = '-1';
            localStorage.selected = id;
            setSelected(parseInt(id, 10));
        },
        abrir = (e: MouseEvent) => {
            let el: HTMLElement | null = e.currentTarget as HTMLElement,
                id = el?.dataset.id || '-1';
            el = (e.currentTarget as HTMLElement).querySelector('span');
            props.setId(parseInt(id, 10), el?.innerHTML + '');
        };
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
                    <div className="userMenu" onClick={openSettings}>
                        <span>OA</span>
                    </div>
                    <button>{locale.new_button}</button>
                </div>
                <div className="fav">
                    {locale.favorites} &#10247;
                    <span>30</span>
                </div>
            </div>
            <ul className="contas">
                {contas.map((item: Menu) => {
                    return (
                        <li key={item.id} className={item.id === selected ? 'selected' : ''}>
                            <div data-id={item.id} onClick={selecionar}>
                                <div className="icon">&#128898;</div>
                                <span className="name">{item.name}</span>
                                <div className="number">20</div>
                            </div>
                            {item.id !== selected ? null : (
                                <ul className="inbox">
                                    {item.subMenus.map((item2) => {
                                        return (
                                            <li
                                                key={item2.id}
                                                className={`sub ${props.menuId === item2.id ? 'opened' : ''}`}
                                                data-id={item2.id}
                                                onClick={abrir}
                                            >
                                                <span>{item2.name}</span>
                                                <div className="number">15</div>
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}
                        </li>
                    );
                })}
            </ul>
            {settings ? (
                <div className="menu">
                    <span className="close" onClick={openSettings}>
                        &times;
                    </span>
                    <ul>
                        <li>
                            {locale.language}
                            <span data-dir="left" onClick={setLang}>
                                &lt;
                            </span>
                            {context.state.lang.option[context.state.lang.index]}
                            <span data-dir="right" onClick={setLang}>
                                &gt;
                            </span>
                        </li>
                        <li>
                            {locale.theme}
                            <span data-dir="left" onClick={setTheme}>
                                &lt;
                            </span>
                            {locale[context.state.theme.option[context.state.theme.index]]}
                            <span data-dir="right" onClick={setTheme}>
                                &gt;
                            </span>
                        </li>
                        <li onClick={logout}>
                            <span>{locale.logout}</span>
                        </li>
                    </ul>
                </div>
            ) : null}
        </div>
    );
};
export default HomeSidebar;
