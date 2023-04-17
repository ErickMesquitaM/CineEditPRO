const options = []// [{season: "1 temporada", index: 4}];

module.exports = options;



// Ex: retorna um array com objetos com as opções para começar de um episodio, sê der erro em algum e cancelar os outros
// o objeto deve ter três opções:
  // "season" referente ao nome da pasta onde você quer começar por algum numero do episodio diferente
  // "numberInit" referente ao index onde deve começar, começando pelo 0

// PARA QUE SERVE ISSO? PARA QUE SÊ VOCÊ COMEÇOU A ORGANIZAR UMA SERIE E DEU ERRO EM ALGUM EPISODIO, E PAROU POR ALI, 
// POREM QUANDO VOLTAR ELE VAI COMEÇAR DO PRIMEIRO, MAS SÊ JA TENHA FEITO 15 POR EXEMPLO, E SE VOCE REMOVER ESSES 15 QUE JA 
// FORAM FINALIZADOS,O SISTEMA VAI NUMERAR OS PROXIMOS TUDO DE NOVO, OU SEJA, VAI FICAR ASSIM "01 - NOME DO EPISODIO 15"