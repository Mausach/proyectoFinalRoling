# El Buen Comer  - SPA (Deployado y Responsivo)

► Deploy Frontend: https://el-buen-comer.netlify.app/

Tecnologías necesarias:
* React
* Node
* Express
* MongoDB
* mongoose

IMPORTANTE: Se utilizo Bootstrap, react-bootstrap, sweetalert y sus correspondientes estilos, ademas de CSS puro.

# Descripción
Esta es una aplicación en la cual se pueden ver algunos menus junto con información de los mismos, al refrescar la pagina principal siempre se cargaran diferentes menus, tambien podra filtar los menus por categoria
y se podria registrar, logear, cuenta con una funcion que envia un email al correo por si se olvida la contraseña y desea restablecerla mediante el uso de emailjs, realizar pedidos, guardar dichos pedidos,
elegir metodo de pago como mercado pago, tambien cuenta con una pagina de administracion que podra cargar crear editar y eeliminar datos entre otras cosas:

* Login donde el usuario puede autenticarse
* Registro donde el usuario nuevo puede darse de alta
* Pagina principal con información del restaurante y los menús disponibles
* Pagina de Menus para que los usuarios puedan seleccionar el que deseen
* Pedidos página que contendrá los menús seleccionados por el usuario y su costo total
* Admin página donde se muestran los listados de usuarios, menús y pedidos y además realiza diferentes operaciones operaciones

#### Frontend

Aplicación de React
__Pagina inicial__: 
Landing page con:
- [ ] Barra de Navegacion con los siguientes botones:
  * Boton Inicio/Logo dirigien al home de la aplicacion (`Ruta principal`)
  * Boton Menu para dirigirse a donde el usuario puede seleccionar los menus que decean
  * Boton Desplegable QUIENES SOMOS con las opciones de NOSOTROS y el EQUIPO DE DESARROLLO
  * Boton de Iniciar sesion para dirigirte al formulario del login
  * Boton de Registrarse para dirigirse al formulario de registro
    
- [ ] Carousel de imagenes representativas del sitio
- [ ] Area principal donde se mostraran 3 menus diferentes cada vez que se actualice el sitio (siempre y cuando esten disponibles)
- [ ] Area donde se muestran imagenes promocionales de bebidas
- [ ] Parte inferior de la página con información relevante de la misma

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
