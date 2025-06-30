# E-Commerce App for lighting products

A responsive and user-friendly e-commerce application built with **React + TypeScript**, powered by **Cloudinary** for image management and **Firestore** for backend data storage.

Live site: https://janitech2025.github.io/eShop/

---

## Features

- Home page displays paginated product images and lifestyle images & featured products in carousel displays
- Shop page displays products details along with variant selections and an add to cart button
- Cart page displays products added to the cart or empty page if there is no selection
- Displays **product variants** based on selected **colour**
- Uses **FontAwesome icons** for enhanced UI
- **Carousel** for:
  - Lifestyle images
  - Featured products on homepage
- Adds to cart only if the product:
  - Is within **stock limits**

---

## Tech Stack

[![React](https://img.shields.io/badge/React-20232a?style=for-the-badge&logo=react&logoColor=61dafb)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178c6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)](https://cloudinary.com/)
[![Firestore](https://img.shields.io/badge/Firestore-ffca28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/docs/firestore)

---

## Screenshots

### Homepage

![Homepage Screenshot](screenshot1.png)

### Product Details + Variants

![Product Screenshot](screenshot2.png)

### Cart Functionality

![Cart Screenshot](screenshot3.png)

## Learnings

- I learnt how to use useContext as a single source of truth to manage global state for both the product list and the cart.

- I got comfortable working with React Router to handle browser navigation and dynamic routes.

- Using fallback values in components to keep the UI stable, especially when data might be undefined or loading.

- Using pagination to break up and display fetched search results effectively.

---

## Future Improvements

Add login and manage user profiles

Add Admin and panel for managing products

Search and filter functionality

Add payment

````

---

## Deployment Instructions

### Build the App

```bash
npm run build

````
