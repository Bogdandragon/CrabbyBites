import { useEffect } from "react";
import "./Button.css";

function Button() {
    useEffect(() => {
        alert("Button component loaded");
    }, []);

    return (
        <button className="custom-button">Click me!</button>
    );
}

export default Button;