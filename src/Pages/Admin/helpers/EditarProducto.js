import authApi from '../../../api/authApi';
import swal from 'sweetalert';



export const AlertaEditar = (_id, name, estado, precio, url_img, detalle, categoria, cantidad) => {
    swal(
        {
            title: "¿Estas seguro de guardar los cambios?",
            text: '-',
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                editarProductoDB(_id, name, estado, precio, url_img, detalle, categoria, cantidad);
                swal("Se guardaron los cambios correctamente", {

                    icon: "success",
                });
            } else {
                swal("Solicitud cancelada");
            }
        });

}


const editarProductoDB = async (_id, name, estado, precio, url_img, detalle, categoria, cantidad) => {
    try {
        const resp = await authApi.put('/admin/edit', {
            _id,
            name,
            estado,
            precio,
            url_img,
            detalle,
            categoria,
            cantidad,
        });

        
    } catch (error) {
        console.log(error.response.data.msg);
        swal("ERROR", error.response.data.msg, "error");
    }
};