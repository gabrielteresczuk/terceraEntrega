import './App.css';
import Header from './componentes/Header';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Productos from './componentes/Productos';
import Form from './componentes/Form';
import Producto from './componentes/Producto';
import Carrito from './componentes/Carrito';
import CarritoContextContenedor from './context/CarritoContext';
import Login from './componentes/Login';
import Register from './componentes/Register';
import Home from './componentes/Home';
import Error404 from './componentes/Error404';

function App() {

  return (
    <div className="App" >
      <div className='App__container'>
      <BrowserRouter >
      <CarritoContextContenedor>
        <Header />
        <Routes>
          <Route path="/Login" element={<Login/>}/>
          <Route path="/Home" element={<Home/>}/>
          <Route path="/Register" element={<Register/>}/>
          <Route path="/Producto/:id" element={<Producto/>}/>
          <Route path="/" element={<Productos />}/>
          <Route path="/Carrito" element={<Carrito/>}/>
          <Route path="/Productos/form/:id" element={<Form/>  }/>
          <Route path="/Productos/form/" element={<Form/> }/>
          <Route path="*" element={<Error404/> }/>
        </Routes>
        </CarritoContextContenedor>
      </BrowserRouter>
      </div>
      
    </div>
  );
}

export default App;
