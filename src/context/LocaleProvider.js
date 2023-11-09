import { useEffect, useState, createContext } from 'react';
import '../locales/config';
import i18next from "i18next";

export const LocaleContext = createContext();

export const LocaleProvider = ({ initialTheme, children }) => {
    const [ locale, setLocale ] = useState(i18next.language)

    const rawSetLocale = (rawLocale) => {
        localStorage.setItem('locale', rawLocale);
        i18next.changeLanguage(rawLocale)
    };

    if (localStorage.getItem('locale')) {
        rawSetLocale(localStorage.getItem('locale'))
    }

    if (initialTheme) {
        rawSetLocale(initialTheme);
    }

    useEffect(() => {
        rawSetLocale(locale);
    }, [locale]);

    return (
        <LocaleContext.Provider value={{locale, setLocale}}>
            {children}
        </LocaleContext.Provider>
    );
};