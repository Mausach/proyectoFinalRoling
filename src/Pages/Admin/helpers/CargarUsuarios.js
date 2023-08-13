import authApi from '../../../api/authApi';
import swal from 'sweetalert';


export const cargarUser = async (setCargarUsuarios,navigate) => {
    try {
        const resp = await authApi.get('/admin/usuarios');

        setCargarUsuarios(resp.data.usuarios);
    } catch (error) {
        console.log(error.response.data.msg);
        swal("ERROR", error.response.data.msg, "error");
        console.log(error);
        if (error.response.status === 401) {
            localStorage.removeItem('token');
            navigate('/login');
        }else if(error.response.status === 404){
            navigate('/home')
        }
    }
};