# Project Name

e-commerce project

## Requirements

Make sure you have the following software installed:

- PHP version 8.1
- Laravel Framework version 10.10
- React version 18.2.0

## Laravel Side

after  Clone the repository.
```bash 
git clone https://github.com/karim-boulad0/e-commerceLaravelSide.git
```

1. Install Composer dependencies:

    ```bash
    composer install
    ```

2. Run migrations and seed the database:

    ```bash
    php artisan migrate --seed
    ```

    This will create an admin account with the following credentials:
    - Email: admin@gmail.com
    - Password: admin123$%

3. Generate Passport client for personal access:

    ```bash
    php artisan passport:client --personal
    ```

4. Start the Laravel server:

    ```bash
    php artisan serve
    ```

## React Side

after  Clone the repository.
```bash 
git clone https://github.com/karim-boulad0/e-commerceReactSide.git
```

1. Install Node.js dependencies:

    ```bash
    npm install
    ```

2. Start the React development server:

    ```bash
    npm start
    ```

3. Open [http://localhost:3000/index/homepage](http://localhost:3000/index/homepage) in your browser.

4. Click on the "Login" button in the right side of the top bar.

5. Enter the following login credentials:
    - Email: admin@gmail.com
    - Password: admin123$%

Now you should be able to use the application!

# E-Commerce Dashboard

Welcome to the E-Commerce Dashboard, a comprehensive solution for managing users, products, orders, and statistics.

## Overview

The E-Commerce Dashboard provides a user-friendly interface for administrators to handle various aspects of the e-commerce platform, including user management, product management, order processing, and statistical analysis.

## Features

### Registration and Login

- Users can register for an account or log in using traditional credentials.
- Google Sign-In is available for a seamless authentication process.

### User Roles

- **Admin:** Has full permissions to access all dashboard features.
- **Product Manager:** Can add and edit products.
- **User:** Regular user role with standard functionalities.

### Dashboard Pages

- **User Management:** Add, edit, and delete users.
- **Category Management:** Create, edit, and delete product categories.
- **Product Management:** Add, edit, and delete products with image upload functionality.
- **Order Management:** View and process orders (confirm, delete, or mark as pending).
- **Statistics:** Track product quantities and sales on a monthly, yearly, and daily basis.
- **Settings:** Manage profile information, including email, phone, etc.

### Notifications

- Receive notifications for new orders.
- Track unread notifications in the top bar.

### Filters

- Apply filters on various dashboard pages for enhanced data visibility.

## Dashboard Side

In addition to the core features, the dashboard side includes:

- **Admin Actions:** Add, edit, and delete users, categories, and products.
- **Order Management:** Process orders, change order status, and view order details.
- **Statistics:** Access detailed statistics on product quantities and sales.
- **Settings:** Manage profile information and receive notifications.


## E-Commerce Website

Explore a wide range of products and enjoy a seamless shopping experience on our E-Commerce Website.

### Features

- **Product Browsing:** Explore products from different categories.
- **Search Functionality:** Find specific products easily.
- **User Authentication:** Register, log in, and manage your profile.
- **Google Sign-In:** Sign up or log in using Google credentials.
- **Shopping Cart:** Add products to the cart and proceed to checkout.
- **Order History:** View past orders and their status.

#### Real-time Notifications

- Receive notifications when the admin changes the order status.

#### Contact Us (Footer)

- **Email Us:** Use the contact form in the footer to send an email to the owner.
