//Só pra exemplificar no console

// faz algumas contas para colocar os valores em intervalos de números:
// converte (0 <-> largura da janela) para (0 <-> 13) e arredonda a parte decimal pare baixo

width   = $(this).width();
height  = $(this).height();

function calc_x_pos(x){
	var x_position = 45 + Math.floor( x/ width * 13 );
	return x_position
}

function calc_y_pos(y){
	y_position = Math.floor( y / height * 4 ) * 12;
	return y_position
}

function mtof(note) {
  return ( Math.pow(2, ( note-69 ) / 12) ) * 440.0;
}

//chamada da mtof
mtof(x + y)

//Para verificar a frequência no console
//Pega a "fôrma" do contexto de áudio
AudioContext = window.AudioContext || window.webkitAudioContext;

context = new AudioContext();

oscillator = context.createOscillator();

//Cria um nó para o gain (ganho ou volume)
const gain = context.createGain();

//Conecta o gain node ao oscillator
oscillator.connect(gain);

//Conecta o gain node ao destination
gain.connect(context.destination);

//Define a frequência
oscillator.frequency.value = 110;

oscillator.start(0);

//Silencia
gain.gain.value = 0;

//Voltar o som
gain.gain.value = 1;