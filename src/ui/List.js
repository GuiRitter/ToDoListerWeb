import React/*, { useEffect, useRef }*/ from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getEntry, getList, signOut } from '../flux/action/index';

import { buildCell, buildRow, buildTable } from '../util/html';

import { getLog } from '../util/log';

const log = getLog('List.');

function List(props) {

	const dispatch = useDispatch();

	const listList = useSelector(state => (((state || {}).reducer || {}).data)) || [];

	log('List', { listList });

	return buildTable(
		[
			buildRow('title', buildCell('title', <h1>Lists</h1>)),
			buildRow(
				'header',
				buildCell('name', 'Name'),
				buildCell('manage', '')
			)
		].concat(listList.map((list, index) => buildRow(
			`list_${index}`,
			buildCell(`name_${index}`, list.name),
			buildCell(`manage_${index}`, <button
				onClick={() => dispatch(getEntry(list.id, list.name))}
				type='submit'
			>Manage</button>)
		))).concat(
			[
				buildRow(
					'refresh',
					buildCell('refresh', <button
						onClick={() => dispatch(getList())}
						type='submit'
					>Refresh</button>, { colSpan: 2 })
				),
				buildRow(
					'sign_out',
					buildCell('sign_out', <button
						onClick={() => dispatch(signOut())}
						type='submit'
					>Sign out</button>, { colSpan: 2 })
				)
			]
		)
	);
}

export default List;
