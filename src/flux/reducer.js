import * as type from './type';

import { LOCAL_STORAGE_NAME } from '../constant/system';

import { getLog } from '../util/log';
import { updateLocalStorage } from '../util/persistence';

const log = getLog('flux.reducer.');

const initialState =
{
	abortMethod: null,
	data: null,
	isLoading: false,
	listId: null,
	listName: null,
	token: null,
};

const reducer = (currentState = initialState, action) => {
	log('reducer', { currentState, action });

	let nextState = Object.assign({}, currentState);

	if (!nextState.token) {
		nextState.data = null;
	}

	switch (action.type) {

		case type.ABORT_REQUEST:
			return updateLocalStorage({
				...nextState,
				abortController: null,
				isLoading: false,
			});

		case type.AUTHENTICATION:
			return updateLocalStorage({
				...nextState,
				token: action.token
			});

		case type.ENABLE_ABORT_REQUEST:
			return updateLocalStorage({
				...nextState,
				abortMethod: nextState.isLoading ? action.abortMethod : null
			});

		case type.GET_ENTRY:
			return updateLocalStorage({
				...nextState,
				data: action.data,
				listId: action.listId,
				listName: action.listName
			});

		case type.GET_LIST:
			return updateLocalStorage({
				...nextState,
				data: action.data,
				listId: null,
				listName: null
			});

		case type.LOADING:
			return updateLocalStorage({
				...nextState,
				abortController: action.isLoading ? nextState.abortController : null,
				isLoading: action.isLoading
			});

		case type.RESTORE_FROM_LOCAL_STORAGE:
			return JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME)) || initialState;

		default: return nextState;
	}
};

export default reducer;
