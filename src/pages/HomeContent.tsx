import React, { useEffect, useState, MouseEvent, FormEvent } from 'react';
import { BasicProps } from 'contexts/stored';
import './HomeContent.css';

interface SubMenuItem {
    id: string;
    name: string;
    owner: string;
    subject: string;
    users: string[];
}

interface Item {
    id: number;
    subMenuItems: SubMenuItem[];
}

interface Content extends BasicProps {
    menuId: number;
    nome: string;
}

const HomeContent: React.FC<Content> = (props) => {
    const json = JSON.stringify({
            id: 0,
            subMenuItems: [
                {
                    id: '',
                    name: '',
                    owner: '',
                    subject: '',
                    users: [''],
                },
            ],
        }),
        theme = props.theme.option[props.theme.index] || props.theme.option[0],
        [itens, setItens] = useState<Item>(JSON.parse(localStorage.itens || json)),
        [checked, setChecked] = useState<string[]>(JSON.parse(localStorage.checked || '[]')),
        [archive, setArchive] = useState<string[]>(JSON.parse(localStorage.archive || '[]')),
        letterToRGB = (iniciais: string) => {
            iniciais = iniciais.toLowerCase();
            let first = iniciais.charCodeAt(0),
                last = iniciais.charCodeAt(1),
                distance = Math.abs(first - last),
                red = distance > 12 ? distance * 10 : 255 / (distance + 1),
                green = distance > 12 ? distance * 1 : distance * 20,
                blue = distance > 12 ? distance * 10 : distance * 2,
                intensity = red * 0.299 + green * 0.587 + blue * 0.114;
            return { color: intensity > 186 ? '#000' : '#fff', background: `rgb(${red}, ${green}, ${blue})` };
        },
        selectAll = (e: FormEvent) => {
            let list: string[] = [];
            if ((e.currentTarget as HTMLInputElement).checked) {
                list = [...checked];
                itens.subMenuItems.forEach((item: SubMenuItem) => {
                    if (list.indexOf(item.id) < 0) {
                        list.push(item.id);
                    }
                });
            }
            setChecked(list);
            localStorage.checked = JSON.stringify(list);
        },
        selectItem = (e: FormEvent) => {
            let el: HTMLElement | null = e.currentTarget as HTMLElement,
                id = el?.dataset.id || '',
                list = [...checked];
            if (!id) return;
            let index = list.indexOf(id);
            if (index < 0) list.push(id);
            else list.splice(index, 1);
            setChecked(list);
            localStorage.checked = JSON.stringify(list);
        },
        arquivar = (e: MouseEvent) => {
            const list = [...archive, ...checked];
            setArchive(list);
            setChecked([]);
            localStorage.archive = JSON.stringify(list);
            localStorage.checked = '[]';
        };
    useEffect(() => {
        if (!props.menuId || props.menuId === itens.id) return;
        var xhr = new XMLHttpRequest();
        xhr.open(
            'GET',
            `http://my-json-server.typicode.com/EnkiGroup/DesafioReactEncontact/items/${props.menuId}`,
            true,
        );
        xhr.onreadystatechange = function () {
            if (this.readyState === 4) {
                let data = {};
                if (this.status >= 200 && this.status < 400) {
                    try {
                        data = JSON.parse(this.responseText);
                    } catch (e) {}
                }
                setItens(data as Item);
                localStorage.itens = JSON.stringify(data);
            }
        };
        xhr.send();
    }, [props, itens.id]);
    return (
        <div className={`home-content ${theme}`}>
            <div className="header">
                <div className="search">
                    <input type="text" placeholder="Pesquisar" />
                </div>
                <div className="botoes">
                    <input type="checkbox" onChange={selectAll} />
                    <button>Atribuir</button>
                    <button onClick={arquivar}>Arquivar</button>
                    <button>Agendar</button>
                </div>
            </div>
            <div className="itens">
                <ul className={checked.length ? 'checking' : ''}>
                    {itens.subMenuItems.map((item: SubMenuItem) => {
                        if (!item.id || archive.indexOf(item.id) >= 0) return null;
                        return (
                            <li key={item.id}>
                                <div className={'checkbox ' + (!checked.length ? 'owner' : 'check')}>
                                    <div style={letterToRGB(item.owner || 'az')}>
                                        <span>{item.owner}</span>
                                        <input
                                            data-id={item.id}
                                            checked={checked.indexOf(item.id) >= 0}
                                            onChange={selectItem}
                                            type="checkbox"
                                        />
                                    </div>
                                </div>
                                <div className="msg">
                                    <span>{item.name}</span>
                                    <span>{item.subject}</span>
                                    <span className="inbox">
                                        <span className="zap">
                                            <svg>
                                                <path
                                                    d="M30.667,14.939c0,8.25-6.74,14.938-15.056,14.938c-2.639,0-5.118-0.675-7.276-1.857L0,30.667l2.717-8.017
                                                    c-1.37-2.25-2.159-4.892-2.159-7.712C0.559,6.688,7.297,0,15.613,0C23.928,0.002,30.667,6.689,30.667,14.939z M15.61,2.382
                                                    c-6.979,0-12.656,5.634-12.656,12.56c0,2.748,0.896,5.292,2.411,7.362l-1.58,4.663l4.862-1.545c2,1.312,4.393,2.076,6.963,2.076
                                                    c6.979,0,12.658-5.633,12.658-12.559C28.27,8.016,22.59,2.382,15.61,2.382z M23.214,18.38c-0.094-0.151-0.34-0.243-0.708-0.427
                                                    c-0.367-0.184-2.184-1.069-2.521-1.189c-0.34-0.123-0.586-0.185-0.832,0.182c-0.243,0.367-0.951,1.191-1.168,1.437
                                                    c-0.215,0.245-0.43,0.276-0.799,0.095c-0.369-0.186-1.559-0.57-2.969-1.817c-1.097-0.972-1.838-2.169-2.052-2.536
                                                    c-0.217-0.366-0.022-0.564,0.161-0.746c0.165-0.165,0.369-0.428,0.554-0.643c0.185-0.213,0.246-0.364,0.369-0.609
                                                    c0.121-0.245,0.06-0.458-0.031-0.643c-0.092-0.184-0.829-1.984-1.138-2.717c-0.307-0.732-0.614-0.611-0.83-0.611
                                                    c-0.215,0-0.461-0.03-0.707-0.03S9.897,8.215,9.56,8.582s-1.291,1.252-1.291,3.054c0,1.804,1.321,3.543,1.506,3.787
                                                    c0.186,0.243,2.554,4.062,6.305,5.528c3.753,1.465,3.753,0.976,4.429,0.914c0.678-0.062,2.184-0.885,2.49-1.739
                                                    C23.307,19.268,23.307,18.533,23.214,18.38z"
                                                />
                                            </svg>
                                        </span>
                                        {props.nome}
                                    </span>
                                </div>
                                <div className="detail">
                                    <span>Hoje, 11h42</span>
                                    <span>2 horas</span>
                                    <div className="users-list">
                                        {item.users.map((user, index) => {
                                            return (
                                                <div key={index} style={letterToRGB(user || 'az')} className="users">
                                                    <span>{user}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};
export default HomeContent;
