import * as type from './../type';
import * as axios from './axios';

import { API_URL } from '../../constant/system';

import { getUrlWithSearchParams } from '../../util/http';

const moment = require('moment');

const doesNothing = ({
	type: type.NO_OP
});

export const batchImport = json => (dispatch, getState) => {
	let data;
	if (!window.confirm('sure?')) {
		return doesNothing;
	}
	try {
		data = JSON.parse(json);
	} catch (ex) {
		alert(ex);
		return doesNothing;
	}
	data = data.map(entry => ({
		list: getState().reducer.listId,
		status: 'to do',
		external_id: entry.externalId,
		url: entry.url,
		creation_date: moment().format(),
		external_date: entry.externalDate
	}));
	dispatch(axios.post(
		`${API_URL}/entry/put_all`,
		data,
		null,
		value => dispatch(getEntry(getState().reducer.listId, getState().reducer.listName)),
		null
	));
};

export const getEntry = (listId, listName) => dispatch => {
	dispatch(axios.get(
		getUrlWithSearchParams(`${API_URL}/entry/get`, { listId }),
		null,
		value => dispatch({
			type: type.GET_ENTRY,
			data: value.data,
			listId,
			listName
		}),
		null
	));
};

export const getList = () => dispatch => {
	dispatch(axios.get(
		`${API_URL}/list/get`,
		null,
		value => dispatch({
			type: type.GET_LIST,
			data: value.data
		}),
		null
	));
};

export const markAsDone = (entryId, elementId) => (dispatch, getState) => {
	if (!window.confirm('sure?')) {
		return doesNothing;
	}
	dispatch(axios.post(
		`${API_URL}/entry/do`,
		{ id: entryId },
		null,
		value => {
			dispatch(getEntry(getState().reducer.listId, getState().reducer.listName));
			dispatch(setScrollId(elementId));
		},
		null
	));
};

export const setScrollId = id => ({
	type: type.SET_SCROLL_ID,
	id
});

export const restoreFromLocalStorage = () => ({
	type: type.RESTORE_FROM_LOCAL_STORAGE
});

export const signIn = (login, password) => dispatch => {
	dispatch(axios.post(
		`${API_URL}/user/sign_in`,
		{ login, password },
		null,
		value => {
			if (!value) {
				alert('log in failed');
				return;
			}
			let data = value.data;
			if (!data) {
				alert('log in failed');
				return;
			}
			data = data.data;
			if (!data) {
				alert('log in failed');
				return;
			}
			let token = data.token;
			if (!token) {
				alert('log in failed');
				return;
			}
			dispatch({
				type: type.AUTHENTICATION,
				token
			})
		},
		null
	));
};

export const signOut = () => ({
	type: type.AUTHENTICATION,
	token: null
});
