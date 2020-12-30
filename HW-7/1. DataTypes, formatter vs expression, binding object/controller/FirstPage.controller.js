sap.ui.define([
		"sap/ui/core/mvc/Controller",
		"sap/ui/model/json/JSONModel",
		"sap/ui/model/Filter",
		"sap/ui/model/FilterOperator",
		"sap/ui/model/Sorter"
	], function (Controller, JSONModel, Filter, FilterOperator, Sorter) {
		"use strict";

		// constants for sorting modes
		var SORT_NONE	= "";
		var SORT_ASC	= "ASC";
		var SORT_DESC	= "DESC";

		return Controller.extend("leverx.app.controller.FirstPage", {
			/**
			 * Controller's "init" lifecycle method.
			 */
			onInit: function () {
				// create a "view" model to store some technical/configuration stuff locally on the view
				var oAppViewModel = new JSONModel({
					productsCount: 0,
					sortType: SORT_NONE
				});

				// save view model to the controller's instance (for convenience)
				this.oAppViewModel = oAppViewModel;

				// set model to the view with name "appView"
				this.getView().setModel(oAppViewModel, "appView");

				window.fcontroller = this;
			},

			/**
			 * Formatter for the icon used in a sort trigger button.
			 *
			 * @param {string} sSortType sorting type.
			 *
			 * @returns {string} icon name.
			 */
			sortTypeFormatter: function (sSortType) {

				console.log(object);

				switch (sSortType) {
					case SORT_NONE: {
						return "sort";
					}
					case SORT_ASC: {
						return "sort-ascending";
					}
					case SORT_DESC: {
						return "sort-descending";
					}
					default: {
						return "sort";
					}
				}
			},

			/**
			 * "Sort" button press event handler.
			 */
			onSortButtonPress: function () {
				// get current sorting type
				var sSortType = this.oAppViewModel.getProperty("/sortType");

				// a bit of logic, how the types should replace each other
				switch (sSortType) {
					case SORT_NONE: {
						sSortType = SORT_ASC;
						break;
					}

					case SORT_ASC: {
						sSortType = SORT_DESC;
						break;
					}

					case SORT_DESC: {
						sSortType = SORT_ASC;
						break;
					}
				}

				// update the models' property with new sorting type
				this.oAppViewModel.setProperty("/sortType", sSortType);

				// get products table control
				var oProductsTable = this.byId("ProductsTable");

				// get the "items" binding object from the products table
				var oItemsBinding = oProductsTable.getBinding("items");

				// create sorter object
				var bSortDesc = sSortType;
				var oSorter = new Sorter("Name", bSortDesc);

				// perform sorting
				oItemsBinding.sort(oSorter);
			},

			/**
			 * "View" after rendering lifecycle method. (wait until bindings are established)
			 */
			onAfterRendering: function () {
				var oProductsTable = this.byId("ProductsTable");

				var oItemsBinding = oProductsTable.getBinding("items");

				// attach "dataReceived" event (to grab the products count and show it on a screen)
				oItemsBinding.attachDataReceived(function (oEvent) {
					// data that were received via binding
					var mData = oEvent.getParameter("data");

					this.oAppViewModel.setProperty("/productsCount", mData.__count);
				}, this);
			},

			/**
			 * "Search" event handler of the "SearchField".
			 *
			 * @param {sap.ui.base.Event} oEvent event object.
			 */
			onProductSearch: function (oEvent) {
				var oProductsTable = this.byId("ProductsTable");

				var oItemsBinding = oProductsTable.getBinding("items");

				// get the search string from control
				var sQuery = oEvent.getParameter("query");

				var oFilter = new Filter("Name", FilterOperator.Contains, sQuery);

				// execute filtering (passing the filter object)
				oItemsBinding.filter(oFilter);
			},

			/**
			 * Suppliers table line select, event handler.
			 *
			 * @param {sap.ui.base.Event} oEvent event object
			 */
			onSuppliersTableItemSelect: function (oEvent) {
				var oSelectedListItem = oEvent.getParameter("listItem");

				var oCtx = oSelectedListItem.getBindingContext("odata");

				this.byId("ProductsTable").setBindingContext(oCtx, "odata");
			},

			/**
			 * Go to data types demo.
			 */
			onOpenDataTypesDemoPress: function () {
				this.getOwnerComponent().getRouter().navTo("SecondPage");
			}
		});
	}
);
