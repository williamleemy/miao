import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { useLanguageStore } from '../lib/store';
import ShippingSubsidyPanel from './ShippingSubsidyPanel';

type Props = {
  open: boolean;
  onClose: () => void;
  productNameCn?: string;
  productNameEn?: string;
};

export default function ShippingSubsidyModal({ open, onClose, productNameCn, productNameEn }: Props) {
  const { language } = useLanguageStore();
  const dialogLabel =
    language === 'cn' ? '尊享免运费计划与运费补贴说明' : 'Premium shipping subsidy details';

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  const node = (
    <div
      className="fixed inset-0 z-[240] flex items-end justify-center sm:items-center p-0 sm:p-4 bg-black/45 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-label={dialogLabel}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg max-h-[min(92vh,720px)] overflow-y-auto rounded-t-[2rem] sm:rounded-[2rem] bg-bakery-cream shadow-2xl border-4 border-white sm:my-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 p-2 rounded-full bg-white/90 text-bakery-brown shadow border border-bakery-pink-light hover:bg-pink-50 transition-colors"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="p-6 pt-14 sm:p-8 sm:pt-10">
          <ShippingSubsidyPanel
            embed="modal"
            productNameCn={productNameCn}
            productNameEn={productNameEn}
          />
        </div>
      </div>
    </div>
  );

  if (typeof document === 'undefined') return null;
  return createPortal(node, document.body);
}
