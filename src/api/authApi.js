import axios from "axios";

export const authApi=axios.create({
    baseURL:"http://localhost:4001",   
});

export default authApi;