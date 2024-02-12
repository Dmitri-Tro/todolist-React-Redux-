import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppWithRedux from "./AppWithRedux";
import {Provider} from "react-redux";
import {store} from "./state/store";
import {BrowserRouter} from "react-router-dom";


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <React.StrictMode>
  //     <App />
    <BrowserRouter>
        <Provider store={store}>
            <AppWithRedux />
        </Provider>
    </BrowserRouter>
  // </React.StrictMode>
);