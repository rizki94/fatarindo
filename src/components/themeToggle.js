import React, { useContext } from "react";
import { HiMoon, HiSun } from "react-icons/hi";
import { ThemeContext } from "../context/ThemeProvider";

const Toggle = () => {
    const { theme, setTheme } = useContext(ThemeContext);
    return theme === "dark" ? (
        <HiSun
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-5 h-5 text-primary cursor-pointer hover:fill-buttonPrimary"
        />
    ) : (
        <HiMoon
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-5 h-5 text-primary cursor-pointer hover:fill-buttonPrimary"
        />
    );
};

export default Toggle;
