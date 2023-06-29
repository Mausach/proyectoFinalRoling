import React, { useEffect, useState } from 'react'
import { useLocation , useNavigate } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import swal from 'sweetalert';
import Button from 'react-bootstrap/Button';
import authApi from '../../api/authApi';
import { NavBar } from '../../Componentes/NavBar';
import { Foother } from '../../Componentes/Foother';

export const HomePage = () => {
  let cont =1;
  const location = useLocation();

  const datos = location.state;//recibe el email del loguin

  //estado para guardar los productos traidos del backend
  const [cargarProductos, setCargarProductos] = useState([]);

const navigate = useNavigate();

//para animaciion de carga al principio de cada screen
const [loading,setLoading]=useState(true);

 //cargarProductos desde DB
 const cargarProductosDB = async () => {
  try {
    const resp = await authApi.get('/admin/productos/aleatorios');

    setTimeout(()=>{
      setLoading(false);
    },2000);
    //fin de animacion cargando

    setCargarProductos(resp.data.productos);
    
  } catch (error) {
    console.log(error.response.data.msg);
    swal("ERROR" ,error.response.data.msg, "error");;
    if (error.response.status === 401) {
      localStorage.removeItem('token');
      navigate('/login');
    }
  }
};

const ir_tienda=()=>{
  navigate('/tienda')
}

useEffect(() => {
  //cargarUser();
  //EstadoPago()
  cargarProductosDB();
  //cargadePedidos();
    
  },[]);
  
  return (
    <div className='text-white'>
      <NavBar/>
      
      <div className='carousel-inner main-carousel'>
      <Carousel data-bs-theme="dark">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://www.wallpapertip.com/wmimgs/4-45846_food-wallpaper-hd-wallpaper-backgrounds-food-hd-wallpapers.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h4 className='text-dark border-light texto-con-sombras-multiples'>Disfruta de la Comida</h4>
          <h5 className='text-dark border-light texto-con-sombras-multiples'>Preparada con los mas frescos ingredientes</h5>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://wallpaperaccess.com/full/1843908.jpg"
          alt="Second slide"
        />
        <Carousel.Caption>
          <h4 className='text-white border-light texto-con-sombras-multiples'>Dale sason a tu comida</h4>
          <h5 className='text-white border-light texto-con-sombras-multiples'>Con la gran dalidad de nuestra marca de condimentos</h5>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://images3.alphacoders.com/295/2957.jpg"
          alt="Third slide"
        />
        <Carousel.Caption>
          <h4 className='text-white border-light texto-con-sombras-multiples'>Muy pronto....</h4>
          <h5 className='text-white border-light texto-con-sombras-multiples'>
            Endulzaremos tu paladar con nuestra nueva seccion de masas finas y reposteria
          </h5>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
      </div>
      HomePage {datos};
      <main id='container-main'>
      <div className="card-container">
      <Row className='g-3'>
                      {cargarProductos.map((producto) => {
                          if(producto.cantidad != 0 && cont<4){
                            cont++;
                              return <Col className='col-12 col-md-4 col-lg-3' key={producto._id} >
                              <Card className='card fondo_card text-white ' border="light" >
                                  <Card.Img variant="top" src={producto.url_img} />
                                  <Card.Body>
                                      <Card.Title>{producto.name}</Card.Title>
                                      <Card.Text>
                                          {producto.detalle}
                                      </Card.Text>
                                      <Card.Text>
                                          precio: ${producto.precio}
                                      </Card.Text>
                                      
                                      <Button variant="danger"  className="mb-3" onClick={ir_tienda}>
                                          <h4>
                                          <i className="bi bi-eye"> </i>
                                              Ver Mas...
                                          </h4>
                                      </Button> 
                                  </Card.Body>
                              </Card>
                          </Col>
                          } 
                      })}

                      
                      <Col className="col-12 col-md-12 col-lg-3">
                      <aside className="card-propaganda" >
              

              <Card className='bg-warning'>
              <Card.Body className='text-dark card-propaganda-links'>
              <Card.Title>ASAID Encontra lo que buscas</Card.Title>

              <Carousel data-bs-theme="dark" className='w-100 d-none d-md-block'>
    <Carousel.Item>
      <img
        className="w-100 d-none d-md-block"
        src="https://media.istockphoto.com/id/477567550/es/foto/bebidas-helada.jpg?s=612x612&w=0&k=20&c=utvO5blVI8Ti37mn4vHsxxDo5ZvWlQO1RV6mh5e_Uvs="
        alt="First slide"
      />
      
        <h4 className='text-dark border-light texto-con-sombras-multiples'>Disfruta de la Comida</h4>
        <h5 className='text-dark border-light texto-con-sombras-multiples'>Preparada con los mas frescos ingredientes</h5>
      
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="w-100 d-none d-md-block"
        src="https://comoinvestir.thecap.com.br/medias/2022/10/heineken-reduz-lucro-e-decepciona-em-receita-no-3t22.webp"
        alt="Second slide"
      />
      
        <h4 className='text-dark border-light texto-con-sombras-multiples'>Dale sason a tu comida</h4>
        <h5 className='text-dark border-light texto-con-sombras-multiples'>Con la gran dalidad de nuestra marca de condimentos</h5>
      
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="w-100 d-none d-md-block"
        src="https://cloudfront-us-east-1.images.arcpublishing.com/infobae/USCI4T475ZAUROG3DXOSOSY6QY.jpg"
        alt="Third slide"
      />
      
        <h4 className='text-dark border-light texto-con-sombras-multiples'>Muy pronto....</h4>
        <h5 className='text-dark border-light texto-con-sombras-multiples'>
          Endulzaremos tu paladar con nuestra nueva seccion de masas finas y reposteria
        </h5>
      
    </Carousel.Item>
  </Carousel>
                                      
              </Card.Body>
              </Card>

          </aside>
                      </Col>
                  </Row> 
      
      </div>

      </main>
      
      

                

                
                

                
              
      
        <Foother/>
      </div>
  )
}
