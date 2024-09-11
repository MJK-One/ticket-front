// import React, { useEffect, useState } from 'react';
// import DatePicker from '../component/datepicker/datepicker.js';
// import './monthpage.css';

// const MonthPage = () => {
//   const [isToggledContainer, setIsToggledContainer] = useState(false); // toggle

//   const toggleContainerHandler = () => {
//     setIsToggledContainer(!isToggledContainer);
//   };
  
//   const [calendarDateValue, setCalendarDateValue] = useState('');

//   const handleDateChange = (newDate) => {
//     setCalendarDateValue(newDate);
//   };

//   return (
//     <div id="region-mainContainer">
//       <div className="contents">
//         <div className="leftBox">
//           <div className={`filterContainer ContainerBottom ${isToggledContainer ? "is-toggled" : null}`}>
//             {/* Container */}
//             <div className='filterHeader'>
//               <a className='filterToggleBtn' role='button' onClick={toggleContainerHandler}>
//                 <div className='selectedData'>
//                   <span className='blind'>선택된 일자:</span>
//                   <span className='date'>{calendarDateValue}</span>
//                 </div>
//               </a>
//             </div>

//             <DatePicker onDateChange={handleDateChange} />
//           </div>
//         </div>

//         <div className="rightBox">
//           <div className="rightBoxTop">
//           { regionItemList && regionItemList.length > 0 ? (
//                             regionItemList.map(item => (
//                             <Link to={`/detail/${item.id}`}>
//                                 <div className="wrapBox" key="region_page_wrapBox_comp">
//                                     <div className="posterImg" key="region_page_posterImg_comp">
//                                         <img src={item.image_url} />
//                                     </div>
//                                     <div className="textWrap" key="region_page_textWrap_comp">
//                                         <span className="posterTitle" key="region_page_posterTitle_comp">{item.name}</span>
//                                         <span className="posterDate" key="region_page_posterDate_comp">{item.period}</span>
//                                     </div>
//                                 </div>
//                             </Link>
//                             ))
//                         ) : (
//                             <p className='no_result'>결과 없음</p>
//                         )}
//           </div>

//           <div className="rightBoxBottom">
//             <button className="monthGoBtn">날짜별 공연 전체보기</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MonthPage;
