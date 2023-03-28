import React from 'react';
import { useDispatch } from 'react-redux';

import { abortRequest } from '../flux/action/axios';

import { buildCell, buildRow, buildTable } from '../util/html';

function Loading(props) {

	const dispatch = useDispatch();

	return buildTable(
		buildRow('header', buildCell('header', <h1>Loading</h1>)),
		buildRow('button', buildCell('button', <button
			onClick={() => dispatch(abortRequest())}
			type='submit'
		>Cancel</button>))
	);
}

export default Loading;
