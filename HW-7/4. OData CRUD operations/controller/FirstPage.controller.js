sap.ui.define([
		"sap/ui/core/mvc/Controller",
		"sap/ui/model/Filter",
		"sap/ui/model/FilterOperator",
		"sap/m/MessageToast",
		"sap/m/MessageBox"
	], function (Controller, Filter, FilterOperator, MessageToast, MessageBox) {
		"use strict";

		return Controller.extend("leverx.app.controller.FirstPage", {
			/**
			 * "Read" suppliers button press event handler.
			 */
			onReadSuppliersPress: function () {
				// get ODataModel instance
				var oODataModel = this.getView().getModel("odata");

				// create composite filters with "and" operation
				var oFilter = new Filter({
					filters: [
						new Filter("Price", FilterOperator.GT, 10),
						new Filter("Price", FilterOperator.LT, 20)
					],
					and: true
				});

				// perform "read" request, passing filters
				oODataModel.read("/Products", {
					filters: [oFilter],
					success: function (mData, mResponse) {
						console.log(mData.results)
					},
					error: function () {
						MessageBox.error("Error while reading products!");
					}
				});
			},

			/**
			 * "Create" supplier button press event handler.
			 */
			onCreateSupplierPress: function () {
				var oODataModel = this.getView().getModel("odata");

				// unfortunately the sample odata service does not create an ID automatically, so it has to be done
				// manually
				var mPayload = {
					"ID": parseInt(Math.random() * 10000, 0),
					"Name": "Leverx",
					"Address": {
						"Street": "Lapacina",
						"City": "Minsk",
						"State": "Minskij rajion",
						"ZipCode": "1",
						"Country": "Belarus"
					},
					"Concurrency": 0
				};

				// execute "create" request
				oODataModel.create("/Suppliers", mPayload, {
					success: function () {
						MessageToast.show("Supplier was successfully created!")
					},
					error: function () {
						MessageBox.error("Error while creating supplier!");
					}
				});
			},

			/**
			 * "Update" supplier button press event handler.
			 *
			 * @param {sap.ui.base.Event} oEvent event object.
			 */
			onUpdateSupplierPress: function (oEvent) {
				// get binding context of the table row, which the button belongs to
				var oCtx = oEvent.getSource().getBindingContext("odata");

				// get the ODataModel instance through the context
				var oODataModel = oCtx.getModel();

				// retrieve a key of the entry to be updated
				var sKey = oODataModel.createKey("/Suppliers", oCtx.getObject());

				// construct payload (the object that contains brand-new properties for the entry to be updated
				// jQuery.extend is used here to make a deep-copy of and object
				var mPayload = jQuery.extend(true, {}, oCtx.getObject());

				// modify the Name only
				mPayload.Name = "Time: " + (new Date).getTime();

				// execute "update" request, passing the new properties (in payload) that will replace the former ones
				oODataModel.update(sKey, mPayload, {
					success: function () {
						MessageToast.show("Supplier was successfully updated!")
					},
					error: function () {
						MessageBox.error("Error while updating supplier!");
					}
				});
			},

			/**
			 * "Delete" supplier button press event handler.
			 *
			 * @param {sap.ui.base.Event} oEvent event object
			 */
			onDeleteSupplierPress: function (oEvent) {
				var oCtx = oEvent.getSource().getBindingContext("odata");

				var oODataModel = oCtx.getModel();

				var sKey = oODataModel.createKey("/Suppliers", oCtx.getObject());

				// execute "delete" request of the entity, specified in a key
				oODataModel.remove(sKey, {
					success: function () {
						MessageToast.show("Supplier was successfully removed!")
					},
					error: function () {
						MessageBox.error("Error while removing supplier!");
					}
				});
			}
		});
	}
);
