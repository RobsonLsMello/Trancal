class  AnimationController{
    keyframe = 0;
    conjuntoFrameAtual = 0;
    constructor(frameElement, frames){
        this.frameElement = frameElement;
        this.frames = frames;
    }
    animacao(conjuntoFrame){
        if(conjuntoFrame != this.conjuntoFrameAtual){
            this.conjuntoFrameAtual = conjuntoFrame;
            this.keyframe = 0;
        }
        this.frameElement.src =  `img/${this.frames[conjuntoFrame][this.keyframe]}`;        
        this.keyframe++;
        if(this.keyframe > this.frames[conjuntoFrame].length - 1){
            this.keyframe = 0;
        }        
    }
}
var transistorFrames =  [
    [
        "transistor.png"
    ],
    [
        "tp1_01.svg",
        "tp1_02.svg"
    ],
    [
        "tp2_01.svg"
    ],
    [
        "tp3_01.svg"
    ],
    [
        "tp4_01.svg"
    ]
]; 

/*Variaveis*/
var outrosDados = {};
var tensoes = {};
var correntes = {};
var tensoes = {};
var resistores = {};

var grandeza = [
    "Vcc", "Vrc", "Vbe", "Vrb1", "Vrb2", "Vce", "Vcb", "Vre", "I", "Ic", "Ib", "Ie", "Ib1", "Ib2", "Rc", "Re", "Rb1", "Rb2"
]

var coletarDados = () =>{
    outrosDados = {
        tipoExercicio: document.querySelector("#tipo"),
        alfa: {
            element: document.querySelector("#alfa"),
            modulo: Number(document.querySelector("#alfa").value)
        },
        beta: {
            element: document.querySelector("#beta"),
            modulo: Number(document.querySelector("#beta").value)
        },
    }
    
    tensoes = {
        Vcc:{
            element: document.querySelector("#vcc"),
            modulo: Number(document.querySelector("#vcc").value),
            unidade: Number(document.querySelector("#unidade-vcc").value)
        },
        Vrc: {
            element: document.querySelector("#vrc"),
            modulo: Number(document.querySelector("#vrc").value),
            unidade: Number(document.querySelector("#unidade-vrc").value)
        },
        Vbe: {
            element: document.querySelector("#vbe"),
            modulo: Number(document.querySelector("#vbe").value),
            unidade: Number(document.querySelector("#unidade-vbe").value)
        },
        Vrb1: {
            element: document.querySelector("#vrb1"),
            modulo: Number(document.querySelector("#vrb1").value),
            unidade: Number(document.querySelector("#unidade-vrb1").value)
        },
        Vrb2: {
            element: document.querySelector("#vrb2"),
            modulo: Number(document.querySelector("#vrb2").value),
            unidade: Number(document.querySelector("#unidade-vrb2").value)
        },
        Vce: {
            element: document.querySelector("#vce"),
            modulo: Number(document.querySelector("#vce").value),
            unidade: Number(document.querySelector("#unidade-vce").value)
        },
        Vcb: {
            element: document.querySelector("#vcb"),
            modulo: Number(document.querySelector("#vcb").value),
            unidade: Number(document.querySelector("#unidade-vcb").value)
        },
        Vre: {
            element: document.querySelector("#vre"),
            modulo: Number(document.querySelector("#vre").value),
            unidade: Number(document.querySelector("#unidade-vre").value)
        },
    }
    
    correntes = {
        I: {
            element: document.querySelector("#i"),
            modulo: Number(document.querySelector("#i").value),
            unidade: Number(document.querySelector("#unidade-i").value)
        },
        Ic: {
            element: document.querySelector("#ic"),
            modulo: Number(document.querySelector("#ic").value),
            unidade: Number(document.querySelector("#unidade-ic").value)
        },
        Ie: {
            element: document.querySelector("#ie"),
            modulo: Number(document.querySelector("#ie").value),
            unidade: Number(document.querySelector("#unidade-ie").value)
        },
        Ib: {
            element: document.querySelector("#ib"),
            modulo: Number(document.querySelector("#ib").value),
            unidade: Number(document.querySelector("#unidade-ib").value)
        },
        Ib1: {
            element: document.querySelector("#ib1"),
            modulo: Number(document.querySelector("#ib1").value),
            unidade: Number(document.querySelector("#unidade-ib1").value)
        },
        Ib2: {
            element: document.querySelector("#ib2"),
            modulo: Number(document.querySelector("#ib2").value),
            unidade: Number(document.querySelector("#unidade-ib2").value)
        },
    }
    
    resistores = {    
        Rc: {
            element: document.querySelector("#rc"),
            modulo: Number(document.querySelector("#rc").value),
            unidade: Number(document.querySelector("#unidade-rc").value)
        },
        Re:{
            element: document.querySelector("#re"),
            modulo: Number(document.querySelector("#re").value),
            unidade: Number(document.querySelector("#unidade-re").value)
        },
        Rb1: {
            element: document.querySelector("#rb1"),
            modulo: Number(document.querySelector("#rb1").value),
            unidade: Number(document.querySelector("#unidade-rb1").value)
        },
        Rb2: {
            element: document.querySelector("#rb2"),
            modulo: Number(document.querySelector("#rb2").value),
            unidade: Number(document.querySelector("#unidade-rb2").value)
        },
    }
}

var animaTransistor = new AnimationController(document.querySelector("#transistor"), transistorFrames);
var tipoExercicio = 0;


var corrigirInput = (input) =>{
    let id = input.id.split("-")[1];
    let idJson = "";
    let unidadeAnterior = 0;
    let unidadeDestino = 0;
    for(key in id){
        idJson += (key == 0 ? id[key].toUpperCase() : id[key]);
    }
    switch(idJson[0]){
        case 'R':
            unidadeAnterior = resistores[idJson].unidade;
            coletarDados();
            unidadeDestino = resistores[idJson].unidade - unidadeAnterior;
            resistores[idJson].element.value = (resistores[idJson].modulo * Math.pow(10, (-1)*unidadeDestino)).toFixed(9); 
        break;
        case 'V':
            unidadeAnterior = tensoes[idJson].unidade;
            coletarDados();
            unidadeDestino = tensoes[idJson].unidade - unidadeAnterior;
            tensoes[idJson].element.value = (tensoes[idJson].modulo * Math.pow(10, (-1)*unidadeDestino)).toFixed(9); 
        break;
        case 'I':
            unidadeAnterior = correntes[idJson].unidade;
            coletarDados();
            unidadeDestino = correntes[idJson].unidade - unidadeAnterior;
            correntes[idJson].element.value = (correntes[idJson].modulo * Math.pow(10, (-1)*unidadeDestino)).toFixed(9); 
        break;
    }
    console.log(idJson);
}
var esconderInputs = () => {
    document.querySelector("#formulario").innerHTML = "";
    limparCampos();
    switch(outrosDados.tipoExercicio.value){
        case "0":
            tensoes.Vrb1.element.parentNode.hidden = true;
            tensoes.Vrb2.element.parentNode.hidden = true;
            tensoes.Vrc.element.parentNode.hidden = true;
            tensoes.Vre.element.parentNode.hidden = true;

            correntes.Ib1.element.parentNode.hidden = true;
            correntes.Ib2.element.parentNode.hidden = true;

            resistores.Rc.element.parentNode.hidden = true;
            resistores.Rb1.element.parentNode.hidden = true;         
            resistores.Re.element.parentNode.hidden = true;
            resistores.Rb2.element.parentNode.hidden = true;
        break;
        case "1":
            tensoes.Vrb1.element.parentNode.hidden = true;
            tensoes.Vrb2.element.parentNode.hidden = true;
            tensoes.Vrc.element.parentNode.hidden = true;
            tensoes.Vre.element.parentNode.hidden = true;

            correntes.Ib1.element.parentNode.hidden = true;
            correntes.Ib2.element.parentNode.hidden = true;

            resistores.Rc.element.parentNode.hidden = true;
            resistores.Rb1.element.parentNode.hidden = true;         
            resistores.Re.element.parentNode.hidden = true;
            resistores.Rb2.element.parentNode.hidden = true;
        break;
        case "2":
            tensoes.Vrb1.element.parentNode.hidden = false;
            tensoes.Vrb2.element.parentNode.hidden = true;
            tensoes.Vrc.element.parentNode.hidden = false;
            tensoes.Vre.element.parentNode.hidden = true;

            correntes.Ib1.element.parentNode.hidden = true;
            correntes.Ib2.element.parentNode.hidden = true;

            resistores.Rc.element.parentNode.hidden = false;
            resistores.Rb1.element.parentNode.hidden = false;         
            resistores.Re.element.parentNode.hidden = true;
            resistores.Rb2.element.parentNode.hidden = true;
        break;
        case "3":
            tensoes.Vrb1.element.parentNode.hidden = false;
            tensoes.Vrb2.element.parentNode.hidden = true;
            tensoes.Vrc.element.parentNode.hidden = false;
            tensoes.Vre.element.parentNode.hidden = false;

            correntes.Ib1.element.parentNode.hidden = true;
            correntes.Ib2.element.parentNode.hidden = true;

            resistores.Rc.element.parentNode.hidden = false;
            resistores.Rb1.element.parentNode.hidden = false;         
            resistores.Re.element.parentNode.hidden = false;
            resistores.Rb2.element.parentNode.hidden = true;
        break;
        case "4":
            tensoes.Vrb1.element.parentNode.hidden = false;
            tensoes.Vrb2.element.parentNode.hidden = false;
            tensoes.Vrc.element.parentNode.hidden = false;
            tensoes.Vre.element.parentNode.hidden = false;

            correntes.Ib1.element.parentNode.hidden = false;
            correntes.Ib2.element.parentNode.hidden = false;

            resistores.Rc.element.parentNode.hidden = false;
            resistores.Rb1.element.parentNode.hidden = false;         
            resistores.Re.element.parentNode.hidden = false;
            resistores.Rb2.element.parentNode.hidden = false;
        break;
    }
}

var limparCampos = () =>{
    outrosDados.alfa.modulo = 0;
    outrosDados.alfa.element.value = 0;
    outrosDados.beta.modulo = 0;
    outrosDados.beta.element.value = 0;
    for(key in document.getElementsByClassName("unidade")){
        let value = document.getElementsByClassName("unidade")[key];
        if(key < 18){
            value.value = 0;
        }
        
    }
    for(let i = 0; i < 8; i++){
        tensoes[grandeza[i]].modulo = 0;
        tensoes[grandeza[i]].element.value = 0;
    }
    for(let i = 8; i < 14; i++){
        correntes[grandeza[i]].modulo = 0;
        correntes[grandeza[i]].element.value = 0;
    }
    for(let i = 14; i < 18; i++){
        resistores[grandeza[i]].modulo = 0;
        resistores[grandeza[i]].element.value = 0;
    }
}
var converterUnidades = () =>{
    for(let i = 0; i < 8; i++){
        tensoes[grandeza[i]].modulo = tensoes[grandeza[i]].modulo * Math.pow(10, tensoes[grandeza[i]].unidade);
    }
    for(let i = 8; i < 14; i++){
        correntes[grandeza[i]].modulo = correntes[grandeza[i]].modulo * Math.pow(10, correntes[grandeza[i]].unidade);
    }
    for(let i = 14; i < 18; i++){
        resistores[grandeza[i]].modulo = resistores[grandeza[i]].modulo * Math.pow(10, resistores[grandeza[i]].unidade);
    }
}

var verificarTentativas = (tentativas, elemento) =>{
    
    for(key in tentativas){
        if(tentativas[key][0] > 0){
            elemento.value = tentativas[key][0].toFixed(9);
            document.querySelector("#formulario").innerHTML += `<li>${tentativas[key][1]} = ${tentativas[key][0].toFixed(9)}</li>`;
            return tentativas[key][0];
        }
    }
    return 0;
}
var calcular = () =>{
    document.querySelector("#formulario").innerHTML = "";
    converterUnidades();
    for(let i = 0; i< 10; i++){
        if(outrosDados.alfa.modulo == 0){
            let ts = [];
            ts.push([outrosDados.beta.modulo/(outrosDados.beta.modulo + 1), `α = β/(β+1) = ${outrosDados.beta.modulo}/(${outrosDados.beta.modulo} + 1)`]);
            ts.push(correntes.Ib.modulo != 0 ? [correntes.Ic.modulo/correntes.Ib.modulo , `α = Ic/Ib = ${correntes.Ic.modulo}/${correntes.Ib.modulo}`]: [0, ""]);
            outrosDados.alfa.modulo = verificarTentativas(ts, outrosDados.alfa.element);
        }
        if(outrosDados.beta.modulo == 0){
            let ts = [];
            ts.push([outrosDados.alfa.modulo/(1 - outrosDados.alfa.modulo), `β = α/(1-α) = ${outrosDados.alfa.modulo}/(1 - ${outrosDados.alfa.modulo})`]);
            ts.push(correntes.Ie.modulo != 0 ? [correntes.Ic.modulo/correntes.Ie.modulo , `β = Ic/Ie = ${correntes.Ic.modulo}/${correntes.Ie.modulo}`]: [0, ""]);
            outrosDados.beta.modulo = verificarTentativas(ts, outrosDados.beta.element);
        }
        if(correntes.Ib.modulo == 0){
            let ts = [];
            //apenas corrente e constantes
            ts.push(outrosDados.beta.modulo != 0 ? [correntes.Ic.modulo/outrosDados.beta.modulo, `Ib = Ic/β = ${correntes.Ic.modulo}/${outrosDados.beta.modulo}`]: [0, ""]);
            if(outrosDados.tipoExercicio.value < 4){
                //apenas corrente e constantes    
                ts.push(correntes.Ic.modulo != 0 ? [correntes.I.modulo - correntes.Ic.modulo, `Ib = I-Ic = ${correntes.I.modulo} - ${correntes.Ic.modulo}`]: [0, ""]);
                ts.push(correntes.Ic.modulo != 0 ? [correntes.Ie.modulo - correntes.Ic.modulo, `Ib = Ie - Ic = ${correntes.Ie.modulo} - ${correntes.Ic.modulo}`]: [0, ""]);            
                //tensoes e resistencias                
                ts.push(resistores.Rb1.modulo != 0? [tensoes.Vrb1.modulo / resistores.Rb1.modulo , `Ib = Vrb1/Rb1 = ${tensoes.Vrb1.modulo}/${resistores.Rb1.modulo}`]: [0, ""]);
            }
            else{
                ts.push( correntes.Ib2.modulo != 0 ? [correntes.Ib1.modulo - correntes.Ib2.modulo, `Ib = Ib1 - Ib2 = ${correntes.Ib1.modulo} - ${correntes.Ib2.modulo}`]: [0, ""]);
            }          
            correntes.Ib.modulo = verificarTentativas(ts, correntes.Ib.element);
        }
        if(correntes.Ib1.modulo == 0 && outrosDados.tipoExercicio.value == 4){
            let ts = [];
            //apenas corrente e constantes   
            ts.push(correntes.Ic.modulo != 0 ? [correntes.I.modulo - correntes.Ic.modulo, `Ib1 = I-Ic = ${correntes.I.modulo} - ${correntes.Ic.modulo}`]: [0, ""]);

            ts.push(correntes.Ib.modulo != 0 && correntes.Ib2.modulo != 0 ? [correntes.Ib.modulo + correntes.Ib2.modulo , `Ib1 = Ib+Ib2 = ${correntes.Ib.modulo} + ${correntes.Ib2.modulo}`]: [0, ""]);
            ts.push(resistores.Rb1.modulo != 0? [tensoes.Vrb1.modulo / resistores.Rb1.modulo , `Ib1 = Vrb1/Rb1 = ${tensoes.Vrb1.modulo}/${resistores.Rb1.modulo}`]: [0, ""]);
            correntes.Ib1.modulo = verificarTentativas(ts, correntes.Ib1.element);
        }
        if(correntes.Ib2.modulo == 0 && outrosDados.tipoExercicio.value == 4){
            let ts = [];
            //apenas corrente e constantes
            ts.push(correntes.Ib.modulo != 0 && correntes.Ib1.modulo != 0 ? [correntes.Ib1.modulo - correntes.Ib.modulo , `Ib2 = Ib1-Ib = ${correntes.Ib1.modulo} - ${correntes.Ib.modulo}`]: [0, ""]);
            ts.push(correntes.I.modulo != 0 && correntes.Ie.modulo != 0 ? [correntes.I.modulo - correntes.Ie.modulo , `Ib2 = I-Ie = ${correntes.I.modulo} - ${correntes.Ie.modulo}`]: [0, ""]);
            ts.push(resistores.Rb2.modulo != 0? [tensoes.Vrb2.modulo / resistores.Rb2.modulo , `Ib2 = Vrb2/Rb2 = ${tensoes.Vrb2.modulo}/${resistores.Rb2.modulo}`]: [0, ""]);
            correntes.Ib2.modulo = verificarTentativas(ts, correntes.Ib2.element);
        }
        if(correntes.Ic.modulo == 0){
            let ts = [];
            //apenas corrente e constantes
            ts.push(correntes.Ib.modulo != 0 ? [correntes.Ie.modulo - correntes.Ib.modulo , `Ic =  Ie-Ib = ${correntes.Ie.modulo} - ${correntes.Ib.modulo}`]: [0, ""]);
            if(outrosDados.tipoExercicio.value != 4)
                ts.push(correntes.Ib.modulo != 0 ? [correntes.I.modulo - correntes.Ib.modulo, `Ic = I-Ib = ${correntes.I.modulo} - ${correntes.Ib.modulo}`]: [0, ""]);
            else
                ts.push(correntes.Ib1.modulo != 0 ? [correntes.I.modulo - correntes.Ib1.modulo, `Ic = I-Ib1 = ${correntes.I.modulo} - ${correntes.Ib1.modulo}`]: [0, ""]);
            ts.push([correntes.Ib.modulo * outrosDados.beta.modulo, `Ic = Ib*β = ${correntes.Ib.modulo}*${outrosDados.beta.modulo}`]);
            ts.push([correntes.Ie.modulo * outrosDados.alfa.modulo, `Ic = Ie*α = ${correntes.Ie.modulo}*${outrosDados.beta.modulo}`]);
            //tensoes e resistencias
            if(outrosDados.tipoExercicio.value > 1)
                ts.push(resistores.Rc.modulo != 0? [tensoes.Vrc.modulo / resistores.Rc.modulo , `Ic = Vrc/Rc = ${tensoes.Vrc.modulo}/${resistores.Rc.modulo}`]: [0, ""]);
            correntes.Ic.modulo = verificarTentativas(ts, correntes.Ic.element);
        }
        if(correntes.Ie.modulo == 0){
            let ts = [];
            //apenas corrente e constantes
            if(outrosDados.tipoExercicio.value != 4)
                ts.push([correntes.I.modulo, `Ie = I = ${correntes.I.modulo}`]);
            else
                ts.push(correntes.I.modulo != 0 && correntes.Ib2.modulo != 0 ? [correntes.I.modulo - correntes.Ib2.modulo , `Ie = I-Ib2 = ${correntes.I.modulo} - ${correntes.Ib2.modulo}`]: [0, ""]);
            ts.push([correntes.Ic.modulo + correntes.Ib.modulo, `Ie = Ic+Ib = ${correntes.Ic.modulo} - ${correntes.Ib.modulo}`]);
            ts.push(outrosDados.alfa.modulo != 0 ? [correntes.Ic.modulo/outrosDados.alfa.modulo, `Ie = Ic/α = ${correntes.Ic.modulo}/${outrosDados.alfa.modulo}`]: [0, ""]);
            //tensoes e resistencias
            if(outrosDados.tipoExercicio.value > 1)
                ts.push(resistores.Re.modulo != 0? [tensoes.Vre.modulo / resistores.Re.modulo , `Ie = Vre/Re = ${tensoes.Vre.modulo}/${resistores.Re.modulo}`]: [0, ""]);
            correntes.Ie.modulo = verificarTentativas(ts, correntes.Ie.element);
        }
        if(correntes.I.modulo == 0){
            let ts = [];
            if(outrosDados.tipoExercicio.value < 4){
                ts.push([correntes.Ie.modulo,`I = Ie = ${correntes.Ie.modulo}`]);
            }
            else{
                ts.push(correntes.Ie.modulo != 0 && correntes.Ib2.modulo != 0 ?[correntes.Ie.modulo + correntes.Ib2.modulo,`I = Ie+Ib2 = ${correntes.Ie.modulo} + ${correntes.Ib2.modulo}`]: [0, ""]);

                ts.push(correntes.Ic.modulo != 0 && correntes.Ib1.modulo != 0 ?[correntes.Ic.modulo + correntes.Ib1.modulo,`I = Ic+Ib1 = ${correntes.Ic.modulo} + ${correntes.Ib1.modulo}`]: [0, ""]);
            }
            correntes.I.modulo = verificarTentativas(ts, correntes.I.element);
        }
        //tensoes
        if(tensoes.Vrc.modulo == 0 && outrosDados.tipoExercicio.value > 1){
            let ts = [];
            ts.push([resistores.Rc.modulo * correntes.Ic.modulo, `Vrc = Rc*Ic = ${resistores.Rc.modulo} * ${correntes.Ic.modulo}`]);
            if(tensoes.Vce.modulo != 0 && ((tensoes.Vre.modulo != 0 && outrosDados.tipoExercicio.value >= 3) || (outrosDados.tipoExercicio.value < 3)))
                ts.push([tensoes.Vcc.modulo - tensoes.Vce.modulo - tensoes.Vre.modulo, `Vrc = Vcc-Vce-Vre = ${tensoes.Vcc.modulo} - ${tensoes.Vce.modulo} - ${tensoes.Vre.modulo}`]);
            tensoes.Vrc.modulo = verificarTentativas(ts, tensoes.Vrc.element);
        }
        if(tensoes.Vre.modulo == 0  && outrosDados.tipoExercicio.value > 2){
            let ts = [];
            ts.push([resistores.Re.modulo * correntes.Ie.modulo, `Vre = Re*Ie = ${resistores.Re.modulo} * ${correntes.Ie.modulo}`]);
            ts.push(tensoes.Vce.modulo != 0 && tensoes.Vrc.modulo != 0 ? 
                [tensoes.Vcc.modulo - tensoes.Vce.modulo - tensoes.Vrc.modulo, 
                `Vre = Vcc-Vce-Vrc = ${tensoes.Vcc.modulo} - ${tensoes.Vce.modulo} - ${tensoes.Vrc.modulo}`]: [0, ""]);

            tensoes.Vre.modulo = verificarTentativas(ts, tensoes.Vre.element);
        }
        if(tensoes.Vrb1.modulo == 0 && outrosDados.tipoExercicio.value > 1){
            let ts = [];
            if(outrosDados.tipoExercicio.value < 4)
                ts.push([resistores.Rb1.modulo * correntes.Ib.modulo, `Vrb1 = Rb1*Ib = ${resistores.Rb1.modulo} * ${correntes.Ib.modulo}`]);
            else{
                ts.push([resistores.Rb1.modulo * correntes.Ib1.modulo, `Vrb1 = Rb1*Ib1 = ${resistores.Rb1.modulo} * ${correntes.Ib1.modulo}`]);
                ts.push(tensoes.Vrb2.modulo != 0 ? [tensoes.Vcc.modulo - tensoes.Vrb2.modulo, `Vrb1 = Vcc-Vrb2 = ${tensoes.Vcc.modulo} - ${tensoes.Vrb2.modulo}`]: [0, ""]);
            }
                
            if(tensoes.Vbe.modulo != 0 && ((tensoes.Vre.modulo != 0 && outrosDados.tipoExercicio.value >= 3) || (outrosDados.tipoExercicio.value < 3)))
                ts.push([tensoes.Vcc.modulo - tensoes.Vbe.modulo - tensoes.Vre.modulo, `Vrb1 = Vcc-Vbe-Vre = ${tensoes.Vcc.modulo} - ${tensoes.Vbe.modulo} - ${tensoes.Vre.modulo}`]);
            tensoes.Vrb1.modulo = verificarTentativas(ts, tensoes.Vrb1.element);
        }
        if(tensoes.Vrb2.modulo == 0 && outrosDados.tipoExercicio.value > 3){
            let ts = [];
            ts.push([resistores.Rb2.modulo * correntes.Ib2.modulo, `Vrb2 = Rb2*Ib2 = ${resistores.Rb2.modulo} * ${correntes.Ib2.modulo}`]);

            ts.push(tensoes.Vcb.modulo != 0 && tensoes.Vrc.modulo != 0 ? 
                [tensoes.Vcc.modulo - tensoes.Vcb.modulo - tensoes.Vrc.modulo , 
                `Vrb2 = Vcc-Vcb-Vrc = ${tensoes.Vcc.modulo} - ${tensoes.Vcb.modulo} - ${tensoes.Vrc.modulo}`]: [0, ""]);

            ts.push(tensoes.Vrb1.modulo != 0 ? [tensoes.Vcc.modulo - tensoes.Vrb1.modulo, `Vrb2 = Vcc-Vrb1 = ${tensoes.Vcc.modulo} - ${tensoes.Vrb1.modulo}`]: [0, ""]);
            tensoes.Vrb2.modulo = verificarTentativas(ts, tensoes.Vrb2.element);
        }
        if(tensoes.Vce.modulo == 0){
            let ts = [];
            if(
                ((tensoes.Vrc.modulo != 0 && outrosDados.tipoExercicio.value > 1) || (outrosDados.tipoExercicio.value <= 1)) &&
                ((tensoes.Vre.modulo != 0 && outrosDados.tipoExercicio.value > 2) || (outrosDados.tipoExercicio.value <= 2))
            )
                ts.push([tensoes.Vcc.modulo - tensoes.Vre.modulo - tensoes.Vrc.modulo, `Vce = Vcc-Vre-Vrc = ${tensoes.Vcc.modulo} - ${tensoes.Vre.modulo} - ${tensoes.Vrc.modulo}`]);
            ts.push(tensoes.Vcb.modulo !=0 && tensoes.Vbe.modulo != 0 ? [tensoes.Vcb.modulo  + tensoes.Vbe.modulo , `Vce = Vcb+Vbe = ${tensoes.Vcb.modulo} + ${tensoes.Vbe.modulo}`]: [0, ""]);
            tensoes.Vce.modulo = verificarTentativas(ts, tensoes.Vce.element);
        }
        if(tensoes.Vbe.modulo == 0){
            let ts = [];
            if(outrosDados.tipoExercicio.value > 1 && tensoes.Vrb1.modulo != 0 && ((outrosDados.tipoExercicio.value > 2 && tensoes.Vre.modulo != 0) || outrosDados.tipoExercicio.value < 3))
                ts.push([tensoes.Vcc.modulo - tensoes.Vre.modulo - tensoes.Vrb1.modulo, `Vbe = Vcc-Vre-Vrb1 = ${tensoes.Vcc.modulo} - ${tensoes.Vre.modulo} - ${tensoes.Vrb1.modulo}`]);
            ts.push(tensoes.Vcb.modulo != 0 ? [tensoes.Vce.modulo  - tensoes.Vcb.modulo, `Vbe = Vce-Vcb = ${tensoes.Vce.modulo} - ${tensoes.Vcb.modulo}`]: [0, ""]);
            tensoes.Vbe.modulo = verificarTentativas(ts, tensoes.Vbe.element);
        }
        if(tensoes.Vcb.modulo == 0){
            let ts = [];
            if(outrosDados.tipoExercicio.value == 4 && tensoes.Vrc.modulo != 0 && tensoes.Vrb2.modulo != 0)
                ts.push([tensoes.Vcc.modulo - tensoes.Vrc.modulo - tensoes.Vrb2.modulo, `Vcb =  Vcc-Vrc-Vrb2 = ${tensoes.Vcc.modulo} - ${tensoes.Vrc.modulo} - ${tensoes.Vrb2.modulo}`]);
            ts.push(tensoes.Vbe.modulo != 0 ? [tensoes.Vce.modulo  - tensoes.Vbe.modulo , `Vcb = Vce-Vbe = ${tensoes.Vce.modulo} - ${tensoes.Vbe.modulo}`]: [0, ""]);
            tensoes.Vcb.modulo = verificarTentativas(ts, tensoes.Vcb.element);
        }
        if(tensoes.Vcc.modulo == 0){
            let ts = [];
            if(tensoes.Vce.modulo != 0 && 
                ((tensoes.Vrc.modulo != 0 && outrosDados.tipoExercicio.value > 1) || (outrosDados.tipoExercicio.value <= 1)) &&
                ((tensoes.Vre.modulo != 0 && outrosDados.tipoExercicio.value > 2) || (outrosDados.tipoExercicio.value <= 2))
            )
                ts.push([tensoes.Vce.modulo + tensoes.Vrc.modulo + tensoes.Vre.modulo, `Vcc = Vce+Vrc+Vre = ${tensoes.Vce.modulo} + ${tensoes.Vrc.modulo} + ${tensoes.Vre.modulo}`]);
            if(tensoes.Vbe.modulo != 0 && 
                ((tensoes.Vrb1.modulo != 0 && outrosDados.tipoExercicio.value > 1) || (outrosDados.tipoExercicio.value <= 1)) &&
                ((tensoes.Vre.modulo != 0 && outrosDados.tipoExercicio.value > 2) || (outrosDados.tipoExercicio.value <= 2))
            )
                ts.push([tensoes.Vrb1.modulo + tensoes.Vbe.modulo + tensoes.Vre.modulo, `Vcc = Vbe+Vre+Vrb1 = ${tensoes.Vbe.modulo} + ${tensoes.Vre.modulo} + ${tensoes.Vrb1.modulo}`]);
            if(tensoes.Vcb.modulo != 0 && 
                ((tensoes.Vrc.modulo != 0 && outrosDados.tipoExercicio.value > 1) || (outrosDados.tipoExercicio.value <= 1)) &&
                ((tensoes.Vrb2.modulo != 0 && outrosDados.tipoExercicio.value > 3) || (outrosDados.tipoExercicio.value <= 3))
            )
                ts.push([tensoes.Vrb2.modulo + tensoes.Vcb.modulo + tensoes.Vrc.modulo, `Vcc = Vcb+Vrc+Vrb2 = ${tensoes.Vcb.modulo} + ${tensoes.Vrc.modulo} + ${tensoes.Vrb2.modulo}`]);
            tensoes.Vcc.modulo = verificarTentativas(ts, tensoes.Vcc.element);
        }
        //resistencias
        if(resistores.Rc.modulo == 0){
            let ts = [];
            ts.push(correntes.Ic.modulo != 0 ? [tensoes.Vrc.modulo/correntes.Ic.modulo , `Rc = Vrc/Ic = ${tensoes.Vrc.modulo}/${correntes.Ic.modulo}`]: [0, ""]);
            resistores.Rc.modulo = verificarTentativas(ts, resistores.Rc.element);
        }
        if(resistores.Re.modulo == 0){
            let ts = [];
            ts.push(correntes.Ic.modulo != 0 ? [tensoes.Vre.modulo/correntes.Ie.modulo , `Re = Vre/Ie = ${tensoes.Vre.modulo}/${correntes.Ie.modulo}`]: [0, ""]);
            resistores.Re.modulo = verificarTentativas(ts, resistores.Re.element);
        }
        if(resistores.Rb1.modulo == 0){
            let ts = [];
            if(outrosDados.tipoExercicio.value < 4)
                ts.push(correntes.Ib.modulo != 0 ? [tensoes.Vrb1.modulo/correntes.Ib.modulo , `Rb1 = Vrb1/Ib = ${tensoes.Vrb1.modulo}/${correntes.Ib.modulo}`]: [0, ""]);
            else
                ts.push(correntes.Ib1.modulo != 0 ? [tensoes.Vrb1.modulo/correntes.Ib1.modulo , `Rb1 = Vrb1/Ib1 = ${tensoes.Vrb1.modulo}/${correntes.Ib1.modulo}`]: [0, ""]);
            resistores.Rb1.modulo = verificarTentativas(ts, resistores.Rb1.element);
        }
        if(resistores.Rb2.modulo == 0){
            let ts = [];
            ts.push(correntes.Ib2.modulo != 0 ? [tensoes.Vrb2.modulo/correntes.Ib2.modulo , `Rb2 = Vrb2/Ib2 = ${tensoes.Vrb2.modulo}/${correntes.Ib2.modulo}`]: [0, ""]);
            resistores.Rb2.modulo = verificarTentativas(ts, resistores.Rb2.element);
        }
    }
    
}   


var start = () =>{
    animaTransistor.animacao(0);
    limparCampos();
}
var loop = () =>{
    coletarDados();
}

var loopAnimacao = () =>{
    animaTransistor.animacao(outrosDados.tipoExercicio.value);
}




setInterval(loop, 10);
setInterval(loopAnimacao, 200);

setTimeout(() => {
    window.addEventListener("load", start);
}, 11);

document.querySelector("#calcular").addEventListener("click", calcular);
document.querySelector("#tipo").addEventListener("change", esconderInputs);

for(key in document.getElementsByClassName("unidade")){
    let value = document.getElementsByClassName("unidade")[key];
    if(key < 18){
        value.addEventListener("change", input =>{
            corrigirInput(input.srcElement);
        })
    }
    
}
