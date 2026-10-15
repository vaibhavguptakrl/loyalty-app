import React, { useState } from 'react';
import { useApp } from '../context/AppContext.tsx';

const AADHAAR_FRONT_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCwilFGTmpCFaEqSqhbgUmIPjCjD2xNsX_3FO9CBHB4uLoR52kxPaNnhS7WpYxJfLlGH81lz4tJW1-VM8vfCQjEkwqGWjQoToqF49M-M-mdP_hOt4XhXhUf329egAoLQwuq2eed_VWrIUhLHYankoXPZHzjXS2I6Su-ldKgzPnLPw5GnJVUdTB3ixSWJSTLmPwdXQJ8Mi5GXBZ8e3_FkscJf7boB7_mMakaho2rxr8HTOVxG9rqi5qG';

const AADHAAR_BACK_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDjD_1BTaV37KYBTJLzhf8XEsZEdTrF6KajtJ3ADgpkMZO8kt8mfoCds63mz-6Z79oj06AEzh5aMIjOdvdJSccCPrDa1UwQdI03LxqWo4AijFYiNNH2QmgdDz2pU38TYL9UkJ0BzSNoGtqtaWbpzEK_0ahEhLS8H-hHPOz-SgQdXLqEG3Qab_W3j-hyT0-N-Hn6KcS9jiuESSFjKGcCqqM6N8JgMHrDFetmw0izNiGdhtLK8zVobdue';

const SELFIE_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDSCW-UTDVSjOEht0L8eaXFIs_tHz9VCu6FlIhFmQ_Lfsv3b-Id9M1VuaisVS8U_7GoKE6Vp91VWVUC1e3MicSaoRchykBPSoJdv60Ywb0mXeQFKVAmo7NjW9AxrO7nBeHjyg5P496de5dbz-vcLQ9tNGNk3PnxPfFOQonpi25nutJvVVuaKVJeZEEu1huxYrEoZ2G0gntmnGpYoYc3pOQIu95av3Ge1uBN1A5THOWUfnyohVMCaqvX';

export const KycScreen: React.FC = () => {
  const { language, setLanguage, profile, completeKyc, setActiveTab } = useApp();

  const [bioActive, setBioActive] = useState<boolean>(profile.biometricEnabled ?? true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [generatedCode, setGeneratedCode] = useState<string>('KRL-PLUMB-4821');

  const handleToggleBio = () => {
    setBioActive((prev) => !prev);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setTimeout(async () => {
      const code = await completeKyc('Rajesh Sharma', '+91 98290 44219', 'rajesh.plumb@gmail.com');
      setGeneratedCode(code || 'KRL-PLUMB-4821');
      setIsSubmitting(false);
      setShowSuccessModal(true);
    }, 1200);
  };

  const handleGoToDashboard = () => {
    setShowSuccessModal(false);
    setActiveTab('rewards');
  };

  return (
    <div className="flex flex-col w-full pb-8 max-w-lg mx-auto">
      {/* Language Switcher & Step Indicator Tracker */}
      <div className="flex items-center justify-between mb-4 pt-1">
        <div className="flex items-center gap-1.5 bg-[#eae7e7] dark:bg-[#2d2825] px-2 py-1 rounded-full shadow-sm">
          <button
            type="button"
            onClick={() => setLanguage('en')}
            className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold transition-all duration-200 cursor-pointer ${
              language === 'en'
                ? 'bg-[#964407] text-white shadow-sm'
                : 'text-[#554339] dark:text-[#d5c4ba] hover:text-[#1b1b1c]'
            }`}
          >
            English
          </button>
          <button
            type="button"
            onClick={() => setLanguage('hi')}
            className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold transition-all duration-200 cursor-pointer ${
              language === 'hi'
                ? 'bg-[#964407] text-white shadow-sm'
                : 'text-[#554339] dark:text-[#d5c4ba] hover:text-[#1b1b1c]'
            }`}
          >
            हिन्दी
          </button>
        </div>

        {/* Step Badge */}
        <div className="flex items-center gap-1.5 bg-[#ffdea6] text-[#271900] px-3 py-1 rounded-full shadow-sm">
          <span
            className="material-symbols-outlined text-[16px] text-[#7b5800]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            verified
          </span>
          <span className="text-[12px] font-bold">
            {language === 'hi' ? 'चरण २ / २: सत्यापन' : 'Step 2 of 2: KYC'}
          </span>
        </div>
      </div>

      {/* Header Banner & Location Identity Card */}
      <div className="relative overflow-hidden rounded-xl bg-white dark:bg-[#1c1816] p-4 mb-5 shadow-sm border border-[#eae7e7]/60 dark:border-[#2d2825]">
        <div className="absolute -right-4 -bottom-4 w-28 h-28 rounded-full bg-[#ffdbca]/20 pointer-events-none blur-2xl" />

        <div className="flex items-start gap-3">
          <div className="w-11 h-11 rounded-xl bg-[#b65c21] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
            <span className="material-symbols-outlined text-[26px]">badge</span>
          </div>

          <div className="flex flex-col min-w-0">
            <h2 className="text-[18px] font-bold text-[#1b1b1c] dark:text-[#f5eeea] tracking-tight leading-snug">
              {language === 'hi'
                ? 'कारीगर / प्लम्बर पंजीकरण'
                : 'Plumber & Contractor Registration'}
            </h2>
            <p className="text-[12px] text-[#887368] dark:text-[#9e8a7f] mt-1 leading-relaxed">
              {language === 'hi'
                ? 'शिव एजेंसी, भूदरा बाज़ार, करौली — तुरंत ऑटोमेटेड केवाईसी एवं विशिष्ट सदस्य कोड प्राप्त करें।'
                : 'Shiv Agency, Bhoodara Bazar, Karauli — Submit documents for instant automated KYC & unique member code.'}
            </p>
          </div>
        </div>

        {/* Progress Step Bar Visual */}
        <div className="mt-4 pt-3 flex flex-col gap-1.5 border-t border-[#eae7e7]/60 dark:border-[#2d2825]">
          <div className="flex justify-between items-center text-[10px] font-bold text-[#554339] dark:text-[#d5c4ba]">
            <span className="flex items-center gap-1">
              1. Basic Profile
              <span className="material-symbols-outlined text-[13px] text-[#39654e] dark:text-[#5fa581]" style={{ fontVariationSettings: "'FILL' 1" }}>
                check
              </span>
            </span>
            <span className="text-[#964407] dark:text-[#e07937] font-bold">2. Instant AI KYC</span>
          </div>
          <div className="w-full bg-[#e5e2e1] dark:bg-[#2d2825] h-2 rounded-full overflow-hidden">
            <div className="bg-[#964407] h-full rounded-full transition-all duration-500 w-full" />
          </div>
        </div>
      </div>

      {/* Section 1: Contact Details */}
      <div className="flex flex-col gap-3 mb-5">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#964407]" />
            <span className="text-[16px] font-bold text-[#1b1b1c] dark:text-[#f5eeea]">
              {language === 'hi' ? '१. संपर्क एवं व्यापार विवरण' : '1. Contact & Trade Details'}
            </span>
          </div>
          <span className="text-[10px] bg-[#517e66]/20 text-[#234f3a] dark:text-[#bdeed0] px-2 py-0.5 rounded-full font-bold">
            Pre-filled
          </span>
        </div>

        <div className="bg-white dark:bg-[#1c1816] rounded-xl p-4 shadow-sm flex flex-col gap-3.5 border border-[#eae7e7]/60 dark:border-[#2d2825]">
          {/* Full Name */}
          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-baseline">
              <label className="text-[12px] font-bold text-[#1b1b1c] dark:text-[#f5eeea]">
                {language === 'hi' ? 'पूरा नाम (आधार के अनुसार)' : 'Full Name (As per Aadhaar)'}
              </label>
              <span className="text-[11px] text-[#887368] dark:text-[#9e8a7f] font-semibold">
                नाम
              </span>
            </div>
            <div className="flex items-center gap-2.5 px-3.5 h-12 bg-[#f6f3f2] dark:bg-[#24201d] rounded-xl">
              <span className="material-symbols-outlined text-[20px] text-[#887368]">person</span>
              <input
                className="w-full bg-transparent text-[14px] text-[#1b1b1c] dark:text-[#f5eeea] font-semibold focus:outline-none cursor-default"
                readOnly
                type="text"
                value="Rajesh Sharma"
              />
              <span
                className="material-symbols-outlined text-[18px] text-[#39654e] dark:text-[#5fa581]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                check_circle
              </span>
            </div>
          </div>

          {/* WhatsApp Number */}
          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-baseline">
              <label className="text-[12px] font-bold text-[#1b1b1c] dark:text-[#f5eeea]">
                {language === 'hi' ? 'व्हाट्सएप नंबर' : 'WhatsApp Number'}
              </label>
              <span className="text-[11px] text-[#887368] dark:text-[#9e8a7f] font-semibold">
                +91 राजस्थान
              </span>
            </div>
            <div className="flex items-center gap-2.5 px-3.5 h-12 bg-[#f6f3f2] dark:bg-[#24201d] rounded-xl">
              <span className="material-symbols-outlined text-[20px] text-[#39654e] dark:text-[#5fa581]">
                chat
              </span>
              <span className="text-[14px] font-semibold text-[#1b1b1c] dark:text-[#f5eeea] flex-1 tracking-wider">
                +91 98290 44219
              </span>
              <span className="bg-[#bdeed0] text-[#002113] text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-sm">
                <span
                  className="material-symbols-outlined text-[13px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  bolt
                </span>
                Active
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-0.5 px-1">
              <span className="material-symbols-outlined text-[14px] text-[#887368]">
                notifications_active
              </span>
              <p className="text-[11px] text-[#887368] dark:text-[#9e8a7f] leading-snug">
                {language === 'hi'
                  ? 'पॉइंट्स व मासिक स्कीम सूचना इसी नंबर पर भेजी जाएगी।'
                  : 'Scheme points & monthly brass rewards will be notified here.'}
              </p>
            </div>
          </div>

          {/* Email ID */}
          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-baseline">
              <label className="text-[12px] font-bold text-[#1b1b1c] dark:text-[#f5eeea]">
                {language === 'hi' ? 'ईमेल आईडी' : 'Email ID'}
              </label>
              <span className="text-[11px] text-[#887368] dark:text-[#9e8a7f] font-semibold">
                वैकल्पिक
              </span>
            </div>
            <div className="flex items-center gap-2.5 px-3.5 h-12 bg-[#f6f3f2] dark:bg-[#24201d] rounded-xl">
              <span className="material-symbols-outlined text-[20px] text-[#887368]">mail</span>
              <input
                className="w-full bg-transparent text-[14px] text-[#1b1b1c] dark:text-[#f5eeea] focus:outline-none cursor-default"
                readOnly
                type="email"
                value="rajesh.plumb@gmail.com"
              />
              <span
                className="material-symbols-outlined text-[18px] text-[#39654e] dark:text-[#5fa581]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                check_circle
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Automated AI KYC Check */}
      <div className="flex flex-col gap-3 mb-5">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#964407]" />
            <span className="text-[16px] font-bold text-[#1b1b1c] dark:text-[#f5eeea]">
              {language === 'hi'
                ? '२. स्वचालित एआई दस्तावेज़ सत्यापन'
                : '2. Automated AI KYC Verification'}
            </span>
          </div>
          <span className="text-[11px] bg-[#bdeed0] text-[#002113] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5">
            <span
              className="material-symbols-outlined text-[13px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              check
            </span>
            3/3 Done
          </span>
        </div>

        {/* Aadhaar Verification Card */}
        <div className="bg-white dark:bg-[#1c1816] rounded-xl p-3.5 shadow-sm flex flex-col gap-2.5 border border-[#eae7e7]/60 dark:border-[#2d2825]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#f0eded] dark:bg-[#2d2825] flex items-center justify-center text-[#964407] dark:text-[#e07937] flex-shrink-0">
                <span className="material-symbols-outlined text-[22px]">fingerprint</span>
              </div>
              <div className="flex flex-col min-w-0">
                <h4 className="text-[14px] font-bold text-[#1b1b1c] dark:text-[#f5eeea] leading-snug">
                  {language === 'hi'
                    ? 'आधार कार्ड (आगे व पीछे)'
                    : 'Aadhaar Card (Front & Back)'}
                </h4>
                <span className="text-[12px] text-[#887368] dark:text-[#9e8a7f]">
                  UIDAI: XXXX XXXX 8912
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1 bg-[#517e66] text-white px-2.5 py-1 rounded-full shadow-sm flex-shrink-0">
              <span
                className="material-symbols-outlined text-[14px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                verified
              </span>
              <span className="text-[10px] font-bold">Verified</span>
            </div>
          </div>

          {/* Scanned Thumbnails Previews */}
          <div className="grid grid-cols-2 gap-2 mt-1">
            <div className="relative rounded-lg overflow-hidden h-20 bg-[#f0eded] dark:bg-[#2d2825] flex flex-col justify-end p-2 shadow-sm border border-neutral-200 dark:border-neutral-700">
              <img
                alt="Aadhaar Front View"
                className="absolute inset-0 w-full h-full object-cover opacity-90"
                src={AADHAAR_FRONT_IMG}
              />
              <div className="relative z-10 bg-[#303030]/85 backdrop-blur-sm px-2 py-0.5 rounded text-white text-[10px] font-bold w-fit flex items-center gap-1">
                <span className="material-symbols-outlined text-[11px] text-[#bdeed0]">check</span>
                Front Side
              </div>
            </div>

            <div className="relative rounded-lg overflow-hidden h-20 bg-[#f0eded] dark:bg-[#2d2825] flex flex-col justify-end p-2 shadow-sm border border-neutral-200 dark:border-neutral-700">
              <img
                alt="Aadhaar Back View"
                className="absolute inset-0 w-full h-full object-cover opacity-90"
                src={AADHAAR_BACK_IMG}
              />
              <div className="relative z-10 bg-[#303030]/85 backdrop-blur-sm px-2 py-0.5 rounded text-white text-[10px] font-bold w-fit flex items-center gap-1">
                <span className="material-symbols-outlined text-[11px] text-[#bdeed0]">check</span>
                Back Side
              </div>
            </div>
          </div>
        </div>

        {/* PAN Card Card */}
        <div className="bg-white dark:bg-[#1c1816] rounded-xl p-3.5 shadow-sm flex flex-col gap-2.5 border border-[#eae7e7]/60 dark:border-[#2d2825]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#f0eded] dark:bg-[#2d2825] flex items-center justify-center text-[#964407] dark:text-[#e07937] flex-shrink-0">
                <span className="material-symbols-outlined text-[22px]">credit_card</span>
              </div>
              <div className="flex flex-col min-w-0">
                <h4 className="text-[14px] font-bold text-[#1b1b1c] dark:text-[#f5eeea] leading-snug">
                  {language === 'hi' ? 'पैन कार्ड' : 'PAN Card'}
                </h4>
                <span className="text-[13px] font-mono font-bold text-[#964407] dark:text-[#e07937]">
                  ABCPS1234F
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1 bg-[#517e66] text-white px-2.5 py-1 rounded-full shadow-sm flex-shrink-0">
              <span
                className="material-symbols-outlined text-[14px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                verified
              </span>
              <span className="text-[10px] font-bold">PAN Verified</span>
            </div>
          </div>

          <div className="flex items-center justify-between bg-[#f6f3f2] dark:bg-[#24201d] px-3 py-2 rounded-lg">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-[#39654e] dark:text-[#5fa581]">
                task_alt
              </span>
              <span className="text-[12px] font-bold text-[#1b1b1c] dark:text-[#f5eeea]">
                Income Tax Dept Database Match
              </span>
            </div>
            <span className="text-[10px] font-semibold text-[#887368] dark:text-[#9e8a7f]">
              Instant OCR
            </span>
          </div>
        </div>

        {/* Contractor Live Selfie Card */}
        <div className="bg-white dark:bg-[#1c1816] rounded-xl p-3.5 shadow-sm flex flex-col gap-3 border border-[#eae7e7]/60 dark:border-[#2d2825]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#f0eded] dark:bg-[#2d2825] flex items-center justify-center text-[#964407] dark:text-[#e07937] flex-shrink-0">
                <span className="material-symbols-outlined text-[22px]">face</span>
              </div>
              <div className="flex flex-col min-w-0">
                <h4 className="text-[14px] font-bold text-[#1b1b1c] dark:text-[#f5eeea] leading-snug">
                  {language === 'hi' ? 'कारीगर लाइव सेल्फी' : 'Contractor Live Selfie'}
                </h4>
                <span className="text-[11px] text-[#887368] dark:text-[#9e8a7f]">
                  Liveness check passed
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1 bg-[#bdeed0] text-[#002113] px-2.5 py-1 rounded-full shadow-sm flex-shrink-0">
              <span
                className="material-symbols-outlined text-[14px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                check_circle
              </span>
              <span className="text-[10px] font-bold">Matched 99.4%</span>
            </div>
          </div>

          <div className="flex items-center gap-3.5 bg-[#f6f3f2] dark:bg-[#24201d] p-2.5 rounded-xl">
            <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 shadow-sm bg-white border border-neutral-300">
              <img
                alt="Contractor Live Selfie"
                className="w-full h-full object-cover"
                src={SELFIE_IMG}
              />
              <div className="absolute bottom-0 inset-x-0 bg-[#39654e]/95 text-white text-[9px] font-bold text-center py-0.5">
                MATCHED
              </div>
            </div>

            <div className="flex flex-col min-w-0">
              <p className="text-[12px] text-[#1b1b1c] dark:text-[#f5eeea] font-semibold leading-snug">
                {language === 'hi'
                  ? 'चेहरे का आधार फोटो से पूर्ण मिलान सफल'
                  : 'Face matched with Aadhaar ID photo'}
              </p>
              <span className="text-[11px] text-[#887368] dark:text-[#9e8a7f] mt-0.5">
                Geotag: Bhoodara Bazar, Karauli (26.49°N, 77.02°E)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: Security & App Lock */}
      <div className="flex flex-col gap-3 mb-5">
        <div className="flex items-center gap-2 px-1">
          <span className="w-2 h-2 rounded-full bg-[#964407]" />
          <span className="text-[16px] font-bold text-[#1b1b1c] dark:text-[#f5eeea]">
            {language === 'hi' ? '३. सुरक्षा एवं बायोमेट्रिक लॉक' : '3. Security & App Lock'}
          </span>
        </div>

        <div className="bg-white dark:bg-[#1c1816] rounded-xl p-4 shadow-sm flex items-center justify-between border border-[#eae7e7]/60 dark:border-[#2d2825]">
          <div className="flex items-center gap-3 min-w-0 pr-2">
            <div className="w-10 h-10 rounded-xl bg-[#ffdea6] text-[#271900] flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-[22px]">fingerprint</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[14px] font-bold text-[#1b1b1c] dark:text-[#f5eeea] leading-tight">
                {language === 'hi'
                  ? 'फिंगरप्रिंट / बायोमेट्रिक लॉक चालू करें'
                  : 'Enable Fingerprint / Biometric Lock'}
              </span>
              <span className="text-[11px] text-[#887368] dark:text-[#9e8a7f] mt-0.5">
                {language === 'hi'
                  ? 'वॉलेट बैलेंस और कूपन सुरक्षित रखें'
                  : 'Protect wallet balance & scanned coupons'}
              </span>
            </div>
          </div>

          {/* Interactive Switch Toggle */}
          <button
            type="button"
            aria-pressed={bioActive}
            onClick={handleToggleBio}
            className={`w-13 h-7 rounded-full relative p-0.5 flex items-center transition-colors duration-200 cursor-pointer shadow-sm flex-shrink-0 ${
              bioActive ? 'bg-[#964407]' : 'bg-[#e5e2e1] dark:bg-[#38322e]'
            }`}
          >
            <div
              className={`w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-200 flex items-center justify-center ${
                bioActive ? 'translate-x-6' : 'translate-x-0'
              }`}
            >
              {bioActive && (
                <span
                  className="material-symbols-outlined text-[14px] text-[#964407]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check
                </span>
              )}
            </div>
          </button>
        </div>
      </div>

      {/* Section 4: Submission Status Box */}
      <div className="rounded-xl bg-[#fdc34d]/25 p-4 mb-6 shadow-sm flex flex-col gap-2 relative overflow-hidden border border-[#fdc34d]/40">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#fdc34d] text-[#715000] flex items-center justify-center flex-shrink-0 shadow-sm mt-0.5">
            <span
              className="material-symbols-outlined text-[20px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              info
            </span>
          </div>
          <div className="flex flex-col">
            <h4 className="text-[14px] font-bold text-[#1b1b1c] dark:text-[#f5eeea]">
              {language === 'hi' ? 'विशिष्ट प्लम्बर कोड निर्माण' : 'Unique Plumber Code Generation'}
            </h4>
            <p className="text-[12px] text-[#554339] dark:text-[#d5c4ba] mt-0.5 leading-relaxed">
              {language === 'hi' ? (
                <>
                  सबमिट करते ही आपका यूनिक कोड (उदा.{' '}
                  <span className="font-bold text-[#964407] dark:text-[#e07937]">KRL-PLUMB-4821</span>) बन जाएगा और आपके व्हाट्सएप पर तुरंत भेज दिया जाएगा।
                </>
              ) : (
                <>
                  Upon submission, your Unique Plumber Code (e.g.{' '}
                  <span className="font-bold text-[#964407] dark:text-[#e07937]">KRL-PLUMB-4821</span>) will be instantly generated and dispatched to your registered WhatsApp number for billing discounts at Shiv Agency counter.
                </>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* CTA Button Container */}
      <div className="flex flex-col gap-2">
        <button
          type="button"
          disabled={isSubmitting}
          onClick={handleSubmit}
          className="w-full h-12 rounded-xl bg-[#964407] hover:bg-[#b65c21] active:scale-[0.99] text-white font-bold text-[15px] shadow-md flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <span className="material-symbols-outlined animate-spin text-[22px]">
                progress_activity
              </span>
              <span>Generating Code...</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-[22px]">how_to_reg</span>
              <span>
                {language === 'hi'
                  ? 'पंजीकरण पूरा करें और कोड प्राप्त करें'
                  : 'Complete Registration & Get Code'}
              </span>
            </>
          )}
        </button>

        <p className="text-[11px] text-[#887368] dark:text-[#9e8a7f] text-center mt-1">
          {language === 'hi'
            ? 'शिव एजेंसी अधिकृत व्यापार भागीदार • करौली'
            : 'Shiv Agency Authorized Trade Partner • Karauli'}
        </p>
      </div>

      {/* Success Modal Overlay */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white dark:bg-[#1c1816] rounded-2xl p-5 shadow-2xl flex flex-col items-center text-center border border-neutral-200 dark:border-neutral-800">
            <div className="w-16 h-16 rounded-full bg-[#bdeed0] text-[#002113] flex items-center justify-center mb-3 shadow-md">
              <span
                className="material-symbols-outlined text-[36px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                verified
              </span>
            </div>

            <h3 className="text-[20px] font-bold text-[#1b1b1c] dark:text-[#f5eeea]">
              Registration Complete!
            </h3>
            <p className="text-[12px] text-[#887368] dark:text-[#9e8a7f] mt-1">
              Your official member code has been assigned:
            </p>

            <div className="my-4 px-4 py-3 bg-[#ffdea6] text-[#271900] rounded-xl w-full flex items-center justify-between shadow-sm border border-[#fdc34d]">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#7b5800]">
                Member Code
              </span>
              <span className="text-[20px] font-extrabold text-[#1b1b1c] tracking-wider">
                {generatedCode}
              </span>
            </div>

            <div className="flex items-center gap-2 text-[#39654e] dark:text-[#5fa581] text-[12px] font-semibold mb-4">
              <span className="material-symbols-outlined text-[18px]">mark_chat_read</span>
              <span>Notification sent to WhatsApp (+91 98290 44219)</span>
            </div>

            <button
              type="button"
              onClick={handleGoToDashboard}
              className="w-full h-11 bg-[#964407] hover:bg-[#b65c21] text-white font-bold text-[14px] rounded-xl shadow cursor-pointer transition-colors"
            >
              Go to Member Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
