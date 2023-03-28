import React from 'react';
import ReactDOM from 'react-dom';
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';

import './index.css';

import reducer from './flux/reducer';
import { ENABLE_ABORT_REQUEST } from './flux/type';

import App from './ui/App';

const store = configureStore({
	reducer: { reducer },
	middleware: getDefaultMiddleware => getDefaultMiddleware({
		serializableCheck: {
			ignoredActions: [ENABLE_ABORT_REQUEST],
			ignoredPaths: ['reducer.abortMethod'],
		}
	})
});

ReactDOM.render(
	<Provider store={store}><React.StrictMode><App /></React.StrictMode></Provider>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
