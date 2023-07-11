import swal from 'sweetalert';
import authApi from '../../../api/authApi';

export const starRegister = async (name, email, password, navigate) => {
    try {
        const resp = await authApi.post('/auth/new', {
            name,
            email,
            password,
        });

        swal("FELICIDADES", " Usted se ah Registrado con Exito", "success");
        navigate("/home");

    } catch (error) {
        console.log(error.response.data.msg);
        swal("ERROR", error.response.data.msg, "error");
    }

}