import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Star, 
  ShoppingCart, 
  Plus, 
  Minus,
  Share2,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  X,
  Check,
  Info,
  Bookmark,
  ImagePlus,
  Clapperboard
} from 'lucide-react';
import { CURRENCIES, useCartStore, useLanguageStore } from '../lib/store';
import { MOCK_PRODUCTS } from '../lib/data';
import { AnimatePresence } from 'motion/react';

type PurchaseOptionKey = 'blind' | 'boxed';
const PRODUCT_ONE_STYLE_OPTIONS = [
  '【床】已开盒确认款',
  '【食物】已开盒确认款',
  '【卫生】已开盒确认款',
  '【玩具】已开盒确认款',
  '【牵引绳】已开盒确认款',
  '【刷子】已开盒确认款',
  '【手推车】已开盒确认款',
  '【桌子】已开盒确认款',
  '一套8款',
] as const;
const PRODUCT_FOUR_STYLE_OPTIONS = [
  '【1号】已开盒确认款/未拆袋',
  '【2号】已开盒确认款/未拆袋',
  '【3号】已开盒确认款/未拆袋',
  '【4号】已开盒确认款/未拆袋',
  '【5号】已开盒确认款/未拆袋',
  '【6号】已开盒确认款/未拆袋',
  '【7号】已开盒确认款/未拆袋',
  '【8号】已开盒确认款/未拆袋',
  '一套8款',
] as const;
const PRODUCT_TEN_STYLE_OPTIONS = [
  '【1号】已开盒确认款',
  '【2号】已开盒确认款',
  '【3号】已开盒确认款',
  '【4号】已开盒确认款',
  '【5号】已开盒确认款',
  '【6号】已开盒确认款',
  '【7号】已开盒确认款',
  '【8号】已开盒确认款',
  '一套8款',
] as const;
const PRODUCT_FOURTEEN_STYLE_OPTIONS = [
  '【1号】已开盒确认款/未拆袋',
  '【2号】已开盒确认款/未拆袋',
  '【3号】已开盒确认款/未拆袋',
  '【4号】已开盒确认款/未拆袋',
  '【5号】已开盒确认款/未拆袋',
  '【6号】已开盒确认款/未拆袋',
  '【7号】已开盒确认款/未拆袋',
  '【8号】已开盒确认款/未拆袋',
  '【整套8款】',
] as const;
const PRODUCT_TWENTY_STYLE_OPTIONS = [
  '【1号】开盒确认款',
  '【2号】开盒确认款',
  '【3号】开盒确认款',
  '【4号】开盒确认款',
  '【5号】开盒确认款',
  '【6号】开盒确认款',
  '【7号】开盒确认款',
  '【8号】开盒确认款',
  '【整套8款】',
] as const;
const PRODUCT_FIVE_STYLE_OPTIONS = [
  'CP毛绒挂件 雨衣款',
  '组合毛绒挂件 听音乐款',
  '组合毛绒挂件 围巾款',
] as const;
const PRODUCT_ONE_STYLE_IMAGE_BY_LABEL: Record<(typeof PRODUCT_ONE_STYLE_OPTIONS)[number], string> = {
  '【床】已开盒确认款': '床.png',
  '【食物】已开盒确认款': '食物.png',
  '【卫生】已开盒确认款': '卫生.png',
  '【玩具】已开盒确认款': '玩具.png',
  '【牵引绳】已开盒确认款': '牵引绳.png',
  '【刷子】已开盒确认款': '刷子.png',
  '【手推车】已开盒确认款': '手推车.png',
  '【桌子】已开盒确认款': '桌子.png',
  '一套8款': '一套8款.png',
};
const PRODUCT_ONE_STYLE_PRICE_BY_LABEL: Record<
  (typeof PRODUCT_ONE_STYLE_OPTIONS)[number],
  { beforeMyr: number; afterMyr: number }
> = {
  '【床】已开盒确认款': { beforeMyr: 59, afterMyr: 49 },
  '【食物】已开盒确认款': { beforeMyr: 65, afterMyr: 55 },
  '【卫生】已开盒确认款': { beforeMyr: 60, afterMyr: 50 },
  '【玩具】已开盒确认款': { beforeMyr: 80, afterMyr: 70 },
  '【牵引绳】已开盒确认款': { beforeMyr: 79, afterMyr: 69 },
  '【刷子】已开盒确认款': { beforeMyr: 79, afterMyr: 69 },
  '【手推车】已开盒确认款': { beforeMyr: 79, afterMyr: 69 },
  '【桌子】已开盒确认款': { beforeMyr: 80, afterMyr: 70 },
  '一套8款': { beforeMyr: 259, afterMyr: 239 },
};
const PRODUCT_FOUR_STYLE_IMAGE_BY_LABEL: Record<(typeof PRODUCT_FOUR_STYLE_OPTIONS)[number], string> = {
  '【1号】已开盒确认款/未拆袋': '1号.png',
  '【2号】已开盒确认款/未拆袋': '2号.png',
  '【3号】已开盒确认款/未拆袋': '3号.png',
  '【4号】已开盒确认款/未拆袋': '4号.png',
  '【5号】已开盒确认款/未拆袋': '5号.png',
  '【6号】已开盒确认款/未拆袋': '6号.png',
  '【7号】已开盒确认款/未拆袋': '7号.png',
  '【8号】已开盒确认款/未拆袋': '8号.png',
  '一套8款': '一套8款.png',
};
const PRODUCT_TEN_STYLE_IMAGE_BY_LABEL: Record<(typeof PRODUCT_TEN_STYLE_OPTIONS)[number], string> = {
  '【1号】已开盒确认款': '1.png',
  '【2号】已开盒确认款': 'last.png',
  '【3号】已开盒确认款': '3.png',
  '【4号】已开盒确认款': '4.png',
  '【5号】已开盒确认款': '5.png',
  '【6号】已开盒确认款': 'last.png',
  '【7号】已开盒确认款': '7.png',
  '【8号】已开盒确认款': '8.png',
  '一套8款': '一套8款.png',
};
const PRODUCT_FOURTEEN_STYLE_IMAGE_BY_LABEL: Record<(typeof PRODUCT_FOURTEEN_STYLE_OPTIONS)[number], string> = {
  '【1号】已开盒确认款/未拆袋': '1.png',
  '【2号】已开盒确认款/未拆袋': '2.png',
  '【3号】已开盒确认款/未拆袋': '3.png',
  '【4号】已开盒确认款/未拆袋': '4.png',
  '【5号】已开盒确认款/未拆袋': '5.png',
  '【6号】已开盒确认款/未拆袋': '6.png',
  '【7号】已开盒确认款/未拆袋': '7.png',
  '【8号】已开盒确认款/未拆袋': '8.png',
  '【整套8款】': '【整套8款】.png',
};
const PRODUCT_TWENTY_STYLE_IMAGE_BY_LABEL: Record<(typeof PRODUCT_TWENTY_STYLE_OPTIONS)[number], string> = {
  '【1号】开盒确认款': '1.png',
  '【2号】开盒确认款': '2.png',
  '【3号】开盒确认款': '3.png',
  '【4号】开盒确认款': '4.png',
  '【5号】开盒确认款': 'last.png',
  '【6号】开盒确认款': 'last.png',
  '【7号】开盒确认款': 'last.png',
  '【8号】开盒确认款': 'last.png',
  '【整套8款】': '【整套8款】.png',
};
const PRODUCT_FIVE_STYLE_IMAGE_BY_LABEL: Record<(typeof PRODUCT_FIVE_STYLE_OPTIONS)[number], string> = {
  'CP毛绒挂件 雨衣款': 'main.png',
  '组合毛绒挂件 听音乐款': '2.png',
  '组合毛绒挂件 围巾款': '3.png',
};
const PRODUCT_TWENTY_STYLE_PRICE_BY_LABEL: Record<
  (typeof PRODUCT_TWENTY_STYLE_OPTIONS)[number],
  { beforeMyr: number; afterMyr: number }
> = {
  '【1号】开盒确认款': { beforeMyr: 70, afterMyr: 60 },
  '【2号】开盒确认款': { beforeMyr: 80, afterMyr: 65 },
  '【3号】开盒确认款': { beforeMyr: 65, afterMyr: 55 },
  '【4号】开盒确认款': { beforeMyr: 70, afterMyr: 60 },
  '【5号】开盒确认款': { beforeMyr: 70, afterMyr: 10 },
  '【6号】开盒确认款': { beforeMyr: 80, afterMyr: 10 },
  '【7号】开盒确认款': { beforeMyr: 60, afterMyr: 10 },
  '【8号】开盒确认款': { beforeMyr: 65, afterMyr: 10 },
  '【整套8款】': { beforeMyr: 279, afterMyr: 249 },
};
const PRODUCT_FOURTEEN_STYLE_PRICE_BY_LABEL: Record<
  (typeof PRODUCT_FOURTEEN_STYLE_OPTIONS)[number],
  { beforeMyr: number; afterMyr: number }
> = {
  '【1号】已开盒确认款/未拆袋': { beforeMyr: 70, afterMyr: 60 },
  '【2号】已开盒确认款/未拆袋': { beforeMyr: 65, afterMyr: 55 },
  '【3号】已开盒确认款/未拆袋': { beforeMyr: 65, afterMyr: 55 },
  '【4号】已开盒确认款/未拆袋': { beforeMyr: 70, afterMyr: 60 },
  '【5号】已开盒确认款/未拆袋': { beforeMyr: 70, afterMyr: 60 },
  '【6号】已开盒确认款/未拆袋': { beforeMyr: 80, afterMyr: 70 },
  '【7号】已开盒确认款/未拆袋': { beforeMyr: 60, afterMyr: 50 },
  '【8号】已开盒确认款/未拆袋': { beforeMyr: 65, afterMyr: 50 },
  '【整套8款】': { beforeMyr: 269, afterMyr: 239 },
};
const PRODUCT_TEN_STYLE_PRICE_BY_LABEL: Record<
  (typeof PRODUCT_TEN_STYLE_OPTIONS)[number],
  { beforeMyr: number; afterMyr: number }
> = {
  '【1号】已开盒确认款': { beforeMyr: 60, afterMyr: 50 },
  '【2号】已开盒确认款': { beforeMyr: 75, afterMyr: 10 },
  '【3号】已开盒确认款': { beforeMyr: 65, afterMyr: 55 },
  '【4号】已开盒确认款': { beforeMyr: 65, afterMyr: 55 },
  '【5号】已开盒确认款': { beforeMyr: 60, afterMyr: 50 },
  '【6号】已开盒确认款': { beforeMyr: 70, afterMyr: 10 },
  '【7号】已开盒确认款': { beforeMyr: 70, afterMyr: 50 },
  '【8号】已开盒确认款': { beforeMyr: 75, afterMyr: 65 },
  '一套8款': { beforeMyr: 269, afterMyr: 249 },
};
const PRODUCT_TEN_SOLD_OUT_OPTIONS = new Set<(typeof PRODUCT_TEN_STYLE_OPTIONS)[number]>([
  '【2号】已开盒确认款',
  '【6号】已开盒确认款',
]);
const PRODUCT_TWENTY_SOLD_OUT_OPTIONS = new Set<(typeof PRODUCT_TWENTY_STYLE_OPTIONS)[number]>([
  '【5号】开盒确认款',
  '【6号】开盒确认款',
  '【7号】开盒确认款',
  '【8号】开盒确认款',
]);
const PRODUCT_FOUR_STYLE_PRICE_BY_LABEL: Record<
  (typeof PRODUCT_FOUR_STYLE_OPTIONS)[number],
  { beforeMyr: number; afterMyr: number }
> = {
  '【1号】已开盒确认款/未拆袋': { beforeMyr: 80, afterMyr: 70 },
  '【2号】已开盒确认款/未拆袋': { beforeMyr: 75, afterMyr: 65 },
  '【3号】已开盒确认款/未拆袋': { beforeMyr: 70, afterMyr: 60 },
  '【4号】已开盒确认款/未拆袋': { beforeMyr: 79, afterMyr: 69 },
  '【5号】已开盒确认款/未拆袋': { beforeMyr: 79, afterMyr: 69 },
  '【6号】已开盒确认款/未拆袋': { beforeMyr: 70, afterMyr: 60 },
  '【7号】已开盒确认款/未拆袋': { beforeMyr: 70, afterMyr: 60 },
  '【8号】已开盒确认款/未拆袋': { beforeMyr: 70, afterMyr: 60 },
  '一套8款': { beforeMyr: 259, afterMyr: 239 },
};
const PRODUCT_FIVE_STYLE_PRICE_BY_LABEL: Record<
  (typeof PRODUCT_FIVE_STYLE_OPTIONS)[number],
  { beforeMyr: number; afterMyr: number }
> = {
  'CP毛绒挂件 雨衣款': { beforeMyr: 79, afterMyr: 69 },
  '组合毛绒挂件 听音乐款': { beforeMyr: 79, afterMyr: 65 },
  '组合毛绒挂件 围巾款': { beforeMyr: 80, afterMyr: 60 },
};
const PRODUCT_FIVE_SOLD_OUT_OPTIONS = new Set<(typeof PRODUCT_FIVE_STYLE_OPTIONS)[number]>([
  'CP毛绒挂件 雨衣款',
]);

const PURCHASE_OPTIONS: Record<
  PurchaseOptionKey,
  {
    cartIdSuffix: string;
    label: { en: string; cn: string };
    beforeMyr: number;
    afterMyr: number;
  }
> = {
  blind: {
    cartIdSuffix: 'blind',
    label: { en: 'Random blind box 1 pc', cn: '随机盲盒 1个' },
    beforeMyr: 69,
    afterMyr: 59,
  },
  boxed: {
    cartIdSuffix: 'boxed-8',
    label: { en: 'Full case 8 pcs', cn: '端盒 8个' },
    beforeMyr: 472,
    afterMyr: 389,
  },
};

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, language, currency, formatPrice, unitsPerUsd } = useLanguageStore();
  const addItem = useCartStore((state) => state.addItem);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [purchaseOption, setPurchaseOption] = useState<PurchaseOptionKey | null>(null);
  const [selectedCustomStyle, setSelectedCustomStyle] = useState<string | null>(null);
  const [isThumbDragging, setIsThumbDragging] = useState(false);
  const [thumbDragMoved, setThumbDragMoved] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState<'featured' | 'newest' | 'highest' | 'lowest'>('featured');
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isLearnMoreOpen, setIsLearnMoreOpen] = useState(false);
  const [reviewStep, setReviewStep] = useState<1 | 2 | 3 | 4>(1);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [uploadedPhotos, setUploadedPhotos] = useState<File[]>([]);
  const [uploadedVideos, setUploadedVideos] = useState<File[]>([]);
  const thumbStripRef = useRef<HTMLDivElement | null>(null);
  const sortMenuRef = useRef<HTMLDivElement | null>(null);
  const photoInputRef = useRef<HTMLInputElement | null>(null);
  const videoInputRef = useRef<HTMLInputElement | null>(null);
  const isThumbDraggingRef = useRef(false);
  const thumbDragStartXRef = useRef(0);
  const thumbScrollStartLeftRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);

  const product = MOCK_PRODUCTS.find((p) => p.id === id);
  const productFolder = (product as { folderId?: string } | undefined)?.folderId;

  useEffect(() => {
    window.scrollTo(0, 0);
    setCurrentImageIndex(0);
    setQuantity(1);
    setPurchaseOption(null);
    setSelectedCustomStyle(null);
  }, [id]);

  useEffect(() => {
    if (id === '23') {
      setCurrentImageIndex(0);
    }
  }, [id, purchaseOption]);

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (!sortMenuRef.current) return;
      if (!sortMenuRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    };

    if (isSortOpen) {
      document.addEventListener('mousedown', onPointerDown);
    }

    return () => {
      document.removeEventListener('mousedown', onPointerDown);
    };
  }, [isSortOpen]);

  // Prefer local gallery images from product folder.
  const productGallerySuffixes = productFolder === 'Pingu MINI MEME'
    ? ['1', '2', '3', 'last']
    : productFolder === '线条小狗毛绒挂件'
      ? ['2', '3']
    : productFolder === '微缩场景狗狗'
      ? ['床', '食物', '卫生', '玩具', '牵引绳', '刷子', '手推车', '桌子', '一套8款', 'last']
    : productFolder === '微缩场景猫'
      ? ['1号', '2号', '3号', '4号', '5号', '6号', '7号', '8号', '一套8款', 'last']
    : productFolder === '山丘上的乡村草莓咖啡馆'
      ? ['1', '3', '4', '5', '7', '8', '一套8款', 'last']
    : productFolder === 'Petit Sample系列汉堡店RM'
      ? ['1', '2', '3', '4', '5', '6', '7', '8', '【整套8款】']
    : productFolder === '米菲兔的小小咖啡馆'
      ? ['1', '2', '3', '4', 'last', '【整套8款】']
    : productFolder === '比奇堡 章鱼哥的一天系列'
      ? ['2', '3', '4', '5', 'last']
      : ['2', '3', '4', 'last'];
  const product23StyleImage =
    id === '23' && productFolder && purchaseOption
      ? `/products/${encodeURIComponent(productFolder)}/${purchaseOption === 'blind' ? 'duo-fishing.png' : 'duo-raincoat.png'}`
      : null;
  const productImageVersionSuffix = id === '14' ? '?v=20260430' : id === '3' ? '?v=20260502' : id === '5' ? '?v=20260502-r2' : '';
  const resolvedMainImage =
    (id === '14' || id === '3' || id === '5') && productFolder
      ? `/products/${encodeURIComponent(productFolder)}/main.png${productImageVersionSuffix}`
      : product?.imageUrl;
  const productImages = product
    ? id === '23'
      ? [
          product.imageUrl,
          ...(product23StyleImage ? [product23StyleImage] : []),
          ...(productFolder
            ? productGallerySuffixes.map((suffix) => `/products/${encodeURIComponent(productFolder)}/${encodeURIComponent(`${suffix}.png`)}${productImageVersionSuffix}`)
            : []),
        ]
      : [
          resolvedMainImage ?? product.imageUrl,
          ...(productFolder
            ? productGallerySuffixes.map((suffix) => `/products/${encodeURIComponent(productFolder)}/${encodeURIComponent(`${suffix}.png`)}${productImageVersionSuffix}`)
            : []),
        ]
    : [];

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold text-bakery-brown mb-4">Product not found</h2>
        <Link to="/shop" className="text-pink-500 font-bold hover:underline">
          {t('product.backToShop')}
        </Link>
      </div>
    );
  }

  const relatedProducts = MOCK_PRODUCTS
    .filter((p) => p.category.en === product.category.en && p.id !== product.id)
    .slice(0, 4);

  const isPinguSeriesProduct = (product as any).series?.en === 'Pingu';
  const isPinguCameraBagProduct = product.id === '22';
  const isPinguDuoProduct = product.id === '23';
  const isPetDogMiniSceneProduct = product.id === '1';
  const isPetCatMiniSceneProduct = product.id === '4';
  const isStrawberryCafeProduct = product.id === '10';
  const isBurgerSampleProduct = product.id === '14';
  const isMiffyCafeProduct = product.id === '20';
  const isLineDogPlushPendantProduct = product.id === '5';
  const isCustomStyleProduct = isPetDogMiniSceneProduct || isPetCatMiniSceneProduct || isStrawberryCafeProduct || isBurgerSampleProduct || isMiffyCafeProduct || isLineDogPlushPendantProduct;
  const customStyleOptions = isPetDogMiniSceneProduct
    ? PRODUCT_ONE_STYLE_OPTIONS
    : isPetCatMiniSceneProduct
      ? PRODUCT_FOUR_STYLE_OPTIONS
      : isStrawberryCafeProduct
        ? PRODUCT_TEN_STYLE_OPTIONS
        : isBurgerSampleProduct
          ? PRODUCT_FOURTEEN_STYLE_OPTIONS
          : isMiffyCafeProduct
            ? PRODUCT_TWENTY_STYLE_OPTIONS
            : isLineDogPlushPendantProduct
              ? PRODUCT_FIVE_STYLE_OPTIONS
        : [];
  const customStyleImageByLabel: Record<string, string> = isPetDogMiniSceneProduct
    ? PRODUCT_ONE_STYLE_IMAGE_BY_LABEL
    : isPetCatMiniSceneProduct
      ? PRODUCT_FOUR_STYLE_IMAGE_BY_LABEL
      : isStrawberryCafeProduct
        ? PRODUCT_TEN_STYLE_IMAGE_BY_LABEL
        : isBurgerSampleProduct
          ? PRODUCT_FOURTEEN_STYLE_IMAGE_BY_LABEL
          : isMiffyCafeProduct
            ? PRODUCT_TWENTY_STYLE_IMAGE_BY_LABEL
            : isLineDogPlushPendantProduct
              ? PRODUCT_FIVE_STYLE_IMAGE_BY_LABEL
      : {};
  const isSiamFridgeMagnetBlindBagProduct = product.id === '3';
  const hasTwoOptions = (isPinguSeriesProduct || product.id === '6' || isSiamFridgeMagnetBlindBagProduct) && !isPinguCameraBagProduct;
  const isSquidwardSeriesProduct = product.id === '6';
  const purchaseOptionsForProduct: Record<PurchaseOptionKey, { cartIdSuffix: string; label: { en: string; cn: string }; beforeMyr: number; afterMyr: number }> =
    isSquidwardSeriesProduct
      ? {
          blind: { ...PURCHASE_OPTIONS.blind, beforeMyr: 89, afterMyr: 75 },
          boxed: { ...PURCHASE_OPTIONS.boxed, beforeMyr: 599, afterMyr: 569 },
        }
      : isPinguDuoProduct
      ? {
          blind: {
            ...PURCHASE_OPTIONS.blind,
            cartIdSuffix: 'duo-fishing',
            label: { en: 'Fishing Pingu & Pinga', cn: '摸鱼pingu&pinga' },
            beforeMyr: 69.9,
            afterMyr: 55.9,
          },
          boxed: {
            ...PURCHASE_OPTIONS.boxed,
            cartIdSuffix: 'duo-raincoat',
            label: { en: 'Raincoat Pingu & Pinga', cn: '雨衣pingu&pinga' },
            beforeMyr: 69.9,
            afterMyr: 55.9,
          },
        }
      : isSiamFridgeMagnetBlindBagProduct
      ? {
          blind: {
            ...PURCHASE_OPTIONS.blind,
            cartIdSuffix: 'random-blind-bag-1',
            label: { en: 'Random blind bag 1 pc', cn: '随机盲袋1个' },
            beforeMyr: 30,
            afterMyr: 23,
          },
          boxed: {
            ...PURCHASE_OPTIONS.boxed,
            cartIdSuffix: 'full-case-12',
            label: { en: 'Full case 12 pcs', cn: '端盒 12个' },
            beforeMyr: 170,
            afterMyr: 149,
          },
        }
      : PURCHASE_OPTIONS;
  const selectedPurchase = hasTwoOptions && purchaseOption ? purchaseOptionsForProduct[purchaseOption] : null;
  const requiresStyleSelection = hasTwoOptions || isCustomStyleProduct;
  const isSoldOutSelected =
    !!selectedCustomStyle &&
    ((isStrawberryCafeProduct &&
      PRODUCT_TEN_SOLD_OUT_OPTIONS.has(selectedCustomStyle as (typeof PRODUCT_TEN_STYLE_OPTIONS)[number])) ||
      (isMiffyCafeProduct &&
        PRODUCT_TWENTY_SOLD_OUT_OPTIONS.has(selectedCustomStyle as (typeof PRODUCT_TWENTY_STYLE_OPTIONS)[number])) ||
      (isLineDogPlushPendantProduct &&
        PRODUCT_FIVE_SOLD_OUT_OPTIONS.has(selectedCustomStyle as (typeof PRODUCT_FIVE_STYLE_OPTIONS)[number])));
  const canAddToCart = hasTwoOptions ? !!selectedPurchase : (isCustomStyleProduct ? (!!selectedCustomStyle && !isSoldOutSelected) : true);
  const optionPriceList = hasTwoOptions ? Object.values(purchaseOptionsForProduct) : [];
  const cheapestOptionMyr =
    optionPriceList.length > 0
      ? optionPriceList.reduce(
          (min, option) => ({
            beforeMyr: Math.min(min.beforeMyr, option.beforeMyr),
            afterMyr: Math.min(min.afterMyr, option.afterMyr),
          }),
          { beforeMyr: Number.POSITIVE_INFINITY, afterMyr: Number.POSITIVE_INFINITY }
        )
      : null;
  const customSelectedPricing =
    isCustomStyleProduct && selectedCustomStyle
      ? (isPetDogMiniSceneProduct
          ? PRODUCT_ONE_STYLE_PRICE_BY_LABEL[selectedCustomStyle as (typeof PRODUCT_ONE_STYLE_OPTIONS)[number]]
          : isPetCatMiniSceneProduct
            ? PRODUCT_FOUR_STYLE_PRICE_BY_LABEL[selectedCustomStyle as (typeof PRODUCT_FOUR_STYLE_OPTIONS)[number]]
            : isStrawberryCafeProduct
              ? PRODUCT_TEN_STYLE_PRICE_BY_LABEL[selectedCustomStyle as (typeof PRODUCT_TEN_STYLE_OPTIONS)[number]]
              : isBurgerSampleProduct
                ? PRODUCT_FOURTEEN_STYLE_PRICE_BY_LABEL[selectedCustomStyle as (typeof PRODUCT_FOURTEEN_STYLE_OPTIONS)[number]]
            : isMiffyCafeProduct
              ? PRODUCT_TWENTY_STYLE_PRICE_BY_LABEL[selectedCustomStyle as (typeof PRODUCT_TWENTY_STYLE_OPTIONS)[number]]
              : isLineDogPlushPendantProduct
                ? PRODUCT_FIVE_STYLE_PRICE_BY_LABEL[selectedCustomStyle as (typeof PRODUCT_FIVE_STYLE_OPTIONS)[number]]
              : null)
      : null;
  const customCheapestPricing = (isPetDogMiniSceneProduct || isPetCatMiniSceneProduct || isStrawberryCafeProduct || isBurgerSampleProduct || isMiffyCafeProduct || isLineDogPlushPendantProduct)
    ? Object.values(
        isPetDogMiniSceneProduct
          ? PRODUCT_ONE_STYLE_PRICE_BY_LABEL
          : isPetCatMiniSceneProduct
            ? PRODUCT_FOUR_STYLE_PRICE_BY_LABEL
            : isStrawberryCafeProduct
              ? PRODUCT_TEN_STYLE_PRICE_BY_LABEL
              : isBurgerSampleProduct
                ? PRODUCT_FOURTEEN_STYLE_PRICE_BY_LABEL
                : isMiffyCafeProduct
                  ? PRODUCT_TWENTY_STYLE_PRICE_BY_LABEL
                  : PRODUCT_FIVE_STYLE_PRICE_BY_LABEL
      ).reduce(
        (min, option) => ({
          beforeMyr: Math.min(min.beforeMyr, option.beforeMyr),
          afterMyr: Math.min(min.afterMyr, option.afterMyr),
        }),
        { beforeMyr: Number.POSITIVE_INFINITY, afterMyr: Number.POSITIVE_INFINITY }
      )
    : null;
  const summaryLine =
    hasTwoOptions
      ? product.description[language].split('\n').map((l) => l.trim()).find(Boolean) ?? ''
      : '';
  const selectedStyleLabel = hasTwoOptions
    ? (selectedPurchase?.label[language] ?? (language === 'cn' ? '未选择款式' : 'Style not selected'))
    : isCustomStyleProduct
      ? (selectedCustomStyle ?? (language === 'cn' ? '未选择款式' : 'Style not selected'))
      : null;
  const selectedAfterUsd =
    hasTwoOptions && selectedPurchase
      ? (!isSquidwardSeriesProduct && !isPinguDuoProduct && purchaseOption === 'boxed' && currency === 'TWD'
          ? 3088 / unitsPerUsd.TWD
          : selectedPurchase.afterMyr / unitsPerUsd.MYR)
      : null;
  const selectedBeforeUsd =
    hasTwoOptions && selectedPurchase ? selectedPurchase.beforeMyr / unitsPerUsd.MYR : null;
  const displayOptionAfterUsd =
    selectedAfterUsd ?? (cheapestOptionMyr ? cheapestOptionMyr.afterMyr / unitsPerUsd.MYR : null);
  const displayOptionBeforeUsd =
    selectedBeforeUsd ?? (cheapestOptionMyr ? cheapestOptionMyr.beforeMyr / unitsPerUsd.MYR : null);
  const singlePriceAfterUsd = isPinguCameraBagProduct
    ? 69.9 / unitsPerUsd.MYR
    : customSelectedPricing
      ? customSelectedPricing.afterMyr / unitsPerUsd.MYR
      : customCheapestPricing
        ? customCheapestPricing.afterMyr / unitsPerUsd.MYR
      : product.price;
  const singlePriceBeforeUsd = isPinguCameraBagProduct
    ? 79.9 / unitsPerUsd.MYR
    : customSelectedPricing
      ? customSelectedPricing.beforeMyr / unitsPerUsd.MYR
      : customCheapestPricing
        ? customCheapestPricing.beforeMyr / unitsPerUsd.MYR
      : product.price * 1.2;
  const isPinguMiniTheaterProduct = product.id === '21';
  const isTextOnlyRatingsProduct = product.id === '1';
  const isMixedRatingsProduct = product.id === '4';
  const isStrawberryCafeRatingsProduct = product.id === '10';
  const isBurgerTextRatingsProduct = product.id === '14';
  const isMiffyRatingsProduct = product.id === '20';
  const numericProductId = Number(product.id);
  const generatedReviewCount = Number.isFinite(numericProductId) ? 80 + ((numericProductId * 17) % 260) : 147;
  const totalReviews = isPinguMiniTheaterProduct ? 17 : generatedReviewCount;
  const encodedProductFolder = productFolder ? encodeURIComponent(productFolder) : '';
  const ratingImageVersionSuffix = id === '3' ? '?v=20260502-r1' : '';
  const ratingImageBasePath = encodedProductFolder
    ? `/products/${encodedProductFolder}/ratings`
    : '/products/Pingu%20MINI%20MEME/ratings';
  const ratingImagePaths = [
    ...(productFolder === 'pingu-45th-crossbody'
      ? [
          `${ratingImageBasePath}/Screenshot%202026-04-25%20003926.png`,
          `${ratingImageBasePath}/Screenshot%202026-04-25%20003934.png`,
          `${ratingImageBasePath}/Screenshot%202026-04-25%20003948.png`,
          `${ratingImageBasePath}/Screenshot%202026-04-25%20003955.png`,
          `${ratingImageBasePath}/Screenshot%202026-04-25%20004002.png`,
          `${ratingImageBasePath}/Screenshot%202026-04-25%20004009.png`,
          `${ratingImageBasePath}/Screenshot%202026-04-25%20004016.png`,
          `${ratingImageBasePath}/Screenshot%202026-04-25%20004031.png`,
          `${ratingImageBasePath}/Screenshot%202026-04-25%20004039.png`,
        ]
      : [
          `${ratingImageBasePath}/1.png${ratingImageVersionSuffix}`,
          `${ratingImageBasePath}/2.png${ratingImageVersionSuffix}`,
          `${ratingImageBasePath}/3.png${ratingImageVersionSuffix}`,
          `${ratingImageBasePath}/4.png${ratingImageVersionSuffix}`,
          `${ratingImageBasePath}/5.png${ratingImageVersionSuffix}`,
          `${ratingImageBasePath}/6.png${ratingImageVersionSuffix}`,
          `${ratingImageBasePath}/7.png${ratingImageVersionSuffix}`,
          `${ratingImageBasePath}/8.png${ratingImageVersionSuffix}`,
          `${ratingImageBasePath}/9.png${ratingImageVersionSuffix}`,
          `${ratingImageBasePath}/10.png${ratingImageVersionSuffix}`,
        ]),
  ];
  const highlightImagePaths =
    productFolder === 'pingu'
      ? [
          '/products/pingu/desc%20pic/Screenshot%202026-04-14%20234306.png',
          '/products/pingu/desc%20pic/Screenshot%202026-04-14%20234327.png',
        ]
      : productFolder === 'pingu-45th-crossbody'
      ? [
          '/products/pingu-45th-crossbody/desc%20pic/Screenshot%202026-04-25%20002752.png',
          '/products/pingu-45th-crossbody/desc%20pic/Screenshot%202026-04-25%20002758.png',
        ]
      : productFolder === '比奇堡 章鱼哥的一天系列'
      ? [
          '/products/%E6%AF%94%E5%A5%87%E5%A0%A1%20%E7%AB%A0%E9%B1%BC%E5%93%A5%E7%9A%84%E4%B8%80%E5%A4%A9%E7%B3%BB%E5%88%97/desc%20pic/Screenshot%202026-04-15%20010318.png',
          '/products/%E6%AF%94%E5%A5%87%E5%A0%A1%20%E7%AB%A0%E9%B1%BC%E5%93%A5%E7%9A%84%E4%B8%80%E5%A4%A9%E7%B3%BB%E5%88%97/desc%20pic/Screenshot%202026-04-15%20010334.png',
        ]
      : [
          '/products/Pingu%20MINI%20MEME/decs%20pic/Screenshot%202026-04-14%20001907.png',
          '/products/Pingu%20MINI%20MEME/decs%20pic/Screenshot%202026-04-14%20001732.png',
        ];
  const highlightBlocks = isPetDogMiniSceneProduct
    ? [
        {
          badge: language === 'cn' ? '玩法展示' : 'SHOWCASE',
          title: language === 'cn' ? '云养狗实现！RE-MENT 治愈系“狗狗日常”食玩开箱 🐾' : 'Dog-Loving Dreams, Miniature Edition',
          body: language === 'cn'
            ? '养狗人的DNA动了！RE-MENT 这一套真的把养宠生活还原到了极致。\n\n✨ 全套 8 款名场面：\n从“在斑马线上赖着不走”的倔强柴犬，到“拆家后一脸无辜”的贵宾，每一个小细节都写满了真实！推车、尿垫、甚至是那袋小零食，精致得让人想立刻给家里的娃屋安排上。\n\n✨ 细节控必入：\n不只是模型，更是一种生活方式的微缩。不管是摆在桌面还是拍照，都治愈感满满！'
            : 'A super detailed RE-MENT miniature set that recreates everyday dog-owner moments.',
          badgeClass: 'bg-[#a7ff9f] text-[#3d4b39]',
          image: `/products/${encodeURIComponent(productFolder ?? '')}/desc%20pic/${encodeURIComponent('一套8款.png')}`,
        },
      ]
    : isBurgerSampleProduct
    ? [
        {
          badge: language === 'cn' ? '优质体验' : 'PREMIUM EXPERIENCE',
          title: language === 'cn' ? '美式复古风拉满！RE-MENT“R&M 汉堡店”开箱 🍔' : 'RE-MENT R&M Burger Shop Unboxing',
          body:
            language === 'cn'
              ? '这套食玩真的太有加州公路电影的质感了！红黄配色加上经典的汉堡小人卡通形象，满满的复古快餐店氛围。\n\n✨ 极致的细节还原：\n\n薯条：连包装纸的纹理都清晰可见。\n\n家具：那个带金属边框的白色小圆桌和儿童座椅（托盘还能拆卸！），简直是娃屋装修的神器。\n\n质感：芝士融化的流心感和可乐杯上的水珠感，隔着屏幕都感觉到香气了。\n\n✨ 微缩场景大师：\n如果是整盒端，还可以利用包装盒还原出完整的店铺背景。快给你的小人儿们安排一场地道的美式午餐吧！'
              : 'This set is packed with retro American diner vibes, rich miniature detail, and display-ready atmosphere.',
          badgeClass: 'bg-[#a7ff9f] text-[#3d4b39]',
          image: `/products/${encodeURIComponent(productFolder ?? '')}/desc%20pic/1.png`,
        },
      ]
    : isStrawberryCafeProduct
    ? [
        {
          badge: language === 'cn' ? '优质体验' : 'PREMIUM EXPERIENCE',
          title: language === 'cn' ? '草莓控尖叫！RE-MENT 绝美“田园草莓咖啡馆”开箱' : 'Strawberry Lovers, This One Is For You',
          body:
            language === 'cn'
              ? '这套食玩真的太懂少女心了！满屏的红色草莓，瞬间把人带到了午后阳光下的乡间咖啡馆。\n\n✨ 细节细节还是细节：\n精致的蕾丝桌布、木质质感的复古家具，还有那些甚至能看到草莓籽纹理的甜点……RE-MENT 再次用实力证明了什么是“微缩界的装修大师”。\n\n✨ 氛围感穿搭/摆拍必备：\n不管是给娃娃布置餐厅场景，还是摆在桌面上当装饰，这一套的颜值都无懈可击！特别是那个沙漏和刺绣靠垫，田园怀旧风拉满！\n\n快来点一份草莓圣代，享受你的惬意午后吧！'
              : 'A beautiful countryside strawberry cafe miniature set with rich details and perfect display vibes.',
          badgeClass: 'bg-[#a7ff9f] text-[#3d4b39]',
          image: `/products/${encodeURIComponent(productFolder ?? '')}/desc%20pic/${encodeURIComponent('1.png')}`,
        },
      ]
    : isMiffyCafeProduct
    ? [
        {
          badge: language === 'cn' ? '优质体验' : 'PREMIUM EXPERIENCE',
          title: language === 'cn' ? '萌力觉醒！RE-MENT“米菲小咖啡馆”开箱 🐰' : 'Miffy Tiny Cafe Unboxing',
          body:
            language === 'cn'
              ? '✨ 治愈系首选：\n不管是资深米菲粉，还是喜欢收集食玩的收藏家，这一套绝对是提升桌面幸福感的必备好物！'
              : 'A soothing pick for both Miffy fans and miniature collectors.',
          badgeClass: 'bg-[#a7ff9f] text-[#3d4b39]',
          image: `/products/${encodeURIComponent(productFolder ?? '')}/desc%20pic/${encodeURIComponent('1.png')}`,
        },
      ]
    : isPetCatMiniSceneProduct
    ? [
        {
          badge: language === 'cn' ? '品质保障' : 'QUALITY GUARANTEED',
          title: language === 'cn' ? '全员猫奴请集合！RE-MENT 治愈新作“猫田先生的日常”' : 'All Cat Lovers, Assemble!',
          body:
            language === 'cn'
              ? '这套食玩真的太懂猫了！把猫咪那种“虽然很可爱但总在捣乱”的性格还原得活灵活现。\n\n✨ 沉浸式云养猫：\n谁懂啊！坐在电脑键盘上不让你工作的橘猫、比起昂贵玩具更爱纸箱的怪癖，还有听到罐头声就瞬移到爬架顶端的黑猫……每一款都是我家主子的真实写照！\n\n✨ 细节控的狂欢：\n自动喂食机、监控摄像头、连猫砂盆里的“小团团”都做出来了！无论是单独摆放还是作为娃屋配件，精细度都满分。\n\n快来认领属于你的那只“捣蛋鬼”吧！'
              : 'This RE-MENT set perfectly captures the chaotic-yet-cute personality of cats.',
          badgeClass: 'bg-[#ffd7db] text-[#7f4b52]',
          image: `/products/${encodeURIComponent(productFolder ?? '')}/desc%20pic/${encodeURIComponent('一套8款.png')}`,
        },
      ]
    : isPinguMiniTheaterProduct
    ? [
        {
          badge: language === 'cn' ? '优质体验' : 'PREMIUM EXPERIENCE',
          title: language === 'cn' ? '全款图鉴' : 'Full Collection Guide',
          body:
            language === 'cn'
              ? '8 款基本款 + 1 款隐藏款，记录章鱼哥的“斜杠人生”。隐藏款 (Hidden Edition)：名字：帅哥时间（即经典的“帅章鱼哥”造型）。抽中概率：1/72。'
              : '8 standard designs + 1 hidden design, capturing Squidward\'s many-sided life. Hidden Edition: “Handsome Time” (the classic Handsome Squidward look). Draw rate: 1/72.',
          badgeClass: 'bg-[#a7ff9f] text-[#3d4b39]',
          image: highlightImagePaths[0] ?? (productImages[0] ?? product.imageUrl),
        },
      ]
    : isSiamFridgeMagnetBlindBagProduct
    ? [
        {
          badge: language === 'cn' ? '玩法展示' : 'SHOWCASE',
          title: language === 'cn' ? '解锁隐藏玩法 拼出专属场景' : 'Unlock Hidden Gameplay, Build Your Own Scene',
          body: language === 'cn'
            ? '全系列采用独创模块化设计，每一款边缘均可精准契合。随心收集，自由拼接，在家就能组建你的专属动漫微缩世界。'
            : 'The entire series adopts an original modular design, and every piece connects precisely at the edges. Collect freely, mix and match as you like, and build your own anime-style miniature world at home.',
          badgeClass: 'bg-[#a7ff9f] text-[#3d4b39]',
          image: `/products/${encodeURIComponent(productFolder ?? '')}/desc%20pic/1.png`,
        },
        {
          badge: language === 'cn' ? '玩法展示' : 'SHOWCASE',
          title: language === 'cn' ? '奇遇隐藏款 闪粉滴胶工艺' : 'Hidden Surprise, Glitter Resin Craft',
          body: language === 'cn'
            ? '特别推出限定“打工田中”隐藏款，配以晶莹剔透的闪粉滴胶工艺。光影下流光溢彩，收藏价值与颜值双倍升级，等待幸运的你来开启。'
            : 'Featuring the limited hidden edition “Working Tanaka,” paired with crystal-clear glitter resin craftsmanship. It shimmers beautifully under light, delivering both elevated collectible value and visual appeal.',
          badgeClass: 'bg-[#ffd7db] text-[#7f4b52]',
          image: `/products/${encodeURIComponent(productFolder ?? '')}/desc%20pic/2.png`,
        },
      ]
    : [
        {
          badge: language === 'cn' ? '优质体验' : 'PREMIUM EXPERIENCE',
          title: isPinguCameraBagProduct
            ? (language === 'cn' ? '多才多艺的“显眼包”' : 'A Multi-Talented Scene-Stealer')
            : (language === 'cn' ? '全款图鉴' : 'Full Collection Guide'),
          body:
            isPinguCameraBagProduct
              ? (language === 'cn'
                  ? '大手机也能轻松装下的“大肚量”，连耳机都有专属的镜头小口袋。'
                  : 'Spacious enough for larger phones, with a dedicated lens pocket for your earbuds.')
              : (language === 'cn'
                  ? '8 款基本款 + 1 款隐藏款，记录章鱼哥的“斜杠人生”。隐藏款 (Hidden Edition)：名字：帅哥时间（即经典的“帅章鱼哥”造型）。抽中概率：1/72。'
                  : '8 standard designs + 1 hidden design, capturing Squidward\'s many-sided life. Hidden Edition: “Handsome Time” (the classic Handsome Squidward look). Draw rate: 1/72.'),
          badgeClass: 'bg-[#a7ff9f] text-[#3d4b39]',
          image: highlightImagePaths[0] ?? (productImages[0] ?? product.imageUrl),
        },
        {
          badge: language === 'cn' ? '品质保障' : 'QUALITY GUARANTEED',
          title: isPinguCameraBagProduct
            ? (language === 'cn' ? '今日份 OOTD 满分！' : 'Today’s OOTD: Full Marks!')
            : (language === 'cn' ? '可动、可站立、可换装，自由度极高' : 'Posable, Standable, and Dress-Up Ready'),
          body:
            isPinguCameraBagProduct
              ? (language === 'cn'
                  ? '背上 Pingu 相机包，在街头随时捕捉可爱瞬间，回头率 200%。'
                  : 'Carry the Pingu camera bag and capture cute moments anytime on the street. Instant head-turner.')
              : (language === 'cn'
                  ? '玩法 1：可站立凹造型。内置钢丝：玩偶身体内部含有骨架（钢丝），手脚都可以自由弯曲。百变Pose：不仅可以站立，还能摆出各种搞怪、厌世的经典姿势。玩法 2：换装玩法。配件丰富：衣服、腿套、袖套、发带、耳机等配件大多可以拆卸更换。注意：部分特殊款式（如连体服款、隐藏款）的服饰是不可脱卸的。'
                  : 'Play Mode 1: standing poses. Built-in wire frame allows flexible bending in arms and legs for expressive poses. Play Mode 2: dress-up. Most accessories such as outfits, leg covers, sleeve covers, headbands, and headphones are removable and swappable. Note: some special styles (such as one-piece outfits and hidden editions) have non-removable clothing.'),
          badgeClass: 'bg-[#ffd7db] text-[#7f4b52]',
          image: highlightImagePaths[1] ?? (productImages[1] ?? product.imageUrl),
        },
      ];
  let ratingCards = [
    {
      id: 'rating-1',
      name: 'A-Ting',
      date: '4/14/2026',
      rating: 5,
      text:
        language === 'cn'
          ? '这套真的很有梗，章鱼哥表情很到位，摆起来超疗愈。'
          : 'This set is hilarious. Squidward expressions are perfect and very soothing on desk.',
      item: product.name[language],
      style: `${language === 'cn' ? '款式：' : 'item type: '}${PURCHASE_OPTIONS.blind.label[language]}`,
      image: ratingImagePaths[0],
    },
    {
      id: 'rating-2',
      name: 'Mia Chen',
      date: '4/12/2026',
      rating: 5,
      text:
        language === 'cn'
          ? '做工比预期好，换装配件很可爱，拿来拍短视频效果很好。'
          : 'Build quality is better than expected. Dress-up parts are cute and great for videos.',
      item: product.name[language],
      style: `${language === 'cn' ? '款式：' : 'item type: '}${PURCHASE_OPTIONS.boxed.label[language]}`,
      image: ratingImagePaths[1],
    },
    {
      id: 'rating-3',
      name: '小米 Hsu',
      date: '4/11/2026',
      rating: 5,
      text:
        language === 'cn'
          ? '最喜欢厌世脸那款，超有章鱼哥灵魂，朋友来都问在哪里买。'
          : 'Love the tired-face version most. Friends keep asking where I got it.',
      item: product.name[language],
      style: `${language === 'cn' ? '款式：' : 'item type: '}${PURCHASE_OPTIONS.blind.label[language]}`,
      image: ratingImagePaths[2],
    },
    {
      id: 'rating-4',
      name: 'Coco Lin',
      date: '4/10/2026',
      rating: 4,
      text:
        language === 'cn'
          ? '包装很完整，开盒仪式感不错，隐藏款希望下次抽到。'
          : 'Packaging was solid and unboxing felt great. Hoping for hidden edition next time.',
      item: product.name[language],
      style: `${language === 'cn' ? '款式：' : 'item type: '}${PURCHASE_OPTIONS.blind.label[language]}`,
      image: ratingImagePaths[3],
    },
    {
      id: 'rating-5',
      name: '阿乐 Wang',
      date: '4/9/2026',
      rating: 5,
      text:
        language === 'cn'
          ? '放在办公桌超吸睛，同事都说这系列很懂上班人的心情。'
          : 'Looks amazing on my desk. Coworkers say this series truly gets office mood.',
      item: product.name[language],
      style: `${language === 'cn' ? '款式：' : 'item type: '}${PURCHASE_OPTIONS.boxed.label[language]}`,
      image: ratingImagePaths[4],
    },
    {
      id: 'rating-6',
      name: 'Yuki Tsai',
      date: '4/8/2026',
      rating: 5,
      text:
        language === 'cn'
          ? '每只造型都很有故事感，成套排开像小小剧场。'
          : 'Each figure feels story-driven. Full set display looks like a mini theater.',
      item: product.name[language],
      style: `${language === 'cn' ? '款式：' : 'item type: '}${PURCHASE_OPTIONS.boxed.label[language]}`,
      image: ratingImagePaths[5],
    },
    {
      id: 'rating-7',
      name: '小鹿 Chou',
      date: '4/7/2026',
      rating: 4,
      text:
        language === 'cn'
          ? '细节不错，颜色也准，整体满意，会再回购。'
          : 'Good details and accurate colors. Overall satisfied and will buy again.',
      item: product.name[language],
      style: `${language === 'cn' ? '款式：' : 'item type: '}${PURCHASE_OPTIONS.blind.label[language]}`,
      image: ratingImagePaths[6],
    },
    {
      id: 'rating-8',
      name: 'Nana H.',
      date: '4/6/2026',
      rating: 5,
      text:
        language === 'cn'
          ? '章鱼哥粉丝必收，换装玩法很有趣，一摆就是半小时。'
          : 'Must-have for Squidward fans. Dress-up play is fun and addictive.',
      item: product.name[language],
      style: `${language === 'cn' ? '款式：' : 'item type: '}${PURCHASE_OPTIONS.boxed.label[language]}`,
      image: ratingImagePaths[7],
    },
    {
      id: 'rating-9',
      name: '阿Q',
      date: '4/5/2026',
      rating: 5,
      text:
        language === 'cn'
          ? '收到就立刻拍照发限动，朋友都说很可爱又很有梗。'
          : 'Posted it on stories right away. Friends all said it is cute and witty.',
      item: product.name[language],
      style: `${language === 'cn' ? '款式：' : 'item type: '}${PURCHASE_OPTIONS.blind.label[language]}`,
      image: ratingImagePaths[8],
    },
    {
      id: 'rating-10',
      name: 'Vivi Kuo',
      date: '4/4/2026',
      rating: 5,
      text:
        language === 'cn'
          ? '系列完成度很高，隐藏款设定也很有趣，期待下一弹。'
          : 'Great series consistency. Hidden edition concept is fun. Looking forward to next wave.',
      item: product.name[language],
      style: `${language === 'cn' ? '款式：' : 'item type: '}${PURCHASE_OPTIONS.boxed.label[language]}`,
      image: ratingImagePaths[9],
    },
  ];
  if (isPinguMiniTheaterProduct) {
    const pinguMiniNames = [
      '小葵',
      'Ariel Hsu',
      '阿庭',
      'Momo Lin',
      '77 Chen',
      'Yuki',
      '阿鹿',
      'Nina Tsai',
      '小彤',
      'Vivi Kuo',
    ];
    const pinguMiniTextsCn = [
      '这组真的可爱，脸的表情很有戏，摆桌上会一直看。',
      '今天拆到想要的那只，超开心，拍照很上镜。',
      '做工比预期好，衣服细节有做出来，不会太廉价。',
      '朋友来我家第一眼就看到它，还问我在哪里买的。',
      '我买随机盒，运气不错，抽到很喜欢的款式。',
      '尺寸刚好，放电脑旁边不占位，疗愈感很够。',
      '整体配色很舒服，实物跟图差不多，没有翻车。',
      '这系列很有故事感，一排摆起来像小剧场。',
      '包装保护做得不错，到手没有压坏。',
      '已经想补第二盒了，越看越喜欢。',
    ];
    const pinguMiniTextsEn = [
      'Super cute set. The facial expression is full of personality.',
      'Pulled the one I wanted today. Really happy with it.',
      'Better quality than expected. Outfit details are nicely done.',
      'Friends noticed it right away and asked where I bought it.',
      'Bought a random box and got a style I really like.',
      'Perfect size for a desk setup. Very comforting to look at.',
      'Color tones are great in person and close to listing photos.',
      'This line feels story-driven. Looks like a mini stage when displayed.',
      'Packaging was secure and the figure arrived safely.',
      'Already planning to get another box. It grows on you.',
    ];
    ratingCards = ratingCards.map((card, idx) => ({
      ...card,
      name: pinguMiniNames[idx] ?? card.name,
      text: language === 'cn' ? (pinguMiniTextsCn[idx] ?? card.text) : (pinguMiniTextsEn[idx] ?? card.text),
    }));
  }
  if (isTextOnlyRatingsProduct) {
    const petSceneNames = ['柴柴控99', '云养狗阿喵', 'NekoMomo', '狗狗日报', 'MiuMiu宅', '吃土也要买', 'PawPaw', '泡面研究员', '夏夜晚风'];
    const petSceneStyles = [
      '【床】已开盒确认款',
      '【食物】已开盒确认款',
      '【卫生】已开盒确认款',
      '【玩具】已开盒确认款',
      '【牵引绳】已开盒确认款',
      '【刷子】已开盒确认款',
      '【手推车】已开盒确认款',
      '【桌子】已开盒确认款',
      '一套8款',
    ];
    const petSceneTextsCn = [
      '这套真的超有代入感，狗狗日常细节做得很真实，摆起来像在看小剧场。',
      '最喜欢整套的生活感，小配件很细，拍照特别出片。',
      '开盒体验很治愈，每一款都有自己的故事感，不会重复无聊。',
      '细节控会很满意，桌面陈列后整体氛围很温柔。',
      '配件比例和颜色都在线，放在娃屋场景里刚刚好。',
      '本来只想买一款，结果看到全套后直接想收齐。',
      '做工比预期好很多，边角处理干净，整体质感不错。',
      '很适合喜欢微缩场景的人，摆拍和收藏都很值。',
      '朋友来家里都问链接，整套完成度很高，治愈度拉满。',
    ];
    const petSceneTextsEn = [
      'This set feels super immersive. Daily dog-life details are very realistic.',
      'Love the lifestyle vibe. Tiny accessories look amazing in photos.',
      'Very soothing unboxing. Each piece has its own little story.',
      'Great for detail lovers. Displaying the full set feels cozy.',
      'Proportions and colors are on point for miniature scenes.',
      'Wanted one piece at first, then ended up wanting the full set.',
      'Build quality is better than expected with clean finishing.',
      'Perfect for miniature collectors and desk scene styling.',
      'Friends keep asking for the link. The whole set looks complete.',
    ];
    ratingCards = ratingCards.slice(0, 9).map((card, idx) => ({
      ...card,
      name: petSceneNames[idx] ?? card.name,
      text: language === 'cn' ? (petSceneTextsCn[idx] ?? card.text) : (petSceneTextsEn[idx] ?? card.text),
      style: `${language === 'cn' ? '款式：' : 'item type: '}${petSceneStyles[idx] ?? '【床】已开盒确认款'}`,
      item: product.name[language],
      image: '',
      rating: idx === 3 || idx === 7 ? 4 : 5,
    }));
  }
  if (isMixedRatingsProduct) {
    const catNames = ['喵喵子', '阿庭Hsu', '团子控', 'Rina Chen', '奶油爪爪', '小鹿Lin', '77喵', 'Momo K.'];
    const catStyles = [
      '【1号】已开盒确认款/未拆袋',
      '【2号】已开盒确认款/未拆袋',
      '【3号】已开盒确认款/未拆袋',
      '【4号】已开盒确认款/未拆袋',
      '【5号】已开盒确认款/未拆袋',
      '【6号】已开盒确认款/未拆袋',
      '【7号】已开盒确认款/未拆袋',
      '一套8款',
    ];
    const catTextsCn = [
      '真的特别可爱，打算再入手一套了，质量非常好，没有盒损。里面的蛋纸都非常完整',
      '小玩意做的很精致，孩子很喜欢，买了4套了。',
      '整体评价：有小猫咪的铲屎官一定要入的一套 使用手感：很好瑕疵很少',
      '放在桌面真的很疗愈，细节比想象中多，越看越喜欢。',
      '这套比例做得很好，跟娃屋搭起来非常自然，拍照很好看。',
      '包装挺稳的，到手没有压坏，配件都很完整。',
      '猫砂盆和喂食机这些小细节很加分，朋友看了都想买。',
      '整套摆出来氛围感很强，猫奴看到基本都会心动。',
    ];
    const catTextsEn = [
      'Super cute. I am planning to get another set. Great quality and no box damage.',
      'Small pieces are very detailed. My kid loves it and we already bought 4 sets.',
      'Overall: cat owners should definitely get this set. Good feel, very few defects.',
      'Very soothing on desk display. More details than expected.',
      'Great proportions for mini scenes and photos look amazing.',
      'Packaging was secure and all parts arrived complete.',
      'The litter box and feeder details are a huge plus.',
      'The full set gives a really cozy cat-life atmosphere.',
    ];
    ratingCards = catNames.map((name, idx) => ({
      id: `cat-rating-${idx + 1}`,
      name,
      date: `4/${28 - idx}/2026`,
      rating: idx === 3 || idx === 6 ? 4 : 5,
      text: language === 'cn' ? catTextsCn[idx] : catTextsEn[idx],
      item: product.name[language],
      style: `${language === 'cn' ? '款式：' : 'item type: '}${catStyles[idx]}`,
      image: idx < 3 ? `${ratingImageBasePath}/${idx + 1}.png` : '',
    }));
  }
  if (isStrawberryCafeRatingsProduct) {
    const cafeNames = ['草莓牛乳', 'Mika Chen', '甜点脑袋', 'Alyssa', '云朵奶油', '小莓', 'Kiki Hsu', 'Momo', '阿玉'];
    const cafeStyles = [
      '【1号】已开盒确认款',
      '【3号】已开盒确认款',
      '【4号】已开盒确认款',
      '【5号】已开盒确认款',
      '【7号】已开盒确认款',
      '【8号】已开盒确认款',
      '一套8款',
      '【1号】已开盒确认款',
      '【4号】已开盒确认款',
    ];
    const cafeTextsCn = [
      '包装非常结实，盒子八角尖尖，实物太可爱了！',
      '特别特别好看，是送给好朋友的生日礼物，她很喜欢',
      '😋🍓🍓🍓萌哭我了',
      '真好看。量大管饱',
      '做工精细，拆盒很开心。这个件很多！推荐购买！',
      '收到货就觉得特别可爱，很喜欢。',
      '不错，好看，喜欢，还买了其他的期待到货',
      '这套摆出来真的很有氛围，颜色很舒服，越看越喜欢。',
      '细节做得不错，拿来拍照很出片，草莓元素太治愈了。',
    ];
    const cafeTextsEn = [
      'Packaging is very solid and the actual items are super cute.',
      'Looks amazing. I bought this as a birthday gift and my friend loved it.',
      'So cute I almost cried. Strawberry vibes are perfect.',
      'Looks great. Lots of pieces in the box.',
      'Fine craftsmanship and very fun to unbox. Highly recommended.',
      'Loved it right after opening. Very cute in person.',
      'Nice and pretty. I bought more styles and cannot wait.',
      'Great atmosphere when displayed. The color palette is lovely.',
      'Detail quality is good and photos come out beautifully.',
    ];
    ratingCards = cafeNames.map((name, idx) => ({
      id: `cafe-rating-${idx + 1}`,
      name,
      date: `4/${28 - idx}/2026`,
      rating: idx === 4 || idx === 8 ? 4 : 5,
      text: language === 'cn' ? cafeTextsCn[idx] : cafeTextsEn[idx],
      item: product.name[language],
      style: `${language === 'cn' ? '款式：' : 'item type: '}${cafeStyles[idx]}`,
      image: idx < 4 ? `${ratingImageBasePath}/${idx + 1}.png` : '',
    }));
  }
  if (isBurgerTextRatingsProduct) {
    const burgerNames = ['汉堡日记', 'Momo酱', '阿鹿', '小莓汽水', 'Rina Kuo', '可乐冰块', 'Kiki Lin', 'Pocky'];
    const burgerStyles = [
      '【1号】已开盒确认款/未拆袋',
      '【2号】已开盒确认款/未拆袋',
      '【3号】已开盒确认款/未拆袋',
      '【4号】已开盒确认款/未拆袋',
      '【5号】已开盒确认款/未拆袋',
      '【6号】已开盒确认款/未拆袋',
      '【7号】已开盒确认款/未拆袋',
      '【整套8款】',
    ];
    const burgerTextsCn = [
      '很好，便宜，一直购买，很喜欢',
      '复古配色很有感觉，摆在桌上拍照很出片。',
      '配件细节比想象中好，薯条和可乐杯做得很精致。',
      '这套氛围很完整，单独摆一个角落都很好看。',
      '开盒体验不错，整体做工整齐，没有明显瑕疵。',
      '很适合搭娃屋场景，餐桌和椅子比例刚刚好。',
      '实物颜色很漂亮，和页面看到的几乎一样。',
      '整套摆起来很有美式小店的感觉，越看越喜欢。',
    ];
    const burgerTextsEn = [
      'Very good, affordable, and I keep buying it. Love it.',
      'Retro colors look amazing and photos come out great.',
      'Accessory details are better than expected.',
      'The atmosphere is complete even with a small setup.',
      'Unboxing was great and build quality is neat.',
      'Perfect for miniature room scenes and doll setup.',
      'Actual colors are close to the listing photos.',
      'The full set really feels like a tiny American diner.',
    ];
    ratingCards = burgerNames.map((name, idx) => ({
      id: `burger-rating-${idx + 1}`,
      name,
      date: `4/${28 - idx}/2026`,
      rating: idx === 4 ? 4 : 5,
      text: language === 'cn' ? burgerTextsCn[idx] : burgerTextsEn[idx],
      item: product.name[language],
      style: `${language === 'cn' ? '款式：' : 'item type: '}${burgerStyles[idx]}`,
      image: '',
    }));
  }
  if (isMiffyRatingsProduct) {
    const miffyNames = ['兔兔控阿圆', 'Mina L.', '奶芙子', 'Yuki Hsu', '小莓团子', 'Coco喵', 'Aki Chen', '77Momo', '糯米兔', 'Nori K.', '阿软', 'Luna Lin'];
    const miffyStyles = [
      '【1号】开盒确认款',
      '【2号】开盒确认款',
      '【3号】开盒确认款',
      '【4号】开盒确认款',
      '【整套8款】',
      '【1号】开盒确认款',
      '【2号】开盒确认款',
      '【3号】开盒确认款',
      '【4号】开盒确认款',
      '【整套8款】',
      '【1号】开盒确认款',
      '【3号】开盒确认款',
    ];
    const miffyTextsCn = [
      '这套质感真的很不错！蛋包饭太可爱了🫶🏻',
      '摸起来很舒服，手感不错。',
      '细节真的很用心，摆在桌面看着心情会变好。',
      '配色很温柔，实物比图片还可爱。',
      '整套摆起来很完整，拍照特别有氛围感。',
      '小配件做得很细，餐具和甜点都很精致。',
      '开盒体验很好，拿来送礼也很合适。',
      '我最喜欢这套的咖啡馆氛围，真的很治愈。',
      '材质和做工都在线，没有廉价感。',
      '和娃屋场景很搭，搭配起来效果超好。',
      '实物颜色很正，摆在办公桌很吸睛。',
      '已经想再收一套了，越看越喜欢。',
    ];
    const miffyTextsEn = [
      'Great quality set! The omurice piece is super cute.',
      'Soft touch and nice hand feel.',
      'Very thoughtful details. Great for desk display.',
      'Color tone is gentle and even cuter in person.',
      'The full set looks complete and photo-friendly.',
      'Accessories are tiny but very refined.',
      'Unboxing felt great and gift-worthy.',
      'The cafe vibe is really soothing.',
      'Material and finish feel premium.',
      'Matches dollhouse scenes very well.',
      'Colors are accurate and eye-catching on desk.',
      'I am already thinking about getting another set.',
    ];
    ratingCards = miffyNames.map((name, idx) => ({
      id: `miffy-rating-${idx + 1}`,
      name,
      date: `4/${28 - (idx % 12)}/2026`,
      rating: idx === 7 || idx === 10 ? 4 : 5,
      text: language === 'cn' ? miffyTextsCn[idx] : miffyTextsEn[idx],
      item: product.name[language],
      style: `${language === 'cn' ? '款式：' : 'item type: '}${miffyStyles[idx]}`,
      image: idx === 0 ? `${ratingImageBasePath}/1.png` : '',
    }));
  }
  if (isPinguCameraBagProduct) {
    const cameraBagNames = [
      '小雨',
      'Mina Hsu',
      '阿鱼 Lin',
      'Kiki Chen',
      '饼干',
      'Joanne Tsai',
      'Abao',
      '小悠',
      'Rita Kuo',
    ];
    const cameraBagTextsCn = [
      '包包比我想像中能装，手机+钥匙+唇膏都放得下，日常出门很够用。',
      '背带长度很好调，斜背不会卡，逛街背一下午也不累。',
      '实物很可爱，不是那种拍照好看而已，细节也有做出来。',
      '我拿来当穿搭点缀超适合，朋友都说很显眼但不突兀。',
      '小口袋放耳机刚刚好，这个设计真的有在想使用情境。',
      '收到当天就背出门了，容量对我来说刚好，拍照也很好看。',
      '摸起来手感软软的，拉链顺，整体做工比预期好。',
      '颜色和页面差不多，没有色差太大的问题。',
      '买来送朋友当礼物很成功，她一打开就说超可爱。',
    ];
    const cameraBagTextsEn = [
      'Holds more than expected. Phone, keys and lipstick fit easily.',
      'Strap length is easy to adjust and comfortable for long walks.',
      'Very cute in person, and details are actually well done.',
      'Great as a styling accent. Eye-catching but not too loud.',
      'The small pocket fits earbuds perfectly. Practical design.',
      'Took it out the same day. Capacity is just right for daily use.',
      'Soft touch, smooth zipper, and better build quality than expected.',
      'Color is close to listing photos with no major mismatch.',
      'Bought it as a gift and my friend loved it immediately.',
    ];
    ratingCards = ratingCards.slice(0, 9).map((card, idx) => ({
      ...card,
      name: cameraBagNames[idx] ?? card.name,
      text: language === 'cn' ? (cameraBagTextsCn[idx] ?? card.text) : (cameraBagTextsEn[idx] ?? card.text),
      style: language === 'cn' ? '款式：Pingu相机毛绒斜挎包' : 'item type: Pingu Plush Camera Crossbody Bag',
      image: ratingImagePaths[idx] ?? card.image,
      rating: idx === 2 || idx === 7 ? 4 : 5,
    }));
  }
  if (isSiamFridgeMagnetBlindBagProduct) {
    const siamNames = [
      '晴晴喵',
      'Riko Tan',
      '阿悦',
      'Mina Luo',
      '小橙子',
      'Kira Wen',
      '团团酱',
      'Nori Chan',
      '沐沐',
      'Eri Q.',
    ];
    const siamStyles = [
      '随机盲袋1个',
      '随机盲袋1个',
      '随机盲袋1个',
      '随机盲袋1个',
      '随机盲袋1个',
      '随机盲袋1个',
      '随机盲袋1个',
      '随机盲袋1个',
      '端盒 12个',
      '随机盲袋1个',
    ];
    const siamTextsCn = [
      '抽到两个本来没有的普款，还有一个隐藏，呜呜呜，感动！',
      '正的，单发出隐藏，闪闪的很好看，挺厚实的',
      '一次很好的购物体验，服务周到，物流快速，配送也很周到，态度也很好，物有所值啊，果断好评！',
      '觉得商品还不错',
      '冰箱贴也抽出了暹罗猫！！！',
      '萌！',
      '这次抽到了厘普和小河欸 上次去线下店抽到了秀珍 特别可爱的宝宝们😍',
      '哈哈，就想要多栋和秀珍，运气好抽到啦，特别可爱的',
      '端盒端到隐藏款，张田中守护我❗',
      '很可爱',
    ];
    const siamTextsEn = [
      'I pulled two regular styles I did not have before, plus one hidden. So touched!',
      'Authentic. I got a hidden from a single blind bag. The glitter effect is pretty and the piece feels solid.',
      'A great shopping experience overall: thoughtful service, fast shipping, careful delivery, and great attitude. Totally worth it.',
      'I think the product is pretty good.',
      'I even pulled the Siamese cat fridge magnet style!',
      'So cute!',
      'This time I pulled Lipu and Xiaohe. Last time at the offline store I got Xiuzhen. All of them are super adorable.',
      'Haha, I only wanted Duodong and Xiuzhen, and I got them. So lucky and so cute.',
      'Got the hidden from a full case. Zhang Tianzhong is protecting me!',
      'Very cute.',
    ];
    ratingCards = siamNames.map((name, idx) => ({
      id: `siam-rating-${idx + 1}`,
      name,
      date: `5/${2 - Math.floor(idx / 5)}/${2026}`,
      rating: idx === 3 ? 4 : 5,
      text: language === 'cn' ? siamTextsCn[idx] : siamTextsEn[idx],
      item: product.name[language],
      style: `${language === 'cn' ? '款式：' : 'item type: '}${siamStyles[idx]}`,
      image: ratingImagePaths[idx] ?? '',
    }));
  }
  const uniqueRatingCards = Array.from(new Map(ratingCards.map((card) => [card.id, card])).values());
  const sortedRatingCards = [...uniqueRatingCards].sort((a, b) => {
    if (selectedSort === 'highest') return b.rating - a.rating;
    if (selectedSort === 'lowest') return a.rating - b.rating;
    if (selectedSort === 'newest') {
      const aDate = new Date(a.date).getTime();
      const bDate = new Date(b.date).getTime();
      return bDate - aDate;
    }
    return 0;
  });
  const whatsappMessage =
    language === 'cn'
      ? `你好，我想咨询这个产品：${product.name.cn}。\n我想了解这个款式是否有货，以及运费（西马/东马/国外）和最终总价。谢谢！`
      : `Hi, I want to ask about this product: ${product.name.en}.\nCould you confirm stock availability and shipping (West Malaysia / East Malaysia / international), and the final total price? Thanks!`;
  const whatsappHref = `https://wa.me/601162573845?text=${encodeURIComponent(whatsappMessage)}`;
  const photoPreviews = useMemo(
    () => uploadedPhotos.map((file) => ({ name: file.name, url: URL.createObjectURL(file) })),
    [uploadedPhotos]
  );

  useEffect(() => {
    return () => {
      photoPreviews.forEach((item) => URL.revokeObjectURL(item.url));
    };
  }, [photoPreviews]);

  const handleAddToCart = () => {
    if (!canAddToCart) {
      return;
    }

    if (hasTwoOptions && selectedPurchase && selectedAfterUsd !== null) {
      const cartId = `${product.id}-${selectedPurchase.cartIdSuffix}`;

      addItem({
        ...product,
        id: cartId,
        name: {
          en: `${product.name.en} (${selectedPurchase.label.en})`,
          cn: `${product.name.cn}（${selectedPurchase.label.cn}）`,
        },
        price: selectedAfterUsd,
        quantity,
      });
      return;
    }

    if (isCustomStyleProduct && selectedCustomStyle) {
      const safeStyleId = customStyleOptions.indexOf(selectedCustomStyle as any);
      const stylePricing = isPetDogMiniSceneProduct
        ? PRODUCT_ONE_STYLE_PRICE_BY_LABEL[selectedCustomStyle as (typeof PRODUCT_ONE_STYLE_OPTIONS)[number]]
        : isPetCatMiniSceneProduct
          ? PRODUCT_FOUR_STYLE_PRICE_BY_LABEL[selectedCustomStyle as (typeof PRODUCT_FOUR_STYLE_OPTIONS)[number]]
          : isStrawberryCafeProduct
            ? PRODUCT_TEN_STYLE_PRICE_BY_LABEL[selectedCustomStyle as (typeof PRODUCT_TEN_STYLE_OPTIONS)[number]]
            : isBurgerSampleProduct
              ? PRODUCT_FOURTEEN_STYLE_PRICE_BY_LABEL[selectedCustomStyle as (typeof PRODUCT_FOURTEEN_STYLE_OPTIONS)[number]]
            : isMiffyCafeProduct
              ? PRODUCT_TWENTY_STYLE_PRICE_BY_LABEL[selectedCustomStyle as (typeof PRODUCT_TWENTY_STYLE_OPTIONS)[number]]
            : isLineDogPlushPendantProduct
              ? PRODUCT_FIVE_STYLE_PRICE_BY_LABEL[selectedCustomStyle as (typeof PRODUCT_FIVE_STYLE_OPTIONS)[number]]
          : null;
      addItem({
        ...product,
        id: `${product.id}-style-${safeStyleId >= 0 ? safeStyleId + 1 : 'custom'}`,
        name: {
          en: `${product.name.en} (${selectedCustomStyle})`,
          cn: `${product.name.cn}（${selectedCustomStyle}）`,
        },
        price: stylePricing ? stylePricing.afterMyr / unitsPerUsd.MYR : product.price,
        quantity,
      });
      return;
    }

    addItem({ ...product, quantity });
  };

  const openReviewModal = () => {
    setIsReviewModalOpen(true);
    setReviewStep(1);
    setReviewRating(0);
    setReviewText('');
    setUploadedPhotos([]);
    setUploadedVideos([]);
  };

  const closeReviewModal = () => {
    setIsReviewModalOpen(false);
    setReviewStep(1);
    setReviewRating(0);
    setReviewText('');
    setUploadedPhotos([]);
    setUploadedVideos([]);
  };

  const handlePickPhotos = () => {
    photoInputRef.current?.click();
  };

  const handlePickVideos = () => {
    videoInputRef.current?.click();
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    setUploadedPhotos((prev) => [...prev, ...files]);
    e.target.value = '';
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    setUploadedVideos((prev) => [...prev, ...files]);
    e.target.value = '';
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  const handleThumbPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    if (!thumbStripRef.current) return;
    thumbStripRef.current.setPointerCapture(e.pointerId);
    isThumbDraggingRef.current = true;
    setIsThumbDragging(true);
    setThumbDragMoved(false);
    thumbDragStartXRef.current = e.pageX - thumbStripRef.current.offsetLeft;
    thumbScrollStartLeftRef.current = thumbStripRef.current.scrollLeft;
  };

  const endThumbDrag = () => {
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
    isThumbDraggingRef.current = false;
    setIsThumbDragging(false);
  };

  const handleThumbPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isThumbDraggingRef.current || !thumbStripRef.current) return;
    e.preventDefault();
    const x = e.pageX - thumbStripRef.current.offsetLeft;
    const deltaX = x - thumbDragStartXRef.current;
    if (Math.abs(deltaX) > 3) setThumbDragMoved(true);
    const targetScrollLeft = thumbScrollStartLeftRef.current - deltaX * 1.85;

    if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    rafIdRef.current = requestAnimationFrame(() => {
      if (thumbStripRef.current) {
        thumbStripRef.current.scrollLeft = targetScrollLeft;
      }
    });
  };

  return (
    <div className="bg-bakery-cream min-h-screen pb-12 md:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12">
        {/* Breadcrumbs / Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-bakery-brown/60 hover:text-pink-500 font-bold mb-8 transition-colors group"
        >
          <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
          {t('product.backToShop')}
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Product Image Gallery - Polaroid Stack */}
          <div className="flex flex-col gap-12">
            <div className="relative h-[580px] md:h-[860px] flex items-center justify-center select-none">
              <div className="relative w-full max-w-[520px] md:max-w-[640px] aspect-square">
                <AnimatePresence mode="popLayout">
                  {productImages.map((img, idx) => {
                    const offset = (idx - currentImageIndex + productImages.length) % productImages.length;
                    // Show current and next 2 for stack effect
                    if (offset > 2) return null;

                    const isFront = offset === 0;
                    const zIndex = productImages.length - offset;
                    
                    return (
                      <motion.div
                        key={`${img}-${idx}`}
                        initial={{ scale: 0.8, opacity: 0, x: 50, rotate: 15 }}
                        animate={{ 
                          scale: isFront ? 1 : 0.95 - offset * 0.05,
                          opacity: 1,
                          x: offset * 20,
                          y: offset * -15,
                          rotate: isFront ? 0 : (idx % 2 === 0 ? 6 : -6),
                          zIndex: zIndex,
                        }}
                        exit={{ 
                          x: -400, 
                          opacity: 0, 
                          rotate: -30, 
                          scale: 0.9,
                          transition: { duration: 0.4, ease: "easeIn" }
                        }}
                        transition={{ 
                          type: 'spring', 
                          stiffness: 260, 
                          damping: 25 
                        }}
                        className="absolute inset-0 cursor-pointer"
                        onClick={isFront ? nextImage : undefined}
                      >
                        <div className="w-full h-full bg-white p-3 md:p-4 pb-24 md:pb-28 shadow-[0_30px_70px_rgba(0,0,0,0.2)] border-2 border-bakery-pink-light/20 rounded-sm transform-gpu">
                          <div className="w-full h-full overflow-hidden bg-bakery-cream/20 rounded-sm relative">
                            <img 
                              src={img} 
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = product.fallbackImage;
                              }}
                              alt={product.name[language]} 
                              className="w-full h-full object-contain bg-white"
                              referrerPolicy="no-referrer"
                              draggable={false}
                            />
                            {/* Glossy overlay effect */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
                          </div>
                          
                          {/* Polaroid Bottom Space */}
                          <div className="absolute bottom-0 left-0 right-0 h-28 md:h-32 flex flex-col items-center justify-center px-4">
                            <p className="font-display font-bold text-bakery-brown/40 text-base tracking-widest uppercase">
                              {selectedStyleLabel ? `${product.name[language]} · ${selectedStyleLabel}` : product.name[language]}
                            </p>
                            <p className="font-mono text-[11px] text-bakery-brown/20 mt-1">
                              Miaomiaoshops.com
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="absolute -bottom-28 left-0 right-0 flex justify-center items-center gap-8 z-50">
                  <motion.button 
                    whileHover={{ scale: 1.1, x: -5 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={prevImage}
                    className="p-4 bg-white rounded-full shadow-xl border-2 border-bakery-pink-light text-bakery-brown hover:text-pink-500 transition-all group"
                  >
                    <ChevronLeft className="h-6 w-6 group-hover:-translate-x-1 transition-transform" />
                  </motion.button>

                  {/* Counter */}
                  <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border-2 border-bakery-pink-light font-black text-bakery-brown shadow-sm">
                    {currentImageIndex + 1} <span className="text-bakery-brown/30 mx-1">/</span> {productImages.length}
                  </div>

                  <motion.button 
                    whileHover={{ scale: 1.1, x: 5 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={nextImage}
                    className="p-4 bg-white rounded-full shadow-xl border-2 border-bakery-pink-light text-bakery-brown hover:text-pink-500 transition-all group"
                  >
                    <ChevronRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Polaroid Thumbnails Row */}
            <div
              ref={thumbStripRef}
              className={`flex justify-start gap-5 overflow-x-auto pb-5 pl-6 pr-6 md:pl-8 md:pr-8 scrollbar-hide touch-pan-x ${isThumbDragging ? 'cursor-grabbing snap-none' : 'cursor-grab snap-x snap-mandatory'}`}
              onPointerDown={handleThumbPointerDown}
              onPointerUp={endThumbDrag}
              onPointerCancel={endThumbDrag}
              onPointerLeave={endThumbDrag}
              onPointerMove={handleThumbPointerMove}
              style={{ scrollBehavior: isThumbDragging ? 'auto' : 'smooth' }}
            >
              {productImages.map((img, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ y: -5, rotate: idx % 2 === 0 ? 3 : -3 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    if (thumbDragMoved) return;
                    setCurrentImageIndex(idx);
                  }}
                  className={`relative w-24 h-28 md:w-32 md:h-40 bg-white p-2.5 pb-7 md:pb-9 shadow-md border transition-all flex-shrink-0 snap-start ${
                    currentImageIndex === idx 
                      ? 'border-bakery-pink scale-110 z-10 -rotate-3' 
                      : 'border-bakery-pink-light/20 hover:shadow-lg'
                  }`}
                >
                  <div className="w-full h-full overflow-hidden bg-bakery-cream/10">
                    <img 
                      src={img} 
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = product.fallbackImage;
                      }}
                      alt={`Thumbnail ${idx + 1}`} 
                      className={`w-full h-full object-contain bg-white transition-opacity ${currentImageIndex === idx ? 'opacity-100' : 'opacity-60'}`}
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  {currentImageIndex === idx && (
                    <div className="absolute inset-0 border-2 border-bakery-pink pointer-events-none" />
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <div className="mb-6">
              <div className="flex items-center gap-2 text-pink-500 font-bold text-sm mb-2">
                <span className="bg-pink-100 px-3 py-1 rounded-full">{product.category[language]}</span>
                <div className="flex items-center gap-1 ml-2">
                  <Star className="h-4 w-4 fill-bakery-yellow text-bakery-yellow" />
                  <span className="text-bakery-brown">4.9 ({totalReviews}+ reviews)</span>
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-black text-bakery-brown mb-4 leading-tight">
                {product.name[language]}
              </h1>
              {hasTwoOptions ? (
                <>
                  {displayOptionAfterUsd !== null && displayOptionBeforeUsd !== null && (
                    <div className="flex items-baseline gap-4 mb-3">
                      <span className="text-4xl md:text-5xl font-black text-pink-500 leading-none">
                        {formatPrice(displayOptionAfterUsd)}
                      </span>
                      <span className="text-bakery-brown/40 line-through text-lg md:text-xl font-bold">
                        {formatPrice(displayOptionBeforeUsd)}
                      </span>
                    </div>
                  )}
                  <p className="text-sm md:text-base text-bakery-brown/70 font-medium mb-4 leading-relaxed">
                    {language === 'cn'
                      ? '我们的价钱已经包括西马运费；东马与国外运费需另外计算。若想更详细了解最终金额，请联系我。'
                      : 'Our listed price already includes shipping within West Malaysia. East Malaysia and international shipping are calculated separately. Contact us for the exact final total.'}
                  </p>
                  <div className="mb-8">
                    <div className="text-sm font-black text-bakery-brown mb-3">
                      {language === 'cn' ? '款式' : 'Style'}
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {(Object.keys(purchaseOptionsForProduct) as PurchaseOptionKey[]).map((key) => {
                        const opt = purchaseOptionsForProduct[key];
                        const isActive = purchaseOption === key;
                        return (
                          <button
                            key={key}
                            type="button"
                            aria-pressed={isActive}
                            onClick={() => setPurchaseOption(key)}
                            className={`px-6 py-3 rounded-2xl text-base font-black transition-all shadow-sm border-2 ${
                              isActive
                                ? 'bg-[#6d4c41] border-[#6d4c41] text-white shadow-[0_8px_20px_rgba(109,76,65,0.35)]'
                                : 'bg-white text-bakery-brown border-bakery-pink hover:border-bakery-pink/70'
                            }`}
                          >
                            {opt.label[language]}
                          </button>
                        );
                      })}
                    </div>
                    {!selectedPurchase && (
                      <p className="mt-3 text-sm font-bold text-bakery-brown/60">
                        {language === 'cn' ? '请选择款式后再加入购物车' : 'Please choose a style before adding to cart'}
                      </p>
                    )}
                  </div>
                </>
              ) : (
                <div className="mb-6">
                  <div className="flex items-baseline gap-4">
                    <span className="text-4xl font-black text-pink-500">{formatPrice(singlePriceAfterUsd)}</span>
                    <span className="text-bakery-brown/40 line-through text-xl font-bold">{formatPrice(singlePriceBeforeUsd)}</span>
                  </div>
                  <p className="text-sm md:text-base text-bakery-brown/70 font-medium mt-3 leading-relaxed">
                    {language === 'cn'
                      ? '我们的价钱已经包括西马运费；东马与国外运费需另外计算。若想更详细了解最终金额，请联系我。'
                      : 'Our listed price already includes shipping within West Malaysia. East Malaysia and international shipping are calculated separately. Contact us for the exact final total.'}
                  </p>
                </div>
              )}
              {!hasTwoOptions && (
                <>
                  {isCustomStyleProduct && (
                    <div className="mb-6">
                      <div className="text-sm font-black text-bakery-brown mb-3">
                        {language === 'cn' ? '款式' : 'Style'}
                      </div>
                      <div className="flex flex-wrap gap-3">
                        {customStyleOptions.map((style) => {
                          const isActive = selectedCustomStyle === style;
                          const isSoldOutOption =
                            (isStrawberryCafeProduct &&
                              PRODUCT_TEN_SOLD_OUT_OPTIONS.has(style as (typeof PRODUCT_TEN_STYLE_OPTIONS)[number])) ||
                            (isMiffyCafeProduct &&
                              PRODUCT_TWENTY_SOLD_OUT_OPTIONS.has(style as (typeof PRODUCT_TWENTY_STYLE_OPTIONS)[number])) ||
                            (isLineDogPlushPendantProduct &&
                              PRODUCT_FIVE_SOLD_OUT_OPTIONS.has(style as (typeof PRODUCT_FIVE_STYLE_OPTIONS)[number]));
                          return (
                            <button
                              key={style}
                              type="button"
                              aria-pressed={isActive}
                              onClick={() => {
                                setSelectedCustomStyle(style);
                                if (!productFolder) return;
                                const styleImageFile = customStyleImageByLabel[style];
                                if (!styleImageFile) return;
                                const styleImageIndex = productImages.findIndex((img) => {
                                  const filePart = (img.split('/').pop() ?? '').split('?')[0];
                                  return decodeURIComponent(filePart) === styleImageFile;
                                });
                                if (styleImageIndex >= 0) {
                                  setCurrentImageIndex(styleImageIndex);
                                }
                              }}
                              className={`px-5 py-2.5 rounded-2xl text-sm font-black transition-all shadow-sm border-2 ${
                                isSoldOutOption
                                  ? 'bg-[#f5f5f5] text-bakery-brown/45 border-bakery-brown/20'
                                  : isActive
                                  ? 'bg-[#6d4c41] border-[#6d4c41] text-white shadow-[0_8px_20px_rgba(109,76,65,0.35)]'
                                  : 'bg-white text-bakery-brown border-bakery-pink hover:border-bakery-pink/70'
                              }`}
                            >
                              {style}
                              {isSoldOutOption ? (language === 'cn' ? '（Sold out）' : ' (Sold out)') : ''}
                            </button>
                          );
                        })}
                      </div>
                      {!selectedCustomStyle && (
                        <p className="mt-3 text-sm font-bold text-bakery-brown/60">
                          {language === 'cn' ? '请选择款式后再加入购物车' : 'Please choose a style before adding to cart'}
                        </p>
                      )}
                      {isSoldOutSelected && (
                        <p className="mt-3 text-sm font-bold text-[#b4233f]">
                          {language === 'cn' ? '当前选择款式已售罄（Sold out）' : 'Selected style is sold out.'}
                        </p>
                      )}
                    </div>
                  )}
                  {isPinguCameraBagProduct && (
                    <div className="mb-6">
                      <div className="text-sm font-black text-bakery-brown mb-2">
                        {language === 'cn' ? '款式' : 'Style'}
                      </div>
                      <span className="inline-flex items-center px-4 py-2 rounded-xl bg-white border-2 border-bakery-pink-light font-black text-bakery-brown">
                        {language === 'cn' ? 'Pingu相机毛绒斜挎包' : 'Pingu Plush Camera Crossbody Bag'}
                      </span>
                    </div>
                  )}
                <p className="text-bakery-brown/70 text-lg leading-relaxed mb-8 font-medium">
                  {product.description[language]}
                </p>
                </>
              )}
            </div>

            {/* Quantity and Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <div className="flex items-center bg-white rounded-2xl border-2 border-bakery-pink-light p-1 shadow-sm">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 text-bakery-brown hover:text-pink-500 transition-colors"
                >
                  <Minus className="h-5 w-5" />
                </button>
                <span className="w-12 text-center font-black text-xl text-bakery-brown">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 text-bakery-brown hover:text-pink-500 transition-colors"
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>
              <button 
                onClick={handleAddToCart}
                disabled={!canAddToCart}
                className="flex-1 bg-bakery-pink text-white rounded-2xl px-8 py-4 font-black text-xl shadow-[0_6px_0_#d81b60] hover:shadow-[0_2px_0_#d81b60] hover:translate-y-[4px] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:hover:translate-y-0"
              >
                <ShoppingCart className="h-6 w-6" />
                {t('product.addToCart')}
              </button>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-[#25D366] rounded-2xl border-2 border-[#25D366] text-white hover:bg-[#1ebe57] hover:border-[#1ebe57] transition-colors shadow-sm grid place-items-center"
                aria-label="Contact via WhatsApp"
                title="WhatsApp: 60 11-6257 3845"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-6 w-6 fill-current"
                  aria-hidden="true"
                >
                  <path d="M20.52 3.48A11.86 11.86 0 0 0 12.08 0C5.58 0 .28 5.28.28 11.78c0 2.07.54 4.09 1.57 5.87L0 24l6.53-1.71a11.75 11.75 0 0 0 5.55 1.41h.01c6.5 0 11.8-5.29 11.8-11.79 0-3.15-1.23-6.11-3.47-8.43ZM12.09 21.7h-.01a9.77 9.77 0 0 1-4.98-1.37l-.36-.21-3.87 1.01 1.03-3.77-.24-.39a9.73 9.73 0 0 1-1.49-5.18c0-5.39 4.39-9.78 9.79-9.78 2.61 0 5.05 1.01 6.89 2.85a9.68 9.68 0 0 1 2.88 6.93c0 5.39-4.39 9.78-9.78 9.78Zm5.36-7.34c-.29-.14-1.71-.84-1.98-.94-.26-.1-.45-.14-.64.15-.18.29-.73.94-.9 1.13-.16.19-.33.22-.62.08-.29-.15-1.22-.45-2.33-1.45-.86-.77-1.44-1.72-1.61-2.01-.17-.29-.02-.45.12-.59.12-.12.29-.33.43-.49.14-.16.19-.29.29-.48.1-.19.05-.36-.02-.5-.07-.14-.64-1.55-.88-2.12-.23-.55-.47-.48-.64-.49h-.55c-.19 0-.5.07-.76.36-.26.29-1 1-1 2.43 0 1.43 1.03 2.81 1.17 3 .14.19 2.03 3.1 4.92 4.35.69.3 1.23.48 1.65.61.69.22 1.31.19 1.81.12.55-.08 1.71-.7 1.95-1.38.24-.68.24-1.26.17-1.38-.07-.12-.26-.19-.55-.33Z" />
                </svg>
              </a>
            </div>

            {/* Tabs Section */}
            <div className="border-b-2 border-bakery-pink-light/30 mb-6">
              <div className="flex gap-8">
                {['description', 'specifications'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-4 text-lg font-black transition-all relative ${
                      activeTab === tab ? 'text-pink-500' : 'text-bakery-brown/40 hover:text-bakery-brown'
                    }`}
                  >
                    {t(`product.${tab}`)}
                    {activeTab === tab && (
                      <motion.div 
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-1 bg-pink-500 rounded-full"
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="min-h-[150px]">
              {activeTab === 'description' ? (
                <div className="prose prose-pink max-w-none text-bakery-brown/70 font-medium leading-relaxed">
                  {hasTwoOptions ? (
                    <div className="space-y-3">
                      {product.description[language]
                        .split('\n')
                        .map((line) => line.trim())
                        .filter(Boolean)
                        .map((line, i) => (
                          <p key={i}>{line}</p>
                        ))}
                    </div>
                  ) : (
                    <>
                      <p>{product.description[language]}</p>
                      <p className="mt-4">
                        Our {product.name[language]} is crafted with the utmost care and attention to detail. 
                        Perfect for collectors and children alike, this piece brings a touch of sweetness to any collection.
                      </p>
                    </>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(isPinguSeriesProduct
                    ? (language === 'cn'
                      ? [
                          { label: '材质成分', value: '塑料' },
                          { label: '适用年龄', value: '15岁以上' },
                        ]
                      : [
                          { label: 'Material Composition', value: 'Plastic' },
                          { label: 'Age', value: '15+' },
                        ])
                    : [
                        { label: t('product.material'), value: t('product.materialValue') },
                        { label: t('product.size'), value: t('product.sizeValue') },
                        { label: t('product.age'), value: t('product.ageValue') },
                        { label: 'Brand', value: 'Miaomiaoshops' },
                      ]
                  ).map((spec, i) => (
                    <div key={i} className="flex justify-between p-3 bg-white/40 rounded-xl border border-white">
                      <span className="font-bold text-bakery-brown/50">{spec.label}</span>
                      <span className="font-bold text-bakery-brown">{spec.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Product Highlights + Ratings */}
        <div className="mt-20 md:mt-28">
          <div className="flex items-center gap-4 mb-12 md:mb-16">
            <div className="flex-1 border-t-2 border-dashed border-bakery-pink-light/80" />
            <div className="h-11 w-11 rounded-full bg-bakery-pink-light/60 border-2 border-bakery-pink-light flex items-center justify-center shadow-sm">
              <Star className="h-4 w-4 text-white fill-white/90" />
            </div>
            <div className="flex-1 border-t-2 border-dashed border-bakery-pink-light/80" />
          </div>
          <div className="space-y-16">
          <div className="space-y-14 md:space-y-18">
            {highlightBlocks.map((block, idx) => (
              <div
                key={block.title}
                className={
                  (isPetDogMiniSceneProduct || isPetCatMiniSceneProduct || isStrawberryCafeProduct || isBurgerSampleProduct || isMiffyCafeProduct || isPinguMiniTheaterProduct)
                    ? 'max-w-[1180px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center'
                    : `grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center ${
                        idx % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''
                      }`
                }
              >
                <div className={`${(isPetDogMiniSceneProduct || isPetCatMiniSceneProduct || isStrawberryCafeProduct || isBurgerSampleProduct || isMiffyCafeProduct || isPinguMiniTheaterProduct) ? 'md:justify-self-start w-full' : (idx % 2 === 1 ? 'md:justify-self-end' : '')}`}>
                  <div className={`rounded-[2rem] overflow-hidden bg-white border-[6px] border-white shadow-[0_12px_30px_rgba(0,0,0,0.08)] ${(isPetDogMiniSceneProduct || isPetCatMiniSceneProduct || isStrawberryCafeProduct || isBurgerSampleProduct || isMiffyCafeProduct || isPinguMiniTheaterProduct) ? 'w-full md:max-w-[760px]' : 'md:max-w-[520px]'}`}>
                    <img
                      src={block.image}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = product.fallbackImage;
                      }}
                      alt={block.title}
                      className={(isPetDogMiniSceneProduct || isPetCatMiniSceneProduct || isStrawberryCafeProduct || isBurgerSampleProduct || isMiffyCafeProduct || isPinguMiniTheaterProduct || isSiamFridgeMagnetBlindBagProduct) ? 'w-full aspect-square object-cover' : 'w-full aspect-[2/3] object-cover'}
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
                <div className={(isPetDogMiniSceneProduct || isPetCatMiniSceneProduct || isStrawberryCafeProduct || isBurgerSampleProduct || isMiffyCafeProduct || isPinguMiniTheaterProduct) ? 'md:pr-3 text-left' : (idx % 2 === 1 ? 'md:pl-10 md:pr-0' : 'md:pl-4')}>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] tracking-[0.15em] font-black mb-4 ${block.badgeClass}`}>
                    {block.badge}
                  </span>
                  <h3 className="text-3xl md:text-4xl font-display font-black text-bakery-brown leading-[1.2] mb-4">
                    {block.title}
                  </h3>
                  <p className={`text-bakery-brown/70 text-base md:text-2xl leading-relaxed ${(isPetDogMiniSceneProduct || isPetCatMiniSceneProduct || isStrawberryCafeProduct || isBurgerSampleProduct || isMiffyCafeProduct) ? 'whitespace-pre-line' : ''}`}>
                    {block.body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <section className="bg-white/70 border border-bakery-pink-light/40 rounded-3xl p-5 md:p-8 shadow-sm">
            <div className="text-center mb-8 md:mb-10">
              <h3 className="text-3xl md:text-5xl font-display font-black text-bakery-brown leading-tight">
                {language === 'cn' ? '用户真实评价' : 'What our customers say'}
              </h3>
              <p className="mt-3 inline-flex items-center gap-2 text-base md:text-xl font-bold text-bakery-brown/80">
                <Bookmark className="h-4 w-4 md:h-5 md:w-5 text-pink-500" />
                {language === 'cn' ? `基于 ${totalReviews}+ 位满意顾客` : `Based on ${totalReviews}+ happy customers`}
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3 text-bakery-brown">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <span className="text-2xl font-black">4.9</span>
                <span className="text-bakery-brown/60 font-bold">
                  {language === 'cn' ? `${totalReviews}+ 条评价` : `${totalReviews}+ Reviews`}
                </span>
              </div>
              <div ref={sortMenuRef} className="relative flex items-center gap-2">
                <button
                  onClick={openReviewModal}
                  className="px-5 py-2.5 bg-white border border-bakery-pink-light rounded-xl font-bold text-bakery-brown hover:border-bakery-pink transition-colors"
                >
                  {language === 'cn' ? '写评价' : 'Write a review'}
                </button>
                <button
                  onClick={() => setIsSortOpen((prev) => !prev)}
                  className="h-11 w-11 grid place-items-center bg-white border border-bakery-pink-light rounded-xl text-bakery-brown hover:border-bakery-pink transition-colors"
                  aria-label={language === 'cn' ? '排序' : 'Sort reviews'}
                >
                  <SlidersHorizontal className="h-5 w-5" />
                </button>

                {isSortOpen && (
                  <div className="absolute top-14 right-0 w-72 bg-white rounded-xl border border-bakery-pink-light shadow-lg p-5 z-20">
                    <p className="text-3xl font-black text-bakery-brown mb-4">{language === 'cn' ? '排序' : 'Sort by'}</p>
                    {[
                      { key: 'featured', label: language === 'cn' ? '精选' : 'Featured' },
                      { key: 'newest', label: language === 'cn' ? '最新' : 'Newest' },
                      { key: 'highest', label: language === 'cn' ? '最高评分' : 'Highest Ratings' },
                      { key: 'lowest', label: language === 'cn' ? '最低评分' : 'Lowest Ratings' },
                    ].map((option) => (
                      <button
                        key={option.key}
                        onClick={() => {
                          setSelectedSort(option.key as typeof selectedSort);
                          setIsSortOpen(false);
                        }}
                        className="w-full py-2 text-left text-xl font-semibold text-bakery-brown flex items-center justify-between"
                      >
                        <span>{option.label}</span>
                        {selectedSort === option.key && <Check className="h-5 w-5" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 items-start">
              {sortedRatingCards.map((card, idx) => (
                <article
                  key={card.id}
                  className={`bg-white border border-bakery-pink-light/40 rounded-2xl overflow-hidden shadow-sm ${
                    (!isTextOnlyRatingsProduct && !isMixedRatingsProduct && !isStrawberryCafeRatingsProduct && !isBurgerTextRatingsProduct && !isMiffyRatingsProduct)
                      ? (idx % 3 === 1 ? 'lg:mt-8' : idx % 3 === 2 ? 'lg:mt-4' : '')
                      : ''
                  }`}
                >
                  {!isPinguMiniTheaterProduct && !isTextOnlyRatingsProduct && card.image && (
                    <img
                      src={card.image}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = product.fallbackImage;
                      }}
                      alt={card.item}
                      className="w-full aspect-square object-cover"
                      referrerPolicy="no-referrer"
                    />
                  )}
                  <div className="p-4">
                    <div className="flex items-center justify-between gap-3 mb-1">
                      <div className="flex items-center gap-2 min-w-0">
                        <p className="font-black text-bakery-brown truncate">{card.name}</p>
                        <span className="inline-flex items-center gap-1 text-[11px] text-bakery-brown/80 border border-bakery-brown/20 rounded px-1.5 py-0.5 shrink-0">
                          <span className="h-3.5 w-3.5 rounded-full bg-black text-white inline-flex items-center justify-center">
                            <Check className="h-2.5 w-2.5" />
                          </span>
                          Verified
                        </span>
                        <div className="relative group shrink-0">
                          <button
                            type="button"
                            className="grid place-items-center"
                            onClick={() => setIsLearnMoreOpen(true)}
                            aria-label={language === 'cn' ? '了解评价验证说明' : 'Review verification info'}
                          >
                            <Info className="h-3.5 w-3.5 text-bakery-brown/55" />
                          </button>
                          <div className="absolute left-1/2 top-5 -translate-x-1/2 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity z-20">
                            <div className="w-56 rounded-lg border border-bakery-brown/20 bg-white p-2 text-[11px] leading-relaxed text-bakery-brown/80 shadow-md">
                              <p>
                                {language === 'cn'
                                  ? '此评价来自已验证并购买过该商品的顾客。'
                                  : 'This review was collected from a verified customer who purchased this item.'}
                              </p>
                              <button
                                type="button"
                                onClick={() => setIsLearnMoreOpen(true)}
                                className="mt-1 underline text-bakery-brown/75 hover:text-bakery-brown"
                              >
                                {language === 'cn' ? '了解更多' : 'Learn more'}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-bakery-brown/50">{card.date}</span>
                    </div>
                    <div className="flex items-center gap-1 text-amber-500 mb-2">
                      {[...Array(5)].map((_, starIdx) => (
                        <Star
                          key={starIdx}
                          className={`h-4 w-4 ${starIdx < card.rating ? 'fill-current' : 'text-bakery-brown/20'}`}
                        />
                      ))}
                    </div>
                    <p className="text-bakery-brown/75 text-sm leading-relaxed mb-3">{card.text}</p>
                    <p className="text-xs font-bold text-bakery-brown/45 mb-1">{card.style}</p>
                    <p className="text-xs font-bold text-bakery-brown/45">{card.item}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 md:mt-32">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-3xl font-display font-black text-bakery-brown">
                {t('product.relatedProducts')}
              </h2>
              <Link to="/shop" className="text-pink-500 font-bold hover:underline flex items-center gap-1">
                View All <Share2 className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((item) => (
                <Link 
                  key={item.id} 
                  to={`/product/${item.id}`}
                  className="bg-white rounded-[2rem] p-4 border-2 border-bakery-pink-light hover:border-pink-300 transition-all group shadow-sm"
                >
                  <div className="aspect-square rounded-2xl overflow-hidden mb-4 bg-bakery-pink-light/20">
                    <img 
                      src={item.imageUrl} 
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = item.fallbackImage;
                      }}
                      alt={item.name[language]} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <h3 className="font-bold text-bakery-brown mb-1 line-clamp-1">{item.name[language]}</h3>
                  <p className="text-pink-500 font-black">{formatPrice(item.price)}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {isReviewModalOpen && (
        <div className="fixed inset-0 bg-black/25 backdrop-blur-[1px] z-50 flex items-start md:items-center justify-center p-3 md:p-6">
          <div className="w-[min(94vw,94vh)] max-w-[920px] aspect-square bg-[#f3f3f3] rounded-xl border border-black/10 relative overflow-hidden">
            <input
              ref={photoInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handlePhotoChange}
            />
            <input
              ref={videoInputRef}
              type="file"
              accept="video/*"
              multiple
              className="hidden"
              onChange={handleVideoChange}
            />
            <button
              onClick={closeReviewModal}
              className="absolute top-5 left-5 text-black hover:opacity-70 transition-opacity"
              aria-label={language === 'cn' ? '关闭' : 'Close'}
            >
              <X className="h-7 w-7" />
            </button>

            {reviewStep === 1 && (
              <div className="h-full min-h-full flex items-center justify-center px-6">
                <div className="text-center">
                  <p className="text-4xl font-semibold text-black mb-8">
                    {language === 'cn' ? '你会给这个商品几分？' : 'How would you rate this item?'}
                  </p>
                  <div className="flex justify-center gap-3 mb-4">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        key={num}
                        onClick={() => {
                          setReviewRating(num);
                          setReviewStep(2);
                        }}
                        className="text-[#9a7425]"
                      >
                        <Star className="h-14 w-14 fill-transparent stroke-[1.8]" />
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-between text-2xl text-black/85">
                    <span>{language === 'cn' ? '不喜欢' : 'Dislike it'}</span>
                    <span>{language === 'cn' ? '很喜欢' : 'Love it!'}</span>
                  </div>
                </div>
              </div>
            )}

            {reviewStep === 2 && (
              <div className="h-full min-h-full flex flex-col items-center justify-center px-6">
                <div className="w-full max-w-[620px] text-center">
                  <p className="text-6xl font-bold text-black mb-2">
                    {reviewRating >= 5
                      ? language === 'cn' ? '晒出来吧' : 'Show it off'
                      : language === 'cn' ? '很抱歉让你失望' : "We're sorry to hear that"}
                  </p>
                  <p className="text-3xl text-black/85 mb-10">
                    {reviewRating >= 5
                      ? language === 'cn' ? '我们很想看看上身效果！' : "We'd love to see it in action!"
                      : language === 'cn' ? '告诉我们哪里可以改进' : 'Show us what went wrong'}
                  </p>

                  <div className="border border-black/30 rounded-xl p-4">
                    <p className="text-4xl font-bold text-black mb-4">
                      {language === 'cn' ? '下次购买立减 15%' : 'Get 15% off your next purchase'}
                    </p>
                    <button
                      type="button"
                      onClick={handlePickPhotos}
                      className="w-full h-14 bg-black text-white rounded-xl text-3xl font-semibold flex items-center justify-center gap-2 mb-3"
                    >
                      <ImagePlus className="h-6 w-6" />
                      {language === 'cn' ? '添加照片' : 'Add photos'}
                    </button>
                    <button
                      type="button"
                      onClick={handlePickVideos}
                      className="w-full h-14 bg-black text-white rounded-xl text-3xl font-semibold flex items-center justify-center gap-2"
                    >
                      <Clapperboard className="h-6 w-6" />
                      {language === 'cn' ? '添加视频' : 'Add video'}
                    </button>
                  </div>

                  {(uploadedPhotos.length > 0 || uploadedVideos.length > 0) && (
                    <div className="mt-4 text-left space-y-3">
                      {uploadedPhotos.length > 0 && (
                        <div>
                          <p className="text-sm font-bold text-black/70 mb-2">
                            {language === 'cn' ? `已添加图片 (${uploadedPhotos.length})` : `Photos (${uploadedPhotos.length})`}
                          </p>
                          <div className="flex gap-2 overflow-x-auto pb-1">
                            {photoPreviews.map((photo) => (
                              <img
                                key={photo.url}
                                src={photo.url}
                                alt={photo.name}
                                className="h-16 w-16 object-cover rounded-md border border-black/20 shrink-0"
                              />
                            ))}
                          </div>
                        </div>
                      )}
                      {uploadedVideos.length > 0 && (
                        <div>
                          <p className="text-sm font-bold text-black/70 mb-1">
                            {language === 'cn' ? `已添加视频 (${uploadedVideos.length})` : `Videos (${uploadedVideos.length})`}
                          </p>
                          <div className="space-y-1">
                            {uploadedVideos.map((video, idx) => (
                              <p key={`${video.name}-${idx}`} className="text-xs text-black/65 truncate">
                                {video.name}
                              </p>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="absolute left-6 right-6 bottom-6 flex items-center justify-between">
                  <button
                    onClick={() => setReviewStep(1)}
                    className="text-3xl font-bold text-black"
                  >
                    {language === 'cn' ? '返回' : 'Back'}
                  </button>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4].map((bar) => (
                      <div
                        key={bar}
                        className={`h-2 w-20 rounded-full ${bar <= 2 ? 'bg-black' : 'bg-black/15'}`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={() => setReviewStep(3)}
                    className="text-3xl font-bold text-black"
                  >
                    {language === 'cn' ? '跳过' : 'Skip'}
                  </button>
                </div>
              </div>
            )}

            {reviewStep === 3 && (
              <div className="h-full min-h-full flex flex-col items-center justify-center px-6">
                <div className="w-full max-w-[620px]">
                  <p className="text-6xl font-bold text-black text-center mb-8">
                    {language === 'cn' ? '告诉我们更多' : 'Tell us more!'}
                  </p>
                  <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder={language === 'cn' ? '我们还可以如何改进？' : 'How could we improve?'}
                    className="w-full h-72 border border-black/40 rounded-xl bg-transparent p-4 text-2xl text-black placeholder:text-black/45 outline-none"
                  />
                </div>

                <div className="absolute left-6 right-6 bottom-6 flex items-center justify-between">
                  <button
                    onClick={() => setReviewStep(2)}
                    className="text-3xl font-bold text-black"
                  >
                    {language === 'cn' ? '返回' : 'Back'}
                  </button>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4].map((bar) => (
                      <div
                        key={bar}
                        className={`h-2 w-20 rounded-full ${bar <= 3 ? 'bg-black' : 'bg-black/15'}`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={() => setReviewStep(4)}
                    disabled={!reviewText.trim()}
                    className="h-14 px-8 rounded-xl text-3xl font-bold bg-black text-white disabled:bg-black/20 disabled:text-black/40"
                  >
                    {language === 'cn' ? '下一步' : 'Next'}
                  </button>
                </div>
              </div>
            )}

            {reviewStep === 4 && (
              <div className="h-full min-h-full flex items-center justify-center px-6">
                <div className="text-center">
                  <p className="text-7xl font-bold text-black mb-4">{language === 'cn' ? '感谢你' : 'Thank you'}</p>
                  <p className="text-4xl text-black/85">
                    {language === 'cn'
                      ? '感谢你花时间分享你的体验'
                      : 'We appreciate you taking the time to share your experience'}
                  </p>
                </div>
                <button
                  onClick={closeReviewModal}
                  className="absolute right-6 bottom-6 h-14 px-8 rounded-xl bg-black text-white text-3xl font-bold"
                >
                  {language === 'cn' ? '继续' : 'Continue'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {isLearnMoreOpen && (
        <div className="fixed inset-0 z-[60] bg-black/30 flex items-center justify-center p-4">
          <div className="w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-2xl bg-white border border-bakery-brown/15 shadow-xl p-5 md:p-7 relative">
            <button
              type="button"
              onClick={() => setIsLearnMoreOpen(false)}
              className="absolute top-3 right-3 h-8 w-8 grid place-items-center rounded-full border border-bakery-brown/20 text-bakery-brown hover:bg-bakery-brown/5"
              aria-label="Close learn more modal"
            >
              <X className="h-4 w-4" />
            </button>

            <h3 className="text-xl md:text-2xl font-black text-bakery-brown mb-4">
              {language === 'cn' ? '我们如何验证与处理评论' : 'How we verify and process reviews'}
            </h3>

            <div className="space-y-3 text-sm md:text-[15px] leading-7 text-bakery-brown/80">
              {language === 'cn' ? (
                <>
                  <p>
                    我们使用 Loox（一个提供在线评论与营销解决方案的网页应用）来收集、整理、处理并展示网站上的评论内容。
                  </p>
                  <p>
                    对于我们有记录显示其曾在本网站直接购买商品的客户，我们会通过 Loox 自动发送评论邀请。我们可借助技术方式（如客户邮箱）验证评论可靠性。通过该邀请提交的评论会标记为“Verified purchase（已验证购买）”，并在评论展示界面显示：“This review was collected from a verified customer who purchased this item”。
                  </p>
                  <p>
                    若客户直接通过网站主动提交评论，该评论不会被标记为已验证，并会在展示界面显示：“This review was written by a site visitor”。
                  </p>
                  <p>
                    评论也可能从外部来源导入到 Loox。对于导入评论，界面会显示：“This review was imported from an external source”。
                  </p>
                  <p>
                    对于网站直接提交或导入的评论，我们可能会通过合理且适度的方法进行核验（例如要求提供有效凭证，证明客户确实购买或使用过该商品）。在这些情况下，如果我们将评论标记为“Verified purchase”，界面会显示：“This review was marked as verified by the store owner”。
                  </p>
                  <p>
                    客户可按 1 到 5 的分值对商品进行评分。平均分采用简单数学平均计算，并依据标准四舍五入规则显示为半星或整星。平均分包含了因上传照片或视频而获得下次购买优惠的评论。
                  </p>
                </>
              ) : (
                <>
                  <p>
                    We use Loox, a web-based application that provides an online reviews and marketing solution, to collect, source, process and display reviews on our website.
                  </p>
                  <p>
                    We automatically send review requests through Loox to customers for whom we have a record that they purchased products directly from our website. This allows us to verify the review’s reliability through technical means, such as the customer’s email address. Reviews that are submitted directly through such requests are marked as "Verified purchase" and the following statement will be displayed on the interface on which the review is published: "This review was collected from a verified customer who purchased this item”.
                  </p>
                  <p>
                    If a customer submits a review directly through our website, the review will not be marked as verified, and the following statement will be displayed on the interface where the review is published: “This review was written by a site visitor”.
                  </p>
                  <p>
                    Reviews may also be imported into Loox from an external source. For imported reviews, the following statement will be displayed on the interface on which the review is published: "This review was imported from an external source".
                  </p>
                  <p>
                    We may verify reviews submitted directly through our website and imported reviews using reasonable and proportionate methods, such as by requesting valid proof that the customer had actually used or purchased the product. In these cases, if we mark a review as "Verified purchase", the following statement will be displayed on the interface on which the review is published: "This review was marked as verified by the store owner".
                  </p>
                  <p>
                    Customers can choose how to rate the reviewed products based on a number between 1 and 5. The reviews’ average score is calculated using a simple mathematical average, which is then rounded to a half or full star rating using standard rounding rules. The reviews’ average score includes reviews for which customers received future purchase discounts for adding a photo or a video to their review.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
