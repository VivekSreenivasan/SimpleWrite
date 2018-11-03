const fs = require('fs')
let readFileContent = function(dir,el){
	el.addEventLitener('click',function(e)){
		fs.readFile(dir,(err,data) =>{
		if (err) throw err;
		fileDir = dir;
		
		});
	}
}