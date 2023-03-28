import { useDispatch } from 'react-redux';

import { buildCell, buildRow } from '../util/html';

import { markAsDone } from '../flux/action/index';

import { TO_DO } from '../constant/status';

function Entry(props) {

	const dispatch = useDispatch();

	let rowList = [
		buildRow(
			`entry_${props.index}_id`,
			buildCell(`entry_id`, props.entry.external_id, { className: 'padding_top' })
		),
		buildRow(
			`entry_${props.index}_url`,
			buildCell(`entry_url`, <a href={props.entry.url}>{props.entry.url}</a>)
		),
		buildRow(
			`entry_${props.index}_content`,
			buildCell(`entry_content`, props.entry.content)
		),
		buildRow(
			`entry_${props.index}_date`,
			buildCell(`entry_date`, `${props.entry.external_date ? `${props.entry.external_date} | ` : ''}${props.entry.creation_date}`)
		)
	];

	if (props.entry.status === TO_DO) {
		rowList = rowList.concat(
			buildRow(
				`entry_${props.index}_button`,
				buildCell(`entry_date`, <button
					onClick={() => dispatch(markAsDone(props.entry.id))}
					type='submit'
				>Mark as done</button>)
			)
		);
	}

	return rowList;
}

export default Entry;
