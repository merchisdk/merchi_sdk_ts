import {
  Entity,
  // eslint-disable-next-line no-unused-vars
  EmbedDescriptor,
} from './entity.js';
import { AutomaticPaymentRelationship } from './entities/automatic_payment_relationship.js';
import { Session } from './entities/session.js';
import { JobComment } from './entities/job_comment.js';
import { Domain } from './entities/domain.js';
import { ExchangeRate } from './entities/exchange_rate.js';
import { Job } from './entities/job.js';
import { Menu } from './entities/menu.js';
import { VariationField } from './entities/variation_field.js';
import { VariationOption } from './entities/variation_option.js';
import { ProductionComment } from './entities/production_comment.js';
import { Product } from './entities/product.js';
import { InternalTag } from './entities/internal_tag.js';
import { Inventory } from './entities/inventory.js';
import { InventoryGroup } from './entities/inventory_group.js';
import { QuoteItem } from './entities/quote_item.js';
import { Category } from './entities/category.js';
import { Invoice } from './entities/invoice.js';
import { UserCompany } from './entities/user_company.js';
import { InventoryUnitVariation } from './entities/inventory_unit_variation.js';
import { VariationFieldsOption } from './entities/variation_fields_option.js';
import { Bank } from './entities/bank.js';
import { Shipment } from './entities/shipment.js';
import { ShipmentItem } from './entities/shipment_item.js';
import { ShipmentItemFulfillment } from './entities/shipment_item_fulfillment.js';
import { ShipmentMethod } from './entities/shipment_method.js';
import { ShipmentMethodVariation } from './entities/shipment_method_variation.js';
import { DomainInvitation } from './entities/domain_invitation.js';
import { EmailCounter } from './entities/email_counter.js';
import { MenuItem } from './entities/menu_item.js';
import { SupplyDomain } from './entities/supply_domain.js';
import { Cart } from './entities/cart.js';
import { CartShipmentGroup } from './entities/cart_shipment_group.js';
import { CartShipmentQuote } from './entities/cart_shipment_quote.js';
import { Theme } from './entities/theme.js';
import { ThemeCssSetting } from './entities/theme_css_setting.js';
import { Component } from './entities/component.js';
import { ComponentVersion } from './entities/component_version.js';
import { MerchiFile } from './entities/file.js';
import { EmailAddress } from './entities/email_address.js';
import { SeoDomainPage } from './entities/seo_domain_page.js';
import { ShortUrl } from './entities/short_url.js';
import { VariationsGroup } from './entities/variations_group.js';
import { Quote } from './entities/quote.js';
import { Draft } from './entities/draft.js';
import { DraftPreview } from './entities/draft_preview.js';
import { DraftPreviewLayer } from './entities/draft_preview_layer.js';
import { DraftTemplate } from './entities/draft_template.js';
import { Discount } from './entities/discount.js';
import { DiscountGroup } from './entities/discount_group.js';
import { User } from './entities/user.js';
import { Company } from './entities/company.js';
import { ComponentTag } from './entities/component_tag.js';
import { EnrolledDomain } from './entities/enrolled_domain.js';
import { CountryTax } from './entities/country_tax.js';
import { Item } from './entities/item.js';
import { DomainTag } from './entities/domain_tag.js';
import { DraftComment } from './entities/draft_comment.js';
import { Notification } from './entities/notification.js';
import { Payment } from './entities/payment.js';
import { Page } from './entities/page.js';
import { CompanyInvitation } from './entities/company_invitation.js';
import { SystemRole } from './entities/system_role.js';
import { PaymentDevice } from './entities/payment_device.js';
import { PhoneNumber } from './entities/phone_number.js';
import { Variation } from './entities/variation.js';
import { CartItem } from './entities/cart_item.js';
import { Address } from './entities/address.js';
import { Assignment } from './entities/assignment.js';
import { MatchingInventory } from './entities/matching_inventory.js';
import { SubscriptionPlan } from './entities/subscription_plan.js';
import { generateUUID } from './uuid.js';
// eslint-disable-next-line no-unused-vars
import { RequestOptions, apiFetch, apiFetchWithProgress } from './request.js';
import { getCookie } from './cookie.js';

// the type of classes
export interface Type<T, A extends any[]> extends Function {
  new (...args: A): T;
}

function cloneClass<T, A extends []>(
  original: Type<T, A>,
  arg: any
): Type<T, A> {
  // copy the constructor, but use the empty object as `this`
  const copy = original.bind({}, arg);
  // pick up any static members (this is shallow, the members are not copied)
  Object.assign(copy, original);
  return copy;
}

interface UserRequestOptions {
  embed?: EmbedDescriptor;
}

export const API_VERSION = 'v6';

export class Merchi {
  public id: string = generateUUID();

  public sessionToken?: string;
  public invoiceToken?: string;
  public clientToken?: string;
  public cartToken?: string;
  public readonly backendUri: string;

  public AutomaticPaymentRelationship: typeof AutomaticPaymentRelationship;
  public Notification: typeof Notification;
  public EnrolledDomain: typeof EnrolledDomain;
  public SystemRole: typeof SystemRole;
  public UserCompany: typeof UserCompany;
  public Variation: typeof Variation;
  public CountryTax: typeof CountryTax;
  public MenuItem: typeof MenuItem;
  public VariationField: typeof VariationField;
  public Assignment: typeof Assignment;
  public InternalTag: typeof InternalTag;
  public Inventory: typeof Inventory;
  public InventoryGroup: typeof InventoryGroup;
  public JobComment: typeof JobComment;
  public VariationOption: typeof VariationOption;
  public SupplyDomain: typeof SupplyDomain;
  public ProductionComment: typeof ProductionComment;
  public DraftComment: typeof DraftComment;
  public Shipment: typeof Shipment;
  public ShipmentItem: typeof ShipmentItem;
  public ShipmentItemFulfillment: typeof ShipmentItemFulfillment;
  public ShipmentMethod: typeof ShipmentMethod;
  public ShipmentMethodVariation: typeof ShipmentMethodVariation;
  public Draft: typeof Draft;
  public DraftPreview: typeof DraftPreview;
  public DraftPreviewLayer: typeof DraftPreviewLayer;
  public DraftTemplate: typeof DraftTemplate;
  public VariationFieldsOption: typeof VariationFieldsOption;
  public Category: typeof Category;
  public MerchiFile: typeof MerchiFile;
  public Invoice: typeof Invoice;
  public CompanyInvitation: typeof CompanyInvitation;
  public Bank: typeof Bank;
  public Job: typeof Job;
  public DomainInvitation: typeof DomainInvitation;
  public Product: typeof Product;
  public DomainTag: typeof DomainTag;
  public EmailAddress: typeof EmailAddress;
  public PhoneNumber: typeof PhoneNumber;
  public Company: typeof Company;
  public Address: typeof Address;
  public ComponentTag: typeof ComponentTag;
  public Discount: typeof Discount;
  public DiscountGroup: typeof DiscountGroup;
  public User: typeof User;
  public Session: typeof Session;
  public Theme: typeof Theme;
  public ThemeCssSetting: typeof ThemeCssSetting;
  public Item: typeof Item;
  public EmailCounter: typeof EmailCounter;
  public SeoDomainPage: typeof SeoDomainPage;
  public Domain: typeof Domain;
  public ExchangeRate: typeof ExchangeRate;
  public Payment: typeof Payment;
  public PaymentDevice: typeof PaymentDevice;
  public Page: typeof Page;
  public ShortUrl: typeof ShortUrl;
  public CartItem: typeof CartItem;
  public InventoryUnitVariation: typeof InventoryUnitVariation;
  public VariationsGroup: typeof VariationsGroup;
  public Menu: typeof Menu;
  public Cart: typeof Cart;
  public CartShipmentGroup: typeof CartShipmentGroup;
  public CartShipmentQuote: typeof CartShipmentQuote;
  public Quote: typeof Quote;
  public Component: typeof Component;
  public ComponentVersion : typeof ComponentVersion;
  public QuoteItem: typeof QuoteItem;
  public MatchingInventory: typeof MatchingInventory;
  public SubscriptionPlan: typeof SubscriptionPlan;

  public setupClass(cls: typeof Entity) {
    const result = cloneClass(cls, this) as typeof Entity;
    result.merchi = this;
    return result;
  }

  public constructor(
    sessionToken?: string,
    clientToken?: string,
    invoiceToken?: string,
    cartToken?: string,
    backendUri?: string
  ) {
    if (sessionToken) {
      this.sessionToken = sessionToken;
    } else {
      this.sessionToken = getCookie('session_token');
    }

    if (clientToken) {
      this.clientToken = clientToken;
    } else {
      this.clientToken = getCookie('client_token');
    }

    if (invoiceToken) {
      this.invoiceToken = invoiceToken;
    } else {
      this.invoiceToken = getCookie('invoice_token');
    }

    if (cartToken) {
      this.cartToken = cartToken;
    } else {
      this.cartToken = getCookie('cart_token');
    }

    let determinedBaseUri = backendUri;
    if (!determinedBaseUri) {
      const clientBackendUri = typeof window !== 'undefined' &&
        (window as any).merchiBackendUri ?
        (window as any).merchiBackendUri : undefined;
      if (clientBackendUri) {
        determinedBaseUri = clientBackendUri;
      }
    }
    if (!determinedBaseUri) {
      const envBackendUri = typeof process !== 'undefined' &&
        process.env.MERCHI_BACKEND_URI ?
        process.env.MERCHI_BACKEND_URI : undefined;
      if (envBackendUri) {
        determinedBaseUri = envBackendUri;
      }
    }
    if (!determinedBaseUri) {
      determinedBaseUri = 'https://api.merchi.co/';
    }

    // Ensure determinedBaseUri ends with a slash
    if (!determinedBaseUri.endsWith('/')) {
      determinedBaseUri += '/';
    }

    this.backendUri = determinedBaseUri;

    // re-export configured versions of all classes
    this.AutomaticPaymentRelationship = this.setupClass(
      AutomaticPaymentRelationship
    ) as typeof AutomaticPaymentRelationship;
    this.Variation = this.setupClass(Variation) as typeof Variation;
    this.DraftComment = this.setupClass(DraftComment) as typeof DraftComment;
    this.Component = this.setupClass(Component) as typeof Component;
    this.ComponentVersion = this.setupClass(ComponentVersion) as typeof ComponentVersion;
    this.Theme = this.setupClass(Theme) as typeof Theme;
    this.ThemeCssSetting = this.setupClass(ThemeCssSetting) as typeof ThemeCssSetting;
    this.Company = this.setupClass(Company) as typeof Company;
    this.MenuItem = this.setupClass(MenuItem) as typeof MenuItem;
    this.InternalTag = this.setupClass(InternalTag) as typeof InternalTag;
    this.Inventory = this.setupClass(Inventory) as typeof Inventory;
    this.InventoryGroup = this.setupClass(InventoryGroup) as typeof InventoryGroup;
    this.Notification = this.setupClass(Notification) as typeof Notification;
    this.Shipment = this.setupClass(Shipment) as typeof Shipment;
    this.ShipmentItem = this.setupClass(ShipmentItem) as typeof ShipmentItem;
    this.ShipmentItemFulfillment = this.setupClass(
      ShipmentItemFulfillment
    ) as typeof ShipmentItemFulfillment;
    this.ShipmentMethod = this.setupClass(
      ShipmentMethod
    ) as typeof ShipmentMethod;
    this.ShipmentMethodVariation = this.setupClass(
      ShipmentMethodVariation
    ) as typeof ShipmentMethodVariation;
    this.Domain = this.setupClass(Domain) as typeof Domain;
    this.ExchangeRate = this.setupClass(ExchangeRate) as typeof ExchangeRate;
    this.Invoice = this.setupClass(Invoice) as typeof Invoice;
    this.Job = this.setupClass(Job) as typeof Job;
    this.ComponentTag = this.setupClass(ComponentTag) as typeof ComponentTag;
    this.Category = this.setupClass(Category) as typeof Category;
    this.VariationField = this.setupClass(
      VariationField
    ) as typeof VariationField;
    this.InventoryUnitVariation = this.setupClass(
      InventoryUnitVariation
    ) as typeof InventoryUnitVariation;
    this.PhoneNumber = this.setupClass(PhoneNumber) as typeof PhoneNumber;
    this.QuoteItem = this.setupClass(QuoteItem) as typeof QuoteItem;
    this.Menu = this.setupClass(Menu) as typeof Menu;
    this.Assignment = this.setupClass(Assignment) as typeof Assignment;
    this.Draft = this.setupClass(Draft) as typeof Draft;
    this.DraftPreview = this.setupClass(DraftPreview) as typeof DraftPreview;
    this.DraftPreviewLayer = this.setupClass(DraftPreviewLayer) as typeof DraftPreviewLayer;
    this.DraftTemplate = this.setupClass(DraftTemplate) as typeof DraftTemplate;
    this.VariationsGroup = this.setupClass(
      VariationsGroup
    ) as typeof VariationsGroup;
    this.EnrolledDomain = this.setupClass(
      EnrolledDomain
    ) as typeof EnrolledDomain;
    this.CompanyInvitation = this.setupClass(
      CompanyInvitation
    ) as typeof CompanyInvitation;
    this.Quote = this.setupClass(Quote) as typeof Quote;
    this.EmailAddress = this.setupClass(EmailAddress) as typeof EmailAddress;
    this.SeoDomainPage = this.setupClass(SeoDomainPage) as typeof SeoDomainPage;
    this.ProductionComment = this.setupClass(
      ProductionComment
    ) as typeof ProductionComment;
    this.CountryTax = this.setupClass(CountryTax) as typeof CountryTax;
    this.ShortUrl = this.setupClass(ShortUrl) as typeof ShortUrl;
    this.Product = this.setupClass(Product) as typeof Product;
    this.SystemRole = this.setupClass(SystemRole) as typeof SystemRole;
    this.CartItem = this.setupClass(CartItem) as typeof CartItem;
    this.UserCompany = this.setupClass(UserCompany) as typeof UserCompany;
    this.DomainTag = this.setupClass(DomainTag) as typeof DomainTag;
    this.VariationFieldsOption = this.setupClass(
      VariationFieldsOption
    ) as typeof VariationFieldsOption;
    this.Address = this.setupClass(Address) as typeof Address;
    this.Item = this.setupClass(Item) as typeof Item;
    this.SupplyDomain = this.setupClass(SupplyDomain) as typeof SupplyDomain;
    this.DomainInvitation = this.setupClass(
      DomainInvitation
    ) as typeof DomainInvitation;
    this.EmailCounter = this.setupClass(EmailCounter) as typeof EmailCounter;
    this.Session = this.setupClass(Session) as typeof Session;
    this.Bank = this.setupClass(Bank) as typeof Bank;
    this.Discount = this.setupClass(Discount) as typeof Discount;
    this.DiscountGroup = this.setupClass(DiscountGroup) as typeof DiscountGroup;
    this.Payment = this.setupClass(Payment) as typeof Payment;
    this.PaymentDevice = this.setupClass(PaymentDevice) as typeof PaymentDevice;
    this.Page = this.setupClass(Page) as typeof Page;
    this.Cart = this.setupClass(Cart) as typeof Cart;
    this.CartShipmentGroup = this.setupClass(
      CartShipmentGroup
    ) as typeof CartShipmentGroup;
    this.CartShipmentQuote = this.setupClass(
      CartShipmentQuote
    ) as typeof CartShipmentQuote;
    this.MerchiFile = this.setupClass(MerchiFile) as typeof MerchiFile;
    this.User = this.setupClass(User) as typeof User;
    this.JobComment = this.setupClass(JobComment) as typeof JobComment;
    this.VariationOption = this.setupClass(
      VariationOption
    ) as typeof VariationOption;
    this.MatchingInventory = this.setupClass(
      MatchingInventory
    ) as typeof MatchingInventory;
    this.SubscriptionPlan = this.setupClass(
      SubscriptionPlan
    ) as typeof SubscriptionPlan;
  }

  public authenticatedFetch = (
    resource: string,
    options: RequestOptions,
    expectEmptyResponse?: boolean
  ) => {
    if (!options.query) {
      /* istanbul ignore next */
      options.query = [];
    }
    if (this.sessionToken) {
      /* istanbul ignore next */
      options.query.push(['session_token', this.sessionToken]);
    }
    if (this.clientToken) {
      /* istanbul ignore next */
      options.query.push(['client_token', this.clientToken]);
    }
    if (this.invoiceToken) {
      /* istanbul ignore next */
      options.query.push(['invoice_token', this.invoiceToken]);
    }
    if (this.cartToken) {
      /* istanbul ignore next */
      options.query.push(['cart_token', this.cartToken]);
    }
    // Pass the full backendUri, and resource is now just the endpoint
    return apiFetch(this.backendUri, resource, options, expectEmptyResponse);
  };

  /* istanbul ignore next */
  public authenticatedFetchWithProgress = (
    resource: string,
    options: RequestOptions,
    progressCallback?: (progress: number) => void
  ) => {
    if (!options.query) {
      options.query = [];
    }
    if (this.sessionToken) {
      options.query.push(['session_token', this.sessionToken]);
    }
    if (this.clientToken) {
      options.query.push(['client_token', this.clientToken]);
    }
    if (this.invoiceToken) {
      options.query.push(['invoice_token', this.invoiceToken]);
    }
    if (this.cartToken) {
      options.query.push(['cart_token', this.cartToken]);
    }
    // Pass the full backendUri, and resource is now just the endpoint
    return apiFetchWithProgress(this.backendUri, resource, options, progressCallback);
  };

  public getCurrentUser = (options?: UserRequestOptions) => {
    const { embed = {} } = options || {};
    const defaultEmbed = { user: { enrolledDomains: { domain: {} } } };
    if (!this.sessionToken) {
      return Promise.resolve(null);
    }
    return this.Session.get(this.sessionToken, {
      embed: { ...defaultEmbed, ...embed },
    }).then((session: any) => session.user);
  };
}
