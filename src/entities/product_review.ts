import { Entity } from '../entity.js';
import type { RequestOptions } from '../request.js';
import type { Domain } from './domain.js';
import type { Job } from './job.js';
import type { Product } from './product.js';

/** Create payload; the API expects ``jobId`` — pass ``job`` with at least ``id``. */
export interface ProductReviewCreateInput {
  job: { id: number };
  rating: number;
  title?: string | null;
  content?: string | null;
}

export interface ProductReviewPatchInput {
  status?: string;
  rejectionReason?: string | null;
  rating?: number;
  title?: string | null;
  content?: string | null;
}

/**
 * Post-purchase product review. List/create are nested under ``/products/:id/reviews/``;
 * updates use ``/product-reviews/:id/``. Do not use :meth:`Entity.create` / :meth:`Entity.list`
 * for this resource.
 *
 * API responses use ``jobId``, ``productId``, and ``domainId``; this entity maps those onto
 * ``job``, ``product``, and ``domain`` (minimal ``{ id }`` objects unless the API nests more).
 */
export class ProductReview extends Entity {
  protected static resourceName = 'product-reviews';
  protected static singularName = 'productReview';
  protected static pluralName = 'productReviews';

  @ProductReview.property()
  public id?: number;

  @ProductReview.property({ type: 'Product' })
  public product?: Product;

  @ProductReview.property({ type: 'Domain' })
  public domain?: Domain;

  @ProductReview.property({ type: Number })
  public authorUserId?: number;

  @ProductReview.property({ type: String })
  public authorName?: string | null;

  @ProductReview.property({ type: 'Job' })
  public job?: Job;

  @ProductReview.property({ type: Number })
  public rating?: number;

  @ProductReview.property({ type: String })
  public title?: string | null;

  @ProductReview.property({ type: String })
  public content?: string | null;

  @ProductReview.property({ type: String })
  public status?: string;

  @ProductReview.property({ type: Number })
  public purchaseInvoiceId?: number | null;

  /** ISO 8601 string from the API. */
  @ProductReview.property({ type: String })
  public submittedAt?: string | null;

  /** ISO 8601 string from the API. */
  @ProductReview.property({ type: String })
  public updatedAt?: string | null;

  @ProductReview.property({ type: String })
  public rejectionReason?: string | null;

  /**
   * Map flat API fields (``jobId``, ``productId``, ``domainId``) to nested
   * ``job`` / ``product`` / ``domain`` objects before :meth:`Entity.fromJson`.
   */
  public static normalizeApiJson(json: any): any {
    if (json === null || json === undefined || typeof json !== 'object') {
      return json;
    }
    const row: any = { ...json };
    if (row.jobId !== undefined && row.job === undefined) {
      if (row.jobId != null) {
        row.job = { id: row.jobId };
      }
      delete row.jobId;
    }
    if (row.productId !== undefined && row.product === undefined) {
      if (row.productId != null) {
        row.product = { id: row.productId };
      }
      delete row.productId;
    }
    if (row.domainId !== undefined && row.domain === undefined) {
      if (row.domainId != null) {
        row.domain = { id: row.domainId };
      }
      delete row.domainId;
    }
    return row;
  }

  /**
   * Domain managers/admins: list reviews for a product.
   */
  public static listForProduct(
    this: typeof ProductReview,
    productId: number,
    options?: { withRights?: boolean }
  ): Promise<ProductReview[]> {
    const Constructor = this;
    const resource = `/products/${productId}/reviews/`;
    const fetchOptions: RequestOptions = { method: 'GET' };
    fetchOptions.query = [];
    if (!(options && options.withRights)) {
      fetchOptions.query.push(['skip_rights', 'y']);
    }
    return Constructor.merchi.authenticatedFetch(resource, fetchOptions).then(
      (data: any) => {
        const raw = data.productReviews ?? [];
        return raw.map((row: any) => {
          const e: ProductReview = new Constructor() as ProductReview;
          e.fromJson(ProductReview.normalizeApiJson(row));
          return e;
        });
      }
    );
  }

  /**
   * Buyer: create a review for the catalog ``productId`` (master product).
   * ``body.job.id`` must be a completed job whose line item resolves to this product.
   */
  public static createForProduct(
    this: typeof ProductReview,
    productId: number,
    body: ProductReviewCreateInput,
    options?: { withRights?: boolean }
  ): Promise<ProductReview> {
    const Constructor = this;
    const resource = `/products/${productId}/reviews/`;
    const wire: Record<string, unknown> = {
      jobId: body.job.id,
      rating: body.rating,
    };
    if (body.title !== undefined) {
      wire.title = body.title;
    }
    if (body.content !== undefined) {
      wire.content = body.content;
    }
    const fetchOptions: RequestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(wire),
    };
    fetchOptions.query = [];
    if (!(options && options.withRights)) {
      fetchOptions.query.push(['skip_rights', 'y']);
    }
    return Constructor.merchi.authenticatedFetch(resource, fetchOptions).then(
      (data: any) => {
        const e: ProductReview = new Constructor() as ProductReview;
        e.fromJson(ProductReview.normalizeApiJson(data.productReview));
        return e;
      }
    );
  }

  /**
   * Partial update (moderation or author edit). Uses ``multipart/form-data`` fields
   * matching the Merchi API.
   */
  public patch(
    payload: ProductReviewPatchInput,
    options?: { withRights?: boolean }
  ): Promise<this> {
    const id = this.id;
    if (id === undefined) {
      throw new Error('ProductReview.id is required to patch');
    }
    const resource = `/product-reviews/${String(id)}/`;
    const form = new FormData();
    if (payload.status !== undefined) {
      form.set('status', payload.status);
    }
    if (payload.rejectionReason !== undefined) {
      form.set('rejectionReason', payload.rejectionReason ?? '');
    }
    if (payload.rating !== undefined) {
      form.set('rating', String(payload.rating));
    }
    if (payload.title !== undefined) {
      form.set('title', payload.title ?? '');
    }
    if (payload.content !== undefined) {
      form.set('content', payload.content ?? '');
    }
    const fetchOptions: RequestOptions = { method: 'PATCH', body: form };
    fetchOptions.query = [];
    if (!(options && options.withRights)) {
      fetchOptions.query.push(['skip_rights', 'y']);
    }
    const singularName = (this.constructor as typeof ProductReview)
      .singularName;
    return this.merchi.authenticatedFetch(resource, fetchOptions).then(
      (data: any) => {
        this.fromJson(ProductReview.normalizeApiJson(data[singularName]));
        this.cleanDirty();
        return this;
      }
    );
  }
}
