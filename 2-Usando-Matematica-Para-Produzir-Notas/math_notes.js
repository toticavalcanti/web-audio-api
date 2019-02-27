$( function() {

  // pega um contexto de áudio
  var ctx = new AudioContext();

  // variável que vai representar o oscilador
  var osc;

  // números que precisaremos depois
  var width   = $(window).width();
  var height  = $(window).height();
  var x = 0;
  var y = 0;

  // recalcule a largura e a altura se o tamanho da janela mudar
  $(window).resize( function() {
    width   = $(this).width();
    height  = $(this).height();
  });

  $('body').on('mousedown', function(e) {
    if (osc) {
      osc.stop(0);
    }
    // cria o oscilador
    osc = ctx.createOscillator();
    // define o tipo do oscilador
    osc.type = 'triangle'; // sine, triangle, sawtooth

    // a função mtof recebe uma nota midi como argumento e retorna a freqüência correspondente em Hertz.
    // a função mtof define a frequência com base nos valores x e y
    osc.frequency.value = mtof(x + y);
    // conecta-o à saída, isto é, o destino
    osc.connect(ctx.destination);
    // inicia a nota
    osc.start(0);
  });

  $('body').on('mouseup', function(e) {
    // para a nota quando desclica o botão do mouse (mouseup)
    osc.stop(0);
  });

  $('body').on('mousemove', function(e) {
    // faz algumas contas para colocar os valores em intervalos de números:
    // converte (0 <-> largura da janela) para (0 <-> 13) e arredonda a parte decimal pare baixo
    x = 45 + Math.floor( e.clientX / width * 13 );
    // converte (0 <-> altura da janela) para (0 <-> 4) e arredonda a parte decimal pare baixo
    y = Math.floor( e.clientY / height * 4 ) * 12;

    if (!osc) {
      return;
    }

    // versão menos precisa
    //osc.frequency.value = mtof(x + y);

    // versão usando setValueAtTime que é mais preciso em relação ao tempo
    osc.frequency.setValueAtTime( mtof(x + y), ctx.currentTime );
  });

});

// mtof = notas midi para Frequencias
// input: 0 - 127 (embora você pudesse subir mais se quisesse)
// output: frequencia em Hz, de ~8Hz até ~12543Hz
function mtof(note) {
  return ( Math.pow(2, ( note-69 ) / 12) ) * 440.0;
}