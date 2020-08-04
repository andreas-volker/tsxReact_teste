import React from 'react';
import { BasicProps } from 'contexts/stored';
import './HomeContent.css';

const HomeContent: React.FC<BasicProps> = (props) => {
    const theme = props.theme.option[props.theme.index];
    return <div className={`home-content ${theme}`}></div>;
};
export default HomeContent;
