import authApi from '../../../api/authApi';
import swal from 'sweetalert';



export const AlertaEliminar = (_id, name, navigate) => {
    swal(
        {
            title: "¿Estas seguro de Eliminar este menu?",
            text: name,
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                eliminarProductoClick(_id, navigate);
                swal("El menu se ah eliminado", {

                    icon: "success",
                });
            } else {
                swal("Solicitud cancelada");
            }
        });
}


const eliminarProductoClick = async (id, navigate) => {
    try {
        const resp = await authApi.delete(`/admin/eliminar/${id}`);
        
    } catch (error) {
        console.log(error.response.data.msg);
        swal("ERROR", error.response.data.msg, "error");
        if (error.response.status === 401) {
            localStorage.removeItem('token');
            navigate('/login');
        }
    }
};