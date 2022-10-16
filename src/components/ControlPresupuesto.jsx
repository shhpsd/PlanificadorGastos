import {useEffect, useState} from 'react'
import {CircularProgressbar, buildStyles}  from 'react-circular-progressbar'

import 'react-circular-progressbar/dist/styles.css'

function ControlPresupuesto({
  presupuesto,
  setPresupuesto,
  gastos,
  setGastos,
  setIsValidPresupuesto
}) {
  const [disponible,setDisponible] = useState(0)
  const [gastado,setGastado] = useState(0)
  const [porcentaje,setPorcentaje] = useState(0)

  useEffect(() => {
    const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0)
    const totalDisponible = presupuesto - totalGastado

    // CALCULAR PORCENTAGE GASTADO
    const nuevoPorcentaje = (((presupuesto - totalDisponible )/ presupuesto) * 100).toFixed(2)

    setGastado(totalGastado)
    setDisponible(totalDisponible)

    setTimeout(() =>{

      setPorcentaje(nuevoPorcentaje)
    },1000)
     
  },[gastos])
  const formatearCantidad = (cantidad)=>{
    return cantidad.toLocaleString('en-US',{
      style:'currency',
      currency:'USD'
    })
  }

  const handelResetApp =()=>{
    const resultado = confirm("¿Deseas reiniciar presupuesto y gastos?")
    if(resultado){
      setGastos([])
      setPresupuesto(0)
      setIsValidPresupuesto(false)
    }
  }

  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
        <div>
            <CircularProgressbar
              value={porcentaje}
              text={`${porcentaje}% Gastado`}
              styles={buildStyles({
                pathColor: porcentaje > 100 ? '#dc2626' : '#3b82f6',
                trailColor: '#f5f5f5',
                textColor: porcentaje > 100 ? '#dc2626' : '#3b82f6',
              })}
            />

            
        </div>
        <div className="contenido-presupuesto">
            <button
              className="reset-app"
              onClick={handelResetApp}
            >
              Resetear App
            </button>
          

            <p>
                <span>Presupuesto: </span>{formatearCantidad(presupuesto)}
            </p>
            <p className={`${disponible < 0 ? 'negativo' : ''}`}>
                <span>Disponible: </span>{formatearCantidad(disponible)}
            </p>
            <p>
                <span>Gastado: </span>{formatearCantidad(gastado)}
            </p>
        </div>
    </div>
  )
}

export default ControlPresupuesto
