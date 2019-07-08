import renderData from '../../table/dataRender';
import { cellsData } from '../../checkbox-list/makeCheckboxList';

const searchField = document.querySelector('.control__search');

export function find(data) {
	searchField.addEventListener('input', function () {
		let searchValue = this.value.trim();

		if (searchValue === '') {
			renderData(cellsData, data);
		} else {
			let formattedData = data.filter((item) => {
				for (let key in item) {
					if (isInclude(item[key], searchValue)) {
						return true;
					}
				}
			});
			renderData(cellsData, formattedData);
		}
	});
}

const isInclude = (targetValue, searchValue) =>   //Проверить содержит ли элемент вводимое значение
	String(targetValue).toLowerCase().indexOf(searchValue.toLowerCase()) !== -1;