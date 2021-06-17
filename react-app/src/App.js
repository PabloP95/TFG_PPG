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
import NotFound from './Components/NotFound';

function App() {
  return (
    <div className="App">
      <HeaderNormal />
      <Router>
        <ScrollToTop />
        <Switch>
          <Route exact path="/login" component={Login}></Route>
          <Route exact path="/signup" component={SignUp}></Route>
          <Route exact path="/paginaprueba" component={PaginaPrueba}></Route>
          <Route exact path="/aviso-legal" component={AvisoLegal}></Route>
          <Route exact path="/politica-privacidad" component={PoliticaPrivacidad}></Route>
          <Route exact path="/restaurantes/restaurante/:id/menu/detalle-plato" component={DetallePlato}></Route>
          <Route exact path="/restaurantes/restaurante/:id/menu" component={Menu}></Route>
          <Route exact path="/restaurantes/restaurante/:id/reserva" component={RealizarReserva}></Route>
          <Route exact path="/restaurantes/restaurante/:id" component={PaginaRestaurante}></Route>
          <Route exact path="/restaurantes" render={(props) => <Restaurantes {...props} />} />
          <Route exact path="/user/:nickname" component={UserPage}></Route>
          <Route exact path="/restaurante/:nomRestaurante" component={RestaurantPage}></Route>
          <Route exact path="/" component={Home}></Route>
          <Route component={NotFound}></Route>
        </Switch>
      </Router>

      <Footer />
    </div>
  );
}

export default App;
