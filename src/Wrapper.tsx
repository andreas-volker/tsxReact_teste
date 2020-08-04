import React, { useState, useContext } from 'react';
import App from 'App';
import AppContext from 'contexts/stored';

const Wrapper: React.FC<any> = () => {
    const [context, update] = useState(useContext(AppContext)),
        value = { state: context.state, update: update };
    return (
        <AppContext.Provider value={value}>
            <App />
        </AppContext.Provider>
    );
};
export default Wrapper;
