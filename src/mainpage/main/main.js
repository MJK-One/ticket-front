import React, { useState, useEffect} from 'react';
import './main.css';
import MainTop from './mainTop';
import Openticket from './openticket';
import { gethome, getByGenre } from '../../api/connect'; // API 함수를 불러옵니다.
import { useLocation } from 'react-router-dom';

function Main() {
    const [tickets, setTickets] = useState([]); // tickets 상태를 추가
    const location = useLocation(); // 현재 경로를 가져옵니다

    // 경로에 따라 장르를 결정하는 함수
    const getGenreFromPath = (path) => {
        switch(path) {
            case '/genre/musicall':
                return '뮤지컬연극';
            case '/genre/consert':
                return '콘서트';
            case '/genre/exhibitionevent':
                return '전시행사';
            case '/genre/classic':
                return '클래식';
            default:
                return ''; // 기본 경로는 전체 데이터를 가져옵니다
        }
    };

    // 컴포넌트가 마운트될 때 gethome() 함수를 호출하여 데이터를 불러옵니다.
    useEffect(() => {
        // 데이터를 비동기적으로 불러옵니다.
        const fetchData = async () => {
            try {
                let result;
                const genre = getGenreFromPath(location.pathname);
                if (genre) {
                    result = await getByGenre(genre); // 특정 장르 데이터 호출
                } else {
                    result = await gethome(); // 전체 데이터 호출
                }
                setTickets(result); // 결과를 tickets 상태에 저장
            } catch (error) {
                console.error('데이터를 불러오는 데 실패했습니다.', error);
            }
        };

        fetchData();
    }, [location.pathname]); // 경로가 변경될 때마다 데이터를 다시 불러옵니다

    return (
        <main id="contents">
            <section className='maintop'>
                <MainTop tickets={tickets} /> {/* tickets를 MainTop에 props로 전달 */}
            </section>
            <section className='ticket-site'>
                <Openticket tickets={tickets} /> {/* tickets를 Openticket에 props로 전달 */}
            </section>
        </main>
    );   
}

export default Main;

// import React, { useState, useEffect} from 'react';
// import './main.css';
// import MainTop from './mainTop';
// import Openticket from './openticket';
// import { gethome } from '../../api/connect'; // API 함수를 불러옵니다.

// function Main() {
//     const [tickets, setTickets] = useState([]); // tickets 상태를 추가

// // 컴포넌트가 마운트될 때 gethome() 함수를 호출하여 데이터를 불러옵니다.
//    useEffect(() => {
//     // 데이터를 비동기적으로 불러옵니다.
//     const fetchData = async () => {
//         try {
//             const result = await gethome(); // API 호출
//             setTickets(result); // 결과를 tickets 상태에 저장
//         } catch (error) {
//             console.error('데이터를 불러오는 데 실패했습니다.', error);
//         }
//     };

//     fetchData();
// }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때만 실행되도록 합니다.

//     return (
//         <main id="contents">
//             <section className='maintop'>
//                 <MainTop tickets={tickets} /> {/* tickets를 MainTop에 props로 전달 */}
//             </section>
//             <section className='ticket-site'>
//                 <Openticket tickets={tickets} /> {/* tickets를 Openticket에 props로 전달 */}
//             </section>
//         </main>
//     );   
// }

// export default Main;