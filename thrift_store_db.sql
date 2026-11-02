-- =========================================================
-- DATABASE: thrift_store_db
-- ERD FINAL: Toko Preloved / Thrift Fashion
-- MariaDB 10.4.x
-- =========================================================

CREATE DATABASE IF NOT EXISTS `thrift_store_db`;
USE `thrift_store_db`;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

START TRANSACTION;

-- =========================================================
-- 1. TABLE: admin
-- =========================================================

CREATE TABLE `admin` (
  `admin_id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(50) NOT NULL,
  `password_hash` VARCHAR(255) NOT NULL,

  PRIMARY KEY (`admin_id`),
  UNIQUE KEY `uk_admin_username` (`username`)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_general_ci;


-- =========================================================
-- 2. TABLE: customer
-- =========================================================

CREATE TABLE `customer` (
  `customer_id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(100) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `password_hash` VARCHAR(255) NOT NULL,
  `foto_profil` VARCHAR(255) DEFAULT NULL,

  PRIMARY KEY (`customer_id`),
  UNIQUE KEY `uk_customer_username` (`username`),
  UNIQUE KEY `uk_customer_email` (`email`)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_general_ci;


-- =========================================================
-- 3. TABLE: address
-- =========================================================

CREATE TABLE `address` (
  `address_id` INT NOT NULL AUTO_INCREMENT,
  `customer_id` INT NOT NULL,
  `nama_penerima` VARCHAR(100) NOT NULL,
  `nomor_hp` VARCHAR(20) NOT NULL,
  `alamat_lengkap` TEXT NOT NULL,

  PRIMARY KEY (`address_id`),
  KEY `idx_address_customer` (`customer_id`),

  CONSTRAINT `fk_address_customer`
    FOREIGN KEY (`customer_id`)
    REFERENCES `customer` (`customer_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_general_ci;


-- =========================================================
-- 4. TABLE: category
-- =========================================================

CREATE TABLE `category` (
  `category_id` INT NOT NULL AUTO_INCREMENT,
  `nama_kategori` VARCHAR(100) NOT NULL,

  PRIMARY KEY (`category_id`),
  UNIQUE KEY `uk_category_nama` (`nama_kategori`)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_general_ci;


-- =========================================================
-- 5. TABLE: product
-- =========================================================

CREATE TABLE `product` (
  `product_id` INT NOT NULL AUTO_INCREMENT,
  `category_id` INT DEFAULT NULL,
  `nama_produk` VARCHAR(150) NOT NULL,
  `target` ENUM('Women', 'Men', 'Unisex') NOT NULL,
  `deskripsi` TEXT DEFAULT NULL,
  `foto` VARCHAR(255) DEFAULT NULL,
  `status` ENUM('Tersedia', 'Tidak Tersedia') NOT NULL DEFAULT 'Tersedia',

  PRIMARY KEY (`product_id`),
  KEY `idx_product_category` (`category_id`),

  CONSTRAINT `fk_product_category`
    FOREIGN KEY (`category_id`)
    REFERENCES `category` (`category_id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_general_ci;


-- =========================================================
-- 6. TABLE: product_variant
-- =========================================================

CREATE TABLE `product_variant` (
  `variant_id` INT NOT NULL AUTO_INCREMENT,
  `product_id` INT NOT NULL,
  `ukuran` VARCHAR(20) NOT NULL,
  `harga` INT NOT NULL,
  `stok` INT NOT NULL DEFAULT 0,

  PRIMARY KEY (`variant_id`),
  UNIQUE KEY `uk_variant_product_ukuran` (`product_id`, `ukuran`),
  KEY `idx_variant_product` (`product_id`),

  CONSTRAINT `fk_variant_product`
    FOREIGN KEY (`product_id`)
    REFERENCES `product` (`product_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,

  CONSTRAINT `chk_variant_harga`
    CHECK (`harga` > 0),

  CONSTRAINT `chk_variant_stok`
    CHECK (`stok` >= 0)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_general_ci;


-- =========================================================
-- 7. TABLE: `order`
-- =========================================================

CREATE TABLE `order` (
  `order_id` INT NOT NULL AUTO_INCREMENT,
  `customer_id` INT NOT NULL,

  `status` ENUM(
    'Menunggu Pembayaran',
    'Pesanan Dibuat',
    'Diproses',
    'Dikirim',
    'Selesai'
  ) NOT NULL DEFAULT 'Menunggu Pembayaran',

  `metode_bayar` ENUM(
    'GoPay',
    'OVO',
    'DANA',
    'ShopeePay',
    'QRIS'
  ) NOT NULL,

  `total` INT NOT NULL,

  `nama_penerima_snapshot` VARCHAR(100) NOT NULL,
  `nomor_hp_snapshot` VARCHAR(20) NOT NULL,
  `alamat_snapshot` TEXT NOT NULL,

  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (`order_id`),
  KEY `idx_order_customer` (`customer_id`),

  CONSTRAINT `fk_order_customer`
    FOREIGN KEY (`customer_id`)
    REFERENCES `customer` (`customer_id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,

  CONSTRAINT `chk_order_total`
    CHECK (`total` >= 0)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_general_ci;


-- =========================================================
-- 8. TABLE: order_detail
-- =========================================================

CREATE TABLE `order_detail` (
  `order_detail_id` INT NOT NULL AUTO_INCREMENT,
  `order_id` INT NOT NULL,
  `variant_id` INT NOT NULL,
  `jumlah` INT NOT NULL,
  `harga_satuan` INT NOT NULL,

  PRIMARY KEY (`order_detail_id`),

  UNIQUE KEY `uk_order_detail_order_variant`
    (`order_id`, `variant_id`),

  KEY `idx_order_detail_order` (`order_id`),
  KEY `idx_order_detail_variant` (`variant_id`),

  CONSTRAINT `fk_order_detail_order`
    FOREIGN KEY (`order_id`)
    REFERENCES `order` (`order_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,

  CONSTRAINT `fk_order_detail_variant`
    FOREIGN KEY (`variant_id`)
    REFERENCES `product_variant` (`variant_id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,

  CONSTRAINT `chk_order_detail_jumlah`
    CHECK (`jumlah` > 0),

  CONSTRAINT `chk_order_detail_harga`
    CHECK (`harga_satuan` > 0)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_general_ci;


-- =========================================================
-- 9. TABLE: review
-- =========================================================

CREATE TABLE `review` (
  `review_id` INT NOT NULL AUTO_INCREMENT,
  `customer_id` INT NOT NULL,
  `product_id` INT NOT NULL,
  `order_id` INT NOT NULL,
  `rating` INT NOT NULL,
  `komentar` TEXT DEFAULT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (`review_id`),

  UNIQUE KEY `uk_review_order_product`
    (`order_id`, `product_id`),

  KEY `idx_review_customer` (`customer_id`),
  KEY `idx_review_product` (`product_id`),
  KEY `idx_review_order` (`order_id`),

  CONSTRAINT `fk_review_customer`
    FOREIGN KEY (`customer_id`)
    REFERENCES `customer` (`customer_id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,

  CONSTRAINT `fk_review_product`
    FOREIGN KEY (`product_id`)
    REFERENCES `product` (`product_id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,

  CONSTRAINT `fk_review_order`
    FOREIGN KEY (`order_id`)
    REFERENCES `order` (`order_id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,

  CONSTRAINT `chk_review_rating`
    CHECK (`rating` BETWEEN 1 AND 5)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_general_ci;


COMMIT;