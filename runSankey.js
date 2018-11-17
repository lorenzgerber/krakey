const { spawnSync } = require('child_process');

module.exports = {
    

    runSankey (fileName ){

        const ls = spawnSync('Rscript',['krakenSankey.R', fileName]);

    }

}


