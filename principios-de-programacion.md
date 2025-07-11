## DRY: Dont reapeat yourself
En vez de repetir el calculo del IVA en cada linea que necesites podrias...
precio = 1000
console.log('El iva de tu producto es ' + (precio * 0.21))

alert('El iva de tu producto es ' + (precio * 0.21))

document.innerHTML ='El iva de tu producto es ' + (precio * 0.21)

...hacer esto 

function calcularIva(precio){
    return precio * 0.21
}

console.log('El iva de tu producto es ' + calcularIva(precio))
alert('El iva de tu producto es ' + calcularIva(precio))
document.innerHTML ='El iva de tu producto es ' + calcularIva(precio)


## KISS Keep it simple, stupid

En vez de hacer esto...
<!-- m = mensaje -->
function mostrarPorConsola (m){
    <!-- Checkeo si el mensaje es un string -->
    if(typeof(m) === 'string'){
        console.error('No es un string el mensaje')
    }
    <!-- Checkeo que el dia es lunes -->
    if(dia === 'lunes'){
        console.error('no quiero trabajar')
    }
    <!-- El mensaje lo muestro por consola -->
    console.log(m)
}

...usa console.log y dejate de complicar las cosas


## YAGNI: You aren't gonna need it

..es muy probable que esto solo lo uses una vez asi que no te la compliques y no guardes funciones extra

function verificarSiUnTextoEsMayorA10 (texto){
    return texto.length > 10
}


+