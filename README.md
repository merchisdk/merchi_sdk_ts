# Merchi TypeScript SDK

A TypeScript SDK for interacting with the Merchi API.

[![npm version](https://img.shields.io/npm/v/merchi_sdk_ts.svg)](https://www.npmjs.com/package/merchi_sdk_ts)
[![License: GPL-3.0](https://img.shields.io/badge/License-GPL%203.0-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [Configuration](#configuration)
- [Authentication](#authentication)
- [Basic Usage](#basic-usage)
  - [Entity Operations](#entity-operations)
  - [Embedding Related Entities](#embedding-related-entities)
- [Available Entities](#available-entities)
- [Examples](#examples)
- [TypeScript Support](#typescript-support)
- [License](#license)

## Installation

```bash
# Using npm
npm install merchi_sdk_ts

# Using yarn
yarn add merchi_sdk_ts
```

## Quick Start

```typescript
import { Merchi, Product } from 'merchi_sdk_ts';

// Initialize the SDK
const merchi = new Merchi();

// Fetch a product by ID
Product.get(123).then(product => {
  console.log(product.name);
});
```

## Configuration

The SDK by default is set up to make requests to the Merchi production server at `https://api.merchi.co/v6/`.

You can customize the API endpoint by:

1.  Setting `process.env.MERCHI_BACKEND_URI` in your Node.js environment.
2.  Setting `window.merchiBackendUri` in the browser.
3.  Passing the `backendUri` directly to the `Merchi` constructor (highest precedence).

The SDK will look for these in the order of 3, 2, 1, and finally use the default production URL if none are found.
The API version (e.g., `/v6/`) will be appended automatically if not included in your custom URI, assuming the URI ends with the base domain (e.g. `https://custom.merchi.co`). If your custom URI already includes a path (e.g., `https://custom.merchi.co/api/`), ensure it ends with a trailing slash for the version to be appended correctly (e.g., `https://custom.merchi.co/api/v6/`).

**Example: Passing `backendUri` to the constructor**

```typescript
import { Merchi } from 'merchi_sdk_ts';

// Initialize the SDK with a custom backend URI
// This URI should be the base path to your Merchi backend instance.
// The API version (e.g., /v6/) will be appended.
const customBackend = 'https://my-custom-merchi-instance.com/';
const merchi = new Merchi(undefined, undefined, undefined, undefined, customBackend);

// If your custom URI already includes a specific path and you want to control the full endpoint:
const specificCustomBackend = 'https://my-custom-merchi-instance.com/api/custom_version/';
const merchiSpecific = new Merchi(undefined, undefined, undefined, undefined, specificCustomBackend);

// Now, all API calls made using this 'merchi' or 'merchiSpecific' instance
// will be directed to your specified backend.
// For example:
// merchi.Product.get(1) will call https://my-custom-merchi-instance.com/v6/products/1/
// merchiSpecific.Product.get(1) will call https://my-custom-merchi-instance.com/api/custom_version/products/1/
```

## Authentication

The SDK supports several authentication methods:

```typescript
// Session token authentication (most common)
const merchi = new Merchi('your-session-token');

// Alternative methods
const merchi = new Merchi(
  'your-session-token',     // Session token
  'your-client-token',      // Client token
  'your-invoice-token',     // Invoice token
  'your-cart-token'         // Cart token
);

// The SDK will also attempt to read session_token from cookies
// if no token is provided
```

## Basic Usage

### Entity Operations

Each entity supports standard CRUD operations:

```typescript
// Fetch a single entity
Product.get(123).then(product => {
  console.log(product);
});

// List entities with filtering
Product.list({
  limit: 10,
  offset: 0,
  q: 'search-term'
}).then(response => {
  console.log(response.items);        // Array of products
  console.log(response.metadata);     // Metadata including count, limit, offset
});

// Create a new entity
const product = new Product();
product.name = 'New Product';
product.description = 'Product description';
product.create().then(newProduct => {
  console.log(newProduct.id);
});

// Update an entity
product.name = 'Updated Product Name';
product.save().then(updatedProduct => {
  console.log(updatedProduct);
});

// Delete an entity
product.delete().then(() => {
  console.log('Product deleted');
});
```

### Embedding Related Entities

You can request related entities be included in responses:

```typescript
Product.get(123, {
  embed: {
    domain: {},
    variations: {
      variationFields: {}
    }
  }
}).then(product => {
  console.log(product.domain);            // Domain entity is included
  console.log(product.variations);        // Variations are included
  console.log(product.variations[0].variationFields);  // Fields are included
});
```

## Available Entities

The SDK provides access to all Merchi entities, including but not limited to:

- User, Company, Domain
- Product, Category, Variation
- Cart, CartItem
- Job, Assignment, Invoice
- File, Draft, DraftTemplate
- Payment, Shipment
- And many more...

Each entity maps directly to the corresponding API endpoint and data structure.

## Examples

### Working with Products

```typescript
import { Merchi, Product } from 'merchi_sdk_ts';

// Initialize Merchi
const merchi = new Merchi('your-session-token');

// Create a new product
const product = new Product();
product.name = 'Custom T-Shirt';
product.description = 'High-quality custom printed t-shirt';
product.public = true;

product.create().then(newProduct => {
  console.log(`Created product with ID: ${newProduct.id}`);
});
```

### Managing a Cart

```typescript
import { Merchi, Cart, CartItem } from 'merchi_sdk_ts';

// Initialize Merchi
const merchi = new Merchi('your-session-token');

// Create a new cart
const cart = new Cart();
cart.create().then(newCart => {
  // Add an item to the cart
  const cartItem = new CartItem();
  cartItem.productId = 123;
  cartItem.quantity = 2;
  cartItem.cartId = newCart.id;
  
  return cartItem.create();
}).then(newCartItem => {
  console.log('Item added to cart!');
});
```

## TypeScript Support

This SDK is built with TypeScript and provides full type definitions for all entities and operations.

```typescript
import { Product, EmbedDescriptor } from 'merchi_sdk_ts';

// TypeScript will provide intellisense for all properties
const product = new Product();
product.name = 'New Product';

// Type checking for embed options
const embedOptions: EmbedDescriptor = {
  domain: {},
  variations: {
    variationFields: {}
  }
};

Product.get(123, { embed: embedOptions });
```

## License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.
