sap.ui.define([
		"sap/ui/core/mvc/Controller",
		"sap/ui/model/json/JSONModel",
		"sap/ui/core/ValueState"
	], function (Controller, JSONModel, ValueState) {
		"use strict";

		return Controller.extend("leverx.app.controller.SecondPage", {
			/**
			 * Controller's "init" lifecycle method.
			 */
			onInit: function () {
				// Register the view with the message manager
				sap.ui.getCore().getMessageManager().registerObject(this.getView(), true);

				// set the model with some predefined properties for data types demonstration
				this.getView().setModel(new JSONModel({
					Country: "",
					ArrivalDate: new Date,
					AttachmentSize: 1000,
					Price: {
						value   : "1000",
						currency: "EUR"
					}
				}));
			},

			/**
			 * Formatter for color accent depending on the file size.
			 *
			 * @param {number} iSize file size.
			 *
			 * @returns {string} accent color.
			 */
			formatSizeAccent: function (iSize) {
				if (iSize < 100) {
					return ValueState.Warning
				} else if (iSize < 1000) {
					return ValueState.Success;
				} else {
					return ValueState.Error
				}
			}
		});
	}
);
