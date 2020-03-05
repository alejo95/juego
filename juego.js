//canval
var contexto = document.getElementById("lienzoJuego")

//contexto donde se dibuja
var ctx = contexto.getContext("2d");
//definir altura y anchura
var WIDTH = 300;
var HEIGHT = 530;
var CANVAS_WIDTH = 300;
var CANVAS_HEIGHT = 530;

contexto.width  = WIDTH;
contexto.height = HEIGHT;

/*llamadas de imnagenes , estas son imagenes
estas se almacenan en variables y se inicializan con las imagenes
*/
var background = new Image();
var bird = new Image();
var suelo = new Image();
var tuberiaNorte = new Image();
var tuberiaSur = new Image();


/*llamado al lugar donde esta la imagen */
background.src ="imagenes/background.png";
bird.src ="imagenes/bird.png";
suelo.src ="imagenes/suelo.png";
tuberiaNorte.src ="imagenes/tuberiaNorte.png";
tuberiaSur.src ="imagenes/tuberiaSur.png";



//variables audios
var punto = new Audio();
//llamar el lugar donde esta el audio
punto.src = "audios/punto.mp3";



var score = 0;
var FPS = 60;
var gravedad = 1.5;
var personaje = {
 //position 
    x:50,
    y:150,
    w:50,
    h:50
};

/* Definiendo las tuverias para el array*/
var tuberias = new Array();
tuberias[0] ={
    //se define dentro la posision de la tuberia en el cambas
    x:contexto.width,
    y:0
}

//resize
function resize(){
    CANVAS_HEIGHT = window.innerHeight;
    CANVAS_WIDTH = window.innerWidth;
    
    contexto.width  = WIDTH;
    contexto.height = HEIGHT;
    
    //colocando un nombre al estilo de canvas
    contexto.style.height = " " +CANVAS_HEIGHT +"px ";
}
resize();


//bucle declararlo
function loop(){

     /* Limpiar el canvas con ClearReact
    300 alto y ancho 700 */
    ctx.clearRect(0,0,300,530);

    /* FONDO
    LLAMAMOS EL BACKGROUND Y LE DAMOS LAS CORREDANAS */
    ctx.drawImage(background,0,0);
   
    /* SUELO
    LLAMAMOS EL BACKGROUND Y LE DAMOS LAS CORREDANAS x y 
    la POSICION DEL SUELO SE DA TOMANDO ALTURA DEL CANVAS Y LA ALTURA DE LA IMAGEN*/
    ctx.drawImage(suelo,0,contexto.height - suelo.height);

   /* DIBUEJO DEL PERSONAJE
    imagen, hubicacion en x - y  */
    ctx.drawImage(bird,personaje.x,personaje.y);

    

    
    for (let i = 0; i < tuberias.length; i++) {
        //CONSTANTE DE LAS TUBERIAS
        var constante = tuberiaNorte.height + 80;
        //TUBERIA Se reutilizan las tuberias en el array
        ctx.drawImage(tuberiaNorte,tuberias[i].x,tuberias[i].y);
        ctx.drawImage(tuberiaSur,tuberias[i].x,tuberias[i].y + constante);
        tuberias[i].x--;  

        //ordenar tubos
        if(tuberias[i].y + tuberiaNorte.height > 80){
            tuberias[i].y = 0;
        }


        //condicional para que aparezcan mas tuberias
        if(tuberias[i].x== 150){
            tuberias.push({
                //definimos la hubicación de la tuberia norte ala mano derecha
                x:contexto.width,
                //coloca de una manera aleatoria math.random (0 - 1 y este es multiplicado por tuberianorte que toma el alto)
                //Math.floor redonde al valor del limite inferior
                y: Math.floor(Math.random()*tuberiaNorte.height)
            });
        }

        //Colisiones
        /* personaje de x mas su anchura es >= ala posicion de 5 de cada tuberia 
        * se coloca una colicion en la hizquierda y otra ala derecha  */
        if(personaje.x + bird.width >= tuberias[i].x &&
            personaje.x <= tuberias[i].x + tuberiaNorte.width &&
            (personaje.y <= tuberias[i].y + tuberiaNorte.height ||
             personaje.y + bird.height >= tuberias[i].y + constante)
             || personaje.y + bird.height >= contexto.height - suelo.height){
            location.reload();
        }

        //aumento del scor esto da el momento que pase la mitad
        if(tuberias[i].x == personaje.x){
            score++;
            punto.play();
        }
    }
        


    //Condiciones
    //Definiendo la gravedad esto lo hace bajando de px en px
    personaje.y += gravedad;

    //Definimos el puntaje y lo realizamos visibler
    ctx.fillStyle = "rgb(0,0,0,1)";
    ctx.font = "25px Arial";
    //mostrar texto y puntaje en el canvas 
    ctx.fillText("Score: "+score,10,contexto.height-40);
};
//ejecutando la funcion
setInterval(loop,1000/FPS);


//Funcion declarando lo que ara cuando precione la tecla
function keyDonwn(){
    //ara que nuestro personaje suba
    personaje.y -=25;
};



//llamar evento. El primer keydonw Hace referencia al evento que va a realizar
//el segundo keyDonwn es el nombre de nuesta funcion aqui tomara cualquier tecla
window.addEventListener("resize", resize);


window.addEventListener("keydown",keyDonwn);




//EVENTOS DE LAS CONDIOCIONES TUBERIAS
