import { renderCheckboxes } from './makeCheckboxList';
import { cellsData } from './makeCheckboxList';
import renderData from '../table/dataRender';
import data from '../my-statement-data';
import { find } from '../control/__search/control__search';

renderCheckboxes();

const checkboxes = document.querySelectorAll('.checkbox-list__checkbox'),
	checkboxTime = document.querySelector('input[name="time"]'),
	checkboxType = document.querySelector('input[name="type"]');

checkboxes.forEach((checkbox) => {
	checkbox.addEventListener('click', checkboxOnClickHandler);
});

const getQuanityActiveCheckbox = () => {
	let quanity = 0;
	checkboxes.forEach(checkbox => {
		if (checkbox.checked) {
			quanity++;
		}
	});
	return quanity;
};

function checkboxOnClickHandler() {
	const name = this.name;

	if (getQuanityActiveCheckbox() !== 0) {
		cellsData.forEach((checkbox) => {
			if (checkbox.className === name) {
				checkbox.checked = !checkbox.checked;
			}
		});

	} else {
		this.checked = true;
	}
	
	renderData(cellsData, data);
}

export const disableCheckbox = () => {
	checkboxTime.checked = false;
	checkboxType.checked = false;
	checkboxes.forEach((checkbox) => {
		checkbox.setAttribute('disabled', 'true');
		checkbox.removeEventListener('click', checkboxOnClickHandler);
	});
	cellsData.forEach((checkbox) => {
		if (checkbox.className === 'time' || checkbox.className === 'type') {
			checkbox.checked = false;
		}
	});
};

export const enableCheckbox = () => {
	checkboxes.forEach((checkbox) => {
		checkbox.removeAttribute('disabled');
		checkbox.checked = true;
		checkbox.addEventListener('click', checkboxOnClickHandler);
	});
	cellsData.forEach((checkbox) => {
		checkbox.checked = true;
	});
};