/**
 * Register Page Component
 * Rebuilt based on UI-REFERENCE/register_archive_01/code.html using Tailwind CSS.
 * Preserves: AuthContext integration, validation, password toggle, matching, loading state, error handling, navigation.
 */
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const REGISTER_HERO_IMAGE = "/images/register-background.webp";

function Register() {
  const { register, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  useEffect(() => {
    usernameRef.current?.focus();
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username wajib diisi';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email wajib diisi';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Format email tidak valid';
    }

    if (!formData.password) {
      newErrors.password = 'Password wajib diisi';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password harus minimal 8 karakter';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Konfirmasi password wajib diisi';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Password harus cocok';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    const result = await register(
      formData.username.trim(),
      formData.email.trim(),
      formData.password
    );

    if (result.success) {
      setTimeout(() => {
        navigate('/');
      }, 800);
    } else {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = (field) => {
    if (field === 'password') {
      setShowPassword(!showPassword);
      setTimeout(() => passwordRef.current?.focus(), 0);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
      setTimeout(() => confirmPasswordRef.current?.focus(), 0);
    }
  };

  const validatePasswordMatch = () => {
    const pw = formData.password;
    const confirmPw = formData.confirmPassword;

    if (!confirmPw) {
      return { valid: true, label: 'MUST MATCH', class: 'font-mono text-caption text-secondary uppercase' };
    }
    if (pw === confirmPw) {
      return { valid: true, label: 'MATCH CONFIRMED', class: 'font-mono text-caption text-primary uppercase font-semibold' };
    }
    return { valid: false, label: 'MISMATCH', class: 'font-mono text-caption text-error uppercase font-semibold' };
  };

  const matchState = validatePasswordMatch();
  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface font-body">
      <main className="flex-1">
        <div className="w-full max-w-[1340px] mx-auto py-[0.5rem] sm:py-[1rem]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-[1rem] lg:gap-[2.5rem] items-stretch">
            <div className="lg:col-span-5 flex flex-col justify-between bg-surface-container-low p-[1rem] sm:p-[1.5rem] relative overflow-hidden">
              <div className="flex justify-between items-baseline z-10">
                <span className="font-mono text-[0.6875rem] text-secondary tracking-widest uppercase">SPECIMEN // 084</span>
                <span className="font-mono text-[0.75rem] text-on-surface uppercase">COLLECTION NO. 14</span>
              </div>
              <div className="relative my-[1rem] aspect-[3/4] w-full overflow-hidden bg-surface-variant flex items-center justify-center">
                <img
                  className="w-full h-full object-cover grayscale contrast-125 hover:scale-105 transition-transform duration-700 ease-out"
                  alt="Editorial close-up of a structured archival Japanese distressed wool coat"
                  src={REGISTER_HERO_IMAGE}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent" />
                <div className="absolute bottom-[1rem] left-[1rem] right-[1rem] flex justify-between items-end text-surface">
                  <div>
                    <p className="font-mono text-[0.6875rem] tracking-widest uppercase">CONDITION: DEADSTOCK</p>
                    <p className="font-heading text-[clamp(1.25rem,2.5vw,1.75rem)] text-surface uppercase tracking-tight">RESTORED &amp; CATALOGED</p>
                  </div>
                  <span className="font-mono text-[0.75rem] text-surface">Y2K / RUNWAY</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 flex flex-col justify-center px-0 sm:px-[1rem] lg:px-[1.5rem] py-[0.5rem] sm:py-[1rem]">
              <div className="mb-[1.5rem]">
                <div className="inline-flex items-center gap-[0.25rem] mb-[0.25rem]">
                  <span className="w-[8px] h-[8px] bg-primary" />
                  <span className="font-mono text-[0.6875rem] text-secondary uppercase tracking-widest">ARCHIVE CLIENT INGESTION</span>
                </div>
                <h1 className="font-heading text-[clamp(1.5rem,3vw,2.25rem)] text-primary uppercase tracking-tight mb-[0.25rem]">
                  CREATE ACCOUNT
                </h1>
                <p className="font-body text-base text-on-surface-variant max-w-xl">
                  Begin cataloging your personal collection and acquisitions. Register to preserve selected sizes, reserve unreleased drops, and review condition histories.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-[1.5rem]">

                <div className="flex flex-col space-y-[0.25rem] group">
                  <div className="flex justify-between items-center">
                    <label htmlFor="username" className="font-mono text-[0.6875rem] text-primary uppercase tracking-wider">
                      USERNAME <span className="text-error">*</span>
                    </label>
                    <span className="font-mono text-[0.75rem] text-secondary uppercase">Unique Identifier</span>
                  </div>
                  <div className={`relative bg-surface-container-low focus-within:bg-surface-container-lowest transition-colors ${errors.username ? 'focus-within:ring-1 focus-within:ring-error' : ''}`}>
                    <input
                      autoComplete="username"
                      className="w-full bg-transparent px-[0.5rem] py-[0.5rem] font-body text-base text-on-surface placeholder:text-outline outline-none transition-all"
                      id="username"
                      name="username"
                      placeholder="e.g. aryapratama"
                      required
                      type="text"
                      value={formData.username}
                      onChange={handleChange}
                      ref={usernameRef}
                      aria-invalid={errors.username ? true : false}
                    />
                    <div className="h-[0.5px] w-full bg-surface-variant group-focus-within:bg-primary transition-colors" />
                  </div>
                  {errors.username && (
                    <p className="font-mono text-[0.6875rem] text-error uppercase mt-[0.25rem]" role="alert">
                      {errors.username}
                    </p>
                  )}
                </div>

                <div className="flex flex-col space-y-[0.25rem] group">
                  <div className="flex justify-between items-center">
                    <label htmlFor="email" className="font-mono text-[0.6875rem] text-primary uppercase tracking-wider">
                      EMAIL ADDRESS <span className="text-error">*</span>
                    </label>
                    <span className="font-mono text-[0.75rem] text-secondary uppercase">Verification &amp; Invoices</span>
                  </div>
                  <div className={`relative bg-surface-container-low focus-within:bg-surface-container-lowest transition-colors ${errors.email ? 'focus-within:ring-1 focus-within:ring-error' : ''}`}>
                    <input
                      autoComplete="email"
                      className="w-full bg-transparent px-[0.5rem] py-[0.5rem] font-body text-base text-on-surface placeholder:text-outline outline-none transition-all"
                      id="email"
                      name="email"
                      placeholder="e.g. arya@archive01.studio"
                      required
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      ref={emailRef}
                      aria-invalid={errors.email ? true : false}
                    />
                    <div className="h-[0.5px] w-full bg-surface-variant group-focus-within:bg-primary transition-colors" />
                  </div>
                  {errors.email && (
                    <p className="font-mono text-[0.6875rem] text-error uppercase mt-[0.25rem]" role="alert">
                      {errors.email}
                    </p>
                  )}
                </div>
                <div className="flex flex-col space-y-[0.25rem] group">
                  <div className="flex justify-between items-center">
                    <label htmlFor="password" className="font-mono text-[0.6875rem] text-primary uppercase tracking-wider">
                      PASSWORD <span className="text-error">*</span>
                    </label>
                    <span className="font-mono text-[0.75rem] text-secondary uppercase">Kunci Akses</span>
                  </div>
                  <div className={`relative bg-surface-container-low focus-within:bg-surface-container-lowest transition-colors ${errors.password ? 'focus-within:ring-1 focus-within:ring-error' : ''}`}>
                    <input
                      autoComplete="new-password"
                      className="w-full bg-transparent px-[0.5rem] py-[0.5rem] font-body text-base text-on-surface placeholder:text-outline outline-none transition-all pr-[2.5rem]"
                      id="password"
                      name="password"
                      placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢"
                      required
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={handleChange}
                      ref={passwordRef}
                      aria-invalid={errors.password ? true : false}
                    />
                    <button
                      type="button"
                      className="absolute right-[0.5rem] top-[0.5rem] font-mono text-[0.6875rem] text-secondary hover:text-primary uppercase px-[0.25rem] py-1 select-none transition-colors"
                      id="toggle-password-btn"
                      onClick={() => togglePasswordVisibility('password')}
                      aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                      aria-pressed={showPassword}
                      disabled={isSubmitting || authLoading}
                    >
                      {showPassword ? 'HIDE' : 'SHOW'}
                    </button>
                    <div className="h-[0.5px] w-full bg-surface-variant group-focus-within:bg-primary transition-colors" />
                  </div>
                  {errors.password && (
                    <p className="font-mono text-[0.6875rem] text-error uppercase mt-[0.25rem]" role="alert">
                      {errors.password}
                    </p>
                  )}
                </div>
                <div className="flex flex-col space-y-[0.25rem] group">
                  <div className="flex justify-between items-center">
                    <label htmlFor="confirmPassword" className="font-mono text-[0.6875rem] text-primary uppercase tracking-wider">
                      KONFIRMASI PASSWORD <span className="text-error">*</span>
                    </label>
                    <span className="font-mono text-[0.75rem] text-secondary uppercase">Verifikasi Ulang</span>
                  </div>
                  <div className={`relative bg-surface-container-low focus-within:bg-surface-container-lowest transition-colors ${errors.confirmPassword ? 'focus-within:ring-1 focus-within:ring-error' : ''}`}>
                    <input
                      autoComplete="new-password"
                      className="w-full bg-transparent px-[0.5rem] py-[0.5rem] font-body text-base text-on-surface placeholder:text-outline outline-none transition-all pr-[2.5rem]"
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢"
                      required
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      ref={confirmPasswordRef}
                      aria-invalid={errors.confirmPassword ? true : false}
                    />
                    <button
                      type="button"
                      className="absolute right-[0.5rem] top-[0.5rem] font-mono text-[0.6875rem] text-secondary hover:text-primary uppercase px-[0.25rem] py-1 select-none transition-colors"
                      id="toggle-confirm-password-btn"
                      onClick={() => togglePasswordVisibility('confirmPassword')}
                      aria-label={showConfirmPassword ? 'Sembunyikan konfirmasi password' : 'Tampilkan konfirmasi password'}
                      aria-pressed={showConfirmPassword}
                      disabled={isSubmitting || authLoading}
                    >
                      {showConfirmPassword ? 'HIDE' : 'SHOW'}
                    </button>
                    <div className="h-[0.5px] w-full bg-surface-variant group-focus-within:bg-primary transition-colors" />
                  </div>
                  {errors.confirmPassword && (
                    <p className="font-mono text-[0.6875rem] text-error uppercase mt-[0.25rem]" role="alert">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-[0.25rem] pt-[0.25rem]">
                  <span className="material-symbols-outlined text-sm text-secondary">check_circle</span>
                  <span className="font-body text-sm text-secondary">
                    Must contain alphanumeric characters with no spaces.
                  </span>
                </div>

                <div className="flex items-center gap-[0.25rem] pt-[0.25rem]">
                  <span className={`material-symbols-outlined text-sm ${matchState.class.includes('text-primary') ? 'text-primary' : matchState.class.includes('text-error') ? 'text-error' : 'text-secondary'}`}>
                    {matchState.label === 'MATCH CONFIRMED' ? 'check_circle' : matchState.label === 'MISMATCH' ? 'error' : 'help'}
                  </span>
                  <span className={`font-mono text-[0.6875rem] uppercase ${matchState.class.includes('text-primary') ? 'font-semibold' : ''}`}>
                    {matchState.label}
                  </span>
                </div>

                <div className="pt-[0.25rem] space-y-[1rem]">
                  <button
                    type="submit"
                    className="w-full h-[52px] bg-primary text-surface font-mono text-[0.6875rem] uppercase tracking-widest flex items-center justify-center hover:bg-neutral-800 active:scale-[0.99] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    id="submit-btn"
                    disabled={isSubmitting || authLoading}
                  >
                    <span id="btn-text" className="">
                      {isSubmitting || authLoading ? 'INITIALIZING PROFILE...' : 'CREATE ACCOUNT'}
                    </span>
                    <span className={`material-symbols-outlined text-base animate-spin ml-[0.25rem] ${(isSubmitting || authLoading) ? '' : 'hidden'}`} id="btn-spinner">
                      progress_activity
                    </span>
                  </button>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-[0.25rem] pt-[0.25rem]">
                    <Link to="/login" className="font-mono text-[0.6875rem] text-primary hover:text-secondary uppercase transition-colors flex items-center gap-1 group">
                      <span>ALREADY HAVE AN ACCOUNT?</span>
                      <span className="underline font-semibold group-hover:text-secondary">LOG IN &rarr;</span>
                    </Link>
                    <a href="/" className="font-mono text-[0.6875rem] text-secondary hover:text-primary uppercase transition-colors" data-path="catalog">
                      &larr; CONTINUE BROWSING
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      <footer className="w-full bg-surface py-[1.5rem] mt-auto">
        <div className="max-w-[1440px] mx-auto px-[1rem] sm:flex-row items-center justify-between gap-[0.25rem] flex flex-col">
          <p className="font-mono text-[0.6875rem] text-secondary uppercase">© 2024 ARCHIVE / 01. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-[1rem]">
            <a href="/" className="font-mono text-[0.6875rem] text-secondary hover:text-on-surface transition-colors uppercase">TERMS</a>
            <a href="/" className="font-mono text-[0.6875rem] text-secondary hover:text-on-surface transition-colors uppercase">PRIVACY</a>
            <span className="font-mono text-[0.6875rem] text-outline-variant uppercase">INDEX / V2.04</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Register;