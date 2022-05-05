const commands = require('./commands/index')

const print = function(Output){
    process.stdout.write(Output);
    process.stdout.write('\nprompt > ');
}
// Output un prompt
process.stdout.write('prompt > ');
// El evento stdin 'data' se dispara cuando el user escribe una línea
process.stdin.on('data', function (data) {

  let arg = data.toString().trim().split(" "); // 
  
  let cmd = arg.shift();    //guarda en cmd el primer elemento siendo este el comando
  
 if(commands[cmd]){
    commands[cmd](arg, print);
 } else {
    process.stdout.write('Command not found');
 }

  process.stdout.write('\nprompt > ');
});