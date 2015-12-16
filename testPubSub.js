var oraclePubSub = require('./oraclePubSub');
var async = require('async');

//Setup the pub & sub
oraclePubSub.setup();

//Use async so that both can run in parallel
//and at conclusion the end can be invoked
//so script ends gracefully
async.parallel({

    //This query is same as stored proc so that testing was easier
    query: function(callback) {
        oraclePubSub.performQuery("select first_name, last_name, email,employee_id from HR.EMPLOYEES where department_id = 60 order by last_name, first_name asc",function(data){
            callback(null,data);
        });
    }
},
/**
* Results contains array 
*/
function(err,results) {
    processQueryResults(results.query);
    oraclePubSub.end();
});


function processQueryResults(queryResults){
    var qrArray = eval(queryResults);
    qrArray.forEach(function(employee) {
        console.log(employee);
    });
    
}
