let fs = require('fs');
//let request = require('request');

module.exports = {
    echo: function(arg, print){
        print(arg.join(" "));
    },
    date: function(arg, print){
        print(Date())
    },
    ls: function(arg, print){
        fs.readdir('.', function(err, files){
            if(err) throw err;
            print(files.join('\n'));
        })
    },
    pwd: function(arg, print){      //pwd es en donde estoy parada. PRINT WORKING DIRECTORY
        print(process.cwd());
    }, 
    cat: function(arg, print){
        fs.readFile(arg[0], 'utf8', function(err, data){
            if(err) throw err;
            print(data);
        })
    },
    head: function(arg, print){
        fs.readFile(arg[0], 'uft8', function(err, data){
            if(err) throw err;
            print(data.split('\n').splice(0, arg[1]).join('\n'));

        })
    },
    tail: function(arg, print){
        fs.readFile(arg[0], 'uft8', function(err, data){
            if(err) throw err;
            print(data.split('\n').splice(-arg[1]).join('\n'))
        })
    },
    curl: function(arg, print){
        request(arg[0], function(err, data){
            if(err) throw err;
            print(data.body);
        })
    }
}