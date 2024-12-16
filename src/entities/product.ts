import * as _ from 'lodash';
import { CartItem, CartItemJson } from './cart_item.js';
import { Category, CategoryJson } from './category.js';
import { Company, CompanyJson } from './company.js';
import { Component, ComponentJson } from './component.js';
import { CountryTax, CountryTaxJson } from './country_tax.js';
import { DiscountGroup, DiscountGroupJson } from './discount_group.js';
import { Domain, DomainJson } from './domain.js';
import { DomainTag, DomainTagJson } from './domain_tag.js';
import { DraftTemplate, DraftTemplateJson } from './draft_template.js';
import { Entity } from '../entity.js';
import { MerchiFile, MerchiFileJson } from './file.js';
import { InternalTag, InternalTagJson } from './internal_tag.js';
import { Inventory, InventoryJson } from './inventory.js';
import { InventoryGroup, InventoryGroupJson } from './inventory_group.js';
import { SupplyDomain, SupplyDomainJson } from './supply_domain.js';
import { User, UserJson } from './user.js';
import { VariationField, VariationFieldJson } from './variation_field.js';
import { SeoDomainPage, SeoDomainPageJson } from './seo_domain_page.js';
import { ShipmentMethod, ShipmentMethodJson } from './shipment_method.js';
import { AutoAssignProductionOnAction } from '../constants/auto_assign_production_on_actions.js';
import { Job, JobJson } from './job.js';

export class Product extends Entity {
  protected static resourceName = 'products';
  protected static singularName = 'product';
  protected static pluralName = 'products';

  @Product.property({type: Date})
  public archived?: Date | null;

  @Product.property()
  public id?: number;

  @Component.property({type: Date})
  public created?: Date;

  @Component.property({type: Date})
  public updated?: Date;

  @Component.property({type: 'User'})
  public createdBy?: User | null;

  @Component.property({type: 'User'})
  public updatedBy?: User | null;

  @Product.property()
  public productType?: number;

  @Product.property()
  public minimum?: number;

  @Product.property()
  public minimumPerGroup?: boolean;

  @Product.property()
  public deliveryDaysNormal?: number;

  @Product.property()
  public unitPrice?: number;

  @Product.property({embeddedByDefault: false})
  public buyUnitPrice?: number;

  @Product.property({type: 'DiscountGroup'})
  public unitPriceDiscountGroup?: DiscountGroup | null;

  @Product.property({arrayType: 'ShipmentMethod'})
  public shipmentMethods?: ShipmentMethod[];

  @Product.property()
  public margin?: number;

  @Product.property({type: Number})
  public unitWeight?: number | null;

  @Product.property({type: Number})
  public unitHeight?: number | null;

  @Product.property({type: Number})
  public unitWidth?: number | null;

  @Product.property({type: Number})
  public unitDepth?: number | null;

  @Product.property()
  public name?: string;

  @Product.property()
  public country?: string;

  @Product.property()
  public currency?: string;

  @Product.property({type: String})
  public description?: string | null;

  @Product.property({type: String})
  public notes?: string | null;

  @Product.property({type: String})
  public internalUseNotes?: string;

  @Product.property({type: String})
  public internalUseAiContext?: string;

  @Product.property({type: String})
  public aiContext?: string;

  @Product.property({type: String})
  public shopifyProductId?: string | null;

  @Product.property({type: String})
  public spProductId?: string | null;

  @Product.property()
  public useCompanyShipmentMethods?: boolean;

  @Product.property()
  public dropShipment?: boolean;

  @Product.property()
  public needsDrafting?: boolean;

  @Product.property()
  public needsProduction?: boolean;

  @Product.property()
  public needsShipping?: boolean;

  @Product.property()
  public needsInvoicing?: boolean;

  @Product.property()
  public needsInventory?: boolean;

  @Product.property({type: Date})
  public featureDeadline?: Date;

  @Product.property()
  public showFeatureDeadline?: boolean;

  @Product.property()
  public showPublic?: boolean;

  @Product.property()
  public showGroupBuyStatus?: boolean;

  @Product.property({type: Number})
  public groupBuyStatus?: number | null;

  @Product.property()
  public acceptSquare?: boolean;

  @Product.property()
  public acceptStripe?: boolean;

  @Product.property()
  public acceptPaypal?: boolean;

  @Product.property()
  public acceptUtrust?: boolean;

  @Product.property()
  public acceptBankTransfer?: boolean;

  @Product.property()
  public acceptPhonePayment?: boolean;

  @Product.property()
  public allowAddToCart?: boolean;

  @Product.property()
  public allowAutomaticPaymentSupply?: boolean;

  @Product.property()
  public allowGroupBuy?: boolean;

  @Product.property()
  public allowPaymentUpfront?: boolean;

  @Product.property()
  public allowQuotation?: boolean;

  @Product.property()
  public allowChainedInventoryCreation?: boolean;

  @Product.property()
  public allowClientDraftContribution?: boolean;

  @Product.property()
  public chainedInventoryHandlingUnitPrice?: number;

  @Product.property()
  public bestPrice?: number;

  @Product.property()
  public unitVolume?: number;

  @Product.property({arrayType: 'Category'})
  public categories?: Category[];

  @Product.property({arrayType: 'Category'})
  public platformCategories?: Category[];

  @Product.property({arrayType: 'DiscountGroup'})
  public discountGroups?: DiscountGroup[];

  @Product.property()
  public domain?: Domain;

  @Product.property({type: CountryTax})
  public taxType?: CountryTax | null;

  @Product.property({type: Product})
  public originalProduct?: Product | null;

  @Product.property({type: Product})
  public clonedFromProduct?: Product | null;

  @Product.property({type: Product})
  public chainedSupplierProduct?: Product | null;

  @Product.property({arrayType: 'Product'})
  public chainedSellerProducts?: Product[];

  @Product.property({type: Product})
  public chainedInventorySupplierProduct?: Product | null;

  @Product.property({arrayType: 'Product'})
  public chainedInventorySellerProducts?: Product[];

  @Product.property({type: Component})
  public component?: Component | null;

  @Product.property({arrayType: 'MerchiFile'})
  public images?: MerchiFile[];

  @Product.property({arrayType: 'MerchiFile'})
  public publicFiles?: MerchiFile[];

  @Product.property({arrayType: 'MerchiFile'})
  public productionFiles?: MerchiFile[];

  @Product.property({arrayType: 'VariationField'})
  public groupVariationFields?: VariationField[];

  @Product.property({arrayType: 'VariationField'})
  public independentVariationFields?: VariationField[];

  @Product.property({arrayType: 'DomainTag'})
  public tags?: DomainTag[];

  @Product.property({arrayType: 'InternalTag'})
  public internalTags?: InternalTag[];

  @Product.property({arrayType: 'SeoDomainPage'})
  public seoDomainPages?: SeoDomainPage[];

  @Product.property({type: MerchiFile})
  public featureImage?: MerchiFile | null;

  @Product.property({type: 'Job'})
  public createdByJob?: Job | null;

  @Product.property({type: 'Job'})
  public defaultJob?: Job | null;

  @Product.property({arrayType: 'Company', jsonName: 'saved_by_companies'})
  public savedByCompanies?: Company[];

  @Product.property({arrayType: 'SupplyDomain'})
  public suppliedByDomains?: SupplyDomain[];

  @Product.property()
  public autoAssignProductionOnAction?: AutoAssignProductionOnAction;

  @Product.property({arrayType: 'SupplyDomain'})
  public supplyDomains?: SupplyDomain[];

  @Product.property()
  public inventoriesOpen?: boolean;

  @Product.property()
  public supplyChainDisabled?: boolean;

  @Product.property({arrayType: 'Inventory'})
  public inventories?: Inventory[];

  @Product.property({arrayType: 'InventoryGroup'})
  public inventoryGroup?: InventoryGroup[];

  @Product.property({arrayType: 'CartItem'})
  public cartItems?: CartItem[];

  @Product.property({arrayType: 'Job'})
  public jobs?: Job[];

  @Product.property({arrayType: 'Job'})
  public supplyChainRequestJobs?: Job[];

  @Product.property({arrayType: 'User', jsonName: 'saved_by_users'})
  public savedByUsers?: User[];

  @Product.property({arrayType: 'User'})
  public suppliers?: User[];

  @Product.property({arrayType: 'DraftTemplate'})
  public draftTemplates?: DraftTemplate[];

  public duplicate = () => {
    /* create a clone of this product on the backend, returning it. */
    const constructor = this.constructor as typeof Product;
    const resourceName = constructor.resourceName;
    const singularName = constructor.singularName;
    const resource = `/${resourceName}/${String(this.id)}/copy/`;
    const fetchOptions = {method: 'POST'};
    return this.merchi.authenticatedFetch(resource, fetchOptions).
      then((data: any) => {
        const product = new this.merchi.Product();
        product.fromJson(data[singularName]);
        return product;
      });
  };

  public primaryImage = () => {
    if (this.featureImage === undefined) {
      throw new Error('featureImage is undefined, did you forget to embed it?');
    }
    if (this.images === undefined) {
      throw new Error('images is undefined, did you forget to embed it?');
    }
    if (this.featureImage !== null) {
      return this.featureImage;
    }
    if (this.images.length > 0) {
      return this.images[0];
    }
    return null;
  };

  public hasGroupVariationFields = () => {
    if (this.groupVariationFields === undefined) {
      const err = 'groupVariationFields is undefined, did you forget to embed' +
        ' it?';
      throw new Error(err);
    }
    return this.groupVariationFields.length > 0;
  };

  public hasIndependentVariationFields = () => {
    if (this.independentVariationFields === undefined) {
      const err = 'independentVariationFields is undefined, did you forget to' +
        ' embed it?';
      throw new Error(err);
    }
    return this.independentVariationFields.length > 0;
  };

  public allVariationFields = () => {
    if (this.groupVariationFields === undefined) {
      const err = 'groupVariationFields is undefined, did you forget to embed' +
        ' it?';
      throw new Error(err);
    }
    if (this.independentVariationFields === undefined) {
      const err = 'independentVariationFields is undefined, did you forget to' +
        ' embed it?';
      throw new Error(err);
    }
    const result: VariationField[] = [];
    return result.concat(this.groupVariationFields,
      this.independentVariationFields);
  };

  public buildEmptyVariations = () => {
    if (this.independentVariationFields === undefined) {
      const err = 'independentVariationFields is undefined, did you forget to' +
        ' embed it?';
      throw new Error(err);
    }
    const iVF: VariationField[] =
      _.orderBy(this.independentVariationFields, ['position'], ['asc']);
    return iVF.map(field => field.buildEmptyVariation());
  };

  public buildEmptyVariationGroup = () => {
    if (this.groupVariationFields === undefined) {
      const err = 'groupVariationFields is undefined, did you forget to embed' +
        ' it?';
      throw new Error(err);
    }
    const result = new this.merchi.VariationsGroup();
    const variations = [];
    let cost = 0;
    const sortedFields = _.orderBy(
      this.groupVariationFields, ['position'], ['asc']);
    result.quantity = 0;
    for (const variationField of sortedFields) {
      const empty = variationField.buildEmptyVariation();
      variations.push(empty);
      cost += empty.cost as number;
    }
    result.groupCost = cost;
    result.variations = variations;
    return result;
  };

  public removeVariationField = (variationField: VariationField) => {
    if (variationField.independent === undefined) {
      throw new Error('variation.independent is undefined, did you ' +
                      'forget to embed it?');
    }
    if (this.independentVariationFields === undefined) {
      const err = 'independentVariationFields is undefined, did you forget to' +
        ' embed it?';
      throw new Error(err);
    }
    if (this.groupVariationFields === undefined) {
      const err = 'groupVariationFields is undefined, did you forget to embed' +
        ' it?';
      throw new Error(err);
    }
    const variationFields = variationField.independent ?
      this.independentVariationFields : this.groupVariationFields;
    const index = variationFields.findIndex(v => {
      if (v.id === undefined) {
        throw new Error('variation id is undefined, did you forget to ' +
          'embed it?');
      }
      return v.id === variationField.id;
    });
    return variationFields.splice(index, 1);
  };
}

 // based on above model, generate a JSON version type
export type ProductJson = {
  id: number;
  createdByJob: JobJson | null;
  archived: string | null;
  created: string;
  updated: string;
  createdBy: UserJson | null;
  updatedBy: UserJson | null;
  productType: number;
  minimum: number;
  minimumPerGroup: boolean;
  deliveryDaysNormal: number;
  unitPrice: number;
  buyUnitPrice: number;
  unitPriceDiscountGroup: DiscountGroupJson | null;
  shipmentMethods: ShipmentMethodJson[];
  margin: number;
  unitWeight: number | null;
  unitHeight: number | null;
  unitWidth: number | null;
  unitDepth: number | null;
  name: string;
  country: string;
  currency: string;
  description: string | null;
  notes: string | null;
  internalUseNotes: string;
  internalUseAiContext: string;
  aiContext: string;
  shopifyProductId: string | null;
  spProductId: string | null;
  useCompanyShipmentMethods: boolean;
  dropShipment: boolean;
  needsDrafting: boolean;
  needsProduction: boolean;
  needsShipping: boolean;
  needsInvoicing: boolean;
  needsInventory: boolean;
  featureDeadline: string;
  showFeatureDeadline: boolean;
  showPublic: boolean;
  showGroupBuyStatus: boolean;
  groupBuyStatus: number | null;
  acceptSquare: boolean;
  acceptStripe: boolean;
  acceptPaypal: boolean;
  acceptUtrust: boolean;
  acceptBankTransfer: boolean;
  acceptPhonePayment: boolean;
  allowAddToCart: boolean;
  allowAutomaticPaymentSupply: boolean;
  allowGroupBuy: boolean;
  allowPaymentUpfront: boolean;
  allowQuotation: boolean;
  allowChainedInventoryCreation: boolean;
  allowClientDraftContribution: boolean;
  chainedInventoryHandlingUnitPrice: number;
  bestPrice: number;
  unitVolume: number;
  categories: CategoryJson[];
  platformCategories: CategoryJson[];
  discountGroups: DiscountGroupJson[];
  domain: DomainJson;
  taxType: CountryTaxJson | null;
  originalProduct: ProductJson | null;
  clonedFromProduct: ProductJson | null;
  chainedSupplierProduct: ProductJson | null;
  chainedSellerProducts: ProductJson[];
  chainedInventorySupplierProduct: ProductJson | null;
  chainedInventorySellerProducts: ProductJson[];
  component: ComponentJson | null;
  images: MerchiFileJson[];
  publicFiles: MerchiFileJson[];
  productionFiles: MerchiFileJson[];
  groupVariationFields: VariationFieldJson[];
  independentVariationFields: VariationFieldJson[];
  tags: DomainTagJson[];
  internalTags: InternalTagJson[];
  seoDomainPages: SeoDomainPageJson[];
  featureImage: MerchiFileJson | null;
  defaultJob: JobJson | null;
  savedByCompanies: CompanyJson[];
  suppliedByDomains: SupplyDomainJson[];
  autoAssignProductionOnAction: AutoAssignProductionOnAction;
  supplyDomains: SupplyDomainJson[];
  inventoriesOpen: boolean;
  supplyChainDisabled: boolean;
  inventories: InventoryJson[];
  inventoryGroup: InventoryGroupJson[];
  cartItems: CartItemJson[];
  jobs: JobJson[];
  supplyChainRequestJobs: JobJson[];
  savedByUsers: UserJson[];
  suppliers: UserJson[];
  draftTemplates: DraftTemplateJson[];
}
