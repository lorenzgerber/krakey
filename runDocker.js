const { spawn } = require('child_process');

module.exports = {
    

    runDocker(fileName){

        const ls = spawn('docker', ['run', '-v', '/home/lgerber/git/server/:/data/', 'lorenzgerber/krakensankey', fileName] );
        ls.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
        });

        ls.stderr.on('data', (data) => {
            console.log(`stderr: ${data}`);
        });

        ls.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
        }); 
    },

}


