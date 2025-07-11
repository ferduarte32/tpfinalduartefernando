- readme.md Sirve para contar acerca del proyecto y NO es necesario
- eslint.json Sirve para configurar el linter (error lens avanzado)
- src/ cualquier css predefinido NO es necesario ya que queremos hacer los nuestros
 - Advertencia: Cuando eliminen los css asegurense de que no se importen en el app.jsx o main.jsx
- src/assets trae iconos, imagenes por defecto que no nos interesan (Si lo sacan no olviden sacar las importaciones)

- src/App.jsx Limpiar la funcion App para que retorne un div
    Ejemplo de App.jsx limpio:

    import React from 'react'

    function App() {

        return (
            <div></div>
        )
    }

    export default App


- src/main.jsx No debe tener el componente <StrictMode> 

TODO ARCHIVO JSX DEBE TENER ARRIBA DE TODO:
    import React from 'react'