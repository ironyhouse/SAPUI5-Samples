sap.ui.define([
		"sap/ui/core/mvc/Controller",
		"sap/ui/model/json/JSONModel"
	], function (Controller, JSONModel) {
		"use strict";

		return Controller.extend("leverx.app.controller.FirstPage", {
			onInit: function () {
				// initialize JSONModel, passing data object with the array of products
				var oProductsModel = new JSONModel({
					products: [
						{
							ProductID: 1,
							ProductName: "Milk"
						},
						{
							ProductID: 2,
							ProductName: "Apples"
						},
						{
							ProductID: 3,
							ProductName: "Potatoes"
						},
						{
							ProductID: 4,
							ProductName: "Tomato"
						}
					]
				});

				// create JSONModel, which will be used for a new product creation purposes (just for convenience)
				var oNewProductModel = new JSONModel({ID: "", Name: ""});

				// set the product model to the view
				this.getView().setModel(oProductsModel, "productsModel");

				// set the new product model to the view
				this.getView().setModel(oNewProductModel, "newProductModel");
			},

			/**
			 * Crete product button press event handler.
			 */
			onCreateProductPress: function () {
				// get needed models
				var oNewProductModel	= this.getView().getModel("newProductModel");
				var oProductsModel		= this.getView().getModel("productsModel");

				// create a new product object
				var mNewProduct = {
					ProductID: oNewProductModel.getProperty("/ID"),
					ProductName: oNewProductModel.getProperty("/Name")
				};

				// get the property of product from model (it's array)
				var aProducts = oProductsModel.getProperty("/products");

				// push one object to the products array
				aProducts.push(mNewProduct);

				// update the binding to refresh the data from model
				oProductsModel.updateBindings();
			}
		});
	}
);
