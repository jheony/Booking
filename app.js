const calendarDates = document.getElementById("calendarDates");
const currentMonthElement = document.getElementById("currentMonth");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const selectDate = document.getElementById("selectDate");

const today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

function Calendar() {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const dayInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const startDayOfWeek = firstDayOfMonth.getDay();

    currentMonthElement.textContent = currentYear + '. ' + (currentMonth + 1) + '.';
    calendarDates.innerHTML = "";

    for (let i = 0; i < startDayOfWeek; i++) {
        const emptyDate = document.createElement("div");
        emptyDate.classList.add("date", "empty");
        calendarDates.appendChild(emptyDate);
    }

    for (let j = 1; j <= dayInMonth; j++) {
        const dateElement = document.createElement("a");
        dateElement.classList.add("date");
        dateElement.textContent = j;
        dateElement.id = j;
        calendarDates.appendChild(dateElement);

        dateElement.addEventListener("click", function () {
            selectDate.textContent = '선택된 날짜: ' + currentYear + '-' + (currentMonth + 1) + '-' + j;
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

const saveBooking = document.getElementById('saveBooking');


// 시간 선택 설정 함수
function setTime() {
    // 시작 시간 설정
    const startTimeSelect = document.getElementById('startTime');
    startTimeSelect.innerHTML = ''; 

    const startTimes = [];
    for (let hour = 8; hour < 23; hour++) {  // 0시부터 23시까지
        startTimes.push(`${hour}:00`);
    }

    startTimes.forEach(time => {
        const option = document.createElement('option');
        option.value = time;
        option.textContent = time;
        startTimeSelect.appendChild(option);
    });

    // 종료 시간 설정
    const eTimeSelect = document.getElementById('eTime');
    eTimeSelect.innerHTML = '';

    const eTimes = [];
    for (let hour = 9; hour < 24; hour++) {  // 0시부터 23시까지
        eTimes.push(`${hour}:00`);
    }

    eTimes.forEach(time => {
        const eoption = document.createElement('option');
        eoption.value = time;
        eoption.textContent = time;
        eTimeSelect.appendChild(eoption);
    });
}

// 종료 시간이 시작 시간보다 빠를 경우, 종료 시간을 시작 시간으로 변경
function validateTime() {
    const startTime = document.getElementById('startTime').value;
    const endTime = document.getElementById('eTime').value;

    if (startTime && endTime) {
        const [startHour, startMinute] = startTime.split(':').map(Number);
        const [endHour, endMinute] = endTime.split(':').map(Number);

        if (endHour < startHour || (endHour === startHour && endMinute <= startMinute)) {
            document.getElementById('eTime').value = `${endHour < startHour ? startHour+1 : endHour}:${'00'}`;
        }
    }
}

// 시간 설정 초기화 (처음 로딩 시)
setTime();

// 시작 시간과 종료 시간 비교하기
document.getElementById('startTime').addEventListener('change', validateTime);
document.getElementById('eTime').addEventListener('change', validateTime);

// 예약 저장 기능
saveBooking.addEventListener('click', function () {
    const date = selectDate.textContent.replace("선택된 날짜: ", "").trim();
    const title = document.getElementById('title').value;
    const memo = document.getElementById('memo').value;
    const startTime = document.getElementById('startTime').value;
    const eTime = document.getElementById('eTime').value;

    if (title && memo && startTime && eTime) {
        document.getElementById('bookingMessage').textContent = "예약이 저장되었습니다.";
    } else {
        document.getElementById('bookingMessage').textContent = "모든 항목을 입력해주세요.";
    }

    fetch("http://localhost:3000/addSchedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date, start_time: startTime, end_time: eTime, title, memo })
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);
        document.getElementById("booking").hidden = true;
    })
    .catch(error => console.error("오류:", error));
    
    document.getElementById("title").value = "";
    document.getElementById("startTime").value = "";
    document.getElementById("eTime").value = "";
    document.getElementById("memo").value = "";
});
