/**
 * NewArrivalCard - Kartu produk editorial untuk halaman New Arrivals.
 * Reproduksi visual dari UI-REFERANCE/new_arrivals_archive_01/code.html.
 * Tampilkan gambar, kategori/target, nama produk, ukuran, dan harga.
 * Status: NORMAL / LAST PIECE / SOLD OUT.
 * Heart toggle: local state only, no persistence.
 */
import React, { useState } from 'react';

const formatRupiah = (angka) => {
  if (!angka) return '-';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(angka);
};

function NewArrivalCard({ product, aspectRatio = '3/4' }) {
  const variants = product.variants || [];
  // Order by variant_id ASC (database insertion order)
  const orderedVariants = [...variants].sort((a, b) => a.variant_id - b.variant_id);

  // First available variant (stok > 0), fall back to first variant if all are 0
  const availableVariant = orderedVariants.find((v) => v.stok > 0);
  const displayVariant = availableVariant || orderedVariants[0];

  const isSoldOut =
    product.status === 'Tidak Tersedia' ||
    (orderedVariants.length > 0 && orderedVariants.every((v) => v.stok === 0));

  const isLastPiece =
    !isSoldOut &&
    orderedVariants.length > 0 &&
    orderedVariants.reduce((sum, v) => sum + v.stok, 0) === 1;

  const categoryLabel = `${product.category_name || ''} // ${product.target || ''}`.replace(/^\/\/|\/\/$/, '').trim();
  const sizeText = displayVariant ? `Size ${displayVariant.ukuran}` : '-';
  const priceText = displayVariant ? formatRupiah(displayVariant.harga) : '-';

  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleHeartClick = (e) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  return (
    <article
      className={`group flex flex-col cursor-pointer bg-surface p-2.5 rounded-sm shadow-sm transition-shadow duration-300 ${isSoldOut ? 'cursor-not-allowed opacity-70 grayscale' : 'hover:shadow-md'}`}
    >
      <div className={`relative w-full aspect-[${aspectRatio}] overflow-hidden bg-surface-container rounded-sm`}>
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
            onClick={handleHeartClick}
            className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-surface/80 backdrop-blur-md flex items-center justify-center text-primary hover:bg-surface transition-colors shadow-sm"
            type="button"
          >
            <span className={`material-symbols-outlined text-[18px] ${isWishlisted ? 'text-primary' : 'text-secondary'}`}>
              favorite
            </span>
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
        <h2
          className={`font-headline-sm text-[15px] leading-snug line-clamp-1 ${isSoldOut ? 'text-secondary' : 'text-primary font-medium group-hover:text-secondary transition-colors'}`}
        >
          {product.nama_produk || 'Produk'}
        </h2>
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

export default NewArrivalCard;