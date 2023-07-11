import authApi from '../../../api/authApi';
import swal from 'sweetalert';

//Alerta guardar usuario
export const AlertaGuardarUs = (name, email, password, rol, navigate) => {
    swal(
        {
            title: "¿Estas seguro de guardar al Usuario... ?",
            text: name + ' - ' + email + ' - ' + rol,
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                guardarUsuarioDB(name, email, password, rol, navigate);
                swal("El usuario se creo correctamente", {
                    icon: "success",
                });
            } else {
                swal("Solicitud cancelada");
            }
        });
}

//guardar Usuario en DB
const guardarUsuarioDB = async (name, email, password, rol, navigate) => {
    try {
        const resp = await authApi.post('/auth/new', {
            name,
            email,
            password,
            rol,
        });
        console.log(resp);
    } catch (error) {
        console.log(error.response.data.msg);
        swal("ERROR", error.response.data.msg, "error");
        if (error.response.status === 401) {
            localStorage.removeItem('token');
            navigate('/login');
        }
    }
};