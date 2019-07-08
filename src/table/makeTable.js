const tableHead = document.createElement('thead'),
	  tableBody = document.createElement('tbody'),
	  table     = document.querySelector('table');

tableHead.classList.add('table__header');
tableBody.classList.add('table__body');

export const makeTable = () => {
	table.appendChild(tableHead);
	table.appendChild(tableBody);
};

export const makeCell = (className, content = '') => {
	const cell = document.createElement('td');
	cell.classList.add('table__cell');
	cell.classList.add(className);
	cell.innerHTML = content;
	return cell;
};