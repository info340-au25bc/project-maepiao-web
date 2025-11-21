import React from "react";
import Header from "../layouts/Header";

export default function App(props) {
    return (
        <div>
            <Header />
            <main>
                <h1>HomeVest</h1>
                {props.children}
            </main>
        </div>
    );
}