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
