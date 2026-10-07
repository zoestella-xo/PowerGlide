# PowerGlide Premier Auto Service Center

A modern, responsive automotive service and parts platform designed and developed for PowerGlide Premier Auto Service Center.

## Live Website



## Project Overview

PowerGlide Premier Auto Service Center is an automotive business providing vehicle servicing, repairs, diagnostics, maintenance and automotive parts.

The goal of this project was to create a professional digital experience that makes it easy for customers to:

- Understand what PowerGlide offers
- Explore automotive services
- Request a vehicle service
- Browse automotive parts
- View product details
- Add products to a cart
- Submit an order enquiry
- Learn more about PowerGlide
- Contact the business through multiple channels

The website was designed to feel like a complete automotive service and parts platform rather than a basic mechanic website.

---

## Problem

Customers looking for automotive services often need to find information quickly, especially when they have a vehicle problem.

The website therefore needed to reduce the amount of effort required to answer three key questions:

1. What does PowerGlide offer?
2. How can I get help with my vehicle?
3. How can I contact PowerGlide or request a part?

The design focuses on clarity, simple navigation and strong calls-to-action so customers can reach the appropriate action quickly.

---

## Solution

The solution is a responsive React-based website that combines:

- Automotive service discovery
- Service request/booking
- Automotive parts browsing
- Product details
- Shopping cart functionality
- Order enquiry
- Company information
- Contact options

The experience was designed around three primary customer journeys:

### Vehicle Repair

Home → Services → Select Service → Request Service → Confirmation

### Buy a Part

Home → Auto Parts → Product → Cart → Order Request

### General Enquiry

Home → Contact → WhatsApp / Call / Contact Form

---

## Main Features

### Homepage

The homepage introduces PowerGlide and provides clear paths to the main customer actions.

Key sections include:

- Hero section
- Value proposition
- Services overview
- Featured automotive parts
- Why choose PowerGlide
- Service process
- About PowerGlide
- Testimonials
- Booking CTA
- Contact information
- Footer

Primary calls-to-action include:

- Book a Service
- Shop Auto Parts
- Contact Us

### Services

The Services page allows customers to explore available automotive services.

Each service provides:

- Service name
- Description
- Supporting icon/visual
- Key information
- Call-to-action

### Auto Parts

The Auto Parts section provides a mini e-commerce experience where customers can:

- Browse products
- Search/filter products
- Open product details
- Add products to the cart
- Review selected products

### Product Details

The product details page provides:

- Product information
- Price
- Availability
- Description
- Compatibility information
- Quantity selection
- Add to Cart action
- Part enquiry action

### Cart

Customers can:

- Review selected products
- Adjust quantities
- Remove products
- Review the subtotal
- Provide customer information
- Provide vehicle information
- Add additional notes
- Submit an order enquiry

No online payment system is required for this project. The cart therefore uses an order-enquiry approach.

### Service Booking

The service request flow allows customers to provide:

- Required service
- Vehicle make
- Vehicle model
- Vehicle year
- Preferred date
- Preferred time
- Customer name
- Phone number
- Additional information

The flow provides a confirmation state after submission.

### About

The About page communicates:

- Who PowerGlide is
- Automotive expertise
- Service approach
- Customer-focused values
- Reasons to trust the business

### Contact

The Contact page provides several ways for customers to communicate with PowerGlide:

- Phone
- WhatsApp
- Email
- Contact form
- Location information
- Opening hours

The contact experience is designed to be particularly accessible on mobile devices.

---

## UX / HCI Approach

The interface was designed using several human-computer interaction principles.

### Recognition over Recall

Important actions are visible rather than requiring users to remember where features are located.

For example, primary actions such as:

- Book a Service
- Shop Auto Parts
- Contact Us

are presented prominently.

### Hick's Law

The homepage avoids presenting too many competing actions at the same level.

The main customer paths are prioritised so users can quickly choose between:

- Getting vehicle help
- Finding a part
- Contacting PowerGlide

### Fitts's Law

Interactive elements were designed with sufficiently large touch areas, particularly for mobile users.

Primary buttons and contact actions are visually prominent and easy to tap.

### Progressive Disclosure

The service request experience is structured so users are not overwhelmed by a large amount of information at once.

Information is collected in a logical sequence.

### Error Prevention

Forms use clear labels and input types to reduce ambiguity.

The interface also communicates what information is required before a customer submits a request.

### Visibility of System Status

Confirmation states are used after important actions such as service requests and order enquiries so users understand that their action has been completed.

### Consistency

Buttons, cards, typography, spacing, navigation and form patterns use consistent visual and interaction patterns throughout the website.

---

## Visual Design

### Brand Direction

The visual design uses an automotive-inspired aesthetic intended to communicate:

- Trust
- Professionalism
- Technical expertise
- Reliability
- Convenience

### Typography

The typography combines an automotive-inspired heading style with a highly readable body typeface.

Large headings are used to create visual hierarchy while body text remains easy to scan across mobile and desktop layouts.

### Imagery

Placeholders are put in place now - to be replaced by actual images of products, services and company later.

---

## Responsive Design

The website follows a mobile-first approach and adapts across:

- Mobile
- Desktop

The layout uses responsive grids, flexible containers and mobile navigation patterns.

Special attention was given to:

- Touch-friendly controls
- Readable typography
- Simplified mobile layouts
- Accessible form controls
- Responsive product/service cards
- Mobile contact actions

---

## Technology Stack

### Frontend

- React
- TypeScript
- CSS
- Lucide React

### Development

- Vite
- npm
- Git / GitHub

### Deployment

- Netlify

The project uses Vite for development and production builds. Vite's production build command is `vite build`, with `dist` as the default output directory.

---

