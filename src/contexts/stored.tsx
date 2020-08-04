import React, { Dispatch, SetStateAction } from 'react';

interface Select {
    index: number;
    option: string[];
}

interface State {
    authed: boolean;
    lang: Select;
    theme: Select;
}
interface Stored {
    state: State;
    update?: Dispatch<SetStateAction<Stored>>;
}
const AppContext = React.createContext<Stored>({
    state: {
        authed: localStorage.authed || false,
        lang: {
            index: localStorage.lang || 0,
            option: ['pt-br', 'en-us'],
        },
        theme: {
            index: localStorage.theme || 0,
            option: ['light', 'dark'],
        },
    },
});
export interface BasicProps {
    theme: Select;
    lang: Select;
}
export default AppContext;
