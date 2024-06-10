import axios from "axios";

export const API_SERVER_HOST = "http://localhost:8080";

//MainController > getAll()
export const getAll = async () => {
    const res = await axios.get(`${API_SERVER_HOST}/all`);
    return res.data;
};

//naverSearch
export const naverSearch = async (placeName) => {
    const res = await axios.get(`${API_SERVER_HOST}/naverSearch?searchPlace=${placeName}`);
    return res.data;
}

//MainPostController > getTop10()
export const getTop10 = async () => {
    const res = await axios.get(`${API_SERVER_HOST}/top10`);
    return res.data;
};

//MainPostController > getmonth()
export const getmonth = async () => {
    const res = await axios.get(`${API_SERVER_HOST}/month`);
    return res.data;
};

//MainPostController > getalllist()
export const getalllist = async () => {
    const res = await axios.get(`${API_SERVER_HOST}/alllist`);
    return res.data;
};
// // 장르별 데이터를 불러오는 함수 추가
// export const getByGenre = async (genre) => {
//     const res = await axios.get(`${API_SERVER_HOST}/home/genre/${genre}`);
//     return res.data;
// };
