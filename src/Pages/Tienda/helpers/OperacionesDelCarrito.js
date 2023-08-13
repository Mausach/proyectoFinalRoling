import swal from 'sweetalert';
import authApi from '../../../api/authApi';


export const guardarDatosEnCarrito = (id, e, carrito, setCarrito, cargarProductos, emailUs, navigate) => {
  e.preventDefault();
  if (emailUs != null) {

    
    const product = cargarProductos.find((producto) => producto._id === id);

    
    if (product) {
      product.cantidad = product.cantidad - 1
      const prodcar = carrito.find((prod) => prod._id === product._id)
      
      if (prodcar) {
        
        setCarrito((prevCarrito) =>
          prevCarrito.map((prod) =>
            prod._id === product._id ? { ...prod, cantidad: prod.cantidad + 1 } : prod
          )
        );
      } else {
        
        setCarrito((prevCarrito) => [...prevCarrito, { ...product, cantidad: 1 }]);
        window.scrollTo({ top: 0, behavior: 'smooth' })
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


export const obtenerDatos = (e, num, carrito, emailUs, navigate) => {
  let menu = ''
  const fechaHoraActual = new Date();
  const fecha = fechaHoraActual.toISOString().slice(0, 10); 

  const opcionesFormato = {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false
  };

  const formatoHora = new Intl.DateTimeFormat([], opcionesFormato);
  const hora = formatoHora.format(new Date());
  
  
  let precio_total = 0;

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

    
    window.location.href = resp.data.url_comp;

    
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


export const EstadoPago = ( navigate) => {

  try {
    
    const miObjetoString = localStorage.getItem('miPedido');
    const miPedido = JSON.parse(miObjetoString);

    const urlParams = new URLSearchParams(window.location.search);
    const paymentStatus = urlParams.get('status'); 
    
    if (paymentStatus === 'approved') {
      const estado = 'Realizado'
      crearPedido(miPedido.fecha, miPedido.hora, miPedido.precio_total, miPedido.menus, estado, miPedido.emailUs, navigate);
      
      localStorage.removeItem('miPedido');
    }
    
    
    console.log(`Estado del pago: ${paymentStatus}`);

  } catch (error) {
    console.log(error);
  }
};

