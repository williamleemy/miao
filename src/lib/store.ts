import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { fetchUnitsPerUsd } from './fx';

export interface CartItem {
  id: string;
  name: { en: string; cn: string } | string;
  price: number;
  quantity: number;
  imageUrl: string;
  fallbackImage: string;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((i) => i.id === item.id);
        
        if (existingItem) {
          set({
            items: currentItems.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
            ),
          });
        } else {
          set({ items: [...currentItems, item] });
        }
      },
      removeItem: (id) => {
        set({ items: get().items.filter((i) => i.id !== id) });
      },
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        set({
          items: get().items.map((i) => (i.id === id ? { ...i, quantity } : i)),
        });
      },
      clearCart: () => set({ items: [] }),
      get total() {
        return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      },
    }),
    {
      name: 'sweet-toys-cart',
    }
  )
);

type Language = 'en' | 'cn';

export type Currency = 'SGD' | 'MYR' | 'TWD';

interface CurrencyConfig {
  symbol: string;
  rate: number; // Rate relative to USD (base price)
  label: string;
}

export const CURRENCIES: Record<Currency, CurrencyConfig> = {
  SGD: { symbol: 'S$', rate: 1.35, label: '新币' },
  MYR: { symbol: 'RM', rate: 4.7, label: '马币' },
  TWD: { symbol: 'NT$', rate: 32, label: '台币' },
};

const DEFAULT_UNITS_PER_USD: Record<Currency, number> = {
  // Fallback mock: how many units of each currency == 1 USD (matches previous behavior)
  SGD: CURRENCIES.SGD.rate,
  MYR: CURRENCIES.MYR.rate,
  TWD: CURRENCIES.TWD.rate,
};

export const translations = {
  en: {
    nav: { 
      home: 'Home', 
      shop: 'Shop',
      allProducts: 'All Products',
      bestSellers: 'Best Sellers',
      newArrivals: 'New Arrivals',
      monthlyLimited: 'Monthly Limited',
      series: 'Theme Series',
      login: 'Login',
      categories: {
        all: 'All',
        spongebob: 'Bikini Bottom Series',
        pingu: 'Pingu Series',
        manor: 'Dream Manor Series',
        elf: 'Elf Illustration Series',
        dailyLimited: 'Daily Limited',
        healingSeries: 'Healing Series',
        logicCake: 'Logic Fragment Cake',
        coBranded: 'Co-branded Limited'
      }
    },
    home: {
      title1: 'Toys as Sweet as ',
      title2: 'Candy!',
      subtitle: 'Discover our delightful collection of plushies, puzzles, and playsets. Baked with love and imagination.',
      shopNow: 'Shop Now',
      featured: 'Featured Treats',
      allProducts: 'All Products',
      bestSellers: 'Best Sellers',
      newArrivals: 'New Arrivals',
      monthlyLimited: 'Monthly Limited',
      spongebobSeries: 'SpongeBob Family',
      sanrioSeries: 'Sanrio Sweethearts',
      originalSeries: 'Original Designer Toys',
      more: 'More Surprises',
      viewAll: 'View all toys',
      reviewsTitle: 'Happy Customers',
      contactTitle: 'Contact Us',
      contactName: 'Your Name',
      contactEmail: 'Your Email',
      contactMessage: 'Your Message',
      contactSubmit: 'Send Message',
      contactSuccess: 'Message sent successfully!'
    },
    shop: {
      title: 'The Toy Bakery',
      subtitle: 'Freshly baked toys for everyone!',
      all: 'All',
      searchPlaceholder: 'Search for toys...',
      bestSellerTitle: 'Popular Favorites: The Happiness Everyone Wants',
      bestSellerSubtitle: 'See what everyone is buying and discover the most loved treats.',
      newArrivalTitle: 'Freshly Baked: New Arrivals Just For You',
      newArrivalSubtitle: 'Be the first to explore our latest sweet additions to the bakery.',
      limitedTitle: 'Sweet Rarity: This Month\'s Limited Collection',
      limitedSubtitle: 'Grab these exclusive treats before they disappear forever!',
      emptyBestSellerTitle: 'Bestseller list is loading, check out our [New Arrivals] first!',
      emptyBestSellerSubtitle: 'Great things are brewing, your favorites will help them get on the list!',
      hot: 'Hot',
      orderedThisWeek: '1200+ ordered this week',
      positiveRating: '99.9% positive rating'
    },
    cart: {
      emptyTitle: 'Your cart is empty',
      emptySubtitle: "Looks like you haven't added any sweet treats yet!",
      goShop: 'Go to Shop',
      title: 'Your Cart',
      summary: 'Order Summary',
      subtotal: 'Subtotal',
      shipping: 'Shipping',
      free: 'Free',
      total: 'Total',
      checkout: 'Checkout',
      loginCheckout: 'Login to Checkout',
      success: 'Checkout successful! Your sweet toys are on the way!'
    },
    checkout: {
      title: 'Checkout',
      shippingInfo: 'Shipping Information',
      fullName: 'Full Name',
      address: 'Address',
      city: 'City',
      postalCode: 'Postal Code',
      phone: 'Phone Number',
      paymentMethod: 'Payment Method',
      cod: 'Cash on Delivery',
      creditCard: 'Credit Card',
      placeOrder: 'Place Order',
      orderSummary: 'Order Summary',
      processing: 'Processing...',
      successTitle: 'Thank you for your order!',
      successSubtitle: 'Your order has been placed successfully. We will ship it as soon as possible.',
      backToHome: 'Back to Home'
    },
    footer: {
      aboutUs: 'About Us',
      aboutText: 'We bring joy to children and adults alike with our carefully curated selection of sweet and delightful toys.',
      quickLinks: 'Quick Links',
      customerService: 'Customer Service',
      faq: 'FAQ',
      shipping: 'Shipping Policy',
      returns: 'Returns',
      contact: 'Contact',
      rights: 'All rights reserved.'
    },
    product: {
      description: 'Description',
      specifications: 'Specifications',
      relatedProducts: 'You might also like',
      addToCart: 'Add to Cart',
      backToShop: 'Back to Shop',
      material: 'Material',
      size: 'Size',
      age: 'Recommended Age',
      materialValue: 'High-quality non-toxic materials',
      sizeValue: 'Standard size',
      ageValue: '3+ years'
    }
  },
  cn: {
    nav: { 
      home: '首页', 
      shop: '商店',
      allProducts: '所有商品',
      bestSellers: '人气热卖',
      newArrivals: '新品首发',
      monthlyLimited: '本月限定',
      series: '主题系列',
      login: '登录',
      categories: {
        all: '全部',
        spongebob: '比奇堡系列',
        pingu: 'Pingu 系列',
        manor: '微缩生活场景系列',
        elf: '精灵图鉴系列',
        dailyLimited: '每日限量',
        healingSeries: '治愈系列',
        logicCake: '逻辑碎片蛋糕',
        coBranded: '联名限定款'
      }
    },
    home: {
      title1: '像糖果一样甜美的',
      title2: '玩具！',
      subtitle: '探索我们可爱的毛绒玩具、拼图 and 玩具套装。用爱与想象力烘焙而成。',
      shopNow: '立即选购',
      featured: '特色甜点玩具',
      allProducts: '所有商品',
      bestSellers: '人气热卖',
      newArrivals: '新品首发',
      monthlyLimited: '本月限定',
      spongebobSeries: '海绵宝宝家族',
      sanrioSeries: '三丽鸥甜心',
      originalSeries: '原创潮玩系列',
      more: '更多惊喜',
      viewAll: '查看所有玩具',
      reviewsTitle: '顾客好评',
      contactTitle: '联系我们',
      contactName: '您的姓名',
      contactEmail: '您的邮箱',
      contactMessage: '您的留言',
      contactSubmit: '发送留言',
      contactSuccess: '留言发送成功！'
    },
    shop: {
      title: '玩具烘焙坊',
      subtitle: '为每个人新鲜出炉的玩具！',
      all: '全部',
      searchPlaceholder: '搜索玩具...',
      bestSellerTitle: '人气好物榜：这就是大家都想要的快乐',
      bestSellerSubtitle: '看看大家都买了什么，跟随潮流，发现最受欢迎的甜美玩具',
      newArrivalTitle: '新鲜出炉：属于你的新品首发',
      newArrivalSubtitle: '第一时间探索我们烘焙坊最新加入的甜美伙伴。',
      limitedTitle: '甜蜜稀缺：本月限定系列',
      limitedSubtitle: '在这些专属好物永远消失之前，快把它们带回家吧！',
      emptyBestSellerTitle: '热卖榜正在努力加载中，先看看我们的【新品首发】吧！',
      emptyBestSellerSubtitle: '好物还在酝酿中，您的每一次收藏都会让它上榜哦！',
      hot: '热门',
      orderedThisWeek: '本周 1200+ 人已下单',
      positiveRating: '好评率 99.9%'
    },
    cart: {
      emptyTitle: '您的购物车是空的',
      emptySubtitle: '看来您还没有添加任何甜美的玩具！',
      goShop: '去购物',
      title: '您的购物车',
      summary: '订单摘要',
      subtotal: '小计',
      shipping: '运费',
      free: '免费',
      total: '总计',
      checkout: '结账',
      loginCheckout: '登录以结账',
      success: '结账成功！您甜美的玩具正在路上！'
    },
    checkout: {
      title: '结账',
      shippingInfo: '收货信息',
      fullName: '全名',
      address: '详细地址',
      city: '城市',
      postalCode: '邮政编码',
      phone: '电话号码',
      paymentMethod: '支付方式',
      cod: '货到付款',
      creditCard: '信用卡',
      placeOrder: '提交订单',
      orderSummary: '订单摘要',
      processing: '正在处理...',
      successTitle: '感谢您的订购！',
      successSubtitle: '您的订单已成功下达。我们将尽快为您发货。',
      backToHome: '返回首页'
    },
    footer: {
      aboutUs: '关于我们',
      aboutText: '我们通过精心挑选的甜美可爱的玩具，为儿童和成年人带来欢乐。',
      quickLinks: '快速链接',
      customerService: '客户服务',
      faq: '常见问题',
      shipping: '配送政策',
      returns: '退换货',
      contact: '联系我们',
      rights: '版权所有。'
    },
    product: {
      description: '产品描述',
      specifications: '产品规格',
      relatedProducts: '猜你喜欢',
      addToCart: '加入购物车',
      backToShop: '返回商店',
      material: '材质',
      size: '尺寸',
      age: '适用年龄',
      materialValue: '优质无毒环保材质',
      sizeValue: '标准尺寸',
      ageValue: '3岁以上'
    }
  }
};

interface LanguageState {
  language: Language;
  currency: Currency;
  unitsPerUsd: Record<Currency, number>;
  fxReady: boolean;
  fxUpdatedAt: number;
  fxError: string | null;
  setLanguage: (lang: Language) => void;
  setCurrency: (currency: Currency) => void;
  refreshFxRates: (opts?: { force?: boolean }) => Promise<void>;
  t: (key: string) => string;
  formatPrice: (price: number) => string;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set, get) => ({
      language: 'en',
      currency: 'MYR',
      unitsPerUsd: { ...DEFAULT_UNITS_PER_USD },
      fxReady: false,
      fxUpdatedAt: 0,
      fxError: null,
      setLanguage: (lang) => set({ language: lang }),
      setCurrency: (currency) => set({ currency }),
      refreshFxRates: async (opts) => {
        const force = Boolean(opts?.force);
        const { fxUpdatedAt, fxReady } = get();
        const now = Date.now();
        if (!force && fxReady && now - fxUpdatedAt < 1000 * 60 * 30) return;

        try {
          const unitsPerUsd = await fetchUnitsPerUsd();

          set({
            unitsPerUsd,
            fxReady: true,
            fxUpdatedAt: Date.now(),
            fxError: null,
          });
        } catch (e) {
          set({
            fxReady: false,
            fxUpdatedAt: Date.now(),
            fxError: e instanceof Error ? e.message : String(e),
            unitsPerUsd: { ...DEFAULT_UNITS_PER_USD },
          });
        }
      },
      t: (key) => {
        const keys = key.split('.');
        let value: any = translations[get().language as keyof typeof translations];
        for (const k of keys) {
          if (value === undefined) return key;
          value = value[k];
        }
        return value || key;
      },
      formatPrice: (price) => {
        const { currency, unitsPerUsd } = get();
        const config = CURRENCIES[currency];
        // `price` is stored as USD internally; convert using live FX (`unitsPerUsd`) when fetch succeeds.
        const convertedPrice = price * unitsPerUsd[currency];
        return `${config.symbol}${convertedPrice.toFixed(2)}`;
      }
    }),
    {
      name: 'sweet-toys-lang',
      version: 2,
      partialize: (state) => ({
        language: state.language,
        currency: state.currency,
      }),
      migrate: (persistedState: any, version) => {
        if (!persistedState || typeof persistedState !== 'object') return persistedState as any;

        // Drop removed currencies (e.g. USD) from persisted storage
        if (version < 2 && persistedState.state?.currency === 'USD') {
          persistedState.state.currency = 'MYR';
        }

        return persistedState as any;
      },
      onRehydrateStorage: () => (state) => {
        // Fire-and-forget refresh after hydration (won't block render)
        void state?.refreshFxRates?.();
      },
    }
  )
);
