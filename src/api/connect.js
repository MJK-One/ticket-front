import axios from "axios";

const API_SERVER_HOST = "http://localhost:8080";

//MainController > getAll()
export const getAll = async () => {
    const res = await axios.get(`${API_SERVER_HOST}/all`);
    return res.data;
};