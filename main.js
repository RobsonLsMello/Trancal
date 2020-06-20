/**
 * @description
 * Classe responsável por controlar animações
 */
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
    "Vcc", "Vrc", "Vbe", "Vrb1", "Vrb2", "Vce", "Vcb", "Vre", "Ic", "Ib", "Ie", "Ib1", "Ib2", "I", "Rc", "Re", "Rb1", "Rb2", "alfa", "beta", "Pc", "Pe", "Pb1", "Pb2"
]
var regexpGrandeza = () =>{
    return new RegExp(JSON.stringify(grandeza).split(",").join("|").split("]").join(")+").split("[").join("(").split("\"").join(""));
}
/**
 * @description
 * Tenta realizar as expressões matemáticas
 * @param {HTMLElement} elemento 
 */
var realizarExpressao = (elemento) =>{
    let expressao = elemento.value;
    let expressaoPura = elemento.value;
    grandeza.forEach(item =>{        
        try {
            let variavel = expressao.match(regexpGrandeza())[0];
            switch(variavel[0]){
                case 'R':
                    expressao = expressao.split(variavel).join(resistores[variavel].modulo);
                break;
                case 'V':
                    expressao = expressao.split(variavel).join(tensoes[variavel].modulo);
                break;
                case 'I':
                    expressao = expressao.split(variavel).join(correntes[variavel].modulo);
                break;
                case 'P':
                    expressao = expressao.split(variavel).join(potencias[variavel].modulo);
                break;
                case 'alfa':
                case 'beta':
                    expressao = expressao.split(variavel).join(outrosDados[variavel].modulo);
                break;
            }
        } catch (error) {

        }   
    })
    let resultado = Number(eval(expressao).toFixed(9));
    if(!isNaN(resultado)){
        document.querySelector("#formulario").innerHTML += `<li>${elemento.id} = ${expressaoPura} = ${expressao} = ${resultado}</li>`;
        elemento.value = resultado;
        return resultado;
    }
    else
        return expressao;
}
/**
 * @description
 * Coletar dados dos inputs  e joga-los em seus objetos
 */
var coletarDados = () =>{
    outrosDados = {
        tipoExercicio: document.querySelector("#tipo"),
        alfa: {
            element: document.querySelector("#alfa"),
            modulo: Number(document.querySelector("#alfa").value),
            exp: document.querySelector("#alfa").value
        },
        beta: {
            element: document.querySelector("#beta"),
            modulo: Number(document.querySelector("#beta").value),
            exp: document.querySelector("#beta").value
        },
    }
    
    tensoes = {
        Vcc:{
            element: document.querySelector("#vcc"),
            modulo: Number(document.querySelector("#vcc").value),
            unidade: Number(document.querySelector("#unidade-vcc").value),
            exp: document.querySelector("#vcc").value
        },
        Vrc: {
            element: document.querySelector("#vrc"),
            modulo: Number(document.querySelector("#vrc").value),
            unidade: Number(document.querySelector("#unidade-vrc").value),
            exp: document.querySelector("#vrc").value
        },
        Vbe: {
            element: document.querySelector("#vbe"),
            modulo: Number(document.querySelector("#vbe").value),
            unidade: Number(document.querySelector("#unidade-vbe").value),
            exp: document.querySelector("#vbe").value
        },
        Vrb1: {
            element: document.querySelector("#vrb1"),
            modulo: Number(document.querySelector("#vrb1").value),
            unidade: Number(document.querySelector("#unidade-vrb1").value),
            exp: document.querySelector("#vrb1").value
        },
        Vrb2: {
            element: document.querySelector("#vrb2"),
            modulo: Number(document.querySelector("#vrb2").value),
            unidade: Number(document.querySelector("#unidade-vrb2").value),
            exp: document.querySelector("#vrb2").value
        },
        Vce: {
            element: document.querySelector("#vce"),
            modulo: Number(document.querySelector("#vce").value),
            unidade: Number(document.querySelector("#unidade-vce").value),
            exp: document.querySelector("#vce").value
        },
        Vcb: {
            element: document.querySelector("#vcb"),
            modulo: Number(document.querySelector("#vcb").value),
            unidade: Number(document.querySelector("#unidade-vcb").value),
            exp: document.querySelector("#vcb").value
        },
        Vre: {
            element: document.querySelector("#vre"),
            modulo: Number(document.querySelector("#vre").value),
            unidade: Number(document.querySelector("#unidade-vre").value),
            exp: document.querySelector("#vre").value
        },
    }
    
    correntes = {
        I: {
            element: document.querySelector("#i"),
            modulo: Number(document.querySelector("#i").value),
            unidade: Number(document.querySelector("#unidade-i").value),
            exp: document.querySelector("#i").value
        },
        Ic: {
            element: document.querySelector("#ic"),
            modulo: Number(document.querySelector("#ic").value),
            unidade: Number(document.querySelector("#unidade-ic").value),
            exp: document.querySelector("#ic").value
        },
        Ie: {
            element: document.querySelector("#ie"),
            modulo: Number(document.querySelector("#ie").value),
            unidade: Number(document.querySelector("#unidade-ie").value),
            exp: document.querySelector("#ie").value
        },
        Ib: {
            element: document.querySelector("#ib"),
            modulo: Number(document.querySelector("#ib").value),
            unidade: Number(document.querySelector("#unidade-ib").value),
            exp: document.querySelector("#ib").value
        },
        Ib1: {
            element: document.querySelector("#ib1"),
            modulo: Number(document.querySelector("#ib1").value),
            unidade: Number(document.querySelector("#unidade-ib1").value),
            exp: document.querySelector("#ib1").value
        },
        Ib2: {
            element: document.querySelector("#ib2"),
            modulo: Number(document.querySelector("#ib2").value),
            unidade: Number(document.querySelector("#unidade-ib2").value),
            exp: document.querySelector("#ib2").value
        },
    }
    
    resistores = {    
        Rc: {
            element: document.querySelector("#rc"),
            modulo: Number(document.querySelector("#rc").value),
            unidade: Number(document.querySelector("#unidade-rc").value),
            exp: document.querySelector("#rc").value
        },
        Re:{
            element: document.querySelector("#re"),
            modulo: Number(document.querySelector("#re").value),
            unidade: Number(document.querySelector("#unidade-re").value),
            exp: document.querySelector("#re").value
        },
        Rb1: {
            element: document.querySelector("#rb1"),
            modulo: Number(document.querySelector("#rb1").value),
            unidade: Number(document.querySelector("#unidade-rb1").value),
            exp: document.querySelector("#rb1").value
        },
        Rb2: {
            element: document.querySelector("#rb2"),
            modulo: Number(document.querySelector("#rb2").value),
            unidade: Number(document.querySelector("#unidade-rb2").value),
            exp: document.querySelector("#rb2").value
        },
    }

    potencias = {    
        Pc: {
            element: document.querySelector("#pc"),
            modulo: Number(document.querySelector("#pc").value),
            unidade: Number(document.querySelector("#unidade-pc").value),
            exp: document.querySelector("#pc").value
        },
        Pe:{
            element: document.querySelector("#pe"),
            modulo: Number(document.querySelector("#pe").value),
            unidade: Number(document.querySelector("#unidade-pe").value),
            exp: document.querySelector("#pe").value
        },
        Pb1: {
            element: document.querySelector("#pb1"),
            modulo: Number(document.querySelector("#pb1").value),
            unidade: Number(document.querySelector("#unidade-pb1").value),
            exp: document.querySelector("#pb1").value
        },
        Pb2: {
            element: document.querySelector("#pb2"),
            modulo: Number(document.querySelector("#pb2").value),
            unidade: Number(document.querySelector("#unidade-pb2").value),
            exp: document.querySelector("#pb2").value
        },
    }
}

var animaTransistor = new AnimationController(document.querySelector("#transistor"), transistorFrames);

var tipoExercicio = 0;
/**
 * @description
 * Muda os inputs para poder habilitar o uso de texto e simbolo, além dos números, para uso em expressões
 * @param {HTMLElement} input 
 */
var usarExpressoes = (input) =>{
    var grandezas = document.getElementsByClassName("grandeza");
    for(key in grandezas){
        if(key < 23){
            let grandeza = grandezas[key].children[1];
            //console.log(grandeza);
            //console.log(input.checked);
            if(input.checked)
                grandeza.type = "text";
            else
                grandeza.type = "number";
        }
        
    }
}
/**
 * @description
 * Corrige os valores dos inputs de acordo com a unidade de medida
 * @param {HTMLElement} input 
 */
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
        case 'P':
            unidadeAnterior = potencias[idJson].unidade;
            coletarDados();
            unidadeDestino = potencias[idJson].unidade - unidadeAnterior;
            potencias[idJson].element.value = (potencias[idJson].modulo * Math.pow(10, (-1)*unidadeDestino)).toFixed(9); 
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
/**
 * Esconde os inputs de acordo com o tipo de questão
 */
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

            potencias.Pc.element.parentNode.hidden = true;
            potencias.Pb1.element.parentNode.hidden = true;         
            potencias.Pe.element.parentNode.hidden = true;
            potencias.Pb2.element.parentNode.hidden = true;
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

            potencias.Pc.element.parentNode.hidden = true;
            potencias.Pb1.element.parentNode.hidden = true;         
            potencias.Pe.element.parentNode.hidden = true;
            potencias.Pb2.element.parentNode.hidden = true;
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

            potencias.Pc.element.parentNode.hidden = false;
            potencias.Pb1.element.parentNode.hidden = false;         
            potencias.Pe.element.parentNode.hidden = true;
            potencias.Pb2.element.parentNode.hidden = true;
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

            potencias.Pc.element.parentNode.hidden = false;
            potencias.Pb1.element.parentNode.hidden = false;         
            potencias.Pe.element.parentNode.hidden = false;
            potencias.Pb2.element.parentNode.hidden = true;
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

            potencias.Pc.element.parentNode.hidden = false;
            potencias.Pb1.element.parentNode.hidden = false;         
            potencias.Pe.element.parentNode.hidden = false;
            potencias.Pb2.element.parentNode.hidden = false;
        break;
    }
}
/**
 * @description
 * Identifica que a grandeza está zerada, e tenta resolver com várias tentativas de resolução
 */
var identificarResolverEquacoes = () =>{
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
            //Potencias
            ts.push(tensoes.Vrb1.modulo != 0? [ potencias.Pb1.modulo/tensoes.Vrb1.modulo , `Ib = Pb1/Vrb1 = ${potencias.Pb1.modulo}/${tensoes.Vrb1.modulo}`]: [0, ""]);
            ts.push(resistores.Rb1.modulo != 0? [Math.sqrt(potencias.Pb1.modulo / resistores.Rb1.modulo), `Ib = √(Pb1/Rb1) = √(${potencias.Pb1.modulo}/${resistores.Rb1.modulo})`]: [0, ""]);
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

        //Potencias
        ts.push(tensoes.Vrb1.modulo != 0? [ potencias.Pb1.modulo/tensoes.Vrb1.modulo , `Ib1 = Pb1/Vrb1 = ${potencias.Pb1.modulo}/${tensoes.Vrb1.modulo}`]: [0, ""]);
        ts.push(resistores.Rb1.modulo != 0? [Math.sqrt(potencias.Pb1.modulo / resistores.Rb1.modulo), `Ib1 = √(Pb1/Rb1) = √(${potencias.Pb1.modulo}/${resistores.Rb1.modulo})`]: [0, ""]);

        ts.push(correntes.Ib.modulo != 0 && correntes.Ib2.modulo != 0 ? [correntes.Ib.modulo + correntes.Ib2.modulo , `Ib1 = Ib+Ib2 = ${correntes.Ib.modulo} + ${correntes.Ib2.modulo}`]: [0, ""]);
        ts.push(resistores.Rb1.modulo != 0? [tensoes.Vrb1.modulo / resistores.Rb1.modulo , `Ib1 = Vrb1/Rb1 = ${tensoes.Vrb1.modulo}/${resistores.Rb1.modulo}`]: [0, ""]);
        correntes.Ib1.modulo = verificarTentativas(ts, correntes.Ib1.element);
    }

    if(correntes.Ib2.modulo == 0 && outrosDados.tipoExercicio.value == 4){
        let ts = [];
        //Potencias
        ts.push(tensoes.Vrb2.modulo != 0? [ potencias.Pb2.modulo/tensoes.Vrb2.modulo , `Ib2 = Pb2/Vrb2 = ${potencias.Pb2.modulo}/${tensoes.Vrb2.modulo}`]: [0, ""]);
        ts.push(resistores.Rb2.modulo != 0? [Math.sqrt(potencias.Pb2.modulo / resistores.Rb2.modulo), `Ib2 = √(Pb2/Rb2) = √(${potencias.Pb2.modulo}/${resistores.Rb2.modulo})`]: [0, ""]);
        //apenas corrente e constantes
        //ts.push([10 * correntes.Ib.modulo, `Ib2 = 10*Ib = 10*${correntes.Ib.modulo}`]);
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
        if(outrosDados.tipoExercicio.value > 1){
            ts.push(resistores.Rc.modulo != 0? [tensoes.Vrc.modulo / resistores.Rc.modulo , `Ic = Vrc/Rc = ${tensoes.Vrc.modulo}/${resistores.Rc.modulo}`]: [0, ""]);
            //Potencias
            ts.push(tensoes.Vrc.modulo != 0? [ potencias.Pc.modulo/tensoes.Vrc.modulo , `Ic = Pc/Vrc = ${potencias.Pc.modulo}/${tensoes.Vrc.modulo}`]: [0, ""]);
            ts.push(resistores.Rc.modulo != 0? [Math.sqrt(potencias.Pc.modulo / resistores.Rc.modulo), `Ic = √(Pc/Rc) = √(${potencias.Pc.modulo}/${resistores.Rc.modulo})`]: [0, ""]);
        }
            
        correntes.Ic.modulo = verificarTentativas(ts, correntes.Ic.element);
    }

    if(correntes.Ie.modulo == 0){
        let ts = [];
        //apenas corrente e constantes
        if(outrosDados.tipoExercicio.value != 4)
            ts.push([correntes.I.modulo, `Ie = I = ${correntes.I.modulo}`]);
        else
            ts.push(correntes.I.modulo != 0 && correntes.Ib2.modulo != 0 ? [correntes.I.modulo - correntes.Ib2.modulo , `Ie = I-Ib2 = ${correntes.I.modulo} - ${correntes.Ib2.modulo}`]: [0, ""]);
        ts.push(correntes.Ic.modulo!= 0 && correntes.Ib.modulo!= 0 ?[correntes.Ic.modulo + correntes.Ib.modulo, `Ie = Ic+Ib = ${correntes.Ic.modulo} + ${correntes.Ib.modulo}`]:0);
        ts.push(outrosDados.alfa.modulo != 0 ? [correntes.Ic.modulo/outrosDados.alfa.modulo, `Ie = Ic/α = ${correntes.Ic.modulo}/${outrosDados.alfa.modulo}`]: [0, ""]);
        //tensoes e resistencias
        if(outrosDados.tipoExercicio.value > 1){
            ts.push(resistores.Re.modulo != 0? [tensoes.Vre.modulo / resistores.Re.modulo , `Ie = Vre/Re = ${tensoes.Vre.modulo}/${resistores.Re.modulo}`]: [0, ""]);
            //Potencias
            ts.push(tensoes.Vre.modulo != 0? [ potencias.Pe.modulo/tensoes.Vre.modulo , `Ie = Pe/Vre = ${potencias.Pe.modulo}/${tensoes.Vre.modulo}`]: [0, ""]);
            ts.push(resistores.Re.modulo != 0? [Math.sqrt(potencias.Pe.modulo / resistores.Re.modulo), `Ie = √(Pe/Re) = √(${potencias.Pe.modulo}/${resistores.Re.modulo})`]: [0, ""]);
        }
            
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

        //Potencias
        ts.push(correntes.Ib2.modulo != 0? [ potencias.Pb2.modulo/correntes.Ib2.modulo , `Vrb2 = Pb2/Ib2 = ${potencias.Pb2.modulo}/${correntes.Ib2.modulo}`]: [0, ""]);
        ts.push([Math.sqrt(potencias.Pb2.modulo * resistores.Rb2.modulo), `Ib2 = √(Pb2*Rb2) = √(${potencias.Pb2.modulo}*${resistores.Rb2.modulo})`]);

        if(tensoes.Vce.modulo != 0 && ((tensoes.Vre.modulo != 0 && outrosDados.tipoExercicio.value >= 3) || (outrosDados.tipoExercicio.value < 3)))
            ts.push([tensoes.Vcc.modulo - tensoes.Vce.modulo - tensoes.Vre.modulo, `Vrc = Vcc-Vce-Vre = ${tensoes.Vcc.modulo} - ${tensoes.Vce.modulo} - ${tensoes.Vre.modulo}`]);
        tensoes.Vrc.modulo = verificarTentativas(ts, tensoes.Vrc.element);
    }

    if(tensoes.Vre.modulo == 0  && outrosDados.tipoExercicio.value > 2){
        let ts = [];
        ts.push([resistores.Re.modulo * correntes.Ie.modulo, `Vre = Re*Ie = ${resistores.Re.modulo} * ${correntes.Ie.modulo}`]);

        //Potencias
        ts.push(correntes.Ie.modulo != 0? [ potencias.Pe.modulo/correntes.Ie.modulo , `Vre = Pe/Ie = ${potencias.Pe.modulo}/${correntes.Ie.modulo}`]: [0, ""]);
        ts.push([Math.sqrt(potencias.Pe.modulo * resistores.Re.modulo), `Ie = √(Pe*Re) = √(${potencias.Pe.modulo}*${resistores.Re.modulo})`]);

        ts.push(tensoes.Vce.modulo != 0 && tensoes.Vrc.modulo != 0 ? 
            [tensoes.Vcc.modulo - tensoes.Vce.modulo - tensoes.Vrc.modulo, 
            `Vre = Vcc-Vce-Vrc = ${tensoes.Vcc.modulo} - ${tensoes.Vce.modulo} - ${tensoes.Vrc.modulo}`]: [0, ""]);

        tensoes.Vre.modulo = verificarTentativas(ts, tensoes.Vre.element);
    }

    if(tensoes.Vrb1.modulo == 0 && outrosDados.tipoExercicio.value > 1){
        let ts = [];
        if(outrosDados.tipoExercicio.value < 4){
            ts.push([resistores.Rb1.modulo * correntes.Ib.modulo, `Vrb1 = Rb1*Ib = ${resistores.Rb1.modulo} * ${correntes.Ib.modulo}`]);
            //Potencias
            ts.push(correntes.Ib.modulo != 0? [ potencias.Pb1.modulo/correntes.Ib.modulo , `Vrb = Pb1/Ib = ${potencias.Pb1.modulo}/${correntes.Ib.modulo}`]: [0, ""]);
            ts.push([Math.sqrt(potencias.Pb1.modulo * resistores.Rb1.modulo), `Ib = √(Pb*Rb) = √(${potencias.Pb1.modulo}*${resistores.Rb1.modulo})`]);
        }            
        else{
            ts.push([resistores.Rb1.modulo * correntes.Ib1.modulo, `Vrb1 = Rb1*Ib1 = ${resistores.Rb1.modulo} * ${correntes.Ib1.modulo}`]);
            ts.push(tensoes.Vrb2.modulo != 0 ? [tensoes.Vcc.modulo - tensoes.Vrb2.modulo, `Vrb1 = Vcc-Vrb2 = ${tensoes.Vcc.modulo} - ${tensoes.Vrb2.modulo}`]: [0, ""]);
            //Potencias
            ts.push(correntes.Ib1.modulo != 0? [ potencias.Pb1.modulo/correntes.Ib1.modulo , `Vrb1 = Pb1/Ib1 = ${potencias.Pb1.modulo}/${correntes.Ib1.modulo}`]: [0, ""]);
            ts.push([Math.sqrt(potencias.Pb1.modulo * resistores.Rb1.modulo), `Ib1 = √(Pb1*Rb1) = √(${potencias.Pb1.modulo}*${resistores.Rb1.modulo})`]);
        }
            
        if(tensoes.Vbe.modulo != 0 && ((tensoes.Vre.modulo != 0 && outrosDados.tipoExercicio.value >= 3) || (outrosDados.tipoExercicio.value < 3)))
            ts.push([tensoes.Vcc.modulo - tensoes.Vbe.modulo - tensoes.Vre.modulo, `Vrb1 = Vcc-Vbe-Vre = ${tensoes.Vcc.modulo} - ${tensoes.Vbe.modulo} - ${tensoes.Vre.modulo}`]);
        tensoes.Vrb1.modulo = verificarTentativas(ts, tensoes.Vrb1.element);
    }
    if(tensoes.Vrb2.modulo == 0 && outrosDados.tipoExercicio.value > 3){
        let ts = [];
        ts.push([resistores.Rb2.modulo * correntes.Ib2.modulo, `Vrb2 = Rb2*Ib2 = ${resistores.Rb2.modulo} * ${correntes.Ib2.modulo}`]);

        //Potencias
        ts.push(correntes.Ib2.modulo != 0? [ potencias.Pb2.modulo/correntes.Ib2.modulo , `Vrb2 = Pb2/Ib2 = ${potencias.Pb2.modulo}/${correntes.Ib2.modulo}`]: [0, ""]);
        ts.push([Math.sqrt(potencias.Pb2.modulo * resistores.Rb2.modulo), `Ib2 = √(Pb2*Rb2) = √(${potencias.Pb2.modulo}*${resistores.Rb2.modulo})`]);

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
        ts.push(tensoes.Vcb.modulo != 0 && tensoes.Vce.modulo != 0? [tensoes.Vce.modulo  - tensoes.Vcb.modulo, `Vbe = Vce-Vcb = ${tensoes.Vce.modulo} - ${tensoes.Vcb.modulo}`]: [0, ""]);
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

        //Potencias
        ts.push(correntes.Ic.modulo != 0? [ potencias.Pc.modulo/Math.pow(correntes.Ic.modulo,2) , `Rc = Pc/Ic² = ${potencias.Pc.modulo}/${correntes.Ic.modulo}²`]: [0, ""]);
        ts.push(potencias.Pc.modulo != 0? [ Math.pow(tensoes.Vrc.modulo,2)/potencias.Pc.modulo , `Rc = Vrc²/Pc = ${tensoes.Vrc.modulo}²/${potencias.Pc.modulo}`]: [0, ""]);

        resistores.Rc.modulo = verificarTentativas(ts, resistores.Rc.element);
    }
    if(resistores.Re.modulo == 0){
        let ts = [];
        ts.push(correntes.Ic.modulo != 0 ? [tensoes.Vre.modulo/correntes.Ie.modulo , `Re = Vre/Ie = ${tensoes.Vre.modulo}/${correntes.Ie.modulo}`]: [0, ""]);

        //Potencias
        ts.push(correntes.Ie.modulo != 0? [ potencias.Pe.modulo/Math.pow(correntes.Ie.modulo,2) , `Re = Pe/Ie² = ${potencias.Pe.modulo}/${correntes.Ie.modulo}²`]: [0, ""]);
        ts.push(potencias.Pe.modulo != 0? [ Math.pow(tensoes.Vre.modulo,2)/potencias.Pe.modulo , `Re = Vre²/Pe = ${tensoes.Vre.modulo}²/${potencias.Pe.modulo}`]: [0, ""]);

        resistores.Re.modulo = verificarTentativas(ts, resistores.Re.element);
    }
    if(resistores.Rb1.modulo == 0){
        let ts = [];
        if(outrosDados.tipoExercicio.value < 4){
            ts.push(correntes.Ib.modulo != 0 ? [tensoes.Vrb1.modulo/correntes.Ib.modulo , `Rb1 = Vrb1/Ib = ${tensoes.Vrb1.modulo}/${correntes.Ib.modulo}`]: [0, ""]); 
            //Potencias
            ts.push(correntes.Ib.modulo != 0? [ potencias.Pb1.modulo/Math.pow(correntes.Ib.modulo,2) , `Rb = Pb/Ib² = ${potencias.Pb1.modulo}/${correntes.Ib.modulo}²`]: [0, ""]);
            ts.push(potencias.Pb1.modulo != 0? [ Math.pow(tensoes.Vrb1.modulo,2)/potencias.Pb1.modulo , `Rb = Vrb²/Pb = ${tensoes.Vrb1.modulo}²/${potencias.Pb1.modulo}`]: [0, ""]);           
        }
        else{
            ts.push(correntes.Ib1.modulo != 0 ? [tensoes.Vrb1.modulo/correntes.Ib1.modulo , `Rb1 = Vrb1/Ib1 = ${tensoes.Vrb1.modulo}/${correntes.Ib1.modulo}`]: [0, ""]);   
            //Potencias
            ts.push(correntes.Ib1.modulo != 0? [ potencias.Pb1.modulo/Math.pow(correntes.Ib1.modulo,2) , `Rb1 = Pb1/Ib1² = ${potencias.Pb1.modulo}/${correntes.Ib1.modulo}²`]: [0, ""]);
            ts.push(potencias.Pb1.modulo != 0? [ Math.pow(tensoes.Vrb1.modulo,2)/potencias.Pb1.modulo , `Rb1 = Vrb1²/Pb1 = ${tensoes.Vrb1.modulo}²/${potencias.Pb1.modulo}`]: [0, ""]);         
        }

        resistores.Rb1.modulo = verificarTentativas(ts, resistores.Rb1.element);
    }
    if(resistores.Rb2.modulo == 0){
        let ts = [];
        ts.push(correntes.Ib2.modulo != 0 ? [tensoes.Vrb2.modulo/correntes.Ib2.modulo , `Rb2 = Vrb2/Ib2 = ${tensoes.Vrb2.modulo}/${correntes.Ib2.modulo}`]: [0, ""]);
        //Potencias
        ts.push(correntes.Ib2.modulo != 0? [ potencias.Pb2.modulo/Math.pow(correntes.Ib2.modulo,2) , `Rb2 = Pb2/Ib2² = ${potencias.Pb2.modulo}/${correntes.Ib2.modulo}²`]: [0, ""]);
        ts.push(potencias.Pb2.modulo != 0? [ Math.pow(tensoes.Vrb2.modulo,2)/potencias.Pb2.modulo , `Rb2 = Vrb2²/Pb2 = ${tensoes.Vrb2.modulo}²/${potencias.Pb2.modulo}`]: [0, ""]);
        resistores.Rb2.modulo = verificarTentativas(ts, resistores.Rb2.element);
    }
    //potencias
    if(potencias.Pc.modulo == 0){
        let ts = [];
        ts.push([ tensoes.Vrc.modulo*correntes.Ic.modulo , `Pc = Vrc*Ic = ${tensoes.Vrc.modulo}*${correntes.Ic.modulo}`]);
        ts.push([ resistores.Rc*Math.pow(correntes.Ic.modulo,2) , `Pc = Rc*Ic² = ${resistores.Rc.modulo}*${correntes.Ic.modulo}²`]);
        ts.push(resistores.Rc.modulo != 0? [ Math.pow(tensoes.Vrc.modulo,2)/resistores.Rc.modulo , `Pc = Vrc²/Rc = ${tensoes.Vrc.modulo}/${resistores.Rc.modulo}`]: [0, ""]);
        potencias.Pc.modulo = verificarTentativas(ts, potencias.Pc.element);
    }
    if(potencias.Pe.modulo == 0){
        let ts = [];
        ts.push([ tensoes.Vre.modulo*correntes.Ie.modulo , `Pe = Vre*Ie = ${tensoes.Vre.modulo}*${correntes.Ie.modulo}`]);
        ts.push([ resistores.Re*Math.pow(correntes.Ie.modulo,2) , `Pe = Re*Ie² = ${resistores.Re.modulo}*${correntes.Ie.modulo}²`]);
        ts.push(resistores.Re.modulo != 0? [ Math.pow(tensoes.Vre.modulo,2)/resistores.Re.modulo , `Pe = Vre²/Re = ${tensoes.Vre.modulo}/${resistores.Re.modulo}`]: [0, ""]);
        potencias.Pe.modulo = verificarTentativas(ts, potencias.Pe.element);
    }
    if(potencias.Pb1.modulo == 0){
        let ts = [];
        if(outrosDados.tipoExercicio.value < 4){
            ts.push([ tensoes.Vrb1.modulo*correntes.Ib.modulo , `Pb = Vrb*Ib = ${tensoes.Vrb1.modulo}*${correntes.Ib.modulo}`]);
            ts.push([ resistores.Rb*Math.pow(correntes.Ib.modulo,2) , `Pb = Rb*Ib² = ${resistores.Rb1.modulo}*${correntes.Ib.modulo}²`]);
            ts.push(resistores.Rb1.modulo != 0? [ Math.pow(tensoes.Vrb1.modulo,2)/resistores.Rb1.modulo , `Pb = Vrb²/Rb = ${tensoes.Vrb1.modulo}/${resistores.Rb1.modulo}`]: [0, ""]);
        }
        else{
            ts.push([ tensoes.Vrb1.modulo*correntes.Ib1.modulo , `Pb1 = Vrb1*Ib1 = ${tensoes.Vrb1.modulo}*${correntes.Ib1.modulo}`]);
            ts.push([ resistores.Rb1*Math.pow(correntes.Ib1.modulo,2) , `Pb1 = Rb1*Ib1² = ${resistores.Rb1.modulo}*${correntes.Ib1.modulo}²`]);
            ts.push(resistores.Rb1.modulo != 0? [ Math.pow(tensoes.Vrb1.modulo,2)/resistores.Rb1.modulo , `Pb1 = Vrb1²/Rb1 = ${tensoes.Vrb1.modulo}/${resistores.Rb1.modulo}`]: [0, ""]);
        }
    
        potencias.Pb1.modulo = verificarTentativas(ts, potencias.Pb1.element);
    }
    if(potencias.Pb2.modulo == 0){
        let ts = [];
        ts.push([ tensoes.Vrb2.modulo*correntes.Ib2.modulo , `Pb2 = Vrb2*Ib2 = ${tensoes.Vrb2.modulo}*${correntes.Ib2.modulo}`]);
        ts.push([ resistores.Rb2*Math.pow(correntes.Ib2.modulo,2) , `Pb2 = Rb2*Ib2² = ${resistores.Rb2.modulo}*${correntes.Ib2.modulo}²`]);
        ts.push(resistores.Rb2.modulo != 0? [ Math.pow(tensoes.Vrb2.modulo,2)/resistores.Rb2.modulo , `Pb2 = Vrb2²/Rb2 = ${tensoes.Vrb2.modulo}/${resistores.Rb2.modulo}`]: [0, ""]);
        potencias.Pb2.modulo = verificarTentativas(ts, potencias.Pb2.element);
    }
}
/**
 * @description
 * Limpa todos os inputs preenchidos para o estado padrão
 */
var limparCampos = () =>{
    outrosDados.alfa.modulo = 0;
    outrosDados.alfa.element.value = 0;
    outrosDados.beta.modulo = 0;
    outrosDados.beta.element.value = 0;
    for(key in document.getElementsByClassName("unidade")){
        let unidade = document.getElementsByClassName("unidade")[key];
        if(key < 18){
            unidade.value = 0;
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
    for(let i = 20; i < 24; i++){
        potencias[grandeza[i]].modulo = 0;
        potencias[grandeza[i]].element.value = 0;
    }
}
/**
 * @description
 * Converte as unidades
 */
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
    for(let i = 20; i < 24; i++){
        potencias[grandeza[i]].modulo = potencias[grandeza[i]].modulo * Math.pow(10, potencias[grandeza[i]].unidade);
    }
}
/**
 * 
 * @param {array} tentativas 
 * @param {HTMLElement} elemento
 * @description
 * Verificar todas as tentativas de equações, quando são vázias quer dizer que não houve nenhuma possibilidade de encontrar respostas para a incognita 
 */
var verificarTentativas = (tentativas, elemento) =>{
    
    for(key in tentativas){
        if(tentativas[key][0] > 0){
            elemento.value = Number(tentativas[key][0].toFixed(9));
            document.querySelector("#formulario").innerHTML += `<li>${tentativas[key][1]} = ${tentativas[key][0].toFixed(9)}</li>`;
            return tentativas[key][0];
        }
    }
    return 0;
}
/**
 * @description
 * Executa várias vezes os identificadores e resolvedores de equação para tentar responder as incognitas
 */
var calcular = () =>{
    location.href = "#transistor";
    document.querySelector("#formulario").innerHTML = "";
    converterUnidades();
    //tenta refazer o processo de visualização de variaveis e equações
    for(let j = 0; j< 3; j++){
        for(let i = 0; i< 10; i++){
            identificarResolverEquacoes();
        }
        //verificação das expressoes que ainda estão vazias, e tentativa de responder lacunas com base em expressões matemáticas
        for(let i = 0; i< 2; i++){
            for(let i = 0; i < 8; i++){
                if(isNaN(tensoes[grandeza[i]].modulo)){
                    tensoes[grandeza[i]].modulo = realizarExpressao(tensoes[grandeza[i]].element);
                }
            }
            for(let i = 8; i < 14; i++){
                if(isNaN(correntes[grandeza[i]].modulo)){
                    correntes[grandeza[i]].modulo = realizarExpressao(correntes[grandeza[i]].element);
                }
            }
            for(let i = 14; i < 18; i++){
                if(isNaN(resistores[grandeza[i]].modulo)){
                    resistores[grandeza[i]].modulo = realizarExpressao(resistores[grandeza[i]].element);
                }
            }
            for(let i = 18; i < 20; i++){
                if(isNaN(outrosDados[grandeza[i]].modulo)){
                    outrosDados[grandeza[i]].modulo = realizarExpressao(outrosDados[grandeza[i]].element);
                }
            }
            for(let i = 20; i < 24; i++){
                if(isNaN(potencias[grandeza[i]].modulo)){
                    potencias[grandeza[i]].modulo = realizarExpressao(potencias[grandeza[i]].element);
                }
            }
        }  
    }  
}   


var start = () =>{
    animaTransistor.animacao(0);
    esconderInputs();
    limparCampos();
}
var loop = () =>{
    coletarDados();
}

var loopAnimacao = () =>{
    animaTransistor.animacao(outrosDados.tipoExercicio.value);
}



//Ouvintes e eventos
setInterval(loop, 10);
setInterval(loopAnimacao, 200);

setTimeout(() => {
    window.addEventListener("load", start);
}, 11);

document.querySelector("#calcular").addEventListener("click", calcular);
document.querySelector("#tipo").addEventListener("change", esconderInputs);
document.querySelector("#modoCalculo").addEventListener("change", input => usarExpressoes(input.srcElement));

for(key in document.getElementsByClassName("unidade")){
    let value = document.getElementsByClassName("unidade")[key];
    if(key < 18){
        value.addEventListener("change", input =>{
            corrigirInput(input.srcElement);
        })
    }
}

var inputs = document.querySelectorAll("input");
for(let i = 1; i < inputs.length; i++){
    inputs[i].addEventListener('change', () =>{
        inputs[i].value = inputs[i].value.split(",").join("."); 
    })
}
