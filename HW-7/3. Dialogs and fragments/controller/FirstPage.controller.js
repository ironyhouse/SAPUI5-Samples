sap.ui.define([
		"sap/ui/core/mvc/Controller",
		"sap/ui/model/json/JSONModel"
	], function (Controller, JSONModel) {
		"use strict";

		return Controller.extend("leverx.app.controller.FirstPage", {
			/**
			 * Controller's "init" lifecycle method.
			 */
			onInit: function () {
				// create JSON mode with fore fields to be displayed in dialog
				var oModel = new JSONModel({
					formFields: {
						Name: "Batman",
						Age: "88",
						Type: "Superhero",
						Address: "Gotham"
					}
				});

				this.getView().setModel(oModel);
			},

			/**
			 * "Open dialog" button press event handler.
			 */
			onOpenDialogPress: function () {
				var oView = this.getView();

				// if the dialog was not created before, then create it (lazy loading)
				if (!this.oDialog) {
					// use the xmlfragment factory function to get the controls from fragment
					// 1. it is recommended to pass the parent view's id as a first parameter to establish correct
					// prefixing of the controls' id's inside the fragment
					// 2. as an optional third parameter, the link to the object that will be used as a source of event
					// handlers can be passed
					this.oDialog = sap.ui.xmlfragment(oView.getId(), "leverx.app.view.fragments.EmployeeDialog", this);

					// call the "addDependent" method in order to propagate all models and bindings from the view to
					// the controls from fragment
					oView.addDependent(this.oDialog);
				}

				// set context to the dialog
				this.oDialog.bindObject({
					path: "/",
					model: 
				});

				// open the dialog
				this.oDialog.open();
			},

			/**
			 * "Cancel" button press event handler (in the dialog).
			 */
			onCancelPress: function () {
				this.oDialog.close();
			},

			/**
			 * After dialog close event handler.
			 */
			onAfterClose: function () {
				var oFormModel = this.getView().getModel();

				var mFormFields = oFormModel.getProperty("/formFields");

				// reset the values
				Object.keys(mFormFields).forEach(function (sKey) {
					oFormModel.setProperty("/formFields/" + sKey);
				});
			}
		});
	}
);
