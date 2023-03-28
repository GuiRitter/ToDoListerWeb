import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { batchImport, getEntry, getList, setScrollId } from '../flux/action/index';

import { buildCell, buildRow, buildTable } from '../util/html';

import Entry from './Entry';

import { getLog } from '../util/log';

const log = getLog('EntryList.');

function componentDidMount(props, dispatch, scrollIntoId) {
	if (scrollIntoId) {
		dispatch(setScrollId(null));
		document.getElementById(scrollIntoId).scrollIntoView();
	}
}

function EntryList(props) {

	const didMountRef = useRef(false);

	const dispatch = useDispatch();

	const listId = useSelector(state => ((state || {}).reducer || {}).listId);
	const listName = useSelector(state => ((state || {}).reducer || {}).listName);
	const entryList = useSelector(state => (((state || {}).reducer || {}).data) || []);
	const scrollIntoId = useSelector(state => (((state || {}).reducer || {}).scrollIntoId));

	const [importField, setImportField] = useState(null);

	log('EntryList', { listId, listName, entryList });

	useEffect(() => {
		if (didMountRef.current) {
			// componentDidUpdate(props, prevProps);
		} else {
			didMountRef.current = true;
			componentDidMount(props, dispatch, scrollIntoId);
		}
	});

	return buildTable(
		[
			buildRow('title', buildCell('title', <h1>{`${listName} List`}</h1>)),
			buildRow('import_input', buildCell('import_input', <textarea
				ref={ref => { if (ref) { setImportField(ref); } }}
			/>)),
			buildRow('import_button', buildCell('import_button', <button
				onClick={() => dispatch(batchImport(importField.value))}
				type='submit'
			>Import</button>)),
		].concat(entryList.map((entry, index) => <Entry
			key={index}
			index={index}
			entry={entry}
		/>)).concat(
			[
				buildRow(
					'refresh',
					buildCell('refresh', <button
						onClick={() => dispatch(getEntry(listId, listName))}
						type='submit'
					>Refresh</button>)
				),
				buildRow(
					'back',
					buildCell('back', <button
						onClick={() => dispatch(getList())}
						type='submit'
					>Back</button>)
				)
			]
		)
	);
}

export default EntryList;
