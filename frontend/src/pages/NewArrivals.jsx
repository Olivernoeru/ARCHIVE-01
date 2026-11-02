/**
 * NewArrivals Page - Halaman produk baru (Just Dropped).
 * Reproduksi visual dari UI-REFERANCE/new_arrivals_archive_01/code.html.
 * Data produk dari API backend dengan sort=newest, limit=12, includeVariants=true.
 */
import React, { useState, useEffect } from 'react';
import api from '../services/api';
import NewArrivalCard from '../components/NewArrivalCard.jsx';
import BottomNav from '../components/BottomNav.jsx';

function NewArrivals() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.request('/products?sort=newest&limit=12&includeVariants=true');
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

  const cluster1 = products.slice(0, 2);
  const cluster2 = products.slice(2, 5);
  const cluster3 = products.slice(5);

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

  const renderCluster1 = () => {
    if (cluster1.length === 0) return null;
    return (
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-x-gutter-desktop gap-y-space-xl items-start">
        {cluster1[0] && (
          <article className="lg:col-span-8 group flex flex-col cursor-pointer">
            <NewArrivalCard product={cluster1[0]} aspectRatio="4/5 md:aspect-[16/13] lg:aspect-[4/3]" />
          </article>
        )}
        {cluster1[1] && (
          <article className="lg:col-span-4 lg:col-start-9 group flex flex-col cursor-pointer">
            <NewArrivalCard product={cluster1[1]} aspectRatio="3/4" />
          </article>
        )}
      </section>
    );
  };

  const renderCluster2 = () => {
    if (cluster2.length === 0) return null;
    return (
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-y-space-xl">
        {cluster2.map((product) => (
          <article key={product.product_id} className="group flex flex-col cursor-pointer">
            <NewArrivalCard product={product} aspectRatio="3/4" />
          </article>
        ))}
      </section>
    );
  };

  const renderCluster3 = () => {
    if (cluster3.length === 0) return null;
    return (
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter-desktop">
        {cluster3.map((product) => (
          <article key={product.product_id} className="group flex flex-col cursor-pointer">
            <NewArrivalCard product={product} aspectRatio="3/4" />
          </article>
        ))}
      </section>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface">
      <main className="flex-1 flex flex-col bg-surface min-h-screen">
        <header className="pt-space-xl pb-space-xl flex flex-col px-margin md:px-margin-tablet lg:px-margin-desktop">
          <div className="flex items-center gap-space-sm mb-space-xs text-left">
            <span className="inline-block w-1.5 h-1.5 bg-primary" />
            <span className="font-label-caps text-label-caps text-secondary uppercase tracking-widest">
              COLLECTION DISCOVERY // CATALOGUE
            </span>
          </div>
          <h1 className="font-headline-lg text-headline-lg md:font-display-hero md:text-display-hero text-primary tracking-tight uppercase text-left">
            JUST DROPPED // NEW ARRIVALS
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-space-sm text-left">
            New pieces recently added to the archive.
          </p>
        </header>

        <div className="flex flex-col gap-y-space-xxl mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop">
          {renderCluster1()}
          {renderCluster2()}
          {renderCluster3()}
        </div>

        <div className="mt-space-xxl pb-32 flex flex-col items-center justify-center text-center mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop">
          <span className="font-label-caps text-label-caps text-secondary uppercase tracking-widest">
            ARCHIVE / 01 — PRELOVED GARMENTS • ONE-OF-ONE • ALL ARTIFACTS FINAL SALE • © 2025
          </span>
          <div className="w-8 h-[1px] bg-secondary/30 mt-space-sm" />
        </div>
      </main>
      <BottomNav />
    </div>
  );
}

export default NewArrivals;