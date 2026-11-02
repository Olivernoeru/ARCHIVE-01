# PROJECT BASIS DATA

## Product Requirements Document (PRD)

Website E-Commerce Single-Seller - Preloved / Thrift Fashion
Tagline: “Walau Bekas Terasa Seperti Brand New”

## 1. Project Overview

Website ini adalah platform e-commerce single-seller untuk menjual produk preloved/thrift fashion (t-shirt, hoodie, dress, celana, jaket, sepatu, tas). Berbeda dengan marketplace, hanya ada satu pemilik toko yang menjual langsung ke customer - tidak ada seller lain yang bisa mendaftar atau berjualan di platform ini.

Sistem dibangun sebagai satu aplikasi web dengan dua sisi penggunaan (Customer & Admin) yang berbagi backend, REST API, dan database yang sama. Stack teknologi: React + Tailwind CSS (frontend), Node.js + Express.js (backend/REST API), dan MySQL/MariaDB (database).

---

## 2. Project Goals

- Menyediakan proses jual-beli end-to-end: lihat produk → detail → keranjang → checkout → pilih alamat → pilih metode bayar → simulasi pembayaran → konfirmasi → pesanan dibuat → diproses admin → dikirim → progress terlihat customer → selesai → review.
- Menunjukkan implementasi teknis yang relevan untuk project mahasiswa: database relasional, REST API, CRUD, relasi antar data, transaksi, manajemen stok, serta integrasi dua sisi pengguna (Customer & Admin) dalam satu sistem.
- Menjaga sistem tetap sederhana, realistis, dan mudah diimplementasikan - bukan meniru kompleksitas e-commerce besar.

## 3. Scope

Project ini mencakup pengembangan satu website e-commerce preloved/thrift fashion yang dikelola oleh satu seller/owner, dengan Customer dan Admin/Owner sebagai pengguna sistem.

Termasuk dalam scope:

- Autentikasi Customer dan Admin/Owner.
- Profil Customer dan pengelolaan beberapa alamat.
- Katalog produk berbasis kategori tanpa search dan filter.
- Produk dengan varian ukuran, termasuk harga dan stok per ukuran.
- Keranjang sementara yang tidak disimpan secara permanen di database.
- Checkout menggunakan alamat yang telah tersimpan.
- Simulasi pembayaran menggunakan GoPay, OVO, DANA, ShopeePay, dan QRIS.
- Pembuatan pesanan hanya setelah pembayaran berhasil dikonfirmasi.
- Pengelolaan stok secara otomatis berdasarkan transaksi.
- Tracking status pesanan secara non-real-time.
- Pembatalan pesanan sesuai status yang diperbolehkan.
- Review produk setelah pesanan selesai.
- Admin Panel untuk mengelola produk, varian, kategori, ketersediaan produk, status pesanan, dan melihat daftar Customer.
- Backend REST API menggunakan Node.js dan Express.js serta database MySQL/MariaDB.

Tidak termasuk dalam scope:

- Marketplace atau multi-vendor.
- Search dan filter produk.
- Payment gateway atau pembayaran nyata.
- COD.
- Real-time tracking, GPS, dan live map.
- Integrasi API kurir.
- Sistem refund atau dispute yang kompleks.
- Forgot Password dan Change Password.
- Multi-admin dan sistem permission yang kompleks.
- Dashboard Admin.
- Inventory history, warehouse management, dan supplier management.
- Price history dan product versioning.

---

## 4. Actors

| Actor | Deskripsi | Hak Akses Utama |
| --- | --- | --- |
| Customer | Pengguna yang melihat dan membeli produk | Register/login, kelola profil & alamat, browsing katalog, keranjang, checkout, bayar (simulasi), lihat & batalkan pesanan, tracking, review |
| Admin / Owner | Pemilik tunggal toko & pengelola sistem | Login khusus, kelola produk & kategori, update status pesanan, lihat daftar customer |

---

## 5. System Architecture Overview

Sistem terdiri dari satu website/satu sistem dengan dua titik akses:

- Customer Side - diakses lewat website utama.
- Admin Side - diakses lewat rute/akses khusus menuju Admin Panel.

Keduanya bukan dua aplikasi terpisah: sama-sama memakai backend Node.js + Express, REST API yang sama, dan database MySQL/MariaDB yang sama. Akibatnya, perubahan data di satu sisi langsung tercermin di sisi lain - misalnya Admin menambah produk otomatis muncul di Customer, Customer membeli produk otomatis muncul di daftar pesanan Admin, dan stok berkurang/bertambah otomatis tanpa input manual admin.

### 1 WEBSITE / 1 SYSTEM

Sistem dikembangkan sebagai **satu website dengan satu sistem terintegrasi** yang memiliki dua sisi penggunaan, yaitu Customer dan Admin/Owner. Keduanya menggunakan backend, REST API, dan database yang sama.

```
                         1 WEBSITE / 1 SYSTEM
                                  │
                    ┌─────────────┴─────────────┐
                    │                           │
                 CUSTOMER                  ADMIN / OWNER
                    │                           │
             Website Utama                 Admin Panel
                    │                           │
                    └─────────────┬─────────────┘
                                  │
                                  ▼
                         Node.js + Express.js
                                  │
                                  ▼
                              REST API
                                  │
                                  ▼
                         MySQL / MariaDB
```

**Customer** menggunakan website utama untuk melihat produk, mengelola akun, melakukan checkout, melakukan pembayaran simulasi, melihat pesanan, dan memberikan review.

**Admin/Owner** menggunakan Admin Panel untuk mengelola produk, kategori, stok, ketersediaan produk, pesanan, dan melihat daftar customer.

Kedua sisi tersebut tidak menggunakan sistem atau database yang terpisah. Seluruh data diproses melalui **backend dan REST API yang sama**, kemudian disimpan dan dikelola dalam **satu database**.

---

## 6. Customer Requirements

- Autentikasi: register (username, email, password); login (email, password); wajib login sebelum membeli.
- Profil: lihat username, email, foto profil; hanya username & foto yang bisa diedit; email tidak bisa diubah. Password hanya dibuat saat registrasi. Sistem tidak menyediakan fitur Change Password maupun Forgot Password / Reset Password.
- Alamat: boleh punya lebih dari satu; field: Nama Penerima, Nomor HP, Alamat Lengkap (satu field gabungan, tidak dipecah); CRUD penuh oleh customer.
- Katalog: eksplorasi produk per kategori saja, tanpa search/filter apa pun.
- Pesanan & Riwayat: lihat status pesanan berjalan dan riwayat pesanan selesai/dibatalkan.
- Review: beri rating + komentar untuk produk dari pesanan yang sudah Selesai.

---

## 7. Admin Requirements

- Login: username + password (bukan email); hanya satu akun admin, tanpa role/permission management.
- Admin Panel hanya terdiri dari 4 menu (tanpa Dashboard): Produk, Kategori, Pesanan, Customer.
- Produk: CRUD penuh termasuk varian ukuran, harga, dan stok per ukuran.
- Kategori: CRUD penuh; penghapusan kategori tidak menghapus produk terkait (non-cascade).
- Pesanan: melihat seluruh pesanan customer beserta detailnya, serta memperbarui status pesanan secara bertahap.
- Customer: hanya melihat daftar customer - tidak ada edit, hapus, reset password, atau kelola data customer lainnya.

---

## 8. User Flow

Flow utama (Customer):

```
Home → Kategori → Daftar Produk → Detail Produk → Pilih Ukuran
→ Tambah ke Keranjang → Checkout → Pilih Alamat → Pilih Metode Bayar
→ Halaman Pembayaran (simulasi) → Konfirmasi Pembayaran
→ [Sukses] Pesanan Dibuat + Stok Berkurang + Keranjang Kosong
→ Admin Memproses Pesanan → Status Diperbarui Bertahap
→ Customer Memantau Progress → Pesanan Selesai → Customer Memberi Review
```

Flow Admin:

```
Login Admin → Kelola Produk & Kategori → Pantau Pesanan Masuk
→ Perbarui Status Pesanan Sesuai Progres Pengiriman
```

---

## 9. Product Requirements

Setiap produk memiliki: ID Produk, Nama Produk (bebas, tanpa field Brand terpisah), Kategori (relasi, boleh kosong jika kategori dihapus), Target (enum tetap: Women/Men/Unisex - bukan data CRUD), Deskripsi, dan Foto (disimpan sebagai path/URL, bukan binary).

Setiap produk dapat memiliki lebih dari satu ukuran/varian, dan ukuran bersifat free-form (bukan daftar tetap) - contoh: S, M, L, 42, Free Size. **Admin hanya perlu membuat varian untuk ukuran yang memang dimiliki oleh produk. Varian yang sudah dibuat dapat memiliki stok 0 ketika stok ukuran tersebut habis.**

Harga dan stok berlaku per ukuran, bukan per produk:

| Ukuran | Harga | Stok |
| --- | --- | --- |
| M | Rp100.000 | 1 |
| L | Rp120.000 | 2 |
| XL | Rp130.000 | 1 |

---

## 10. Cart & Checkout Requirements

Keranjang bersifat sementara (tidak disimpan sebagai data permanen di database, tidak perlu tabel Cart/Cart Detail). Alur: tambah produk → keranjang sementara → checkout → pembayaran berhasil → pesanan dibuat → keranjang dikosongkan.

Saat checkout, customer memilih dari alamat yang sudah tersimpan - tidak ada input alamat baru langsung pada halaman checkout.

---

## 11. Payment Requirements

Pembayaran bersifat simulasi, tanpa integrasi payment gateway nyata. Customer memilih metode spesifik, bukan kategori umum:

- E-Wallet: GoPay, OVO, DANA, ShopeePay
- QR: QRIS

Setelah memilih metode, customer diarahkan ke halaman pembayaran (simulasi) lalu melakukan konfirmasi pembayaran.

---

## 12. Order Requirements

Aturan paling krusial: pesanan belum tercipta saat customer checkout atau masuk ke halaman pembayaran. Pesanan baru dibuat setelah customer mengonfirmasi pembayaran dan pembayaran dinyatakan berhasil. Jika customer keluar sebelum konfirmasi, tidak ada pesanan yang tercipta dan stok tidak berkurang.

Satu customer dapat memiliki banyak pesanan; satu pesanan dapat berisi banyak produk/varian. Detail pesanan harus mencatat: produk, ukuran/varian, jumlah, **harga yang digunakan pada saat transaksi**, total pesanan, **snapshot alamat pengiriman yang digunakan saat checkout**, metode pembayaran, dan status pesanan. Harga transaksi dan alamat pengiriman pada order tidak boleh berubah ketika data produk atau alamat customer berubah setelah transaksi.

 Status awal pesanan adalah “Pesanan Dibuat”; status “Menunggu Pembayaran” tidak perlu disimpan sebagai status order.

---

## 13. Order Tracking Requirements

Tracking bukan real-time (tidak ada GPS, live map, atau integrasi API ekspedisi) - tujuannya hanya menunjukkan pesanan sudah sampai tahap mana, ditampilkan sebagai timeline/progress:

✓ Pesanan Dibuat
✓ Pesanan Diproses

- Dikirim
○ Sudah di Kurir
○ Menuju Rumah/Tempat
○ Selesai

Status pesanan normal mengikuti urutan progres tersebut dan tidak dapat dilewati atau dikembalikan ke status sebelumnya melalui alur normal. Customer hanya dapat melihat progress, sedangkan Admin bertanggung jawab memperbarui status. Pembatalan merupakan kondisi akhir terpisah dari alur normal menuju `Selesai` dan hanya dapat dilakukan ketika status masih `Pesanan Dibuat`.

---

## 14. Stock Management Requirements

Admin menetapkan stok awal per ukuran, namun pengurangan stok dilakukan otomatis oleh sistem setelah pembayaran berhasil (bukan manual oleh admin). Jika pesanan dibatalkan sesuai aturan pembatalan, stok otomatis dikembalikan.

- Satu ukuran stok 0 → ukuran itu tidak bisa dipilih, ukuran lain tetap bisa dibeli.
- Semua ukuran stok 0 → produk otomatis berstatus “Produk Habis” dan tidak bisa masuk keranjang.
- Status manual Tersedia/Tidak Tersedia hanya dipakai bila admin ingin menghentikan penjualan produk secara keseluruhan, bukan karena stok habis.
- Jika Admin menetapkan produk sebagai `Tidak Tersedia`, produk tetap tersimpan dan tetap dapat dilihat customer, tetapi tidak dapat dipilih untuk dibeli atau dimasukkan ke keranjang. Stok yang masih tersedia tetap dipertahankan dan dapat digunakan kembali ketika Admin mengubah status menjadi `Tersedia`.
- Status `Produk Habis` ditentukan otomatis ketika seluruh ukuran produk memiliki stok 0. Kondisi ini berbeda dari `Tidak Tersedia` yang ditetapkan secara manual oleh Admin.
- Tidak perlu inventory history, stock movement system, warehouse, atau supplier management.

---

## 15. Review Requirements

Customer dapat memberi review **hanya setelah** pesanan berstatus `Selesai`. Review diberikan **untuk produk yang benar-benar dibeli oleh customer dalam pesanan tersebut**, bukan untuk produk yang tidak pernah dibeli. Review berisi rating + komentar dan terhubung dengan customer, produk, serta pesanan terkait. Customer dapat menambah, mengedit, dan menghapus review miliknya sendiri. Review tidak dapat dibuat untuk produk di luar transaksi customer tersebut.

---

## 16. Business Rules

1. Pesanan hanya tercipta setelah pembayaran dikonfirmasi berhasil; checkout saja tidak membuat pesanan.
2. Pengurangan & pengembalian stok dilakukan otomatis oleh sistem, bukan manual admin.
3. Pembatalan pesanan hanya diperbolehkan saat status masih Pesanan Dibuat.
4. Penghapusan kategori tidak pernah menghapus produk terkait (non-cascade); produk hanya kehilangan relasi kategorinya.
5. Perubahan data produk oleh admin tidak boleh mengubah data pesanan lama yang sudah terjadi (harga transaksi disimpan sebagai snapshot di order).
6. Ukuran produk bersifat free-form. Admin hanya perlu membuat varian untuk ukuran yang memang dimiliki oleh produk; varian yang sudah dibuat dapat memiliki stok 0 ketika ukuran tersebut habis.
7. Target produk adalah enum tetap (Women/Men/Unisex), bukan data yang bisa di-CRUD.
8. Sistem tidak menyediakan fitur Change Password maupun Forgot Password / Reset Password. Password customer dibuat saat registrasi.
9. Jika Admin menetapkan produk sebagai `Tidak Tersedia`, produk tidak dapat dibeli atau dimasukkan ke keranjang meskipun masih memiliki stok. Stok tidak dihapus dan produk dapat diaktifkan kembali.
10. Review hanya dapat diberikan untuk produk yang benar-benar dibeli oleh customer dalam pesanan yang telah berstatus `Selesai`.

---

## 17. Functional Requirements

Functional Requirements mendefinisikan fungsi dan kemampuan yang harus disediakan oleh sistem untuk memenuhi kebutuhan Customer dan Admin/Owner. Requirements berikut menjadi acuan dalam pengembangan frontend, backend, REST API, dan database.

Tabel berikut merangkum fitur utama yang harus dapat dilakukan oleh masing-masing pengguna dalam sistem.

| Modul | Customer | Admin |
| --- | --- | --- |
| Auth | Register, login: tidak ada Change Password/Forgot Password | Login (username/password) |
| Profil | Lihat & edit username/foto | - |
| Alamat | CRUD alamat | - |
| Katalog | Browse per kategori | CRUD kategori |
| Produk | Lihat detail & varian | CRUD produk, varian, harga, stok |
| Keranjang | Tambah/ubah/hapus item (sementara) | - |
| Checkout | Pilih alamat & metode bayar | - |
| Pembayaran | Konfirmasi pembayaran (simulasi) | - |
| Pesanan | Lihat, batalkan (kondisi tertentu), riwayat | Lihat semua, update status |
| Tracking | Lihat progress pesanan | Update status pesanan |
| Review | Tambah/edit/hapus review | - |
| Customer Data | - | Lihat daftar customer (read-only) |

---

## 18. Non-Functional Requirements

- Kesederhanaan: sistem dijaga sesederhana mungkin, sesuai skala project mahasiswa, tanpa fitur enterprise yang tidak diperlukan.
- Konsistensi data: satu sumber data (database bersama) memastikan perubahan di sisi Admin langsung tercermin di sisi Customer, dan sebaliknya.
- Integritas transaksi: data penting dalam transaksi, seperti harga dan alamat pengiriman yang digunakan saat pembelian, harus tetap konsisten meskipun data produk atau alamat customer berubah setelah transaksi.
- Keamanan dasar: password disimpan ter-hash, autentikasi berbasis session/token, akses Admin Panel terproteksi dari akses publik.
- Performa: cukup untuk skala demo/akademik, tidak dirancang untuk trafik tinggi.
- Usability: alur navigasi sederhana dan mudah dipahami baik oleh customer maupun admin.

---

## 19. Data/Entity Overview (Konseptual)

- Customer - memiliki banyak Address, banyak Order, dan banyak Review.
- Category - memiliki banyak Product; relasi bersifat opsional (produk tetap ada walau kategori dihapus).
- Product - memiliki banyak ProductVariant (ukuran, harga, stok masing-masing).
- Order - milik satu Customer, berisi banyak OrderDetail (merujuk Product + Variant + jumlah + harga saat transaksi), menyimpan snapshot alamat kirim dan metode pembayaran yang dipilih, serta status pesanan.
- Review - menghubungkan Customer, Product, dan Order terkait.
- Admin - entitas tunggal terpisah dari Customer, tanpa relasi role/permission tambahan.

---

## 20. API/Integration Overview (Konseptual)

Satu set REST API digunakan oleh kedua sisi, dengan otorisasi berbeda untuk endpoint publik/customer dan endpoint khusus admin. Secara konseptual, grup API meliputi:

- Auth - registrasi & login customer; login admin (terpisah skemanya).
- Address - CRUD alamat milik customer yang sedang login.
- Catalog - baca kategori & produk (publik), tulis kategori & produk (khusus admin).
- **Checkout & Payment** - endpoint untuk memproses pemilihan alamat, metode pembayaran, dan konfirmasi pembayaran simulasi. Sistem memastikan ketersediaan stok sebelum pesanan dibuat.
- Order - baca & batalkan pesanan (customer); baca semua & update status (admin).
- Review - CRUD review milik customer yang sedang login.

Detail endpoint, request/response, dan skema otorisasi teknis akan ditentukan pada tahap implementasi berikutnya.

---

## 21. Scope Limitations

Fitur berikut tidak termasuk dalam scope sistem ini: multi-vendor marketplace, pendaftaran/manajemen seller lain, search & filter produk (harga/ukuran/target/lainnya), Dashboard Admin, COD, payment gateway nyata, real-time/GPS tracking, live courier map, sistem refund kompleks, complaint/dispute system, change password, multi-admin & role/permission kompleks, inventory/warehouse/supplier management kompleks, price history, product versioning, serta cart sebagai data permanen di database.

---

## 22. Assumptions

- Konfirmasi pembayaran simulasi dianggap selalu berhasil ketika customer menekan tombol konfirmasi (tidak dibahas skenario pembayaran gagal secara mendalam).
- Ketersediaan stok harus divalidasi kembali sebelum pesanan dibuat dan stok dikurangi. Detail mekanisme teknis validasi stok akan ditentukan pada tahap perancangan dan implementasi sistem.
- Autentikasi menggunakan mekanisme session/token sederhana (mis. JWT), tanpa verifikasi email saat registrasi.
- Akun Admin bersifat tunggal dan sudah tersedia sejak awal (pre-seeded), tanpa alur pendaftaran admin baru.
- Mata uang yang digunakan adalah Rupiah (IDR).
- File foto produk/profil disimpan di storage terpisah (lokal/cloud), database hanya menyimpan referensinya.

---

# FINAL ANALISIS DATABASE

## Project Basis Data - Sistem E-Commerce Thrift

> **Status:** FINAL / LOCKED
> 
> 
> **Tahap:** Analisis Struktur Database
> 
> **Sumber:** Final PRD + hasil diskusi dan validasi
> 

---

## 1. Tujuan Database

Database digunakan untuk menyimpan seluruh data utama yang dibutuhkan oleh sistem e-commerce thrift single-seller, meliputi:

- akun customer;
- alamat customer;
- akun admin;
- kategori produk;
- data produk;
- varian produk, ukuran, harga, dan stok;
- pesanan;
- detail barang yang dibeli;
- review produk.

Database harus menjaga integritas data, terutama terhadap data transaksi historis. Data transaksi yang sudah terjadi tidak boleh berubah hanya karena data master seperti produk, harga, atau alamat customer berubah di kemudian hari.

---

# 2. Final Entity / Tabel

Database menggunakan **9 entity utama**:

| No | Entity | Fungsi |
| --- | --- | --- |
| 1 | `customer` | Menyimpan akun pembeli |
| 2 | `address` | Menyimpan alamat milik customer |
| 3 | `admin` | Menyimpan akun admin/pemilik toko |
| 4 | `category` | Menyimpan kategori produk |
| 5 | `product` | Menyimpan informasi umum produk |
| 6 | `product_variant` | Menyimpan ukuran, harga, dan stok produk |
| 7 | `order` | Menyimpan data pesanan |
| 8 | `order_detail` | Menyimpan isi setiap pesanan |
| 9 | `review` | Menyimpan review produk |

Tidak terdapat entity khusus untuk:

- `cart`
- `payment`
- `shipping/ongkir`
- `product_image`
- `price_history`
- `warehouse`
- `supplier`
- `soft_delete`

Hal tersebut sesuai dengan batasan scope PRD.

---

# 3. Final Struktur Attribute

## 3.1 Customer

| Attribute | Keterangan | Nullable |
| --- | --- | --- |
| `customer_id` | ID internal customer | Tidak |
| `username` | Nama tampilan customer | Tidak |
| `email` | Email untuk login | Tidak |
| `password_hash` | Password yang telah di-hash | Tidak |
| `foto_profil` | Path/URL foto profil | Ya |

Constraint:

- PK: `customer_id`
- UNIQUE: `username`
- UNIQUE: `email`

---

## 3.2 Address

| Attribute | Keterangan | Nullable |
| --- | --- | --- |
| `address_id` | ID alamat | Tidak |
| `customer_id` | Pemilik alamat | Tidak |
| `nama_penerima` | Nama penerima | Tidak |
| `nomor_hp` | Nomor HP penerima | Tidak |
| `alamat_lengkap` | Alamat lengkap | Tidak |

Constraint:

- PK: `address_id`
- FK: `customer_id → customer.customer_id`

ON DELETE:

- `CASCADE`

Jika customer dihapus, alamat miliknya ikut dihapus.

---

## 3.3 Admin

| Attribute | Keterangan | Nullable |
| --- | --- | --- |
| `admin_id` | ID admin | Tidak |
| `username` | Username login admin | Tidak |
| `password_hash` | Password yang telah di-hash | Tidak |

Constraint:

- PK: `admin_id`
- UNIQUE: `username`

Admin merupakan entity terpisah dari customer dan sistem hanya menggunakan satu akun admin yang telah disediakan/pre-seeded.

---

## 3.4 Category

| Attribute | Keterangan | Nullable |
| --- | --- | --- |
| `category_id` | ID kategori | Tidak |
| `nama_kategori` | Nama kategori | Tidak |

Constraint:

- PK: `category_id`
- UNIQUE: `nama_kategori`

---

## 3.5 Product

| Attribute | Keterangan | Nullable |
| --- | --- | --- |
| `product_id` | ID produk | Tidak |
| `category_id` | Kategori produk | Ya |
| `nama_produk` | Nama produk | Tidak |
| `target` | `Women`, `Men`, atau `Unisex` | Tidak |
| `deskripsi` | Deskripsi produk | Tidak |
| `foto` | Path/URL foto produk | Tidak |
| `status` | `Tersedia` / `Tidak Tersedia` | Tidak |

Constraint:

- PK: `product_id`
- FK: `category_id → category.category_id`
- `category_id` boleh NULL
- Default status: `Tersedia`

ON DELETE category:

- `SET NULL`

Penghapusan kategori **tidak menghapus produk**. Produk hanya kehilangan hubungan dengan kategori.

### Catatan status produk

`status` hanya digunakan untuk status manual:

- `Tersedia`
- `Tidak Tersedia`

Sedangkan **`Produk Habis` bukan status yang disimpan di database**.

Produk dianggap habis apabila seluruh `product_variant` miliknya memiliki `stok = 0`.

---

# 4.6 Product Variant

| Attribute | Keterangan | Nullable |
| --- | --- | --- |
| `variant_id` | ID variant | Tidak |
| `product_id` | Produk induk | Tidak |
| `ukuran` | Ukuran bebas, misalnya S, M, L, 42, Free Size | Tidak |
| `harga` | Harga variant | Tidak |
| `stok` | Stok variant | Tidak |

Constraint:

- PK: `variant_id`
- FK: `product_id → product.product_id`
- UNIQUE: (`product_id`, `ukuran`)
- CHECK: `harga > 0`
- CHECK: `stok >= 0`

ON DELETE product:

- `CASCADE`

Catatan: CASCADE hanya berarti variant ikut terhapus apabila produk dihapus secara teknis. Produk yang sudah memiliki riwayat transaksi tidak dapat dihapus karena FK dari `order_detail.variant_id` menggunakan `RESTRICT`.

---

# 4.7 Order

| Attribute | Keterangan | Nullable |
| --- | --- | --- |
| `order_id` | ID pesanan | Tidak |
| `customer_id` | Customer pemilik pesanan | Tidak |
| `status` | Status pesanan | Tidak |
| `metode_bayar` | Metode pembayaran | Tidak |
| `total` | Total pesanan | Tidak |
| `nama_penerima_snapshot` | Nama penerima saat checkout | Tidak |
| `nomor_hp_snapshot` | Nomor HP saat checkout | Tidak |
| `alamat_snapshot` | Alamat saat checkout | Tidak |
| `created_at` | Waktu pesanan dibuat | Tidak |

Constraint:

- PK: `order_id`
- FK: `customer_id → customer.customer_id`
- CHECK: `total >= 0`

ON DELETE customer:

- `RESTRICT`

Customer yang memiliki riwayat order tidak dapat dihapus.

### Status Order

Status order yang digunakan:

```
Pesanan Dibuat
        ↓
Pesanan Diproses
        ↓
Dikirim
        ↓
Sudah di Kurir
        ↓
Menuju Rumah/Tempat
        ↓
Selesai
```

Pembatalan:

```
Pesanan Dibuat → Dibatalkan
```

`Dikirim` merupakan **status nyata yang disimpan**, bukan hanya label UI.

Tidak terdapat status `Menunggu Pembayaran`.

### Historical Snapshot

Informasi berikut sengaja disimpan langsung pada `order`:

- `nama_penerima_snapshot`
- `nomor_hp_snapshot`
- `alamat_snapshot`

Tujuannya agar informasi transaksi tetap sama meskipun customer mengubah atau menghapus alamat setelah melakukan pembelian.

---

# 4.8 Order Detail

| Attribute | Keterangan | Nullable |
| --- | --- | --- |
| `order_detail_id` | ID detail | Tidak |
| `order_id` | Pesanan induk | Tidak |
| `variant_id` | Variant yang dibeli | Tidak |
| `jumlah` | Jumlah barang | Tidak |
| `harga_satuan` | Harga saat transaksi | Tidak |

Constraint:

- PK: `order_detail_id`
- FK: `order_id → order.order_id`
- FK: `variant_id → product_variant.variant_id`
- UNIQUE: (`order_id`, `variant_id`)
- CHECK: `jumlah > 0`

ON DELETE:

- `order_id → order`: `CASCADE`
- `variant_id → product_variant`: `RESTRICT`

### Alasan tidak menggunakan `product_id`

`product_id` tidak disimpan di `order_detail` karena produk sudah dapat diketahui melalui:

```
order_detail
    ↓
product_variant
    ↓
product
```

Menambahkan `product_id` akan menyebabkan data redundant dan berpotensi tidak sinkron.

### Historical Price

`harga_satuan` merupakan snapshot harga pada saat transaksi.

Jika harga variant berubah setelah pembelian, harga pada transaksi lama tetap menggunakan `harga_satuan` yang tersimpan di `order_detail`.

---

# 4.9 Review

| Attribute | Keterangan | Nullable |
| --- | --- | --- |
| `review_id` | ID review | Tidak |
| `customer_id` | Customer penulis review | Tidak |
| `product_id` | Produk yang direview | Tidak |
| `order_id` | Order asal pembelian | Tidak |
| `rating` | Nilai rating 1–5 | Tidak |
| `komentar` | Isi review | Tidak |
| `created_at` | Waktu review dibuat | Tidak |

Constraint:

- PK: `review_id`
- FK: `customer_id → customer.customer_id`
- FK: `product_id → product.product_id`
- FK: `order_id → order.order_id`
- UNIQUE: (`order_id`, `product_id`)
- CHECK: `rating BETWEEN 1 AND 5`

ON DELETE:

- `customer_id → customer`: `RESTRICT`
- `product_id → product`: `RESTRICT`
- `order_id → order`: `RESTRICT`

### Validasi Review

UNIQUE (`order_id`, `product_id`) **hanya mencegah review yang sama dibuat dua kali pada order yang sama**.

UNIQUE tersebut tidak memastikan bahwa produk benar-benar dibeli.

Validasi berikut harus dilakukan oleh backend:

1. Customer yang login harus merupakan pemilik order.
2. Order harus memiliki status `Selesai`.
3. `product_id` harus terdapat pada `order_detail` dari order tersebut.
4. Customer belum pernah melakukan review untuk produk tersebut pada order tersebut.

---

# 5. Final Primary Key

| Entity | Primary Key |
| --- | --- |
| `customer` | `customer_id` |
| `address` | `address_id` |
| `admin` | `admin_id` |
| `category` | `category_id` |
| `product` | `product_id` |
| `product_variant` | `variant_id` |
| `order` | `order_id` |
| `order_detail` | `order_detail_id` |
| `review` | `review_id` |

Seluruh entity menggunakan surrogate key sebagai primary key.

---

# 6. Final Foreign Key

| Child | FK | Parent |
| --- | --- | --- |
| `address` | `customer_id` | `customer.customer_id` |
| `product` | `category_id` | `category.category_id` |
| `product_variant` | `product_id` | `product.product_id` |
| `order` | `customer_id` | `customer.customer_id` |
| `order_detail` | `order_id` | `order.order_id` |
| `order_detail` | `variant_id` | `product_variant.variant_id` |
| `review` | `customer_id` | `customer.customer_id` |
| `review` | `product_id` | `product.product_id` |
| `review` | `order_id` | `order.order_id` |

---

# 7. Final Relationship & Cardinality

| Relationship | Cardinality |
| --- | --- |
| customer → address | 1 : N |
| customer → order | 1 : N |
| customer → review | 1 : N |
| category → product | 1 : N |
| product → product_variant | 1 : N |
| order → order_detail | 1 : N |
| product_variant → order_detail | 1 : N |
| order ↔ product_variant | M : N melalui `order_detail` |
| product → review | 1 : N |
| order → review | 1 : N |

### Penjelasan

- Satu customer dapat memiliki banyak address.
- Satu customer dapat membuat banyak order.
- Satu customer dapat membuat banyak review.
- Satu category dapat memiliki banyak product, tetapi product boleh tidak memiliki category.
- Satu product memiliki banyak variant.
- Satu order memiliki satu atau lebih order_detail.
- Satu variant dapat muncul pada banyak order_detail.
- Order dan product_variant memiliki hubungan M:N yang dijembatani `order_detail`.
- Satu product dapat memiliki banyak review.
- Satu order dapat menjadi dasar beberapa review, dengan maksimal satu review untuk setiap product dalam order tersebut.

---

# 8. Final UNIQUE Constraint

| Entity | UNIQUE |
| --- | --- |
| `customer` | `username` |
| `customer` | `email` |
| `admin` | `username` |
| `category` | `nama_kategori` |
| `product_variant` | (`product_id`, `ukuran`) |
| `order_detail` | (`order_id`, `variant_id`) |
| `review` | (`order_id`, `product_id`) |

---

# 9. Final CHECK Constraint

| Entity | Attribute | Aturan |
| --- | --- | --- |
| `product_variant` | `stok` | `>= 0` |
| `product_variant` | `harga` | `> 0` |
| `order_detail` | `jumlah` | `> 0` |
| `order` | `total` | `>= 0` |
| `review` | `rating` | `1–5` |

---

# 10. Nullable

Attribute yang boleh NULL hanya:

```
customer.foto_profil
product.category_id
```

Semua attribute lainnya wajib memiliki nilai.

---

# 11. Business Logic yang Ditangani Backend

Tidak semua aturan bisnis dapat direpresentasikan hanya melalui PK, FK, UNIQUE, atau CHECK.

Aturan berikut harus dijaga oleh backend:

### Review

- Hanya customer pemilik order yang dapat membuat review.
- Order harus berstatus `Selesai`.
- Produk yang direview harus terdapat dalam order tersebut.
- Satu produk hanya dapat direview satu kali untuk order yang sama.

### Order

- Order hanya dibuat setelah pembayaran berhasil.
- Pembatalan hanya dapat dilakukan dari status `Pesanan Dibuat`.
- Perubahan status harus mengikuti urutan yang ditentukan.
- Order tidak boleh melompati status.

### Stock

- Stok harus dicek sebelum checkout.
- Stok tidak boleh menjadi negatif.
- Stok harus dikurangi ketika transaksi berhasil.
- Jika transaksi dibatalkan sesuai aturan sistem, stok dapat dikembalikan.
- Proses perubahan stok harus menggunakan transaction database agar konsisten.

### Product

- Product dengan status `Tidak Tersedia` tidak dapat dibeli.
- Variant dengan stok `0` tidak dapat dipilih.
- `Produk Habis` dihitung dari kondisi seluruh variant memiliki stok `0`.

---

# 12. Normalization

## 1NF

Database memenuhi 1NF karena setiap attribute menyimpan satu nilai dan tidak terdapat repeating group.

Contoh:

`product_variant` memisahkan setiap ukuran menjadi baris tersendiri sehingga ukuran, harga, dan stok dapat dikelola secara individual.

## 2NF

Database memenuhi 2NF karena seluruh entity menggunakan primary key tunggal dan tidak terdapat ketergantungan parsial terhadap sebagian primary key.

## 3NF

Struktur utama memenuhi 3NF, dengan beberapa redundancy yang **sengaja dipertahankan untuk kebutuhan historical data**.

Redundancy tersebut meliputi:

### `order.total`

Total dapat dihitung dari `order_detail`, tetapi tetap disimpan sebagai bagian dari data transaksi.

### Snapshot alamat

`order` menyimpan:

- `nama_penerima_snapshot`
- `nomor_hp_snapshot`
- `alamat_snapshot`

Data tersebut sengaja dipisahkan dari address aktif agar riwayat transaksi tidak berubah.

### `order_detail.harga_satuan`

Harga transaksi disimpan karena harga product_variant dapat berubah setelah transaksi.

### `review.customer_id`

Customer sebenarnya dapat diketahui melalui `order.customer_id`, tetapi `customer_id` tetap disimpan karena review memang merupakan entity yang secara langsung berhubungan dengan customer dan mempermudah pengambilan review milik customer.

Redundancy tersebut diterima karena memiliki tujuan bisnis dan historis yang jelas.

---

# 13. Historical Data Integrity

Prinsip utama database:

> **Data transaksi historis harus tetap konsisten walaupun data master berubah.**
> 

Implementasinya:

### Alamat

```
Customer Address
       ↓ checkout
Order Snapshot
```

Perubahan address setelah checkout tidak mengubah alamat pada order lama.

### Harga

```
Product Variant
       ↓ checkout
Order Detail.harga_satuan
```

Perubahan harga variant tidak mengubah harga transaksi lama.

### Product/Variant

Variant yang sudah pernah digunakan pada `order_detail` tidak dapat dihapus karena FK menggunakan `RESTRICT`.

Jika produk masih memiliki riwayat transaksi, admin menggunakan:

```
status = Tidak Tersedia
```

bukan menghapus data secara paksa.

---

# 14. Konsep Penghapusan Data

### Category

Jika category dihapus:

```
category → product.category_id = NULL
```

Product tetap ada.

### Product

Jika product belum pernah digunakan dalam transaksi:

```
delete product
        ↓
variant ikut terhapus
```

karena `product_variant.product_id` menggunakan `CASCADE`.

Jika product sudah pernah digunakan dalam transaksi:

```
product
   ↓
product_variant
   ↓
order_detail
```

`order_detail.variant_id` menggunakan `RESTRICT`, sehingga penghapusan akan ditolak.

Admin kemudian menggunakan:

```
status = Tidak Tersedia
```

### Order

Order tidak dihapus melalui fitur aplikasi karena merupakan historical transaction.

### Review

Review tidak dihapus melalui cascade dari order/product/customer karena review merupakan bagian dari data historis dan memiliki FK `RESTRICT`.

---

# 15. Konsep Produk Habis

`Produk Habis` bukan attribute dan bukan status yang disimpan.

Kondisinya:

```
Jika semua product_variant.stok = 0
        ↓
Produk dianggap "Produk Habis"
```

Contoh:

```
Product: Vintage Jacket

Variant S → stok 0
Variant M → stok 0
Variant L → stok 0

→ Produk Habis
```

Jika salah satu variant kembali memiliki stok:

```
Variant M → stok 2

→ Produk tidak lagi dianggap habis
```

Dengan cara ini tidak terdapat risiko status `Produk Habis` tidak sinkron dengan stok sebenarnya.

---

# 16. Final Scope Database

### Termasuk

- Customer authentication data
- Customer profile
- Customer address
- Admin authentication
- Category
- Product
- Product variant
- Price per variant
- Stock per variant
- Order
- Order detail
- Payment method
- Order status
- Historical shipping information
- Product review
- Rating
- Historical transaction price

### Tidak termasuk

- Permanent cart
- Payment gateway nyata
- Payment transaction entity
- COD
- Ongkir
- GPS/live courier tracking
- Multi-vendor
- Multi-admin
- Supplier
- Warehouse
- Complex inventory system
- Price history
- Product versioning
- Complaint/dispute system
- Complex refund system
- Search/filter system
- Admin dashboard
- Product image gallery

---

# 17. Final Status

Struktur database dinyatakan:

> **READY FOR ERD**
> 

Struktur yang telah dikunci:

```
9 Entity
↓
PK
↓
FK
↓
Relationship
↓
Cardinality
↓
UNIQUE
↓
CHECK
↓
Nullable
↓
Historical Integrity
↓
Backend Business Rules
```

ERD harus dibuat berdasarkan struktur final ini tanpa menambah atau mengurangi entity maupun attribute.

**SQL/DDL belum dibuat sampai ERD selesai dan disetujui.**