$( function() {

  // configura o contexto de áudio
  var context = new AudioContext();
  window.context = context;

  // variável que vai representar o oscilador
  var oscillator;

  // números que precisaremos depois
  var width   = $(window).width();
  var height  = $(window).height();
  var xValue  = 0;
  var yValue  = 0;

  // recalcule a largura e a altura se o tamanho da janela mudar
  $(window).resize( function() {
    width   = $(this).width();
    height  = $(this).height();
  });

  $('body').on('mousedown', function(e) {
    if (oscillator) {
      oscillator.stop(0);
    }
    // cria o oscilador
    oscillator = context.createOscillator();
    // define o tipo do oscilador
    oscillator.type = 'triangle'; // sine, triangle, sawtooth

    // a função mtof recebe uma nota midi como argumento e retorna a freqüência correspondente em Hertz.
    // a função mtof define a frequência com base nos valores xValue e yValue
    oscillator.frequency.value = mtof(xValue + yValue);
    // conecta-o à saída, isto é, o destino
    oscillator.connect(context.destination);
    // inicia a nota
    oscillator.start(0);
  });

  $('body').on('mouseup', function(e) {
    // para a nota quando desclica o botão do mouse (mouseup)
    oscillator.stop(0);
  });

  $('body').on('mousemove', function(e) {
    // faz algumas contas para colocar os valores em intervalos de números:
    // converte (0 <-> largura da janela) para (0 <-> 13) e arredonda a parte decimal pare baixo
    xValue = 45 + Math.floor( e.clientX / width * 13 );
    // converte (0 <-> altura da janela) para (0 <-> 4) e arredonda a parte decimal pare baixo
    yValue = Math.floor( e.clientY / height * 4 ) * 12;

    if (!oscillator) {
      return;
    }

    // versão menos precisa
    //oscillator.frequency.value = mtof(xValue + yValue);

    // versão usando setValueAtTime que é mais preciso em relação ao tempo
    oscillator.frequency.setValueAtTime( mtof(xValue + yValue), context.currentTime );
  });

});

// mtof = notas midi para Frequencias
// input: 0 - 127 (embora você pudesse subir mais se quisesse)
// output: frequencia em Hz, de ~8Hz até ~12543Hz
function mtof(note) {
  return ( Math.pow(2, ( note-69 ) / 12) ) * 440.0;
}