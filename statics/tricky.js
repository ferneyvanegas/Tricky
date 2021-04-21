//Clases
class Tablero{
    constructor(base){
        this.celdasJugadas = [];
        this.turno = 0; //0:X 1:O

        this.puntaje0 = 0;
        this.puntaje1 = 0;
        document.getElementById('puntaje0').textContent = this.puntaje0;
        document.getElementById('puntaje1').textContent = this.puntaje1;

        this.base = base;
        this.campo = this.crearCampo();
        document.body.appendChild(this.campo);
        
        this.tabla = this.crearTabla();
        this.campo.appendChild(this.tabla);
    }

    crearCampo(){
        let campoJuego = document.createElement('div');
        campoJuego.id = 'campo';
        campoJuego.style.width = '100%';
        campoJuego.style.height = '100%';
        campoJuego.style.color = 'red';
        campoJuego.style.margin = '2px';
        campoJuego.style.fontSize = '40px';
        campoJuego.className = 'container';

        return campoJuego;
    }

    crearTabla(){
        let tabla = document.createElement('table');
        tabla.id = 'tablaJuego';
        tabla.style.borderStyle = 'solid';
        tabla.style.borderColor = 'white';
        tabla.style.width = '100%';
        tabla.style.height = '100%';
        let cuerpo = document.createElement('tbody');
        
        for(let x = 0; x < 3; x++){
            let fila = document.createElement('tr');
            fila.style.borderStyle = 'groove';
            for(let y = 0; y < 3; y++){
                let col = document.createElement('td');
                col.id = `${x}${y}`
                col.style.borderStyle = 'groove';
                col.style.width = '200px';
                col.style.height = '83px';
                col.style.textAlign = 'center';
                col.style.borderColor = 'dimgray'

                //col.onclick = this.seleccionarCelda;
                col.addEventListener('click',()=>{this.seleccionarCelda(col);});
                fila.appendChild(col);

                 //Ícono del circulo
                 let icono0 = document.createElement('i');
                 icono0.id = `ico_exx_${x}${y}`
                 icono0.classList.add('fas');
                 icono0.classList.add('fa-times');
                 icono0.classList.add('fa-2x');
                 icono0.classList.add('text-primary');
                 icono0.style.display = 'none';
                 col.appendChild(icono0);

                //Ícono del circulo
                let icono1 = document.createElement('i');
                icono1.id = `ico_circle_${x}${y}`
                icono1.classList.add('fas');
                icono1.classList.add('fa-circle');
                icono1.classList.add('fa-2x');
                icono1.classList.add('text-danger');
                icono1.style.display = 'none';
                col.appendChild(icono1);
            }
            cuerpo.appendChild(fila);
        }

        tabla.appendChild(cuerpo);

        return tabla;
    }

    //Este método, si la celda está jugada, escribe un valor y evalúa si hay ó no tricky
    seleccionarCelda(celda){
        if(!this.existeCeldaJugada(celda.id)){
            let simbolo = '';

            if(this.turno == 0){
                celda.style.color = 'dodgerblue'
                simbolo = 'X';
                document.getElementById(`ico_exx_${celda.id}`).style.display = 'block';
                this.turno = 1;
            }
            else{
                celda.style.color = 'firebrick'
                simbolo = '0';
                document.getElementById(`ico_circle_${celda.id}`).style.display = 'block';
                this.turno = 0;
            }
    
            this.celdasJugadas.push(
                {"celdaId":celda.id, 
                "valor":simbolo}
            );

            this.tricky();
        }
    }

    //Este método evalua si la celda ya está jugada ó no
    existeCeldaJugada(celdaId){
        let existe = false;

        this.celdasJugadas.forEach(element => {
            if(celdaId == element['celdaId'])
                existe = true;
        });

        return existe;
    }

    //EVALUACIÓN DE TRICKY
    //==============================================
    tricky(){
        if(this.trickyFilas()){
            $('#exampleModal').modal('show');
            this.msnVictoria();
            this.reset();
        }   
        else if(this.trickyColumnas()){
            $('#exampleModal').modal('show');
            this.msnVictoria();
            this.reset();
        }
        else if(this.trickyDiagIzqDer()){
            $('#exampleModal').modal('show');
            this.msnVictoria();
            this.reset();
        }
        else if(this.trickyDiagDerIzq()){
            $('#exampleModal').modal('show');
            this.msnVictoria();
            this.reset();
        }
        else if(this.noTricky()){
            this.reset();
        }
    }

    trickyFilas(){
        let evaFilas = false;
        let simboloTurno = '';

        let filas = [];

        //Como el turno ya fue cambiado, al evaluarse se toma como referencia el turno anterior
        if(this.turno == 0) simboloTurno = '0';
        else simboloTurno = 'X';

        this.celdasJugadas.forEach(element => {
            if(element['valor'] == simboloTurno)
                filas.push(element['celdaId'].substring(0,1));
        });

        //Ordenar el array para verificar existencias seguidas
        filas.sort();

        let cont = 0;
        let fila = null;
        filas.forEach(element => {
            if(element == fila){
                cont++;
            }
            else{
                fila = element;
                cont = 1;
            }

            //Si se encuentran 3 filas seguidas, es tricky.
            if(cont == 3)
                evaFilas = true;
        });

        return evaFilas;
    }

    trickyColumnas(){
        let evaColumnas = false;
        let simboloTurno = '';

        let columnas = [];

        //Como el turno ya fue cambiado, al evaluarse se toma como referencia el turno anterior
        if(this.turno == 0) simboloTurno = '0';
        else simboloTurno = 'X';

        this.celdasJugadas.forEach(element => {
            if(element['valor'] == simboloTurno)
                columnas.push(element['celdaId'].substring(1));
        });

        //Ordenar el array para verificar existencias seguidas
        columnas.sort();

        let cont = 0;
        let col = null;
        columnas.forEach(element => {
            if(element == col){
                cont++;
            }
            else{
                col = element;
                cont = 1;
            }

            //Si se encuentran 3 columnas seguidas, es tricky.
            if(cont == 3)
                evaColumnas = true;
        });

        return evaColumnas;
    }

    trickyDiagIzqDer(){
        let evaCeldas = false;
        let simboloTurno = '';

        let celdas = [];

        //Como el turno ya fue cambiado, al evaluarse se toma como referencia el turno anterior
        if(this.turno == 0) simboloTurno = '0';
        else simboloTurno = 'X';

        this.celdasJugadas.forEach(element => {
            if(element['valor'] == simboloTurno)
                celdas.push(element['celdaId']);
        });

        //Ordenar el array para verificar existencias seguidas
        celdas.sort();

        let cont = 0;
        let celda = '00';
        celdas.forEach(element => {
            if((element == celda) 
            || (element == parseInt(celda + 11).toString())
            || (element == parseInt(celda + 22).toString())
            ){
                //El ticky diagonal no necesita validar sino casillas en una sola dirección. Por lo que si no se cumple la condición, no se necesita hacer nada más.
                cont++;
            }

            //Si se encuentran 3 columnas seguidas, es tricky.
            if(cont == 3)
                evaCeldas = true;
        });

        return evaCeldas;
    }

    trickyDiagDerIzq(){
        let evaCeldas = false;
        let simboloTurno = '';

        let celdas = [];

        //Como el turno ya fue cambiado, al evaluarse se toma como referencia el turno anterior
        if(this.turno == 0) simboloTurno = '0';
        else simboloTurno = 'X';

        this.celdasJugadas.forEach(element => {
            if(element['valor'] == simboloTurno)
                celdas.push(element['celdaId']);
        });

        //Ordenar el array para verificar existencias seguidas
        celdas.sort();

        let cont = 0;
        let celda = '20';
        celdas.forEach(element => {
            if((element == celda) 
            || (element == parseInt(celda - 9).toString())
            || (element == `0${parseInt(celda - 18).toString()}`)
            ){
                //El ticky diagonal no necesita validar sino casillas en una sola dirección. Por lo que si no se cumple la condición, no se necesita hacer nada más.
                cont++;
            }

            //Si se encuentran 3 columnas seguidas, es tricky.
            if(cont == 3)
                evaCeldas = true;
        });

        return evaCeldas;
    }

    noTricky(){
        let evalNoTricky = false;
        if(this.celdasJugadas.length == 9)
            evalNoTricky = true;

        return evalNoTricky;
    }
    //==============================================


    //Método que emite un mensaje de victoria especificando el ganador e incrementa puntajes
    msnVictoria(){
        let msn = '';

        if(this.turno == 0){
            msn = `Punto para O`;
            this.puntaje1++;
        }  
        else{
            msn = `Punto para X`;
            this.puntaje0++;
        }
            
        document.getElementById('msn').textContent = msn;
        document.getElementById('puntaje0').textContent = this.puntaje0;
        document.getElementById('puntaje1').textContent = this.puntaje1;
    }

    //Método que restablece el juego para seguir con nueva partida
    reset(){
        setTimeout(()=>{
            this.celdasJugadas.forEach((element)=>{
                document.getElementById(`ico_circle_${element.celdaId}`).style.display = 'none';
                document.getElementById(`ico_exx_${element.celdaId}`).style.display = 'none';
            });
    
            this.celdasJugadas = [];
            this.turno = 0;
        }
            ,1000);
    }
    
}

function app(){
    const juego = new Tablero(1);
}   