import { subMonths } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { DAY_LIST , useDatepicker } from './datepickerSetting.js';
import './datepicker.css';

const DatePicker = ({ onDateChange }) => {

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
  const [finalDateStr, setFinalDateStr] = useState("전체"); //최종 날짜 문자열, 초기값: "전체"(미선택)
  
  useEffect(() => {
    const pickFDate = calendar.pickFirstDate;
    const pickSDate = calendar.pickSecDate;

    if(pickFDate && pickSDate){ //기간이 선택된 경우
      //첫 번째 날짜 문자열
      let calFYear = pickFDate.getFullYear();
      let calFMonthnn = ("0" + (pickFDate.getMonth() + 1)).slice(-2);
      let calFDaynn = ("0" + pickFDate.getDate()).slice(-2);
  
      //두 번째 날짜 문자열
      let calSYear = pickSDate.getFullYear();
      let calSMonthnn = ("0" + (pickSDate.getMonth() + 1)).slice(-2);
      let calSDaynn = ("0" + pickSDate.getDate()).slice(-2);
  
      if(pickFDate.setHours(0, 0, 0, 0) < pickSDate.setHours(0, 0, 0, 0)){ //첫번째 날짜가 두 번째 날짜보다 이전 날짜
        //최종 문자열
        setFinalDateStr(`${calFYear}.${calFMonthnn}.${calFDaynn} ~ ${calSYear}.${calSMonthnn}.${calSDaynn}`);
  
      } else { //첫 번째 날짜가 두 번째 날짜 이후 날짜
        //최종 문자열
        setFinalDateStr(`${calSYear}.${calSMonthnn}.${calSDaynn} ~ ${calFYear}.${calFMonthnn}.${calFDaynn}`);
      }
  
    } else if(pickFDate){ //날짜가 선택된 경우
      //첫 번째 날짜 문자열
      let calFYear = pickFDate.getFullYear();
      let calFMonthnn = ("0" + (pickFDate.getMonth() + 1)).slice(-2);
      let calFDaynn = ("0" + pickFDate.getDate()).slice(-2);
  
      setFinalDateStr(`${calFYear}.${calFMonthnn}.${calFDaynn}`);
    } else {
      setFinalDateStr("전체");
    }
  
    onDateChange(finalDateStr);

  }, [calendar.pickFirstDate, calendar.pickSecDate, onDateChange, finalDateStr]);


    /* 이벤트 함수 설정 */
  // 현재 달력 연도, 달
  const calYear = calendar.pointDate.getFullYear();
  const calMonthnn = ("0" + (calendar.pointDate.getMonth() + 1)).slice(-2);

  //날짜 클릭 함수
  const checkDate = (day) => { //날짜 선택
    //클릭한 날짜 yyyy-MM-dd로
    const ckDatestr = calYear + "-" + calMonthnn + "-" + ("0" + day).slice(-2);
    const ckDate = new Date(ckDatestr);

    if(calendar.pickState === 0){ //이전 상태가 미선택(0)
      calendar.setPickFirstdate(ckDate); //날짜 선택
      calendar.setPickState(1); //상태 > 날짜 선택
    } else if(calendar.pickState === 1){ //이전 상태가 날짜 선택(1)
      if(ckDate.setHours(0, 0, 0, 0) === calendar.pickFirstDate.setHours(0, 0, 0, 0)){ //같은 날짜 선택 시
        //초기화
        calendar.setPickFirstdate(null);
        calendar.setPickState(0); //상태 > 미선택
      } else { //다른 날짜 선택 시
        calendar.setPickSecdate(ckDate);
        calendar.setPickState(2); //상태 > 기간 선택
      }

    } else { //이전 상태가 기간 선택(2)
      calendar.setPickSecdate(null);
      calendar.setPickFirstdate(ckDate);
      calendar.setPickState(1); //상태 > 날짜 선택
    }
  };

  /*
  redux
   */
  const searchSlice = useSelector((state) => state.searchs.search);
  // 달력 상태 업데이트: searchSlice.period 값이 변경될 때마다
  useEffect(() => {
    const sepPeriod = searchSlice.period.split(" ~ "); // 기간인지 아닌지 구분
    if(sepPeriod.length === 2){ //기간이라면
      calendar.setPickFirstdate(new Date(sepPeriod[0]));
      calendar.setPickSecdate(new Date(sepPeriod[1]));
      calendar.setPickState(2); //상태 > 기간 선택
    } else if(sepPeriod.length === 1){ //"전체" or 단일 날짜
      if(sepPeriod[0] === "전체"){
        //초기화
        calendar.setPickFirstdate(null);
        calendar.setPickSecdate(null);
        calendar.setPickState(0); //상태 > 미선택
      } else { //단일 날짜
        calendar.setPickFirstdate(new Date(sepPeriod[0]));
        calendar.setPickSecdate(null);
        calendar.setPickState(1); //상태 > 날짜 선택
      }
    } else {
      console.log("error");
    }
  }, [searchSlice.period]);


  //return
  return (
    <div className="Calendar">
        <div className="datepicker">

            <div className="month-check-bar">
                <ul>
                    <li className={`month-prev ${calendar.isPrevMonthDisabled ? 'disabled' : ''}`}
                        onClick={() => {
                        if(!calendar.isPrevMonthDisabled){
                            calendar.setPointDate(subMonths(calendar.pointDate, 1));
                        }
                        }}>
                        ‹
                    </li>
                    <li className="month-cur">{calYear}. {calMonthnn}</li>
                    <li className={`month-next ${calendar.isNextMonthDisabled ? 'disabled' : ''}`}
                        onClick={() => {
                        if(!calendar.isNextMonthDisabled){
                            calendar.setPointDate(subMonths(calendar.pointDate, -1));
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

            <input type='hidden' name='datepicker-str' id='datepicker-str' className='datepicker-str' value={finalDateStr} />
        
        </div>
    </div>

  );
};
export default DatePicker;