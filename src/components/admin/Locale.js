import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { MdLanguage } from "react-icons/md";

const Locale = () => {
    function useOutsideAlerter(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setToggle(false);
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);
    const [t, i18n] = useTranslation("translations");
    const handleChangeLocale = (locale) => {
        i18n.changeLanguage(locale);
        localStorage.setItem("locale", locale);
    };
    const [toggle, setToggle] = useState(false);
    return (
        <div ref={wrapperRef} onClick={() => setToggle(!toggle)}>
            <MdLanguage
                className="w-5 h-5 text-primary cursor-pointer hover:fill-buttonPrimary"
                onClick={() => setToggle(!toggle)}
            />
            {toggle && (
                <div className="absolute mr-2 right-0 px-5 py-3 bg-primary rounded-lg border border-border mt-2">
                    <ul className="space-y-3 text-primary text-sm">
                        <li className="text-xl font-bold px-3 mx-1 rounded-md">
                            {t("locale.title")}
                        </li>
                        <hr className="border-border" />
                        <li
                            className={`cursor-pointer items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-buttonPrimary ${i18n.language === 'en' &&  'text-buttonPrimary'}`}
                            onClick={() => handleChangeLocale("en")}
                        >
                            {t("locale.en")}
                        </li>
                        <li
                            className={`cursor-pointer items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-buttonPrimary ${i18n.language === 'id' &&  'text-buttonPrimary'}`}
                            onClick={() => handleChangeLocale("id")}
                        >
                            {t("locale.id")}
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Locale;
