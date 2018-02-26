import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Profile from './components/profile/index';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Profile />, document.getElementById('root'));
registerServiceWorker();
