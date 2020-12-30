sap.ui.define([
		"sap/ui/core/mvc/Controller",
		"sap/ui/model/json/JSONModel",
		"sap/m/MessageBox"
	], function (Controller, JSONModel, MessageBox) {
		"use strict";

		return Controller.extend("leverx.app.controller.FirstPage", {

			/**
			 * Controller's "init" lifecycle method.
			 */
			onInit: function () {
				// create empty JSONModel
				var oModel		= new JSONModel;

				// create JSONModel for the view configuration stuff. As an example, this model holds "busy" property,
				// which can be bound to any control. Once the property is set to "true", the busy indication will be
				// displayed
				var oViewModel	= new JSONModel({busy: false});

				// set data to the model
				// the same can be achieved with oModel.setProperty("/order", {comment: "Looks good!"})
				oModel.setData({
				 	order: {
				 		comment: "Looks good!"
				 	}
				});

				// set models to the view
				this.getView().setModel(oModel, "orderModel");
				this.getView().setModel(oViewModel, "viewModel");
			},

			/**
			 * Button press event handler (Bind input in OneWay style).
			 */
			onBindInputOWPress: function () {
				// get the button by id
				var oMyInput = this.byId("MyInput");

				// call the "bindProperty" method manually
				oMyInput.bindProperty("value", {
					model: "orderModel",
					path: "/order/comment",
					mode: "OneWay"
				});
			},

			/**
			 * Button press event handler (Bind input in TwoWay style).
			 */
			onBindInputTWPress: function () {
				var oMyInput = this.byId("MyInput");

				oMyInput.bindProperty("value", {
					model: "orderModel",
					path: "/order/comment",
					mode: "TwoWay"
				});
			},

			/**
			 * "ShowProperty" button press event handler.
			 */
			onShowPropertyPress: function () {
				// get the "comment" property from the model
				var sProperty = this.getView().getModel("orderModel").getProperty("/order/comment");

				// show the property in information message
				MessageBox.information(sProperty);
			},

			/**
			 * Formatter example for page title.
			 *
			 * @param {string} sProperty formatter's input property
			 *
			 * @returns {string} formatted value.
			 */
			pageTitleFormatter: function (sProperty) {
				return "Page title looks like: \"" + sProperty + "\"";
			}
		});
	}
);
