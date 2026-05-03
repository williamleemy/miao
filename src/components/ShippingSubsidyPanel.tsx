import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useLanguageStore } from '../lib/store';
import { getShippingSubsidyWhatsappHref } from '../lib/shippingSubsidy';

type Embed = 'page' | 'modal';

type WhatsAppExtra = {
  productNameCn?: string;
  productNameEn?: string;
  customerRegionCn?: string;
  customerRegionEn?: string;
};

export function ShippingSubsidyWhatsAppButton({
  embed = 'page',
  productNameCn,
  productNameEn,
  customerRegionCn,
  customerRegionEn,
}: WhatsAppExtra & { embed?: Embed }) {
  const { language } = useLanguageStore();
  const lang = language === 'cn' ? 'cn' : 'en';
  const href = getShippingSubsidyWhatsappHref({
    language: lang,
    productNameCn,
    productNameEn,
    customerRegionCn,
    customerRegionEn,
  });
  const isCn = language === 'cn';

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={
        embed === 'modal'
          ? 'flex w-full items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-5 py-4 text-base font-black text-white shadow-lg shadow-green-600/25 transition-transform hover:scale-[1.02] active:scale-[0.98]'
          : 'inline-flex w-full sm:w-auto min-w-[280px] items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-8 py-4 text-base md:text-lg font-black text-white shadow-xl shadow-green-600/30 transition-transform hover:scale-[1.02] active:scale-[0.98]'
      }
    >
      <MessageCircle className="h-6 w-6 shrink-0" strokeWidth={2.5} />
      {isCn ? '💬 点击联系 WhatsApp 领取运费补贴并下单' : '💬 WhatsApp: shipping subsidy & order'}
    </a>
  );
}

/**
 * 尊享免运费计划（商品弹窗与配送政策页共用）
 */
export default function ShippingSubsidyPanel({
  embed = 'page',
  productNameCn,
  productNameEn,
  customerRegionCn,
  customerRegionEn,
}: WhatsAppExtra & { embed?: Embed }) {
  const { language } = useLanguageStore();
  const isCn = language === 'cn';
  const boxClass =
    embed === 'modal'
      ? 'text-bakery-brown/90'
      : 'bg-white rounded-[2rem] p-8 md:p-10 shadow-xl border-4 border-white text-bakery-brown/90';

  return (
    <div className={boxClass}>
      <h2 className="text-2xl md:text-3xl font-display font-black text-bakery-brown mb-3 leading-snug">
        {isCn ? '✨ 尊享免运费计划' : '✨ Premium free-shipping program'}
      </h2>
      <p className="font-medium leading-relaxed mb-6 text-bakery-brown/85">
        {isCn
          ? '我们坚持把最可爱的盲盒送到您手中。为了回馈粉丝，我们特别制定了运费补贴方案：'
          : 'We want every cute blind box to reach you safely. As a thank-you to fans, we offer this shipping subsidy plan:'}
      </p>

      <ul className="space-y-5 font-medium leading-relaxed mb-8">
        <li className="flex gap-3">
          <span className="shrink-0 text-lg" aria-hidden>
            📍
          </span>
          <div>
            <span className="font-black text-bakery-brown">{isCn ? '西马 (West Malaysia)' : 'West Malaysia'}</span>
            <span className="text-bakery-brown/85">
              {isCn ? '：享受 100% 运费全免。' : ': 100% shipping covered—fully free.'}
            </span>
          </div>
        </li>
        <li className="flex gap-3">
          <span className="shrink-0 text-lg" aria-hidden>
            📍
          </span>
          <div>
            <span className="font-black text-bakery-brown">{isCn ? '东马 (East Malaysia)' : 'East Malaysia'}</span>
            <span className="text-bakery-brown/85">
              {isCn
                ? '：由于跨海空运成本较高，我们为您承担了 50% 运费，您只需补少量差额（联系客服获取最低报价）。'
                : ': Air freight across the sea costs more—we cover 50% of shipping; you pay only the remaining balance (contact us for the best quote).'}
            </span>
          </div>
        </li>
        <li className="flex gap-3">
          <span className="shrink-0 text-lg" aria-hidden>
            📍
          </span>
          <div>
            <span className="font-black text-bakery-brown">{isCn ? '海外 (International)' : 'International'}</span>
            <span className="text-bakery-brown/85">
              {isCn
                ? '：我们支持全球直邮！因各国费率不同，我们将为您查询最省钱、最快速的物流方案。'
                : ': We ship worldwide. Rates vary by country—we will find the most economical and fastest option for you.'}
            </span>
          </div>
        </li>
      </ul>

      <p className="text-bakery-brown/90 font-bold leading-relaxed mb-6 flex gap-2">
        <span aria-hidden>👇</span>
        <span>
          {isCn
            ? '确定下单或查询运费？请点击下方按钮联系我们的客服，我们将为您计算最优惠的最终金额并安排发货。'
            : 'Ready to order or check shipping? Tap the button below to reach us—we will quote the best final total and arrange delivery.'}
        </span>
      </p>

      <ShippingSubsidyWhatsAppButton
        embed={embed}
        productNameCn={productNameCn}
        productNameEn={productNameEn}
        customerRegionCn={customerRegionCn}
        customerRegionEn={customerRegionEn}
      />
    </div>
  );
}
