
//Booking
const endTimeSelect = document.getElementById('endTime');
const saveBooking = document.getElementById('saveBooking');


ampm.addEventListener('change', setTime);

function setTime() {
    const ampm = document.getElementById('ampm').value;
    const startTimeSelect = document.getElementById('startTime');
    startTimeSelect.innerHTML = '';

    const times = [];   // 선택지 시간 생성
    for (let hour = 0; hour < 12; hour++) {
        times.push(`${hour}:00`);
        times.push(`${hour}:30`);
    }
    times.forEach(time => { // 예약 시작시간 선택
        const option = document.createElement('option');
        option.value = `${ampm} ${time}`;
        option.textContent = `${ampm} ${time}`;
        startTimeSelect.appendChild(option);
    });

    const eTimeSelect = document.getElementById('eTime');
    eTimeSelect.innerHTML = '';

    const etimes = [];
    for (let hour = 0; hour < 12; hour++) {
        etimes.push(`${hour}:00`);
        etimes.push(`${hour}:30`);
    }
    etimes.forEach(time => {    // 예약 끝시간 선택
        const eoption = document.createElement('option');
        eoption.value = `${ampm} ${time}`;
        eoption.textContent = `${ampm} ${time}`;
        eTimeSelect.appendChild(eoption);
    });
}

setTime();
// 예약 저장
saveBooking.addEventListener('click', function () {

    const title = document.getElementById('title').value;
    const memo = document.getElementById('memo').value;
    const time = document.getElementById('startTime').value;
    // console.log(title, memo, time)

    document.getElementById("booking").hidden = true;
    // 입력칸 초기화
    document.getElementById('title').value = '';
    document.getElementById('memo').value = '';
    document.getElementById('ampm').value = 'AM';

});