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