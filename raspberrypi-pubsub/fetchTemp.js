const spawn = require('child_process').spawn; //call the function of child_process.spawn
const file = __dirname + '/temp.py' //define the file path

const temp = async () => { //node run in asynchronous process creation
  const p = new Promise((res, rej) => {
    // Spawn a child and read the data back
    let client = spawn('python', [file], {cwd: '/tmp'}); // spawn the child on client var
    client.stdout.on('data', (data) => { //stdout = output of the child process
       res(data.toString())  // the raw data put into the 'data'
    });

  })
  return p
}

module.exports = temp //run the node

