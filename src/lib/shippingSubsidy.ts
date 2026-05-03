/** 客服 WhatsApp（与页脚 / 商品详情一致） */
export const WHATSAPP_BUSINESS_E164 = '601162573845';

export type ShippingSubsidyMessageOptions = {
  language: 'cn' | 'en';
  /** 商品中文名；无则用「贵店商品」 */
  productNameCn?: string;
  /** 商品英文名；无则用通用占位 */
  productNameEn?: string;
  /** 顾客地区中文，默认「东马/海外」 */
  customerRegionCn?: string;
  /** 顾客地区英文 */
  customerRegionEn?: string;
};

export function buildShippingSubsidyWhatsappMessage(opts: ShippingSubsidyMessageOptions): string {
  const { language, productNameCn, productNameEn, customerRegionCn, customerRegionEn } = opts;
  if (language === 'cn') {
    const name = (productNameCn && productNameCn.trim()) || '贵店商品';
    const region = (customerRegionCn && customerRegionCn.trim()) || '东马/海外';
    return `你好！我想下单 ${name}，我是来自 ${region} 的顾客，想请你帮我计算最优惠的运费补贴价格，谢谢！`;
  }
  const nameEn = (productNameEn && productNameEn.trim()) || 'an item from your shop';
  const regionEn = (customerRegionEn && customerRegionEn.trim()) || 'East Malaysia / overseas';
  return `Hi! I'd like to order: ${nameEn}. I'm a customer from ${regionEn}. Could you please help calculate the best shipping-subsidy price? Thank you!`;
}

export function getShippingSubsidyWhatsappHref(opts: ShippingSubsidyMessageOptions): string {
  return `https://wa.me/${WHATSAPP_BUSINESS_E164}?text=${encodeURIComponent(buildShippingSubsidyWhatsappMessage(opts))}`;
}
