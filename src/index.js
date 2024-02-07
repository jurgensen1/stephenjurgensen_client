import React from 'react';
import { createRoot } from 'react-dom/client';
// import { render } from 'react-snapshot';
import { hydrate, render } from "react-dom";
import { Provider } from 'react-redux';
import { store } from './redux/store';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);


// if (container.hasChildNodes()) {
//     hydrate(
//         root.render(
//             <Provider store={store}>
//                 <App />
//             </Provider>
//         ), container);
// } else {
//     render(root.render(
//         <Provider store={store}>
//             <App />
//         </Provider>
//     ), container);
// }
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
