sap.ui.define([
		"sap/ui/core/mvc/Controller"
	], function (Controller) {
		"use strict";

		return Controller.extend("leverx.app.controller.SecondPage", {
			/**
			 * Controller's "init" lifecycle method.
			 */
			onInit: function () {
				var oComponent = this.getOwnerComponent();

				var oRouter = oComponent.getRouter();

				// get the route object from router attach event handler, that will be called once the URL will match
				// the pattern of a route
				oRouter.getRoute("SecondPage").attachPatternMatched(this.onPatternMatched, this);
			},

			/**
			 * "SecondPage" route pattern matched event handler.
			 *
			 * @param {sap.ui.base.Event} oEvent event object.
			 */
			onPatternMatched: function (oEvent) {
				// store the link to "this"
				var that = this;

				// get the route arguments from the event parameters
				var mRouteArguments = oEvent.getParameter("arguments");

				// get the "SupplierID" parameter from arguments
				var sSupplierID = mRouteArguments.SupplierID;

				// get the ODataModel instance form the view (as the model was instantiated and set up in the Component,
				// the view has automatically access for it)
				var oODataModel = this.getView().getModel("odata");

				// wait until the metadata has been loaded. "metadataLoaded" method returns a promise
				oODataModel.metadataLoaded().then(function () {
					// create an existent entity key, in order to be able to bind the view to it
					// this method takes the name of EntitySet (collection) and map of key parameters
					var sKey = oODataModel.createKey("/Suppliers", {ID: sSupplierID});

					"/Suppliers(1)"

					// bind the whole view to supplier key (ODataModel will automatically request the data)
					that.getView().bindObject({
						path: sKey,
						model: "odata"
					});
				});

			}
		});
	}
);
