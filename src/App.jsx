import { useState, useEffect } from "react";

import Modal from "./components/Modal";
import Header from "./components/Header";
import ListadoGastos from "./components/ListadoGastos";

import Filtros from "./components/Filtros"


import { generarId, generarFecha } from "./helpers";

import IconoNuevoGasto from "./assets/nuevo-gasto.svg";

function App() {
  
  // const [gastos, setGastos] = useState([]);
  const [gastos, setGastos] = useState(localStorage.getItem("gastos") ? JSON.parse(localStorage.getItem("gastos")) : []);

  const [presupuesto, setPresupuesto] = useState(JSON.parse(localStorage.getItem("presupuesto") ?? 0));
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);

  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);

  const [gastoEditar,setGastoEditar] = useState({});

  const [filtro,setFiltro] = useState("");
  const [gastosFiltrados,setGastosFiltrados] = useState([]);

  useEffect(() => {
    localStorage.setItem("presupuesto", presupuesto)
  },[presupuesto])

  useEffect(()=>{
    const presupuestoLS = localStorage.getItem("presupuesto" ?? 0)
    if (presupuestoLS > 0) {
      setIsValidPresupuesto(true);
    }
  },[])

  useEffect(() => {
    localStorage.setItem("gastos",JSON.stringify(gastos) ?? [])
  },[gastos])
  useEffect(() => {
    if(filtro){
      // FILTRAR DATOS POR CATEGORIA
      const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro)
      setGastosFiltrados(gastosFiltrados)
    }
  },[filtro]);
  useEffect(() => {
    if(Object.keys(gastoEditar).length > 0) {
      setModal(true);
    
      setTimeout(() => {
        setAnimarModal(true);
      }, 300);
    }
  },[gastoEditar]);

  const handelNuevoGasto = () => {
    setModal(true);
    setGastoEditar({});
    setTimeout(() => {
      setAnimarModal(true);
    }, 300);
  };
  const guardarGasto = (gasto) => {
    if(gasto.id){
      //ACTUALIZAR
      const gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState);
      setGastos(gastosActualizados);
      setGastoEditar({});

    }else{
      // NUEVO GASTO
      gasto.id = generarId();
      gasto.fecha = generarFecha(); 
      setGastos([...gastos, gasto]);
    }
    setAnimarModal(false);
    setTimeout(() => {
      setModal(false);
    }, 300);
  };

  const eliminarGasto = id =>{
    const gastosActualizados = gastos.filter(gasto => gasto.id !== id);
    
    setGastos(gastosActualizados);
   
  }
  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
        gastos={gastos}
        setGastos={setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />
      {isValidPresupuesto && (
        <>
          <main>
              <Filtros
                filtro={filtro}
                setFiltro={setFiltro}
              />
              <ListadoGastos
                gastos={gastos}
                setGastoEditar={setGastoEditar}
                eliminarGasto={eliminarGasto}
                filtro={filtro}
                gastosFiltrados={gastosFiltrados}
              />
          </main>
          <div className="nuevo-gasto">
            <img
              src={IconoNuevoGasto}
              alt="Icono Nuevo Gasto"
              onClick={handelNuevoGasto}
            />
          </div>
        </>
      )}

      {modal && (
        <Modal
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
          gastoEditar={gastoEditar}
          setGastoEditar={setGastoEditar}
        />
      )}
    </div>
  );
}

export default App;
