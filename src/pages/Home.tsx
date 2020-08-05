import React, { useRef, useState, MutableRefObject, CSSProperties, MouseEvent } from 'react';
import { BasicProps } from 'contexts/stored';
import HomeContent from './HomeContent';
import HomeSidebar from './HomeSidebar';
import './Home.css';

const Home: React.FC<BasicProps> = (props) => {
    const theme = props.theme.option[props.theme.index] || props.theme.option[0],
        wrapper = useRef() as MutableRefObject<HTMLDivElement>,
        sidebar = useRef() as MutableRefObject<HTMLDivElement>,
        [styleSidebar, setStyleSidebar] = useState<CSSProperties>(
            localStorage.styleSidebar ? JSON.parse(localStorage.styleSidebar) : {},
        ),
        [styleContent, setStyleContent] = useState<CSSProperties>(
            localStorage.styleContent ? JSON.parse(localStorage.styleContent) : {},
        ),
        [isDragging, setDrag] = useState(false),
        [menuId, setMenuId] = useState(JSON.parse(localStorage.menuId || '0')),
        [nome, setNome] = useState(''),
        setId = (id: number, nome: string) => {
            if (id) setMenuId(id);
            if (nome) setNome(nome);
        },
        on = {
            move: (e: MouseEvent) => {
                if (!isDragging) return false;
                const styleWidth = sidebar.current.style.width;
                sidebar.current.style.width = '';
                const offset = wrapper.current.offsetLeft,
                    xPos = e.clientX - offset,
                    minWidth = sidebar.current.offsetWidth / 2,
                    width = Math.max(minWidth, xPos + 4);
                sidebar.current.style.width = styleWidth;
                setStyleSidebar({
                    width: width + 'px',
                });
                localStorage.styleSidebar = JSON.stringify(styleSidebar);
                setStyleContent({
                    width: `${wrapper.current.clientWidth - width}px`,
                });
                localStorage.styleContent = JSON.stringify(styleContent);
            },
            down: (e: MouseEvent) => {
                if (/slider/.test((e.target as HTMLElement).className)) setDrag(true);
            },
            up: (e: MouseEvent) => {
                setDrag(false);
            },
        };
    return (
        <div
            className={`home ${theme}`}
            ref={wrapper}
            onMouseLeave={on.up}
            onMouseDown={on.down}
            onMouseUp={on.up}
            onMouseMove={on.move}
        >
            <div ref={sidebar} style={styleSidebar} className="sidebar">
                <HomeSidebar menuId={menuId} setId={setId} theme={props.theme} lang={props.lang} />
            </div>
            <div className="slider"></div>
            <div style={styleContent} className="content">
                <HomeContent nome={nome} menuId={menuId} theme={props.theme} lang={props.lang} />
            </div>
        </div>
    );
};
export default Home;
