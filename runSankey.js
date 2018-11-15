const { spawn } = require('child_process');

module.exports = {
    

    runSankey (fileName){

        const ls = spawn('Rscript', ['krakenSankey.R', fileName] );
        ls.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
        });

        ls.stderr.on('data', (data) => {
            console.log(`stderr: ${data}`);
        });

        ls.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
        }); 
    }

}


