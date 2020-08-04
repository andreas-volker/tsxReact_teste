import React from 'react';
import { BasicProps } from 'contexts/stored';
import HomeContent from './HomeContent';
import HomeSidebar from './HomeSidebar';
import './Home.css';

const Home: React.FC<BasicProps> = (props) => {
    const theme = props.theme.option[props.theme.index];
    // const context = React.useContext(AppContext) || {};
    return (
        <div className={`home ${theme}`}>
            <HomeSidebar theme={props.theme} lang={props.lang} />
            <div className="slider"></div>
            <HomeContent theme={props.theme} lang={props.lang} />
        </div>
    );
};
export default Home;
