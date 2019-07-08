import data from "./my-statement-data";
import { disableCheckbox, enableCheckbox } from './checkbox-list/checkboxHandlers';
import renderData from './table/dataRender';
import { cellsData } from './checkbox-list/makeCheckboxList';
import groupByDay from './control/__group/control__group';
import { find } from './control/__search/control__search';

const select = document.querySelector('.control__group');

data.sort((prev, next) => {
	return new Date(prev.date) - new Date(next.date);
});

select.addEventListener("change", function () {
	if (select.value === "group__by_day") {
		enableCheckbox();
		disableCheckbox();
		renderData(cellsData, groupByDay(data));
		find(groupByDay(data));
	} else {
		enableCheckbox();
		renderData(cellsData, data);
	}
});

renderData(cellsData, data);
find(data);