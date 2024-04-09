import { getDaysInMonth } from 'date-fns';
import React from 'react';

const DAY_LIST = ['일', '월', '화', '수', '목', '금', '토'];

//datepicker 날짜 설정
const useDatepicker = () => {
  const curDateHour = new Date().setHours(0, 0, 0, 0); //현재 날짜 비교용 변수(시간때문에 비교 연산자가 안 먹어서 setHours)
  const [pickDate, setPickdate] = React.useState(new Date()); //기본값: 현재 날짜, date-fns로 이벤트 줘서 변경
  const totalMonthDays = getDaysInMonth(pickDate); //선택된 달의 최대 일(ex.2024/3 -> 31)

  //선택월 첫째날 이전 데이터 리스트: class='muted', value=0
  //해당 달 1일의 요일을 가져오고, 이전 값을 0로 채움
  const mutedList = Array.from({
    length: new Date(pickDate.getFullYear(), pickDate.getMonth(), 1).getDay()}).map(
      (_, i) => ({ value: 0, class: 'muted' }));

  //선택월 날짜 리스트: 현재 날짜와 비교(이전이면 class='disabled'), 선택 날짜 class='picked'
  //현재 날짜 이전은 선택할 수 없음
  const daysList = Array.from({ length: totalMonthDays }).map((_, i) => {
    let arrDateHour = new Date(
      pickDate.getFullYear(),
      pickDate.getMonth(),
      i + 1
    ).setHours(0, 0, 0, 0);

    if (curDateHour > arrDateHour) {//현재 날짜보다 이전 날짜이면
      return { value: i + 1, class: 'disabled' };
    } else if (pickDate.setHours(0, 0, 0, 0) === arrDateHour) { //현재 날짜와 같으면
      return { value: i + 1, class: 'picked' };
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
    if(pickDate.getFullYear() === now.getFullYear() && pickDate.getMonth() === now.getMonth()) {
      return true;
    } else {
      return false;
    }
  };

  //다음 달로 이동 버튼 disabled 여부 확인
  const isNextMonthDisabled = () => {
    let now = new Date();
    //해당 달 + 2달 까지만 표출(조건 바뀌면 고치기)
    if(pickDate.getFullYear() === now.getFullYear() && pickDate.getMonth() < now.getMonth() + 2) {
      return false;
    } else {
      return true;
    }
  };

  return {
    weekCalendarList: weekCalendarList,
    pickDate: pickDate,
    setPickdate: setPickdate,
    isPrevMonthDisabled: isPrevMonthDisabled(),
    isNextMonthDisabled: isNextMonthDisabled()
  };
};

export { DAY_LIST , useDatepicker };