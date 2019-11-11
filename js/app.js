

//-------ANIMACION TITULO------------
function cambioColor1(elemento){
    $(elemento).animate({
        color: "#FFFFFF",
    },100, function(){
        cambioColor2(elemento);
    })
};

function cambioColor2(elemento){
    $(elemento).animate({
        color: "#DCFF0E",
    },100, function(){
        cambioColor1(elemento);
    })
};
//-----------------------------------

//------------ANIMACIONES------------
function remove(elemento){
    $(elemento).detach()
}
//-----------------------------------


//--GENERADOR DE NUMEROS ALEATORIOS--
function randomNum(min, max){
    //genera un numero aleatorio entero
    return Math.floor((Math.random() * max) + min);
};
//-----------------------------------

//-----VALIDACION TRES EN LINEA------
function validation(elemento){
    
}


//--------RELLENO DEL TABLERO--------
function llenarTablero(){
    $("div [class^='col']").each(function(){
        for(i=1; i < 8; i++){
            num = randomNum(1, 4)
            $(this).append("<img class='elemento' src='image/" + num + ".png'>");
        }
    })
}

//--------EFECTO DRAG & DROP---------
function dragAndDrop(){
    $(".panel-tablero img").draggable();
    
    
}
//-----------------------------------


//-----------INICIAR JUEGO-----------
function Iniciar(){
    $(".btn-reinicio").on("click", function(){
        if($(this).text() == "Iniciar"){
            llenarTablero();
            $(this).text("Reiniciar")
        }else if($(this).text() == "Reiniciar"){
            location.reload();
            $(this).text("Iniciar");
        };
        validation();
        dragAndDrop();
        initTime();
    })
}


//Document.ready
$(document).ready(function(){
    cambioColor1(".main-titulo");
    Iniciar()
})

//----------TEMPORIZADOR-------------

//inicializador
function initTime(){
    var tiempo = $("#timer");
    var s = 0;
    var m = 2;

    var interval = setInterval(function(){
        //condicional defectusa debe ser perfeccionada 
        if(m < 10 & s < 10){
            tiempo.text("0" + m + ":" + "0" + s);
        }else if(m < 10 & s >= 10){
            tiempo.text("0" + m + ":" + s)
        };

        if(s == 0){
            m --;
            s = 60;
        }else{
            s --;
            if(m == 0 & s == 0){
                window.clearInterval(interval);
                endGame();
            };
    
        };

    },100);
};


function endGame(){
    $(".panel-tablero").toggle("drop", "slow");
    $(".panel-score").animate({
        width : "100%"
    }, 2000)
};

// eventos para eliminar los tableros 
/*$(".panel-tablero").detach();
    $(".time").detach();
    $(".panel-score").css({
        width : "100%",
    });
    $(".score, .moves").css({
        height : "35%",    
    }); */