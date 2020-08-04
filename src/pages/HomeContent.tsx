import React, { useEffect, useState } from 'react';
import { BasicProps } from 'contexts/stored';
import './HomeContent.css';

interface Item {
    id: string;
    name: string;
    owner: string;
    subject: string;
    users: string[];
}

interface Dados {
    id: number;
    subMenuItems: Item[];
}

interface Content extends BasicProps {
    id: number;
}

const HomeContent: React.FC<Content> = (props) => {
    const theme = props.theme.option[props.theme.index] || props.theme.option[0],
        [itens, setItens] = useState<Item[]>([
            {
                id: '',
                name: '',
                owner: '',
                subject: '',
                users: [''],
            },
        ]);
    useEffect(() => {
        if (!props.id) return;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', `http://my-json-server.typicode.com/EnkiGroup/DesafioReactEncontact/items/${props.id}`, true);
        xhr.onreadystatechange = function () {
            if (this.readyState === 4) {
                let data: Dados = {
                    id: 0,
                    subMenuItems: [],
                };
                if (this.status >= 200 && this.status < 400) {
                    try {
                        data = JSON.parse(this.responseText);
                    } catch (e) {}
                }
                console.log(data);
                setItens(data.subMenuItems as Item[]);
            }
        };
        xhr.send();
    }, [props]);
    return (
        <div className={`home-content ${theme}`}>
            {itens.map((item: Item) => {
                return (
                    <li key={item.id}>
                        <span>{item.name}</span>
                        <span>{item.owner}</span>
                        <span>{item.subject}</span>
                        {item.users.map((user, index) => {
                            return <span key={index}>{user}</span>;
                        })}
                    </li>
                );
            })}
        </div>
    );
};
export default HomeContent;
