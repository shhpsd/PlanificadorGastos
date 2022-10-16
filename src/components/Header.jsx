import React from 'react'
import NuevoPresupuesto from './NuevoPresupuesto'
import ControlPresupuesto from './ControlPresupuesto'

function Header({
  gastos,
  setGastos,
  presupuesto,
  setPresupuesto,
  setIsValidPresupuesto,
  isValidPresupuesto
}) {
  return (
    <header>
        <h1>Planificador de gastos</h1> 
        {isValidPresupuesto ? (
          <ControlPresupuesto
            presupuesto={presupuesto}
            setGastos={setGastos}
            setPresupuesto={setPresupuesto}
            gastos={gastos} 
            setIsValidPresupuesto={setIsValidPresupuesto}
          />
        ):(
            <NuevoPresupuesto
              presupuesto={presupuesto} 
              setPresupuesto={setPresupuesto}
              setIsValidPresupuesto={setIsValidPresupuesto} 
            />   
          )}
    </header>
  )
}


export default Header
