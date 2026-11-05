import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { applyTypographyConfig } from './config/typography';
import './index.css';

// Initialize centralized global typography CSS variables & Google Fonts link
applyTypographyConfig();

createRoot(document.getElementById('root')!).render(<App />);

