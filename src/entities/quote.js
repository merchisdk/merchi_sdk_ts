var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Invoice } from './invoice';
import { Entity } from '../entity';
import { kahanSum } from '../util/float';
var Quote = /** @class */ (function (_super) {
    __extends(Quote, _super);
    function Quote() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.quoteTotal = function (options) {
            var _a = (options ? options : {}).strictEmbed, strictEmbed = _a === void 0 ? true : _a;
            var _b = _this, _c = _b.quoteItems, quoteItems = _c === void 0 ? [] : _c, _d = _b.shipments, shipments = _d === void 0 ? [] : _d;
            if (strictEmbed && _this.quoteItems === undefined) {
                throw new Error('quoteItems is undefined, did you forget to embed it?');
            }
            if (strictEmbed && _this.shipments === undefined) {
                throw new Error('shipments is undefined, did you forget to embed it?');
            }
            var quoteItemsTotal = kahanSum(quoteItems.map(function (qI) {
                return parseFloat(qI.calculateTotal(options));
            })).toFixed(3);
            var shipmentItemsTotal = kahanSum(shipments.map(function (s) {
                return parseFloat(s.calculateTotal(options));
            })).toFixed(3);
            return (parseFloat(quoteItemsTotal) + parseFloat(shipmentItemsTotal)).toFixed(3);
        };
        _this.calculateTotal = _this.quoteTotal;
        _this.calculateSubTotal = function (options) {
            var _a = (options ? options : {}).strictEmbed, strictEmbed = _a === void 0 ? true : _a;
            var _b = _this, _c = _b.quoteItems, quoteItems = _c === void 0 ? [] : _c, _d = _b.shipments, shipments = _d === void 0 ? [] : _d;
            if (strictEmbed && _this.quoteItems === undefined) {
                throw new Error('quoteItems is undefined, did you forget to embed it?');
            }
            if (strictEmbed && _this.shipments === undefined) {
                throw new Error('shipments is undefined, did you forget to embed it?');
            }
            var quoteItemsTotal = kahanSum(quoteItems.map(function (qI) {
                return parseFloat(qI.calculateSubTotal(options));
            }));
            var shipmentItemsTotal = kahanSum(shipments.map(function (s) {
                return parseFloat(s.calculateSubTotal(options));
            }));
            return (quoteItemsTotal + shipmentItemsTotal).toFixed(3);
        };
        _this.calculateTaxAmount = function (options) {
            var _a = (options ? options : {}).strictEmbed, strictEmbed = _a === void 0 ? true : _a;
            var _b = _this, _c = _b.quoteItems, quoteItems = _c === void 0 ? [] : _c, _d = _b.shipments, shipments = _d === void 0 ? [] : _d;
            if (strictEmbed && _this.quoteItems === undefined) {
                throw new Error('quoteItems is undefined, did you forget to embed it?');
            }
            if (strictEmbed && _this.shipments === undefined) {
                throw new Error('shipments is undefined, did you forget to embed it?');
            }
            var quoteItemsTotal = kahanSum(quoteItems.map(function (qI) {
                return parseFloat(qI.calculateTaxAmount(options));
            }));
            var shipmentItemsTotal = kahanSum(shipments.map(function (s) {
                return parseFloat(s.calculateTaxAmount(options));
            }));
            return (quoteItemsTotal + shipmentItemsTotal).toFixed(3);
        };
        _this.findQuoteItemIndex = function (quoteItemId) {
            if (_this.quoteItems === undefined) {
                throw new Error('quoteItems is undefined, did you forget to embed it?');
            }
            function checkEqualId(quoteItem) {
                return quoteItem.id === quoteItemId;
            }
            return _this.quoteItems.findIndex(checkEqualId);
        };
        _this.removeQuoteItem = function (quoteItem) {
            if (_this.quoteItems === undefined) {
                throw new Error('quoteItems is undefined, did you forget to embed it?');
            }
            if (quoteItem.id === undefined) {
                throw new Error('quoteItem.id is undefined, did you forget to embed it?');
            }
            var index = _this.findQuoteItemIndex(quoteItem.id);
            if (index > -1) {
                _this.quoteItems.splice(index, 1);
            }
        };
        _this.deadlineTimeDifference = function () {
            if (_this.agreedDeadline === undefined) {
                var err = 'agreedDeadline is undefined, did you forget to embed it?';
                throw new Error(err);
            }
            if (_this.assignments === undefined) {
                var err = 'assignments is undefiend, did you forget to embed it?';
                throw new Error(err);
            }
            if (_this.assignments.length < 1) {
                return null;
            }
            if (_this.agreedDeadline === null) {
                return null;
            }
            var assignment = _this.assignments[0];
            if (assignment.productionDeadline === undefined) {
                var err = 'productionDeadline is undefined, did you forget to embed' +
                    'it?';
                throw new Error(err);
            }
            var productionDeadline = assignment.productionDeadline;
            return productionDeadline.valueOf() - _this.agreedDeadline.valueOf();
        };
        return _this;
    }
    Quote.resourceName = 'quotes';
    Quote.singularName = 'quote';
    Quote.pluralName = 'quotes';
    __decorate([
        Quote.property({ type: Date }),
        __metadata("design:type", Object)
    ], Quote.prototype, "archived", void 0);
    __decorate([
        Quote.property(),
        __metadata("design:type", String)
    ], Quote.prototype, "currency", void 0);
    __decorate([
        Quote.property(),
        __metadata("design:type", Number)
    ], Quote.prototype, "id", void 0);
    __decorate([
        Quote.property({ type: Date }),
        __metadata("design:type", Object)
    ], Quote.prototype, "agreedDeadline", void 0);
    __decorate([
        Quote.property({ arrayType: 'Shipment' }),
        __metadata("design:type", Array)
    ], Quote.prototype, "shipments", void 0);
    __decorate([
        Quote.property({ arrayType: 'QuoteItem' }),
        __metadata("design:type", Array)
    ], Quote.prototype, "quoteItems", void 0);
    __decorate([
        Quote.property({ arrayType: 'Assignment' }),
        __metadata("design:type", Array)
    ], Quote.prototype, "assignments", void 0);
    __decorate([
        Quote.property({ type: Invoice }),
        __metadata("design:type", Object)
    ], Quote.prototype, "invoice", void 0);
    return Quote;
}(Entity));
export { Quote };
