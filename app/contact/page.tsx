'use client';

import { useState } from 'react';
import Banner from "../components/Banner";
import address from "@/public/address.svg";
import phone from "@/public/phone.svg";
import hours from "@/public/hours.svg";
import Image from "next/image";
import Guarantees from "../components/Guarantees";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [submitError, setSubmitError] = useState('');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateField = (name: string, value: string): string => {
    const val = value.trim();
    if (!val) {
      // Capitalize field name for output
      const fieldDisplay = name === 'email' ? 'Email address' : name.charAt(0).toUpperCase() + name.slice(1);
      return `${fieldDisplay} is required.`;
    }

    if (name === 'name') {
      if (val.length < 2) return 'Name must be at least 2 characters.';
      if (val.length > 100) return 'Name must be 100 characters or less.';
    }

    if (name === 'email') {
      if (!emailRegex.test(val)) return 'Please enter a valid email address.';
    }

    if (name === 'subject') {
      if (val.length < 5) return 'Subject must be at least 5 characters.';
      if (val.length > 200) return 'Subject must be 200 characters or less.';
    }

    if (name === 'message') {
      if (val.length < 10) return 'Message must be at least 10 characters.';
      if (val.length > 2000) return 'Message must be 2000 characters or less.';
    }

    return '';
  };

  const handleBlur = (fieldName: string) => {
    setTouched(prev => ({ ...prev, [fieldName]: true }));
    const error = validateField(fieldName, formData[fieldName as keyof typeof formData]);
    setErrors(prev => ({ ...prev, [fieldName]: error }));
  };

  const handleChange = (fieldName: string, value: string) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));
    if (touched[fieldName]) {
      const error = validateField(fieldName, value);
      setErrors(prev => ({ ...prev, [fieldName]: error }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched and validate
    const newErrors: Record<string, string> = {};
    const touchedState: Record<string, boolean> = {};

    Object.keys(formData).forEach(key => {
      touchedState[key] = true;
      const error = validateField(key, formData[key as keyof typeof formData]);
      if (error) {
        newErrors[key] = error;
      }
    });

    setTouched(touchedState);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return; // Validation errors exist
    }

    setStatus('submitting');
    setSubmitError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTouched({});
        setErrors({});
      } else {
        setStatus('error');
        setSubmitError(data.message || 'Unable to submit the form. Please try again.');
      }
    } catch (err) {
      console.error('Contact submission error:', err);
      setStatus('error');
      setSubmitError('A network error occurred. Please check your internet connection and try again.');
    }
  };

  return (
    <div>
      <Banner pageName="Contact" showLogo={false} />
      <div className="flex flex-col items-center justify-center mt-24">
        <h2 className="font-semibold text-[36px]">Get In Touch With Us</h2>
        <p className="font-normal text-sm md:text-base text-[#9F9F9F] text-center max-w-[650px] px-4">
          For More Information About Our Product & Services. Please Feel Free To Drop Us
          An Email. Our Staff Always Be There To Help You Out. Do Not Hesitate!
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between max-w-[1200px] mx-auto px-4 py-12 gap-12">
        {/* Info Column */}
        <div className="flex flex-col md:items-start items-center gap-10 md:w-1/3">
          <div className="flex items-start gap-6">
            <Image src={address} alt="" className="mt-1" />
            <div className="flex flex-col">
              <h3 className="font-bold text-2xl text-gray-900">Address</h3>
              <p className="font-normal text-base text-gray-600">
                236 5th SE Avenue, New York NY10000, United States
              </p>
            </div>
          </div>
          <div className="flex items-start gap-6">
            <Image src={phone} alt="" className="mt-1" />
            <div className="flex flex-col">
              <h3 className="font-bold text-2xl text-gray-900">Phone</h3>
              <p className="font-normal text-base text-gray-600">
                Mobile: +(84) 546-6789<br />
                Hotline: +(84) 456-6789
              </p>
            </div>
          </div>
          <div className="flex items-start gap-6">
            <Image src={hours} alt="" className="mt-1" />
            <div className="flex flex-col">
              <h3 className="font-bold text-2xl text-gray-900">Working Time</h3>
              <p className="font-normal text-base text-gray-600">
                Monday-Friday: 9:00 - 22:00<br />
                Saturday-Sunday: 9:00 - 21:00
              </p>
            </div>
          </div>
        </div>

        {/* Form Column */}
        <div className="w-full md:w-2/3 bg-gray-50 p-6 md:p-10 rounded-2xl border border-gray-100 shadow-xs">
          {status === 'success' && (
            <div className="mb-6 bg-green-50 border border-green-200 text-green-800 rounded-xl p-4 text-center">
              <svg className="w-12 h-12 text-green-500 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h4 className="text-lg font-bold">Thank You!</h4>
              <p className="text-sm">Your message has been sent successfully. We will get back to you shortly.</p>
            </div>
          )}

          {status === 'error' && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-800 rounded-xl p-4 text-center">
              <p className="text-sm font-semibold">{submitError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-base font-semibold text-gray-800">
                Your name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Abc"
                value={formData.name}
                onChange={e => handleChange('name', e.target.value)}
                onBlur={() => handleBlur('name')}
                className={`mt-2 w-full px-4 py-3 border rounded-[10px] bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#B88E2F] ${
                  touched.name && errors.name ? 'border-red-500 ring-1 ring-red-500' : 'border-[#9F9F9F]'
                }`}
                aria-invalid={!!(touched.name && errors.name)}
                aria-describedby={touched.name && errors.name ? "name-error" : undefined}
              />
              {touched.name && errors.name && (
                <p id="name-error" className="mt-1 text-sm text-red-600 font-medium" role="alert">
                  {errors.name}
                </p>
              )}
            </div>
            
            <div>
              <label htmlFor="email" className="block text-base font-semibold text-gray-800">
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Abc@def.com"
                value={formData.email}
                onChange={e => handleChange('email', e.target.value)}
                onBlur={() => handleBlur('email')}
                className={`mt-2 w-full px-4 py-3 border rounded-[10px] bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#B88E2F] ${
                  touched.email && errors.email ? 'border-red-500 ring-1 ring-red-500' : 'border-[#9F9F9F]'
                }`}
                aria-invalid={!!(touched.email && errors.email)}
                aria-describedby={touched.email && errors.email ? "email-error" : undefined}
              />
              {touched.email && errors.email && (
                <p id="email-error" className="mt-1 text-sm text-red-600 font-medium" role="alert">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="subject" className="block text-base font-semibold text-gray-800">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="Topic of inquiry"
                value={formData.subject}
                onChange={e => handleChange('subject', e.target.value)}
                onBlur={() => handleBlur('subject')}
                className={`mt-2 w-full px-4 py-3 border rounded-[10px] bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#B88E2F] ${
                  touched.subject && errors.subject ? 'border-red-500 ring-1 ring-red-500' : 'border-[#9F9F9F]'
                }`}
                aria-invalid={!!(touched.subject && errors.subject)}
                aria-describedby={touched.subject && errors.subject ? "subject-error" : undefined}
              />
              {touched.subject && errors.subject && (
                <p id="subject-error" className="mt-1 text-sm text-red-600 font-medium" role="alert">
                  {errors.subject}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="block text-base font-semibold text-gray-800">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Hi! I'd like to ask about..."
                value={formData.message}
                onChange={e => handleChange('message', e.target.value)}
                onBlur={() => handleBlur('message')}
                className={`mt-2 w-full px-4 py-3 border rounded-[10px] bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#B88E2F] ${
                  touched.message && errors.message ? 'border-red-500 ring-1 ring-red-500' : 'border-[#9F9F9F]'
                }`}
                aria-invalid={!!(touched.message && errors.message)}
                aria-describedby={touched.message && errors.message ? "message-error" : undefined}
              ></textarea>
              {touched.message && errors.message && (
                <p id="message-error" className="mt-1 text-sm text-red-600 font-medium" role="alert">
                  {errors.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="mt-6 bg-[#B88E2F] hover:bg-[#9E7A28] disabled:bg-gray-400 font-semibold text-base text-white py-4 px-16 rounded-lg w-full md:w-auto transition-all focus:outline-none focus:ring-2 focus:ring-[#B88E2F] focus:ring-offset-2"
            >
              {status === 'submitting' ? 'Sending...' : 'Submit'}
            </button>
          </form>
        </div>
      </div>
      <Guarantees />
    </div>
  );
}
