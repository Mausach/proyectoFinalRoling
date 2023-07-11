import swal from 'sweetalert';
import authApi from '../../../api/authApi';

export const starLogin = async (email, password, navigate) => {
  try {
    const resp = await authApi.post('/auth/login', {
      email,
      password,
    });
    localStorage.setItem('token', resp.data.token);

    if (resp.data.rol === 'usuario') {
      navigate('/home', { state: resp.data.email });
    } else {
      navigate("/admin", { state: resp.data.name });
    }

  } catch (error) {
    console.log(error);
    swal("ERROR", error.response.data.msg, "error");
  }
}

