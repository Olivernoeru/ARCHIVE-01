/**
 * Home Page Component (Implementation)
 * Halaman publik ARCHIVE / 01 berdasarkan desain Stitch.
 * Diakses tanpa login, data produk dari API backend.
 */
import React, { useState, useEffect } from 'react';
import api from '../services/api';
import ProductCard from '../components/ProductCard.jsx';
import BottomNav from '../components/BottomNav.jsx';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.request('/products');
        if (response.success) {
          setProducts(response.data || []);
        } else {
          setError(response.message || 'Gagal memuat produk');
        }
      } catch (err) {
        setError('Terjadi kesalahan jaringan. Silakan coba lagi.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const justDropped = products.slice(0, 4);
  const vault = products.slice(4, 8);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-surface text-on-surface">
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block w-8 h-8 rounded-full bg-primary mb-space-md animate-pulse" />
            <p className="font-label-mono text-label-mono text-secondary uppercase">MEMUAT ARKIB...</p>
          </div>
        </main>
        <BottomNav />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-surface text-on-surface">
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="font-label-mono text-label-mono text-error uppercase mb-space-sm">{error}</p>
            <button
              onClick={() => {
                setLoading(true);
                setError(null);
                window.location.reload();
              }}
              className="font-label-mono text-label-mono text-primary hover:text-secondary underline underline-offset-4"
            >
              COBA LAGI
            </button>
          </div>
        </main>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface">
      <header className="fixed top-0 left-0 right-0 z-40 bg-surface/85 backdrop-blur-xl border-b border-surface-container-highest/60">
        <div className="h-16 max-w-[1440px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop flex items-center justify-between">
          <div className="flex items-center gap-space-md">
            <span className="font-headline-sm text-headline-sm uppercase tracking-tight text-primary">ARCHIVE / 01</span>
            <span className="hidden sm:inline-block font-label-caps text-label-caps text-secondary tracking-widest pl-space-sm border-l border-outline-variant/50">EDITION 2025 // CURATED ARCHIVE</span>
          </div>
          <div className="flex items-center gap-space-md" />
        </div>
      </header>
      <main className="flex-1 pt-16 pb-space-xxl bg-surface min-h-screen flex flex-col">
        <section className="w-full max-w-[1440px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop pt-8 pb-space-xxl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg lg:gap-gutter-desktop items-center">
            <div className="lg:col-span-6 flex flex-col justify-between h-full pr-0 lg:pr-space-xl">
              <div className="flex flex-col gap-space-xs">
                <div className="flex items-center gap-space-sm mb-space-md">
                  <span className="inline-block w-2 h-2 rounded-full bg-primary" />
                  <span className="font-label-mono text-label-mono text-on-surface-variant uppercase tracking-wider">CURATED ARCHIVE</span>
                  <span className="text-outline-variant font-label-mono text-label-mono">{'//'}</span>
                  <span className="font-label-mono text-label-mono text-secondary uppercase tracking-wider">PRELOVED SELECTION</span>
                </div>
                <h1 className="font-display-hero text-display-hero uppercase tracking-tight text-primary leading-none">
                  ARCHIVE<br className="hidden sm:inline" /> / 01
                </h1>
              </div>
              <div className="my-space-xl flex flex-col gap-space-md">
                <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed max-w-lg">
                  Curated vintage garments, archival silhouettes, and selected one-of-one preloved pieces. Restored, verified, and cataloged for the contemporary wardrobe.
                </p>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-space-xs">
                  <span className="font-label-caps text-label-caps text-secondary uppercase tracking-widest">[ CURATED PIECES ]</span>
                  <span className="font-label-caps text-label-caps text-secondary uppercase tracking-widest">[ ONE-OF-A-KIND ]</span>
                </div>
              </div>
              <div className="pt-space-md">
                <div className="grid grid-cols-3 gap-space-md">
                  <div className="flex flex-col">
                    <span className="font-label-mono text-label-mono text-outline uppercase">SELECTION</span>
                    <span className="font-headline-sm text-headline-sm text-primary mt-0.5">CURATED</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-mono text-label-mono text-outline uppercase">EDITION</span>
                    <span className="font-headline-sm text-headline-sm text-primary mt-0.5">2025</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-mono text-label-mono text-outline uppercase">ARCHIVE</span>
                    <span className="font-headline-sm text-headline-sm text-primary mt-0.5">INDEPENDENT</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-12 gap-space-md mt-space-md lg:mt-0">
              <div className="sm:col-span-8 group relative aspect-[3/4] overflow-hidden bg-surface-container rounded-sm shadow-md">
                <img className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" src="/images/home-product-01.webp" alt="Editorial fashion portrait" loading="lazy" />
                <div className="absolute bottom-3 left-3 bg-surface/90 backdrop-blur-md px-2.5 py-1 rounded-sm">
                  <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase">CATALOGUE // LOOK 01</span>
                </div>
              </div>
              <div className="sm:col-span-4 flex flex-col gap-space-md">
                <div className="relative aspect-[3/4] overflow-hidden bg-surface-container-high rounded-sm shadow-sm group">
                  <img className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" src="/images/home-product-02.webp" alt="Macro texture detail" loading="lazy" />
                  <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
                  <div className="absolute top-3 right-3 bg-surface/90 backdrop-blur-md px-2 py-0.5 rounded-sm">
                    <span className="font-label-mono text-[10px] text-secondary uppercase tracking-tight">MACRO TEXTURE</span>
                  </div>
                </div>
                <div className="p-4 bg-surface-container-low rounded-sm flex flex-col justify-between flex-grow">
                  <div className="flex flex-col gap-1">
                    <span className="font-label-caps text-[10px] text-secondary uppercase tracking-widest">CURATOR NOTES</span>
                    <p className="font-body-sm text-body-sm text-on-surface-variant leading-snug">Selected garments chosen for distinctive character, unique textile patina, and enduring silhouette quality.</p>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="font-label-mono text-label-mono text-primary font-semibold">JAKARTA / TOKYO</span>
                    <span className="material-symbols-outlined text-[16px] text-secondary">check_circle</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full bg-surface-container-low/60 py-space-xl">
          <div className="max-w-[1440px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop flex flex-col gap-space-lg">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-space-sm pb-space-sm">
              <div className="flex flex-col gap-space-xs">
                <span className="font-label-caps text-label-caps text-secondary uppercase tracking-widest">LATEST CATALOGUE</span>
                <h2 className="font-headline-lg text-headline-lg uppercase tracking-tight text-primary">JUST DROPPED</h2>
              </div>
              <p className="font-label-mono text-label-mono text-on-surface-variant max-w-sm sm:text-right uppercase">NEW PIECES CATALOGED — ARCHIVAL &amp; PRELOVED FINDS</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter-desktop">
              {justDropped.length > 0 ? (
                justDropped.map((product) => (<ProductCard key={product.product_id} product={product} />))
              ) : (
                <p className="font-label-mono text-label-mono text-secondary uppercase col-span-full text-center">TIDAK ADA PRODUK TERSEDIA</p>
              )}
            </div>
          </div>
        </section>
        <section className="w-full bg-surface-container-highest/40 py-space-xxl">
          <div className="max-w-[1080px] mx-auto px-margin md:px-margin-tablet text-center flex flex-col items-center gap-space-md">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-outline-variant" />
              <span className="font-label-caps text-label-caps text-secondary uppercase tracking-widest">EDITORIAL PERSPECTIVE</span>
              <span className="h-px w-10 bg-outline-variant" />
            </div>
            <blockquote className="font-headline-lg text-headline-lg uppercase tracking-tight text-primary leading-tight max-w-3xl">"Every garment has an origin. We curate authentic preloved garments for those who value individuality over mass production."</blockquote>
            <div className="flex items-center gap-space-lg pt-space-sm">
              <div className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[18px] text-primary">checkroom</span><span className="font-label-mono text-label-mono text-on-surface-variant uppercase">Preloved Selection</span></div>
              <div className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[18px] text-primary">auto_awesome</span><span className="font-label-mono text-label-mono text-on-surface-variant uppercase">One-of-a-Kind</span></div>
              <div className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[18px] text-primary">history_edu</span><span className="font-label-mono text-label-mono text-on-surface-variant uppercase">Archival Silhouettes</span></div>
            </div>
          </div>
        </section>
        <section className="w-full max-w-[1440px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop py-space-xxl flex flex-col gap-space-lg">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-space-sm pb-space-sm">
            <div className="flex flex-col gap-space-xs">
              <span className="font-label-caps text-label-caps text-secondary uppercase tracking-widest">PERMANENT CATALOGUE</span>
              <h2 className="font-headline-lg text-headline-lg uppercase tracking-tight text-primary">CURATED SELECTION // VAULT</h2>
            </div>
            <span className="font-label-mono text-label-mono text-secondary uppercase tracking-wider">BATCH 2025.04 • 04 AVAILABLE</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter-desktop">
            {vault.length > 0 ? (
              vault.map((product) => (<ProductCard key={product.product_id} product={product} />))
            ) : (
              <p className="font-label-mono text-label-mono text-secondary uppercase col-span-full text-center">TIDAK ADA PRODUK TERSEDIA</p>
            )}
          </div>
        </section>
        <section className="w-full max-w-[1440px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop pt-space-xl pb-32">
          <div className="bg-surface-container-high/60 p-space-lg rounded-sm flex flex-col md:flex-row items-center justify-between gap-space-md text-center md:text-left">
            <div className="flex flex-col gap-1">
              <span className="font-label-caps text-label-caps text-secondary uppercase tracking-widest">ARCHIVE NOTICE</span>
              <p className="font-body-md text-body-md text-primary font-medium">ARCHIVE / 01 — ALL PIECES ARE PRELOVED AND ONE-OF-A-KIND.</p>
            </div>
            <div className="flex items-center gap-space-md shrink-0">
              <span className="font-label-mono text-label-mono text-on-surface-variant">JAKARTA • GMT+7</span>
            </div>
          </div>
        </section>
        <BottomNav />
      </main>
    </div>
  );
}

export default Home;