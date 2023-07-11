import authApi from '../../../api/authApi';
import swal from 'sweetalert';

//cargarUsuarios desde DB
export const cargarUser = async (setCargarUsuarios) => {
    try {
        const resp = await authApi.get('/admin/usuarios');

        setCargarUsuarios(resp.data.usuarios);
    } catch (error) {
        console.log(error.response.data.msg);
        swal("ERROR", error.response.data.msg, "error");
        console.log(error);
    }
};