import { subMonths } from 'date-fns';
import React from 'react';
import { DAY_LIST , useDatepicker } from './datepickerSetting.js';
import './datepicker.css';

const DatePicker = () => {

  /*
    달력, 이벤트 함수 설정
  */
    /* 달력 설정 */
  //달력 객체
  const calendar = useDatepicker();
  const calendarlst = calendar.weekCalendarList;

  //요일 리스트
  const weekList = []
  for(let i = 0; i < DAY_LIST.length; i++){
    let uniqueKey = "DP-yoil-" + i;
    weekList.push(<li key={uniqueKey}>{DAY_LIST[i]}</li>);
  }

  //일 리스트
  const daysList = []
  for(let i = 0; i < calendarlst.length; i++){
    let tmpList = []
    for(let j = 0; j < calendarlst[i].length; j++){
      //
      let dClass = calendarlst[i][j].class;
      let dValue = calendarlst[i][j].value;
      let uniqueKey = `DP-day-${i}-${j}`;

      tmpList.push(
        <li
          key={uniqueKey}
          className={dClass}
          onClick={() => {
            if((dClass !== "disabled") && (dClass !== "muted")){
              checkDate(dValue);
            }
          }}>
          {dValue}
        </li>);
    }

    let uniqueKey = "DP-wk-" + i;
    daysList.push(<ul key={uniqueKey}>
      {tmpList}
    </ul>);
  }

  //날짜 str
  let calYear = calendar.pickDate.getFullYear();
  let calMonthnn = ("0" + (calendar.pickDate.getMonth() + 1)).slice(-2)
  let calDaynn = ("0" + calendar.pickDate.getDate()).slice(-2);

  let calWkday = DAY_LIST[calendar.pickDate.getDay()];

    /* 이벤트 함수 설정 */
  //날짜 클릭 함수
  const checkDate = (day) => { //날짜 선택
    //클릭한 날짜 yyyy-MM-dd로
    let ckDatestr = calYear + "-" + calMonthnn + "-" + ("0" + day).slice(-2);
    let ckDate = new Date(ckDatestr);

    //캘린더 날짜 바꾸기
    calendar.setPickdate(ckDate);
  };


  //return
  return (
    <div className="Calendar">
        <div className="datepicker">

            <div className="month-check-bar">
                <ul>
                    <li className={`month-prev ${calendar.isPrevMonthDisabled ? 'disabled' : ''}`}
                        onClick={() => {
                        if(!calendar.isPrevMonthDisabled){
                            calendar.setPickdate(subMonths(calendar.pickDate, 1));
                        }
                        }}>
                        ‹
                    </li>
                    <li className="month-cur">{calYear}. {calMonthnn}</li>
                    <li className={`month-next ${calendar.isNextMonthDisabled ? 'disabled' : ''}`}
                        onClick={() => {
                        if(!calendar.isNextMonthDisabled){
                            calendar.setPickdate(subMonths(calendar.pickDate, -1));
                        }
                        }}>
                        ›
                    </li>
                </ul>
            </div>
            
            <div className="week-check-bar">
                <ul>
                {weekList}
                </ul>
            </div>
            
            <div className="day-check">
                <ul>
                {daysList}
                </ul>
            </div>
        
        </div>
    </div>

  );
};
export default DatePicker;