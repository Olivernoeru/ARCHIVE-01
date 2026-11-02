/**
 * Login Page Component
 * Rebuilt based on UI-REFERENCE/login_archive_01/code.html using Tailwind CSS.
 * Preserves: AuthContext integration, validation, password toggle, loading state, error handling, navigation.
 */
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LOGIN_HERO_IMAGE = "/images/login-background.webp";

function ErrorIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

function Login() {
  const { login, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email wajib diisi';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Format email tidak valid';
    }

    if (!formData.password) {
      newErrors.password = 'Password wajib diisi';
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

    const result = await login(formData.email.trim(), formData.password);

    if (result.success) {
      setTimeout(() => {
        navigate('/');
      }, 800);
    } else {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    setTimeout(() => passwordRef.current?.focus(), 0);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.target.name === 'password') {
      handleSubmit(e);
    }
  };

  const btnClass = `w-full h-14 bg-primary text-on-primary font-heading text-[clamp(1\.25rem,2\.5vw,1\.75rem)] uppercase tracking-wider rounded-lg shadow-md transition-all duration-200 flex items-center justify-center gap-space-xs disabled:opacity-50 disabled:cursor-not-allowed ${(isSubmitting || authLoading) ? 'hover:bg-inverse-surface hover:shadow-xl active:scale-[0.99]' : ''}`;

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface">
      <main className="flex-1">
        <div className="max-w-[1440px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-[1rem] lg:gap-[4rem] items-stretch">
          {/* LEFT PANEL: Visual Storytelling & Archival Specimen Showcase */}
          <div className="lg:col-span-7 flex flex-col justify-between relative bg-surface-container-low rounded-xl overflow-hidden min-h-[580px] lg:min-h-[780px] shadow-sm mt-[1rem] lg:mt-[2rem]" aria-hidden="true">
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out hover:scale-105" style={{ backgroundImage: `url(${LOGIN_HERO_IMAGE})` }} />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-primary/10" />
            <div className="relative z-10 p-[1rem] md:p-[1.5rem] flex items-center justify-between">
              <div className="inline-flex items-center gap-[0.25rem] bg-surface/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm">
                <span className="w-[6px] h-[6px] rounded-full bg-primary animate-pulse" />
                <span className="font-mono text-[0.6875rem] text-primary tracking-widest uppercase">SPECIMEN NO. 042 // SS03</span>
              </div>
              <span className="font-mono text-[0.6875rem] text-surface/80 tracking-widest uppercase hidden sm:inline-block">AUTHENTICATED PROVENANCE</span>
            </div>
            <div className="relative z-10 px-[1rem] md:px-[1.5rem] mt-auto mb-[1.5rem]">
              <p className="font-mono text-[0.6875rem] text-surface-container-high/90 uppercase tracking-widest mb-[0.25rem]">COLLECTION 01 / ARCHIVAL SPECIMEN</p>
              <h2 className="font-heading text-[clamp(3rem,8vw,6rem)] text-surface leading-none tracking-tight">PRESERVED<br />SILHOUETTES.</h2>
            </div>
            <div className="relative z-10 p-[1rem] md:p-[1.5rem] bg-primary-container/[0.85] backdrop-blur-xl text-surface">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-[0.25rem] pb-[0.5rem]">
                <div>
                  <span className="font-mono text-[0.6875rem] text-secondary-fixed tracking-wider uppercase block">CURRENT EXHIBIT</span>
                  <p className="font-heading text-[clamp(1.5rem,3vw,2.25rem)] text-surface tracking-tight">Raw Edge Cropped Washed Canvas Jacket</p>
                </div>
                <div className="text-left sm:text-right">
                  <span className="font-mono text-[0.6875rem] text-surface-variant block uppercase">GRADE: A // GENTLY PRESERVED</span>
                  <span className="font-mono text-[0.6875rem] text-surface block uppercase">PARIS ARCHIVE / 2003</span>
                </div>
              </div>
              <div className="w-full flex items-center gap-1 pt-[0.25rem]">
                <div className="h-1 flex-1 bg-surface rounded-full" />
                <div className="h-1 flex-1 bg-surface rounded-full" />
                <div className="h-1 flex-1 bg-surface rounded-full" />
                <div className="h-1 flex-1 bg-surface/20 rounded-full" />
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: Authentication Form */}
          <div className="lg:col-span-5 flex flex-col justify-center py-[1rem] lg:py-[2.5rem]">
            <div className="w-full max-w-[440px] mx-auto flex flex-col">
              {/* Form Title Header */}
              <div className="mb-[1.5rem]">
                <div className="flex items-center justify-between mb-[0.25rem]">
                  <span className="font-mono text-[0.6875rem] text-secondary tracking-widest uppercase">SYSTEM ENTRANCE</span>
                  <span className="font-mono text-[0.75rem] text-secondary">LOC / 01-A</span>
                </div>
                <h1 className="font-heading text-[clamp(1.5rem,3vw,2.25rem)] text-on-surface tracking-tight uppercase">SIGN IN</h1>
                <p className="font-body text-base text-on-surface-variant mt-[0.25rem]">
                  Access your curated bag, order progression, and saved pieces.
                </p>
              </div>

              {/* Authentication Form */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-[1.5rem]">
                {/* Name Field (Hidden by default) */}
                <div className="hidden flex-col gap-[0.25rem]" id="field-fullname">
                  <div className="flex justify-between items-baseline">
                    <label htmlFor="reg-fullname" className="font-mono text-[0.6875rem] text-on-surface uppercase">Full Name</label>
                    <span className="font-mono text-[0.75rem] text-secondary uppercase">LEGAL ID</span>
                  </div>
                  <div className="relative bg-surface-container rounded-lg p-[0.5rem] shadow-inner transition-colors focus-within:bg-surface-container-lowest">
                    <input
                      autoComplete="name"
                      className="w-full bg-transparent font-body text-base text-on-surface placeholder:text-outline-variant outline-none"
                      id="reg-fullname"
                      name="fullname"
                      placeholder="Julian Thorne"
                      type="text"
                    />
                  </div>
                </div>

                {/* Email Input */}
                <div className="flex flex-col gap-[0.25rem]">
                  <div className="flex justify-between items-baseline">
                    <label htmlFor="auth-email" className="font-mono text-[0.6875rem] text-on-surface uppercase tracking-wider">Email Address</label>
                    <span className="font-mono text-[0.75rem] text-secondary uppercase">IDENTIFIER</span>
                  </div>
                  <div className={`relative bg-surface-container rounded-lg p-[0.5rem] shadow-inner transition-all duration-200 focus-within:bg-surface-container-lowest focus-within:shadow-md ${errors.email ? 'focus-within:ring-1 focus-within:ring-error' : ''}`}>
                    <input
                      autoComplete="email"
                      className="w-full bg-transparent font-body text-base text-on-surface placeholder:text-outline-variant outline-none"
                      id="auth-email"
                      name="email"
                      placeholder="client@archive01.com"
                      required
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      ref={emailRef}
                      aria-invalid={errors.email ? true : false}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                  </div>
                  {errors.email && (
                    <p id="email-error" className="font-mono text-[0.6875rem] text-error uppercase mt-[0.25rem]" role="alert">
                      <ErrorIcon /> {errors.email}
                    </p>
                  )}
                </div>

                {/* Password Input with Editorial Visibility Toggle */}
                <div className="flex flex-col gap-[0.25rem]">
                  <div className="flex justify-between items-baseline">
                    <label htmlFor="auth-password" className="font-mono text-[0.6875rem] text-on-surface uppercase tracking-wider">Access Key / Password</label>
                    
                  </div>
                  <div className={`relative bg-surface-container rounded-lg p-[0.5rem] shadow-inner flex items-center transition-all duration-200 focus-within:bg-surface-container-lowest focus-within:shadow-md ${errors.password ? 'focus-within:ring-1 focus-within:ring-error' : ''}`}>
                    <input
                      autoComplete="current-password"
                      className="w-full bg-transparent font-body text-base text-on-surface placeholder:text-outline-variant outline-none pr-[1rem]"
                      id="auth-password"
                      name="password"
                      placeholder="••••••••••••"
                      required
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={handleChange}
                      ref={passwordRef}
                      onKeyDown={handleKeyDown}
                      aria-invalid={errors.password ? true : false}
                      aria-describedby={errors.password ? 'password-error' : undefined}
                    />
                    <button
                      type="button"
                      className="font-mono text-[0.6875rem] text-secondary hover:text-primary uppercase px-[0.25rem] py-1 select-none transition-colors"
                      id="toggle-password-btn"
                      onClick={togglePasswordVisibility}
                      aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                      aria-pressed={showPassword}
                      disabled={isSubmitting || authLoading}
                    >
                      {showPassword ? 'HIDE' : 'SHOW'}
                    </button>
                  </div>
                  {errors.password && (
                    <p id="password-error" className="font-mono text-[0.6875rem] text-error uppercase mt-[0.25rem]" role="alert">
                      <ErrorIcon /> {errors.password}
                    </p>
                  )}
                </div>

                {/* Action Submission */}
                <div className="flex flex-col gap-[0.5rem] pt-[0.25rem]">
                  <button
                    type="submit"
                    className={btnClass}
                    id="submit-cta"
                    disabled={isSubmitting || authLoading}
                    aria-busy={isSubmitting || authLoading}
                  >
                    <span id="cta-label" className="">
                      {isSubmitting || authLoading ? 'AUTHENTICATING...' : 'LOG IN'}
                    </span>
                    {isSubmitting || authLoading ? (
                      <span className="material-symbols-outlined text-[18px] animate-pulse">done</span>
                    ) : (
                      <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    )}
                  </button>

                  {/* Mode Switch: Sign In <-> Create Account */}
                  <div className="text-center mt-[0.5rem]">
                    <p className="font-body text-base text-secondary" id="toggle-account-text">
                      Don&rsquo;t have an account?{' '}
                      <Link to="/register" className="font-mono text-[0.75rem] text-primary font-semibold underline underline-offset-4 hover:text-secondary uppercase ml-1">
                        Create account
                      </Link>
                    </p>
                  </div>
                </div>
              </form>

              {/* Unrestricted Guest Return Navigation */}
              <div className="mt-[2.5rem] pt-[1.5rem] flex flex-col items-center gap-[0.5rem]">
                <Link to="/" className="font-mono text-[0.75rem] text-secondary hover:text-on-surface transition-colors flex items-center gap-[0.25rem] uppercase tracking-wider" aria-label="Kembali ke beranda">
                  <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                  Continue browsing
                </Link>
                <span className="font-mono text-[0.6875rem] text-outline-variant uppercase">ENTRY NODE // ENCRYPTED AUTH 256-BIT</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Page Footer */}
      <footer className="w-full bg-surface py-[1.5rem]">
        <div className="max-w-[1440px] mx-auto px-[1rem] sm:flex-row items-center justify-between gap-[0.25rem] flex flex-col">
          <p className="font-mono text-[0.6875rem] text-secondary uppercase">© 2024 ARCHIVE / 01. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-[1rem]">
            <a href="/" className="font-mono text-[0.6875rem] text-secondary hover:text-on-surface transition-colors uppercase" data-path="terms">TERMS</a>
            <a href="/" className="font-mono text-[0.6875rem] text-secondary hover:text-on-surface transition-colors uppercase" data-path="privacy">PRIVACY</a>
            <span className="font-mono text-[0.6875rem] text-outline-variant uppercase">INDEX / V2.04</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Login;
