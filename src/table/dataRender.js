import { makeTable, makeCell } from "./makeTable";
import { cellsData } from '../checkbox-list/makeCheckboxList';

makeTable();

const tableBody = document.querySelector('.table__body'),
	tableHead = document.querySelector('.table__header');

function renderTableHead() {
	const row = document.createElement('tr');
	row.classList.add('table__row');

	cellsData.forEach(function (cell) {
		if (cell.checked) {
			row.appendChild(makeCell(cell.className, cell.title));
		}
	});

	tableHead.appendChild(row);
}


const renderData = (checkbox, data) => {
	tableHead.innerHTML = '';
	tableBody.innerHTML = '';

	renderTableHead();
	
	data.forEach((cellData) => {
		const row = document.createElement('tr');
		row.classList.add('table__row');
		for (let key in cellData) {
			switch (key) {
				case '_id':
					row.id = cellData[key];
					break;
				case 'date':
					let dates = new Date(cellData[key]);
					if (checkbox[0].checked) {
						row.appendChild(makeCell('date', dates.toLocaleDateString()));
					}
					if (checkbox[1].checked) {
						row.appendChild(makeCell('time', dates.toLocaleTimeString()));
					}
					break;
				case 'newFormatDate':
					if (checkbox[0].checked) {
						row.appendChild(makeCell('date', cellData[key]));
					}
					break;
				case 'type':
					if (checkbox[2].checked) {
						row.appendChild(makeCell('type', cellData[key]));
					}
					break;
				case 'amount':
					if (cellData[key] > 0) {
						if (checkbox[3].checked && checkbox[4].checked) {
							row.appendChild(makeCell('profit', cellData[key].toLocaleString()));
							row.appendChild(makeCell('lose'));
						} else if (checkbox[3].checked) {
							row.appendChild(makeCell('profit', cellData[key].toLocaleString()));
						}
					} else {
						if (checkbox[3].checked && checkbox[4].checked) {
							row.appendChild(makeCell('profit'));
							row.appendChild(makeCell('lose', cellData[key].toLocaleString()));
						} else if (checkbox[4].checked) {
							row.appendChild(makeCell('lose', cellData[key].toLocaleString()));
						}
					}
					break;
				default:
					break;
			}
		}
		tableBody.appendChild(row);
	});
};

export default renderData;