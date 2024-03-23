// 空校验 null或""都返回true
function isEmpty (obj) {
	if ((typeof obj == "string")) {
		return !obj || obj.replace(/\s+/g, "") == ""
	} else {
		return (!obj || JSON.stringify(obj) === "{}" || obj.length === 0);
	}
}

function formatDate(value) {
	let date = new Date();
	date.setTime(value);
	let month = date.getMonth() + 1;
	let hours = date.getHours();
	if (hours < 10)
		hours = "0" + hours;
	let minutes = date.getMinutes();
	if (minutes < 10)
		minutes = "0" + minutes;
	let seconds = date.getSeconds();
		seconds = seconds < 10 ? ("0" + seconds) : seconds;
	let time = date.getFullYear() + "-" + month + "-" + date.getDate() +
		" " + hours + ":" + minutes + ":" + seconds;
	return time;
}

export default {  
    isEmpty,
	formatDate
}