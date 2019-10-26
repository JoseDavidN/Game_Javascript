

//funciones iniciales

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

//------------ALEATORIOS-------------
function imgRandom(min, max){
    min = Math.ceil(min);
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min;
}
//-----------------------------------

//----FILAS Y COLUMNAS DE DULCES-----
function arrayCandys(arrayTipe, index){
    var candyCol1 = $(".col-1").children();
    var candyCol2 = $(".col-2").children();
    var candyCol3 = $(".col-3").children();
    var candyCol4 = $(".col-4").children();
    var candyCol5 = $(".col-5").children();
    var candyCol6 = $(".col-6").children();
    var candyCol7 = $(".col-7").children();

    var candyColumns = $([candyCol1, candyCol2, candyCol3, candyCol4, candyCol5, candyCol6, candyCol7]);

    if(typeof index === "number"){
        var candyRow = $([candyCol1.eq(index), candyCol2.eq(index), candyCol3.eq(index),candyCol4.eq(index), candyCol5.eq(index), candyCol6.eq(index), candyCol7.eq(index)]);
    }else{
        index = "";
    }

    if(arrayTipe === 'columns'){
        return candyColumns;
    }else if(arrayTipe === "rows" && index !== ""){
        return candyRow;
    }
}

//---ARREGLO DE FILAS---
function candyRows(index){
    var candyRow = arrayCandys("rows", index);
    return candyRow;
};

//---ARREGLO COLUMNAS---
function candyColumns(index){
    var candyColumn = arrayCandys("columns");
    return candyColumn[index];
};
//-----------------------------------

//---VALIDACION DE CANDYS EN LINEA---
function validacionColumns(){
    for(j=0; j < 7; j++){
        var counter = 0;
        var candyPosition = [];
        var extraCandyPosition = [];
        var candyColumn = candyColumns(j);
        var comparacionValor = candyColumn.eq(0);
        var gap = false;

        for(i=0; i < candyColumn.length; i++){
            var srcComparacion = comparacionValor.attr('src');
            var srcCandy = candyColumn.eq(i).attr('src');

            if(srcComparacion != srcCandy){
                if(candyPosition >= 3){
                    gap = true;
                }else{
                    candyPosition = [];
                }
                counter = 0;
            }else{
                if(counter == 0){
                    if(!gap){
                        candyPosition.push(i - 1);
                    }else{
                        extraCandyPosition.push(i - 1);
                    }
                }
                if(!gap){
                    candyPosition.push(i);
                }else{
                    extraCandyPosition.push(i);
                }
                counter += 1;
            }
            comparacionValor = candyColumn.eq(i);
        }
        if (extraCandyPosition.length > 2) {
			candyPosition = $.merge(candyPosition, extraCandyPosition);
		}
		if (candyPosition.length <= 2) {
			candyPosition = [];
		}
		candyCount = candyPosition.length;
		if (candyCount >= 3) {
			borrarColumnaCandy(candyPosition, candyColumn);
			setScore(candyCount);
		}
    }
}
function borrarColumnaCandy(candyPosition, candyColumn) {
	for (var i = 0; i < candyPosition.length; i++) {
		candyColumn.eq(candyPosition[i]).addClass('delete');
	}
}
//-----------------------------------

//----VALIDA LOS DULCES REPETIDOS----
function validacionRow(){
    for(j=0; j < 6; j++){
        var counter = 0;
        var candyPosition = [];
        var extraCandyPosition = [];
        var candyRow = candyRows(j);
        var comparacionValor = candyRow[0]
        var gap = false;

        for(i=1; i < candyRow.length; i++){
            var srcComparacion = comparacionValor.attr('src');
            var srcCandy = candyRow[i].attr('src');

            if(srcComparacion != srcCandy){
                if(candyPosition >= 3){
                    gap = true;
                }else{
                    candyPosition = [];
                }
                counter = 0;
            }else{
                if(counter == 0){
                    if(!gap){
                        candyPosition.push(i - 1);
                    }else{
                        extraCandyPosition.push(i - 1);
                    }
                }
                if(!gap){
                    candyPosition.push(i);
                }else{
                    extraCandyPosition.push(i);
                }
                counter += 1;
            }
            comparacionValor = candyRow.eq(i);
        }
        if (extraCandyPosition.length > 2) {
			candyPosition = $.merge(candyPosition, extraCandyPosition);
		}
		if (candyPosition.length <= 2) {
			candyPosition = [];
		}
		candyCount = candyPosition.length;
		if (candyCount >= 3) {
			borrarHorizontal(candyPosition, candyRow);
			setScore(candyCount);
		}
    }
    function borrarHorizontal(candyPosition, candyRow){
        for(i=0; i < candyPosition.length; i++){
            candyRow.eq(candyPosition[i]).addClass("delete");
        }
    }
}
//-----------------------------------

//--------FUNCION DE CONTADOR--------
function setScore(candyCount){
    var score = Number($("#score-text").text());
    switch(candyCount){
        case 3:
            score += 25;
        break;

        case 4:
            score += 50;
        break;

        case 5:
            score += 75;
        break;
        
        case 6:
            score += 100;
        break;

        case 7:
            score += 200;
        break;
    }
    $("#score-text").text(score);
}
//-----------------------------------

//---PONE LOS DULCES EN EL TABLERO---
function checkBoard(){
    fillBoard();
}

function fillBoard() {
	var top = 6;
	var column = $('[class^="col-"]');

	column.each(function () {
		var candys = $(this).children().length;
		var agrega = top - candys;
		for (var i = 0; i < agrega; i++) {
			var candyType = imgRandom(1, 5);
			if (i === 0 && candys < 1) {
				$(this).append('<img src="image/' + candyType + '.png" class="element"></img>');
			} else {
				$(this).find('img:eq(0)').before('<img src="image/' + candyType + '.png" class="element"></img>');
			}
		}
	});
	addCandyEvents();
	setValidations();
}
//-----------------------------------

//-----SI HAY DULCES QUE BORRAR------
function setValidations() {
	validacionColumns();
	validacionRow();
	// Si hay dulces que borrar
	if ($('img.delete').length !== 0) {
		deletesCandyAnimation();
	}
}
//-----------------------------------

//INTERACCION DEL USUARIO CON LOS DULCES
//efecto de movimiento entre los caramelos 
function addCandyEvents(){
    $('img').draggable({
		containment: '.panel-tablero',
		droppable: 'img',
		revert: true,
		revertDuration: 500,
		grid: [100, 100],
		zIndex: 10,
		drag: constrainCandyMovement
	});
	$('img').droppable({
		drop: swapCandy
	});
	enableCandyEvents();
}

function disableCandyEvents() {
	$('img').draggable('disable');
	$('img').droppable('disable');
}

function enableCandyEvents() {
	$('img').draggable('enable');
	$('img').droppable('enable');
}

//hace que el caramelo sea solido al moverse
function constrainCandyMovement(event, candyDrag) {
	candyDrag.position.top = Math.min(100, candyDrag.position.top);
	candyDrag.position.bottom = Math.min(100, candyDrag.position.bottom);
	candyDrag.position.left = Math.min(100, candyDrag.position.left);
	candyDrag.position.right = Math.min(100, candyDrag.position.right);
}

//reemplaza a los caramelos anteriores
function swapCandy(event, candyDrag) {
	var candyDrag = $(candyDrag.draggable);
	var dragSrc = candyDrag.attr('src');
	var candyDrop = $(this);
	var dropSrc = candyDrop.attr('src');
	candyDrag.attr('src', dropSrc);
	candyDrop.attr('src', dragSrc);

	setTimeout(function () {
		checkBoard();
		if ($('img.delete').length === 0) {
			candyDrag.attr('src', dragSrc);
			candyDrop.attr('src', dropSrc);
		} else {
			updateMoves();
		}
	}, 500);

}

function checkBoardPromise(result) {
	if (result) {
		checkBoard();
	}
}

//valida la puntuacion por cantidad de elementos en linea
function updateMoves() {
	var actualValue = Number($('#movimientos-text').text());
	var result = actualValue += 1;
	$('#movimientos-text').text(result);
}

//eliminacion automatica de los elementos
function deletesCandyAnimation() {
	disableCandyEvents();
	$('img.delete').effect('pulsate', 400);
	$('img.delete').animate({
			opacity: '0'
		}, {
			duration: 300
		})
		.animate({
			opacity: '0'
		}, {
			duration: 400,
			complete: function () {
				deletesCandy()
					.then(checkBoardPromise)
					.catch(showPromiseError);
			},
			queue: true
		});
}

//llenado automatico de los espacios con elementos
function showPromiseError(error) {
	console.log(error);
}

function deletesCandy() {
	return new Promise(function (resolve, reject) {
		if ($('img.delete').remove()) {
			resolve(true);
		} else {
			reject('No se pudo eliminar Caramelo');
		}
	})
}

//punto 4 y 6. temporizador y boton reiniciar
//cambia el aspecto de la página
//final del juego
function endGame() {
	$('div.panel-tablero, div.time').effect('fold');
	$('h1.main-titulo').addClass('title-over')
		.text('Gracias por jugar!');
	$('div.score, div.moves, div.panel-score').width('100%');

}

// inicia el juego
function initGame() {

	cambioColor1('h1.main-titulo');

	$('.btn-reinicio').click(function () {
		if ($(this).text() === 'Reiniciar') {
			location.reload(true);
		}
		checkBoard();
		$(this).text('Reiniciar');
		$('#timer').startTimer({
			onComplete: endGame
		})
	});
}

// Prepara el juego
$(function() {
	initGame();
});
//-----------------------------------
