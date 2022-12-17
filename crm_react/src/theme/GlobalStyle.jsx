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

    *::-webkit-scrollbar {
        width: 10px;
    }
 
    *::-webkit-scrollbar-track {
        border-radius:20px;
        background-color: rgba(97, 97, 97, 0);
    }

    *::-webkit-scrollbar-thumb {
    background-color:rgba(97, 97, 97, 0.7);
    border-radius:20px;
    height:15px;
    }
    .ReactModalPortal > * {
        opacity: 0;
    }
    .ReactModal__Overlay {
        transition: opacity 500ms ease-in-out;
        &--after-open {
            opacity: 1;
        }
        &--before-close {
            opacity: 0;
        }
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    input[type=number] {
        -moz-appearance: textfield;
    }
`;
export default GlobalStyle;
