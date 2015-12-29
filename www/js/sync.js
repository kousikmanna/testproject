	$(document).on('click', '.save_sync', function(){
		var grnObject={};
		// var grnArray= new Array();
		var driverObj={};
		var driverImage = document.getElementById('driverImage');
		var imageData=driverImage.src;
		var driverName=$('#driverName').val();
		var driverSignature=$('#signatureofDriver').val();
		var managerSignature=$('#managerSignature').val();
		driverObj.driver_name=driverName;
		driverObj.driver_image=driverImage;
		driverObj.driver_signature=driverSignature;
		driverObj.pdiManager_signature=managerSignature;


		DBHandler.saveDriverDetail('driver', driverObj, saveDriverDetailCallback);

		function saveDriverDetailCallback(result){
			DBHandler.getgrnDetail('grn_detail', grnDetailCallBack);
			
		}
		function grnDetailCallBack(result){
			var grnArr=new Array();
			var grn={};
			grn.grn_number:result.rows.item(0).grn_number;
			grn.reporting_date:result.rows.item(0).reporting_date;
			grn.reporting_time:result.rows.item(0).grn_number;
			grn.uploading_date:result.rows.item(0).uploading_date;
			grn.delay_type:result.rows.item(0).delay_type;
			grn.reason_of_delay:result.rows.item(0).reason_of_delay;
			grn.image:result.rows.item(0).image;
			grnArr.push(grn);
			grnObject.grn=grnArr;
			DBHandler.getDriverDetail('driver', getDriverDetailCallback);
		}
		function getDriverDetailCallback(result){
			var driverArr=new Array();
			var driverObject={};
			driverObject.driver_name=result.rows.item(0).driver_name;
            driverObjectdriverObject.driver_image=result.rows.item(0).driver_image;
            drdriverObjectiverObj.driver_signature=result.rows.item(0).driver_signature;
            driverObject.pdiManager_signature=result.rows.item(0).pdiManager_signature;
            driverArr.push(driverObject);
            grnObject.driver=driverArr;
			DBHandler.getAllRecords('dealer', dealerDetailCallback);

		}

		function dealerDetailCallback(result){
			var dealerArr=new Array();
			var dealerObject={};
			dealerObject.dealer_name=result.rows.item(0).dealer_name;
			dealerObject.dealer_code=result.rows.item(0).dealer_code;
			dealerObject.pdi_manager=result.rows.item(0).pdi_manager;
			dealerArr.push(dealerObject);
			grnObject.dealer=dealerArr;
			DBHandler.getAllRecordsofTrip('grn_trip', tripCallback);
		}

		function tripCallback(result){
			var tripArr=new Array();
			var tripObject={};
			var invoiceArr=new Array();
			var tripno=result.rows.item(0).tripno;
			tripObject.tripno=tripno;
			tripObject.created_date=result.rows.item(0).created_date;
			tripObject.tripno=result.rows.item(0).tripno;
			tripObject.modified_date=result.rows.item(0).modified_date;
			tripObject.truckno=result.rows.item(0).truckno;

			DBHandler.getAllRecordsofInvoice('grn_invoice', tripno, invoiceCallback);
			function invoiceCallback(result){
				var len=result.rows.length;
				for(var i=0; i<len; i++){
					var invoiceObj={};
					invoiceObj.invoiceno=result.rows.item(i).invoiceno;
					invoiceObj.plant=result.rows.item(i).plant;
					invoiceObj.created_date=result.rows.item(i).created_date;
					invoiceObj.modified_date=result.rows.item(i).modified_date;
					invoiceObj.billqty=result.rows.item(i).billqty;
					invoiceObj.tripno=result.rows.item(i).tripno;
					invoiceArr.push(invoiceObj);
					
				}

				tripObject.invoice=invoiceArr;
				tripArr.push(tripObject);
				grnObject.trip=tripArr;


			}

		}



		
	

	});
	
