import axios from "axios";

export const authApi=axios.create({
    baseURL:"elbuencomer.up.railway.app",   
});

//envia atraves del header la llave del token que previamente se guardo en el local storage
authApi.interceptors.request.use((config) => {
	config.headers = {
		'x-token': localStorage.getItem('token'),
	};
	return config;
});

export default authApi;