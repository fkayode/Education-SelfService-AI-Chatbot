const readFile = require('fs').readFile;
const fs = require('fs')
const path = require('path');

var csv = require("csvtojson");

convert_csv_json();

function convert_csv_json() {
	input_file1 = '../data/discovery-nlu/output/Hotlines_Analyzed.csv';
    const directory = '../data/manualdocs';
	if (!fs.existsSync(directory)){
        fs.mkdirSync(directory);
    } 
	
    fs.readdir(directory, (err, files) => {
        if (err) throw err;

        for (const file of files) {
            fs.unlink(path.join(directory, file), err => {
                if (err) throw err;
            });
        }
    });
	
	csv()
	.fromFile(input_file1)
	.then((jsonObj1)=>{
	    for (let i = 0; i < jsonObj1.length; i++){
	        try {
	            fileName='../data/manualdocs/' + i +'_high.json'
	            fs.writeFileSync(fileName, JSON.stringify(jsonObj1[i]), { mode: 0o755 });
	        } catch(err) {
	            // An error occurred
	            console.error(err);
	        }
		}
		
	});	
}

