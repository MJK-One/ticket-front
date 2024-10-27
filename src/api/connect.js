import axios from "axios";

export const API_SERVER_HOST = "http://localhost:8080";

// naverSearch
export const naverSearch = async (placeName) => {
    const res = await axios.get(`${API_SERVER_HOST}/naverSearch?searchPlace=${placeName}`);
    return res.data;
};

// MainPostController > getTop10()
export const getTop10 = async () => {
    const res = await axios.get(`${API_SERVER_HOST}/top10`);
    return res.data;
};

// MainPostController > getmonth()
export const getMonth = async () => {
    const res = await axios.get(`${API_SERVER_HOST}/month`);
    return res.data;
};

// MainPostController > getalllist() with pagination
export const getAllList = async (page, size) => {
    const res = await axios.get(`${API_SERVER_HOST}/alllist`, {
        params: {
            page: page,
            size: size
        }
    });
    return res.data.content; // Page 객체의 content 부분만 반환
};

// MainPostController > getgenre()
export const getGenre = async (genre) => {
    const res = await axios.get(`${API_SERVER_HOST}/genre/${genre}`);
    return res.data;
};

// MainPostController > getTop10ByGenreOrderByViewCount()
export const getTop10ByGenre = async (genre) => {
    const res = await axios.get(`${API_SERVER_HOST}/top10/${genre}`);
    return res.data;
};

export const naverLogin = async () => {
    const res = await axios.get(`${API_SERVER_HOST}/api/naver/login`);
    return res.data;
};

export const createReservation = async (reservationData) => {
    try {
        const res = await axios.post(`${API_SERVER_HOST}/api/reservations`, reservationData);
        return res.data; // 성공적으로 생성된 예약 데이터 반환
    } catch (error) {
        console.error('Error creating reservation:', error.response ? error.response.data : error.message);
        throw error; // 호출하는 쪽에서 에러를 처리할 수 있도록 에러 던짐
    }
};
