    var db;
    var dbName = "philips_prr.db";
    var DBHandler = {
        /*
         * ------------------------ Initiate Database ------------------------
        */
        initDatabase: function() {
            console.log('initDatabase function');
           
            if(window.sqlitePlugin){
                console.log('Database');
            }
            db = window.sqlitePlugin.openDatabase({
                name: dbName,
                createFromLocation: 1
            }); 
            
            console.log('db');
            db.transaction(function(tx) {
                console.log('transaction');
                tx.executeSql('CREATE TABLE IF NOT EXISTS prr_model ("id" INTEGER PRIMARY KEY NOT NULL, "model_name" VARCHAR NOT NULL, "model_image" VARCHAR NOT NULL, "created_date" DATETIME NOT NULL, "active" INTEGER NOT NULL DEFAULT (1))');    
                tx.executeSql('CREATE TABLE IF NOT EXISTS prr_category ("id" INTEGER PRIMARY KEY NOT NULL, "category_name" VARCHAR NOT NULL, "model_id" INTEGER NOT NULL, "image_url" VARCHAR NOT NULL, "created_date" DATETIME NOT NULL, "active" INTEGER NOT NULL DEFAULT (1))');
                console.log('dealer table');
                tx.executeSql('CREATE TABLE IF NOT EXISTS prr_subcategory ("id" INTEGER PRIMARY KEY NOT NULL, "category_id" INTEGER NOT NULL, "image_url" VARCHAR NOT NULL, "created_date" DATETIME NOT NULL, "active" INTEGER NOT NULL DEFAULT (1))');
                tx.executeSql('CREATE TABLE IF NOT EXISTS prr_products ("id" INTEGER PRIMARY KEY NOT NULL, "partId" INTEGER NOT NULL, "partname" VARCHAR NOT NULL, "mrp"  INTEGER NOT NULL, "image_url" VARCHAR NOT NULL, "subcategory_id" NOT NULL, "created_date" DATETIME NOT NULL, "active" INTEGER NOT NULL DEFAULT (1))');
            });


        },
         
        saveRecordofPrr_model: function(values, callback) {
            console.log("values", values);
            var objValues = "";
            for (var i = 0; i < values.length; i++) {
                var obj = values[i];
                var cRow = getPrr_modelValues(obj);
                if (i != values.length - 1)
                    objValues = objValues + cRow + ", ";
                else
                    objValues = objValues + cRow;

            }

            var columns = "('id', 'model_name', 'model_image', 'created_date', 'active')";
           
            db.transaction(function(tx) {
                tx.executeSql("INSERT OR REPLACE INTO prr_model " + columns + " VALUES " + objValues, objValues,
                    function(tx, result) {
                        console.log("result",result);
                        if (callback != null)
                            callback(result);
                    }, onError);
            });

        },
        
        saveRecordofPrr_category: function(values, callback) {
            console.log("values", values);
            var objValues = "";

            for (var i = 0; i < values.length; i++) {
                var obj = values[i];
                var cRow = getPrr_categoryValues(obj);
                if (i != values.length - 1)
                    objValues = objValues + cRow + ", ";
                else
                    objValues = objValues + cRow;

            }

            var columns = "('id', 'category_name', 'model_id', 'image_url', 'created_date','active')";
           
            db.transaction(function(tx) {
                tx.executeSql("INSERT OR REPLACE INTO prr_category " + columns + " VALUES " + objValues, objValues,
                    function(tx, result) {
                        console.log("result",result);
                        if (callback != null)
                            callback(result);
                    }, onError);
            });

        },
       
        saveRecordofPrr_subcategory: function(values, callback) {
            console.log("values", values);
            var objValues = "";

            for (var i = 0; i < values.length; i++) {
                var obj = values[i];
                var cRow = getPrr_subcategoryValues(obj);
                if (i != values.length - 1)
                    objValues = objValues + cRow + ", ";
                else
                    objValues = objValues + cRow;
            }

            var columns = "('id', 'category_id', 'subcategory_name', 'image_url', 'created_date','active')";
           
            db.transaction(function(tx) {
                tx.executeSql("INSERT OR REPLACE INTO prr_subcategory " + columns + " VALUES " + objValues, objValues,
                    function(tx, result) {
                        console.log("result",result);
                        if (callback != null)
                            callback(result);
                    }, onError);
            });

        },
        
        saveRecordofPrr_products: function(values, callback) {
            console.log("values", values);
            var objValues = "";

            for (var i = 0; i < values.length; i++) {
                var obj = values[i];
                var cRow = getPrr_productsValues(obj);
                if (i != values.length - 1)
                    objValues = objValues + cRow + ", ";
                else
                    objValues = objValues + cRow;
            }
            var columns = "('id', 'partId', 'partname', 'mrp','image_url', 'subcategory_id', 'created_date','active')";
            db.transaction(function(tx) {
                tx.executeSql("INSERT OR REPLACE INTO prr_products " + columns + " VALUES " + objValues, objValues,
                    function(tx, result) {
                        console.log("result",result);
                        if (callback != null)
                            callback(result);
                    }, onError);
            });

        },

        getRecordsFromTable: function(table, callback) {
            console.log('table name',table);
            console.log('getRecordsFromTable');
            db.transaction(function(tx) {
                tx.executeSql("SELECT * FROM " + table, [], function(tx, result) {
                    callback(result);
                });
            });
        },

        getRecordsFromTableWithCondition: function(table, condition, callback) {
            db.transaction(function(tx) {
                tx.executeSql("SELECT * FROM " + table + condition, [], function(tx, result) {
                    callback(result);
                });
            });
        },

        getRecordsWithCondition: function(table, condition, callback){
            db.transaction(function(tx){
                tx.executeSql("SELECT * FROM " + table + condition, [], function(tx, result){
                    callback(result);
                });
            });

        },

        getRecords: function(table, data, callback){
            db.transaction(function(tx){
                tx.executeSql("SELECT * from " + table + "WHERE id=" + "'" + data + "'", [], function(tx, result){
                    callback(result);
                });
            });
        }

    };  
   
    function getPrr_modelValues(obj) {
        var id, model_name, model_image, created_date, active;
        id = obj.id;
        model_name = obj.model_name;
        model_image=obj.model_image;
        created_date = obj.created_date;
        active=obj.active;

        //checks for integer
        if (id == null || id == 'null' || id == '')
            id = null;
        //check for VARCHAR
        if (model_name == null || model_name == 'null' || model_name == '')
            created_date = null;
        else
            model_name = "'" + model_name + "'";

        if (model_image == null || model_image == 'null' || model_image == '')
            model_image = null;
        else
            model_image = "'" + model_image + "'";
        //checks for datetime
        if (created_date == null || created_date == 'null' || created_date == '')
            created_date = null;
        else
            created_date = "'" + created_date + "'";
        //checks for integer
        if (active == null || active == 'null' || active == '')
            truckno = null;
        
        var currentRow = "(" + id + ", " + model_name + ", " + model_image + ", "+ created_date + ", " + active + ")";
        console.log(currentRow);

        return currentRow;
    }
    
    function getPrr_categoryValues(obj) {
        var id, category_name, model_id, image_url, created_date, active;
        id = obj.id;
        category_name = obj.category_name;
        model_id = obj.model_id;
        image_url = obj.image_url;
        created_date = obj.created_date;
        active=obj.active;

        //checks for integer
        if (id == null || id == 'null' || id == '')
            id = null;
        //check for VARCHAR
        if (category_name == null || category_name == 'null' || category_name == '')
            category_name = null;
        else
            category_name = "'" + category_name + "'";
        //checks for integer
        if (model_id == null || model_id == 'null' || model_id == '')
            model_id = null;
        //check for VARCHAR
        if (image_url == null || image_url == 'null' || image_url == '')
            image_url = null;
        else
            image_url = "'" + image_url + "'";
        //checks for datetime
        if (created_date == null || created_date == 'null' || created_date == '')
            created_date = null;
        else
            created_date = "'" + created_date + "'";
        //checks for integer
        if (active == null || active == 'null' || active == '')
            truckno = null;
        
        var currentRow = "(" + id + ", " + category_name + ", " + model_id + ", "+ image_url + ", " + created_date + ", " + active + ")";
        console.log(currentRow);

        return currentRow;
    }
    
    function getPrr_subcategoryValues(obj) {
        var id, category_id, subcategory_name, image_url, created_date, active;
        id = obj.id;
        category_name = obj.category_name;
        model_id = obj.model_id;
        image_url = obj.image_url;
        created_date = obj.created_date;
        active=obj.active;

        //checks for integer
        if (id == null || id == 'null' || id == '')
            id = null;

        if (category_id == null || category_id == 'null' || category_id == '')
            category_id = null;
        
        //check for VARCHAR
        if (subcategory_name == null || subcategory_name == 'null' || subcategory_name == '')
            subcategory_name = null;
        else
            subcategory_name = "'" + subcategory_name + "'";
        
        if (image_url == null || image_url == 'null' || image_url == '')
            image_url = null;
        else
            image_url = "'" + image_url + "'";
        //checks for datetime
        if (created_date == null || created_date == 'null' || created_date == '')
            created_date = null;
        else
            created_date = "'" + created_date + "'";
        //checks for integer
        if (active == null || active == 'null' || active == '')
            truckno = null;
        
        var currentRow = "(" + id + ", " + category_id + ", " + subcategory_name + ", "+ image_url + ", " + created_date + ", " + active + ")";
        console.log(currentRow);

        return currentRow;
    }
     
    function getPrr_productsValues(obj) {
        var id, partId, partname, mrp, image_url, subcategory_id, created_date, active;
        id = obj.id;
        partId = obj.partId;
        partname=obj.partname;
        mrp = obj.mrp;
        image_url = obj.image_url;
        subcategory_id = obj.subcategory_id;
        created_date = obj.created_date;
        active=obj.active;

        //checks for integer
        if (id == null || id == 'null' || id == '')
            id = null;
        if (partId == null || partId == 'null' || partId == '')
            partId = null;
        //check for VARCHAR
        if (partname == null || partname == 'null' || partname == '')
            partname = null;
        else
            partname = "'" + partname + "'";
        //checks for integer
        if (mrp == null || mrp == 'null' || mrp == '')
            mrp = null;
        //check for VARCHAR
        if (image_url == null || image_url == 'null' || image_url == '')
            image_url = null;
        else
            image_url = "'" + image_url + "'";
        //checks for integer
        if (subcategory_id == null || subcategory_id == 'null' || subcategory_id == '')
            subcategory_id = null;
        //checks for datetime
        if (created_date == null || created_date == 'null' || created_date == '')
            created_date = null;
        else
            created_date = "'" + created_date + "'";
        //checks for integer
        if (active == null || active == 'null' || active == '')
            truckno = null;
        
        var currentRow = "(" + id + ", " + partId + ", " + partname + ", "+ mrp + ", " + image_url + ", " + subcategory_id + ", " + created_date + ", " + active + ")";
        console.log(currentRow);

        return currentRow;
    }

    function onError(tx, error) {
        console.log(error.message);
    }


