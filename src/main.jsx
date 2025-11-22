import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from "./components/App.jsx"
import "./styles/styles.css";
// import "./styles/proposal.css"

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<BrowserRouter><App /></BrowserRouter>);