sap.ui.define([
		"sap/ui/core/mvc/Controller",
		"sap/ui/model/json/JSONModel",
		"sap/m/HBox",
		"sap/m/Label",
		"sap/m/Input",
		"sap/m/DatePicker",
		"sap/m/CheckBox",
		"sap/m/Select",
		"sap/ui/core/ListItem",
		"sap/ui/model/type/Date",
	], function (Controller, JSONModel, HBox, Label, Input, DatePicker, CheckBox, Select, ListItem, DateType) {
		"use strict";

		return Controller.extend("leverx.app.controller.FirstPage", {
			/**
			 * Controller's "init" lifecycle method.
			 */
			onInit: function () {
				// define the model with "fields", each of them contains the configuration of the field type
				var oModel = new JSONModel({
					fields: [
						{
							label: "Name",
							type: "String",
							value: "Peter"
						},
						{
							label: "IsActive",
							type: "Boolean",
							value: true
						},
						{
							label: "Birth Date",
							type: "Date",
							value: new Date
						},
						{
							label: "Level",
							type: "Number",
							value: 10
						},
						{
							label: "Percs",
							type: "Select",
							value: "TEA",
							options: [
								{key: "COOKIES", text: "Cookies"},
								{key: "WATER", text: "Water"},
								{key: "COFFEE", text: "Coffee"},
								{key: "TEA", text: "Tea"}
							]
						}
					]
				});

				this.getView().setModel(oModel);
			},

			/**
			 * Factory function. It will be called for each item from aggregation binding and the returning value will
			 * be used as a template. So each array-item form aggregation would have an own template, based on the
			 * parameters.
			 *
			 * @param {string} sId id of the control to be used as a template.
			 * @param {sap.ui.model.Context} oCtx the context of the current items from aggregation.
			 *
			 * @returns {sap.m.HBox} HBox with generated inner controls. It's used as a template for each item.
			 */
			fieldsFactory: function (sId, oCtx) {
				// create label control, based on the "label" property of the current "field"
				var oLabel = new Label({
					text: oCtx.getObject("label") + ":",
					textAlign: "Right",
					width: "10rem"
				});

				oLabel.addStyleClass("sapUiTinyMarginEnd");

				var oControl;

				// depending on the "type" of the field, create needed control
				switch (oCtx.getObject("type")) {
					case "String":
					case "Number": {
						oControl = new Input({
							value: "{value}"
						});
						break;
					}
					case "Date": {
						oControl = new DatePicker({
							value: {
								path: "value",
								type: new DateType
							},
						});
						break;
					}
					case "Boolean": {
						oControl = new CheckBox({
							selected: "{value}"
						});
						break;
					}
					case "Select": {
						// create "Select" control and establish the "items" aggregation binding
						oControl = new Select({
							selectedKey: "{value}",
							items: {
								path: "options",
								template: new ListItem({
									key: "{key}",
									text: "{text}"
								})
							}
						});
						break;
					}
				}

				oControl.setWidth("10rem");

				// create parent control that contain label + control (dynamically generated)
				var oHBox = new HBox(sId, {
					alignItems: "Center",
					items: [
						oLabel,
						oControl
					]
				});

				return oHBox;
			}
		});
	}
);
