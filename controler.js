let turno = 1;
let players = ["O", "X"];
let turnosJugados = 0;
let player2=false;
let termino = false;
let ganador = 
	document.getElementById("ganador");
  
let mueve = 
document.getElementById("mueve");
let buttonRestart = 
  document.getElementById("btn-restart");
let buttonPlayer2 = 
  document.getElementById("btn-Player2");
let tablerobotones = Array.from(document.getElementsByClassName("btn"))

tablerobotones.map(
	x => x.addEventListener("click", Marcar)
);
buttonRestart.addEventListener("click",Restart)
buttonPlayer2.addEventListener("click",Player2)
const auxmueve= mueve.innerHTML

function Marcar(e){
	let botonPulsado = e.target;
	if(!termino && botonPulsado.innerHTML == ""){
    let finalizoPartida=0;
    if(turno==1){
      botonPulsado.innerHTML = players[turno];
      botonPulsado.style.color ="#D27C1B";
      turnosJugados += 1
      finalizoPartida = finalizo();
      turno=0
       mueve.innerHTML= auxmueve +" "+ players[turno]
      if(turno==0 && !player2 && finalizoPartida==0){
        if(turnosJugados < 9){
          Ramdom()
          turnosJugados += 1
          finalizoPartida = finalizo();
          turno=1
        }
      }
    }else if(turno==0 && player2 && finalizoPartida==0){
      botonPulsado.innerHTML = players[turno];
      botonPulsado.style.color ="black";
      turnosJugados += 1
      finalizoPartida = finalizo();
      turno=1
      mueve.innerHTML= auxmueve +" "+ players[turno]
    }
   
    
    if(finalizoPartida == 1){
			ganador.innerHTML = "Gano Player 1"
      ganador.style.color= "Chartreuse";
			termino = true;
		}
		else if(finalizoPartida == -1){
      if(player2)
        ganador.innerHTML = "Gano Player 2"
      else
        ganador.innerHTML = "Gano la Computadora"
      ganador.style.color= "Chartreuse";
			termino = true;
		}
    else if(turnosJugados>8 && finalizoPartida==0){
			ganador.innerHTML = "Empate "
      ganador.style.color= "red";
			termino = true;
    }
  }
}

function Restart(){
  if(turnosJugados>0 && !termino){
  if(window.confirm("La partida no termino, ¿Desea ReinicRamdomrla?")){
    tablerobotones.map(
      x => {
        x.innerHTML="";
        x.style.backgroundColor="white"
      }
    )
    ganador.innerHTML = ""
    termino = false;
    turno = 1;
    turnosJugados = 0;
  }   
  }
  if(termino){
    tablerobotones.map(
      x => {
        x.innerHTML="";
        x.style.backgroundColor="white"
      }
    )
    ganador.innerHTML = ""
    termino = false;
    turno = 1;
    turnosJugados = 0;
  }
}
function Player2(e){
  if(turnosJugados==0){
    if( e.target.innerHTML == "Activar"){
      player2=true;
      mueve.style.visibility ="visible"
      e.target.innerHTML = "Desactivar"
      mueve.innerHTML= auxmueve +" "+ players[turno]
    }
    else{
      e.target.innerHTML = "Activar"
      player2=false;
      mueve.style.visibility ="hidden"
    }
  }
  else{
    window.alert("La partida ya comenzo, para añadir player 2 o jugar contra la computadora reinicie le juego")
  }
}
function finalizo(){
	posicionVictorRamdom = false;
	let nfinalizo = 0;

	function sonIguales(...copia){
		boton = copia.map(x=>x.innerHTML);
		if(boton[0] != "" && boton.every((x, i, arr) => x===arr[0])){
			tablerobotones.map(x => {x.style.backgroundColor = "#71EB21"; x.innerHTML=""; x.style.color="red"})
			copia.map(x => {x.style.backgroundColor = "#21DCEB"; x.innerHTML=players[turno]; x.style.color="white"})
			return true;
		}
		else{
			return false;
		}
	}
	sonIguales(tablerobotones[0], tablerobotones[1], tablerobotones[2])?
		posicionVictorRamdom = true : 
	sonIguales(tablerobotones[3], tablerobotones[4], tablerobotones[5])?
		posicionVictorRamdom = true :
  sonIguales(tablerobotones[6], tablerobotones[7], tablerobotones[8])?
		posicionVictorRamdom = true :
	sonIguales(tablerobotones[0], tablerobotones[3], tablerobotones[6])?
		posicionVictorRamdom = true :
	sonIguales(tablerobotones[1], tablerobotones[4], tablerobotones[7])?
		posicionVictorRamdom = true :
	sonIguales(tablerobotones[2], tablerobotones[5], tablerobotones[8])?
		posicionVictorRamdom = true :
  sonIguales(tablerobotones[0], tablerobotones[4], tablerobotones[8])?
		posicionVictorRamdom = true :
	sonIguales(tablerobotones[2], tablerobotones[4], tablerobotones[6])?
		posicionVictorRamdom = true : posicionVictorRamdom =false 
	if(posicionVictorRamdom){
		if(turno == 1){
			nfinalizo = 1;
		}
		else{
			nfinalizo = -1;
		}
	}

	return nfinalizo;
}

function rand(max) {
  return Math.floor(Math.random() * (max)) ;
}
function Ramdom(){
	let boton = tablerobotones.map(x=>x.innerHTML);
	let pos;
	if(boton[4]==""){
		pos = 4;
	}
	else{
		let n = rand( boton.length);
		while(boton[n]!=""){
			n = rand( boton.length); 
		}
		pos = n;
	}

	tablerobotones[pos].innerHTML = "O";
  tablerobotones[pos].style.color ="#204826";
	return pos;
}