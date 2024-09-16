import { getDaysInMonth } from 'date-fns';
import React from 'react';

const DAY_LIST = ['일', '월', '화', '수', '목', '금', '토'];

//datepicker 날짜 설정
const useDatepicker = () => {
  const curDateHour = new Date().setHours(0, 0, 0, 0); //현재 날짜 비교용 변수(시간때문에 비교 연산자가 안 먹어서 setHours)

  const [pickFirstDate, setPickFirstdate] = React.useState(null); //첫 번째 선택 날짜
  const [pickSecDate, setPickSecdate] = React.useState(null); //두 번째 선택 날짜
  const [pointDate, setPointDate] = React.useState(new Date()); //달력의 기준 날짜
  const [pickState, setPickState] = React.useState(0); //선택 날짜 상태, 0:미선택 1:날짜 2:기간

  const totalMonthDays = getDaysInMonth(pointDate); //기준 날짜 달의 최대 일(ex.2024/3 -> 31)

  //선택월 첫째날 이전 데이터 리스트: class='muted', value=0
  //해당 달 1일의 요일을 가져오고, 이전 값을 0로 채움
  const mutedList = Array.from({
    length: new Date(pointDate.getFullYear(), pointDate.getMonth(), 1).getDay()}).map(
      (_, i) => ({ value: 0, class: 'muted' }));

  //기간 선택일 경우, 사이 날짜 찾기
  const isDateInRange = (date) => {
    if(!pickFirstDate || !pickSecDate) return false; //둘 중 하나라도 null이면 기간이 아님
    //기간이 선택된 경우
    if(pickFirstDate.setHours(0, 0, 0, 0) < pickSecDate.setHours(0, 0, 0, 0)){ //첫 번째 날짜가 두 번째 날짜 이전 날짜
      return date > pickFirstDate.setHours(0, 0, 0, 0) && date < pickSecDate.setHours(0, 0, 0, 0);
    } else { //첫 번째 날짜가 이후 날짜
      return date < pickFirstDate.setHours(0, 0, 0, 0) && date > pickSecDate.setHours(0, 0, 0, 0);
    }
  };

  //선택월 날짜 리스트: 현재 날짜와 비교(이전이면 class='disabled'), 첫 번째 or 두 번째 선택 날짜 class='picked', 두 날짜 사이 날짜 class='picked-btw'
  //현재 날짜 이전은 선택할 수 없음
  const daysList = Array.from({ length: totalMonthDays }).map((_, i) => {
    let arrDateHour = new Date(
      pointDate.getFullYear(),
      pointDate.getMonth(),
      i + 1
    ).setHours(0, 0, 0, 0);

    if (curDateHour > arrDateHour) {//현재 날짜보다 이전 날짜이면
      return { value: i + 1, class: 'disabled' };
    } else if (pickFirstDate && pickFirstDate.setHours(0, 0, 0, 0) === arrDateHour) { //첫 번째 선택 날짜가 존재하고, 현재 날짜와 같으면
      return { value: i + 1, class: 'picked' };
    } else if (pickSecDate && pickSecDate.setHours(0, 0, 0, 0) === arrDateHour) { //두 번째 선택 날짜가 존재하고, 현재 날짜와 같으면
      return { value: i + 1, class: 'picked' };
    } else if (isDateInRange(arrDateHour)) { //기간 안에 있는 날짜일 경우
      return { value: i + 1, class: 'picked-btw' };
    } else {
      return { value: i + 1 };
    }
  });

  const calendarList = mutedList.concat(daysList); //달력 리스트

  //달력 리스트 7일(주) 단위로 나누어서 반환
  const weekCalendarList = [];
  for (let i = 0; i < calendarList.length; i += 7) {
    weekCalendarList.push(calendarList.slice(i, i + 7));
  }

  //이전 달로 이동 버튼 disabled 여부 확인
  const isPrevMonthDisabled = () => {
    let now = new Date();
    //이전 달 선택은 이벤트로 막음
    if(pointDate.getFullYear() === now.getFullYear() && pointDate.getMonth() === now.getMonth()) {
      return true;
    } else {
      return false;
    }
  };

  //다음 달로 이동 버튼 disabled 여부 확인
  const isNextMonthDisabled = () => {
    let now = new Date();
    //해당 달 + 2달 까지만 표출(조건 바뀌면 고치기)
    if(pointDate.getFullYear() === now.getFullYear() && pointDate.getMonth() < now.getMonth() + 2) {
      return false;
    } else {
      return true;
    }
  };

  return {
    weekCalendarList: weekCalendarList,
    pointDate: pointDate,
    setPointDate: setPointDate,
    pickFirstDate: pickFirstDate,
    setPickFirstdate: setPickFirstdate,
    pickSecDate: pickSecDate,
    setPickSecdate: setPickSecdate,
    pickState: pickState,
    setPickState: setPickState,
    isPrevMonthDisabled: isPrevMonthDisabled(),
    isNextMonthDisabled: isNextMonthDisabled()
  };
};

export { DAY_LIST , useDatepicker };