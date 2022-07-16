import React from "react";
import ReactDOM from "react-dom";
import "./scssStyles/index.scss";
import App from "./App";
import { Provider } from "react-redux";
import store from './store'
import { QueryClient, QueryClientProvider } from 'react-query'
import Modal from 'react-modal';

const queryClient = new QueryClient()
Modal.setAppElement('#root');
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <QueryClientProvider client={queryClient}>
         <App />
     </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
