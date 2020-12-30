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
				// create a "view" model to serve some technical/configuration stuff locally on the view
				var oAppViewModel = new JSONModel({zoom: 5});

				// set model to the view with name "appView"
				this.getView().setModel(oAppViewModel, "appView");
			},

			/**
			 * Suppliers table line select, event handler.
			 *
			 * @param {sap.ui.base.Event} oEvent event object
			 */
			onSuppliersTableItemSelect: function (oEvent) {
				// get selected item from event object (Supplier table line)
				var oSelectedListItem = oEvent.getParameter("listItem");

				// get the binding context of a selected item (it contains information about a single supplier)
				var oCtx = oSelectedListItem.getBindingContext("odata");

				// set (transfer) the binding context to "ProductsTable" and "SupplierAddressForm" to make alive their
				// relative bindings, which are declared in a view
				this.byId("ProductsTable").setBindingContext(oCtx, "odata");
				this.byId("SupplierAddressForm").setBindingContext(oCtx, "odata");
			},

			/**
			 * Products table line select, event handler.
			 *
			 * @param {sap.ui.base.Event} oEvent event object.
			 */
			onProductsTableItemSelect: function (oEvent) {
				// get selected item from event object (Product table line)
				var oSelectedListItem = oEvent.getParameter("listItem");

				// get the binding context of a selected item (it contains information about a single product)
				var oCtx = oSelectedListItem.getBindingContext("odata");

				// set (transfer) the binding context to "ProductDetailForm" to make alive their relative bindings
				this.byId("ProductDetailForm").setBindingContext(oCtx, "odata");
			},

			/**
			 * Supplier address formatter. It transforms the raw address properties to the URL, which is a valid API
			 * request for Google Maps API.
			 *
			 * @param {number} iZoom zoom value
			 * @param {string} sZip zip code
			 * @param {string} sStreet street name
 			 * @param {string} sCity city name
			 * @param {string} sCountry country name
			 *
			 * @returns {string} valid API endpoint URL for static map.
			 */
			supplierAddressFormatter: function (iZoom, sZip, sStreet,  sCity, sCountry) {
				return "https://maps.googleapis.com/maps/api/staticmap?key=AIzaSyDf5vt3tOVDp7DBnZtoHp1sKN1Zum0m_84&zoom=" + iZoom + "&size=500x300&markers="
					+ jQuery.sap.encodeURL(sStreet + ", " + sZip +  ", " + sCity + ", " + sCountry);
			},

			/**
			 * Open supplier page button press event handler.
			 *
			 * @param {sap.ui.base.Event} oEvent event object.
			 */
			onOpenSupplierPagePress: function (oEvent) {
				// get the source control of event object (the one that was fired event)
				var oSource = oEvent.getSource();

				// get the binding context of a button (it's a part of the table line, so it inherits the context of it)
				var oCtx = oSource.getBindingContext("odata");

				// get the component
				var oComponent = this.getOwnerComponent();

				// get the router object and call "navTo" method to redirect user to the 2nd page, passing the mandatory
				// parameter "SupplierID"
				oComponent.getRouter().navTo("SecondPage", {
					SupplierID: oCtx.getObject("ID")
				});
			}
		});
	}
);
