import React from 'react';
import { BasicProps } from 'contexts/stored';
import './HomeContent.css';

const HomeContent: React.FC<BasicProps> = (props) => {
    const theme = props.theme.option[props.theme.index] || props.theme.option[0];
    return <div className={`home-content ${theme}`}></div>;
};
export default HomeContent;
