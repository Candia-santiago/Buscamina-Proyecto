//Constantes del juego
const COLUMNAS = 10;
const FILAS = 10;
const CANTIDAD_MINAS = 10;

//Variables con colores para los casilleros (NO se pudieron declarar como constantes ya que  la fn color sólo está definida para el setup y el draw)
var COLOR_CASILLERO_CON_MINA;
var COLOR_CASILLERO_SIN_MINA;
var COLOR_CASILLERO_MARCADO;

//Variables controladas al hacer click con el mouse: mousePressed()
var columnaPresionada;
var filaPresionada;
var hizoClick = false;

//Otras variables
var casillerosSinDescubrir;


function setup()
{
  createCanvas(500, 500);   //crea un lienzo o panel donde estará el juego. El primer parámetro es el ancho y el segundo el alto del lienzo.
  laMagiaDeLosProfes();

  //Asigno colores que se utilizarán. La fn color solo está definida para el setup y el draw
  COLOR_CASILLERO_CON_MINA = color("#FF0000");
  COLOR_CASILLERO_SIN_MINA = color("#1CC932");
  COLOR_CASILLERO_MARCADO = color("#278EF2");

  // Modificar/completar
  casillerosSinDescubrir= COLUMNAS * FILAS;

  ponerMinasTablero();
}


function draw() {
  if (hizoClick == true)
  {
    console.log("fila:" +filaPresionada + " col " + columnaPresionada);
    if (mouseButton == LEFT)
    {
      if (tieneMinaCasillero(columnaPresionada,filaPresionada)){
        perder ();        
      }
      else {
        pintarCasillero(columnaPresionada, filaPresionada, COLOR_CASILLERO_SIN_MINA); 
        descubrirCasillero (columnaPresionada, filaPresionada );

        if(ganoElJuego()== true)
        {
          mostrarMinas();
          ganar();
        }
      }    
    }
    else {
      pintarCasillero (columnaPresionada, filaPresionada, COLOR_CASILLERO_MARCADO);
  }

    hizoClick = false;  //Indico que ya "procesé" el click del usuario. NO modificar
  }
}


function ganoElJuego()
{
  if (CANTIDAD_MINAS==casillerosSinDescubrir){
    return true;
  }
  else{
    return false;   //Esto hace que NUNCA gane el juego. Modificar/completar
  }
}

function ponerMinasTablero()
{
  for (let contador = 0; contador < CANTIDAD_MINAS; contador++){
    columnaRandom = floor(random(0, COLUMNAS));
    filaRandom = floor(random(0, FILAS));
    if (tieneMinaCasillero(columnaRandom, filaRandom)==false){
      ponerMinaCasillero(columnaRandom, filaRandom);
    }
    else{
      contador=contador-1;
    }
  }
}

function mostrarMinas()
{
  for (let i=0;i<FILAS;i++){
    for (x=0;x<COLUMNAS;x++){
      if (tieneMinaCasillero(i,x)){
        pintarCasillero(i, x, COLOR_CASILLERO_CON_MINA); 
      }
    }
  }
}

function contarMinasAlrededor(columna, fila)
{
  let cont = 0;
  let array1 = [0, 1, 1, 1, 0, -1, -1, -1];
  let array2 = [-1, -1, 0, 1, 1, 1, 0, -1];

  for(let i=0; i<8; i++){
    if(tieneMinaCasillero(columna+array1[i], fila+array2[i])){
      cont++;
    }
  }

  return cont;   //Esto hace que SIEMPRE cuente 9 minas alrededor. Modificar/completar
}

