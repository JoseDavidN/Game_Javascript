

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


//--------RELLENO DEL TABLERO--------
function checkBoard(){
    fillBoard();
};

function fillBoard(){
    var top = 7;
    var column = $('[class^="col-"]');

    column.each(function () {
        var candys = $(this).children().length;
        var agrega = top - candys;
        for (var i = 0; i < agrega; i++) {
            var candyType = randomNum(1, 4);
            if (i === 0 && candys < 1) {
                $(this).append('<img class="elemento" src="image/' + candyType + '.png"></img>');
            } else {
                $(this).find('img:eq(0)').before('<img class="elemento" src="image/' + candyType + '.png"></img>');
            }
        }
    });
    dragAndDrop();
    validation();
};


//-----VALIDACION TRES EN LINEA------
function giveCandyArrays(arrayType, index) {

	var candyCol1 = $('.col-1').children();
	var candyCol2 = $('.col-2').children();
	var candyCol3 = $('.col-3').children();
	var candyCol4 = $('.col-4').children();
	var candyCol5 = $('.col-5').children();
	var candyCol6 = $('.col-6').children();
	var candyCol7 = $('.col-7').children();

	var candyColumns = $([candyCol1, candyCol2, candyCol3, candyCol4,
		candyCol5, candyCol6, candyCol7
	]);

	if (typeof index === 'number') {
		var candyRow = $([candyCol1.eq(index), candyCol2.eq(index), candyCol3.eq(index),
			candyCol4.eq(index), candyCol5.eq(index), candyCol6.eq(index),
			candyCol7.eq(index)
		]);
	} else {
		index = '';
	}

	if (arrayType === 'columns') {
		return candyColumns;
	} else if (arrayType === 'rows' && index !== '') {
		return candyRow;
	}
};

// arreglos de filas
function candyRows(index) {
	var candyRow = giveCandyArrays('rows', index);
	return candyRow;
};

// arreglos de colunmnas
function candyColumns(index) {
	var candyColumn = giveCandyArrays('columns');
	return candyColumn[index];
};

//valida si hay dulces para eliminar en una columna
function columnValidation(){
    for(j=0; j < 7; j++){
        var counter = 0;
        var candyPosition = [];
        var extraCandyPosition = [];
        var candyColumn = candyColumns(j);
        var comparisonValue = candyColumn.eq(0);
        var gap = false;

        for(i=1; i < candyColumn.length; i++){
            var srcComparison =  comparisonValue.attr('src');
            var srcCandy = candyColumn.eq(i).attr('src');

            if(srcComparison != srcCandy){
                if(candyPosition.length >= 3){
                    gap = true;
                }else{
                    candyPosition = [];
                };
                counter = 0;
            }else{
                if(counter == 0){
                    if(!gap){
                        candyPosition.push(i - 1);
                    }else{
                        extraCandyPosition.push(i - 1);
                    };
                };

                if(!gap){
                    candyPosition.push(i);
                }else{
                    extraCandyPosition.push(i)
                };
                counter +=1
            };
            comparisonValue = candyColumn.eq(i);
        };

        if(extraCandyPosition.length > 2){
            candyPosition = $.merge(candyPosition, extraCandyPosition);
        };

        if(candyPosition.length <= 2){
            candyPosition = [];
        };

        candyCount = candyPosition.length;

        if(candyCount >= 3){
            deleteColumnCandy(candyPosition, candyColumn);
            score(candyCount);
        };
    };
};

function deleteColumnCandy(candyPosition, candyColumn){
    for (var i = 0; i < candyPosition.length; i++) {
		candyColumn.eq(candyPosition[i]).addClass('delete');
	};
};

//valida si hay dulces para eliminar en una fila
function rowValidation() {
	for (var j = 0; j < 6; j++) {
		var counter = 0;
		var candyPosition = [];
		var extraCandyPosition = [];
		var candyRow = candyRows(j);
		var comparisonValue = candyRow[0];
		var gap = false;
		for (var i = 1; i < candyRow.length; i++) {
			var srcComparison = comparisonValue.attr('src');
			var srcCandy = candyRow[i].attr('src');

			if (srcComparison != srcCandy) {
				if (candyPosition.length >= 3) {
					gap = true;
				} else {
					candyPosition = [];
				}
				counter = 0;
			} else {
				if (counter == 0) {
					if (!gap) {
						candyPosition.push(i - 1);
					} else {
						extraCandyPosition.push(i - 1);
					}
				}
				if (!gap) {
					candyPosition.push(i);
				} else {
					extraCandyPosition.push(i);
				}
				counter += 1;
			}
			comparisonValue = candyRow[i];
		}
		if (extraCandyPosition.length > 2) {
			candyPosition = $.merge(candyPosition, extraCandyPosition);
		}
		if (candyPosition.length <= 2) {
			candyPosition = [];
		}
		candyCount = candyPosition.length;
		if (candyCount >= 3) {
			deleteHorizontal(candyPosition, candyRow);
			score(candyCount);
		}
	}
}
function deleteHorizontal(candyPosition, candyRow) {
	for (var i = 0; i < candyPosition.length; i++) {
		candyRow[candyPosition[i]].addClass('delete');
	}
}

//conteo de puntuacion
function score(candyCount){
    var puntos = Number($('#score-text').text());
    switch (candyCount){
        case 3:
            puntos += 25;
            break;
        case 4:
            puntos += 50;
            break;
        case 5:
            puntos += 75;
            break;
        case 6:
            puntos += 100;
            break;
        case 7:
            puntos += 200;
    };
    $('#score-text').text(puntos);
};

//validacion
function validation(){
    columnValidation();
    rowValidation();
    // Si hay dulces que borrar
	if ($('img.delete').length !== 0) {
		deletesCandyAnimation();
	};
};

//eliminacion automatica de los elementos
function deletesCandyAnimation() {
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

function deletesCandy() {
	return new Promise(function (resolve, reject) {
		if ($('img.delete').remove()) {
			resolve(true);
		} else {
			reject('No se pudo eliminar Caramelo');
		}
	})
};

function checkBoardPromise(result) {
	if (result) {
		checkBoard();
	}
};

//llenado automatico de los espacios con elementos
function showPromiseError(error) {
	console.log(error);
};


//----------TEMPORIZADOR-------------

//inicializador
function initTime(){
    var tiempo = $("#timer");
    var s = 0;
    var m = 2;

    var interval = setInterval(function(){
        if(s < 10){
            tiempo.text("0" + m + ":" + "0" + s);
        }else if(s >= 10){
            tiempo.text("0" + m + ":" + s)
        };

        if(s === 0){
            m --;
            s = 60;
        }else{
            s --;
            if(m === 0 & s === 0){
                window.clearInterval(interval);
                endGame();
            };
        };
    },1000);
};

//--GENERADOR DE NUMEROS ALEATORIOS--
function randomNum(min, max){
    //genera un numero aleatorio entero
    return Math.floor((Math.random() * max) + min);
};
//-----------------------------------

//--------EFECTO DRAG & DROP---------
function dragAndDrop(){
    $("img").draggable({
        containment : '.panel-tablero',
        droppable : 'img',
        revert : true,
        revertDuration : 500,
        grid : [100,100],
        zIndex : 10,
    });
    $("img").droppable({
        drop : swapCandy
    });
};


//funcion para remplazar los dulces 
function swapCandy(event, candyDrag){
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
};


//funciona de conteo de movimientos 
function updateMoves(){
    var contador = Number($('#movimientos-text').text());
    var mov = contador += 1;
    $('#movimientos-text').text(mov);
};
//-----------------------------------


//-----------INICIAR JUEGO-----------
function Iniciar(){
    $(".btn-reinicio").on("click", function(){
        if($(this).text() == "Iniciar"){
            checkBoard();
            $(this).text("Reiniciar")
        }else if($(this).text() == "Reiniciar"){
            location.reload(true);
            $(this).text("Iniciar");
        };
        initTime();
    })
}


//Document.ready
$(document).ready(function(){
    cambioColor1(".main-titulo");
    Iniciar()
})



//-------FUNCION PARA ELIMINAR-------
function remove(elemento){
    $(elemento).detach()
}
//-----------------------------------

//animaciones para los tableros de puntuacion 
function endGame(){
    setTimeout(function(){
        $(".panel-tablero").animate({
            width: "0%",
            height : "0px"
        }, 2000, function(){
            remove(this);
        });
    }, 200);

    setTimeout(function(){
        $(".time").animate({
            width : "0%",
            heigth : "0%",
            opacity : "4.9"
        }, 1000, function(){
            remove(this);
        });
        
        $(".panel-score").animate({
            width : "100%",
        }, 2000, function(){
            $(".score").before("<p>Juego terminado</p>");
            $(".panel-score p").addClass("titulo-over");
        });
    },300);
};
