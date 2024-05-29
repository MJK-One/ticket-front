import axios from "axios";

export const API_SERVER_HOST = "http://localhost:8080";

//MainController > getAll()
export const getAll = async () => {
    const res = await axios.get(`${API_SERVER_HOST}/all`);
    return res.data;
};

//MainPostController > gethome()
export const gethome = async () => {
    const res = await axios.get(`${API_SERVER_HOST}/home`);
    return res.data;
};
// 장르별 데이터를 불러오는 함수 추가
export const getByGenre = async (genre) => {
    const res = await axios.get(`${API_SERVER_HOST}/home/genre/${genre}`);
    return res.data;
};
