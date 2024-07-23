const calendarDates = document.getElementById("calendarDates");
const currentMonthElement = document.getElementById("currentMonth");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const selectDate = document.getElementById("selectDate");

const today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

function Calendar() {

    const firstDayOfMonth = new Date(currentYear, currentMonth, 1); // 해당 월의 첫번째 날짜
    const dayInMonth = new Date(currentYear, currentMonth + 1, 0).getDate(); // 해당 월의 날짜의 수
    const startDayOfWeek = firstDayOfMonth.getDay(); // 첫번째 날짜의 요일
    console.log(firstDayOfMonth,startDayOfWeek)

    currentMonthElement.textContent = currentYear + '. ' + (currentMonth + 1) + '.';
    calendarDates.innerHTML = "";

    for (let i = 0; i < startDayOfWeek; i++) {  // 요일과 날짜 시작 위치 맞추기
        const emptyDate = document.createElement("div");
        emptyDate.classList.add("date", "empty");
        calendarDates.appendChild(emptyDate);
    }
    for (let j = 1; j <= dayInMonth; j++) {     // 날짜 생성
        const dateElement = document.createElement("a");
        dateElement.classList.add("date");
        dateElement.textContent = j;
        dateElement.id = j;
        calendarDates.appendChild(dateElement);

        dateElement.addEventListener("click", function () { // 날짜 선택 시 예약버튼 보이기
            selectDate.textContent = currentYear + '. ' + (currentMonth + 1) + '. ' + j + '. ';
            document.getElementById("booking").hidden = false;
        });
    }
}
Calendar();
prevBtn.addEventListener("click", function () {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    Calendar();
});
nextBtn.addEventListener("click", function () {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    Calendar();
});