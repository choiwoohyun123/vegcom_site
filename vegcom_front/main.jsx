import './style.css';

import App from './App.jsx';
import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

const app = ReactDOM.createRoot(document.getElementById('app'));
app.render(
    <Router>
        <App style={{ overFlow: 'scroll' }} />
    </Router>,
);
