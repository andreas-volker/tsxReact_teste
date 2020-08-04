import React, { useRef, useState, MutableRefObject, CSSProperties, MouseEvent } from 'react';
import { BasicProps } from 'contexts/stored';
import HomeContent from './HomeContent';
import HomeSidebar from './HomeSidebar';
import './Home.css';

const Home: React.FC<BasicProps> = (props) => {
    const theme = props.theme.option[props.theme.index] || props.theme.option[0],
        wrapper = useRef() as MutableRefObject<HTMLDivElement>,
        sidebar = useRef() as MutableRefObject<HTMLDivElement>,
        [styleSidebar, setStyleSidebar] = useState<CSSProperties>(),
        [styleContent, setStyleContent] = useState<CSSProperties>(),
        [isDragging, setDrag] = useState(false),
        [menuId, setMenuId] = useState(0),
        setId = (id: number) => {
            console.log(id);
            setMenuId(id);
        },
        on = {
            move: (e: MouseEvent) => {
                console.log(e.pageX);
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
                setStyleContent({
                    width: `${wrapper.current.clientWidth - width}px`,
                });
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
                <HomeSidebar setId={setId} theme={props.theme} lang={props.lang} />
            </div>
            <div className="slider"></div>
            <div style={styleContent} className="content">
                <HomeContent id={menuId} theme={props.theme} lang={props.lang} />
            </div>
        </div>
    );
};
export default Home;
