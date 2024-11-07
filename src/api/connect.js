import axios from "axios";

export const API_SERVER_HOST = "http://localhost:8080";

// naverSearch: 장소(venue)로 검색
export const naverPlaceSearch = async (placeName) => {
    const res = await axios.get(`${API_SERVER_HOST}/naverPlaceSearch?searchPlace=${placeName}`);
    return res.data;
};

// naverSearch: 주소(address)로 검색
export const naverAddrSearch = async (placeAddr) => {
    const encodedAddr = encodeURIComponent(placeAddr);
    const res = await axios.get(`${API_SERVER_HOST}/naverAddrSearch?searchAddr=${encodedAddr}`);
    return res.data;
};

// SearchController > searchAutoComplete()
export const autoComplete = async (searchKey) => {
    const res = await axios.get(`${API_SERVER_HOST}/autoComplete?searchKey=${searchKey}`);
    return res.data;
}

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
