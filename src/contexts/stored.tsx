import React, { Dispatch, SetStateAction } from 'react';

export interface Select {
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
        authed: JSON.parse(localStorage.authed || 'false') || false,
        lang: {
            index: JSON.parse(localStorage.lang || '0') || 0,
            option: ['pt-br', 'en-us'],
        },
        theme: {
            index: JSON.parse(localStorage.theme || '0') || 0,
            option: ['light', 'dark'],
        },
    },
});
export interface BasicProps {
    theme: Select;
    lang: Select;
}
export default AppContext;
