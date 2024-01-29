"use strict";
//@ts-ignore
const count_list = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
];
//@ts-ignore
function countUp(id) {
    const split_value = id.split("_");
    let number_id = parseInt(split_value[1]);
    let showNumber = ++count_list[number_id - 1];
    document.getElementById("showNumber" + number_id).innerHTML = showNumber.toString();
}
