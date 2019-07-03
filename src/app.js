import data from "./my-statement-data";

const d = document,
	checkboxes = d.querySelectorAll('.checkbox'),
	checkTime = d.querySelector('input[name="time"]'),
	checkType = d.querySelector('input[name="type"]'),
	searchField = d.querySelector('#search'),
	tableBody = d.querySelector('tbody'),
	select = d.querySelector('#sorter');

data.sort(function (prev, next) {
	return new Date(prev.date) - new Date(next.date);
});

checkboxes.forEach((el) => {
	el.addEventListener('click', handlerCheckbox);
});

searchField.addEventListener('input', search);

select.addEventListener("change", function () {
	if (select.value === "byDay") {
		sortByDay();
	} else {
		noSort();
	}
});

function activateTimeAndType(active) {
	checkTime.checked = active;
	checkType.checked = active;
}

function countActiveCheckbox() {
	let activeCheckboxes = [];

	checkboxes.forEach((el) => {
		if (el.checked) {
			activeCheckboxes.push(el.name);
		}
	});

	return activeCheckboxes;
}

function sortByDay() {
	let arr = sort(data);
	let resultData = [];

	for (let i = 0; i < arr.length; i++) {
		resultData.push(getRowContent(i, arr));
	}

	checkboxes.forEach((el) => {
		el.checked = true;
		activateTimeAndType(false);
		el.removeEventListener('click', handlerCheckbox);
		el.setAttribute('disabled', 'true');
	});

	render(countActiveCheckbox(), resultData);
}

function noSort() {
	activateTimeAndType(true);

	checkboxes.forEach((el) => {
		el.addEventListener('click', handlerCheckbox);
		el.removeAttribute('disabled');
	});

	render(countActiveCheckbox(), arr);
}

function sort(data) {
	let resultData = data.reduce((result, currentData) => {
		let dateObj = new Date(currentData.date);
		let newFormatDate = dateObj.toLocaleDateString();
		if (!isSetThisDate(result, newFormatDate)) {
			const index = result.length;
			result[index] = {
				newFormatDate
			};
			result[index].amount = +currentData.amount;
		} else {
			const index = indexOfThisDate(result, newFormatDate);
			if (+currentData.amount >= 0) {
				result[index].amount += +(currentData.amount).toFixed(2);
			}
		}
		return result;
	}, []);
	return resultData;
}

function isSetThisDate(data, newFormatDate) {
	return data.some(item => {
		return item.newFormatDate === newFormatDate;
	});
}

function indexOfThisDate(data, newFormatDate) {
	let index = data.findIndex(item => {
		return item.newFormatDate === newFormatDate;
	});
	return index;
}


function handlerCheckbox() {
	if (countActiveCheckbox() == 0) {
		this.checked = true;
	}
	render(countActiveCheckbox(), arr);
}

function search() {
	let val = this.value.trim(),
		elements = d.querySelectorAll('tbody tr');

	if (val !== '') {
		elements.forEach(function (elem) {
			if (elem.innerText.search(val) == -1) {
				elem.classList.add('hide');
			} else {
				elem.classList.remove('hide');
			}
		});
	} else {
		elements.forEach(function (elem) {
			elem.classList.remove('hide');
		});
	}
}

function getRowContent(a, data) {
	let rowContent = {};

	for (let i = 0; i < data.length; i++) {
		for (let key in data[a]) {
			switch (key) {
				case '_id':
					rowContent.id = data[a][key];
					break;
				case 'date':
					let dates = new Date(data[a][key]);
					rowContent.date = dates.toLocaleDateString();
					rowContent.time = dates.toLocaleTimeString();
					break;
				case 'newFormatDate':
					rowContent.date = data[a][key];
					break;
				case 'type':
					rowContent.type = data[a][key];
					break;
				case 'amount':
					if (data[a][key] > 0) {
						rowContent.profit = data[a][key].toLocaleString();
						rowContent.lose = '0.0';
					} else {
						rowContent.profit = '0.0';
						rowContent.lose = data[a][key].toLocaleString();
					}
					break;
				default:
					break;
			}
		}
	}

	return rowContent;
}

function render(classes, arr) {
	let thead = d.querySelector('thead');

	thead.innerHTML = '';
	tableBody.innerHTML = '';

	let rowHead = d.createElement('tr');

	for (let i = 0; i < classes.length; i++) {
		rowHead.insertCell();
		rowHead.children[i].classList.add(classes[i]);
	}

	for (let i = 0; i < arr.length; i++) {
		let row = d.createElement('tr');

		for (let j = 0; j < classes.length; j++) {
			row.insertCell();
			row.children[j].classList.add(classes[j]);
			switch (classes[j]) {
				case 'date':
					rowHead.children[j].innerHTML = 'Дата';
					row.children[j].innerHTML = arr[i].date;
					break;
				case 'time':
					rowHead.children[j].innerHTML = 'Время';
					row.children[j].innerHTML = arr[i].time;
					break;
				case 'type':
					rowHead.children[j].innerHTML = 'Тип';
					row.children[j].innerHTML = arr[i].type;
					break;
				case 'profit':
					rowHead.children[j].innerHTML = 'Приход';
					row.children[j].innerHTML = arr[i].profit;
					break;
				case 'lose':
					rowHead.children[j].innerHTML = 'Расход';
					row.children[j].innerHTML = arr[i].lose;
					break;
				default:
					break;
			}
		}

		thead.appendChild(rowHead);
		tableBody.appendChild(row);
	}
}

let arr = [];

for (let i = 0; i < data.length; i++) {
	arr.push(getRowContent(i, data));
}

render(countActiveCheckbox(), arr);