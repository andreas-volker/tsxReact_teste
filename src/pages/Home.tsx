import React, { useRef, useState, MutableRefObject, CSSProperties, MouseEvent } from 'react';
import { BasicProps } from 'contexts/stored';
import HomeContent from './HomeContent';
import HomeSidebar from './HomeSidebar';
import './Home.css';

const Home: React.FC<BasicProps> = (props) => {
    const theme = props.theme.option[props.theme.index] || props.theme.option[0],
        wrapper = useRef() as MutableRefObject<HTMLDivElement>,
        sidebar = useRef() as MutableRefObject<HTMLDivElement>,
        [style, setStyle] = useState<CSSProperties>(),
        [isDragging, setDrag] = useState(false),
        on = {
            move: (e: MouseEvent) => {
                if (!isDragging) return false;
                const styleWidth = sidebar.current.style.width;
                sidebar.current.style.width = '';
                const offset = wrapper.current.offsetLeft,
                    xPos = e.clientX - offset,
                    minWidth = sidebar.current.offsetWidth;
                sidebar.current.style.width = styleWidth;
                setStyle({
                    width: Math.max(minWidth, xPos - 4) + 'px',
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
            <div ref={sidebar} style={style} className="sidebar">
                <HomeSidebar theme={props.theme} lang={props.lang} />
            </div>
            <div className="slider"></div>
            <HomeContent theme={props.theme} lang={props.lang} />
        </div>
    );
};
export default Home;
