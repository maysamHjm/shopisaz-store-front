export namespace ProductDetail {
  // -------------------------
  // MEDIA
  // -------------------------
  export interface Media {
    id: number;
    altText: string | null;
    fileName: string;
    url: string; // full URL
    sort: number;
  }

  // -------------------------
  // VARIATIONS
  // -------------------------
  export interface VariationValue {
    id: number;
    titleId: number;
    title: string;
    value: string;
  }

  export interface Variation {
    id: number;
    sku: string;
    quantity: number;
    price: number | null;
    sellPrice: number;
    values: VariationValue[];
  }

  // -------------------------
  // CATEGORY PATHS
  // -------------------------
  export interface CategoryPathItem {
    id: number;
    name: string;
  }

  export interface CategoryPath {
    path: CategoryPathItem[];
  }

  // -------------------------
  // TAGS
  // -------------------------
  export interface Tag {
    id: number;
    tagName: string;
  }

  // -------------------------
  // PERSONALIZATION
  // -------------------------
  export interface PersonalizationItem {
    id: number;
    label: string;
    price: number | null;
    sellPrice: number | null;
    quantity: number;
    image?: {
      id: number;
      altText: string | null;
      fileName: string;
      url: string;
    } | null;
  }

  export interface Personalization {
    id: number;
    personalizationName: string;
    personalizationType: string;
    buyerInstructions: string;
    textBoxMin: number | null;
    textBoxMax: number | null;
    optionalPersonalization: boolean;
    price: number | null;
    sellPrice: number | null;
    quantity: number | null;

    image?: {
      id: number;
      altText: string | null;
      fileName: string;
      url: string;
    } | null;

    items: PersonalizationItem[];
  }

  // -------------------------
  // DESCRIPTIONS
  // -------------------------
  export interface Descriptions {
    short: string | null;
    long: string | null;
    modal: string | null;
    modalButtonText: string | null;
  }

  // -------------------------
  // RETURN / EXCHANGE
  // -------------------------
  export interface ReturnExchange {
    id: number;
    name: string;
    hasReturn: boolean;
    hasExchange: boolean;
    timeFrame: number;
    description: string;
  }

  // -------------------------
  // PROCESSING PROFILE
  // -------------------------
  export interface ProcessingProfile {
    id: number;
    name: string;
    type: number;
    processingDaysFrom: number | null;
    processingDaysTo: number | null;
    unit: number | null;
  }

  // -------------------------
  // RELATED PRODUCT (SLIM DTO)
  // -------------------------
  export interface RelatedProduct {
    id: string;
    productName: string;
    sellPrice: number;
    price: number;
    quantity: string;
    sku: string;
    hasVariants: boolean;
    variantCount: number;
    image: {
      id: number;
      url: string;
      altText: string | null;
    } | null; // only first image (thumbnail)
  }

  // -------------------------
  // MAIN RESPONSE
  // -------------------------
  export interface Response {
    id: string;
    productName: string;
    sku: string | null;
    productType: number;
    productStatus: number;

    price: number | null;
    sellPrice: number;
    quantity: number | null;

    media: Media[];
    variants: Variation[];
    personalizations: Personalization[];
    descriptions: Descriptions;

    categories: CategoryPath[];
    tags: Tag[];

    returnExchange: ReturnExchange | null;
    processingProfile: ProcessingProfile | null;

    relatedProducts: RelatedProduct[]; // 👈 اضافه شد

    createdAt: string;
    updatedAt: string;
  }
}
