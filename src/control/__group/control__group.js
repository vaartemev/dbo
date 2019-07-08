const checkCoincidence = (data, newFormatDate) => {  //Вернуть true если есть совпадение текущей даты с переданной датой
	return data.some(item => {
		return item.newFormatDate === newFormatDate;
	});
}

const getIndexOfThisDate = (data, newFormatDate) => {
	return data.findIndex(item => {
		return item.newFormatDate === newFormatDate;
	});
}

const groupByDay = (data) => {
    return data.reduce((result, currentData) => {
        const newFormatDate = new Date(currentData.date).toLocaleDateString();
        
		if (checkCoincidence(result, newFormatDate)) {
			const index = getIndexOfThisDate(result, newFormatDate);
            result[index].amount += Number(currentData.amount.toFixed(2));
		} else {
			const index = result.length;
			result[index] = { newFormatDate };
            result[index].amount = Number(currentData.amount);
		}

		return result;
	}, []);
}

export default groupByDay;