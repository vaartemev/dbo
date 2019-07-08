const checkboxWrap = document.querySelector('.checkbox-wrap'),
	checkboxListBlock = document.createElement('ul');

checkboxListBlock.classList.add('checkbox-list__block');
checkboxWrap.appendChild(checkboxListBlock);

export const cellsData = [{  //Данные для рендера Чекбоксов и Ячеек
		title: 'Дата',
		className: 'date',
		checked: true
	},
	{
		title: 'Время',
		className: 'time',
		checked: true
	},
	{
		title: 'Тип',
		className: 'type',
		checked: true
	},
	{
		title: 'Приход',
		className: 'profit',
		checked: true
	},
	{
		title: 'Расход',
		className: 'lose',
		checked: true
	}
];

const makeInput = (text, className, checked) => {
	const checkboxItem = document.createElement('input'),
		checkboxTitle = document.createElement('label'),
		checkboxListItem = document.createElement('li');

	checkboxTitle.innerHTML = text;
	checkboxTitle.classList.add('checkbox-list__title');
	checkboxItem.classList.add('checkbox-list__checkbox');
	checkboxItem.setAttribute('name', className);
	checkboxItem.setAttribute('type', 'checkbox');

	checkboxItem.checked = checked;
	checkboxListItem.classList.add('checkbox-list__item');
	checkboxListItem.appendChild(checkboxItem);
	checkboxListItem.appendChild(checkboxTitle);

	checkboxListBlock.appendChild(checkboxListItem);
};

export const renderCheckboxes = () => {
	cellsData.forEach((checkbox) => {
		makeInput(checkbox.title, checkbox.className, checkbox.checked);
	});
};