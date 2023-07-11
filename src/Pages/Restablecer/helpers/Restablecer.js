import swal from 'sweetalert';
import authApi from '../../../api/authApi';

export const starRestablecer = async (email, password, navigate) => {
    try {

        const resp = await authApi.put('/auth/Restablecer', {
            email,
            password,
        });

        swal("Exito", resp.data.msg, "success");
        navigate("/login");

    } catch (error) {
        console.log(error.response.data.msg);
        swal("ERROR", error.response.data.msg, "error");
    }
}