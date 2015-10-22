var db;
var dbName = "bajaj_ticl.db";
var DBHandler = {
	initDatabase: function(){
        console.log('initDatabase function');
		db = window.sqlitePlugin.openDatabase({
			name: dbName,
			createFromLocation: 1
		});
        console.log('db');
 
		// db.transaction(function(tx){
		// 	 console.log('transaction');
		// 	tx.executeSql('CREATE TABLE IF NOT EXISTS trip ("tripno" INTEGER PRIMARY KEY, "created_date" DATETIME, "modified_date"  DATETIME, "truckno" VARCHAR)');
		// 	tx.executeSql('CREATE TABLE IF NOT EXISTS invoice ("invoiceno" INTEGER PRIMARY KEY, "plant" VARCHAR, "created_date" DATETIME, "billqty" DOUBLE, "tripno" INTEGER)');
		// });
        db.transaction(function(tx){
             console.log('transaction');
            tx.executeSql('CREATE TABLE IF NOT EXISTS trip ("tripno" INTEGER PRIMARY KEY, "created_date" DATETIME, "modified_date"  DATETIME, "truckno" VARCHAR)');
            tx.executeSql('CREATE TABLE IF NOT EXISTS invoice ("invoiceno" INTEGER PRIMARY KEY, "plant" VARCHAR, "created_date" DATETIME, "billqty" DOUBLE, "tripno" INTEGER)');
        },function(err){
            console.log(err);
        });

	},

	isExists: function(table, callback){
		db.transaction(function(tx){
			tx.executeSql(
				"SELECT count(*) as count FROM sqlite_master WHERE type='table' AND name '" + table + "'", [],
				function(tx, result){
					callback(result);
				}, onError);

		});
	},
	
	createTable: function(table, columns, callback) {
        db.transaction(function(tx) {
            tx.executeSql("CREATE TABLE " + table + " (" + columns + ")", [],
                function(tx, result) {
                    //  console.log("=====created table :" + table);
                    callback(result);
                }, onError);
        });
    },

	addNewRecord: function(table, columns, values, callback){

		var _columns = columns.join(",");
        db.transaction(function(tx) {
            tx.executeSql("INSERT INTO " + table + " (" + _columns + ") VALUES (" + getValuePlaceHolder(_columns) + ")",
                values,
                function(tx, result) {
                    // console.log("insertID", result.insertId,
                    //      "rows affected", result.rowsAffected);
                    callback(result);
                }, onError);
        });

	},

	getAllRecords: function(table, callback) {
        db.transaction(function(tx) {
            tx.executeSql("SELECT * FROM " + table, [], function(tx, result) {
                console.log('result',result);
                callback(result);
            });
        });
    },

	saveAllRecords: function(values, callback) {
		console.log("values", values);
        //Date time fields in db
        var objValues = "";


        for (var i = 0; i < values.length; i++) {
            var obj = values[i];
            //Date time fields

            var cRow = getLRValues(obj);
            if (i != values.length - 1)
                objValues = objValues + cRow + ", ";
            else
                objValues = objValues + cRow;
                console.log('objValues',objValues);

        }

        var columns = "('tripno', 'created_date', 'modified_date', 'truckno')";
       
        db.transaction(function(tx) {
            // tx.executeSql("INSERT OR REPLACE INTO trip " + columns + " VALUES " + objValues,
            //     objValues,
            //     function(tx, result) {
            //         console.log("insertID", result.insertId,
            //             "rows affected", result.rowsAffected);
            //         if (callback != null)
            //             callback(result);
            //     }, onError);
        });

    }

};
function onError(tx, error) {
    console.log(error.message);
}
function getValuePlaceHolder(columns) {
    var valuePlaceHolder = [];
    columns.split(",").forEach(function() {
        valuePlaceHolder.push("?");
    });
    return (valuePlaceHolder.length > 1) ? valuePlaceHolder.join(",") : valuePlaceHolder[0];
}
          
function getLRValues(obj) {
        var tripno, created_date, modified_date, truckno;
        //checks for integer
        tripno = obj.tripno;
        //checks for datetime
        created_date = obj.created_date;
        modified_date = obj.modified_date;
        //checks for varchar
        truckno = obj.truckno;
      
        

        if (tripno == null || tripno == 'null' || tripno == '')
            tripno = null;
        
        if (created_date == null || created_date == 'null' || created_date == '')
            created_date = null;
        else
            created_date = "'" + created_date + "'";

        if (modified_date == null || modified_date == 'null' || modified_date == '')
            modified_date = null;
        else
            modified_date = "'" + modified_date + "'";

        
        if (truckno == null || truckno == 'null' || truckno == '')
            truckno = null;
        else
            truckno = "'" + truckno + "'";
        var currentRow = "(" + tripno + ", " + created_date + ", " + modified_date + ", " + truckno + ")";
        console.log(currentRow);

        return currentRow;
}