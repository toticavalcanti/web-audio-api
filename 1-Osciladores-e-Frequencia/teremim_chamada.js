var teremin = function() {

  // Instancia um contexto de Audio
  var context = new AudioContext();
  window.context = context;

  // variável que vai representar o oscilador
  var oscillator;

  // pega os elementos de botão para que possamos anexar eventos a eles
  // Note o uso do $ e do # em $('#liga'); típico do jquery.
  // Com javascript puro a chamada seria document.getElementById("liga").innerHTML;
  var noteOn  = $('#liga');
  var noteOff = $('#desliga');
  // get the x and y span elements so we can display values in them
  var x       = $('#x');
  var y       = $('#y');

  noteOn.on('click', function(e) {
    // Isso evita criar uma nova referência ao oscilador 
    // e a antiga ficar para sempre inacessível.
    if (oscillator) {
      return;
    }

    // crie o nó do oscilador
    oscillator = context.createOscillator();

    // define seu tipo
    oscillator.type = 'sine'; // sine, triangle, sawtooth, square

    // define sua frequência em Hertz
    // oscillator.frequency.value = 334;
    // conecte-o à saída
    oscillator.connect(context.destination);

    // Inicia o Teremim com zero!
    // um valor diferente de 0 nos permitirá ligar ele
    oscillator.start(0);
  });

  noteOff.on('click', function(e) {
    if(oscillator) {
      // Para o oscilador imediatamente
      oscillator.stop(0);
      // define a variável como null para que saibamos que nada está sendo reproduzido.
      oscillator = null;
    }
  });

  $('body').on('mousemove', function(e) {
    // Pega o movimento do mouse nos eixos X e Y!
    var xValue = e.clientX;
    var yValue = e.clientY;

    // dê uma olhada nos valores ao movimentar o mouse
    x.text(xValue);
    y.text(yValue);

    // se não temos um oscilador funcionando nesse momento, então, 
    // não temos nada mais a fazer aqui, apenas retornar
    if (!oscillator) {
      return;
    }

    // define a frequência para a posição x do mouse!
    oscillator.frequency.value = xValue;
  });

};

teremin();