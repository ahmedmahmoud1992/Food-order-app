import ReactDOM from 'react-dom/client';
import { ModalContextProvider } from './store/modal-context';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ModalContextProvider><App /></ModalContextProvider>);
