# PRÉSENCE

## Adaptive Spatial Commerce for Luxury Fashion

PRÉSENCE is a solo **AI Product Design / Product Design** portfolio project exploring how luxury-fashion ecommerce can reduce uncertainty before purchase through a combination of **interaction-driven personalization, conversational AI, structured comparison, material exploration, occasion context, and spatial computing**.

> **AI helps users decide. AR helps users experience. Personalization helps users discover. Comparison helps users reason.**

### Core journey

**Discover → Browse → Explore → Understand → Experience → Compare → Decide → Purchase**

---

## 01. Project Overview

Luxury fashion is highly visual online, but visual information alone does not always create purchase confidence. A shopper can see photography, read product information, check price, and look at a size chart while still being uncertain about whether the piece is right for them.

PRÉSENCE treats these moments of hesitation as product opportunities.

Instead of adding technology as decoration, each major interaction is connected to a specific form of uncertainty:

| Shopper uncertainty | PRÉSENCE response |
|---|---|
| Colour | Colour exploration + adaptive colour context |
| Fit / size | AI Size Recommendation |
| Material | Material Viewer |
| Occasion | Occasion Intelligence |
| Styling | Sofia contextual AI stylist |
| Comparison | Smart Compare + Spatial Compare |
| Spatial / scale | WebXR Spatial Experience |
| Taste / discovery | Your Taste So Far + adaptive personalization |
| Outfit context | Complete the Look |

The product goal is not to replace the shopper's judgement. It is to give the shopper better context at the moment a decision becomes difficult.

---

## 02. Product Thesis

PRÉSENCE is built around a simple design principle:

> **Different kinds of uncertainty require different kinds of interaction.**

A conversational question should not require a comparison table. A material question should not require a chatbot. A spatial question should not be answered by another product image.

The system therefore maps uncertainty to interaction mode:

- **Colour →** direct exploration
- **Fit →** guided starting-size recommendation
- **Material →** visual and structured material information
- **Occasion →** explicit contextual selection
- **Styling →** natural-language conversation
- **Comparison →** user-selected structured attributes
- **Spatial experience →** WebXR
- **Taste →** lightweight behavioral context
- **Outfit context →** Complete the Look

This is the core Human–Computer Interaction idea behind the project.

---

## 03. Project Snapshot

| Field | Details |
|---|---|
| Project | PRÉSENCE |
| Positioning | Adaptive spatial commerce for luxury fashion |
| Type | Solo portfolio prototype |
| Role | AI Product Designer / Product Designer |
| Platform | Web + WebXR |
| Domain | Luxury fashion ecommerce |
| Prototype catalog | Four fashion SKUs |
| Primary interaction model | Decision-support shopping experience |
| AI | Gemini |
| Spatial technology | Three.js + WebXR |
| Personalization | Lightweight interaction-driven adaptive layer |

### My responsibilities

As a solo project, the work spans:

- Product strategy
- Problem framing
- UX architecture
- UI design
- Interaction design
- Human–Computer Interaction
- Adaptive personalization design
- AI integration
- Conversational experience design
- Spatial interaction design
- WebXR prototyping
- Frontend implementation
- Backend/API integration
- Prototype QA
- Scope and trade-off decisions
- Case study documentation

---

# 04. Product Architecture

## Discovery

The experience begins as a premium editorial commerce environment rather than a dense marketplace interface.

### Main surfaces

- Home
- Search
- Product discovery
- Product listing
- Brand/product exploration
- Wishlist interactions
- Personalized discovery

Product cards expose:

- Product imagery
- Motion treatment
- Brand
- Product name
- AED price
- Rating
- Wishlist control

Selecting a product opens the main decision hub.

## Product Details — the Decision Hub

The Product Details screen combines standard ecommerce information with PRÉSENCE's decision-support tools.

### Standard commerce information

- Product image
- Brand
- Product name
- Price
- Rating / reviews
- Availability
- Delivery information
- Returns information
- Colour selection
- Size selection
- Add to Bag
- Buy Now

### Decision-support features

- Spatial Experience
- Sofia AI Stylist
- AI Size Recommendation
- Material Viewer
- Occasion Intelligence
- Smart Compare
- Complete the Look
- Reviews

The Product Details page is intentionally the central branching point from which the shopper can resolve different kinds of uncertainty.

---

# 05. Product Catalog

The prototype uses a deliberately small four-product luxury-fashion catalog.

| ID | Brand | Product | Price | Material | Silhouette | Example occasions |
|---|---|---|---:|---|---|---|
| 1 | Atelier No. 8 | Silk Evening Gown | AED 2,450 | Italian Silk Blend | Fluid | Wedding, Gala, Formal Dinner |
| 2 | Maison Aveline | Velvet Draped Dress | AED 2,890 | Silk Velvet | Draped | Gala, Formal Dinner, Wedding |
| 3 | Léon Paris | Satin Column Gown | AED 2,200 | Silk Satin | Column | Gala, Formal Dinner, Wedding |
| 4 | Élan Studio | Structured Silk Dress | AED 1,980 | Silk Crepe | Structured | Business Evening, Formal Dinner, Wedding |

### Why four products?

The project is intentionally focused on **interaction depth rather than catalog scale**.

Four SKUs are sufficient to demonstrate:

- Product discovery
- Search
- Personalization
- Occasion context
- Comparison
- Material exploration
- Styling context
- AR product selection
- Commerce actions

The product does not attempt to imitate enterprise-scale inventory infrastructure.

---

# 06. Occasion Intelligence

Occasion is treated as an explicit shopping context rather than hidden inside a recommendation engine.

The product page provides occasion chips such as:

**Wedding · Gala · Formal Dinner · Business Evening · Holiday · Everyday**

When the user selects an occasion:

1. The selection becomes product context.
2. The interaction is recorded by the adaptive layer.
3. The context can be passed to Sofia.
4. Sofia can reason about suitability using the supplied product metadata.

### Scope decision

PRÉSENCE intentionally does not add:

- A large occasion quiz
- A separate onboarding flow
- A complex occasion recommendation engine
- Occasion filtering across the entire catalog

The goal is to capture useful context with minimal interaction cost.

---

# 07. AI Size Recommendation

The size system is designed as **transparent starting-size guidance**, not as a production-grade fit prediction model.

The prototype combines:

- Usual size as the starting anchor
- Bust measurement
- Waist measurement
- Hip measurement
- Height as supporting context
- Weight as supporting context

The body measurements are compared against a prototype reference chart.

| Size | Bust | Waist | Hip |
|---|---:|---:|---:|
| XS | 80 cm | 62 cm | 88 cm |
| S | 84 cm | 66 cm | 92 cm |
| M | 88 cm | 70 cm | 96 cm |
| L | 94 cm | 76 cm | 102 cm |
| XL | 100 cm | 82 cm | 108 cm |

### Unit handling

The prototype can recognize obviously inch-style body measurements and convert them to centimetres for convenience.

For example:

- 34 in → approximately 86 cm
- 28 in → approximately 71 cm
- 36 in → approximately 91 cm

### Recommendation philosophy

**Usual size = starting point**  
**Body measurements = adjustment evidence**  
**Height + weight = supporting context**

The system intentionally avoids fake confidence percentages such as “95% confidence.”

The output is described as a **starting size**, not guaranteed brand-specific fit.

---

# 08. Material Viewer

Material is one of the main reasons online fashion shopping cannot fully reproduce the physical experience of a store.

PRÉSENCE does not claim that a screen can reproduce touch. Instead, the Material Viewer increases material understanding through visual and structured information.

### Material Viewer includes

- Macro material imagery
- Material composition
- Softness information
- Breathability
- Thickness / weight
- Stretch
- Wrinkle resistance
- Care information
- Craftsmanship information
- Similar-material comparison

The current interaction is intentionally lightweight and informational rather than pretending to simulate physical touch.

---

# 09. Sofia — Contextual AI Stylist

**Sofia** is the conversational AI layer of PRÉSENCE.

She is not intended to behave like a generic customer-support chatbot. Sofia's role is to help the shopper think through the product and the decision around it.

### Sofia can help with

- Product information
- Material questions
- Styling
- Colours
- Occasion suitability
- Size-related questions
- Product comparison
- Similar products
- Accessories
- Care questions

### Example prompts

```text
Will this material wrinkle easily?
Would this work for a gala?
What can I wear with this?
Compare this with the other dress.
Show me a darker colour.
How should I care for it?
```

### Context sent to Sofia

The `/api/sofia` backend receives contextual information such as:

- Current product
- Product catalog context
- Accessories
- User message
- Conversation history
- Personalization state
- Adaptive profile
- Adaptive decision context

### Conversation memory

Sofia uses product-specific browser `localStorage` memory.

Reopening the same product's conversation can continue from the stored history instead of starting from zero.

The user can choose **New chat** to clear that product's conversation.

### Honest failure handling

When Gemini is unavailable, the UI does not fabricate a Gemini response.

The fallback state is explicitly presented as:

> **Sofia is temporarily unavailable. Please try again.**

This is an intentional trust and transparency decision.

---

# 10. Adaptive Personalization

PRÉSENCE contains a lightweight **interaction-driven adaptive decision layer**.

It is not presented as a trained machine-learning recommendation model.

### Meaningful events

The system can record evidence from interactions including:

- Search
- Product view
- Explicit colour selection
- Material exploration
- Compare
- Size interaction
- Occasion selection
- Styling interaction
- Wishlist add/remove
- Bag add
- Purchase
- Timestamped interaction metadata

### Preference dimensions

The adaptive profile can build context around:

- Colours
- Materials
- Occasions
- Silhouettes
- Brands
- Products

It can also derive decision-stage signals such as:

- Comparison need
- Indecision
- Purchase intent
- Fit need
- Material need
- Styling need
- Exploration
- Colour focus

### Broad stages

The adaptive system can interpret the shopper's current state in broad stages such as:

- Discovery
- Exploring
- Deciding
- Purchase

### Storage

The personalization layer is stored locally in the browser and is intended for prototype-scale experimentation rather than enterprise analytics.

### Important distinction

```text
User interactions
       ↓
Adaptive profile / context
       ↓
Contextual assistance
       ↓
Sofia / discovery / decision support
```

The architecture separates three concepts:

**Adaptive Profile** = structured interaction context  
**Gemini** = conversational intelligence  
**localStorage** = prototype memory

Sofia is not the adaptive engine. Sofia receives context from the adaptive layer and uses Gemini for natural-language conversation.

---

# 11. Your Taste So Far

The Profile area includes a lightweight **Your Taste So Far** view.

It can reflect actual exploration of:

- Colours
- Materials
- Occasions

The feature intentionally avoids:

- Personality scoring
- Fake user personas
- “Style DNA” claims
- Large behavioral profiles
- Cross-session consumer profiling

The objective is to make personalization visible without pretending a small prototype session can fully model a person's taste.

---

# 12. Smart Compare

Smart Compare is designed to make comparison user-controlled rather than automatic.

### Step 1 — Choose Product B

The shopper selects another product to compare with the current product.

### Step 2 — Select priorities

Available priorities include:

- Occasion
- Colour
- Material
- Silhouette
- Price

### Step 3 — Compare only what matters

The interface renders only the attributes selected by the shopper.

The comparison values come from the structured product data.

### Deliberate design choice

PRÉSENCE does not declare a universal winner.

There is no:

- Best-product score
- “AI winner” label
- LLM-generated ranking for every toggle
- Fake recommendation confidence

The interaction is designed to help the shopper reason according to their own priorities.

Sofia can summarize the differences conversationally when the user asks.

---

# 13. Spatial Experience — WebXR

The Spatial Experience is the project's signature emerging-technology interaction.

The final concept uses real **WebXR / immersive AR** architecture rather than a webcam overlay pretending to be AR.

### Spatial technology

- Three.js
- `WebGLRenderer`
- WebXR
- `immersive-ar`
- `hit-test`
- `local-floor`
- `GLTFLoader`
- `DRACOLoader`

### Spatial flow

```text
Product Details
      ↓
Spatial Experience
      ↓
Immersive AR session
      ↓
Environment / hit-test
      ↓
Place Product A
      ↓
Explore / recolour
      ↓
Choose Product B
      ↓
Place Product B
      ↓
Spatial comparison
      ↓
Add A or B to Bag
```

### XR interaction

The primary control method is XR controller/ray interaction.

The spatial interface supports interactions such as:

- Colour selection
- Compare
- Product B selection
- Bag actions
- Placement of the digital product

---

# 14. AR Numpad Controls

A secondary keyboard layer was added for easier testing in desktop WebXR emulator environments.

The Numpad does **not** replace XR controller interaction.

| Key | Action |
|---|---|
| Numpad 1 | Place Product A |
| Numpad 2 | Select Product 2 |
| Numpad 3 | Select Product 3 |
| Numpad 4 | Select Product 4 |
| Numpad 5 | Champagne |
| Numpad 6 | Black |
| Numpad 7 | Burgundy |
| Numpad 8 | Ivory |
| Numpad 9 | Add Product A to Bag |
| Numpad 0 | Add Product B to Bag |

This exists purely as a testing/convenience layer while preserving the intended spatial interaction.

---

# 15. Spatial Comparison Trade-off

The prototype currently provides four model paths:

```text
/models/dress-a.glb
/models/dress-b.glb
/models/dress-c.glb
/models/dress-d.glb
```

The current prototype reuses a shared GLB asset across these paths to validate the interaction architecture.

This is an intentional prototype trade-off.

### Why this is acceptable for the prototype

The spatial system still demonstrates the complete interaction loop:

- Choose Product B
- Load a second model
- Place Product B beside Product A
- Change colour
- Compare in the same spatial environment
- Continue into commerce actions

### Production extension

A production system would use product-specific optimized 3D assets with appropriate file sizes, materials, lighting assumptions, and device-performance constraints.

---

# 16. Complete the Look

Complete the Look helps shoppers understand the product as part of a complete outfit rather than as an isolated garment.

The feature covers accessory contexts such as:

- Footwear
- Bags
- Jewellery
- Other accessories

Example questions supported by the concept:

```text
What should I wear with this?
Which accessories match this colour?
How can I complete this outfit?
```

Sofia can be used alongside this context for conversational styling guidance.

This is intentionally a lightweight supporting commerce feature, not a full recommendation marketplace.

---

# 17. Wishlist

The ecommerce shell includes:

- Save product
- Saved visual state
- Wishlist count
- Wishlist page
- Remove / unsave behavior
- Product re-entry

Wishlist interactions can also contribute to personalization evidence.

---

# 18. Bag

The Bag supports the core purchase journey:

- Add product
- Preserve selected size and colour context
- Multiple items
- Remove item
- Total calculation
- Empty state

Bag interactions can also contribute to purchase-intent evidence in the adaptive layer.

---

# 19. Checkout and Payment

The project includes a complete **prototype commerce flow**:

**Bag → Checkout → Demo Payment → Order Confirmation → Orders**

The payment system is intentionally a demonstration surface.

### Not implemented

- Real payment gateway
- Real card processing
- Production transaction infrastructure
- Real financial processing

The purpose is to show that the decision-support experience leads into a complete shopping journey.

---

# 20. Orders

After the prototype purchase action, the system creates an order record containing information such as:

- Generated order ID
- Date
- Item count
- Status
- Total

Example status:

**Confirmed**

Orders can then be viewed in the Orders section.

---

# 21. Profile and Settings

## Profile

The profile area contains:

- Your Taste So Far
- Wishlist
- Orders
- Settings

## Settings

Settings are intentionally treated as supporting ecommerce/account infrastructure rather than a major innovation area.

The important prototype action is:

**Reset PRÉSENCE personalization**

This allows the adaptive experience to be returned to a clean state during testing.

Authentication and account infrastructure are intentionally out of scope.

---

# 22. HCI Model

PRÉSENCE demonstrates several forms of Human–Computer Interaction.

## Direct interaction

Users directly manipulate:

- Products
- Colours
- Sizes
- Occasions
- Comparison priorities
- Material information

## Conversational interaction

Users ask Sofia natural-language questions instead of navigating through every piece of information manually.

## Spatial interaction

Users interact with digital products inside a physical environment through WebXR.

## Contextual interaction

The current product, selected occasion, personalization evidence, adaptive profile, and comparison state can provide additional context to the experience.

## Decision-support interaction

The system uses multiple interfaces to address multiple forms of uncertainty rather than forcing all decisions through a single chatbot or table.

---

# 23. Technical Architecture

PRÉSENCE intentionally uses a lightweight architecture suitable for a solo portfolio prototype.

## Frontend

- React
- Vite
- JavaScript / JSX
- CSS
- Lucide icons
- React application state
- localStorage

## AI backend

- Node.js
- Express
- CORS
- dotenv
- Gemini API

### AI request flow

```text
React frontend
      ↓
POST /api/sofia
      ↓
Express backend
      ↓
Gemini API
      ↓
Structured contextual response
      ↓
Sofia UI
```

The Gemini API key belongs on the backend environment and must never be exposed in client-side source.

## Spatial stack

- Three.js
- WebGLRenderer
- WebXR
- GLTFLoader
- DRACOLoader
- Hit testing
- Local-floor reference space

---

# 24. Data / State Model

The project keeps data and state intentionally lightweight.

## Product data

The prototype contains a small catalog of four products and supporting accessory data.

## Interaction events

Meaningful interactions can be recorded with:

- Type
- Value
- Metadata
- Timestamp

## Personalization

The adaptive profile is derived from interaction evidence.

## Conversation memory

Sofia conversation history is stored locally in the browser on a product-specific basis.

## Commerce state

Wishlist, Bag and Orders exist as prototype application state rather than as a production commerce database.

---

# 25. Navigation Architecture

The prototype uses lightweight internal React navigation state rather than production routing infrastructure.

Major application surfaces include:

```text
home
listing
product
stylist
material
ar
wishlist
bag
checkout
payment
confirmation
orders
profile
settings
```

This was an intentional scope decision.

For a portfolio prototype, the priority was validating product flow and interaction behavior rather than introducing a larger routing architecture.

---

# 26. Product Decision Map

The complete system can be understood as:

```text
                        PRÉSENCE
                           │
                    Product Details
                           │
     ┌────────────┬────────┼────────┬────────────┐
     │            │        │        │            │
   Colour        Fit    Material  Occasion    Styling
     │            │        │        │            │
 Exploration     Size   Viewer    Context       Sofia
                           │        │            │
                           └────┬───┴────────────┘
                                │
                           Comparison
                                │
                     Smart Compare / AR
                                │
                            Decision
                                │
                         Bag → Checkout
                                │
                           Purchase
```

The technologies therefore operate as one coherent product system instead of a collection of independent demos.

---

# 27. Why These Technologies?

## Why AI?

Some uncertainty is conversational. A shopper may know the question they want answered without knowing which product field or menu contains the answer.

Sofia lets the shopper ask naturally while remaining grounded in supplied product context.

## Why AR?

Some uncertainty is spatial. Product imagery and descriptions cannot fully communicate how a digital product relates to a physical environment.

## Why personalization?

Repeated exploration creates useful behavioral evidence that can make the next interaction more contextually relevant.

## Why structured comparison without a winner?

The shopper's priorities determine what matters. PRÉSENCE therefore exposes the evidence rather than assigning a universal “best” score.

## Why four products?

Four SKUs are enough to demonstrate the interaction architecture while keeping the project focused on depth rather than marketplace scale.

## Why localStorage?

The memory requirements of this prototype are browser-local, making localStorage sufficient for demonstrating the concept without building account infrastructure.

---

# 28. Product Design Principles

### 1. Technology must solve a user problem

AI and AR are only introduced where they directly support a shopping uncertainty.

### 2. Reduce uncertainty rather than increase UI complexity

Each tool should have a clear purpose in the decision journey.

### 3. Keep agency with the shopper

The system provides context, evidence and options rather than making an unexplained decision on behalf of the user.

### 4. Be honest about prototype intelligence

The adaptive layer is lightweight and evidence-driven. The size recommender is heuristic. The payment system is a demo. The shared GLB asset is a prototype limitation.

### 5. Depth over feature count

The project prioritizes a smaller set of meaningful interactions over enterprise-scale infrastructure.

---

# 29. Testing and Iteration

Several iterations were driven by actual interaction testing rather than only visual review.

### Search

Search was changed from a basic navigation shell into a working product-discovery interaction.

### Personalization

Colour evidence was refined so that explicit colour selection contributes meaningfully to colour preference context.

### Size recommendation

Testing exposed a unit-handling issue where inch-style values could be interpreted as centimetres. The recommender was changed to recognize obvious inch-style measurements and use the user's usual size as the starting anchor.

### Sofia

Sofia originally had fallback behavior that could appear as though an adaptive response came from live AI. The final interaction makes service failure explicit instead of pretending Gemini responded.

### Smart Compare

The comparison experience was expanded from a simple two-card block into a priority-driven structured comparison.

### Occasion Intelligence

A lightweight explicit occasion layer was added instead of a large occasion recommendation engine.

### Style Profile

The product uses **Your Taste So Far** rather than an exaggerated “Style DNA” model.

### AR

The spatial layer was implemented around WebXR interaction and a secondary Numpad control layer was added for desktop emulator testing.

### UI polish

The Compare interface was refined to improve hierarchy, chip wrapping, spacing, product presentation and comparison readability.

---

# 30. Final User Journey

The main end-to-end prototype journey is:

```text
Home
 ↓
Search
 ↓
Listing
 ↓
Product Details
 ↓
Colour
 ↓
Size
 ↓
Occasion
 ↓
Material Viewer
 ↓
Sofia
 ↓
Smart Compare
 ↓
Spatial AR
 ↓
Wishlist / Complete the Look
 ↓
Bag
 ↓
Checkout
 ↓
Demo Payment
 ↓
Order Confirmation
 ↓
Orders
 ↓
Profile
 ↓
Settings / Reset
```

The intended product outcome is:

> **Help the shopper move from uncertainty to a more informed purchase decision.**

---

# 31. Running the Project Locally

## Install dependencies

```bash
npm install
```

## Start the frontend

```bash
npm run dev
```

## Start the Sofia backend

```bash
npm run server
```

The exact local URLs are printed by the development tools when each process starts.

---

# 32. Environment Variables

Create a local `.env` file with the required values.

```env
VITE_API_URL=http://localhost:3001
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

### Security rules

- Never commit `.env`.
- Never paste the Gemini API key into frontend code.
- Never expose the key through `VITE_*` variables.
- Keep backend secrets in the server environment.

The repository should contain `.gitignore` entries for `.env` and related environment files.

---

# 33. Important Commands

### Development

```bash
npm run dev
```

### Sofia server

```bash
npm run server
```

### Production build check

```bash
npm run build
```

The build command is used as a final technical verification before publishing the repository.

---

# 34. Final QA Checklist

## Discovery

- Home loads
- Search works
- Search prompts feel contextual
- Filters work
- Sort works
- Product cards open the correct product
- Wishlist works

## Product Details

- Product content is correct
- Colour selection works
- Size recommendation works
- Occasion selection works
- Material Viewer opens
- Sofia opens
- Smart Compare works
- Complete the Look opens
- Add to Bag works
- Buy Now works

## Personalization

- Colour tracking
- Material tracking
- Occasion tracking
- Compare tracking
- Your Taste So Far
- Reset personalization

## Sofia

- Real Gemini response
- Correct product context
- Conversation history
- Reopen and continue conversation
- New chat
- Honest unavailable state

## AR

- Start real WebXR
- Environment / hit-test
- Product A placement
- XR controller interaction
- Colour controls
- Product comparison
- Product B selection
- Spatial comparison
- Add A
- Add B
- Exit AR
- Numpad controls

## Commerce

- Wishlist
- Bag
- Remove item
- Total updates
- Empty bag
- Checkout
- Demo payment
- Confirmation
- Orders

## Final technical check

- No console errors
- No broken assets
- No major mobile overflow
- Back actions behave sensibly
- Build passes
- No secret keys committed

---

# 35. Accepted Prototype Trade-offs

PRÉSENCE is explicitly a **portfolio-scale prototype**, not an enterprise ecommerce implementation.

### Four-SKU catalog

The small catalog allows deeper validation of the product interaction model.

### Shared GLB asset

The spatial experience currently reuses a base GLB asset across multiple product paths to validate interaction architecture.

### Heuristic size recommendation

The size feature provides a transparent starting point rather than pretending to be a production fit model trained on large datasets.

### localStorage memory

Browser-local storage is sufficient for demonstrating personalization and conversational memory in this prototype.

### Frontend catalog

A four-product in-app catalog is intentionally sufficient for this scope. A production database is outside the project's purpose.

### Internal navigation

Lightweight application navigation is used instead of a full production routing system.

### Demo payment

The checkout flow demonstrates commerce continuity without real transaction processing.

### Static material visualization

The Material Viewer emphasizes information and visual understanding rather than pretending to reproduce touch.

---

# 36. Explicitly Out of Scope

To keep the project focused, PRÉSENCE does not attempt to build:

- Enterprise ecommerce infrastructure
- Large-scale inventory management
- Authentication platform
- Real payment processing
- Voice assistant
- Face scanning
- Blockchain
- Large ML recommendation infrastructure
- Production-scale analytics platform
- Social-commerce features
- Marketplace-scale catalog management

The scope rule is:

> **Build only what strengthens the core product experience.**

---

# 37. Portfolio Positioning

### Recommended title

**PRÉSENCE — Adaptive Spatial Commerce for Luxury Fashion**

### Role

**AI Product Designer / Product Designer**

### One-line description

> Designing an adaptive luxury-fashion shopping experience that uses AI, personalization, structured comparison, and WebXR to reduce uncertainty before purchase.

### Strong project statement

> “I did not add AI and AR because they were trendy. I mapped each technology to a specific uncertainty in the shopping journey.”

---

# 38. Recommended Demo Flow

For a short portfolio demo, focus on the strongest product logic rather than every static ecommerce surface:

```text
Home
→ Product
→ Change colour
→ Select occasion
→ Starting-size guidance
→ Material Viewer
→ Sofia
→ Smart Compare
→ Spatial AR
→ Add to Bag
```

The demo should communicate one idea:

> **PRÉSENCE helps shoppers move from uncertainty to confidence before purchase.**

---

# 39. Interview Trade-offs to Own

PRÉSENCE is designed to be discussed honestly as a prototype.

Useful explanations include:

> “This is a portfolio-scale product prototype, not production ecommerce infrastructure.”

> “I kept the catalog to four SKUs because I wanted to validate the interaction system rather than simulate marketplace scale.”

> “The spatial prototype uses a shared GLB asset to validate the interaction flow; a production catalog would use optimized product-specific assets.”

> “The size recommendation is intentionally heuristic and transparent instead of pretending to be a highly accurate machine-learning fit engine.”

> “Sofia is grounded in supplied product and contextual data, and the interface explicitly reports when the live AI service is unavailable.”

> “The adaptive layer provides context, Gemini handles conversation, and localStorage provides prototype memory.”

---

# 40. Suggested Case Study Structure

The GitHub README describes the system. The portfolio case study can go deeper into the design reasoning.

Recommended case-study sequence:

1. Problem
2. Research
3. Key uncertainty insights
4. Product opportunity
5. PRÉSENCE concept
6. User journey
7. Product architecture
8. Decision-support model
9. Personalization
10. Sofia / Gemini
11. Material Viewer
12. Occasion Intelligence
13. Smart Compare
14. WebXR / AR
15. Testing and iteration
16. Trade-offs
17. Final result

---

# 41. Project Outcome

PRÉSENCE is intentionally more than a conventional ecommerce interface with AI and AR attached.

Its central contribution is a **decision-support model for uncertain shopping moments**.

The system connects:

- Product design
- Human–Computer Interaction
- Adaptive personalization
- Conversational AI
- Spatial interaction
- Structured comparison
- Commerce UX

around one user-centered goal:

> **Reduce the uncertainty that prevents a shopper from making a confident decision online.**

PRÉSENCE demonstrates how emerging technologies can become meaningful when they are attached to specific human needs rather than added as isolated technical features.

---

# 42. Links

Add the final public links when available:

- **GitHub Repository:** `YOUR_GITHUB_URL`
- **Live Prototype:** `OPTIONAL_LIVE_URL`
- **Demo Video:** `YOUR_DEMO_VIDEO_URL`
- **Portfolio Case Study:** `YOUR_CASE_STUDY_URL`

A live deployment is optional for this portfolio project. The repository is designed to explain and run the prototype locally.

---

## Final statement

**PRÉSENCE is a decision-support product for the uncertain moments inside luxury commerce.**

AI helps the shopper ask. Personalization helps the system remember context. Comparison helps the shopper reason. AR helps the shopper experience. The product brings those interactions together without taking the decision away from the person making it.
