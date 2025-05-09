CREATE TABLE `User`(
    `user_id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `role` ENUM('') NOT NULL,
    `adress_id` INT NOT NULL,
    `seller_id` INT NULL
);
CREATE TABLE `Product`(
    `product_id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `product_name` VARCHAR(255) NULL,
    `product_description` VARCHAR(255) NOT NULL,
    `product_price` DOUBLE NOT NULL,
    `product_stock` INT NOT NULL,
    `date_creation` DATETIME NOT NULL
);
CREATE TABLE `Category`(
    `category_id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `category_name` VARCHAR(255) NOT NULL,
    `category_description` VARCHAR(255) NOT NULL
);
CREATE TABLE `Seller`(
    `seller_id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `store_name` VARCHAR(255) NOT NULL,
    `contact_phone` VARCHAR(255) NOT NULL,
    `adress_seller` VARCHAR(255) NOT NULL,
    `email_seller` VARCHAR(255) NOT NULL,
    `information_seller` VARCHAR(255) NOT NULL
);
CREATE TABLE `Order`(
    `order_id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `date_order` DATETIME NOT NULL,
    `status` ENUM('') NOT NULL,
    `total_amount` DECIMAL(8, 2) NOT NULL,
    `user_id` INT NOT NULL
);
CREATE TABLE `Review`(
    `review_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT NOT NULL,
    `rating` ENUM('') NOT NULL,
    `comment` VARCHAR(255) NOT NULL,
    `date_publish` DATETIME NOT NULL
);
CREATE TABLE `ShoppingCart`(
    `shopping_cart_id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `created_at` DATETIME NOT NULL,
    `user_id` INT NOT NULL
);
CREATE TABLE `CartItem`(
    `cart_item_id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `shopping_cart_id` INT NOT NULL,
    `product_id` INT NOT NULL
);
CREATE TABLE `Adress`(
    `adresse_id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `street` VARCHAR(255) NOT NULL,
    `postal_code` VARCHAR(255) NOT NULL,
    `city` VARCHAR(255) NOT NULL,
    `country` VARCHAR(255) NOT NULL,
    `user_id` INT NOT NULL
);
CREATE TABLE `Shipment`(
    `shipment_id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `date` DATETIME NOT NULL,
    `type_shipment` ENUM('') NOT NULL,
    `status` ENUM('') NOT NULL,
    `order_id` INT NOT NULL
);
CREATE TABLE `Payment`(
    `payment_id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `amount` DOUBLE NOT NULL,
    `payment_method` ENUM('') NOT NULL,
    `status` ENUM('') NOT NULL,
    `payment_date` DATETIME NOT NULL,
    `order_id` INT NOT NULL
);
CREATE TABLE `Product_Category`(
    `product_category_id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `product_id` INT NOT NULL,
    `category_id` INT NOT NULL
);
CREATE TABLE `OrderItem`(
    `order_item_id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `product_id` INT NOT NULL,
    `order_id` INT NOT NULL,
    `quantity` DOUBLE NOT NULL,
    `price_unit` DOUBLE NOT NULL
);
ALTER TABLE
    `Product_Category` ADD CONSTRAINT `product_category_product_id_foreign` FOREIGN KEY(`product_id`) REFERENCES `Product`(`product_id`);
ALTER TABLE
    `Adress` ADD CONSTRAINT `adress_user_id_foreign` FOREIGN KEY(`user_id`) REFERENCES `User`(`user_id`);
ALTER TABLE
    `Order` ADD CONSTRAINT `order_user_id_foreign` FOREIGN KEY(`user_id`) REFERENCES `User`(`user_id`);
ALTER TABLE
    `OrderItem` ADD CONSTRAINT `orderitem_product_id_foreign` FOREIGN KEY(`product_id`) REFERENCES `Product`(`product_id`);
ALTER TABLE
    `Product_Category` ADD CONSTRAINT `product_category_category_id_foreign` FOREIGN KEY(`category_id`) REFERENCES `Category`(`category_id`);
ALTER TABLE
    `OrderItem` ADD CONSTRAINT `orderitem_order_id_foreign` FOREIGN KEY(`order_id`) REFERENCES `Order`(`order_id`);
ALTER TABLE
    `Payment` ADD CONSTRAINT `payment_order_id_foreign` FOREIGN KEY(`order_id`) REFERENCES `Order`(`order_id`);
ALTER TABLE
    `Review` ADD CONSTRAINT `review_user_id_foreign` FOREIGN KEY(`user_id`) REFERENCES `User`(`user_id`);
ALTER TABLE
    `CartItem` ADD CONSTRAINT `cartitem_product_id_foreign` FOREIGN KEY(`product_id`) REFERENCES `Product`(`product_id`);
ALTER TABLE
    `ShoppingCart` ADD CONSTRAINT `shoppingcart_user_id_foreign` FOREIGN KEY(`user_id`) REFERENCES `User`(`user_id`);
ALTER TABLE
    `CartItem` ADD CONSTRAINT `cartitem_shopping_cart_id_foreign` FOREIGN KEY(`shopping_cart_id`) REFERENCES `ShoppingCart`(`shopping_cart_id`);
ALTER TABLE
    `Shipment` ADD CONSTRAINT `shipment_order_id_foreign` FOREIGN KEY(`order_id`) REFERENCES `Order`(`order_id`);
ALTER TABLE
    `User` ADD CONSTRAINT `user_seller_id_foreign` FOREIGN KEY(`seller_id`) REFERENCES `Seller`(`seller_id`);