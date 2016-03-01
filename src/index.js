import React from 'react';
import {render} from 'react-dom';
import App from './containers/app';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';

const loggerMiddleware = createLogger();

const createStoreWithMiddleware = applyMiddleware(
	loggerMiddleware,

	//make sure this at last
	thunkMiddleware
)(createStore);

const store = createStoreWithMiddleware(rootReducer);

render(
	<Provider store={store}>
		<App />
	</Provider>, 
	document.getElementById('app')
);