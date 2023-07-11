import authApi from "../../../api/authApi";
import swal from 'sweetalert';
import emailjs from 'emailjs-com';

export const enviarCorreo = async (email, setIsModalOpen) => {
  try {

    const resp = await authApi.post('/auth/validar_email', {
      email,
    });

    if (resp.data.ok === true) {

      const dest = resp.data.email
      const serv_id = resp.data.server_id
      const temp_id = resp.data.template_id
      const public_k = resp.data.public_key

      let templateParams = {
        from_name: 'EL Buen Comer devs',//mensaje de
        user_name: dest,//para el destinatario
        destinatario: dest,//email del destinatario
        message: 'Si decea restablecer su contraseña por favor...',//mensaje
      };

      emailjs.send(serv_id, temp_id, templateParams, public_k)
        .then(function (response) {
          console.log('el email fue enviado!', response.status, response.text);
          swal("Email enviado a...", dest + " ingresa a tu correo electronico y sigue las intrucciones para restablecer tu contraseña", "success");
          //aqui va una alerta diciendo que todo salio bien yq ue revice su correo electronico
        }, function (error) {
          console.log('ocurrio un error al enviar el email...', error);
          swal("ocurrio un error al enviar el email...'", "error");
          //aqui va alerta de error
        });

      setIsModalOpen(false);//manda el resultado al estado del modal    
    }

  } catch (error) {
    console.log(error.response.data.msg)
    swal("ERROR", error.response.data.msg, "error");
  }


}