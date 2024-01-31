var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { AutomaticPaymentRelationship } from './entities/automatic_payment_relationship';
import { Session } from './entities/session';
import { JobComment } from './entities/job_comment';
import { Domain } from './entities/domain';
import { ExchangeRate } from './entities/exchange_rate';
import { Job } from './entities/job';
import { Menu } from './entities/menu';
import { Backup } from './entities/backup';
import { VariationField } from './entities/variation_field';
import { VariationOption } from './entities/variation_option';
import { ProductionComment } from './entities/production_comment';
import { Product } from './entities/product';
import { InternalTag } from './entities/internal_tag';
import { Inventory } from './entities/inventory';
import { QuoteItem } from './entities/quote_item';
import { Category } from './entities/category';
import { Invoice } from './entities/invoice';
import { UserCompany } from './entities/user_company';
import { InventoryUnitVariation } from './entities/inventory_unit_variation';
import { VariationFieldsOption } from './entities/variation_fields_option';
import { Bank } from './entities/bank';
import { Shipment } from './entities/shipment';
import { ShipmentItem } from './entities/shipment_item';
import { ShipmentItemFulfillment } from './entities/shipment_item_fulfillment';
import { ShipmentMethod } from './entities/shipment_method';
import { ShipmentMethodVariation } from './entities/shipment_method_variation';
import { DomainInvitation } from './entities/domain_invitation';
import { EmailCounter } from './entities/email_counter';
import { MenuItem } from './entities/menu_item';
import { SupplyDomain } from './entities/supply_domain';
import { Cart } from './entities/cart';
import { CartShipmentGroup } from './entities/cart_shipment_group';
import { CartShipmentQuote } from './entities/cart_shipment_quote';
import { Theme } from './entities/theme';
import { ThemeCssSetting } from './entities/theme_css_setting';
import { Component } from './entities/component';
import { ComponentVersion } from './entities/component_version';
import { MerchiFile } from './entities/file';
import { EmailAddress } from './entities/email_address';
import { SeoDomainPage } from './entities/seo_domain_page';
import { ShortUrl } from './entities/short_url';
import { VariationsGroup } from './entities/variations_group';
import { Quote } from './entities/quote';
import { Draft } from './entities/draft';
import { DraftTemplate } from './entities/draft_template';
import { Discount } from './entities/discount';
import { DiscountGroup } from './entities/discount_group';
import { User } from './entities/user';
import { Company } from './entities/company';
import { ComponentTag } from './entities/component_tag';
import { EnrolledDomain } from './entities/enrolled_domain';
import { CountryTax } from './entities/country_tax';
import { Item } from './entities/item';
import { DomainTag } from './entities/domain_tag';
import { DraftComment } from './entities/draft_comment';
import { Notification } from './entities/notification';
import { Payment } from './entities/payment';
import { Page } from './entities/page';
import { CompanyInvitation } from './entities/company_invitation';
import { SystemRole } from './entities/system_role';
import { PaymentDevice } from './entities/payment_device';
import { PhoneNumber } from './entities/phone_number';
import { Variation } from './entities/variation';
import { CartItem } from './entities/cart_item';
import { Address } from './entities/address';
import { Assignment } from './entities/assignment';
import { MatchingInventory } from './entities/matching_inventory';
import { SubscriptionPlan } from './entities/subscription_plan';
import { generateUUID } from './uuid';
// eslint-disable-next-line no-unused-vars
import { apiFetch, apiFetchWithProgress } from './request';
import { getCookie } from './cookie';
function cloneClass(original, arg) {
    // copy the constructor, but use the empty object as `this`
    var copy = original.bind({}, arg);
    // pick up any static members (this is shallow, the members are not copied)
    Object.assign(copy, original);
    return copy;
}
var Merchi = /** @class */ (function () {
    function Merchi(sessionToken, clientToken, invoiceToken, cartToken) {
        var _this = this;
        this.id = generateUUID();
        this.authenticatedFetch = function (resource, options, expectEmptyResponse) {
            if (!options.query) {
                /* istanbul ignore next */
                options.query = [];
            }
            if (_this.sessionToken) {
                /* istanbul ignore next */
                options.query.push(['session_token', _this.sessionToken]);
            }
            if (_this.clientToken) {
                /* istanbul ignore next */
                options.query.push(['client_token', _this.clientToken]);
            }
            if (_this.invoiceToken) {
                /* istanbul ignore next */
                options.query.push(['invoice_token', _this.invoiceToken]);
            }
            if (_this.cartToken) {
                /* istanbul ignore next */
                options.query.push(['cart_token', _this.cartToken]);
            }
            return apiFetch(resource, options, expectEmptyResponse);
        };
        /* istanbul ignore next */
        this.authenticatedFetchWithProgress = function (resource, options, progressCallback) {
            if (!options.query) {
                options.query = [];
            }
            if (_this.sessionToken) {
                options.query.push(['session_token', _this.sessionToken]);
            }
            if (_this.clientToken) {
                options.query.push(['client_token', _this.clientToken]);
            }
            if (_this.invoiceToken) {
                options.query.push(['invoice_token', _this.invoiceToken]);
            }
            if (_this.cartToken) {
                options.query.push(['cart_token', _this.cartToken]);
            }
            return apiFetchWithProgress(resource, options, progressCallback);
        };
        this.getCurrentUser = function (options) {
            var _a = (options || {}).embed, embed = _a === void 0 ? {} : _a;
            var defaultEmbed = { user: { enrolledDomains: { domain: {} } } };
            if (!_this.sessionToken) {
                return Promise.resolve(null);
            }
            return _this.Session.get(_this.sessionToken, {
                embed: __assign(__assign({}, defaultEmbed), embed),
            }).then(function (session) { return session.user; });
        };
        if (sessionToken) {
            this.sessionToken = sessionToken;
        }
        else {
            this.sessionToken = getCookie('session_token');
        }
        if (clientToken) {
            this.clientToken = clientToken;
        }
        else {
            this.clientToken = getCookie('client_token');
        }
        if (invoiceToken) {
            this.invoiceToken = invoiceToken;
        }
        else {
            this.invoiceToken = getCookie('invoice_token');
        }
        if (cartToken) {
            this.cartToken = cartToken;
        }
        else {
            this.cartToken = getCookie('cart_token');
        }
        // re-export configured versions of all classes
        this.AutomaticPaymentRelationship = this.setupClass(AutomaticPaymentRelationship);
        this.Variation = this.setupClass(Variation);
        this.DraftComment = this.setupClass(DraftComment);
        this.Component = this.setupClass(Component);
        this.ComponentVersion = this.setupClass(ComponentVersion);
        this.Theme = this.setupClass(Theme);
        this.ThemeCssSetting = this.setupClass(ThemeCssSetting);
        this.Company = this.setupClass(Company);
        this.MenuItem = this.setupClass(MenuItem);
        this.InternalTag = this.setupClass(InternalTag);
        this.Inventory = this.setupClass(Inventory);
        this.Notification = this.setupClass(Notification);
        this.Shipment = this.setupClass(Shipment);
        this.ShipmentItem = this.setupClass(ShipmentItem);
        this.ShipmentItemFulfillment = this.setupClass(ShipmentItemFulfillment);
        this.ShipmentMethod = this.setupClass(ShipmentMethod);
        this.ShipmentMethodVariation = this.setupClass(ShipmentMethodVariation);
        this.Domain = this.setupClass(Domain);
        this.ExchangeRate = this.setupClass(ExchangeRate);
        this.Invoice = this.setupClass(Invoice);
        this.Job = this.setupClass(Job);
        this.ComponentTag = this.setupClass(ComponentTag);
        this.Category = this.setupClass(Category);
        this.VariationField = this.setupClass(VariationField);
        this.InventoryUnitVariation = this.setupClass(InventoryUnitVariation);
        this.PhoneNumber = this.setupClass(PhoneNumber);
        this.QuoteItem = this.setupClass(QuoteItem);
        this.Menu = this.setupClass(Menu);
        this.Assignment = this.setupClass(Assignment);
        this.Draft = this.setupClass(Draft);
        this.DraftTemplate = this.setupClass(DraftTemplate);
        this.VariationsGroup = this.setupClass(VariationsGroup);
        this.EnrolledDomain = this.setupClass(EnrolledDomain);
        this.CompanyInvitation = this.setupClass(CompanyInvitation);
        this.Quote = this.setupClass(Quote);
        this.EmailAddress = this.setupClass(EmailAddress);
        this.SeoDomainPage = this.setupClass(SeoDomainPage);
        this.ProductionComment = this.setupClass(ProductionComment);
        this.Backup = this.setupClass(Backup);
        this.CountryTax = this.setupClass(CountryTax);
        this.ShortUrl = this.setupClass(ShortUrl);
        this.Product = this.setupClass(Product);
        this.SystemRole = this.setupClass(SystemRole);
        this.CartItem = this.setupClass(CartItem);
        this.UserCompany = this.setupClass(UserCompany);
        this.DomainTag = this.setupClass(DomainTag);
        this.VariationFieldsOption = this.setupClass(VariationFieldsOption);
        this.Address = this.setupClass(Address);
        this.Item = this.setupClass(Item);
        this.SupplyDomain = this.setupClass(SupplyDomain);
        this.DomainInvitation = this.setupClass(DomainInvitation);
        this.EmailCounter = this.setupClass(EmailCounter);
        this.Session = this.setupClass(Session);
        this.Bank = this.setupClass(Bank);
        this.Discount = this.setupClass(Discount);
        this.DiscountGroup = this.setupClass(DiscountGroup);
        this.Payment = this.setupClass(Payment);
        this.PaymentDevice = this.setupClass(PaymentDevice);
        this.Page = this.setupClass(Page);
        this.Cart = this.setupClass(Cart);
        this.CartShipmentGroup = this.setupClass(CartShipmentGroup);
        this.CartShipmentQuote = this.setupClass(CartShipmentQuote);
        this.MerchiFile = this.setupClass(MerchiFile);
        this.User = this.setupClass(User);
        this.JobComment = this.setupClass(JobComment);
        this.VariationOption = this.setupClass(VariationOption);
        this.MatchingInventory = this.setupClass(MatchingInventory);
        this.SubscriptionPlan = this.setupClass(SubscriptionPlan);
    }
    Merchi.prototype.setupClass = function (cls) {
        var result = cloneClass(cls, this);
        result.merchi = this;
        return result;
    };
    return Merchi;
}());
export { Merchi };
