import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import HeaderNormal from './Components/Header/headerNormal';
import Footer from './Components/Footer/Footer';
import SignUp from './Components/Security/Signup';
import Login from './Components/Security/Login';
import Home from './Components/Home';
import PaginaPrueba from './Components/Footer/PaginaPrueba';
import AvisoLegal from './Components/Footer/AvisoLegal';
import PoliticaPrivacidad from './Components/Footer/PoliticaPrivacidad';
import ScrollToTop from './Components/functions/ScrollToTop';
import Restaurantes from './Components/Restaurantes/Restaurantes';
import PaginaRestaurante from './Components/DetalleRestaurantes/PaginaRestaurante';
import Menu from './Components/DetalleRestaurantes/MenuRestaurante/Menu';
import DetallePlato from './Components/DetalleRestaurantes/MenuRestaurante/DetallePlato';
import UserPage from './Components/UserPage/UserPage';
import RestaurantPage from './Components/RestaurantPage/RestaurantPage';
import RealizarReserva from './Components/DetalleRestaurantes/RealizarReserva';

function App() {
  return (
    <div className="App">
      <HeaderNormal />
      <Router>
        <ScrollToTop />
        <Switch>
          <Route path="/login" component={Login}></Route>
          <Route path="/signup" component={SignUp}></Route>
          <Route path="/paginaprueba" component={PaginaPrueba}></Route>
          <Route path="/aviso-legal" component={AvisoLegal}></Route>
          <Route path="/politica-privacidad" component={PoliticaPrivacidad}></Route>
          <Route path="/restaurantes/restaurante/1/menu/detalle-plato" component={DetallePlato}></Route>
          <Route path="/restaurantes/restaurante/1/menu" component={Menu}></Route>
          <Route path="/restaurantes/restaurante/1/reserva" component={RealizarReserva}></Route>
          <Route path="/restaurantes/restaurante/1" component={PaginaRestaurante}></Route>
          <Route path="/restaurantes" component={Restaurantes}></Route>
          <Route path="/user/:nickname" component={UserPage}></Route>
          <Route path="/restaurante/:nomRestaurante" component={RestaurantPage}></Route>
          <Route path="/" component={Home}></Route>
        </Switch>
      </Router>

      <Footer />
    </div>
  );
}

export default App;
