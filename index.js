//Usado para ler dados do teclado no console
var readline = require('readline');
var resp = "";
var leitor = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//calcula custo por petshop
function calculaCusto(petShop, quantCaesPequenos, quantCaesGrandes, diaSemana){
  if(diaSemana === 'Domingo' || diaSemana === 'Sábado'){
   return petShop.custoGrandeFinalSemana * parseInt(quantCaesGrandes) + 
      petShop.custoPequenoFinalSemana * parseInt(quantCaesPequenos);
  } 
  return petShop.custoGrandeMeioSemana * parseInt(quantCaesGrandes) + 
    petShop.custoPequenoMeioSemana * parseInt(quantCaesPequenos);
}

//Retorna dia da semana passando uma data no formato dd/mm/yyyy
function retornaDiaSemana(date){
  const dia = date.substr(0,2);
  const mes = date.substr(3,2);
  const ano = date.substr(6,5);
  var dateObj = new Date(ano.concat('-').concat(mes).concat('-').concat(dia));

  var semana = ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"];
  return semana[dateObj.getDay() + 1 > 6 ? 0 : dateObj.getDay() + 1];
}

//De fato faz as comparações de melhor canil seguindo as especificações passadas na documentação
function pesquisaMelhorCanil(vetorPetshop, quantCaesPequenos, quantCaesGrandes, date){
  var menor = calculaCusto(vetorPetshop[0], quantCaesPequenos, quantCaesGrandes, retornaDiaSemana(date));
  var index = 0;
  for(let i=1; i< vetorPetshop.length; i = i + 1){
    if(calculaCusto(vetorPetshop[i], quantCaesPequenos, quantCaesGrandes, retornaDiaSemana(date)) < menor){
      menor = calculaCusto(vetorPetshop[i], quantCaesPequenos, quantCaesGrandes, retornaDiaSemana(date));
      index = i;
    }else if (calculaCusto(vetorPetshop[i], quantCaesPequenos, quantCaesGrandes, retornaDiaSemana(date)) === menor){
      if(vetorPetshop[i].distancia < vetorPetshop[index].distancia){
        menor = calculaCusto(vetorPetshop[i], quantCaesPequenos, quantCaesGrandes, retornaDiaSemana(date));
        index = i;
      }
    }
  }
  console.log(vetorPetshop[index].nome);
  return vetorPetshop[index].nome;
}

//Main a ser executado
function main(){
  //Lista com petshops 
  const vetorPetshop = [
    {
      nome: 'Meu Canino Feliz',
      distancia: 2,
      custoPequenoMeioSemana: 20,
      custoGrandeMeioSemana: 40,
      custoPequenoFinalSemana: 24,
      custoGrandeFinalSemana: 48
    },
    {
      nome: '​Vai Rex​',
      distancia: 1.7,
      custoPequenoMeioSemana: 15,
      custoGrandeMeioSemana: 50,
      custoPequenoFinalSemana: 20,
      custoGrandeFinalSemana: 55
    },
    {
      nome: '​ChowChawgas​',
      distancia: 0.8,
      custoPequenoMeioSemana: 30,
      custoGrandeMeioSemana: 45,
      custoPequenoFinalSemana: 30,
      custoGrandeFinalSemana: 45
    },
  ];

  //ler os dados do teclado
  leitor.question("Digite uma data, quantidade de cães grandes, a quantidade de cães pequenos:\n Exemplo: 03/08/2018 3 5\n", function(ent) {
    var entrada = ent;
    //separa a entrada em variáveis
    const date = entrada.substr(0,10);
    const quantCaesPequenos = entrada.substr(11,1);
    const quantCaesGrandes = entrada.substr(13,1);
    //Pesquisa o melhor canil
    pesquisaMelhorCanil(vetorPetshop, quantCaesPequenos, quantCaesGrandes, date);
    leitor.close();
});


}

//execução do programa
main();