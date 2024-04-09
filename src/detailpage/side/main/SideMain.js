import { subMonths } from 'date-fns';
import React, {useState} from 'react';
import { DAY_LIST , useDatepicker } from './component/datepicker/datepicker.js'
import './SideMain.css';

const SideMain = () => {

  /*
    toggle 기능이 있는 Container에 필요한 변수, 이벤트 함수 설정
   */
    /* 변수 */
  const [isToggledTop, setisToggledTop] = useState(false); //containerTop
  const [isToggledMid, setisToggledMid] = useState(false); //containerMid

    /* 이벤트 함수 */
  //containerTop
  const toggleTopHandler = () => {
    setisToggledTop(!isToggledTop);
  };

  //containerMid
  const toggleMidHandler = () => { //토글 버튼
    //isToggled의 상태를 변경함
    setisToggledMid(!isToggledMid);
  };


  /*
    ContainerTop에 필요한 달력, sideHeader, 이벤트 함수 설정
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

    /* sideHeader 설정 */
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


  /*
    ContainerMiddle에 필요한 timeTableList, seatTableList, 이벤트 함수 설정
  */
    /* 이벤트 함수 */
  const [selectedBtn, setSelectedBtn] = useState(0); //어떤 버튼을 선택했는지, 초기는 첫번째 버튼

  //time 버튼 클릭 핸들러
  const timeBtnHandler = (index, str) => {
    setSelectedBtn(index);
  };

    /* timeTableList */
  //데이터 가져오기(지금은 가데이터)
  const timeTableData = [{round: 1, time: '14:00'},
  {round: 2, time: '18:30'}];

  const timeTableList = []
    let tmpTtList = []
    for(let i = 0; i < timeTableData.length; i++){
      let uniqueKey = "TT-" + i;
      tmpTtList.push(
        <li className='timeTableItem' key={uniqueKey}>
          <a className={`timeTableLabel ${selectedBtn === i ? 'is-selected' : ''}`}  
            role='button'
            onClick={() => timeBtnHandler(i)}>
            {`${timeTableData[i].round}회`}
            <span>{timeTableData[i].time}</span>
            <span></span>
          </a>
        </li>
      );
    }

    timeTableList.push(
      <ul key={'TT'} className='timeTableList'>
        {tmpTtList}
      </ul>
    );

    /* seatTableList */
  //데이터 가져오기(지금은 가데이터)
  const seatTableData = [{seatType: 'VIP', seatStatus: 0},
  {seatType: 'R', seatStatus: 5},
  {seatType: 'S', seatStatus: 5},
  {seatType: 'A', seatStatus: 5}];

  //seatTableList
  const seatTableList = []
    let tmpStList = []
    for(let i = 0; i < seatTableData.length; i++){
      let uniqueKey = "ST-" + seatTableData[i].seatType;
      let tmpstatus = seatTableData[i].seatStatus;
      tmpStList.push(<li key={uniqueKey} className='seatTableItem'>
        <strong className='seatTableName'>{`${seatTableData[i].seatType}석`}</strong>
        <span className={`seatTableStatus ${tmpstatus === 0 ? 'is-soldout' : null}`}>{`${tmpstatus}${tmpstatus === 0 ? '석' : ''}`}</span>
      </li>);
    }

    seatTableList.push(
      <ul key={'ST'} className='seatTableList'>
        {tmpStList}
      </ul>
    );

  
  /*
    ContainerBottom에 필요한 설정
  */
  //데이터 불러오기(지금은 가데이터)
  const castingData = "유연석, 이예은";



  //return
  return (
    <div className='sideMain'>
      {/* sideMain */}

      <div className={`sideContainer containerTop sideToggleWrap ${isToggledTop ? "is-toggled" : null}`}>
        {/* ContainerTop */}
        <div className='sideHeader'>
          <a className='sideToggleBtn' role='button' onClick={toggleTopHandler}>
            <h4 className='sideTitle'>관람일</h4>
            <div className='selectedData'>
              <span className='blind'>선택된 일자:</span>
              <span className='date'>{`${calYear}.${calMonthnn}.${calDaynn} (${calWkday})`}</span>
            </div>
          </a>
        </div>

        <div className="sideCalendar">
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
          
      </div>

      <div className={`sideContainer containerMiddle sideToggledWrap ${isToggledMid ? "is-toggled" : null}`}>
        {/* containerMiddle */}            
        <div className='sideHeader'>
            <a className='sideToggleBtn' role='button' onClick={toggleMidHandler}>
                <h4 className='sideTitle'>회차</h4>
                <div className='selectedData'>
                    <span className='blind'>선택된 회차:</span>
                    <span className='time'>{`${timeTableData[selectedBtn].round}회 ${timeTableData[selectedBtn].time}`}</span>
                </div>
            </a>
        </div>
        
        <div className='sideContent'>
            <div className='sideTimeTable'>{timeTableList}</div>
            <h4 className='sideTitle blind'>잔여석</h4>
            <div className='sideSeatTable'>{seatTableList}</div>
        </div>

      </div>

      <div className='sideContainer containerBottom'>
        {/* containerBottom */}
        <div className='sideHeader'>
            <h4 className='sideTitle'>캐스팅</h4>
        </div>

        <div className='sideContent'>
            <div className='sideCasting'>
                <p className='castingList'>{castingData}</p>
            </div>
        </div>

      </div>


    </div>
    
  );
};
export default SideMain;