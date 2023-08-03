import swal from 'sweetalert';
import authApi from '../../../api/authApi';

//guarda datos en el carrito
export const guardarDatosEnCarrito = (id, e, carrito, setCarrito, cargarProductos, emailUs, navigate) => {
  e.preventDefault();
  if (emailUs != null) {

    // Buscar el producto correspondiente en el arreglo
    const product = cargarProductos.find((producto) => producto._id === id);

    // Verificar si se encontró el producto
    if (product) {
      product.cantidad = product.cantidad - 1
      const prodcar = carrito.find((prod) => prod._id === product._id)

      // Verificar si el producto ya existe en el carrito
      if (prodcar) {
        // Actualizar la cantidad del producto existente en el carrito
        setCarrito((prevCarrito) =>
          prevCarrito.map((prod) =>
            prod._id === product._id ? { ...prod, cantidad: prod.cantidad + 1 } : prod
          )
        );
      } else {
        // Si el producto no existe en el carrito, agregarlo con una cantidad de 1
        setCarrito((prevCarrito) => [...prevCarrito, { ...product, cantidad: 1 }]);
        window.scrollTo({ top: 0, behavior: 'smooth' })//redirige al navbar para ver el carrito pedidos
      }
    }
    

  } else {

    swal(
      {
        title: "Para realizar pedidos debes estar logueado...! ",
        text: '¿deceas iniciar sesion?',
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {

          navigate('/login');
        } else {
          swal("Solicitud cancelada");
          navigate('/home');

        }
      });
  }

};

//elimina producto del carrito
export const eliminarProductoDelCarrito = (id, e, cargarProductos, setCargarProductos, carrito, setCarrito) => {

  e.preventDefault();

  const product = cargarProductos.find((producto) => producto._id === id);
  const productCarrito = carrito.find((prod) => prod._id === id)
  if (productCarrito) {
    if (productCarrito.cantidad > 1) {

      setCarrito((prevCarrito) =>
        prevCarrito.map((prod) =>
          prod._id === product._id ? { ...prod, cantidad: prod.cantidad - 1 } : prod
        )
      );

      setCargarProductos((prevCarrito) =>
        prevCarrito.map((prod) =>
          prod._id === product._id ? { ...prod, cantidad: prod.cantidad + 1 } : prod
        )
      );

    } else {
      const nuevoCarrito = carrito.filter((producto) => producto._id !== id);

      setCargarProductos((prevCarrito) =>
        prevCarrito.map((prod) =>
          prod._id === product._id ? { ...prod, cantidad: prod.cantidad + 1 } : prod
        )
      );

      setCarrito(nuevoCarrito);
    }
  }
};

//obtener datos para armar el pedido y orden de compra
export const obtenerDatos = (e, num, carrito, emailUs, navigate) => {
  let menu = ''
  const fechaHoraActual = new Date();
  const fecha = fechaHoraActual.toISOString().slice(0, 10); // Obtiene la fecha en formato 'YYYY-MM-DD'

  const opcionesFormato = {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false
  };

  const formatoHora = new Intl.DateTimeFormat([], opcionesFormato);
  const hora = formatoHora.format(new Date());

  console.log(hora);

  //const hora = fechaHoraActual.toISOString().slice(11, 19); // Obtiene la hora en formato 'HH:MM:SS'

  let precio_total = 0;//falta metodo que calcule el precio total

  const menus = carrito.map((producto) => {
    menu = menu + '\n' + producto.name + ' '
    precio_total = precio_total + (producto.precio * producto.cantidad);
    return {
      id: producto._id,
      cantidad: producto.cantidad,
      name: producto.name,
      precio: producto.precio
    };

  });

  AlertaRealizar(e, num, fecha, hora, precio_total, menu, menus, emailUs, navigate);
};

//Alerta Realizar pedido o orden
export const AlertaRealizar = (e, num, fecha, hora, precio_total, menu, menus, emailUs, navigate) => {
  e.preventDefault();
  swal(
    {
      title: "¿Estas seguro de realizar el pedido de... ?",
      text: emailUs + '  -  ' + menu,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        if (num === 1) {
          let estado = ''
          crearPedido(fecha, hora, precio_total, menus, estado, emailUs, navigate);
        } else {
          console.log(menus, precio_total);
          pagarPedido(e, fecha, hora, precio_total, menus, emailUs, navigate);
        }
        swal("El pedido esta enproceso", {

          icon: "success",
        });
      } else {
        swal("Solicitud cancelada");
      }
    });

}

//va directo al backend para cargar el pedido con estado pendiente
export const crearPedido = async (fecha, hora, precio_total, menus, estado, emailUs, navigate,) => {
  try {
    const resp = await authApi.post('/tienda/new', {
      usuario: emailUs,
      fecha: fecha,
      hora: hora,
      menu: menus,
      precio_total: precio_total,
      estado: estado,
    });
    swal("Exito", resp.data.msg, "success");
    navigate('/home', { state: emailUs });
  } catch (error) {
    console.log(error.response.data.msg);
    swal("ERROR", error.response.data.msg, "error");
    if (error.response.status === 401) {
      localStorage.removeItem('token');
      navigate('/login');
    }
  }
}

//genero la orden d epago en mercadopago
export const pagarPedido = async (e, fecha, hora, precio_total, menus, emailUs, navigate) => {
  e.preventDefault();
  try {

    const resp = await authApi.post('/payment/crear-orden', {
      usuario: emailUs,
      fecha: fecha,
      hora: hora,
      menu: menus,
      precio_total: precio_total,
    });

    console.log(resp.data.msg);
    window.location.href = resp.data.url_comp;

    //guardo en localStorage para recuperar los datos despues de que se confirme la operacion
    const miPedido = { emailUs, fecha, hora, menus, precio_total };
    const miObjetoString = JSON.stringify(miPedido);
    localStorage.setItem('miPedido', miObjetoString);

  } catch (error) {
    console.log(error.response.data.msg);
    swal("ERROR", error.response.data.msg, "error");;
    if (error.response.status === 401) {
      localStorage.removeItem('token');
      navigate('/login');
    }
  }
};

//captura ele stado del pago
export const EstadoPago = ( navigate) => {

  try {
    //let precio_total=0
    const miObjetoString = localStorage.getItem('miPedido');
    const miPedido = JSON.parse(miObjetoString);

    const urlParams = new URLSearchParams(window.location.search);
    const paymentStatus = urlParams.get('status'); // Supongamos que "status" es el parámetro que indica el estado del pago

    // Aquí puedes actualizar el estado de tu aplicación con el resultado del pago
    if (paymentStatus === 'approved') {
      const estado = 'Realizado'
      crearPedido(miPedido.fecha, miPedido.hora, miPedido.precio_total, miPedido.menus, estado, miPedido.emailUs, navigate);
      console.log(miPedido.precio_total);
      localStorage.removeItem('miPedido');
    }
    // por ejemplo, puedes usar un estado local o un contexto para almacenar la información

    //limpio el local sotorage para la proxima operacion
    console.log(`Estado del pago: ${paymentStatus}`);


  } catch (error) {
    console.log(error);
  }
};

