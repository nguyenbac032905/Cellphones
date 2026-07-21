import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import {store} from "./app/store.ts";
import { Provider } from 'react-redux';
import { bootstrapAdminAuth } from './app/bootstrap/bootstrapAdminAuth.ts';
import { bootstrapClientAuth } from './app/bootstrap/bootstrapClientAuth.ts';

const renderApp = async () => {
  if (window.location.pathname.startsWith("/admin")) {
        await bootstrapAdminAuth();
    } else {
        await bootstrapClientAuth();
    }
  createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
      <App />
    </Provider>
  )
}
renderApp();