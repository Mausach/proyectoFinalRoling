import authApi from '../../../api/authApi';
import swal from 'sweetalert';



//Alerta Realizar
export const AlertaRealizar = (_id, usuario, menu, navigate) => {
    swal(
        {
            title: "¿Estas seguro de completar el pedido de... ?",
            text: usuario + '  -  ' + menu,
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                confirmarPedidoClick(_id, navigate);
                swal("El pedido se ah completado", {
                    icon: "success",
                });
            } else {
                swal("Solicitud cancelada");
            }
        });
}


//metodo de cambiar el pedido a realizado
const confirmarPedidoClick = async (_id, navigate) => {

    try {
        const resp = await authApi.put('/admin/confirmar', {
            _id,
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