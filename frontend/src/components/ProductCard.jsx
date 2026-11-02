/**
 * ProductCard - Kartu produk untuk halaman Home.
 * Tampilkan gambar, kategori, nama produk, ukuran, dan harga.
 * Status: NORMAL / LAST PIECE / SOLD OUT.
 */
import React from 'react';

const formatRupiah = (angka) => {
  if (!angka) return '-';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(angka);
};

function ProductCard({ product, onClick }) {
  const variants = product.variants || [];
  const firstVariant = variants[0];
  const isSoldOut = product.status === 'Tidak Tersedia' ||
    (variants.length > 0 && variants.every((v) => v.stok === 0));
  const isLastPiece = !isSoldOut &&
    variants.length > 0 &&
    variants.reduce((sum, v) => sum + v.stok, 0) === 1;

  const categoryLabel = `${product.category_name || ''} // ${product.target || ''}`.replace(/^\/\/|\/\/$/, '').trim();
  const sizeText = firstVariant ? `Size ${firstVariant.ukuran}` : '-';
  const priceText = firstVariant ? formatRupiah(firstVariant.harga) : '-';

  return (
    <article
      onClick={onClick}
      className={`group flex flex-col cursor-pointer bg-surface p-2.5 rounded-sm shadow-sm transition-shadow duration-300 ${isSoldOut ? 'cursor-not-allowed opacity-70 grayscale' : 'hover:shadow-md'}`}
    >
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-surface-container rounded-sm">
        {!isSoldOut && (
          <div className="absolute top-2.5 left-2.5 bg-surface/90 backdrop-blur-md px-2 py-0.5 rounded-sm shadow-sm">
            <span className="font-label-caps text-[10px] text-primary tracking-widest uppercase">
              {categoryLabel || 'CATALOGUE'}
            </span>
          </div>
        )}
        <img
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          src={product.foto || 'https://via.placeholder.com/300x400'}
          alt={product.nama_produk || 'Produk'}
          loading="lazy"
        />
        {!isSoldOut && isLastPiece && (
          <div className="absolute top-2.5 left-2.5 bg-secondary-container/90 backdrop-blur-md px-2 py-0.5 rounded-sm shadow-sm">
            <span className="font-label-caps text-[10px] text-on-secondary-container tracking-widest uppercase font-semibold">
              LAST PIECE
            </span>
          </div>
        )}
        {!isSoldOut && (
          <button
            aria-label="Add to saved artifacts"
            className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-surface/80 backdrop-blur-md flex items-center justify-center text-primary hover:bg-surface transition-colors shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">favorite</span>
          </button>
        )}
        {isSoldOut && (
          <div className="absolute inset-0 flex items-center justify-center bg-inverse-surface/40">
            <div className="bg-primary text-on-primary px-3 py-1.5 shadow-md">
              <span className="font-label-caps text-[10px] tracking-widest uppercase font-semibold">
                ARCHIVE SOLD
              </span>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col pt-space-sm gap-1">
        <span className="font-label-caps text-[10px] text-secondary tracking-widest uppercase">
          {categoryLabel || 'CATALOGUE'}
        </span>
        <h3
          className={`font-headline-sm text-[15px] leading-snug line-clamp-1 ${isSoldOut ? 'text-secondary' : 'text-primary font-medium group-hover:text-secondary transition-colors'}`}
        >
          {product.nama_produk || 'Produk'}
        </h3>
        <div className="flex items-center justify-between pt-1">
          <span className={`font-label-mono text-label-mono ${isSoldOut ? 'text-outline' : 'text-on-surface-variant'}`}>
            {sizeText}
          </span>
          <span
            className={`font-label-mono text-label-mono text-primary font-semibold ${isSoldOut ? 'text-outline line-through' : ''}`}
          >
            {priceText}
          </span>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;