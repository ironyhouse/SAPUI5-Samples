sap.ui.define([
		"sap/ui/core/mvc/Controller",
		"sap/ui/model/json/JSONModel",
		"sap/m/MessageToast",
		"sap/m/MessageBox"
	], function (Controller, JSONModel, MessageToast, MessageBox) {
		"use strict";

		return Controller.extend("leverx.app.controller.FirstPage", {
			onInit: function () {
				// create AppView JSON model
				this.oAppViewModel = new JSONModel({
					edit: false
				});

				this.getView().setModel(this.oAppViewModel, "appView");
			},

			/**
			 * Edit button press event handler.
			 */
			onEditPress: function () {
				this.oAppViewModel.setProperty("/edit", true);
			},

			/**
			 * Save button press event handler.
			 */
			onSavePress: function () {
				this.oAppViewModel.setProperty("/edit", false);

				var oODataModel = this.getView().getModel("odata");

				// call the method to release the request queue
				oODataModel.submitChanges();
			},

			/**
			 * Cancel button press event handler.
			 */
			onCancelPress: function () {
				this.oAppViewModel.setProperty("/edit", false);

				var oODataModel = this.getView().getModel("odata");

				// call the method to reset the request queue
				oODataModel.resetChanges();
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
			},

			/**
			 * "Open dialog" button press event handler.
			 */
			onCreateSupplierPress: function () {
				var oView = this.getView();

				var oODataModel = oView.getModel("odata");

				if (!this.oDialog) {
					this.oDialog = sap.ui.xmlfragment(oView.getId(), "leverx.app.view.fragments.SupplierDialog", this);

					oView.addDependent(this.oDialog);
				}

				// call "createEntry" method to
				// 1. create a context based on the entity type
				// 2. add the "create" request to the request queue
				var oEntryCtx = oODataModel.createEntry("/Suppliers", {
					properties: {
						ID:  (new Date).getTime().toString().slice(7)
					}
				});
	
				// set context to the dialog
				this.oDialog.setBindingContext(oEntryCtx);

				// set default model to allow relative binding without a need to specify model's name
				this.oDialog.setModel(oODataModel);

				// open the dialog
				this.oDialog.open();
			},

			/**
			 * Dialog "Create" button press event handler.
			 */
			onDialogCreatePress: function () {
				var oODataModel = this.getView().getModel("odata");

				// call the method to "release" the changes from queue
				oODataModel.submitChanges();

				this.oDialog.close();
			},

			/**
			 * "Cancel" button press event handler (in the dialog).
			 */
			onDialogCancelPress: function () {
				var oODataModel = this.getView().getModel("odata");

				var oCtx = this.oDialog.getBindingContext();

				// delete the entry from requests queue
				oODataModel.deleteCreatedEntry(oCtx);

				this.oDialog.close();
			}
		});
	}
);
