//צרו קונטקסט חדש בשם AuthContext
//משתנה בשם isLoggedIn = false
//function login(JWT:string)=void
//function logout()=void

import { createContext, useState } from "react";
import { FCC } from "../@types/types";

// מבנה של הקונטקסט: משתנים ופונקציות
export const ThemeContext = createContext({
    theme: "light",
    toggle: () => { },
});

export const ThemeProvider: FCC = (props) => {
    // state variable:
    const [theme, setTheme] = useState("light");

    // function toggle
    function toggle() {
        //const newTheme = "light" | "dark"
        const newTheme = theme == "dark" ? "light" : "dark";

        if (newTheme == "dark") {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }

        setTheme(newTheme);
    }

    return (
        <ThemeContext.Provider value={{ theme, toggle }}>
            {props.children}
        </ThemeContext.Provider>
    );
};