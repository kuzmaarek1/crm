import { createGlobalStyle } from "styled-components";
const GlobalStyle = createGlobalStyle`
    *,*::before,*::after{
        box-sizing:border-box;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    body{
        padding:0px;
        margin:0px;
        font-family: 'Montserrat',sans-serif;
    }

    body::-webkit-scrollbar {
        display: none;
    }
`;
export default GlobalStyle;
