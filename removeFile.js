const { unlink } = require('fs');

module.exports = {

    removeFile (fileName) {

        unlink(fileName, (err) => {
        if (err) {
            console.log("failed to delete local file:"+err);
        } else {
            console.log('successfully deleted local file');                                
        }
      });
    },
}
