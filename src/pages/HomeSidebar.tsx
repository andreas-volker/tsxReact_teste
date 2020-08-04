import React from 'react';
import { BasicProps } from 'contexts/stored';
import './HomeSidebar.css';

const HomeSidebar: React.FC<BasicProps> = (props) => {
    const theme = props.theme.option[props.theme.index];
    return <div className={`home-sidebar ${theme}`}></div>;
};
export default HomeSidebar;
