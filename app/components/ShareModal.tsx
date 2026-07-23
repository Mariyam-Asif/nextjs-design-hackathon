'use client';

import { useState, useEffect } from 'react';
import { announce } from '../utils/announcer';
import Image from "next/image";
import shareIcon from "@/public/share-icon-black.svg";
import whatsAppIcon from "@/public/whatsapp-icon.svg";
import facebookIcon from "@/public/facebook-icon.svg";
import twitterIcon from "@/public/twitter-icon.svg";
import emailIcon from "@/public/email-icon.svg";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  slug: string;
}

export default function ShareModal({ isOpen, onClose, title, slug }: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const origin = window.location.origin;
      setShareUrl(`${origin}/shop/${slug}`);
    }
  }, [slug]);

  if (!isOpen) return null;

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = shareUrl;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      announce('Link copied to clipboard!', 'polite');
      setTimeout(() => setCopied(false), 3500);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: `Check out ${title} on Furniro!`,
          url: shareUrl,
        });
      } catch (err) {
        // Ignore user cancellation
        if ((err as Error).name !== 'AbortError') {
          console.error('Native share failed:', err);
        }
      }
    }
  };

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(`Check out ${title} on Furniro!`);

  const shareLinks = {
    whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodedTitle}%20${encodedUrl}`,
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-modal-title"
    >
      <div
        className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-gray-100 p-6 space-y-6 relative animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Close share dialog"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Modal Header */}
        <div className="space-y-1">
          <h3 id="share-modal-title" className="text-xl font-bold text-gray-900">
            Share Product
          </h3>
          <p className="text-sm text-gray-500 line-clamp-1">{title}</p>
        </div>

        {/* Native Mobile Share Button if supported */}
        {typeof navigator !== 'undefined' && 'share' in navigator && (
          <button
            onClick={handleNativeShare}
            className="w-full flex items-center justify-center gap-2 bg-[#FFF3E3] text-[#B88E2F] hover:bg-[#F5E6D3] font-bold text-sm py-2.5 px-4 rounded-xl border border-[#F5E6D3] transition-colors"
          >
            <Image
                src={shareIcon}
                alt=""
                className="w-5 h-5 transition-transform hover:scale-110"
                aria-hidden="true"
                />
            <span>Share via Mobile Apps</span>
          </button>
        )}

        {/* Copy Link Section */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
            Product Link
          </label>
          <div className="flex items-center gap-2 relative">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-3.5 text-xs text-gray-700 font-mono focus:outline-none"
            />
            <button
              onClick={handleCopyLink}
              className={`shrink-0 text-xs font-bold py-2.5 px-4 rounded-xl transition-all duration-300 shadow-xs ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#B88E2F] hover:bg-[#9E7A28] text-white'
              }`}
            >
              {copied ? '✓ Copied!' : 'Copy Link'}
            </button>
          </div>
          {copied && (
            <p role="status" className="text-xs font-semibold text-emerald-600 animate-fade-in">
              ✓ Link successfully copied to clipboard!
            </p>
          )}
        </div>

        {/* Social Sharing Options */}
        <div className="space-y-3 pt-2 border-t border-gray-100">
          <span className="block text-xs font-bold uppercase tracking-wider text-gray-700">
            Share to Socials
          </span>
          <div className="grid grid-cols-4 gap-3">
            {/* WhatsApp */}
            <a
              href={shareLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition-colors text-center border border-emerald-100 group"
              aria-label="Share on WhatsApp"
            >
              <Image
                src={whatsAppIcon}
                alt=""
                className="w-5 h-5 transition-transform hover:scale-110"
                aria-hidden="true"
                />
              <span className="text-[11px] font-bold">WhatsApp</span>
            </a>

            {/* Facebook */}
            <a
              href={shareLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 transition-colors text-center border border-blue-100 group"
              aria-label="Share on Facebook"
            >
              <Image
                src={facebookIcon}
                alt=""
                className="w-5 h-5 transition-transform hover:scale-110"
                aria-hidden="true"
                />
              <span className="text-[11px] font-bold">Facebook</span>
            </a>

            {/* Twitter */}
            <a
              href={shareLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 transition-colors text-center border border-sky-100 group"
              aria-label="Share on Twitter"
            >
              <Image
                src={twitterIcon}
                alt=""
                className="w-5 h-5 transition-transform hover:scale-110"
                aria-hidden="true"
                />
              <span className="text-[11px] font-bold">Twitter</span>
            </a>

            {/* Email */}
            <a
              href={shareLinks.email}
              className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 transition-colors text-center border border-purple-100 group"
              aria-label="Share via Email"
            >
              <Image
                src={emailIcon}
                alt=""
                className="w-5 h-5 transition-transform hover:scale-110"
                aria-hidden="true"
                />
              <span className="text-[11px] font-bold">Email</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
