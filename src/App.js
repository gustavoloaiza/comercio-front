import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import Header from './Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Login';
import Registrar from './Registrar';
import AddProduct from './viewProductor/AddProduct';
import UpdateProduct from './viewProductor/UpdateProduct';
import ListProduct from './viewProductor/listProduct';
import EditarUsuario from './viewProductor/EditarUsuario';
import EditarCliente from './viewCliente/EditarCliente';
import ListProductClient from './viewCliente/listProductClient';
import ListUsers from './viewAdmin/ListUsers';
import EditarUser from './viewAdmin/EditarUser';
import Inicio from './Inicio';
import Pedir from './viewCliente/Pedir';

const root = document.getElementById('root')
const ReacRoot = ReactDOM.createRoot(root)

function App() {

  return (
    <div className="App">

      <BrowserRouter>
      <Header />
        <Routes>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/Registrar" element={<Registrar />}></Route>
          <Route exact path="/AddProduct" element={<AddProduct />}></Route>
          <Route exact path="/UpdateProduct/:id" element={<UpdateProduct />}></Route>
          <Route exact path="/ListProduct" element={<ListProduct />}></Route>
          <Route exact path="/EditarUsuario" element={<EditarUsuario />}></Route>
          <Route exact path="/EditarCliente" element={<EditarCliente />}></Route>
          <Route exact path="/Inicio" element={<Inicio />}></Route>
          <Route exact path="/ListProductClient" element={<ListProductClient />}></Route>
          <Route exact path="/ListUsers" element={<ListUsers />}></Route>
          <Route exact path="/EditarUser/:id" element={<EditarUser />}></Route>
          <Route exact path="/Pedir" element={<Pedir />}></Route>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
