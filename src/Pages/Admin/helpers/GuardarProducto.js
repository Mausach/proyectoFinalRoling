import authApi from '../../../api/authApi';
import swal from 'sweetalert';


export const AlertaGuardarProducto = (name, precio, url_img, detalle, categoria, cantidad, navigate) => {
    swal(
        {
            title: "¿Estas seguro de cargar el siguiente producto... ?",
            text: name + ' -  $' + precio + ' - ' + categoria + ' - ' + cantidad,
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                guardarProductoDB(name, precio, url_img, detalle, categoria, cantidad, navigate);
                swal("El menu se guardo correctamente", {
                    icon: "success",
                });
            } else {
                swal("Solicitud cancelada");
            }
        });
}


const guardarProductoDB = async (name, precio, url_img, detalle, categoria, cantidad, navigate) => {
    try {
        const resp = await authApi.post('/admin/new', {
            name,
            precio,
            url_img,
            detalle,
            categoria,
            cantidad,
        });
        
    } catch (error) {
        console.log(error.response.data.msg);
        swal("ERROR", error.response.data.msg, "error");
        if (error.response.status === 401) {
            localStorage.removeItem('token');
            navigate('/login');
        }
    }
};
