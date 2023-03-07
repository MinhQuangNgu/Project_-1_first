import React from 'react';
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import './index.css';
import App from './App';
import './style.css';
import { PersistGate } from 'redux-persist/integration/react'
import {store,persistor} from './components/redux/store';
import {Provider} from 'react-redux';
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <StrictMode>
      <App />
    </StrictMode>
    </PersistGate>
  </Provider>
);
