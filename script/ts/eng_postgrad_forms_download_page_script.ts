
//@ts-ignore
const count_list: number[] = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
];

//@ts-ignore
function countUp(id: string): void {
  const split_value: string[] = id.split("_");
  let number_id: number = parseInt(split_value[1]);
  let showNumber: number = ++count_list[number_id - 1];
  document.getElementById("showNumber" + number_id)!.innerHTML = showNumber.toString();
}
