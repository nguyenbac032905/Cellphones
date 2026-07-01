import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import {store} from "./app/store.ts";
import { Provider } from 'react-redux';
import { bootstrapAuth } from './app/bootstrap/bootstrapAuth.ts';

const renderApp = async () => {
  await bootstrapAuth();
  createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
      <App />
    </Provider>
  )
}
renderApp();