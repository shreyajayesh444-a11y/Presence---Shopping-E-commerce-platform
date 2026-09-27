import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Bell,
  Camera,
  Check,
  ChevronDown,
  Heart,
  Home as HomeIcon,
  Package,
  Search,
  Send,
  Settings,
  ShoppingBag,
  Sparkles,
  Star,
  User,
  X,
} from "lucide-react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
const products = [
  {
    id: 1,
    brand: "Atelier No. 8",
    name: "Silk Evening Gown",
    price: 2450,
    color: "Champagne",
    colors: [
      "Champagne",
      "Black",
      "Burgundy",
      "Ivory",
    ],
        material: "Italian Silk Blend",
    materialImage: "/materials/silk.jpg",

    silhouette: "Fluid",
    drape: "Soft and flowing",
    weight: "Lightweight",
    stretch: "Low",
    composition: "Silk blend",
    care: "Dry clean only",
    softness: "9 / 10",
    breathability: "8 / 10",

    occasions: [
      "Wedding",
      "Gala",
      "Formal Dinner",
    ],

    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1200&q=85",
  },

  {
    id: 2,
    brand: "Maison Aveline",
    name: "Velvet Draped Dress",
    price: 2890,
    color: "Black",
    colors: [
      "Champagne",
      "Black",
      "Burgundy",
      "Ivory",
    ],
    material: "Silk Velvet",
    materialImage: "/materials/velvet.jpg",

    silhouette: "Draped",
    drape: "Structured drape",
    weight: "Medium-heavy",
    stretch: "Low",
    composition: "Silk velvet",
    care: "Dry clean only",
    softness: "8 / 10",
    breathability: "6 / 10",

    occasions: [
      "Gala",
      "Formal Dinner",
      "Wedding",
    ],

    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=1200&q=85",
  },

  {
    id: 3,
    brand: "Léon Paris",
    name: "Satin Column Gown",
    price: 2200,
    color: "Burgundy",
    colors: [
      "Champagne",
      "Black",
      "Burgundy",
      "Ivory",
    ],
    material: "Silk Satin",
    materialImage: "/materials/satin.jpg",

    silhouette: "Column",
    drape: "Fluid",
    weight: "Medium",
    stretch: "Low",
    composition: "Silk satin",
    care: "Dry clean only",
    softness: "8 / 10",
    breathability: "7 / 10",

    occasions: [
      "Gala",
      "Formal Dinner",
      "Wedding",
    ],

    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1572293694426-f60adb656984?auto=format&fit=crop&fm=jpg&q=80&w=1200&utm_source=chatgpt.com",
  },

  {
    id: 4,
    brand: "Élan Studio",
    name: "Structured Silk Dress",
    price: 1980,
    color: "Ivory",
    colors: [
      "Champagne",
      "Black",
      "Burgundy",
      "Ivory",
    ],
    material: "Silk Crepe",
    materialImage: "/materials/crepe.jpg",

    silhouette: "Structured",
    drape: "Clean and controlled",
    weight: "Medium-light",
    stretch: "Low",
    composition: "Silk crepe",
    care: "Dry clean only",
    softness: "8 / 10",
    breathability: "8 / 10",

    occasions: [
      "Business Evening",
      "Formal Dinner",
      "Wedding",
    ],

    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1678536517651-8c42df9bcaaf?auto=format&fit=crop&fm=jpg&q=80&w=1200&utm_source=chatgpt.com",
  },
];

const accessories = [
  {
    id: 101,
    brand: "Maison Vale",
    name: "Sculpted Evening Heel",
    price: 650,
    type: "Footwear",
    image:
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 102,
    brand: "Aurelia",
    name: "Satin Clutch",
    price: 890,
    type: "Bag",
    image:
      "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 103,
    brand: "Éclat",
    name: "Pearl Drop Earrings",
    price: 420,
    type: "Jewellery",
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 104,
    brand: "Lune",
    name: "Fine Gold Bracelet",
    price: 380,
    type: "Jewellery",
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=900&q=85",
  },
];

const navItems = [
  { id: "home", label: "Home", icon: HomeIcon },
  { id: "profile", label: "Profile", icon: User },
  { id: "wishlist", label: "Wishlist", icon: Heart },
  { id: "bag", label: "My Bag", icon: ShoppingBag },
  { id: "orders", label: "Orders", icon: Package },
  { id: "settings", label: "Settings", icon: Settings },
];
const PERSONALIZATION_STORAGE_KEY = "presence-personalization";
const PERSONALIZATION_ENGINE_VERSION = 2;

function createDefaultPersonalization() {
  return {
    engineVersion: PERSONALIZATION_ENGINE_VERSION,
    searches: [],
    viewedProducts: [],
    exploredColours: [],
    exploredMaterials: [],
    comparedProducts: [],
    wishlistProducts: [],
    bagProducts: [],
    occasion: "",
    sizeProfile: null,
    events: [],
  };
}

function migratePersonalization(raw) {
  const fallback = createDefaultPersonalization();

  if (!raw || typeof raw !== "object") {
    return fallback;
  }

  return {
    ...fallback,
    ...raw,
    engineVersion: PERSONALIZATION_ENGINE_VERSION,
    searches: Array.isArray(raw.searches) ? raw.searches.slice(-20) : [],
    viewedProducts: Array.isArray(raw.viewedProducts)
      ? raw.viewedProducts.slice(-20)
      : [],
    exploredColours: Array.isArray(raw.exploredColours)
      ? raw.exploredColours.slice(-20)
      : [],
    exploredMaterials: Array.isArray(raw.exploredMaterials)
      ? raw.exploredMaterials.slice(-20)
      : [],
    comparedProducts: Array.isArray(raw.comparedProducts)
      ? raw.comparedProducts.slice(-20)
      : [],
    wishlistProducts: Array.isArray(raw.wishlistProducts)
      ? raw.wishlistProducts.slice(-20)
      : [],
    bagProducts: Array.isArray(raw.bagProducts)
      ? raw.bagProducts.slice(-20)
      : [],
    events: Array.isArray(raw.events) ? raw.events.slice(-160) : [],
  };
}

function normalizeSearch(value = "") {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, " ")
    .replace(/\s+/g, " ");
}

function getProductSearchText(product) {
  return [
    product.name,
    product.brand,
    product.material,
    product.silhouette,
    product.drape,
    product.weight,
    ...(product.occasions || []),
    ...(product.colors || []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function getRecencyFactor(timestamp, now = Date.now()) {
  if (!timestamp) return 0.35;

  const ageHours = Math.max(
    0,
    (now - Number(timestamp)) / (1000 * 60 * 60)
  );

  // Recent actions matter more, but older behaviour does not disappear instantly.
  return Math.max(0.2, Math.exp(-ageHours / 72));
}

function addWeightedValue(target, value, amount) {
  if (!value) return;
  const key = String(value);
  target[key] = (target[key] || 0) + amount;
}

function getTopEntries(source = {}, limit = 3) {
  return Object.entries(source)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([value, score]) => ({ value, score }));
}

function formatAdaptiveValue(value = "") {
  return String(value)
    .split(" ")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function getProductById(id) {
  return products.find((item) => String(item.id) === String(id)) || null;
}

const PRESENCE_SIZE_CHART = {
  XS: { bust: 80, waist: 62, hip: 88 },
  S: { bust: 84, waist: 66, hip: 92 },
  M: { bust: 88, waist: 70, hip: 96 },
  L: { bust: 94, waist: 76, hip: 102 },
  XL: { bust: 100, waist: 82, hip: 108 },
};

function getSizeFitDistance(measurements, size) {
  const chart = PRESENCE_SIZE_CHART[size];
  if (!chart) return Infinity;

  const bustGap = Math.abs(measurements.bust - chart.bust);
  const waistGap = Math.abs(measurements.waist - chart.waist);
  const hipGap = Math.abs(measurements.hip - chart.hip);

  // Weight the three body measurements rather than shifting from usual size.
  return (bustGap * 0.35) + (waistGap * 0.30) + (hipGap * 0.35);
}

function getBestStartingSize({
  bust,
  waist,
  hip,
  usualSize,
}) {
  const sizes = ["XS", "S", "M", "L", "XL"];

  const ranked = sizes
    .map((size) => ({
      size,
      distance: getSizeFitDistance(
        { bust, waist, hip },
        size
      ),
    }))
    .sort(
      (a, b) =>
        a.distance - b.distance
    );

  const measurementSize =
    ranked[0]?.size || usualSize;

  const usualIndex =
    sizes.indexOf(usualSize);

  const measurementIndex =
    sizes.indexOf(measurementSize);

  if (
    usualIndex === -1 ||
    measurementIndex === -1
  ) {
    return measurementSize;
  }

  const difference =
    measurementIndex - usualIndex;

  // Keep the user's usual size as the anchor.
  // Measurements can move the recommendation
  // only one size in either direction.
  if (difference > 1) {
    return sizes[usualIndex + 1];
  }

  if (difference < -1) {
    return sizes[usualIndex - 1];
  }

  return measurementSize;
}

function inferSearchAttributes(query, profile) {
  const normalized = normalizeSearch(query);
  if (!normalized) return;

  const terms = normalized.split(" ").filter(Boolean);

  products.forEach((product) => {
    const productText = getProductSearchText(product);
    const relevance = terms.reduce(
      (score, term) => score + (productText.includes(term) ? 1 : 0),
      0
    );

    if (relevance <= 0) return;

    const weight = relevance * 0.7;

    (product.colors || []).forEach((colour) => {
      if (terms.some((term) => colour.toLowerCase().includes(term))) {
        addWeightedValue(profile.preferences.colours, colour, weight * 1.5);
      }
    });

    if (
      product.material &&
      terms.some((term) => product.material.toLowerCase().includes(term))
    ) {
      addWeightedValue(profile.preferences.materials, product.material, weight * 1.2);
    }

    (product.occasions || []).forEach((occasion) => {
      if (terms.some((term) => occasion.toLowerCase().includes(term))) {
        addWeightedValue(profile.preferences.occasions, occasion, weight * 1.4);
      }
    });

    if (
      product.silhouette &&
      terms.some((term) => product.silhouette.toLowerCase().includes(term))
    ) {
      addWeightedValue(profile.preferences.silhouettes, product.silhouette, weight);
    }
  });
}

function buildAdaptiveProfile(
  personalization,
  currentProductId = null,
  currentSearchQuery = ""
) {
  const events = Array.isArray(personalization?.events)
    ? personalization.events
    : [];
  const now = Date.now();

  const profile = {
    engineVersion: PERSONALIZATION_ENGINE_VERSION,
    currentProductId,
    currentSearchQuery,
    preferences: {
      colours: {},
      materials: {},
      occasions: {},
      silhouettes: {},
      brands: {},
      products: {},
    },
    explicitPreferences: {
      colours: {},
    },
    searches: Array.isArray(personalization?.searches)
      ? personalization.searches.slice(-8)
      : [],
    recentEvents: [],
    recentProductIds: [],
    topPreferences: {
      colours: [],
      materials: [],
      occasions: [],
      silhouettes: [],
    },
    signals: {
      comparison: 0,
      indecision: 0,
      purchaseIntent: 0,
      fitNeed: 0,
      materialNeed: 0,
      stylingNeed: 0,
      exploration: 0,
      colourFocus: 0,
    },
    currentProduct: currentProductId ? getProductById(currentProductId) : null,
    lastMeaningfulEvent: null,
    lastActionForCurrentProduct: null,
    hasMeaningfulActivity: false,
    stage: "discovery",
    summary: "Your interactions will shape what PRÉSENCE prioritizes next.",
  };

  const weights = {
    search: 1.2,
    product_view: 1.2,
    product: 1.2,
    colour: 2.4,
    material: 2.4,
    compare: 3.6,
    size: 2.8,
    occasion: 3.2,
    style: 2.8,
    complete_look: 2.5,
    wishlist_add: 4.2,
    wishlist: 4.2,
    wishlist_remove: 1,
    bag_add: 5,
    bag: 5,
    purchase: 6,
    decision_action: 2,
  };

  let weightedComparison = 0;
  let weightedIndecision = 0;
  let weightedPurchase = 0;
  let weightedFit = 0;
  let weightedMaterial = 0;
  let weightedStyling = 0;
  let weightedExploration = 0;
  let weightedColour = 0;

  const recentMeaningful = [];
  const recentProductIds = [];

  events.slice(-160).forEach((event) => {
    const factor = getRecencyFactor(event.timestamp, now);
    const baseWeight = weights[event.type] || 0.8;
    const weight = baseWeight * factor;

    if (event.type === "search") {
      weightedExploration += weight;
      inferSearchAttributes(String(event.value || ""), profile);
    }

    const productId =
      event?.meta?.productId ||
      (event.type === "product" || event.type === "product_view"
        ? event.value
        : null);
    const eventProduct = productId ? getProductById(productId) : null;

    if (eventProduct) {
      addWeightedValue(
        profile.preferences.products,
        eventProduct.id,
        weight
      );
      addWeightedValue(
        profile.preferences.brands,
        eventProduct.brand,
        weight * 0.8
      );
      addWeightedValue(
        profile.preferences.silhouettes,
        eventProduct.silhouette,
        weight
      );

      addWeightedValue(profile.preferences.materials, eventProduct.material, weight);

      (eventProduct.occasions || []).forEach((occasion) => {
        addWeightedValue(profile.preferences.occasions, occasion, weight * 0.9);
      });

      if (eventProduct.id) {
        recentProductIds.push(eventProduct.id);
      }
    }

    if (event.type === "colour") {
      // Explicit colour selections are counted directly.
      // Recency should not let a colour chosen once outrank a colour chosen repeatedly.
      weightedColour += 1;
      weightedIndecision += 0.65 * factor;
      addWeightedValue(profile.preferences.colours, event.value, weight);
      addWeightedValue(profile.explicitPreferences.colours, event.value, 1);
    }

    if (event.type === "material") {
      weightedMaterial += weight;
      weightedIndecision += 0.45 * factor;
      addWeightedValue(profile.preferences.materials, event.value, weight);
    }

    if (event.type === "occasion") {
      weightedStyling += weight;
      addWeightedValue(profile.preferences.occasions, event.value, weight);
    }

    if (event.type === "style" || event.type === "complete_look") {
      weightedStyling += weight;
      weightedExploration += weight * 0.55;
    }

    if (event.type === "size") {
      weightedFit += weight;
      weightedIndecision += 0.8 * factor;
    }

    if (event.type === "compare") {
      weightedComparison += weight;
      weightedIndecision += 1.1 * factor;
    }

    if (event.type === "wishlist_add" || event.type === "wishlist") {
      weightedPurchase += weight;
    }

    if (event.type === "bag_add" || event.type === "bag") {
      weightedPurchase += weight;
    }

    if (event.type === "purchase") {
      weightedPurchase += weight;
    }

    if (
      [
        "product_view",
        "product",
        "colour",
        "material",
        "compare",
        "size",
        "occasion",
        "style",
        "complete_look",
        "wishlist_add",
        "bag_add",
        "purchase",
      ].includes(event.type)
    ) {
      recentMeaningful.push({
        ...event,
        productId: productId || null,
      });
    }
  });

  profile.recentEvents = recentMeaningful.slice(-12).reverse();
  profile.recentProductIds = [...new Set(recentProductIds.slice(-12).reverse())];
  profile.lastMeaningfulEvent = profile.recentEvents[0] || null;

  const currentProductEvents = profile.recentEvents.filter(
    (event) =>
      String(event.productId || event?.meta?.productId || event.value) ===
      String(currentProductId)
  );

  profile.lastActionForCurrentProduct = currentProductEvents[0] || null;

  const recentUniqueProducts = new Set(
    profile.recentEvents
      .map((event) => event.productId)
      .filter(Boolean)
  );

  profile.signals.comparison = weightedComparison;
  profile.signals.indecision = weightedIndecision;
  profile.signals.purchaseIntent = weightedPurchase;
  profile.signals.fitNeed = weightedFit;
  profile.signals.materialNeed = weightedMaterial;
  profile.signals.stylingNeed = weightedStyling;
  profile.signals.exploration = weightedExploration;
  profile.signals.colourFocus = weightedColour;
  profile.signals.recentProducts = recentUniqueProducts.size;

  profile.topPreferences.colours = getTopEntries(
    profile.explicitPreferences.colours,
    3
  );
  profile.topPreferences.materials = getTopEntries(
    profile.preferences.materials,
    3
  );
  profile.topPreferences.occasions = getTopEntries(
    profile.preferences.occasions,
    3
  );
  profile.topPreferences.silhouettes = getTopEntries(
    profile.preferences.silhouettes,
    3
  );

  profile.hasMeaningfulActivity = profile.recentEvents.length >= 2;

  if (weightedPurchase >= 4.5) {
    profile.stage = "purchase";
  } else if (
    weightedComparison >= 2.4 ||
    weightedIndecision >= 2.5
  ) {
    profile.stage = "deciding";
  } else if (
    weightedExploration >= 2 ||
    recentUniqueProducts.size >= 2
  ) {
    profile.stage = "exploring";
  }

  const summaryParts = [];

  if (profile.topPreferences.colours[0]) {
    summaryParts.push(
      `${formatAdaptiveValue(profile.topPreferences.colours[0].value)} tones`
    );
  }

  if (profile.topPreferences.materials[0]) {
    summaryParts.push(profile.topPreferences.materials[0].value);
  }

  if (profile.topPreferences.occasions[0]) {
    summaryParts.push(
      profile.topPreferences.occasions[0].value
    );
  }

  profile.summary = summaryParts.length
    ? `PRÉSENCE is prioritizing ${summaryParts.slice(0, 3).join(", ")}.`
    : "Your interactions will shape what PRÉSENCE prioritizes next.";

  return profile;
}

function getProductAdaptiveScore(product, profile) {
  if (!product || !profile) return 0;

  let score = 0;

  const productColors = (product.colors || []).map((color) =>
    String(color || "").toLowerCase()
  );
  const productMaterial = String(product.material || "").toLowerCase();
  const productOccasions = (product.occasions || []).map((item) =>
    String(item || "").toLowerCase()
  );
  const productSilhouette = String(product.silhouette || "").toLowerCase();
  const productBrand = String(product.brand || "").toLowerCase();

  Object.entries(profile.preferences?.colours || {}).forEach(
    ([colour, weight]) => {
      if (productColors.some((item) => item.includes(colour.toLowerCase()))) {
        score += weight * 5;
      }
    }
  );

  Object.entries(profile.preferences?.materials || {}).forEach(
    ([material, weight]) => {
      if (productMaterial.includes(material.toLowerCase())) {
        score += weight * 5;
      }
    }
  );

  Object.entries(profile.preferences?.occasions || {}).forEach(
    ([occasion, weight]) => {
      if (
        productOccasions.some((item) =>
          item.includes(occasion.toLowerCase())
        )
      ) {
        score += weight * 4;
      }
    }
  );

  Object.entries(profile.preferences?.silhouettes || {}).forEach(
    ([silhouette, weight]) => {
      if (productSilhouette.includes(silhouette.toLowerCase())) {
        score += weight * 3;
      }
    }
  );

  Object.entries(profile.preferences?.brands || {}).forEach(
    ([brand, weight]) => {
      if (productBrand.includes(brand.toLowerCase())) {
        score += weight * 1.5;
      }
    }
  );

  return score;
}

function getSearchQueryScore(product, query) {
  const normalizedQuery = normalizeSearch(query);

  if (!normalizedQuery) return 0;

  const text = getProductSearchText(product);

  const name = normalizeSearch(product.name || "");
  const brand = normalizeSearch(product.brand || "");
  const material = normalizeSearch(product.material || "");
  const silhouette = normalizeSearch(product.silhouette || "");
  const drape = normalizeSearch(product.drape || "");
  const weight = normalizeSearch(product.weight || "");

  const colors = (product.colors || []).map(normalizeSearch);
  const occasions = (product.occasions || []).map(normalizeSearch);

  const synonyms = {
    red: ["burgundy"],
    dark: ["black", "burgundy"],
    deep: ["burgundy"],
    evening: [
      "gala",
      "formal dinner",
      "business evening",
    ],
    night: [
      "gala",
      "formal dinner",
      "business evening",
    ],
    formal: [
      "gala",
      "formal dinner",
      "business evening",
    ],
    gala: ["gala"],
    party: ["gala", "formal dinner"],
    flowing: [
      "fluid",
      "soft and flowing",
    ],
    flowy: [
      "fluid",
      "soft and flowing",
    ],
    light: [
      "lightweight",
      "medium-light",
    ],
    lightweight: [
      "lightweight",
    ],
    heavy: [
      "medium-heavy",
    ],
    structured: [
      "structured",
      "clean and controlled",
    ],
    sleek: [
      "column",
      "structured",
    ],
    draped: [
      "draped",
      "structured drape",
    ],
    soft: [
      "soft and flowing",
    ],
  };

  const terms = normalizedQuery
    .split(" ")
    .filter(Boolean);

  const expandedTerms = new Set();

  terms.forEach((term) => {
    expandedTerms.add(term);

    (synonyms[term] || []).forEach((value) => {
      expandedTerms.add(normalizeSearch(value));
    });
  });

  let score = 0;
  let meaningfulMatches = 0;

  function matchField(fieldValue, points) {
    if (!fieldValue) return;

    expandedTerms.forEach((term) => {
      if (
        fieldValue === term ||
        fieldValue.includes(term) ||
        term.includes(fieldValue)
      ) {
        score += points;
        meaningfulMatches += 1;
      }
    });
  }

  // Product identity gets the strongest weight.
  matchField(name, 100);
  matchField(brand, 80);

  // Product attributes.
  matchField(material, 70);
  matchField(silhouette, 60);
  matchField(drape, 45);
  matchField(weight, 40);

  colors.forEach((color) => {
    matchField(color, 65);
  });

  occasions.forEach((occasion) => {
    matchField(occasion, 55);
  });

  // Exact product-name phrase.
  if (normalizedQuery === name) {
    return 1000;
  }

  // Exact brand + product.
  if (
    normalizedQuery ===
    `${brand} ${name}`.trim()
  ) {
    return 1200;
  }

  // Prevent generic words from returning everything.
  const genericOnly = [
    "dress",
    "gown",
    "fashion",
    "outfit",
    "piece",
  ];

  if (
    terms.length === 1 &&
    genericOnly.includes(terms[0])
  ) {
    return 0;
  }

  // Require at least one meaningful match.
  if (meaningfulMatches === 0) {
    return 0;
  }

  /*
    Strong natural-language queries need stronger evidence.

    Example:
    "burgundy satin column gown"

    should match:
    colour + material + silhouette + gown

    rather than every dress containing only "gown".
  */

  const attributeCount = [
    colors.some((color) =>
      terms.some((term) =>
        color.includes(term)
      )
    ),

    material &&
      terms.some((term) =>
        material.includes(term)
      ),

    silhouette &&
      terms.some((term) =>
        silhouette.includes(term)
      ),

    occasions.some((occasion) =>
      terms.some((term) =>
        occasion.includes(term)
      )
    ),

    drape &&
      terms.some((term) =>
        drape.includes(term)
      ),

    weight &&
      terms.some((term) =>
        weight.includes(term)
      ),
  ].filter(Boolean).length;

  // Multi-attribute searches must have at least
  // two relevant attributes.
  const hasMultipleAttributes =
    attributeCount >= 2;

  if (
    terms.length >= 3 &&
    !hasMultipleAttributes &&
    score < 100
  ) {
    return 0;
  }

  /*
    Small bonus when many query words are represented.
  */
  const coverageBonus =
    Math.min(
      terms.length,
      meaningfulMatches
    ) * 5;

  return score + coverageBonus;
}


function searchProducts(
  query,
  adaptiveProfile = null
) {
  const normalizedQuery = normalizeSearch(query);

  /*
    Empty search:
    show personalized browsing order.
  */
  if (!normalizedQuery) {
    return products
      .map((product, index) => ({
        product,
        score: getProductAdaptiveScore(
          product,
          adaptiveProfile
        ),
        index,
      }))
      .sort((a, b) => {
        if (b.score !== a.score) {
          return b.score - a.score;
        }

        return a.index - b.index;
      })
      .map((item) => item.product);
  }

  /*
    Actual search:
    only keep products that genuinely
    match the query.
  */
  const matches = products
    .map((product, index) => ({
      product,
      searchScore: getSearchQueryScore(
        product,
        query
      ),
      adaptiveScore:
        getProductAdaptiveScore(
          product,
          adaptiveProfile
        ),
      index,
    }))
    .filter((item) => item.searchScore > 0);

  /*
    Nothing matches:
    return nothing.
    DO NOT show the whole catalog.
  */
  if (!matches.length) {
    return [];
  }

  /*
    Search relevance comes first.
    Personalization only decides the order
    when products are similarly relevant.
  */
  return matches
    .sort((a, b) => {
      if (
        b.searchScore !== a.searchScore
      ) {
        return (
          b.searchScore -
          a.searchScore
        );
      }

      if (
        b.adaptiveScore !==
        a.adaptiveScore
      ) {
        return (
          b.adaptiveScore -
          a.adaptiveScore
        );
      }

      return a.index - b.index;
    })
    .map((item) => item.product);
}

function getPersonalizationSummary(profile) {
  if (!profile?.hasMeaningfulActivity) {
    return "Browse a few pieces and PRÉSENCE will start adapting this collection to you.";
  }

  const bits = [];

  if (profile.topPreferences.colours[0]) {
    bits.push(formatAdaptiveValue(profile.topPreferences.colours[0].value));
  }

  if (profile.topPreferences.materials[0]) {
    bits.push(profile.topPreferences.materials[0].value);
  }

  if (profile.topPreferences.occasions[0]) {
    bits.push(profile.topPreferences.occasions[0].value);
  }

  return bits.length
    ? `Personalized from your recent interest in ${bits.slice(0, 3).join(", ")}.`
    : "Personalized from your recent interactions across PRÉSENCE.";
}

function getAdaptiveDecision(profile) {
  if (!profile?.hasMeaningfulActivity) return null;

  const currentProduct = profile.currentProduct;
  if (!currentProduct) return null;

  const last = profile.lastMeaningfulEvent;
  if (!last) return null;

  const currentProductId = String(currentProduct.id);
  const eventProductId = String(
    last.productId || last?.meta?.productId || last.value || ""
  );
  const isCurrentProduct = eventProductId === currentProductId;

  const evidence = [];

  if (profile.topPreferences.colours[0]) {
    evidence.push(formatAdaptiveValue(profile.topPreferences.colours[0].value));
  }
  if (profile.topPreferences.materials[0]) {
    evidence.push(profile.topPreferences.materials[0].value);
  }
  if (profile.topPreferences.occasions[0]) {
    evidence.push(profile.topPreferences.occasions[0].value);
  }

  const base = {
    evidence: evidence.slice(0, 3),
    stage: profile.stage,
    engineLabel: "Adaptive Decision Engine",
  };

  if (
    isCurrentProduct &&
    ["wishlist_add", "bag_add", "purchase"].includes(last.type)
  ) {
    return {
      ...base,
      type: "purchase",
      title: "You have moved from exploring to deciding.",
      message:
        `You saved or selected ${currentProduct.name}. Review the key details before you commit to the purchase.`,
      action: "Review purchase details",
      target: "purchase",
    };
  }

  if (isCurrentProduct && last.type === "compare") {
    return {
      ...base,
      type: "compare",
      title: "You are comparing this piece with another option.",
      message:
        "PRÉSENCE can keep the comparison focused on the attributes that matter most to your current choices.",
      action: "Compare options",
      target: "ar",
    };
  }

  if (isCurrentProduct && last.type === "size") {
    return {
      ...base,
      type: "size",
      title: "Fit is part of the decision now.",
      message:
        "Use the size guide to turn your usual size and measurements into a transparent starting point for this piece.",
      action: "Review size",
      target: "size",
    };
  }

  if (isCurrentProduct && last.type === "material") {
    return {
      ...base,
      type: "material",
      title: "Material is one of the things you are evaluating.",
      message:
        `You explored ${currentProduct.material}. PRÉSENCE can keep the decision focused on texture, weight, breathability and care.`,
      action: "Explore material",
      target: "material",
    };
  }

  if (
    isCurrentProduct &&
    ["style", "complete_look", "occasion"].includes(last.type)
  ) {
    return {
      ...base,
      type: "style",
      title: "Styling is part of the decision now.",
      message:
        "Sofia can use your recent product and preference context to help you judge the piece for an occasion or complete the look.",
      action: "Ask Sofia",
      target: "stylist",
    };
  }

  if (last.type === "colour" && profile.topPreferences.colours[0]) {
    const preferredColour = profile.topPreferences.colours[0].value;

    return {
      ...base,
      type: "personalize",
      title: `${formatAdaptiveValue(preferredColour)} is becoming a strong preference.`,
      message:
        "PRÉSENCE has picked up the pattern from your recent colour choices and can prioritize pieces that fit it.",
      action: "See matching pieces",
      target: "listing",
    };
  }

  return null;
}

function getAdaptiveSearchSuggestions(personalization) {
  const profile = buildAdaptiveProfile(personalization);
  const suggestions = [];

  (personalization?.searches || [])
    .slice()
    .reverse()
    .forEach((query) => {
      if (query && !suggestions.includes(query)) {
        suggestions.push(query);
      }
    });

  profile.topPreferences.colours.forEach(({ value }) => {
    if (!suggestions.includes(value)) suggestions.push(value);
  });

  profile.topPreferences.materials.forEach(({ value }) => {
    if (!suggestions.includes(value)) suggestions.push(value);
  });

  profile.topPreferences.occasions.forEach(({ value }) => {
    if (!suggestions.includes(value)) suggestions.push(value);
  });

  if (!suggestions.length) {
    suggestions.push("Black", "Silk", "Gala", "Formal Dinner");
  }

  return suggestions.slice(0, 6);
}

function getSofiaFallbackReply(product, profile, userMessage = "") {
  const last = profile?.lastMeaningfulEvent;
  const topColour = profile?.topPreferences?.colours?.[0]?.value;
  const topMaterial = profile?.topPreferences?.materials?.[0]?.value;
  const topOccasion = profile?.topPreferences?.occasions?.[0]?.value;

  if (last?.type === "compare") {
    return `You are comparing ${product.name}. Based on your recent activity, I would focus on silhouette, material and occasion before making the choice.`;
  }

  if (last?.type === "size") {
    return `For ${product.name}, your recent interactions suggest fit is an important part of the decision. Use the size guide as a starting point, then check the brand measurements before purchasing.`;
  }

  if (last?.type === "material" && topMaterial) {
    return `You have been exploring ${topMaterial}. For ${product.name}, pay attention to the fabric's weight, breathability, drape and care requirements.`;
  }

  if (last?.type === "colour" && topColour) {
    return `${formatAdaptiveValue(topColour)} is emerging as your strongest colour preference. I would start by comparing this piece with other options in that tone family.`;
  }

  if (last?.type === "style" && topOccasion) {
    return `You seem to be considering ${topOccasion.toLowerCase()} styling. For ${product.name}, I would use the silhouette and accessories to judge whether the overall look fits the occasion.`;
  }

  if (userMessage) {
    return `I’m in adaptive mode right now. For ${product.name}, I can still help you reason through colour, material, fit, styling or comparison using what you have explored so far.`;
  }

  return `You're looking at ${product.name}. I can help you decide using your recent colour, material, fit and comparison activity.`;
}

function Sidebar({ page, navigate, bagCount, wishlistCount }) {
  return (
    <aside className="sidebar">
      <button className="brand-mark" onClick={() => navigate("home")}>
        PRÉSENCE
      </button>

      <div className="nav-group">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            className={`nav-item ${page === id ? "active" : ""}`}
            onClick={() => navigate(id)}
          >
            <Icon size={17} strokeWidth={1.6} />
            <span>{label}</span>

            {id === "bag" && bagCount > 0 && (
              <span className="nav-badge">{bagCount}</span>
            )}

            {id === "wishlist" && wishlistCount > 0 && (
              <span className="nav-badge">{wishlistCount}</span>
            )}
          </button>
        ))}
      </div>

      <div className="sidebar-bottom">
        <div className="vip-card">
          <div className="small-caps">PRIVATE ACCESS</div>
          <p>Curated pieces for your wardrobe.</p>
        </div>
      </div>
    </aside>
  );
}
function TopBar({ navigate, onSearch, searchQuery }) {
  const [value, setValue] = useState(searchQuery || "");
  const [focused, setFocused] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    setValue(searchQuery || "");
  }, [searchQuery]);

  function refreshSuggestions() {
    try {
      const raw = localStorage.getItem(PERSONALIZATION_STORAGE_KEY);
      const personalization = raw
        ? migratePersonalization(JSON.parse(raw))
        : createDefaultPersonalization();

      setSuggestions(getAdaptiveSearchSuggestions(personalization));
    } catch {
      setSuggestions(["Black", "Silk", "Gala", "Formal Dinner"]);
    }
  }

  useEffect(() => {
    refreshSuggestions();

    const update = () => refreshSuggestions();
    window.addEventListener(
      "presence-personalization-updated",
      update
    );

    return () => {
      window.removeEventListener(
        "presence-personalization-updated",
        update
      );
    };
  }, []);

  function submit(nextValue = value) {
    onSearch(String(nextValue || "").trim());
    setFocused(false);
  }

  return (
    <header className="topbar">
      <div
        className="search-wrap"
        style={{ position: "relative" }}
      >
        <Search size={18} />
        <input
          value={value}
          onFocus={() => {
            setFocused(true);
            refreshSuggestions();
          }}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="Search products, brands and more"
        />
        <button onClick={() => submit()} aria-label="Search">
          <ArrowRight size={17} />
        </button>

        {focused && (
          <div
            style={{
              position: "absolute",
              top: "calc(100% + 8px)",
              left: 0,
              right: 0,
              background: "rgba(255,255,255,.98)",
              border: "1px solid #e9e3dc",
              borderRadius: 16,
              padding: 12,
              boxShadow: "0 18px 50px rgba(0,0,0,.12)",
              zIndex: 100,
            }}
          >
            <div
              className="small-caps"
              style={{ marginBottom: 8 }}
            >
              {value.trim()
                ? "SUGGESTED SEARCH"
                : "PERSONALIZED SEARCH"}
            </div>

            {!value.trim() && (
              <div
                style={{
                  fontSize: 12,
                  color: "#6f675f",
                  marginBottom: 10,
                  lineHeight: 1.45,
                }}
              >
                Recent searches and preferences shape what appears first.
              </div>
            )}

            <div
              style={{
                display: "flex",
                gap: 8,
                flexWrap: "wrap",
              }}
            >
              {suggestions
                .filter((suggestion) =>
                  value.trim()
                    ? normalizeSearch(suggestion).includes(
                        normalizeSearch(value)
                      ) ||
                      normalizeSearch(value).includes(
                        normalizeSearch(suggestion)
                      )
                    : true
                )
                .slice(0, 6)
                .map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => {
                      setValue(suggestion);
                      submit(suggestion);
                    }}
                    style={{
                      border: "1px solid #ded7ce",
                      background: "#faf8f5",
                      borderRadius: 999,
                      padding: "8px 11px",
                      fontSize: 12,
                      cursor: "pointer",
                    }}
                  >
                    {suggestion}
                  </button>
                ))}
            </div>
          </div>
        )}
      </div>

      <div className="top-actions">
        <button className="icon-button" aria-label="Notifications">
          <Bell size={18} />
        </button>

        <button
          className="profile-chip"
          onClick={() => navigate("profile")}
          aria-label="Profile"
        >
          <span className="avatar">S</span>
        </button>
      </div>
    </header>
  );
}

function ProductCard({ product, wishlisted, onWishlist, onOpen }) {
  return (
    <article className="product-card">
      <div className="product-media">
        <button
          className="product-image-button"
          onClick={() => onOpen(product.id)}
        >
          <img src={product.image} alt={product.name} />
        </button>

        <span className="motion-pill">Motion</span>

        <button
          className={`heart-float ${wishlisted ? "saved" : ""}`}
          onClick={() => onWishlist(product.id)}
          aria-label="Save product"
        >
          <Heart
            size={18}
            fill={wishlisted ? "currentColor" : "none"}
          />
        </button>
      </div>

      <button className="product-meta" onClick={() => onOpen(product.id)}>
        <div className="product-brand">{product.brand}</div>
        <div className="product-name">{product.name}</div>

        <div className="product-row">
          <span>AED {product.price.toLocaleString()}</span>

          <span className="rating">
            <Star size={13} fill="currentColor" />
            {product.rating}
          </span>
        </div>
      </button>
    </article>
  );
}

function Home({
  navigate,
  onOpenProduct,
  wishlist,
  onWishlist,
  adaptiveProfile,
}) {
  const featuredProducts = useMemo(() => {
    return [...products]
      .sort((a, b) => {
        const scoreA = getProductAdaptiveScore(a, adaptiveProfile);
        const scoreB = getProductAdaptiveScore(b, adaptiveProfile);
        return scoreB - scoreA;
      })
      .slice(0, 3);
  }, [adaptiveProfile]);

  const heroProduct = featuredProducts[0] || products[0];

  return (
    <div className="page">
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow">{adaptiveProfile?.hasMeaningfulActivity ? "SELECTED FOR YOU" : "CURATED FOR YOU"}</div>

          <h1>
            Presence in
            <br />
            every detail.
          </h1>

          <p>
            Discover luxury fashion through a more considered,
            immersive shopping experience.
          </p>

          <button
            className="button dark"
            onClick={() => navigate("listing")}
          >
            Explore collection <ArrowRight size={16} />
          </button>
        </div>

        <div className="hero-image">
          <img src={heroProduct.image} alt={heroProduct.name} />

          <div className="hero-product">
            <div>
              <div className="small-caps">{heroProduct.brand}</div>
              <strong>{heroProduct.name}</strong>
            </div>

            <button onClick={() => onOpenProduct(heroProduct.id)}>
              View <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </section>

      <section className="section-head">
        <div>
          <div className="small-caps">EDITORIAL SELECTION</div>
          <h2>Trending now</h2>
        </div>

        <button
          className="text-button"
          onClick={() => navigate("listing")}
        >
          View all <ArrowRight size={15} />
        </button>
      </section>

      <section className="product-grid">
        {featuredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            wishlisted={wishlist.includes(product.id)}
            onWishlist={onWishlist}
            onOpen={onOpenProduct}
          />
        ))}
      </section>

      <section className="section-head">
        <div>
          <div className="small-caps">CURATED BY PRICE</div>
          <h2>Dresses at a similar price</h2>
        </div>
      </section>

      <section className="product-grid four">
        {products.slice(1).map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            wishlisted={wishlist.includes(product.id)}
            onWishlist={onWishlist}
            onOpen={onOpenProduct}
          />
        ))}
      </section>
    </div>
  );
}

function Listing({
  wishlist,
  onWishlist,
  onOpenProduct,
  searchQuery,
  adaptiveProfile,
}) {
  const [category, setCategory] = useState("Women");

  const categories = [
    "Women",
    "Men",
    "Kids",
    "Jewelry",
    "Shoes",
    "Bags",
    "Accessories",
  ];

  const visibleProducts = useMemo(() => {
    return searchProducts(searchQuery, adaptiveProfile);
  }, [searchQuery, adaptiveProfile]);

  const exactSearchMatch = useMemo(() => {
    if (!searchQuery.trim()) return true;

    return products.some(
      (product) =>
        getSearchQueryScore(
          product,
          searchQuery
        ) > 0
    );
  }, [searchQuery]);

  return (
    <div className="page">
      <div className="listing-top">
        <div>
          <div className="small-caps">
            {searchQuery ? "SEARCH + PERSONALIZATION" : "PERSONALIZED EDIT"}
          </div>
          <h1 className="page-title">
            {searchQuery
              ? `Results for “${searchQuery}”`
              : "Fashion, considered."}
          </h1>
        </div>

        <div
          style={{
            padding: "9px 12px",
            borderRadius: 999,
            border: "1px solid #e2dbd3",
            background: "#faf8f5",
            fontSize: 12,
            color: "#655e56",
          }}
        >
          Adaptive ranking on
        </div>
      </div>

      <div
        style={{
          marginTop: 8,
          marginBottom: 24,
          padding: "14px 16px",
          border: "1px solid #ebe4dc",
          borderRadius: 16,
          background: "linear-gradient(135deg,#fbfaf8,#f5f0ea)",
        }}
      >
        <div className="small-caps">ADAPTIVE ENGINE v2</div>
        <p
          style={{
            margin: "6px 0 0",
            color: "#5f5952",
            lineHeight: 1.55,
            fontSize: 13,
          }}
        >
          {searchQuery && !exactSearchMatch
            ? `No exact product match for “${searchQuery}”. PRÉSENCE is showing the closest personalized edit instead of a blank result.`
            : getPersonalizationSummary(adaptiveProfile)}
        </p>

        {adaptiveProfile?.topPreferences && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 7,
              marginTop: 11,
            }}
          >
            {[
              ...(adaptiveProfile.topPreferences.colours || []),
              ...(adaptiveProfile.topPreferences.materials || []),
              ...(adaptiveProfile.topPreferences.occasions || []),
            ]
              .slice(0, 4)
              .map((item) => (
                <span
                  key={`${item.value}`}
                  style={{
                    padding: "6px 9px",
                    borderRadius: 999,
                    background: "rgba(255,255,255,.76)",
                    border: "1px solid #e2dbd3",
                    fontSize: 11,
                    color: "#5e5851",
                  }}
                >
                  {item.value}
                </span>
              ))}
          </div>
        )}
      </div>

      <div className="category-tabs">
        {categories.map((item) => (
          <button
            key={item}
            className={category === item ? "selected" : ""}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>

      {searchQuery.trim() && visibleProducts.length === 0 ? (
        <div
          style={{
            marginTop: 40,
            padding: "60px 24px",
            textAlign: "center",
            border: "1px solid #e8e1d9",
            borderRadius: 20,
            background: "#faf8f5",
          }}
        >
          <div className="small-caps">NO CLOSE MATCH</div>

          <h2
            style={{
              fontFamily: "Georgia, serif",
              fontWeight: 400,
              fontSize: 30,
              margin: "10px 0 12px",
            }}
          >
            We couldn't find that piece.
          </h2>

          <p
            style={{
              maxWidth: 520,
              margin: "0 auto",
              color: "#6a635c",
              lineHeight: 1.6,
              fontSize: 14,
            }}
          >
            Try a more specific colour, material, silhouette, brand,
            or occasion.
          </p>

          <p
            style={{
              marginTop: 14,
              color: "#8a8178",
              fontSize: 13,
            }}
          >
            Example: “burgundy satin column gown”
          </p>
        </div>
      ) : (
        <div className="product-grid four">
          {visibleProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              wishlisted={wishlist.includes(product.id)}
              onWishlist={onWishlist}
              onOpen={onOpenProduct}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function AdaptiveDecision({
  decision,
  navigate,
  onAction,
}) {
  if (!decision) return null;

  function runAction() {
    if (onAction) {
      onAction(decision);
      return;
    }

    if (decision.target) {
      navigate(decision.target);
    }
  }

  return (
    <section
      aria-label="Adaptive decision support"
      style={{
        marginTop: 24,
        padding: 20,
        borderRadius: 20,
        border: "1px solid #e4ddd5",
        background:
          "linear-gradient(135deg, rgba(250,248,245,.98), rgba(243,238,231,.98))",
        boxShadow: "0 18px 45px rgba(0,0,0,.07)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 18,
        }}
      >
        <div>
          <div className="small-caps">
            ADAPTIVE DECISION ENGINE v2
          </div>
          <h3
            style={{
              margin: "7px 0 0",
              fontFamily: "Georgia, serif",
              fontWeight: 400,
              fontSize: 25,
            }}
          >
            {decision.title}
          </h3>
        </div>

        <Sparkles size={18} />
      </div>

      <p
        style={{
          margin: "12px 0 0",
          color: "#5f5952",
          lineHeight: 1.6,
          fontSize: 14,
          maxWidth: 700,
        }}
      >
        {decision.message}
      </p>

      {decision.evidence?.length > 0 && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 7,
            marginTop: 13,
          }}
        >
          {decision.evidence.map((item) => (
            <span
              key={item}
              style={{
                padding: "6px 9px",
                borderRadius: 999,
                border: "1px solid #dcd4ca",
                background: "rgba(255,255,255,.68)",
                fontSize: 11,
                color: "#5a544d",
              }}
            >
              {item}
            </span>
          ))}
        </div>
      )}

      <div
        style={{
          marginTop: 15,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 14,
          flexWrap: "wrap",
        }}
      >
        <span
          style={{
            fontSize: 11,
            color: "#766e65",
          }}
        >
          {decision.engineLabel} · based on your recent interactions
        </span>

        <button
          className="button dark"
          onClick={runAction}
        >
          {decision.action}
        </button>
      </div>
    </section>
  );
}

function getProductColorFilter(color) {
  const filters = {
    Champagne: "sepia(0.18) saturate(0.82) brightness(1.08)",
    Black: "grayscale(0.95) brightness(0.34) contrast(1.18)",
    Burgundy: "sepia(0.72) saturate(2.15) hue-rotate(315deg) brightness(0.72) contrast(1.08)",
    Ivory: "grayscale(0.12) sepia(0.12) brightness(1.12) contrast(0.96)",
  };

  return filters[color] || "none";
}

function ProductDetails({
  product,
  onBack,
  navigate,
  onAddBag,
  wishlist,
  onWishlist,
  adaptiveDecision,
  trackInteraction,
  setPersonalization,
}) {
  const [size, setSize] = useState("M");
  const [compareProductId, setCompareProductId] = useState(
    () => products.find((item) => item.id !== product.id)?.id || null
  );

  const [comparePriorities, setComparePriorities] = useState([
    "occasion",
    "material",
  ]);
  const [selectedOccasion, setSelectedOccasion] = useState("");
  const [color, setColor] = useState(
    product.color || "Champagne"
  );
  const [added, setAdded] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [sizeProfile, setSizeProfile] = useState({
    height: "",
    weight: "",
    bust: "",
    waist: "",
    hip: "",
    usualSize: "M",
  });
  const [sizeRecommendation, setSizeRecommendation] = useState(null);

  function calculateSizeRecommendation() {
  const height = Number(sizeProfile.height);
  const weight = Number(sizeProfile.weight);

  let bust = Number(sizeProfile.bust);
  let waist = Number(sizeProfile.waist);
  let hip = Number(sizeProfile.hip);

  const usualSize = sizeProfile.usualSize;

  if (
    !height ||
    !weight ||
    !bust ||
    !waist ||
    !hip ||
    !usualSize
  ) {
    setSizeRecommendation({
      size: null,
      text:
        "Enter your height, weight, bust, waist and hip measurements to calculate a starting size.",
    });
    return;
  }

  /*
    Prototype convenience:
    values that look like body measurements in inches
    are automatically converted to centimetres.
  */

  const looksLikeInches =
    bust <= 60 &&
    waist <= 60 &&
    hip <= 60;

  if (looksLikeInches) {
    bust = bust * 2.54;
    waist = waist * 2.54;
    hip = hip * 2.54;
  }

  const recommendedSize = getBestStartingSize({
    bust,
    waist,
    hip,
    usualSize,
  });

  const distance = getSizeFitDistance(
    { bust, waist, hip },
    recommendedSize
  );

  const fitNote =
    recommendedSize === usualSize
      ? `Your measurements align most closely with ${recommendedSize}, matching your usual size.`
      : `Your measurements align most closely with ${recommendedSize}. Your usual size is used only as supporting context.`;

  const heightNote =
    height >= 175
      ? "Your height may affect garment length."
      : height <= 160
      ? "Your height may affect garment length, especially on a longer silhouette."
      : "Your height is used as supporting fit context.";

  const unitNote = looksLikeInches
    ? "Your body measurements were interpreted as inches and converted to centimetres."
    : "Your body measurements were interpreted as centimetres.";

  setSizeRecommendation({
    size: recommendedSize,
    text:
      `${fitNote} ${heightNote} ${unitNote} ` +
      `Fit distance: ${distance.toFixed(1)} cm.`,
  });

  setSize(recommendedSize);

  trackInteraction("size", recommendedSize, {
    productId: product.id,
    bust,
    waist,
    hip,
    height,
    weight,
    usualSize,
    algorithm: "measurement-distance-v3",
  });

  setPersonalization((current) => ({
    ...current,
    sizeProfile: {
      ...current.sizeProfile,
      height,
      weight,
      bust,
      waist,
      hip,
      usualSize,
      recommendedSize,
    },
  }));

  setShowSizeGuide(false);
}

  // Product Details behaviour is scoped to the current page visit.
  // Opening the page always starts with zero evidence, so old activity
  // can never trigger a recommendation immediately.
  const [signals, setSignals] = useState({
    sizeChanges: 0,
    colourChanges: 0,
    materialChanges: 0,
    compareChanges: 0,
    styleChanges: 0,
    currentColor: product.color || "Champagne",
  });

  const register = (type) => {
    if (type === "materialChanges") {
      trackInteraction("material", product.material, {
        productId: product.id,
      });
    }

    if (type === "sizeChanges") {
      trackInteraction("size", size, {
        productId: product.id,
      });
    }

    if (type === "compareChanges") {
      trackInteraction("compare", product.id, {
        productId: product.id,
      });
    }

    if (type === "styleChanges") {
      trackInteraction("style", product.id, {
        productId: product.id,
      });
    }

    setSignals((current) => ({
      ...current,
      [type]: (current[type] || 0) + 1,
    }));
  };

  const add = () => {
    onAddBag({
      ...product,
      size,
      color,
    });

    setAdded(true);

    window.setTimeout(() => {
      setAdded(false);
    }, 1200);
  };

  return (
    <div className="page product-page-enhanced">

      <button className="back-link" onClick={onBack}>
        <ArrowLeft size={16} />
        Back to collection
      </button>

      <div className="product-detail-grid">

        {/* LEFT SIDE */}

        <div className="product-main-column">

          <div className="detail-visual enhanced-visual">
            <img
              src={product.image}
              alt={`${product.name} in ${color}`}
              className="detail-product-image"
              style={{
                filter: getProductColorFilter(color),
                transition: "filter 240ms ease",
              }}
            />
          </div>

          <div className="purchase-bar" id="purchase-options">

            <button
              className="button dark wide"
              onClick={add}
            >
              {added ? (
                <>
                  <Check size={16} />
                  Added to Bag
                </>
              ) : (
                <>
                  <ShoppingBag size={16} />
                  Add to Bag
                </>
              )}
            </button>

            <button
              className="button luxury wide"
              onClick={() => navigate("checkout")}
            >
              Buy Now
            </button>

          </div>

          <div className="product-summary-card">

            <div className="small-caps">
              {product.brand}
            </div>

            <div className="product-heading-row">

              <div>
                <h1>{product.name}</h1>

                <div className="product-price">
                  AED {product.price.toLocaleString()}
                </div>

                <div className="detail-rating">
                  <Star
                    size={15}
                    fill="currentColor"
                  />

                  {product.rating} · 126 reviews
                </div>
              </div>

              <button
                className={`save-button ${
                  wishlist.includes(product.id)
                    ? "saved"
                    : ""
                }`}
                onClick={() =>
                  onWishlist(product.id)
                }
                aria-label="Save to wishlist"
              >
                <Heart
                  size={18}
                  fill={
                    wishlist.includes(product.id)
                      ? "currentColor"
                      : "none"
                  }
                />
              </button>

            </div>

            <div className="availability-row">
              <span>✓ In Stock</span>
              <span>Free Delivery</span>
              <span>Free Returns</span>
            </div>

          </div>

          <div className="product-story-card">
            <div>
              <div className="small-caps">
                PRODUCT DETAILS
              </div>

              <h3>{product.name}</h3>

              <p>
                {product.brand} · {product.material} · {product.color}
              </p>
            </div>

            <img
              src={product.image}
              alt={`${product.name} detail in ${color}`}
              style={{
                filter: getProductColorFilter(color),
                transition: "filter 240ms ease",
              }}
            />
          </div>

          {/* OPTIONS */}

          <div className="product-options-card">

            {/* COLOUR */}

            <div
              className="option-section"
              id="colour-section"
            >

              <div className="field-label">
                Colour: {color}
              </div>

              <div className="colour-swatches">

                {[
                  "Champagne",
                  "Black",
                  "Burgundy",
                  "Ivory",
                ].map((item) => (

                  <button
                    key={item}
                    className={`swatch ${
                      color === item
                        ? "selected"
                        : ""
                    }`}
                    onClick={() => {
                      if (color !== item) {
                        setColor(item);

                        setSignals((current) => ({
                          ...current,
                          currentColor: item,
                          colourChanges: (current.colourChanges || 0) + 1,
                        }));
                        trackInteraction("colour", item, {
                          productId: product.id,
                          selectedColour: item,
                        });
                      }
              }}
                    aria-label={`Choose ${item}`}
                  >

                    <span
                      className={`swatch-dot swatch-${item
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    />

                  </button>

                ))}

              </div>

            </div>
            {/* OCCASION INTELLIGENCE */}

            <div className="option-section">

              <div className="field-label">
                Occasion
              </div>

              <div
                style={{
                  display: "flex",
                  gap: 8,
                  flexWrap: "wrap",
                  marginTop: 10,
                }}
              >
                {(product.occasions || []).map(
                  (occasion) => (
                    <button
                      key={occasion}
                      type="button"
                      className={`size-button occasion-button ${
                        selectedOccasion === occasion
                          ? "selected"
                          : ""
                      }`}
                      onClick={() => {
                        setSelectedOccasion(occasion);

                        trackInteraction(
                          "occasion",
                          occasion,
                          {
                            productId: product.id,
                            source: "product",
                          }
                        );
                      }}
                    >
                      {occasion}
                    </button>
                  )
                )}
              </div>

              {selectedOccasion && (
                <div
                  style={{
                    marginTop: 12,
                    padding: "10px 12px",
                    borderRadius: 10,
                    background: "#f5f1eb",
                    color: "#5f5952",
                    fontSize: 12,
                    lineHeight: 1.5,
                  }}
                >
                  {product.occasions?.includes(
                    selectedOccasion
                  )
                    ? `${product.name} is listed for ${selectedOccasion}. Sofia can use this occasion when helping you decide.`
                    : `This piece is not specifically listed for ${selectedOccasion}.`}
                </div>
              )}

            </div>

            {/* SIZE */}

            <div className="option-section">

              <div className="field-head">

                <div className="field-label">
                  Size
                </div>

                <button
                  className="ai-link"
                  onClick={() => {
                    register("sizeChanges");
                    setShowSizeGuide(true);
                  }}
                >
                  <Sparkles size={13} />
                  Find my starting size
                </button>

              </div>

              <div className="size-row">

                {[
                  "XS",
                  "S",
                  "M",
                  "L",
                  "XL",
                ].map((item) => (

                  <button
                    key={item}
                    className={`size-button ${
                      size === item
                        ? "selected"
                        : ""
                    }`}
                    onClick={() => {
                      if (size !== item) {
                        setSize(item);

                        register("sizeChanges");
                  }
                    }}
                  >
                    {item}
                  </button>

                ))}

              </div>

              <div className="size-helper">
                <Sparkles size={14} />
                {sizeRecommendation ? (
                  <>
                    Starting size:
                    <strong>{sizeRecommendation.size}</strong>
                  </>
                ) : (
                  <>
                    Use your measurements to find a starting size
                  </>
                )}
              </div>

            </div>

          </div>

          {/* SPATIAL */}

          <div className="spatial-banner">

            <div className="spatial-content">

              <div className="small-caps">
                EXPERIENCE IN YOUR SPACE
              </div>

              <h2>
                See it in your room.
              </h2>

              <p>
                Explore this product through
                spatial interaction.
              </p>

              <button
                className="button dark"
                onClick={() => {
                  register(
                    "compareChanges"
                  );

                  navigate("ar");
                }}
              >
                <Camera size={15} />
                Launch Spatial Experience
              </button>

            </div>

            <img
              src={product.image}
              alt="Spatial preview"
            />

          </div>

        </div>

        {/* RIGHT SIDE */}

        <div className="product-side-column">

          {/* AI STYLIST */}

          <div className="feature-card ai-stylist-card">

            <div className="feature-head">

              <div>

                <div className="small-caps">
                  AI STYLIST
                </div>

                <h2>Sofia</h2>

              </div>

              <span className="online">
                ● Online
              </span>

            </div>

            <div className="stylist-welcome">

              <div>

                <h3>
                  Looking at {product.name}
                </h3>

                <p>
                  I'm Sofia, your personal
                  fashion stylist.
                </p>

              </div>

              <div className="stylist-avatar">
                S
              </div>

            </div>

            <div className="stylist-actions">

              <button
                onClick={() => {
                  register("styleChanges");
                  navigate("stylist");
                }}
              >
                <Sparkles size={14} />
                What should I choose?
              </button>

              <button
                onClick={() => {
                  register("materialChanges");
                  navigate("material");
                }}
              >
                ✧ Tell me about the fabric
              </button>

              <button
                onClick={() => {
                  register("styleChanges");
                  navigate("stylist");
                }}
              >
                ✦ Suggest accessories
              </button>

              <button
                onClick={() => {
                  register("compareChanges");
                  navigate("ar");
                }}
              >
                ⇄ Compare similar dresses
              </button>

              <button
                onClick={() => {
                  register("styleChanges");
                  navigate("stylist");
                }}
              >
                ☆ How should I care for it?
              </button>

            </div>

            <button
              className="chat-entry"
              onClick={() => {
                register("styleChanges");
                navigate("stylist");
              }}
            >
              Ask Sofia anything...
              <Send size={15} />
            </button>

          </div>

          {/* MATERIAL */}

          <div className="feature-card">

            <div className="feature-title-row">

              <div>

                <div className="small-caps">
                  MATERIAL VIEWER
                </div>

                <h3>
                  Explore the fabric in detail
                </h3>

              </div>

              <button
                className="text-button"
                onClick={() => {
                  register(
                    "materialChanges"
                  );

                  navigate("material");
                }}
              >
                View All
              </button>

            </div>

            <div className="material-preview">

              <img
                src={product.materialImage || product.image}
                alt={`${product.material} close-up`}
              />

              <div className="material-details">
                <strong>
                  {product.material}
                </strong>

                <span>
                  Material information for this piece.
                </span>

                <span>
                  Colour · {color}
                </span>

                <span>
                  Product · {product.name}
                </span>

                <button
                  className="button outline wide"
                  onClick={() => {
                    register("materialChanges");
                    navigate("material");
                  }}
                >
                  Explore Material
                </button>
              </div>
            </div>
          </div>

          {/* COMPARE */}

          {/* COMPARE */}

          {/* COMPARE */}

          <div
            className="feature-card"
            style={{
              padding: 18,
              overflow: "hidden",
            }}
          >
            {/* HEADER */}

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: 12,
              }}
            >
              <div style={{ minWidth: 0 }}>
                <div className="small-caps">
                  COMPARE
                </div>

                <h3
                  style={{
                    margin: "5px 0 4px",
                    fontSize: 20,
                    lineHeight: 1.15,
                    letterSpacing: "-0.02em",
                  }}
                >
                  Compare what matters
                </h3>

                <p
                  style={{
                    margin: 0,
                    fontSize: 12,
                    lineHeight: 1.5,
                    color: "#777068",
                  }}
                >
                  Choose another piece and focus on the details that matter to you.
                </p>
              </div>

              <button
                className="text-button"
                style={{
                  flexShrink: 0,
                  paddingTop: 4,
                  fontSize: 11,
                }}
                onClick={() => {
                  register("compareChanges");
                  navigate("ar");
                }}
              >
                Spatial Compare
              </button>
            </div>

            {(() => {
              const compareProduct =
                products.find(
                  (item) => item.id === compareProductId
                ) ||
                products.find(
                  (item) => item.id !== product.id
                );

              if (!compareProduct) {
                return null;
              }

              const priorityOptions = [
                ["occasion", "Occasion"],
                ["color", "Colour"],
                ["material", "Material"],
                ["silhouette", "Silhouette"],
                ["price", "Price"],
              ];

              const rows = {
                occasion: {
                  label: "Occasion",
                  a:
                    product.occasions?.join(" · ") ||
                    "—",
                  b:
                    compareProduct.occasions?.join(" · ") ||
                    "—",
                },

                color: {
                  label: "Colour",
                  a:
                    product.colors?.join(" · ") ||
                    product.color ||
                    "—",
                  b:
                    compareProduct.colors?.join(" · ") ||
                    compareProduct.color ||
                    "—",
                },

                material: {
                  label: "Material",
                  a: product.material || "—",
                  b: compareProduct.material || "—",
                },

                silhouette: {
                  label: "Silhouette",
                  a: product.silhouette || "—",
                  b: compareProduct.silhouette || "—",
                },

                price: {
                  label: "Price",
                  a: `AED ${product.price.toLocaleString()}`,
                  b: `AED ${compareProduct.price.toLocaleString()}`,
                },
              };

              return (
                <>
                  {/* PRODUCT PICKER */}

                  <div style={{ marginTop: 22 }}>
                    <div className="small-caps">
                      COMPARE WITH
                    </div>

                    <div
                      style={{
                        display: "flex",
                        gap: 8,
                        overflowX: "auto",
                        paddingTop: 10,
                        paddingBottom: 3,
                        scrollbarWidth: "none",
                      }}
                    >
                      {products
                        .filter(
                          (item) => item.id !== product.id
                        )
                        .map((item) => {
                          const active =
                            compareProductId === item.id;

                          return (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => {
                                setCompareProductId(item.id);

                                trackInteraction(
                                  "compare",
                                  item.id,
                                  {
                                    productId: product.id,
                                    compareProductId: item.id,
                                    source: "smart-compare",
                                  }
                                );
                              }}
                              style={{
                                flex: "0 0 auto",
                                border: active
                                  ? "1px solid #171717"
                                  : "1px solid #ddd6ce",
                                background: active
                                  ? "#171717"
                                  : "#fff",
                                color: active
                                  ? "#fff"
                                  : "#27231f",
                                borderRadius: 999,
                                padding: "9px 13px",
                                fontSize: 12,
                                lineHeight: 1,
                                whiteSpace: "nowrap",
                                cursor: "pointer",
                              }}
                            >
                              {item.name}
                            </button>
                          );
                        })}
                    </div>
                  </div>

                  {/* PRIORITIES */}

                  <div style={{ marginTop: 20 }}>
                    <div className="small-caps">
                      PRIORITIES
                    </div>

                    <div
                      style={{
                        display: "flex",
                        gap: 7,
                        overflowX: "auto",
                        paddingTop: 10,
                        paddingBottom: 3,
                        scrollbarWidth: "none",
                      }}
                    >
                      {priorityOptions.map(
                        ([key, label]) => {
                          const active =
                            comparePriorities.includes(key);

                          return (
                            <button
                              key={key}
                              type="button"
                              onClick={() => {
                                setComparePriorities(
                                  (current) =>
                                    active
                                      ? current.filter(
                                          (item) =>
                                            item !== key
                                        )
                                      : [
                                          ...current,
                                          key,
                                        ]
                                );

                                trackInteraction(
                                  "compare_priority",
                                  key,
                                  {
                                    productId: product.id,
                                    compareProductId:
                                      compareProduct.id,
                                    enabled: !active,
                                  }
                                );
                              }}
                              style={{
                                flex: "0 0 auto",
                                border: active
                                  ? "1px solid #171717"
                                  : "1px solid #ddd6ce",
                                background: active
                                  ? "#171717"
                                  : "#fff",
                                color: active
                                  ? "#fff"
                                  : "#27231f",
                                borderRadius: 999,
                                padding: "8px 12px",
                                fontSize: 11,
                                whiteSpace: "nowrap",
                                cursor: "pointer",
                              }}
                            >
                              {label}
                            </button>
                          );
                        }
                      )}
                    </div>
                  </div>

                  {/* PRODUCT COMPARISON */}

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "minmax(0,1fr) 34px minmax(0,1fr)",
                      gap: 10,
                      alignItems: "start",
                      marginTop: 22,
                    }}
                  >
                    {/* PRODUCT A */}

                    <div style={{ minWidth: 0 }}>
                      <img
                        src={product.image}
                        alt={product.name}
                        style={{
                          width: "100%",
                          aspectRatio: "0.82",
                          objectFit: "cover",
                          borderRadius: 14,
                          display: "block",
                        }}
                      />

                      <div
                        style={{
                          marginTop: 9,
                          fontSize: 13,
                          fontWeight: 600,
                          lineHeight: 1.25,
                        }}
                      >
                        {product.name}
                      </div>

                      <div
                        style={{
                          marginTop: 4,
                          fontSize: 11,
                          color: "#79726a",
                        }}
                      >
                        AED {product.price.toLocaleString()}
                      </div>
                    </div>

                    {/* VS */}

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        paddingTop: 70,
                      }}
                    >
                      <div
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: "50%",
                          border: "1px solid #ddd6ce",
                          background: "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 10,
                          color: "#625b54",
                          flexShrink: 0,
                        }}
                      >
                        VS
                      </div>
                    </div>

                    {/* PRODUCT B */}

                    <div style={{ minWidth: 0 }}>
                      <img
                        src={compareProduct.image}
                        alt={compareProduct.name}
                        style={{
                          width: "100%",
                          aspectRatio: "0.82",
                          objectFit: "cover",
                          borderRadius: 14,
                          display: "block",
                        }}
                      />

                      <div
                        style={{
                          marginTop: 9,
                          fontSize: 13,
                          fontWeight: 600,
                          lineHeight: 1.25,
                        }}
                      >
                        {compareProduct.name}
                      </div>

                      <div
                        style={{
                          marginTop: 4,
                          fontSize: 11,
                          color: "#79726a",
                        }}
                      >
                        AED {compareProduct.price.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  {/* ATTRIBUTE TABLE */}

                  {comparePriorities.length > 0 ? (
                    <div
                      style={{
                        marginTop: 22,
                        borderTop: "1px solid #e5dfd7",
                      }}
                    >
                      {comparePriorities.map((key) => {
                        const row = rows[key];

                        return (
                          <div
                            key={key}
                            style={{
                              display: "grid",
                              gridTemplateColumns:
                                "72px minmax(0,1fr) minmax(0,1fr)",
                              gap: 12,
                              padding: "13px 0",
                              borderBottom:
                                "1px solid #e5dfd7",
                            }}
                          >
                            <div
                              style={{
                                fontSize: 10,
                                fontWeight: 700,
                                textTransform: "uppercase",
                                letterSpacing: "0.06em",
                                color: "#7b736b",
                              }}
                            >
                              {row.label}
                            </div>

                            <div
                              style={{
                                minWidth: 0,
                                fontSize: 11,
                                lineHeight: 1.45,
                                color: "#302b27",
                              }}
                            >
                              {row.a}
                            </div>

                            <div
                              style={{
                                minWidth: 0,
                                fontSize: 11,
                                lineHeight: 1.45,
                                color: "#302b27",
                              }}
                            >
                              {row.b}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div
                      style={{
                        marginTop: 18,
                        padding: "12px 13px",
                        borderRadius: 12,
                        background: "#f6f2ed",
                        color: "#756d65",
                        fontSize: 11,
                      }}
                    >
                      Select a priority to show the comparison.
                    </div>
                  )}

                  {/* ACTIONS */}

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 8,
                      marginTop: 18,
                    }}
                  >
                    <button
                      className="button dark"
                      style={{
                        minHeight: 42,
                        fontSize: 11,
                      }}
                      onClick={() => onAddBag(product)}
                    >
                      Add A to Bag
                    </button>

                    <button
                      className="button outline"
                      style={{
                        minHeight: 42,
                        fontSize: 11,
                      }}
                      onClick={() =>
                        onAddBag(compareProduct)
                      }
                    >
                      Add B to Bag
                    </button>
                  </div>
                </>
              );
            })()}
          </div>

          {/* COMPLETE THE LOOK */}

          <div className="feature-card">

            <div className="feature-title-row">

              <div>

                <div className="small-caps">
                  COMPLETE THE LOOK
                </div>

                <h3>
                  Accessories for this piece
                </h3>

              </div>

              <button
                className="text-button"
                onClick={() =>
                  navigate("complete-look")
                }
              >
                View All
              </button>

            </div>

            <div className="accessory-grid">

              {accessories.map((item) => (

                <div
                  className="accessory-item"
                  key={item.id}
                >

                  <img
                    src={item.image}
                    alt={item.name}
                  />

                  <strong>
                    {item.name}
                  </strong>

                  <span>
                    AED{" "}
                    {item.price.toLocaleString()}
                  </span>

                </div>

              ))}

            </div>

          </div>

          {/* REVIEWS */}

          <div className="feature-card reviews-card">

            <div className="feature-title-row">

              <div>

                <div className="small-caps">
                  REVIEWS
                </div>

                <h3>
                  4.8 ★★★★★
                </h3>

              </div>

              <span className="small-caps">
                24 Reviews
              </span>

            </div>

            <div className="review-strip">

              {[1, 2, 3, 4].map((item) => (

                <img
                  key={item}
                  src={product.image}
                  alt={`Review ${item}`}
                />

              ))}

            </div>

          </div>

          {/* DELIVERY */}

          <div className="delivery-row">

            <div>
              <strong>
                Free Delivery
              </strong>
              <span>2–4 Days</span>
            </div>

            <div>
              <strong>
                30-Day Return
              </strong>
              <span>Easy Returns</span>
            </div>

            <div>
              <strong>
                Secure Payment
              </strong>
              <span>100% Secure</span>
            </div>

            <div>
              <strong>
                Luxury Packaging
              </strong>
              <span>Signature Box</span>
            </div>

          </div>

        </div>
      </div>

      <AdaptiveDecision
        decision={adaptiveDecision}
        navigate={navigate}
        onAction={(decision) => {
          trackInteraction("decision_action", decision.type, {
            productId: product.id,
          });

          if (decision.target === "size") {
            setShowSizeGuide(true);
            return;
          }

          if (decision.target === "purchase") {
            document
              .getElementById("purchase-options")
              ?.scrollIntoView({
                behavior: "smooth",
                block: "center",
              });
            return;
          }

          if (decision.target) {
            navigate(decision.target);
          }
        }}
      />

      {showSizeGuide && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            background: "rgba(20,18,16,.38)",
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <div
            style={{
              width: "min(460px, 100%)",
              background: "#fff",
              borderRadius: 20,
              padding: 28,
              boxShadow: "0 30px 90px rgba(0,0,0,.22)",
            }}
          >
            <div className="small-caps">SIZE GUIDANCE</div>

            <h2
              style={{
                fontFamily: "Georgia, serif",
                fontWeight: 400,
                fontSize: 28,
                margin: "8px 0 10px",
              }}
            >
              Find your starting size
            </h2>

            <p
              style={{
                color: "#6a635c",
                lineHeight: 1.6,
                fontSize: 14,
                marginBottom: 22,
              }}
            >
              Use your bust, waist and hip measurements to get a transparent
              starting point. Height and weight are supporting context, while
              your usual size is only used as a secondary tie-breaker. This is
              prototype guidance, not a substitute for a brand size chart.
            </p>

            <div style={{ display: "grid", gap: 14 }}>
              <label>
                <span className="field-label">Height (cm)</span>
                <input
                  type="number"
                  min="120"
                  max="220"
                  value={sizeProfile.height}
                  onChange={(e) =>
                    setSizeProfile((current) => ({
                      ...current,
                      height: e.target.value,
                    }))
                  }
                  placeholder="e.g. 168"
                  style={{
                    width: "100%",
                    marginTop: 6,
                    padding: "12px 14px",
                    border: "1px solid #ddd7cf",
                    borderRadius: 10,
                  }}
                />
              </label>

              <label>
                <span className="field-label">Weight (kg)</span>
                <input
                  type="number"
                  min="30"
                  max="200"
                  value={sizeProfile.weight}
                  onChange={(e) =>
                    setSizeProfile((current) => ({
                      ...current,
                      weight: e.target.value,
                    }))
                  }
                  placeholder="e.g. 60"
                  style={{
                    width: "100%",
                    marginTop: 6,
                    padding: "12px 14px",
                    border: "1px solid #ddd7cf",
                    borderRadius: 10,
                  }}
                />
              </label>

              <label>
                <span className="field-label">Bust (cm)</span>
                <input
                  type="number"
                  min="60"
                  max="160"
                  value={sizeProfile.bust}
                  onChange={(e) =>
                    setSizeProfile((current) => ({
                      ...current,
                      bust: e.target.value,
                    }))
                  }
                  placeholder="e.g. 86"
                  style={{
                    width: "100%",
                    marginTop: 6,
                    padding: "12px 14px",
                    border: "1px solid #ddd7cf",
                    borderRadius: 10,
                  }}
                />
              </label>

              <label>
                <span className="field-label">Waist (cm)</span>
                <input
                  type="number"
                  min="50"
                  max="150"
                  value={sizeProfile.waist}
                  onChange={(e) =>
                    setSizeProfile((current) => ({
                      ...current,
                      waist: e.target.value,
                    }))
                  }
                  placeholder="e.g. 68"
                  style={{
                    width: "100%",
                    marginTop: 6,
                    padding: "12px 14px",
                    border: "1px solid #ddd7cf",
                    borderRadius: 10,
                  }}
                />
              </label>

              <label>
                <span className="field-label">Hip (cm)</span>
                <input
                  type="number"
                  min="70"
                  max="170"
                  value={sizeProfile.hip}
                  onChange={(e) =>
                    setSizeProfile((current) => ({
                      ...current,
                      hip: e.target.value,
                    }))
                  }
                  placeholder="e.g. 92"
                  style={{
                    width: "100%",
                    marginTop: 6,
                    padding: "12px 14px",
                    border: "1px solid #ddd7cf",
                    borderRadius: 10,
                  }}
                />
              </label>

              <label>
                <span className="field-label">Usual size</span>
                <select
                  value={sizeProfile.usualSize}
                  onChange={(e) =>
                    setSizeProfile((current) => ({
                      ...current,
                      usualSize: e.target.value,
                    }))
                  }
                  style={{
                    width: "100%",
                    marginTop: 6,
                    padding: "12px 14px",
                    border: "1px solid #ddd7cf",
                    borderRadius: 10,
                    background: "#fff",
                  }}
                >
                  {["XS", "S", "M", "L", "XL"].map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {sizeRecommendation && (
              <div
                style={{
                  marginTop: 20,
                  padding: 16,
                  background: "#f5f1eb",
                  borderRadius: 14,
                }}
              >
                <div className="small-caps">STARTING POINT</div>

                <strong
                  style={{
                    display: "block",
                    fontFamily: "Georgia, serif",
                    fontSize: 26,
                    marginTop: 6,
                  }}
                >
                  {sizeRecommendation.size}
                </strong>

                <p
                  style={{
                    margin: "8px 0 0",
                    color: "#655f59",
                    lineHeight: 1.6,
                    fontSize: 13,
                  }}
                >
                  {sizeRecommendation.text}
                </p>
              </div>
            )}

            <div
              style={{
                display: "flex",
                gap: 10,
                marginTop: 22,
              }}
            >
              <button
                className="button outline wide"
                onClick={() => setShowSizeGuide(false)}
              >
                Cancel
              </button>

              <button
                className="button dark wide"
                onClick={calculateSizeRecommendation}
              >
                Calculate
              </button>
            </div>
          </div>
        </div>
      )}

     
    </div>
  );
}
     
function ARView({
  product,
  onBack,
  onAddBag,
  trackInteraction,
}) {
  const mountRef = useRef(null);

  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const sessionRef = useRef(null);

  const reticleRef = useRef(null);
  const hitTestSourceRef = useRef(null);
  const referenceSpaceRef = useRef(null);

  const productARef = useRef(null);
  const productBRef = useRef(null);

  const shadowARef = useRef(null);
  const shadowBRef = useRef(null);

  const uiGroupRef = useRef(null);
  const uiButtonsRef = useRef([]);
  const raycasterRef = useRef(
    new THREE.Raycaster()
  );

  const secondProductRef = useRef(null);
  const dressColorRef = useRef(
    product.color || "Champagne"
  );

  const [arActive, setArActive] =
    useState(false);

  const [arError, setArError] =
    useState("");

  const [dressColor, setDressColor] =
    useState(
      product.color || "Champagne"
    );

  const [secondProduct, setSecondProduct] =
    useState(null);

  const [placed, setPlaced] =
    useState(false);

  const colorOptions = [
    {
      name: "Champagne",
      hex: "#d7c3a0",
    },
    {
      name: "Black",
      hex: "#111111",
    },
    {
      name: "Burgundy",
      hex: "#4a0b08",
    },
    {
      name: "Ivory",
      hex: "#f1ece3",
    },
  ];

  const modelPaths = {
    1: "/models/dress-a.glb",
    2: "/models/dress-b.glb",
    3: "/models/dress-c.glb",
    4: "/models/dress-d.glb",
  };

  function getModelPath(item) {
    return modelPaths[item?.id] || null;
  }

  function applyColorToObject(
    object,
    hex
  ) {
    if (!object) return;

    object.traverse((child) => {
      if (
        !child.isMesh ||
        !child.material
      ) {
        return;
      }

      const materials =
        Array.isArray(
          child.material
        )
          ? child.material
          : [child.material];

      materials.forEach(
        (material) => {
          if (material.color) {
            material.color.set(hex);
          }

          material.needsUpdate = true;
        }
      );
    });
  }

  function disposeObject(object) {
    if (!object) return;

    object.traverse((child) => {
      if (child.geometry) {
        child.geometry.dispose();
      }

      if (child.material) {
        const materials =
          Array.isArray(
            child.material
          )
            ? child.material
            : [child.material];

        materials.forEach(
          (material) => {
            if (material.map) {
              material.map.dispose();
            }

            material.dispose();
          }
        );
      }
    });
  }

  function removeModel(ref) {
    if (!ref.current) return;

    const model =
      ref.current;

    model.parent?.remove(model);

    disposeObject(model);

    ref.current = null;
  }

  function removeShadow(ref) {
    if (!ref.current) return;

    ref.current.parent?.remove(
      ref.current
    );

    if (ref.current.geometry) {
      ref.current.geometry.dispose();
    }

    if (ref.current.material) {
      ref.current.material.dispose();
    }

    ref.current = null;
  }

  function fitModelToHeight(
    object,
    targetHeight = 1.65
  ) {
    const box =
      new THREE.Box3().setFromObject(
        object
      );

    const size =
      new THREE.Vector3();

    box.getSize(size);

    if (
      !size.y ||
      !Number.isFinite(size.y)
    ) {
      return;
    }

    const scale =
      targetHeight / size.y;

    object.scale.setScalar(
      scale
    );

    const adjustedBox =
      new THREE.Box3().setFromObject(
        object
      );

    object.position.y -=
      adjustedBox.min.y;
  }

  function createGroundShadow() {
    const geometry =
      new THREE.CircleGeometry(
        0.72,
        48
      );

    const material =
      new THREE.MeshBasicMaterial({
        color: 0x000000,
        transparent: true,
        opacity: 0.12,
        depthWrite: false,
      });

    const shadow =
      new THREE.Mesh(
        geometry,
        material
      );

    shadow.rotation.x =
      -Math.PI / 2;

    shadow.visible = false;

    return shadow;
  }

  function loadModel(
    item,
    onLoaded,
    onError
  ) {
    const path =
      getModelPath(item);

    if (!path) {
      onError?.(
        new Error(
          `${item?.name || "Product"} has no GLB model.`
        )
      );

      return;
    }

    const loader =
      new GLTFLoader();

    const dracoLoader =
      new DRACOLoader();

    dracoLoader.setDecoderPath(
      "https://www.gstatic.com/draco/versioned/decoders/1.5.7/"
    );

    loader.setDRACOLoader(
      dracoLoader
    );

    loader.load(
      path,
      (gltf) => {
        const model =
          gltf.scene;

        fitModelToHeight(
          model
        );

        onLoaded(model);

        dracoLoader.dispose();
      },
      undefined,
      (error) => {
        console.error(
          "PRÉSENCE GLB error:",
          error
        );

        dracoLoader.dispose();

        onError?.(error);
      }
    );
  }

  function wrapText(
    context,
    text,
    maxWidth
  ) {
    const words =
      String(text).split(" ");

    const lines = [];

    let current = "";

    words.forEach(
      (word) => {
        const test =
          current
            ? `${current} ${word}`
            : word;

        const width =
          context.measureText(
            test
          ).width;

        if (
          width > maxWidth &&
          current
        ) {
          lines.push(
            current
          );

          current = word;
        } else {
          current = test;
        }
      }
    );

    if (current) {
      lines.push(current);
    }

    return lines;
  }

  function createUIButton({
    title,
    subtitle = "",
    position,
    width = 0.45,
    height = 0.18,
    action,
    value = null,
    selected = false,
  }) {
    const canvas =
      document.createElement(
        "canvas"
      );

    canvas.width = 768;
    canvas.height = 320;

    const context =
      canvas.getContext("2d");

    context.fillStyle =
      selected
        ? "#171717"
        : "#f7f5f0";

    context.fillRect(
      0,
      0,
      canvas.width,
      canvas.height
    );

    context.strokeStyle =
      selected
        ? "#171717"
        : "#d3ccc3";

    context.lineWidth = 8;

    context.strokeRect(
      4,
      4,
      canvas.width - 8,
      canvas.height - 8
    );

    context.fillStyle =
      selected
        ? "#ffffff"
        : "#171717";

    context.font =
      "600 36px Arial";

    context.textAlign =
      "center";

    context.textBaseline =
      "middle";

    const titleLines =
      wrapText(
        context,
        title,
        canvas.width - 70
      );

    const lineHeight = 42;

    titleLines
      .slice(0, 2)
      .forEach(
        (line, index) => {
          context.fillText(
            line,
            canvas.width / 2,
            subtitle
              ? 115 +
                  index *
                    lineHeight
              : 150 +
                  index *
                    lineHeight
          );
        }
      );

    if (subtitle) {
      context.fillStyle =
        selected
          ? "#ddd7cf"
          : "#71695f";

      context.font =
        "24px Arial";

      context.fillText(
        subtitle,
        canvas.width / 2,
        255
      );
    }

    const texture =
      new THREE.CanvasTexture(
        canvas
      );

    texture.colorSpace =
      THREE.SRGBColorSpace;

    const material =
      new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        depthTest: false,
      });

    const geometry =
      new THREE.PlaneGeometry(
        width,
        height
      );

    const mesh =
      new THREE.Mesh(
        geometry,
        material
      );

    mesh.position.copy(
      position
    );

    mesh.renderOrder = 1000;

    mesh.userData.action =
      action;

    mesh.userData.value =
      value;

    uiButtonsRef.current.push(
      mesh
    );

    return mesh;
  }

  function clearUI() {
    const group =
      uiGroupRef.current;

    if (!group) return;

    group.children.forEach(
      (child) => {
        disposeObject(child);
      }
    );

    group.clear();

    uiButtonsRef.current = [];
  }

  function addUIPanel(
    width,
    height
  ) {
    const geometry =
      new THREE.PlaneGeometry(
        width,
        height
      );

    const material =
      new THREE.MeshBasicMaterial({
        color: 0xf7f5f0,
        transparent: true,
        opacity: 0.94,
        depthTest: false,
        side: THREE.DoubleSide,
      });

    const panel =
      new THREE.Mesh(
        geometry,
        material
      );

    panel.renderOrder = 900;

    panel.position.z =
      0.03;

    uiGroupRef.current.add(
      panel
    );
  }

  function renderMainUI() {
    const group =
      uiGroupRef.current;

    if (!group) return;

    clearUI();

    addUIPanel(
      2.15,
      secondProductRef.current
        ? 0.92
        : 0.70
    );

    /*
      COLOURS
    */

    colorOptions.forEach(
      (option, index) => {
        const x =
          -0.78 +
          index * 0.52;

        const button =
          createUIButton({
            title:
              option.name,
            position:
              new THREE.Vector3(
                x,
                0.22,
                0
              ),
            width: 0.45,
            height: 0.17,
            action:
              "colour",
            value:
              option.name,
            selected:
              dressColorRef.current ===
              option.name,
          });

        group.add(button);
      }
    );

    /*
      COMPARE
    */

    const compareButton =
      createUIButton({
        title:
          secondProductRef.current
            ? "Change Product B"
            : "Compare",
        position:
          new THREE.Vector3(
            -0.58,
            -0.08,
            0
          ),
        width: 0.78,
        height: 0.18,
        action:
          "openCompare",
      });

    group.add(
      compareButton
    );

    /*
      ADD A
    */

    const addA =
      createUIButton({
        title:
          "Add A to Bag",
        position:
          new THREE.Vector3(
            0.30,
            -0.08,
            0
          ),
        width: 0.68,
        height: 0.18,
        action:
          "bagA",
      });

    group.add(addA);

    /*
      ADD B
    */

    if (
      secondProductRef.current
    ) {
      const addB =
        createUIButton({
          title:
            "Add B to Bag",
          position:
            new THREE.Vector3(
              0,
              -0.33,
              0
            ),
          width: 0.82,
          height: 0.18,
          action:
            "bagB",
        });

      group.add(addB);

      const removeB =
        createUIButton({
          title:
            "Remove B",
          position:
            new THREE.Vector3(
              0.72,
              -0.33,
              0
            ),
          width: 0.55,
          height: 0.18,
          action:
            "removeB",
        });

      group.add(removeB);
    }
  }

  function renderCompareUI() {
    const group =
      uiGroupRef.current;

    if (!group) return;

    clearUI();

    addUIPanel(
      2.55,
      1.30
    );

    /*
      TITLE
    */

    const title =
      createUIButton({
        title:
          "Choose Product B",
        subtitle:
          "Select a piece to compare in AR",
        position:
          new THREE.Vector3(
            0,
            0.42,
            0
          ),
        width: 1.60,
        height: 0.20,
        action:
          "noop",
      });

    group.add(title);

    /*
      PRODUCT LIST
    */

    products
      .filter(
        (item) =>
          item.id !==
          product.id
      )
      .forEach(
        (item, index) => {
          const positions = [
            -0.78,
            0,
            0.78,
          ];

          const button =
            createUIButton({
              title:
                item.name,
              subtitle:
                `${item.brand} · AED ${item.price.toLocaleString()}`,
              position:
                new THREE.Vector3(
                  positions[index],
                  0.02,
                  0
                ),
              width: 0.70,
              height: 0.34,
              action:
                "chooseProduct",
              value:
                item.id,
              selected:
                secondProductRef.current
                  ?.id === item.id,
            });

          group.add(button);
        }
      );

    /*
      BACK
    */

    const back =
      createUIButton({
        title:
          "Back",
        position:
          new THREE.Vector3(
            0,
            -0.40,
            0
          ),
        width: 0.55,
        height: 0.18,
        action:
          "closeCompare",
      });

    group.add(back);
  }

  function addAProductToBag() {
    const item = {
      ...product,
      color:
        dressColorRef.current,
    };

    stopAR();

    onAddBag(item);
  }

  function addBProductToBag() {
    const item =
      secondProductRef.current;

    if (!item) {
      setArError(
        "Choose Product B first."
      );
      return;
    }

    const bagItem = {
      ...item,
      color:
        dressColorRef.current,
    };

    stopAR();

    onAddBag(bagItem);
  }

  function chooseColour(
    colourName
  ) {
    const option =
      colorOptions.find(
        (item) =>
          item.name ===
          colourName
      );

    if (!option) return;

    dressColorRef.current =
      option.name;

    setDressColor(
      option.name
    );

    applyColorToObject(
      productARef.current,
      option.hex
    );

    applyColorToObject(
      productBRef.current,
      option.hex
    );

    trackInteraction?.(
      "colour",
      option.name,
      {
        productId:
          product.id,
        source: "ar",
      }
    );

    renderMainUI();
  }

  function chooseProductB(
    item
  ) {
    secondProductRef.current =
      item;

    setSecondProduct(
      item
    );

    trackInteraction?.(
      "compare",
      item.id,
      {
        productId:
          product.id,
        comparedProductId:
          item.id,
        source: "ar",
      }
    );

    loadComparisonModel(
      item
    );

    renderMainUI();
  }

  function removeProductB() {
    removeModel(
      productBRef
    );

    removeShadow(
      shadowBRef
    );

    secondProductRef.current =
      null;

    setSecondProduct(
      null
    );

    renderMainUI();
  }

  function handleUIAction(
    button
  ) {
    const action =
      button.userData.action;

    if (
      action ===
      "noop"
    ) {
      return;
    }

    if (
      action ===
      "colour"
    ) {
      chooseColour(
        button.userData.value
      );

      return;
    }

    if (
      action ===
      "openCompare"
    ) {
      renderCompareUI();

      return;
    }

    if (
      action ===
      "closeCompare"
    ) {
      renderMainUI();

      return;
    }

    if (
      action ===
      "chooseProduct"
    ) {
      const item =
        products.find(
          (productItem) =>
            productItem.id ===
            button.userData.value
        );

      if (!item) return;

      chooseProductB(
        item
      );

      return;
    }

    if (
      action ===
      "removeB"
    ) {
      removeProductB();

      return;
    }

    if (
      action ===
      "bagA"
    ) {
      addAProductToBag();

      return;
    }

    if (
      action ===
      "bagB"
    ) {
      addBProductToBag();
    }
  }

  function loadComparisonModel(
    item
  ) {
    removeModel(
      productBRef
    );

    removeShadow(
      shadowBRef
    );

    loadModel(
      item,
      (model) => {
        const option =
          colorOptions.find(
            (color) =>
              color.name ===
              dressColorRef.current
          );

        if (option) {
          applyColorToObject(
            model,
            option.hex
          );
        }

        model.visible =
          placed;

        sceneRef.current.add(
          model
        );

        productBRef.current =
          model;

        const shadow =
          createGroundShadow();

        shadow.visible =
          placed;

        sceneRef.current.add(
          shadow
        );

        shadowBRef.current =
          shadow;

        if (placed) {
          updateComparisonPosition();
        }
      },
      () => {
        setArError(
          `${item.name} could not be loaded in AR.`
        );
      }
    );
  }

  function updateProductPositions(
    basePosition
  ) {
    const A =
      productARef.current;

    if (A) {
      A.position.copy(
        basePosition
      );
    }

    if (
      shadowARef.current
    ) {
      shadowARef.current.position.set(
        basePosition.x,
        basePosition.y +
          0.004,
        basePosition.z
      );
    }

    updateComparisonPosition(
      basePosition
    );
  }

  function updateComparisonPosition(
    basePosition = null
  ) {
    const A =
      productARef.current;

    const B =
      productBRef.current;

    if (!A || !B) {
      return;
    }

    const origin =
      basePosition ||
      A.position;

    B.position.set(
      origin.x + 0.78,
      origin.y,
      origin.z
    );

    if (
      shadowBRef.current
    ) {
      shadowBRef.current.position.set(
        origin.x + 0.78,
        origin.y +
          0.004,
        origin.z
      );
    }
  }

  function placeProducts() {
    const reticle =
      reticleRef.current;

    if (
      !reticle ||
      !reticle.visible
    ) {
      return;
    }

    const position =
      reticle.position.clone();

    updateProductPositions(
      position
    );

    if (
      productARef.current
    ) {
      productARef.current.visible =
        true;
    }

    if (
      shadowARef.current
    ) {
      shadowARef.current.visible =
        true;
    }

    if (
      productBRef.current
    ) {
      productBRef.current.visible =
        true;
    }

    if (
      shadowBRef.current
    ) {
      shadowBRef.current.visible =
        true;
    }

    setPlaced(true);
  }

  function getControllerHit(
    controller
  ) {
    const raycaster =
      raycasterRef.current;

    const tempMatrix =
      new THREE.Matrix4();

    tempMatrix.identity();

    tempMatrix.extractRotation(
      controller.matrixWorld
    );

    raycaster.ray.origin.setFromMatrixPosition(
      controller.matrixWorld
    );

    raycaster.ray.direction
      .set(
        0,
        0,
        -1
      )
      .applyMatrix4(
        tempMatrix
      );

    const hits =
      raycaster.intersectObjects(
        uiButtonsRef.current,
        false
      );

    return hits[0] || null;
  }

  function setupController(
    controller
  ) {
    const rayGeometry =
      new THREE.BufferGeometry().setFromPoints(
        [
          new THREE.Vector3(
            0,
            0,
            0
          ),
          new THREE.Vector3(
            0,
            0,
            -1
          ),
        ]
      );

    const rayMaterial =
      new THREE.LineBasicMaterial({
        color: 0x111111,
        transparent: true,
        opacity: 0.85,
      });

    const ray =
      new THREE.Line(
        rayGeometry,
        rayMaterial
      );

    ray.scale.z = 3;

    controller.add(
      ray
    );

    controller.addEventListener(
      "select",
      () => {
        const hit =
          getControllerHit(
            controller
          );

        if (hit) {
          handleUIAction(
            hit.object
          );

          return;
        }

        placeProducts();
      }
    );

    sceneRef.current.add(
      controller
    );
  }

  async function startAR() {
    setArError("");

    if (!navigator.xr) {
      setArError(
        "WebXR is not available in this browser."
      );

      return;
    }

    try {
      const supported =
        await navigator.xr.isSessionSupported(
          "immersive-ar"
        );

      if (!supported) {
        setArError(
          "Immersive AR is not supported by this environment."
        );

        return;
      }

      const renderer =
        rendererRef.current;

      if (!renderer) {
        return;
      }

      const session =
        await navigator.xr.requestSession(
          "immersive-ar",
          {
            requiredFeatures: [
              "hit-test",
              "local-floor",
            ],
          }
        );

      sessionRef.current =
        session;

      await renderer.xr.setSession(
        session
      );

      referenceSpaceRef.current =
        await session.requestReferenceSpace(
          "local-floor"
        );

      const viewerSpace =
        await session.requestReferenceSpace(
          "viewer"
        );

      hitTestSourceRef.current =
        await session.requestHitTestSource(
          {
            space:
              viewerSpace,
          }
        );

      setArActive(true);

      session.addEventListener(
        "end",
        () => {
          hitTestSourceRef.current =
            null;

          referenceSpaceRef.current =
            null;

          sessionRef.current =
            null;

          setArActive(false);
        }
      );
    } catch (error) {
      console.error(
        "PRÉSENCE AR start error:",
        error
      );

      setArError(
        "Unable to start the AR session."
      );
    }
  }

  async function stopAR() {
    if (
      sessionRef.current
    ) {
      try {
        await sessionRef.current.end();
      } catch {
        // Session may already be ending.
      }
    }

    setArActive(false);
  }
  /*

  OPTIONAL NUMPAD AR CONTROLS

  These are secondary controls for desktop
  / Meta WebXR Emulator testing.

  Existing XR controller controls remain unchanged.

*/

useEffect(() => {
  if (!arActive) return;

  function handleNumpad(event) {
    const code = event.code;

    // Numpad 1 → place current product
    if (code === "Numpad1") {
      event.preventDefault();
      placeProducts();
      return;
    }

    // Numpad 2 → load Dress 2
    if (code === "Numpad2") {
      event.preventDefault();

      const item = products.find(
        (productItem) => productItem.id === 2
      );

      if (item) {
        setSecondProduct(item);
        loadComparisonModel(item);
      }

      return;
    }

    // Numpad 3 → load Dress 3
    if (code === "Numpad3") {
      event.preventDefault();

      const item = products.find(
        (productItem) => productItem.id === 3
      );

      if (item) {
        setSecondProduct(item);
        loadComparisonModel(item);
      }

      return;
    }

    // Numpad 4 → load Dress 4
    if (code === "Numpad4") {
      event.preventDefault();

      const item = products.find(
        (productItem) => productItem.id === 4
      );

      if (item) {
        setSecondProduct(item);
        loadComparisonModel(item);
      }

      return;
    }

    // Numpad 5 → Champagne
    if (code === "Numpad5") {
      event.preventDefault();

      const option = colorOptions.find(
        (item) => item.name === "Champagne"
      );

      if (option) {
        setDressColor(option.name);

        applyColorToObject(
          productARef.current,
          option.hex
        );

        if (productBRef.current) {
          applyColorToObject(
            productBRef.current,
            option.hex
          );
        }
      }

      return;
    }

    // Numpad 6 → Black
    if (code === "Numpad6") {
      event.preventDefault();

      const option = colorOptions.find(
        (item) => item.name === "Black"
      );

      if (option) {
        setDressColor(option.name);

        applyColorToObject(
          productARef.current,
          option.hex
        );

        if (productBRef.current) {
          applyColorToObject(
            productBRef.current,
            option.hex
          );
        }
      }

      return;
    }

    // Numpad 7 → Burgundy
    if (code === "Numpad7") {
      event.preventDefault();

      const option = colorOptions.find(
        (item) => item.name === "Burgundy"
      );

      if (option) {
        setDressColor(option.name);

        applyColorToObject(
          productARef.current,
          option.hex
        );

        if (productBRef.current) {
          applyColorToObject(
            productBRef.current,
            option.hex
          );
        }
      }

      return;
    }

    // Numpad 8 → Ivory
    if (code === "Numpad8") {
      event.preventDefault();

      const option = colorOptions.find(
        (item) => item.name === "Ivory"
      );

      if (option) {
        setDressColor(option.name);

        applyColorToObject(
          productARef.current,
          option.hex
        );

        if (productBRef.current) {
          applyColorToObject(
            productBRef.current,
            option.hex
          );
        }
      }

      return;
    }

    // Numpad 9 → Add current product to bag
    if (code === "Numpad9") {
      event.preventDefault();

      stopAR();

      onAddBag({
        ...product,
        color: dressColor,
      });

      return;
    }

    if (code === "Numpad0") {
      event.preventDefault();

      if (!secondProduct) return;

      stopAR();

      onAddBag({
        ...secondProduct,
        color: dressColor,
      });
    }
  }

  window.addEventListener(
    "keydown",
    handleNumpad
  );

  return () => {
    window.removeEventListener(
      "keydown",
      handleNumpad
    );
  };
}, [arActive, dressColor, secondProduct]);

  useEffect(() => {
    const mount =
      mountRef.current;

    if (!mount) return;

    const scene =
      new THREE.Scene();

    const camera =
      new THREE.PerspectiveCamera(
        70,
        window.innerWidth /
          window.innerHeight,
        0.01,
        20
      );

    const renderer =
      new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      });

    renderer.setPixelRatio(
      Math.min(
        window.devicePixelRatio,
        2
      )
    );

    renderer.setSize(
      window.innerWidth,
      window.innerHeight
    );

    renderer.xr.enabled =
      true;

    renderer.xr.setReferenceSpaceType(
      "local-floor"
    );

    renderer.outputColorSpace =
      THREE.SRGBColorSpace;

    mount.appendChild(
      renderer.domElement
    );

    rendererRef.current =
      renderer;

    sceneRef.current =
      scene;

    /*
      LIGHTING
    */

    scene.add(
      new THREE.HemisphereLight(
        0xffffff,
        0xbbbbff,
        2.2
      )
    );

    const directional =
      new THREE.DirectionalLight(
        0xffffff,
        2
      );

    directional.position.set(
      1,
      3,
      2
    );

    scene.add(
      directional
    );

    /*
      RETICLE
    */

    const reticle =
      new THREE.Mesh(
        new THREE.RingGeometry(
          0.12,
          0.15,
          32
        ),
        new THREE.MeshBasicMaterial({
          color: 0xffffff,
          side:
            THREE.DoubleSide,
        })
      );

    reticle.rotation.x =
      -Math.PI / 2;

    reticle.matrixAutoUpdate =
      false;

    reticle.visible =
      false;

    scene.add(
      reticle
    );

    reticleRef.current =
      reticle;

    /*
      UI GROUP
    */

    const uiGroup =
      new THREE.Group();

    uiGroup.position.set(
      0,
      1.20,
      -1.55
    );

    scene.add(
      uiGroup
    );

    uiGroupRef.current =
      uiGroup;

    renderMainUI();

    /*
      CONTROLLERS
    */

    setupController(
      renderer.xr.getController(0)
    );

    setupController(
      renderer.xr.getController(1)
    );

    /*
      LOAD PRODUCT A
    */

    loadModel(
      product,
      (model) => {
        const option =
          colorOptions.find(
            (item) =>
              item.name ===
              dressColorRef.current
          );

        if (option) {
          applyColorToObject(
            model,
            option.hex
          );
        }

        model.position.set(
          0,
          0,
          -1
        );

        model.visible =
          false;

        scene.add(
          model
        );

        productARef.current =
          model;

        const shadow =
          createGroundShadow();

        scene.add(
          shadow
        );

        shadowARef.current =
          shadow;
      },
      () => {
        setArError(
          "Product A GLB could not be loaded."
        );
      }
    );

    /*
      XR LOOP
    */

    renderer.setAnimationLoop(
      (
        time,
        frame
      ) => {
        if (frame) {
          const session =
            renderer.xr.getSession();

          if (
            session &&
            hitTestSourceRef.current &&
            referenceSpaceRef.current
          ) {
            const hits =
              frame.getHitTestResults(
                hitTestSourceRef.current
              );

            if (
              hits.length > 0
            ) {
              const pose =
                hits[0].getPose(
                  referenceSpaceRef.current
                );

              if (pose) {
                reticle.visible =
                  true;

                reticle.matrix.fromArray(
                  pose.transform
                    .matrix
                );

                reticle.matrix.decompose(
                  reticle.position,
                  reticle.quaternion,
                  reticle.scale
                );
              }
            } else {
              reticle.visible =
                false;
            }
          }
        }

        renderer.render(
          scene,
          camera
        );
      }
    );

    function handleResize() {
      camera.aspect =
        window.innerWidth /
        window.innerHeight;

      camera.updateProjectionMatrix();

      renderer.setSize(
        window.innerWidth,
        window.innerHeight
      );
    }

    window.addEventListener(
      "resize",
      handleResize
    );

    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      );

      if (
        sessionRef.current
      ) {
        sessionRef.current.end();
      }

      hitTestSourceRef.current =
        null;

      referenceSpaceRef.current =
        null;

      removeModel(
        productARef
      );

      removeModel(
        productBRef
      );

      removeShadow(
        shadowARef
      );

      removeShadow(
        shadowBRef
      );

      renderer.setAnimationLoop(
        null
      );

      renderer.dispose();

      if (
        mount.contains(
          renderer.domElement
        )
      ) {
        mount.removeChild(
          renderer.domElement
        );
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: "fixed",
        inset: 0,
        background: "#000",
        overflow: "hidden",
      }}
    >
      {!arActive && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#e9e4dc",
          }}
        >
          <div
            style={{
              width:
                "min(500px, calc(100% - 32px))",
              textAlign: "center",
            }}
          >
            <div className="small-caps">
              SPATIAL EXPERIENCE
            </div>

            <h1
              style={{
                fontFamily:
                  "Georgia, serif",
                fontWeight: 400,
                fontSize: 34,
                margin:
                  "8px 0 10px",
              }}
            >
              {product.name}
            </h1>

            <p
              style={{
                color: "#6a635c",
                fontSize: 13,
                lineHeight: 1.6,
                marginBottom: 20,
              }}
            >
              Place the garment in your
              physical environment, explore
              colour, compare another piece,
              and add your selection to bag.
            </p>

            {arError && (
              <div
                style={{
                  marginBottom: 14,
                  padding: 12,
                  borderRadius: 12,
                  background:
                    "#fff5ee",
                  color:
                    "#654d3e",
                  fontSize: 12,
                  lineHeight: 1.5,
                }}
              >
                {arError}
              </div>
            )}

            <div
              style={{
                display: "flex",
                justifyContent:
                  "center",
                gap: 10,
              }}
            >
              <button
                className="button outline"
                onClick={
                  onBack
                }
              >
                <ArrowLeft
                  size={16}
                />
                Back
              </button>

              <button
                className="button dark"
                onClick={
                  startAR
                }
              >
                <Camera
                  size={16}
                />
                Start Real AR
              </button>
            </div>
          </div>
        </div>
      )}

      {arActive && (
        <div
          style={{
            position: "fixed",
            top: 18,
            left: "50%",
            transform:
              "translateX(-50%)",
            zIndex: 20,
            padding:
              "8px 13px",
            borderRadius: 999,
            background:
              "rgba(247,245,240,.88)",
            color: "#4f4943",
            fontSize: 11,
            letterSpacing:
              ".08em",
            textTransform:
              "uppercase",
            pointerEvents:
              "none",
          }}
        >
          Aim at a surface · Select to place
        </div>
      )}

      {arActive && (
        <button
          className="button outline"
          onClick={
            stopAR
          }
          style={{
            position: "fixed",
            left: 18,
            bottom: 18,
            zIndex: 30,
          }}
        >
          Exit AR
        </button>
      )}

      {arError &&
        arActive && (
          <div
            style={{
              position: "fixed",
              top: 68,
              left: "50%",
              transform:
                "translateX(-50%)",
              zIndex: 30,
              width:
                "min(460px, calc(100% - 32px))",
              padding: 12,
              borderRadius: 12,
              background:
                "rgba(255,248,243,.96)",
              border:
                "1px solid #e5d5c7",
              color: "#5f5147",
              fontSize: 12,
            }}
          >
            {arError}
          </div>
        )}
    </div>
  );
}

function Stylist({
  onBack,
  product,
  personalization,
  adaptiveProfile,
  adaptiveDecision,
}) {
  const storageKey =
    `presence-sofia-history-${product.id}`;

  const [messages, setMessages] = useState(() => {
    try {
      const saved =
        localStorage.getItem(storageKey);

      if (saved) {
        const parsed = JSON.parse(saved);

        if (Array.isArray(parsed) && parsed.length) {
          return parsed;
        }
      }
    } catch (error) {
      console.error(
        "Sofia memory load failed:",
        error
      );
    }

    return [
      {
        from: "sofia",
        text:
          getSofiaFallbackReply(
            product,
            adaptiveProfile
          ),
      },
    ];
  });

  const [value, setValue] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  /*
    SAVE SOFIA MEMORY
  */

  useEffect(() => {
    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify(
          messages.slice(-50)
        )
      );
    } catch (error) {
      console.error(
        "Sofia memory save failed:",
        error
      );
    }
  }, [messages, storageKey]);

  /*
    SEND MESSAGE TO GEMINI
  */

  async function send() {
    const text =
      value.trim();

    if (!text || loading) {
      return;
    }

    const conversation = [
      ...messages,
      {
        from: "user",
        text,
      },
    ];

    setMessages(
      conversation
    );

    setValue("");
    setLoading(true);

    try {
      const response =
        await fetch(
          `${import.meta.env.VITE_API_URL}/api/sofia`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              product,
              products,
              accessories,

              userMessage: text,

              conversation,

              personalization,

              adaptiveProfile,

              adaptiveDecision,
            }),
          }
        );

      if (!response.ok) {
        throw new Error(
          `Sofia request failed: ${response.status}`
        );
      }

      const data =
        await response.json();

      setMessages(
        (current) => [
          ...current,
          {
            from: "sofia",
            text:
              data.reply ||
              "Sofia could not generate a response.",
          },
        ]
      );
    } catch (error) {
      console.error(
        "Sofia Gemini request failed:",
        error
      );

      /*
        IMPORTANT:
        This is now an ERROR message,
        NOT a fake Adaptive Mode response.
      */

      setMessages(
        (current) => [
          ...current,
          {
            from: "sofia",
            text:
              "Sofia is temporarily unavailable. Please try again.",
          },
        ]
      );
    } finally {
      setLoading(false);
    }
  }

  /*
    CLEAR THIS PRODUCT'S SOFIA CHAT
  */

  function clearConversation() {
    localStorage.removeItem(
      storageKey
    );

    setMessages([
      {
        from: "sofia",
        text:
          getSofiaFallbackReply(
            product,
            adaptiveProfile
          ),
      },
    ]);
  }

  return (
    <div className="page chat-page">

      <button
        className="back-link"
        onClick={onBack}
      >
        <ArrowLeft size={16} />
        Back
      </button>

      <div
        style={{
          marginBottom: 16,
          padding:
            "12px 14px",
          borderRadius: 14,
          border:
            "1px solid #e7e0d8",
          background:
            "#faf8f5",
          color:
            "#615a53",
          fontSize: 12,
          lineHeight: 1.5,
        }}
      >
        <strong
          style={{
            color: "#3f3a35",
          }}
        >
          Adaptive context:
        </strong>{" "}
        {adaptiveProfile?.summary}
      </div>

      <div className="chat-shell">

        <div className="chat-header">

          <div>
            <div className="small-caps">
              PERSONAL STYLIST
            </div>

            <h2>Sofia</h2>
          </div>

          <div
            style={{
              display: "flex",
              alignItems:
                "center",
              gap: 12,
            }}
          >
            <span className="online">
              ● Gemini
            </span>

            <button
              className="text-button"
              onClick={
                clearConversation
              }
            >
              New chat
            </button>
          </div>

        </div>

        <div className="chat-body">

          {messages.map(
            (message, index) => (
              <div
                key={`${index}-${message.from}`}
                className={`message-row ${message.from}`}
              >
                <div className="message">
                  {message.text}
                </div>
              </div>
            )
          )}

          {loading && (
            <div className="message-row sofia">
              <div className="message">
                Sofia is thinking…
              </div>
            </div>
          )}

        </div>

        <div className="chat-input">

          <input
            value={value}
            onChange={(event) =>
              setValue(
                event.target.value
              )
            }
            onKeyDown={(event) => {
              if (
                event.key === "Enter"
              ) {
                send();
              }
            }}
            placeholder="Ask Sofia about this product..."
            disabled={loading}
          />

          <button
            onClick={send}
            disabled={
              loading ||
              !value.trim()
            }
            aria-label="Send message"
          >
            <Send size={17} />
          </button>

        </div>

      </div>
    </div>
  );
}

function MaterialViewer({ product, onBack }) {
  const [compareProduct, setCompareProduct] = useState(null);
  const [showPicker, setShowPicker] = useState(false);

  const [signals, setSignals] = useState({
    material: 0,
    compare: 0,
  });

  function register(type) {
    setSignals((current) => ({
      ...current,
      [type]: (current[type] || 0) + 1,
    }));
  }

  function selectCompareProduct(item) {
    setCompareProduct(item);
    setShowPicker(false);
    register("compare");
  }

  return (
    <div className="page">

      {/* BACK */}
      <button className="back-link" onClick={onBack}>
        <ArrowLeft size={16} />
        Back
      </button>

      {/* HEADER */}
      <div className="material-viewer-header">
        <div>
          <div className="small-caps">
            MATERIAL VIEWER
          </div>

          <h1 className="page-title">
            {product.material || "Material"}
          </h1>

          <p className="material-viewer-intro">
            Explore the fabric through close visual detail.
          </p>
        </div>

        <div className="material-viewer-product">
          <span>{product.brand}</span>
          <strong>{product.name}</strong>
        </div>
      </div>

      {/* MAIN MATERIAL EXPERIENCE */}
      <div className="material-viewer-layout">

        {/* MATERIAL CLOSE-UP */}
        <div
          className="material-macro-view"
          onMouseMove={() => register("material")}
          onTouchMove={() => register("material")}
        >
          <img
            src={product.materialImage || product.image}
            alt={`${product.material || "Material"} detail`}
          />

          <div className="material-macro-label">
            <span>MACRO DETAIL</span>
            <strong>
              {product.material || "Material detail"}
            </strong>
          </div>

          <div className="material-macro-instruction">
            Explore the surface
          </div>
        </div>

        {/* INFORMATION */}
        <div className="material-info-panel">

          <div className="small-caps">
            MATERIAL
          </div>

          <h2>
            {product.material || "Material information"}
          </h2>

          <p>
            Inspect the surface and material character
            before making your decision.
          </p>

          <div className="material-facts">

            <div>
              <span>Colour</span>
              <strong>
                {product.color || "Not specified"}
              </strong>
            </div>

            <div>
              <span>Material</span>
              <strong>
                {product.material || "Not specified"}
              </strong>
            </div>

            <div>
              <span>Product</span>
              <strong>
                {product.name}
              </strong>
            </div>

            <div>
              <span>Price</span>
              <strong>
                AED {product.price.toLocaleString()}
              </strong>
            </div>

          </div>

          {/* COMPARE */}
          <button
            className="button dark wide"
            onClick={() => {
              register("compare");
              setShowPicker((current) => !current);
            }}
          >
            {compareProduct
              ? "Change comparison"
              : "Compare materials"}{" "}
            ⇄
          </button>

          {/* PRODUCT PICKER */}
          {showPicker && (
            <div className="material-product-picker">

              <div className="small-caps">
                CHOOSE A MATERIAL
              </div>

              {products
                .filter((item) => item.id !== product.id)
                .map((item) => (
                  <button
                    key={item.id}
                    onClick={() =>
                      selectCompareProduct(item)
                    }
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                    />

                    <div>
                      <strong>
                        {item.name}
                      </strong>

                      <span>
                        {item.material ||
                          "Material not specified"}
                      </span>
                    </div>
                  </button>
                ))}

            </div>
          )}

        </div>
      </div>

      {/* MATERIAL COMPARISON */}
      {compareProduct && (
        <div className="material-comparison-section">

          <div>
            <div className="small-caps">
              MATERIAL COMPARISON
            </div>

            <h2>
              Compare the two materials.
            </h2>
          </div>

          <div className="material-comparison-grid">

            {/* CURRENT */}
            <div className="material-comparison-card">

              <div className="small-caps">
                CURRENT
              </div>

              <div className="material-comparison-image">
                <img
                  src={
                    product.materialImage ||
                    product.image
                  }
                  alt={
                    product.material ||
                    "Current material"
                  }
                />
              </div>

              <strong>
                {product.material ||
                  "Material not specified"}
              </strong>

              <span>
                {product.name}
              </span>

            </div>

            {/* ALTERNATIVE */}
            <div className="material-comparison-card">

              <div className="small-caps">
                ALTERNATIVE
              </div>

              <div className="material-comparison-image">
                <img
                  src={
                    compareProduct.materialImage ||
                    compareProduct.image
                  }
                  alt={
                    compareProduct.material ||
                    "Alternative material"
                  }
                />
              </div>

              <strong>
                {compareProduct.material ||
                  "Material not specified"}
              </strong>

              <span>
                {compareProduct.name}
              </span>

            </div>

          </div>
        </div>
      )}


    </div>
  );
}

function Bag({
  bag,
  navigate,
  onRemove,
}) {
  const total = bag.reduce(
    (sum, item) => sum + item.price,
    0
  );

  return (
    <div className="page">
      <div className="listing-top">
        <div>
          <div className="small-caps">SHOPPING</div>
          <h1 className="page-title">My Bag</h1>
        </div>

        <div className="bag-count">
          {bag.length} item{bag.length === 1 ? "" : "s"}
        </div>
      </div>

      {bag.length === 0 ? (
        <div className="empty-state">
          <ShoppingBag size={34} />
          <h2>Your bag is empty.</h2>

          <button
            className="button dark"
            onClick={() => navigate("listing")}
          >
            Explore pieces
          </button>
        </div>
      ) : (
        <div className="bag-layout">
          <div className="bag-items">
            {bag.map((item, index) => (
              <div
                className="bag-item"
                key={`${item.id}-${index}`}
              >
                <img src={item.image} alt={item.name} />

                <div className="bag-info">
                  <div className="small-caps">
                    {item.brand}
                  </div>

                  <h3>{item.name}</h3>

                  <span>
                    Size {item.size || "M"} · {item.color}
                  </span>

                  <strong>
                    AED {item.price.toLocaleString()}
                  </strong>
                </div>

                <button
                  className="icon-button"
                  onClick={() => onRemove(index)}
                  aria-label="Remove"
                >
                  <X size={17} />
                </button>
              </div>
            ))}
          </div>

          <div className="summary-card">
            <div className="small-caps">
              ORDER SUMMARY
            </div>

            <div className="summary-line">
              <span>Subtotal</span>
              <strong>
                AED {total.toLocaleString()}
              </strong>
            </div>

            <div className="summary-line">
              <span>Delivery</span>
              <strong>Free</strong>
            </div>

            <div className="divider" />

            <div className="summary-line total">
              <span>Total</span>
              <strong>
                AED {total.toLocaleString()}
              </strong>
            </div>

            <button
              className="button dark wide"
              onClick={() => navigate("checkout")}
            >
              Checkout <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Checkout({
  bag,
  navigate,
}) {
  const total = bag.reduce(
    (sum, item) => sum + item.price,
    0
  );

  return (
    <div className="page">
      <button
        className="back-link"
        onClick={() => navigate("bag")}
      >
        <ArrowLeft size={16} />
        Back to bag
      </button>

      <div className="listing-top">
        <div>
          <div className="small-caps">
            PURCHASE
          </div>
          <h1 className="page-title">Checkout</h1>
        </div>
      </div>

      <div className="checkout-layout">
        <div className="checkout-form">
          <div className="form-card">
            <div className="small-caps">
              01 · DELIVERY ADDRESS
            </div>

            <input placeholder="Full name" />
            <input placeholder="Address" />

            <div className="two-col">
              <input placeholder="City" />
              <input placeholder="Postal code" />
            </div>

            <input placeholder="Phone number" />
          </div>

          <div className="form-card">
            <div className="small-caps">
              02 · DELIVERY METHOD
            </div>

            <label className="radio-card selected">
              <input
                type="radio"
                checked
                readOnly
              />

              <span>
                <strong>
                  Standard delivery
                </strong>
                <small>
                  2–4 business days · Free
                </small>
              </span>
            </label>
          </div>

          <button
            className="button dark wide"
            onClick={() => navigate("payment")}
          >
            Continue to Payment
            <ArrowRight size={16} />
          </button>
        </div>

        <div className="summary-card">
          <div className="small-caps">
            SUMMARY
          </div>

          {bag.map((item, index) => (
            <div
              className="mini-product"
              key={`${item.id}-${index}`}
            >
              <img
                src={item.image}
                alt={item.name}
              />

              <div>
                <strong>{item.name}</strong>
                <span>
                  {item.size || "M"} · {item.color}
                </span>
              </div>

              <b>
                AED {item.price.toLocaleString()}
              </b>
            </div>
          ))}

          <div className="divider" />

          <div className="summary-line total">
            <span>Total</span>
            <strong>
              AED {total.toLocaleString()}
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
}

function Payment({
  navigate,
  bag,
}) {
  const total = bag.reduce(
    (sum, item) => sum + item.price,
    0
  );

  return (
    <div className="page">
      <button
        className="back-link"
        onClick={() => navigate("checkout")}
      >
        <ArrowLeft size={16} />
        Back to checkout
      </button>

      <div className="listing-top">
        <div>
          <div className="small-caps">
            03 · SECURE PAYMENT
          </div>

          <h1 className="page-title">Payment</h1>
        </div>
      </div>

      <div className="payment-layout">
        <div className="form-card">
          <div className="small-caps">
            PAYMENT METHOD
          </div>

          <button className="radio-card selected">
            <input
              type="radio"
              checked
              readOnly
            />

            <span>
              <strong>Credit / Debit Card</strong>
              <small>Secure payment</small>
            </span>
          </button>

          <input placeholder="Cardholder name" />
          <input placeholder="Card number" />

          <div className="two-col">
            <input placeholder="MM / YY" />
            <input placeholder="CVV" />
          </div>

          <label className="check-row">
            <input type="checkbox" />
            Save payment method
          </label>

          <button
            className="button dark wide"
            onClick={() =>
              navigate("order-confirmed")
            }
          >
            Pay AED {total.toLocaleString()}
            <ArrowRight size={16} />
          </button>
        </div>

        <div className="summary-card">
          <div className="small-caps">
            YOUR ORDER
          </div>

          <div className="summary-line">
            <span>Items</span>
            <strong>{bag.length}</strong>
          </div>

          <div className="summary-line">
            <span>Delivery</span>
            <strong>Free</strong>
          </div>

          <div className="divider" />

          <div className="summary-line total">
            <span>Total</span>
            <strong>
              AED {total.toLocaleString()}
            </strong>
          </div>

          <div className="secure-note">
            Secure checkout · Prototype payment
          </div>
        </div>
      </div>
    </div>
  );
}

function OrderConfirmed({
  navigate,
  onCompleteOrder,
}) {
  return (
    <div className="center-page">
      <div className="confirm-icon">
        <Check size={28} />
      </div>

      <div className="small-caps">
        ORDER CONFIRMED
      </div>

      <h1>
        Thank you for choosing PRÉSENCE.
      </h1>

      <p>
        Your order has been placed successfully.
      </p>

      <div className="confirm-actions">
        <button
          className="button dark"
          onClick={() => {
            onCompleteOrder();
            navigate("orders");
          }}
        >
          View Orders
        </button>

        <button
          className="button outline"
          onClick={() => {
            onCompleteOrder();
            navigate("home");
          }}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}

function Orders({ orders }) {
  return (
    <div className="page">
      <div className="small-caps">ACCOUNT</div>

      <h1 className="page-title">
        My Orders
      </h1>

      <div className="order-list">
        {orders.length === 0 ? (
          <div className="empty-state">
            <Package size={34} />
            <h2>No orders yet.</h2>
          </div>
        ) : (
          orders.map((order) => (
            <div
              className="order-card"
              key={order.id}
            >
              <div>
                <div className="small-caps">
                  ORDER #{order.id}
                </div>

                <h3>{order.name}</h3>
                <span>{order.date}</span>
              </div>

              <div className="order-status">
                {order.status}
              </div>

              <strong>
                AED {order.total.toLocaleString()}
              </strong>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function Wishlist({
  wishlist,
  navigate,
  onOpenProduct,
}) {
  const saved = products.filter((product) =>
    wishlist.includes(product.id)
  );

  return (
    <div className="page">
      <div className="small-caps">SAVED</div>

      <h1 className="page-title">
        Wishlist
      </h1>

      {saved.length === 0 ? (
        <div className="empty-state">
          <Heart size={34} />
          <h2>
            Your wishlist is empty.
          </h2>

          <button
            className="button dark"
            onClick={() => navigate("listing")}
          >
            Discover pieces
          </button>
        </div>
      ) : (
        <div className="product-grid">
          {saved.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              wishlisted
              onWishlist={() => {}}
              onOpen={onOpenProduct}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function Profile({ navigate, adaptiveProfile }) {
  const colours =
    adaptiveProfile?.topPreferences?.colours || [];

  const materials =
    adaptiveProfile?.topPreferences?.materials || [];

  const occasions =
    adaptiveProfile?.topPreferences?.occasions || [];

  const hasTaste =
    colours.length ||
    materials.length ||
    occasions.length;

  return (
    <div className="page">

      <div className="profile-hero">
        <div className="profile-avatar">
          P
        </div>

        <div>
          <div className="small-caps">
            YOUR PRÉSENCE
          </div>

          <h1>
            Your profile
          </h1>

          <p>
            A lightweight view of what you have explored.
          </p>
        </div>
      </div>

      {/* YOUR TASTE */}

      <div
        className="feature-card"
        style={{
          marginTop: 20,
          padding: 18,
        }}
      >
        <div className="small-caps">
          YOUR TASTE SO FAR
        </div>

        {!hasTaste ? (
          <p
            style={{
              margin: "10px 0 0",
              fontSize: 13,
              color: "#746d65",
              lineHeight: 1.5,
            }}
          >
            Explore a few products, colours or materials
            and PRÉSENCE will build this quietly from your
            interactions.
          </p>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 16,
              marginTop: 14,
            }}
          >

            {colours.length > 0 && (
              <div>
                <div className="small-caps">
                  COLOURS
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: 7,
                    flexWrap: "wrap",
                    marginTop: 8,
                  }}
                >
                  {colours.map((item) => (
                    <span
                      key={item.value}
                      style={{
                        border: "1px solid #ddd6ce",
                        borderRadius: 999,
                        padding: "7px 11px",
                        fontSize: 11,
                        background: "#fff",
                      }}
                    >
                      {formatAdaptiveValue(item.value)}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {materials.length > 0 && (
              <div>
                <div className="small-caps">
                  MATERIALS
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: 7,
                    flexWrap: "wrap",
                    marginTop: 8,
                  }}
                >
                  {materials.map((item) => (
                    <span
                      key={item.value}
                      style={{
                        border: "1px solid #ddd6ce",
                        borderRadius: 999,
                        padding: "7px 11px",
                        fontSize: 11,
                        background: "#fff",
                      }}
                    >
                      {item.value}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {occasions.length > 0 && (
              <div>
                <div className="small-caps">
                  OCCASIONS
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: 7,
                    flexWrap: "wrap",
                    marginTop: 8,
                  }}
                >
                  {occasions.map((item) => (
                    <span
                      key={item.value}
                      style={{
                        border: "1px solid #ddd6ce",
                        borderRadius: 999,
                        padding: "7px 11px",
                        fontSize: 11,
                        background: "#fff",
                      }}
                    >
                      {item.value}
                    </span>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}
      </div>

      {/* ACCOUNT */}

      <div
        className="profile-grid"
        style={{ marginTop: 18 }}
      >
        <button
          onClick={() => navigate("wishlist")}
        >
          <Heart size={20} />
          <span>Wishlist</span>
        </button>

        <button
          onClick={() => navigate("orders")}
        >
          <Package size={20} />
          <span>Orders</span>
        </button>

        <button
          onClick={() => navigate("settings")}
        >
          <Settings size={20} />
          <span>Settings</span>
        </button>
      </div>

    </div>
  );
}

function SettingsPage({ navigate }) {
  const rows = [
    [
      "Account",
      "Personal details and addresses",
    ],
    [
      "Notifications",
      "Preferences and alerts",
    ],
    [
      "Privacy",
      "Security and permissions",
    ],
    [
      "Appearance",
      "Display preferences",
    ],
    [
      "Help",
      "Support and FAQs",
    ],
  ];

  return (
    <div className="page">
      <div className="small-caps">
        ACCOUNT
      </div>

      <h1 className="page-title">
        Settings
      </h1>

      <div className="settings-list">
        {rows.map(([title, sub]) => (
          <button key={title}>
            <div>
              <strong>{title}</strong>
              <span>{sub}</span>
            </div>

            <ArrowRight size={17} />
          </button>
        ))}

        <div
          className="featured-setting"
          style={{
            cursor: "default",
            alignItems: "flex-start",
          }}
        >
          <div>
            <div className="small-caps">PERSONALIZATION</div>
            <strong>Reset PRÉSENCE personalization</strong>
            <span>
              Clear the adaptive profile and start your shopping journey from a clean state.
            </span>
          </div>

          <button
            className="button outline"
            style={{ marginTop: 2, whiteSpace: "nowrap" }}
            onClick={() => window.dispatchEvent(new Event("presence-reset-personalization"))}
          >
            Reset
          </button>
        </div>

        <button
          className="featured-setting"
          onClick={() =>
            navigate("complete-look")
          }
        >
          <div>
            <div className="small-caps">
              PRÉSENCE EDIT
            </div>

            <strong>
              Complete the Look
            </strong>

            <span>
              Build a complete outfit around
              your selected pieces.
            </span>
          </div>

          <Sparkles size={18} />
        </button>
      </div>
    </div>
  );
}

function CompleteLook({ navigate }) {
  return (
    <div className="page">
      <button
        className="back-link"
        onClick={() => navigate("settings")}
      >
        <ArrowLeft size={16} />
        Settings
      </button>

      <div className="small-caps">
        PRÉSENCE EDIT
      </div>

      <h1 className="page-title">
        Complete the Look
      </h1>

      <div className="look-hero">
        <img
          src={products[0].image}
          alt={products[0].name}
        />

        <div>
          <div className="small-caps">
            YOUR CURRENT PIECE
          </div>

          <h2>{products[0].name}</h2>

          <p>
            Accessories selected to complement
            the silhouette, colour and mood.
          </p>
        </div>
      </div>

      <div className="accessory-grid">
        {accessories.map((item) => (
          <div
            className="accessory-card"
            key={item.id}
          >
            <img
              src={item.image}
              alt={item.name}
            />

            <div className="small-caps">
              {item.type}
            </div>

            <strong>{item.name}</strong>

            <span>
              AED {item.price.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AppShell({
  children,
  page,
  navigate,
  bagCount,
  wishlistCount,
  onSearch,
  searchQuery,
}) {
  return (
    <div className="app-shell">
      <Sidebar
        page={page}
        navigate={navigate}
        bagCount={bagCount}
        wishlistCount={wishlistCount}
      />

      <main className="main">
        <TopBar
          navigate={navigate}
          onSearch={onSearch}
          searchQuery={searchQuery}
        />

        {children}
      </main>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");

  const [personalization, setPersonalization] = useState(() => {
    try {
      const saved = localStorage.getItem(PERSONALIZATION_STORAGE_KEY);
      return saved
        ? migratePersonalization(JSON.parse(saved))
        : createDefaultPersonalization();
    } catch {
      return createDefaultPersonalization();
    }
  });

  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const [wishlist, setWishlist] = useState([2]);
  const [bag, setBag] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const resetPersonalization = () => {
      const fresh = createDefaultPersonalization();
      localStorage.removeItem(PERSONALIZATION_STORAGE_KEY);
      setPersonalization(fresh);
      setSearchQuery("");
      setSelectedProduct(products[0]);
      setPage("home");
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.addEventListener(
      "presence-reset-personalization",
      resetPersonalization
    );

    return () => {
      window.removeEventListener(
        "presence-reset-personalization",
        resetPersonalization
      );
    };
  }, []);

  useEffect(() => {
    localStorage.setItem(
      PERSONALIZATION_STORAGE_KEY,
      JSON.stringify(personalization)
    );

    window.dispatchEvent(
      new Event("presence-personalization-updated")
    );
  }, [personalization]);

  const adaptiveProfile = useMemo(
    () =>
      buildAdaptiveProfile(
        personalization,
        selectedProduct?.id,
        searchQuery
      ),
    [personalization, selectedProduct?.id, searchQuery]
  );

  const adaptiveDecision = useMemo(
    () => getAdaptiveDecision(adaptiveProfile),
    [adaptiveProfile]
  );

  function navigate(nextPage) {
    setPage(nextPage);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function trackInteraction(type, value, meta = {}) {
    setPersonalization((current) => {
      const safeCurrent = migratePersonalization(current);
      const event = {
        type,
        value,
        meta,
        timestamp: Date.now(),
      };

      const next = {
        ...safeCurrent,
        events: [...(safeCurrent.events || []), event].slice(-160),
      };

      if (type === "search" && value) {
        next.searches = [
          ...safeCurrent.searches.filter(
            (item) => item !== value
          ),
          value,
        ].slice(-20);
      }

      if (type === "product_view" && value) {
        next.viewedProducts = [
          ...safeCurrent.viewedProducts.filter(
            (id) => String(id) !== String(value)
          ),
          value,
        ].slice(-20);
      }

      if (type === "colour" && value) {
        next.exploredColours = [
          ...new Set([
            ...(safeCurrent.exploredColours || []),
            value,
          ]),
        ];
      }

      if (type === "material" && value) {
        next.exploredMaterials = [
          ...new Set([
            ...(safeCurrent.exploredMaterials || []),
            value,
          ]),
        ];
      }

      if (type === "compare" && value) {
        next.comparedProducts = [
          ...new Set([
            ...(safeCurrent.comparedProducts || []),
            value,
          ]),
        ].slice(-20);
      }

      if (type === "size" && value) {
        next.sizeProfile = {
          ...(safeCurrent.sizeProfile || {}),
          recommendedSize: value,
        };
      }

      if (type === "wishlist_add" && value) {
        next.wishlistProducts = [
          ...new Set([
            ...(safeCurrent.wishlistProducts || []),
            value,
          ]),
        ].slice(-20);
      }

      if (type === "wishlist_remove" && value) {
        next.wishlistProducts = (
          safeCurrent.wishlistProducts || []
        ).filter((id) => String(id) !== String(value));
      }

      if (type === "bag_add" && value) {
        next.bagProducts = [
          ...new Set([
            ...(safeCurrent.bagProducts || []),
            value,
          ]),
        ].slice(-20);
      }

      if (type === "occasion" && value) {
        next.occasion = value;
      }

      return next;
    });
  }

  function openProduct(id) {
    const product =
      products.find((item) => item.id === id) || products[0];

    trackInteraction("product_view", product.id, {
      productId: product.id,
      source: searchQuery ? "search" : "browse",
      searchQuery,
    });

    setSelectedProduct(product);
    navigate("product");
  }

  function toggleWishlist(id) {
    setWishlist((current) => {
      const isSaved = current.includes(id);

      if (isSaved) {
        trackInteraction("wishlist_remove", id, {
          productId: id,
        });

        return current.filter(
          (itemId) => itemId !== id
        );
      }

      trackInteraction("wishlist_add", id, {
        productId: id,
      });

      return [...current, id];
    });
  }

  function addToBag(item) {
    trackInteraction("bag_add", item.id, {
      productId: item.id,
      size: item.size || null,
      colour: item.color || item.colour || null,
    });

    setBag((current) => [...current, item]);
    navigate("bag");
  }

  function removeBag(index) {
    setBag((current) =>
      current.filter(
        (_, itemIndex) => itemIndex !== index
      )
    );
  }

  function onSearch(query) {
    const nextQuery = String(query || "").trim();

    if (nextQuery) {
      trackInteraction("search", nextQuery, {
        resultCount: searchProducts(
          nextQuery,
          adaptiveProfile
        ).length,
      });
    }

    setSearchQuery(nextQuery);
    navigate("listing");
  }

  function completeOrder() {
    if (bag.length === 0) return;

    const total = bag.reduce(
      (sum, item) => sum + item.price,
      0
    );

    const newOrder = {
      id: `PR-${Math.floor(
        100000 + Math.random() * 899999
      )}`,
      name: `${bag.length} item${
        bag.length > 1 ? "s" : ""
      }`,
      date: new Date().toLocaleDateString(),
      status: "Confirmed",
      total,
    };

    trackInteraction("purchase", newOrder.id, {
      productIds: bag.map((item) => item.id),
      total,
    });

    setOrders((current) => [
      newOrder,
      ...current,
    ]);

    setBag([]);
  }

  if (page === "home") {
    return (
      <AppShell
        page="home"
        navigate={navigate}
        bagCount={bag.length}
        wishlistCount={wishlist.length}
        onSearch={onSearch}
        searchQuery={searchQuery}
      >
        <Home
          navigate={navigate}
          onOpenProduct={openProduct}
          wishlist={wishlist}
          onWishlist={toggleWishlist}
          adaptiveProfile={adaptiveProfile}
        />
      </AppShell>
    );
  }

  if (page === "listing") {
    return (
      <AppShell
        page="listing"
        navigate={navigate}
        bagCount={bag.length}
        wishlistCount={wishlist.length}
        onSearch={onSearch}
        searchQuery={searchQuery}
      >
        <Listing
          wishlist={wishlist}
          onWishlist={toggleWishlist}
          onOpenProduct={openProduct}
          searchQuery={searchQuery}
          adaptiveProfile={adaptiveProfile}
        />
      </AppShell>
    );
  }

  if (page === "product") {
    return (
      <AppShell
        page="listing"
        navigate={navigate}
        bagCount={bag.length}
        wishlistCount={wishlist.length}
        onSearch={onSearch}
        searchQuery={searchQuery}
      >
        <ProductDetails
          product={selectedProduct}
          onBack={() => navigate("listing")}
          navigate={navigate}
          onAddBag={addToBag}
          wishlist={wishlist}
          onWishlist={toggleWishlist}
          adaptiveDecision={adaptiveDecision}
          trackInteraction={trackInteraction}
          setPersonalization={setPersonalization}
        />
      </AppShell>
    );
  }

  if (page === "ar") {
    return (
      <ARView
        product={selectedProduct}
        onBack={() => navigate("product")}
        onAddBag={addToBag}
        trackInteraction={trackInteraction}
      />
    );
  }

  if (page === "stylist") {
    return (
      <AppShell
        page="product"
        navigate={navigate}
        bagCount={bag.length}
        wishlistCount={wishlist.length}
        onSearch={onSearch}
        searchQuery={searchQuery}
      >
        <Stylist
          product={selectedProduct}
          onBack={() => navigate("product")}
          personalization={personalization}
          adaptiveProfile={adaptiveProfile}
          adaptiveDecision={adaptiveDecision}
        />
      </AppShell>
    );
  }

  if (page === "material") {
    return (
      <AppShell
        page="product"
        navigate={navigate}
        bagCount={bag.length}
        wishlistCount={wishlist.length}
        onSearch={onSearch}
        searchQuery={searchQuery}
      >
        <MaterialViewer
          product={selectedProduct}
          onBack={() => navigate("product")}
        />
      </AppShell>
    );
  }

  if (page === "bag") {
    return (
      <AppShell
        page="bag"
        navigate={navigate}
        bagCount={bag.length}
        wishlistCount={wishlist.length}
        onSearch={onSearch}
        searchQuery={searchQuery}
      >
        <Bag
          bag={bag}
          navigate={navigate}
          onRemove={removeBag}
        />
      </AppShell>
    );
  }

  if (page === "checkout") {
    return (
      <AppShell
        page="checkout"
        navigate={navigate}
        bagCount={bag.length}
        wishlistCount={wishlist.length}
        onSearch={onSearch}
        searchQuery={searchQuery}
      >
        <Checkout
          bag={bag}
          navigate={navigate}
        />
      </AppShell>
    );
  }

  if (page === "payment") {
    return (
      <AppShell
        page="payment"
        navigate={navigate}
        bagCount={bag.length}
        wishlistCount={wishlist.length}
        onSearch={onSearch}
        searchQuery={searchQuery}
      >
        <Payment
          bag={bag}
          navigate={navigate}
        />
      </AppShell>
    );
  }

  if (page === "order-confirmed") {
    return (
      <AppShell
        page="orders"
        navigate={navigate}
        bagCount={bag.length}
        wishlistCount={wishlist.length}
        onSearch={onSearch}
        searchQuery={searchQuery}
      >
        <OrderConfirmed
          navigate={navigate}
          onCompleteOrder={completeOrder}
        />
      </AppShell>
    );
  }

  if (page === "orders") {
    return (
      <AppShell
        page="orders"
        navigate={navigate}
        bagCount={bag.length}
        wishlistCount={wishlist.length}
        onSearch={onSearch}
        searchQuery={searchQuery}
      >
        <Orders orders={orders} />
      </AppShell>
    );
  }

  if (page === "wishlist") {
    return (
      <AppShell
        page="wishlist"
        navigate={navigate}
        bagCount={bag.length}
        wishlistCount={wishlist.length}
        onSearch={onSearch}
        searchQuery={searchQuery}
      >
        <Wishlist
          wishlist={wishlist}
          navigate={navigate}
          onOpenProduct={openProduct}
        />
      </AppShell>
    );
  }

  if (page === "profile") {
    return (
      <AppShell
        page="profile"
        navigate={navigate}
        bagCount={bag.length}
        wishlistCount={wishlist.length}
        onSearch={onSearch}
        searchQuery={searchQuery}
      >
        <Profile
          navigate={navigate}
          adaptiveProfile={adaptiveProfile}
        />
      </AppShell>
    );
  }

  if (page === "settings") {
    return (
      <AppShell
        page="settings"
        navigate={navigate}
        bagCount={bag.length}
        wishlistCount={wishlist.length}
        onSearch={onSearch}
        searchQuery={searchQuery}
      >
        <SettingsPage navigate={navigate} />
      </AppShell>
    );
  }

  if (page === "complete-look") {
    return (
      <AppShell
        page="settings"
        navigate={navigate}
        bagCount={bag.length}
        wishlistCount={wishlist.length}
        onSearch={onSearch}
        searchQuery={searchQuery}
      >
        <CompleteLook navigate={navigate} />
      </AppShell>
    );
  }

  return null;
}
