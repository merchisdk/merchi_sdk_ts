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
import { Entity } from '../entity';
import { DiscountGroup } from './discount_group';
var Discount = /** @class */ (function (_super) {
    __extends(Discount, _super);
    function Discount() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.discountedUnitCost = function (unitPrice) {
            if (unitPrice === undefined) {
                throw 'unitPrice is undefined, did you forget to embed it?';
            }
            if (_this.amount === undefined) {
                throw 'amount is undefined, did you forget to embed it?';
            }
            var discount = 100 - _this.amount;
            return (unitPrice * discount / 100).toFixed(3);
        };
        return _this;
    }
    Discount.resourceName = 'discounts';
    Discount.singularName = 'discount';
    Discount.pluralName = 'discounts';
    __decorate([
        Discount.property({ type: Date }),
        __metadata("design:type", Object)
    ], Discount.prototype, "archived", void 0);
    __decorate([
        Discount.property(),
        __metadata("design:type", Number)
    ], Discount.prototype, "id", void 0);
    __decorate([
        Discount.property(),
        __metadata("design:type", Number)
    ], Discount.prototype, "lowerLimit", void 0);
    __decorate([
        Discount.property(),
        __metadata("design:type", Number)
    ], Discount.prototype, "amount", void 0);
    __decorate([
        Discount.property({ type: DiscountGroup }),
        __metadata("design:type", Object)
    ], Discount.prototype, "discountGroup", void 0);
    return Discount;
}(Entity));
export { Discount };
