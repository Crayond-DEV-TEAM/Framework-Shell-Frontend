import React from "react";
import {
    ThemeProvider,
    StyledEngineProvider,
    createTheme,
    responsiveFontSizes,
} from "@mui/material";
import { lightTheme } from "./theme/lightTheme";
import { darkTheme } from "./theme/darkTheme";
import { ThemeContext } from "./context";

/**
 * Object which has the different themes used in
 * the application.
 */

export const AppTheme = (props: any) => {
    let Themes = {
        default: "default",
        dark: "dark",
    };
    let [theme, setTheme] = React.useState({
        name: Themes.default,
    });

    const giveMeTheme = () => {
        let currentThemeJson;

        //Geting the theme json for  the selected theme
        switch (theme.name) {
            case Themes.default:
                currentThemeJson = lightTheme;
                break;

            case Themes.dark:
                currentThemeJson = darkTheme
                break;

            default:
                currentThemeJson = lightTheme;
                break;
        }

        //Creating a Theme with json
        let currentTheme = createTheme(currentThemeJson);

        // //Making theme work with responsive font size
        // currentTheme = responsiveFontSizes(currentTheme);

        return currentTheme;
    };
    console.log(theme, 'theme');
    

    return (
        <ThemeContext.Provider value={{ ...theme, setTheme }}>
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={giveMeTheme()}>{props.children}</ThemeProvider>
            </StyledEngineProvider>
        </ThemeContext.Provider>
    );
}
