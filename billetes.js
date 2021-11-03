var imagenes = [];
imagenes["10"] = "imagenes/billetes_10.png";
imagenes["20"] = "imagenes/billetes_20.png";
imagenes["50"] = "imagenes/billetes_50.png";

class billete
{
	constructor(valor, cantidad)
	{
		this.valor = valor;
		this.cantidad = cantidad;
        this.imagen = new Image();
        this.imagen.src = imagenes[this.valor];
    }
}

var caja = [];
var entregado = [];
caja.push( new billete(50, 10));
caja.push( new billete(20, 5) );
caja.push( new billete(10, 5) );

var dinero = 0;
var div = 0;
var papeles = 0;

var boton_saldo = document.getElementById("ver_saldo");
boton_saldo.addEventListener("click", saldo);

var total = 0;
function saldo(){
    var monto = 0;
    for(var v of caja){
        monto = monto + v.valor * v.cantidad;
        total = monto;
        resultado.innerHTML = "Su saldo es: $"+ monto;
    }
}

var b = document.getElementById("extraer");
b.addEventListener("click", entregarDinero);

var resultado = document.getElementById("resultado");

//Esta funciona hace que cuando apretas el boton "Borrar" se borra el resultado y billetes entregados
document.getElementById('borrar').onclick = function borra() {
    resultado.innerHTML = "";
    entregado = [];
}


function entregarDinero() {
    var mostrado = []

    var t = document.getElementById("dinero");
    dinero = parseInt(t.value);

    for(var bi of caja){

        if (dinero > 0)
        {
            div = Math.floor (dinero / bi.valor);

            if (div > bi.cantidad){
                papeles = bi.cantidad;
            }
            else {
                papeles = div;
            }
            bi.cantidad = bi.cantidad - papeles;

            entregado.push ( new billete (bi.valor, papeles) );
            
            for (var i = 0; i < papeles; i++){
                mostrado.push (new billete(bi.valor,1   ));    
            }
                dinero = dinero - (bi.valor * papeles);
        }

        if (dinero == 0) {

            resultado.innerHTML = " Se ha retirado: <br>";
      
                  for(var e of mostrado)
                  {
                      resultado.innerHTML = resultado.innerHTML + e.cantidad + " billetes de $" + e.valor + "<br>" + "<img src=" + e.imagen.src + " />" + "<br>";
                  }
      
                  resultado.innerHTML = resultado.innerHTML;
                // contador();
      
              }
          else  {
            resultado.innerHTML = "No hay billetes para esa cantidad, intenta otro valor! <hr>";
      
          }      

    }

}

