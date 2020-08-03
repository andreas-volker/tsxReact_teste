import React from 'react';
import App from 'App';
import AppContext from 'contexts/stored';

const Wrapper: React.FC<any> = () => {
    const [context, update] = React.useState(React.useContext(AppContext)),
        value = { state: context.state, update: update };
    return (
        <AppContext.Provider value={value}>
            <App />
        </AppContext.Provider>
    );
};
export default Wrapper;
