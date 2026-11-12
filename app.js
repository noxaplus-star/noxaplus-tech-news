/*
 * NoxaPlus Tech News — application
 *
 * Vanilla JavaScript. No framework, no runtime dependencies.
 * Renders the shared masthead and footer, routes the seven static pages,
 * and keeps language, theme, bookmarks, and the demo newsletter in local storage.
 *
 * Developed by NoxaPlus — https://www.noxaplus.ir
 */
(function () {
  'use strict';

  var DATA = window.NOXA_NEWS;
  if (!DATA) return;

  var site = DATA.site;
  var categories = DATA.categories;
  var authors = DATA.authors;
  var articles = DATA.articles;

  var CAT = {};
  categories.forEach(function (c) { CAT[c.id] = c; });

  var ARTICLE_BY_SLUG = {};
  articles.forEach(function (a) { ARTICLE_BY_SLUG[a.slug] = a; });

  var LS = {
    theme: 'noxa_theme',
    lang: 'noxa_lang',
    bookmarks: 'noxa_bookmarks',
    newsletter: 'noxa_newsletter'
  };

  var UI = {
    skip: { en: 'Skip to content', fa: 'پرش به محتوای اصلی' },
    demoNewsroom: { en: 'Demo newsroom', fa: 'خبرگزاری نمایشی' },
    latestEdition: { en: 'Latest edition', fa: 'آخرین شماره' },
    themeDark: { en: 'Switch to dark theme', fa: 'تغییر به حالت تاریک' },
    themeLight: { en: 'Switch to light theme', fa: 'تغییر به حالت روشن' },
    switchFa: { en: 'Switch to Persian', fa: 'تغییر به فارسی' },
    switchEn: { en: 'Switch to English', fa: 'تغییر به انگلیسی' },
    openMenu: { en: 'Open menu', fa: 'باز کردن منو' },
    closeMenu: { en: 'Close menu', fa: 'بستن منو' },
    openSearch: { en: 'Open search', fa: 'باز کردن جست‌وجو' },
    closeSearch: { en: 'Close search', fa: 'بستن جست‌وجو' },
    close: { en: 'Close', fa: 'بستن' },
    search: { en: 'Search', fa: 'جست‌وجو' },
    searchPlaceholder: { en: 'Search stories, desks, tags…', fa: 'جست‌وجو در مقاله‌ها، میزها و برچسب‌ها…' },
    searchHint: { en: 'Try', fa: 'امتحان کنید' },
    home: { en: 'Home', fa: 'صفحه اصلی' },
    about: { en: 'About', fa: 'درباره' },
    bookmarks: { en: 'Bookmarks', fa: 'نشان‌شده‌ها' },
    all: { en: 'All', fa: 'همه' },
    allStories: { en: 'All stories', fa: 'همهٔ مقاله‌ها' },
    viewAll: { en: 'View all stories', fa: 'دیدن همهٔ مقاله‌ها' },
    coverStory: { en: 'Cover story', fa: 'مقالهٔ اصلی' },
    alsoOnFront: { en: 'Also on the front page', fa: 'همچنین در صفحهٔ اصلی' },
    editorNote: { en: 'Editor’s note', fa: 'یادداشت سردبیر' },
    demoNote: {
      en: 'This is a demo newsroom. Every story is an original editorial sample, not live reporting.',
      fa: 'این یک خبرگزاری نمایشی است. هر مقاله یک نمونهٔ تحریریهٔ اصیل است، نه گزارش زنده.'
    },
    ourStandards: { en: 'Our editorial standards', fa: 'استانداردهای تحریریهٔ ما' },
    latestKicker: { en: 'The latest', fa: 'تازه‌ها' },
    latestStories: { en: 'Latest stories', fa: 'آخرین مقاله‌ها' },
    latestDek: {
      en: 'Analysis and reporting from six desks, in English and Persian.',
      fa: 'تحلیل و گزارش از شش میز، به انگلیسی و فارسی.'
    },
    briefStories: { en: 'Editorial stories', fa: 'مقالهٔ تحریریه' },
    briefDesks: { en: 'Desks', fa: 'میز خبری' },
    briefLanguages: { en: 'Languages', fa: 'زبان' },
    briefOpen: { en: 'Open source', fa: 'متن‌باز' },
    mostRead: { en: 'Most read', fa: 'پرخوانده‌ترین‌ها' },
    theSignal: { en: 'The signal', fa: 'سیگنال' },
    theDesks: { en: 'The desks', fa: 'میزهای خبری' },
    browseDesks: { en: 'Browse all desks', fa: 'دیدن همهٔ میزها' },
    newsletterKicker: { en: 'The weekly brief', fa: 'خلاصهٔ هفتگی' },
    newsletterTitle: { en: 'One email. The week in systems.', fa: 'یک ایمیل. هفته‌ای در سیستم‌ها.' },
    newsletterDek: {
      en: 'A short, opinionated digest of the stories that will still matter next month. No spam, no tracking pixels.',
      fa: 'خلاصه‌ای کوتاه و صاحب‌نظر از مقاله‌هایی که ماه بعد هم مهم می‌مانند. بدون هرزنامه، بدون پیکسل ردیابی.'
    },
    emailPlaceholder: { en: 'you@example.com', fa: 'you@example.com' },
    subscribe: { en: 'Subscribe', fa: 'عضویت' },
    newsletterNote: {
      en: 'Demo form: your email is stored only in this browser. Nothing is sent anywhere.',
      fa: 'فرم نمایشی: ایمیل شما فقط در همین مرورگر ذخیره می‌شود. هیچ‌جا ارسال نمی‌شود.'
    },
    subscribedNote: {
      en: 'Saved. This demo keeps your email in this browser only.',
      fa: 'ذخیره شد. این نسخهٔ نمایشی ایمیل شما را فقط در همین مرورگر نگه می‌دارد.'
    },
    emailError: { en: 'Please enter a valid email address.', fa: 'لطفاً یک ایمیل معتبر وارد کنید.' },
    subscribedToast: { en: 'Subscribed locally', fa: 'عضویت محلی ثبت شد' },
    developedBy: { en: 'Developed by', fa: 'توسعه‌یافته توسط' },
    devStrip: {
      en: 'NoxaPlus builds open-source tools and editorial experiments. This newsroom is designed and developed by NoxaPlus.',
      fa: 'نواپلاس ابزارهای متن‌باز و تجربه‌های تحریریه می‌سازد. این خبرگزاری توسط نواپلاس طراحی و توسعه داده شده است.'
    },
    visitSite: { en: 'Visit noxaplus.ir', fa: 'دیدن noxaplus.ir' },
    readTheStory: { en: 'Read the story', fa: 'خواندن مقاله' },
    minRead: { en: '{n} min read', fa: '{n} دقیقه مطالعه' },
    by: { en: 'By', fa: 'نوشتهٔ' },
    published: { en: 'Published', fa: 'انتشار' },
    share: { en: 'Share', fa: 'اشتراک' },
    save: { en: 'Save story', fa: 'ذخیرهٔ مقاله' },
    removeBookmark: { en: 'Remove bookmark', fa: 'حذف از نشان‌شده‌ها' },
    savedLabel: { en: 'Saved', fa: 'ذخیره شد' },
    saveForLater: { en: 'Save for later', fa: 'برای بعد ذخیره کن' },
    copyLink: { en: 'Copy link', fa: 'کپی پیوند' },
    linkCopied: { en: 'Link copied', fa: 'پیوند کپی شد' },
    shareFailed: { en: 'Sharing is not available in this browser', fa: 'اشتراک‌گذاری در این مرورگر در دسترس نیست' },
    backToTop: { en: 'Back to top', fa: 'بازگشت به بالا' },
    inThisStory: { en: 'In this story', fa: 'در این مقاله' },
    shareThisStory: { en: 'Share this story', fa: 'این مقاله را به اشتراک بگذارید' },
    demoRail: { en: 'Demo edition', fa: 'نسخهٔ نمایشی' },
    demoRailNote: {
      en: 'This article is an original editorial sample created for the open-source NoxaPlus template.',
      fa: 'این مقاله یک نمونهٔ تحریریهٔ اصیل برای قالب متن‌باز نواپلاس است.'
    },
    rssFeed: { en: 'RSS feed', fa: 'خوراک RSS' },
    tags: { en: 'Filed under', fa: 'برچسب‌ها' },
    takeaways: { en: 'Key takeaways', fa: 'نکته‌های کلیدی' },
    olderStory: { en: 'Older story', fa: 'مقالهٔ قدیمی‌تر' },
    newerStory: { en: 'Newer story', fa: 'مقالهٔ تازه‌تر' },
    relatedStories: { en: 'Related stories', fa: 'مقاله‌های مرتبط' },
    moreFromDesk: { en: 'More from this desk', fa: 'بیشتر از این میز' },
    storiesInDesk: { en: '{n} stories in this desk', fa: '{n} مقاله در این میز' },
    sortBy: { en: 'Sort', fa: 'ترتیب' },
    newest: { en: 'Newest first', fa: 'تازه‌ترین' },
    oldest: { en: 'Oldest first', fa: 'قدیمی‌ترین' },
    longest: { en: 'Longest read', fa: 'طولانی‌ترین مطالعه' },
    clearAll: { en: 'Clear all', fa: 'پاک کردن همه' },
    clearConfirm: { en: 'Remove all bookmarks from this browser?', fa: 'همهٔ نشان‌شده‌ها از این مرورگر حذف شوند؟' },
    bookmarksKicker: { en: 'Your reading list', fa: 'فهرست خواندن شما' },
    bookmarksTitle: { en: 'Bookmarks', fa: 'نشان‌شده‌ها' },
    bookmarksDek: {
      en: 'Stories you save live in this browser. No account, no sync, no tracking.',
      fa: 'مقاله‌هایی که ذخیره می‌کنید در همین مرورگر می‌مانند. بدون حساب، بدون همگام‌سازی، بدون ردیابی.'
    },
    noBookmarks: { en: 'Nothing saved yet', fa: 'هنوز چیزی ذخیره نشده' },
    noBookmarksDek: {
      en: 'Tap the bookmark icon on any story to build a quiet reading list.',
      fa: 'روی نماد نشان‌کردن هر مقاله بزنید تا یک فهرست خواندن آرام بسازید.'
    },
    browseStories: { en: 'Browse stories', fa: 'دیدن مقاله‌ها' },
    searchKicker: { en: 'Search the archive', fa: 'جست‌وجو در آرشیو' },
    searchTitle: { en: 'Find the signal', fa: 'سیگنال را پیدا کنید' },
    searchDek: {
      en: 'Search every headline, deck, tag, and paragraph in English or Persian.',
      fa: 'در همهٔ تیترها، خلاصه‌ها، برچسب‌ها و پاراگراف‌ها به انگلیسی یا فارسی جست‌وجو کنید.'
    },
    resultsFor: { en: 'Results for “{q}”', fa: 'نتایج برای «{q}»' },
    noResults: { en: 'No stories matched', fa: 'مقاله‌ای پیدا نشد' },
    noResultsDek: { en: 'Try a broader term, or browse a desk instead.', fa: 'عبارت کلی‌تری امتحان کنید یا یکی از میزها را ببینید.' },
    tryThese: { en: 'Try these', fa: 'این‌ها را امتحان کنید' },
    browseAll: { en: 'Browse all stories', fa: 'دیدن همهٔ مقاله‌ها' },
    allDesks: { en: 'All desks', fa: 'همهٔ میزها' },
    aboutKicker: { en: 'About the newsroom', fa: 'دربارهٔ خبرگزاری' },
    aboutTitle: { en: 'Signals, not noise.', fa: 'سیگنال، نه هیاهو.' },
    editorialNote: { en: 'Editorial note', fa: 'یادداشت تحریریه' },
    contact: { en: 'Contact', fa: 'تماس' },
    website: { en: 'Website', fa: 'وب‌سایت' },
    email: { en: 'Email', fa: 'ایمیل' },
    phone: { en: 'Phone', fa: 'تلفن' },
    license: { en: 'License', fa: 'مجوز' },
    sourceCode: { en: 'Source code', fa: 'کد منبع' },
    backHome: { en: 'Back to the front page', fa: 'بازگشت به صفحهٔ اصلی' },
    notFoundTitle: { en: 'This page missed its deadline', fa: 'این صفحه به موقع نرسید' },
    notFoundDek: {
      en: 'The link may be broken or the story may have moved. The front page is still where you left it.',
      fa: 'ممکن است پیوند شکسته باشد یا مقاله جابه‌جا شده باشد. صفحهٔ اصلی همچنان همان‌جاست.'
    },
    storyNotFound: { en: 'Story not found', fa: 'مقاله پیدا نشد' },
    storyNotFoundDek: {
      en: 'That address does not match any story in this edition. Try the archive or the front page.',
      fa: 'این نشانی با هیچ مقاله‌ای در این شماره مطابقت ندارد. آرشیو یا صفحهٔ اصلی را امتحان کنید.'
    },
    illustration: {
      en: 'Illustration: NoxaPlus Studio / generative artwork',
      fa: 'تصویر: استودیو نواپلاس / اثر مولد'
    },
    frontPage: { en: 'Front page', fa: 'صفحهٔ اصلی' },
    footerRights: { en: '© 2026 NoxaPlus. Released under the MIT License.', fa: '© ۲۰۲۶ نواپلاس. منتشرشده با مجوز MIT.' },
    footerDemo: {
      en: 'Demo newsroom. All stories are original editorial samples, not live reporting.',
      fa: 'خبرگزاری نمایشی. همهٔ مقاله‌ها نمونهٔ تحریریهٔ اصیل هستند، نه گزارش زنده.'
    },
    savedToast: { en: 'Saved to your reading list', fa: 'به فهرست خواندن اضافه شد' },
    removedToast: { en: 'Removed from bookmarks', fa: 'از نشان‌شده‌ها حذف شد' },
    filterBy: { en: 'Filter by desk', fa: 'فیلتر بر اساس میز' },
    skipToContent: { en: 'Skip to content', fa: 'پرش به محتوا' },
    readTimeLabel: { en: 'Reading time', fa: 'زمان مطالعه' },
    resultsCount: { en: '{n} found', fa: '{n} نتیجه' },
    browseArchive: { en: 'Browse the archive', fa: 'مرور آرشیو' },
    allStoriesIn: { en: 'All stories', fa: 'همهٔ مقاله‌ها' },
    storyCountOne: { en: '1 story', fa: '۱ مقاله' },
    storyCount: { en: '{n} stories', fa: '{n} مقاله' }
  };

  function t(key) {
    var entry = UI[key];
    return entry ? entry[state.lang] : key;
  }

  function bi(en, fa) {
    return state.lang === 'fa' ? fa : en;
  }

  var state = {
    lang: 'en',
    theme: 'light',
    bookmarks: new Set()
  };

  var ICONS = {
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/></svg>',
    bookmark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M6 4.5h12v16l-6-4-6 4z"/></svg>',
    sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4"/></svg>',
    moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M5 5l14 14M19 5 5 19"/></svg>',
    share: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="18" cy="5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="m8.2 10.8 7.6-4.5M8.2 13.2l7.6 4.5"/></svg>',
    link: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.1.1l2-2a5 5 0 0 0-7.1-7.1l-1.1 1.1"/><path d="M14 11a5 5 0 0 0-7.1-.1l-2 2A5 5 0 0 0 12 20l1.1-1.1"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7v5.2l3.2 2"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6"/></svg>',
    rss: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M5 19a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM5 11a8 8 0 0 1 8 8M5 5a14 14 0 0 1 14 14"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a12 12 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/></svg>',
    globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/></svg>',
    github: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.36 1.09 2.93.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m4 12 5 5L20 6"/></svg>',
    empty: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 4.5h12v16l-6-4-6 4z"/><path d="M9 9h6"/></svg>'
  };

  /* ---------- Storage and formatting ---------- */

  function readRaw(key, fallback) {
    try {
      var value = localStorage.getItem(key);
      return value === null ? fallback : value;
    } catch (error) {
      return fallback;
    }
  }

  function writeRaw(key, value) {
    try { localStorage.setItem(key, value); } catch (error) { /* private mode */ }
  }

  function readJSON(key, fallback) {
    var raw = readRaw(key, null);
    if (!raw) return fallback;
    try {
      var parsed = JSON.parse(raw);
      return parsed === null || parsed === undefined ? fallback : parsed;
    } catch (error) {
      return fallback;
    }
  }

  function writeJSON(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (error) { /* private mode */ }
  }

  function esc(value) {
    return String(value === null || value === undefined ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function enc(value) {
    return encodeURIComponent(String(value));
  }

  function num(value) {
    try {
      return new Intl.NumberFormat(state.lang === 'fa' ? 'fa-IR' : 'en-GB').format(value);
    } catch (error) {
      return String(value);
    }
  }

  var dateCache = {};
  function fmtDate(iso) {
    var key = iso + '|' + state.lang;
    if (dateCache[key]) return dateCache[key];
    var date = new Date(iso + 'T12:00:00Z');
    try {
      dateCache[key] = new Intl.DateTimeFormat(
        state.lang === 'fa' ? 'fa-IR-u-ca-persian' : 'en-GB',
        { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }
      ).format(date);
    } catch (error) {
      dateCache[key] = iso;
    }
    return dateCache[key];
  }

  function minRead(a) {
    return t('minRead').replace('{n}', num(a.readMins[state.lang]));
  }

  function storyCount(n) {
    return n === 1 ? t('storyCountOne') : t('storyCount').replace('{n}', num(n));
  }

  function categoryOf(a) { return CAT[a.category]; }

  function categoryName(c) {
    return state.lang === 'fa' ? c.fa : c.en;
  }

  function categoryShort(c) {
    return state.lang === 'fa' ? c.shortFa : c.shortEn;
  }

  function authorName(a) {
    var author = authors[a.author] || authors.editorial;
    return state.lang === 'fa' ? author.fa : author.en;
  }

  function articleHref(a) {
    return 'article.html?slug=' + enc(a.slug);
  }

  function categoryHref(c) {
    return 'category.html?c=' + enc(c.id);
  }

  function abs(path) {
    return site.url + path;
  }

  function slug() {
    try {
      return new URLSearchParams(window.location.search).get('slug') || '';
    } catch (error) {
      return '';
    }
  }

  function currentParam(name) {
    try {
      return new URLSearchParams(window.location.search).get(name) || '';
    } catch (error) {
      return '';
    }
  }

  /* ---------- Small UI fragments ---------- */

  function logoSVG(cls) {
    return '<svg class="' + (cls || 'brand-mark') + '" viewBox="0 0 48 48" aria-hidden="true" focusable="false">' +
      '<rect width="48" height="48" rx="5" fill="#12130f"/>' +
      '<path d="M11 37V11h6.4L30.6 28V11H37v26h-6.4L17 19.5V37z" fill="#d8ff3e"/>' +
      '<rect x="36" y="3" width="9" height="9" fill="#d8ff3e"/>' +
      '</svg>';
  }

  function badge(cat, plain) {
    return '<span class="badge cat-' + cat.id + (plain ? ' badge--plain' : '') + '">' + esc(categoryShort(cat)) + '</span>';
  }

  function categoryDot(cat) {
    return '<span class="dot cat-' + cat.id + '" style="background:' + cat.color + '"></span>';
  }

  function saveButton(a, label) {
    var saved = state.bookmarks.has(a.slug);
    var text = saved ? t('savedLabel') : t('saveForLater');
    return '<button type="button" class="' + (label ? 'btn btn--sm' : 'save-btn') + (saved ? ' is-saved' : '') + '"' +
      ' data-action="bookmark" data-slug="' + esc(a.slug) + '"' +
      ' aria-pressed="' + (saved ? 'true' : 'false') + '"' +
      ' aria-label="' + esc(saved ? t('removeBookmark') : t('save')) + '">' +
      ICONS.bookmark + (label ? '<span data-save-label>' + esc(text) + '</span>' : '') +
      '</button>';
  }

  function storyMeta(a, opts) {
    var options = opts || {};
    var parts = [];
    if (options.author !== false) parts.push('<span>' + esc(authorName(a)) + '</span>');
    parts.push('<time datetime="' + esc(a.date) + '">' + esc(fmtDate(a.date)) + '</time>');
    if (options.read !== false) parts.push('<span>' + esc(minRead(a)) + '</span>');
    return '<div class="meta-row">' + parts.join('<span class="sep" aria-hidden="true"></span>') + '</div>';
  }

  function ticker() {
    var items = articles.slice(0, 4);
    function group(duplicate) {
      return items.map(function (a) {
        return '<a href="' + articleHref(a) + '"' + (duplicate ? ' tabindex="-1" aria-hidden="true"' : '') + '>' +
          esc(a.title[state.lang]) + '</a><span class="ticker-sep" aria-hidden="true">◆</span>';
      }).join('');
    }
    return '<div class="ticker" role="region" aria-label="' + esc(bi('Latest headlines', 'آخرین تیترها')) + '">' +
      '<div class="ticker-inner">' +
        '<span class="ticker-label"><span class="live-dot" aria-hidden="true"></span>' + esc(t('latestKicker')) + '</span>' +
        '<div class="ticker-viewport"><div class="ticker-track">' + group(false) + group(true) + '</div></div>' +
      '</div>' +
    '</div>';
  }

  function leadStory(a) {
    var cat = categoryOf(a);
    return '<article class="lead-story cat-' + cat.id + '">' +
      '<a class="lead-cover" href="' + articleHref(a) + '" aria-label="' + esc(a.title[state.lang]) + '">' +
        '<img src="' + esc(a.cover) + '" alt="" width="1200" height="675" fetchpriority="high" decoding="async">' +
      '</a>' +
      '<div class="lead-body">' +
        '<div class="lead-flags">' + badge(cat) + '<span class="mono">' + esc(t('coverStory')) + '</span></div>' +
        '<h1 class="lead-title"><a href="' + articleHref(a) + '">' + esc(a.title[state.lang]) + '</a></h1>' +
        '<p class="lead-dek">' + esc(a.dek[state.lang]) + '</p>' +
        storyMeta(a) +
        '<div class="lead-actions"><a class="btn btn--solid" href="' + articleHref(a) + '">' + esc(t('readTheStory')) + ' ' + ICONS.arrow + '</a>' + saveButton(a, true) + '</div>' +
      '</div>' +
    '</article>';
  }

  function miniCard(a) {
    var cat = categoryOf(a);
    return '<article class="mini-card cat-' + cat.id + '">' +
      '<a class="mini-thumb" href="' + articleHref(a) + '" aria-hidden="true" tabindex="-1">' +
        '<img src="' + esc(a.cover) + '" alt="" width="1200" height="675" loading="lazy" decoding="async">' +
      '</a>' +
      '<div>' +
        '<div class="mini-meta">' + badge(cat) + '<span class="mono">' + esc(fmtDate(a.date)) + '</span></div>' +
        '<h3 class="mini-title"><a href="' + articleHref(a) + '">' + esc(a.title[state.lang]) + '</a></h3>' +
        '<p class="mini-dek">' + esc(a.dek[state.lang]) + '</p>' +
      '</div>' +
    '</article>';
  }

  function storyCard(a, extraClass) {
    var cat = categoryOf(a);
    return '<article class="story-card cat-' + cat.id + (extraClass ? ' ' + extraClass : '') + '">' +
      '<a class="card-cover" href="' + articleHref(a) + '" aria-label="' + esc(a.title[state.lang]) + '">' +
        '<img src="' + esc(a.cover) + '" alt="" width="1200" height="675" loading="lazy" decoding="async">' +
      '</a>' +
      '<div class="card-body">' +
        '<div class="card-top">' + badge(cat) + '<span class="card-date">' + esc(fmtDate(a.date)) + '</span></div>' +
        '<h3 class="card-title"><a href="' + articleHref(a) + '">' + esc(a.title[state.lang]) + '</a></h3>' +
        '<p class="card-dek">' + esc(a.dek[state.lang]) + '</p>' +
        '<div class="card-foot"><span>' + esc(authorName(a)) + '</span><span aria-hidden="true">·</span><span>' + esc(minRead(a)) + '</span>' + saveButton(a) + '</div>' +
      '</div>' +
    '</article>';
  }

  function categoryChips(active, hrefFor) {
    var allHref = hrefFor ? hrefFor('all') : 'search.html';
    var chips = ['<a class="chip' + (!active ? ' is-active' : '') + '" href="' + allHref + '"' +
      (!active ? ' aria-current="page"' : '') + '>' + esc(t('all')) + '</a>'];
    chips = chips.concat(categories.map(function (c) {
      var activeCat = active === c.id;
      return '<a class="chip cat-' + c.id + (activeCat ? ' is-active' : '') + '" href="' + hrefFor(c.id) + '"' +
        (activeCat ? ' aria-current="page"' : '') + '>' +
        '<span class="dot" style="background:' + c.color + '"></span>' + esc(categoryShort(c)) + '</a>';
    }));
    return '<nav class="chips" aria-label="' + esc(t('filterBy')) + '">' + chips.join('') + '</nav>';
  }

  function newsletterBand() {
    var saved = readJSON(LS.newsletter, null);
    return '<section class="newsletter-band" id="newsletter">' +
      '<div class="container newsletter-inner">' +
        '<div>' +
          '<p class="kicker">' + esc(t('newsletterKicker')) + '</p>' +
          '<h2>' + esc(t('newsletterTitle')) + '</h2>' +
          '<p>' + esc(t('newsletterDek')) + '</p>' +
        '</div>' +
        '<form class="newsletter-form" data-form="newsletter" novalidate>' +
          '<label class="visually-hidden" for="newsletter-email">' + esc(t('email')) + '</label>' +
          '<div class="input-row">' +
            '<input id="newsletter-email" type="email" name="email" autocomplete="email" placeholder="' + esc(t('emailPlaceholder')) + '" required>' +
            '<button class="btn btn--solid" type="submit">' + esc(t('subscribe')) + '</button>' +
          '</div>' +
          '<p class="form-note">' + esc(t('newsletterNote')) + '</p>' +
          '<p class="form-status" data-status aria-live="polite">' + (saved ? esc(t('subscribedNote')) : '') + '</p>' +
        '</form>' +
      '</div>' +
    '</section>';
  }

  function aboutStrip() {
    return '<section class="about-strip"><div class="container"><div class="about-strip-inner">' +
      logoSVG('brand-mark') +
      '<div>' +
        '<p class="kicker">' + esc(t('developedBy')) + '</p>' +
        '<h2>NoxaPlus</h2>' +
        '<p>' + esc(t('devStrip')) + '</p>' +
      '</div>' +
      '<div class="about-links">' +
        '<a href="' + site.website + '" target="_blank" rel="noopener noreferrer">' + esc(t('visitSite')) + '</a>' +
        '<a href="about.html">' + esc(t('about')) + '</a>' +
      '</div>' +
    '</div></div></section>';
  }

  /* ---------- Header and footer ---------- */

  function navLink(href, label, active) {
    return '<a class="nav-link" href="' + href + '"' + (active ? ' aria-current="page"' : '') + '>' + esc(label) + '</a>';
  }

  function headerHTML() {
    var page = document.body.dataset.page;
    var activeCat = page === 'category' ? currentParam('c') : '';
    var q = page === 'search' ? currentParam('q') : '';
    var nav = [
      navLink('index.html', t('home'), page === 'home')
    ].concat(categories.map(function (c) {
      return navLink(categoryHref(c), categoryShort(c), activeCat === c.id);
    })).concat([
      navLink('about.html', t('about'), page === 'about')
    ]).join('');

    var mobileNav = [
      '<a href="index.html">' + esc(t('home')) + '<span>01</span></a>'
    ].concat(categories.map(function (c, index) {
      return '<a class="cat-' + c.id + '" href="' + categoryHref(c) + '">' + esc(categoryName(c)) + '<span>' + String(index + 2).padStart(2, '0') + '</span></a>';
    })).concat([
      '<a href="about.html">' + esc(t('about')) + '<span>' + String(categories.length + 2).padStart(2, '0') + '</span></a>',
      '<a href="search.html">' + esc(t('search')) + '<span>' + String(categories.length + 3).padStart(2, '0') + '</span></a>',
      '<a href="bookmarks.html">' + esc(t('bookmarks')) + '<span>' + String(categories.length + 4).padStart(2, '0') + '</span></a>'
    ]).join('');

    return '<div class="topbar"><div class="container topbar-inner">' +
        '<span class="topbar-date">' + esc(t('latestEdition')) + ' · ' + esc(fmtDate(articles[0].date)) + '</span>' +
        '<span class="topbar-edition">' + esc(site.edition[state.lang]) + '</span>' +
        '<span class="topbar-demo">' + esc(t('demoNewsroom')) + '</span>' +
      '</div></div>' +
      '<div class="masthead-shell">' +
        '<div class="container masthead-inner">' +
          '<a class="brand" href="index.html" aria-label="NoxaPlus Tech News — ' + esc(t('home')) + '">' +
            logoSVG('brand-mark') +
            '<span class="brand-text"><span class="brand-name">NoxaPlus</span><span class="brand-sub">Tech News</span></span>' +
          '</a>' +
          '<div class="masthead-tools">' +
            '<button type="button" class="tool-btn search-toggle" data-action="search" aria-expanded="false" aria-controls="search-drawer" aria-label="' + esc(t('openSearch')) + '">' +
              ICONS.search + '<span>' + esc(t('search')) + '</span>' +
            '</button>' +
            '<a class="tool-btn bookmark-tool" href="bookmarks.html" aria-label="' + esc(t('bookmarks')) + '">' +
              ICONS.bookmark + '<span>' + esc(t('bookmarks')) + '</span><span class="tool-count" data-bookmark-count hidden>0</span>' +
            '</a>' +
            '<button type="button" class="icon-btn" data-action="theme" aria-label="' + esc(state.theme === 'dark' ? t('themeLight') : t('themeDark')) + '">' +
              (state.theme === 'dark' ? ICONS.sun : ICONS.moon) +
            '</button>' +
            '<button type="button" class="lang-btn" data-action="lang" aria-label="' + esc(state.lang === 'fa' ? t('switchEn') : t('switchFa')) + '" lang="' + (state.lang === 'fa' ? 'en' : 'fa') + '">' +
              (state.lang === 'fa' ? 'EN' : 'فا') +
            '</button>' +
            '<button type="button" class="icon-btn menu-btn" data-action="menu" aria-expanded="false" aria-controls="mobile-drawer" aria-label="' + esc(t('openMenu')) + '">' +
              ICONS.menu +
            '</button>' +
          '</div>' +
        '</div>' +
        '<nav class="mainnav" aria-label="' + esc(bi('Primary navigation', 'ناوبری اصلی')) + '"><div class="container nav-inner">' + nav + '</div></nav>' +
        '<div class="search-drawer" id="search-drawer" hidden>' +
          '<div class="container">' +
            '<form class="search-form" action="search.html" method="get" role="search">' +
              '<label class="visually-hidden" for="header-search">' + esc(t('search')) + '</label>' +
              '<input id="header-search" type="search" name="q" value="' + esc(q) + '" placeholder="' + esc(t('searchPlaceholder')) + '" autocomplete="off">' +
              '<button class="btn btn--solid" type="submit">' + ICONS.search + '<span>' + esc(t('search')) + '</span></button>' +
            '</form>' +
            '<div class="search-hints"><span>' + esc(t('searchHint')) + ':</span>' +
              '<a href="search.html?q=AI">AI</a><a href="search.html?q=passkeys">passkeys</a><a href="search.html?q=battery">battery</a><a href="search.html?q=local-first">local-first</a>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="mobile-drawer" id="mobile-drawer" hidden>' +
          '<div class="container">' +
            '<nav class="mobile-nav" aria-label="' + esc(bi('Mobile navigation', 'ناوبری موبایل')) + '">' + mobileNav + '</nav>' +
            '<div class="drawer-foot">' +
              '<a class="btn btn--sm" href="feed.xml">' + ICONS.rss + '<span>' + esc(t('rssFeed')) + '</span></a>' +
              '<a class="btn btn--sm" href="search.html">' + ICONS.search + '<span>' + esc(t('search')) + '</span></a>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';
  }

  function footerHTML() {
    var deskLinks = categories.map(function (c) {
      return '<li><a href="' + categoryHref(c) + '">' + esc(categoryName(c)) + '</a></li>';
    }).join('');
    return '<footer class="site-footer">' +
      '<div class="container footer-top">' +
        '<div class="footer-brand">' +
          '<a class="brand" href="index.html">' +
            logoSVG('brand-mark') +
            '<span class="brand-text"><span class="brand-name">NoxaPlus</span><span class="brand-sub">Tech News</span></span>' +
          '</a>' +
          '<p>' + esc(site.description[state.lang]) + '</p>' +
          '<span class="footer-edition">' + esc(site.edition[state.lang]) + '</span>' +
        '</div>' +
        '<nav class="footer-col" aria-label="' + esc(t('theDesks')) + '">' +
          '<h3>' + esc(t('theDesks')) + '</h3><ul>' + deskLinks + '</ul>' +
        '</nav>' +
        '<nav class="footer-col" aria-label="' + esc(bi('Site', 'سایت')) + '">' +
          '<h3>' + esc(bi('Site', 'سایت')) + '</h3>' +
          '<ul>' +
            '<li><a href="about.html">' + esc(t('about')) + '</a></li>' +
            '<li><a href="search.html">' + esc(t('search')) + '</a></li>' +
            '<li><a href="bookmarks.html">' + esc(t('bookmarks')) + '</a></li>' +
            '<li><a href="feed.xml">' + esc(t('rssFeed')) + '</a></li>' +
            '<li><a href="sitemap.xml">' + esc(bi('Sitemap', 'نقشهٔ سایت')) + '</a></li>' +
            '<li><a href="LICENSE">' + esc(t('license')) + '</a></li>' +
          '</ul>' +
        '</nav>' +
        '<div class="footer-col">' +
          '<h3>' + esc(t('contact')) + '</h3>' +
          '<ul>' +
            '<li><a href="' + site.website + '" target="_blank" rel="noopener noreferrer">' + esc(t('website')) + ': noxaplus.ir</a></li>' +
            '<li><a href="mailto:' + site.email + '">' + esc(t('email')) + ': ' + esc(site.email) + '</a></li>' +
            '<li><span class="contact-line">' + ICONS.phone + '<a href="tel:+989198690446" dir="ltr">' + esc(site.phone) + '</a></span></li>' +
            '<li><a href="https://github.com/noxaplus-star/noxaplus-tech-news" target="_blank" rel="noopener noreferrer">' + esc(t('sourceCode')) + ' · GitHub</a></li>' +
          '</ul>' +
        '</div>' +
      '</div>' +
      '<div class="container footer-bottom">' +
        '<p>' + esc(t('footerRights')) + '</p>' +
        '<p class="footer-demo">' + esc(t('footerDemo')) + '</p>' +
        '<a href="#main" data-action="top">' + esc(t('backToTop')) + ' ↑</a>' +
      '</div>' +
      '</footer>';
  }

  /* ---------- Pages ---------- */

  function renderHome() {
    var featured = articles.filter(function (a) { return a.featured; });
    var lead = featured[0] || articles[0];
    var side = featured.filter(function (a) { return a !== lead; }).slice(0, 2);
    var excluded = [lead].concat(side);
    var latest = articles.filter(function (a) { return excluded.indexOf(a) === -1; }).slice(0, 5);

    return ticker() +
      '<section class="hero-section"><div class="container"><div class="hero-grid">' +
        leadStory(lead) +
        '<aside class="hero-side" aria-label="' + esc(t('alsoOnFront')) + '">' +
          '<p class="kicker">' + esc(t('alsoOnFront')) + '</p>' +
          side.map(miniCard).join('') +
          '<div class="editor-note">' +
            '<span class="mono">' + esc(t('editorNote')) + '</span>' +
            '<p>' + esc(t('demoNote')) + '</p>' +
            '<a href="about.html#editorial-note">' + esc(t('ourStandards')) + ' →</a>' +
          '</div>' +
        '</aside>' +
      '</div></div></section>' +
      '<section class="brief"><div class="container"><div class="brief-grid">' +
        '<div class="brief-item"><strong>' + num(articles.length) + '</strong><span>' + esc(t('briefStories')) + '</span></div>' +
        '<div class="brief-item"><strong>' + num(categories.length) + '</strong><span>' + esc(t('briefDesks')) + '</span></div>' +
        '<div class="brief-item"><strong>2</strong><span>' + esc(t('briefLanguages')) + '</span></div>' +
        '<div class="brief-item"><strong>MIT</strong><span>' + esc(t('briefOpen')) + '</span></div>' +
      '</div></div></section>' +
      '<section class="section"><div class="container">' +
        '<div class="section-head">' +
          '<div><p class="kicker">' + esc(t('latestKicker')) + '</p><h2>' + esc(t('latestStories')) + '</h2></div>' +
          '<div><p class="section-dek">' + esc(t('latestDek')) + '</p><a class="text-link" href="search.html">' + esc(t('viewAll')) + ' ' + ICONS.arrow + '</a></div>' +
        '</div>' +
        categoryChips(null, function (id) { return id === 'all' ? 'search.html' : 'category.html?c=' + enc(id); }) +
        '<div class="news-grid">' + latest.map(function (a, index) { return storyCard(a, index === 0 ? 'story-card--wide' : ''); }).join('') + '</div>' +
      '</div></section>' +
      '<section class="split-grid container">' +
        '<div class="panel panel--ink">' +
          '<div class="panel-head"><div><p class="kicker">' + esc(t('mostRead')) + '</p><h2>' + esc(t('theSignal')) + '</h2></div></div>' +
          '<ol class="trend-list">' + trending().map(function (a, index) {
            return '<li class="trend-item"><span class="trend-num">' + String(index + 1).padStart(2, '0') + '</span>' +
              '<div class="trend-body"><div class="meta">' + esc(categoryShort(categoryOf(a))) + ' · ' + esc(fmtDate(a.date)) + '</div>' +
              '<h3 class="trend-title"><a href="' + articleHref(a) + '">' + esc(a.title[state.lang]) + '</a></h3></div></li>';
          }).join('') + '</ol>' +
        '</div>' +
        '<div class="panel">' +
          '<div class="panel-head"><div><p class="kicker">' + esc(t('browseDesks')) + '</p><h2>' + esc(t('theDesks')) + '</h2></div></div>' +
          '<ul class="desk-list">' + categories.map(function (c) {
            return '<li><a class="desk-row cat-' + c.id + '" href="' + categoryHref(c) + '"><span class="desk-dot"></span>' +
              '<span class="desk-name">' + esc(categoryName(c)) + '</span><span class="desk-count">' + storyCount(countByCat(c.id)) + '</span>' +
              '<span class="arrow" aria-hidden="true">→</span></a></li>';
          }).join('') + '</ul>' +
          '<a class="text-link" href="search.html">' + esc(t('allStories')) + ' ' + ICONS.arrow + '</a>' +
        '</div>' +
      '</section>' +
      newsletterBand() +
      aboutStrip();
  }

  function trending() {
    return articles.filter(function (a) { return a.trending; })
      .sort(function (a, b) { return a.trending - b.trending; })
      .slice(0, 4);
  }

  function countByCat(id) {
    return articles.filter(function (a) { return a.category === id; }).length;
  }

  function renderCategory() {
    var c = CAT[currentParam('c')];
    if (!c) {
      document.body.dataset.page = '404';
      return render404();
    }
    var sort = currentParam('sort') || 'newest';
    var list = articles.filter(function (a) { return a.category === c.id; });
    if (sort === 'oldest') list = list.slice().reverse();
    if (sort === 'longest') {
      list = list.slice().sort(function (a, b) { return b.readMins[state.lang] - a.readMins[state.lang]; });
    }

    return '<section class="page-hero category-hero cat-' + c.id + '" style="--cat:' + c.color + ';--cat-soft:' + c.soft + '">' +
        '<div class="container">' +
          '<p class="page-kicker">' + esc(t('theDesks')) + ' / ' + esc(categoryShort(c)) + '</p>' +
          '<h1 class="page-title">' + esc(categoryName(c)) + '</h1>' +
          '<p class="page-dek">' + esc(c.desc[state.lang]) + '</p>' +
          '<div class="page-hero-foot"><span class="page-count">' + esc(storyCount(list.length)) + '</span>' +
            '<a class="text-link" href="search.html">' + esc(t('allStories')) + ' ' + ICONS.arrow + '</a>' +
          '</div>' +
        '</div>' +
      '</section>' +
      '<div class="container">' +
        '<div class="toolbar">' +
          categoryChips(c.id, function (id) { return id === 'all' ? 'search.html' : 'category.html?c=' + enc(id); }) +
          '<label class="sort-control">' + esc(t('sortBy')) +
            '<select data-sort aria-label="' + esc(t('sortBy')) + '">' +
              '<option value="newest"' + (sort === 'newest' ? ' selected' : '') + '>' + esc(t('newest')) + '</option>' +
              '<option value="oldest"' + (sort === 'oldest' ? ' selected' : '') + '>' + esc(t('oldest')) + '</option>' +
              '<option value="longest"' + (sort === 'longest' ? ' selected' : '') + '>' + esc(t('longest')) + '</option>' +
            '</select>' +
          '</label>' +
        '</div>' +
        '<div class="news-grid">' + list.map(function (a) { return storyCard(a); }).join('') + '</div>' +
      '</div>' +
      '<section class="section"><div class="container">' +
        '<div class="section-head"><div><p class="kicker">' + esc(t('theDesks')) + '</p><h2>' + esc(t('allDesks')) + '</h2></div>' +
          '<a class="text-link" href="about.html">' + esc(t('about')) + '</a></div>' +
        '<div class="chips">' + categories.filter(function (other) { return other.id !== c.id; }).map(function (other) {
          return '<a class="chip cat-' + other.id + '" href="' + categoryHref(other) + '"><span class="dot" style="background:' + other.color + '"></span>' + esc(categoryName(other)) + '</a>';
        }).join('') + '</div>' +
      '</div></section>';
  }

  function normalize(value) {
    return String(value || '')
      .toLocaleLowerCase()
      .replace(/[يى]/g, 'ی')
      .replace(/ك/g, 'ک')
      .replace(/[\u064B-\u065F\u0670]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function blockText(block) {
    if (block.type === 'list') {
      return (block.en || []).concat(block.fa || []).join(' ');
    }
    return (block.en || '') + ' ' + (block.fa || '');
  }

  function haystack(a) {
    return normalize([
      a.title.en, a.title.fa, a.dek.en, a.dek.fa,
      a.tags.map(function (tag) { return tag.en + ' ' + tag.fa; }).join(' '),
      a.body.map(blockText).join(' ')
    ].join(' '));
  }

  function matches(a, query) {
    var terms = normalize(query).split(' ').filter(Boolean);
    if (!terms.length) return true;
    var hay = haystack(a);
    return terms.every(function (term) { return hay.indexOf(term) !== -1; });
  }

  function escapeRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function highlight(value, query) {
    var raw = String(value || '');
    var terms = query.trim().split(/\s+/).filter(Boolean);
    if (!terms.length) return esc(raw);
    var re;
    try {
      re = new RegExp('(' + terms.map(escapeRegExp).join('|') + ')', 'gi');
    } catch (error) {
      return esc(raw);
    }
    var out = '';
    var last = 0;
    var match;
    while ((match = re.exec(raw)) !== null) {
      if (match.index > last) out += esc(raw.slice(last, match.index));
      out += '<mark>' + esc(match[0]) + '</mark>';
      last = match.index + match[0].length;
      if (!match[0].length) re.lastIndex += 1;
    }
    out += esc(raw.slice(last));
    return out;
  }

  function resultRow(a, query) {
    var cat = categoryOf(a);
    return '<article class="result-row cat-' + cat.id + '">' +
      '<a class="result-thumb" href="' + articleHref(a) + '" aria-hidden="true" tabindex="-1">' +
        '<img src="' + esc(a.cover) + '" alt="" width="1200" height="675" loading="lazy" decoding="async">' +
      '</a>' +
      '<div>' +
        '<div class="result-meta">' + badge(cat) + '<span class="card-date">' + esc(fmtDate(a.date)) + '</span></div>' +
        '<h2 class="result-title"><a href="' + articleHref(a) + '">' + highlight(a.title[state.lang], query) + '</a></h2>' +
        '<p class="result-dek">' + highlight(a.dek[state.lang], query) + '</p>' +
        '<div class="result-foot">' + storyMeta(a, { author: false }) + saveButton(a) + '</div>' +
      '</div>' +
    '</article>';
  }

  function renderSearch() {
    var q = currentParam('q').trim();
    var active = currentParam('c') || 'all';
    var list = articles.filter(function (a) {
      return (!q || matches(a, q)) && (active === 'all' || a.category === active);
    });
    var chips = categoryChips(active === 'all' ? null : active, function (id) {
      var params = new URLSearchParams();
      if (q) params.set('q', q);
      if (id !== 'all') params.set('c', id);
      var query = params.toString();
      return 'search.html' + (query ? '?' + query : '');
    });
    var summary = q
      ? '<strong>' + esc(t('resultsFor').replace('{q}', q)) + '</strong>'
      : '<strong>' + esc(t('browseArchive')) + '</strong>';

    var body = '';
    if (list.length) {
      body = '<div class="result-list">' + list.map(function (a) { return resultRow(a, q); }).join('') + '</div>';
    } else {
      body = '<div class="empty-state">' +
        '<span class="empty-icon">' + ICONS.search + '</span>' +
        '<h2>' + esc(t('noResults')) + '</h2>' +
        '<p>' + esc(t('noResultsDek')) + '</p>' +
        '<p class="kicker">' + esc(t('tryThese')) + '</p>' +
        '<div class="chips">' +
          '<a class="chip" href="search.html?q=AI">AI</a>' +
          '<a class="chip" href="search.html?q=passkeys">passkeys</a>' +
          '<a class="chip" href="search.html?q=battery">battery</a>' +
          '<a class="chip" href="search.html?q=local-first">local-first</a>' +
        '</div>' +
        '<a class="btn" href="search.html">' + esc(t('browseAll')) + '</a>' +
      '</div>';
    }

    return '<section class="page-hero search-hero"><div class="container">' +
        '<p class="page-kicker kicker">' + esc(t('searchKicker')) + '</p>' +
        '<h1 class="page-title">' + esc(t('searchTitle')) + '</h1>' +
        '<p class="page-dek">' + esc(t('searchDek')) + '</p>' +
        '<form class="search-form search-form--large" action="search.html" method="get" role="search" style="margin-top:24px">' +
          '<label class="visually-hidden" for="page-search">' + esc(t('search')) + '</label>' +
          '<input id="page-search" type="search" name="q" value="' + esc(q) + '" placeholder="' + esc(t('searchPlaceholder')) + '" autocomplete="off">' +
          '<button class="btn btn--solid" type="submit">' + ICONS.search + '<span>' + esc(t('search')) + '</span></button>' +
        '</form>' +
      '</div></section>' +
      '<div class="container">' +
        '<div class="toolbar">' + chips + '<span class="page-count">' + esc(t('resultsCount').replace('{n}', num(list.length))) + '</span></div>' +
        '<div class="search-summary"><p>' + summary + '</p>' + (q ? '<a class="text-link" href="search.html">' + esc(t('browseAll')) + '</a>' : '') + '</div>' +
        body +
      '</div>';
  }

  function renderBookmarks() {
    var list = articles.filter(function (a) { return state.bookmarks.has(a.slug); });
    var head = '<section class="page-hero"><div class="container">' +
      '<div class="bookmarks-head">' +
        '<div><p class="page-kicker kicker">' + esc(t('bookmarksKicker')) + '</p>' +
        '<h1 class="page-title">' + esc(t('bookmarksTitle')) + '</h1>' +
        '<p class="page-dek">' + esc(t('bookmarksDek')) + '</p></div>' +
        '<div class="lead-actions">' +
          '<span class="page-count">' + esc(storyCount(list.length)) + '</span>' +
          (list.length ? '<button type="button" class="btn btn--sm" data-action="clear-bookmarks">' + esc(t('clearAll')) + '</button>' : '') +
        '</div>' +
      '</div>' +
    '</div></section>';

    var body;
    if (!list.length) {
      body = '<div class="container"><div class="empty-state" style="margin-block:40px">' +
        '<span class="empty-icon">' + ICONS.empty + '</span>' +
        '<h2>' + esc(t('noBookmarks')) + '</h2>' +
        '<p>' + esc(t('noBookmarksDek')) + '</p>' +
        '<div class="search-empty-actions">' +
          '<a class="btn btn--solid" href="search.html">' + esc(t('browseStories')) + '</a>' +
          '<a class="btn" href="index.html">' + esc(t('backHome')) + '</a>' +
        '</div>' +
      '</div></div>';
    } else {
      body = '<div class="container" style="padding-top:30px"><div class="news-grid">' +
        list.map(function (a) { return storyCard(a); }).join('') +
      '</div></div>';
    }

    return head + body;
  }

  function renderAbout() {
    var deskRows = categories.map(function (c) {
      return '<a class="desk-table-row cat-' + c.id + '" href="' + categoryHref(c) + '">' +
        '<span class="dot" style="background:' + c.color + '"></span>' +
        '<span><span class="desk-table-name">' + esc(categoryName(c)) + '</span><br><span class="desk-table-desc">' + esc(c.desc[state.lang]) + '</span></span>' +
        '<span class="desk-table-count">' + esc(storyCount(countByCat(c.id))) + '</span>' +
      '</a>';
    }).join('');

    var principles = [
      {
        title: bi('Clarity over hype', 'شفافیت به جای هیاهو'),
        text: bi('We explain the system behind the headline, including the parts that are still uncertain.', 'سیستمی را که پشت تیتر است توضیح می‌دهیم، از جمله بخش‌هایی که هنوز قطعی نیستند.')
      },
      {
        title: bi('Systems, not headlines', 'سیستم‌ها، نه تیترها'),
        text: bi('Every story is chosen because it will still matter after the news cycle moves on.', 'هر مقاله به این دلیل انتخاب می‌شود که پس از پایان چرخهٔ خبری هم مهم بماند.')
      },
      {
        title: bi('Bilingual by default', 'دوزبانه به‌صورت پیش‌فرض'),
        text: bi('English and Persian are edited as first-class editions, including full right-to-left layout.', 'انگلیسی و فارسی به‌عنوان نسخه‌های درجه‌یک ویرایش می‌شوند، با چیدمان کامل راست‌به‌چپ.')
      },
      {
        title: bi('Open by default', 'باز به‌صورت پیش‌فرض'),
        text: bi('The template is MIT licensed, static, and free of third-party runtime trackers.', 'این قالب با مجوز MIT، ایستا و بدون ردیاب شخص ثالث در زمان اجرا است.')
      }
    ];

    return '<section class="page-hero about-hero"><div class="container">' +
        '<p class="page-kicker kicker">' + esc(t('aboutKicker')) + '</p>' +
        '<h1 class="page-title">' + esc(t('aboutTitle')) + '</h1>' +
        '<p class="page-dek">' + esc(site.description[state.lang]) + '</p>' +
      '</div></section>' +
      '<div class="container about-page"><div class="about-prose">' +
        '<p>' + esc(bi(
          'NoxaPlus Tech News is a demo editorial product built to show what a calm, bilingual technology publication can feel like when it is not optimised for the refresh cycle. It is also a complete open-source template: twelve original stories, six desks, article pages, search, bookmarks, an RSS feed, and a working offline mode.',
          'نواپلاس تک‌نیوز یک محصول تحریریهٔ نمایشی است که نشان می‌دهد یک نشریهٔ آرام و دوزبانهٔ فناوری، وقتی برای چرخهٔ بی‌پایان تازه‌ها بهینه نشده باشد، چه حسی می‌تواند داشته باشد. همچنین یک قالب کامل متن‌باز است: دوازده مقالهٔ اصیل، شش میز خبری، صفحهٔ مقاله، جست‌وجو، نشان‌شده‌ها، خوراک RSS و حالت آفلاین کارآمد.'
        )) + '</p>' +
        '<h2>' + esc(bi('What this is', 'این چه چیزی است')) + '</h2>' +
        '<p>' + esc(bi(
          'This is not a live news service. It does not scrape, republish, or aggregate anyone else’s reporting. Every article here was written for this template as an editorial sample, with fictional dates and bylines that belong to the NoxaPlus demo newsroom. The goal is to give designers, developers, and independent publishers a polished starting point they can fork and fill with their own work.',
          'این یک سرویس خبری زنده نیست. هیچ گزارش کسی را استخراج، بازنشر یا تجمیع نمی‌کند. هر مقالهٔ اینجا برای همین قالب به‌عنوان نمونهٔ تحریریه نوشته شده است، با تاریخ‌ها و امضاهای داستانی که به خبرگزاری نمایشی نواپلاس تعلق دارند. هدف این است که به طراحان، توسعه‌دهندگان و ناشران مستقل یک نقطهٔ شروع آماده داده شود تا آن را فورک کنند و با کار خود پر کنند.'
        )) + '</p>' +
        '<div class="principles">' + principles.map(function (item, index) {
          return '<div class="principle"><span class="num">0' + (index + 1) + '</span><h3>' + esc(item.title) + '</h3><p>' + esc(item.text) + '</p></div>';
        }).join('') + '</div>' +
        '<h2>' + esc(t('theDesks')) + '</h2>' +
        '<p>' + esc(bi(
          'Six desks keep the coverage honest: each one has a point of view, but no desk is allowed to become a feed. The archive is deliberately small enough to read.',
          'شش میز خبری پوشش را صادق نگه می‌دارند: هر میز دیدگاه خودش را دارد، اما هیچ میزی اجازه ندارد به یک فید بی‌پایان تبدیل شود. آرشیو عمداً کوچک و خواندنی است.'
        )) + '</p>' +
        '<div class="desk-table">' + deskRows + '</div>' +
        '<h2>' + esc(bi('How it is built', 'چگونه ساخته شده')) + '</h2>' +
        '<p>' + esc(bi(
          'There is no framework, no runtime CDN, and no analytics. The site is plain HTML, CSS, and JavaScript, with local fonts and generated artwork. Language, theme, search, bookmarks, and the demo newsletter all run in your browser. Service-worker caching makes the archive readable offline after the first visit.',
          'هیچ فریم‌ورکی، CDN در زمان اجرا یا ابزار تحلیلی وجود ندارد. سایت HTML، CSS و JavaScript ساده است، با فونت‌های محلی و تصویرسازی تولیدشده. زبان، پوسته، جست‌وجو، نشان‌شده‌ها و خبرنامهٔ نمایشی همه در مرورگر شما اجرا می‌شوند. کش سرویس‌ورکر باعث می‌شود آرشیو پس از اولین بازدید به‌صورت آفلاین خوانده شود.'
        )) + '</p>' +
        '<ul>' +
          '<li>' + esc(bi('Accessible landmarks, skip link, visible focus states, and reduced-motion support.', 'نشانه‌های دسترس‌پذیر، پیوند پرش، حالت تمرکز قابل‌مشاهده و پشتیبانی از کاهش حرکت.')) + '</li>' +
          '<li>' + esc(bi('Full RTL layout and Persian typography, not a mirrored afterthought.', 'چیدمان کامل راست‌به‌چپ و تایپوگرافی فارسی، نه یک افزودهٔ آینه‌ای.')) + '</li>' +
          '<li>' + esc(bi('Self-hosted fonts; no requests to third-party font or analytics services.', 'فونت‌های میزبانی‌شده روی همین سایت؛ بدون درخواست به سرویس‌های فونت یا تحلیل شخص ثالث.')) + '</li>' +
          '<li>' + esc(bi('Static hosting on GitHub Pages, with CI validation and an MIT license.', 'میزبانی ایستا روی GitHub Pages، با اعتبارسنجی CI و مجوز MIT.')) + '</li>' +
        '</ul>' +
        '<h2 id="editorial-note">' + esc(t('editorialNote')) + '</h2>' +
        '<p>' + esc(bi(
          'The twelve articles, their dates, and their bylines are editorial samples. They are not reporting, advice, or a record of real events. If you publish this template, replace assets/data/news.js with your own content and update the disclosure in the footer. Honesty about what the page is should never be the first thing a template removes.',
          'دوازده مقاله، تاریخ‌ها و امضاهایشان نمونه‌های تحریریه هستند. آن‌ها گزارش، توصیه یا ثبت رویدادهای واقعی نیستند. اگر این قالب را منتشر می‌کنید، فایل assets/data/news.js را با محتوای خود جایگزین کنید و توضیح شفافیت در فوتر را به‌روز کنید. صداقت دربارهٔ اینکه صفحه چیست هرگز نباید اولین چیزی باشد که یک قالب حذف می‌کند.'
        )) + '</p>' +
        '<h2>' + esc(t('contact')) + '</h2>' +
        '<p>' + esc(bi(
          'Questions, corrections, and collaboration requests are welcome. NoxaPlus is an independent studio; the fastest route is email or the website below.',
          'پرسش‌ها، اصلاح‌ها و درخواست‌های همکاری پذیرفته می‌شوند. نواپلاس یک استودیوی مستقل است؛ سریع‌ترین راه، ایمیل یا وب‌سایت زیر است.'
        )) + '</p>' +
        '<div class="chips">' +
          '<a class="chip" href="mailto:' + site.email + '">' + esc(site.email) + '</a>' +
          '<a class="chip" href="' + site.website + '" target="_blank" rel="noopener noreferrer">' + esc(t('website')) + '</a>' +
          '<a class="chip" href="feed.xml">' + esc(t('rssFeed')) + '</a>' +
          '<a class="chip" href="https://github.com/noxaplus-star/noxaplus-tech-news" target="_blank" rel="noopener noreferrer">' + esc(t('sourceCode')) + '</a>' +
        '</div>' +
        '<div class="dev-card">' +
          logoSVG('brand-mark') +
          '<div><p class="kicker">' + esc(t('developedBy')) + '</p><h2>NoxaPlus</h2>' +
            '<p>' + esc(bi(
              'Design, front-end engineering, bilingual editing, and the editorial data model for this newsroom were developed by NoxaPlus.',
              'طراحی، مهندسی فرانت‌اند، ویرایش دوزبانه و مدل دادهٔ تحریریهٔ این خبرگزاری توسط نواپلاس توسعه یافته است.'
            )) + '</p>' +
          '</div>' +
          '<div class="dev-links">' +
            '<a href="' + site.website + '" target="_blank" rel="noopener noreferrer">www.noxaplus.ir</a>' +
            '<a href="mailto:' + site.email + '">' + esc(site.email) + '</a>' +
            '<a href="tel:+989198690446" dir="ltr">' + esc(site.phone) + '</a>' +
            '<a href="https://github.com/noxaplus-star/noxaplus-tech-news" target="_blank" rel="noopener noreferrer">GitHub</a>' +
          '</div>' +
          '<p class="dev-note">' + esc(t('footerDemo')) + ' ' + esc(bi('Released under the MIT License.', 'منتشرشده با مجوز MIT.')) + '</p>' +
        '</div>' +
      '</div></div>';
  }

  function render404() {
    var root = document.getElementById('page');
    if (root) root.setAttribute('data-not-found', 'true');
    return '<section class="error-page"><div class="container">' +
      '<div class="error-code">404</div>' +
      '<h1>' + esc(t('notFoundTitle')) + '</h1>' +
      '<p>' + esc(t('notFoundDek')) + '</p>' +
      '<div class="error-actions">' +
        '<a class="btn btn--solid" href="index.html">' + esc(t('backHome')) + '</a>' +
        '<a class="btn" href="search.html">' + esc(t('browseStories')) + '</a>' +
      '</div>' +
    '</div></section>';
  }

  function renderArticle() {
    var a = ARTICLE_BY_SLUG[slug()];
    if (!a) {
      document.body.dataset.page = '404';
      var progress = document.querySelector('.reading-progress');
      if (progress) progress.remove();
      return render404();
    }
    var cat = categoryOf(a);
    var index = articles.indexOf(a);
    var older = articles[index + 1];
    var newer = articles[index - 1];
    var related = articles.filter(function (item) { return item.category === a.category && item !== a; });
    if (related.length < 3) {
      related = related.concat(articles.filter(function (item) { return item.category !== a.category && item !== a; }));
    }
    related = related.slice(0, 3);

    var h2Index = 0;
    var sections = [];
    var body = a.body.map(function (block) {
      if (block.type === 'h2') {
        h2Index += 1;
        var id = 'section-' + h2Index;
        sections.push({ id: id, text: block[state.lang] });
        return '<h2 id="' + id + '">' + esc(block[state.lang]) + '</h2>';
      }
      if (block.type === 'list') {
        return '<ul>' + (block[state.lang] || []).map(function (item) {
          return '<li>' + esc(item) + '</li>';
        }).join('') + '</ul>';
      }
      if (block.type === 'quote') {
        var cite = state.lang === 'fa' ? block.citeFa : block.citeEn;
        return '<blockquote><p>' + esc(block[state.lang]) + '</p>' +
          (cite ? '<cite>— ' + esc(cite) + '</cite>' : '') + '</blockquote>';
      }
      return '<p>' + esc(block[state.lang]) + '</p>';
    }).join('');

    var toc = sections.length
      ? '<div class="rail-card"><p class="kicker">' + esc(t('inThisStory')) + '</p><ol class="rail-toc">' +
          sections.map(function (section) {
            return '<li><a href="#' + section.id + '">' + esc(section.text) + '</a></li>';
          }).join('') + '</ol></div>'
      : '';

    var takeaways = (a.takeaways[state.lang] || []).map(function (item) {
      return '<li>' + esc(item) + '</li>';
    }).join('');

    var meta = '<div class="article-page">' +
      '<header class="article-head container">' +
        '<nav class="breadcrumb" aria-label="' + esc(bi('Breadcrumb', 'مسیر صفحه')) + '">' +
          '<a href="index.html">' + esc(t('frontPage')) + '</a><span aria-hidden="true">/</span>' +
          '<a href="' + categoryHref(cat) + '">' + esc(categoryName(cat)) + '</a><span aria-hidden="true">/</span>' +
          '<span class="crumb-current" aria-current="page">' + esc(a.title[state.lang]) + '</span>' +
        '</nav>' +
        '<div class="article-kicker">' + badge(cat) + '<span class="mono">' + esc(fmtDate(a.date)) + '</span></div>' +
        '<h1 class="article-title">' + esc(a.title[state.lang]) + '</h1>' +
        '<p class="article-dek">' + esc(a.dek[state.lang]) + '</p>' +
        '<div class="article-meta-row">' +
          '<div class="byline"><span class="avatar" aria-hidden="true">N</span><span class="byline-text"><strong>' + esc(authorName(a)) + '</strong>' +
            storyMeta(a, { author: false }) + '</span></div>' +
          '<div class="article-actions">' +
            saveButton(a, true) +
            '<button type="button" class="icon-btn" data-action="copy">' + ICONS.link + '<span>' + esc(t('copyLink')) + '</span></button>' +
            '<button type="button" class="icon-btn" data-action="share">' + ICONS.share + '<span>' + esc(t('share')) + '</span></button>' +
          '</div>' +
        '</div>' +
      '</header>' +
      '<figure class="article-cover container">' +
        '<img src="' + esc(a.cover) + '" alt="' + esc(a.title[state.lang]) + '" width="1200" height="675" fetchpriority="high" decoding="async">' +
        '<figcaption>' + esc(t('illustration')) + '</figcaption>' +
      '</figure>' +
      '<div class="article-layout container">' +
        '<article class="article-body">' +
          body +
          (takeaways ? '<aside class="takeaways"><h2>' + esc(t('takeaways')) + '</h2><ul>' + takeaways + '</ul></aside>' : '') +
          '<div class="article-tags">' + a.tags.map(function (tag) {
            return '<span class="tag">' + esc(tag[state.lang]) + '</span>';
          }).join('') + '</div>' +
        '</article>' +
        '<aside class="article-rail">' +
          toc +
          '<div class="rail-card"><p class="kicker">' + esc(t('shareThisStory')) + '</p><div class="rail-actions">' +
            '<button type="button" class="btn btn--sm" data-action="copy">' + ICONS.link + '<span>' + esc(t('copyLink')) + '</span></button>' +
            '<button type="button" class="btn btn--sm" data-action="share">' + ICONS.share + '<span>' + esc(t('share')) + '</span></button>' +
            saveButton(a, true) +
            '<a class="btn btn--sm" href="feed.xml">' + ICONS.rss + '<span>' + esc(t('rssFeed')) + '</span></a>' +
          '</div></div>' +
          '<div class="rail-card rail-card--accent"><p class="kicker">' + esc(t('demoRail')) + '</p>' +
            '<p>' + esc(t('demoRailNote')) + '</p></div>' +
        '</aside>' +
      '</div>' +
      '<div class="container">' +
        '<nav class="article-nav" aria-label="' + esc(bi('More stories', 'مقاله‌های بیشتر')) + '">' +
          (older ? '<a href="' + articleHref(older) + '"><span class="nav-label">← ' + esc(t('olderStory')) + '</span><span class="nav-title">' + esc(older.title[state.lang]) + '</span></a>' : '<span></span>') +
          (newer ? '<a href="' + articleHref(newer) + '"><span class="nav-label">' + esc(t('newerStory')) + ' →</span><span class="nav-title">' + esc(newer.title[state.lang]) + '</span></a>' : '<span></span>') +
        '</nav>' +
      '</div>' +
      '<section class="related"><div class="container">' +
        '<div class="section-head"><div><p class="kicker">' + esc(categoryName(cat)) + '</p><h2>' + esc(t('relatedStories')) + '</h2></div>' +
          '<a class="text-link" href="' + categoryHref(cat) + '">' + esc(t('moreFromDesk')) + ' ' + ICONS.arrow + '</a></div>' +
        '<div class="news-grid">' + related.map(function (item) { return storyCard(item); }).join('') + '</div>' +
      '</div></section>' +
    '</div>';

    return meta;
  }

  /* ---------- Rendering orchestration ---------- */

  function renderHeader() {
    var target = document.getElementById('site-header');
    if (target) target.innerHTML = headerHTML();
    updateBookmarkUI();
    updateThemeButtons();
  }

  function renderFooter() {
    var target = document.getElementById('site-footer');
    if (target) target.innerHTML = footerHTML();
  }

  function pageHTML() {
    var page = document.body.dataset.page;
    switch (page) {
      case 'home': return renderHome();
      case 'article': return renderArticle();
      case 'category': return renderCategory();
      case 'search': return renderSearch();
      case 'bookmarks': return renderBookmarks();
      case 'about': return renderAbout();
      default: return render404();
    }
  }

  function renderPage() {
    var root = document.getElementById('page');
    if (!root) return;
    root.innerHTML = pageHTML();
    updateBookmarkUI();
    updateProgress();
  }

  function renderAll() {
    var skip = document.getElementById('skip-link');
    if (skip) skip.textContent = t('skip');
    renderHeader();
    renderFooter();
    renderPage();
    updateDocumentMeta();
  }

  /* ---------- Meta and structured data ---------- */

  function setMetaName(name, content) {
    var el = document.querySelector('meta[name="' + name + '"]');
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute('name', name);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  }

  function setMetaProp(prop, content) {
    var el = document.querySelector('meta[property="' + prop + '"]');
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute('property', prop);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  }

  function setCanonical(url) {
    var el = document.querySelector('link[rel="canonical"]');
    if (!el) {
      el = document.createElement('link');
      el.setAttribute('rel', 'canonical');
      document.head.appendChild(el);
    }
    el.setAttribute('href', url);
  }

  function pageMeta() {
    var page = document.body.dataset.page;
    var lang = state.lang;
    var base = site.url;
    var result = {
      title: site.name + ' — ' + site.tagline[lang],
      description: site.description[lang],
      canonical: base,
      image: abs('assets/og/default.png'),
      type: 'website',
      robots: 'index,follow',
      jsonld: {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebSite',
            '@id': base + '#website',
            url: base,
            name: site.name,
            description: site.description.en,
            inLanguage: ['en', 'fa'],
            publisher: { '@id': base + '#organization' }
          },
          {
            '@type': 'Organization',
            '@id': base + '#organization',
            name: site.developer,
            url: site.website,
            email: site.email,
            logo: abs('assets/icons/icon-512.png')
          }
        ]
      }
    };

    if (page === 'article') {
      var a = ARTICLE_BY_SLUG[slug()];
      if (!a) {
        result.title = t('storyNotFound') + ' — ' + site.name;
        result.description = t('storyNotFoundDek');
        result.canonical = base + '404.html';
        result.robots = 'noindex,nofollow';
        return result;
      }
      result.title = a.title[lang] + ' — ' + site.name;
      result.description = a.dek[lang];
      result.canonical = base + 'article.html?slug=' + enc(a.slug);
      result.image = abs('assets/og/' + a.slug + '.png');
      result.type = 'article';
      result.jsonld = {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'BlogPosting',
            headline: a.title[lang],
            description: a.dek[lang],
            image: result.image,
            datePublished: a.date,
            dateModified: a.date,
            inLanguage: lang,
            articleSection: categoryName(categoryOf(a)),
            keywords: a.tags.map(function (tag) { return tag[lang]; }).join(', '),
            author: { '@type': 'Organization', name: authorName(a) },
            publisher: {
              '@type': 'Organization',
              name: site.developer,
              url: site.website,
              logo: { '@type': 'ImageObject', url: abs('assets/icons/icon-512.png') }
            },
            mainEntityOfPage: { '@type': 'WebPage', '@id': result.canonical }
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: site.name, item: base },
              { '@type': 'ListItem', position: 2, name: categoryName(categoryOf(a)), item: base + 'category.html?c=' + enc(a.category) },
              { '@type': 'ListItem', position: 3, name: a.title[lang] }
            ]
          }
        ]
      };
    } else if (page === 'category') {
      var c = CAT[currentParam('c')];
      if (c) {
        result.title = categoryName(c) + ' — ' + site.name;
        result.description = c.desc[lang];
        result.canonical = base + 'category.html?c=' + enc(c.id);
        result.jsonld = {
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: categoryName(c),
          description: c.desc[lang],
          url: result.canonical,
          inLanguage: lang,
          isPartOf: { '@type': 'WebSite', name: site.name, url: base }
        };
      }
    } else if (page === 'about') {
      result.title = t('about') + ' — ' + site.name;
      result.description = site.description[lang];
      result.canonical = base + 'about.html';
    } else if (page === 'search') {
      result.title = t('search') + ' — ' + site.name;
      result.description = t('searchDek');
      result.canonical = base + 'search.html';
      result.robots = 'noindex,follow';
      result.jsonld = {};
    } else if (page === 'bookmarks') {
      result.title = t('bookmarks') + ' — ' + site.name;
      result.description = t('bookmarksDek');
      result.canonical = base + 'bookmarks.html';
      result.robots = 'noindex,follow';
      result.jsonld = {};
    } else if (page === '404') {
      result.title = t('notFoundTitle') + ' — ' + site.name;
      result.description = t('notFoundDek');
      result.canonical = base + '404.html';
      result.robots = 'noindex,nofollow';
      result.jsonld = {};
    }

    return result;
  }

  function updateDocumentMeta() {
    var meta = pageMeta();
    document.title = meta.title;
    setMetaName('description', meta.description);
    setMetaName('robots', meta.robots);
    setCanonical(meta.canonical);
    setMetaProp('og:title', meta.title);
    setMetaProp('og:description', meta.description);
    setMetaProp('og:url', meta.canonical);
    setMetaProp('og:image', meta.image);
    setMetaProp('og:type', meta.type);
    setMetaProp('og:locale', state.lang === 'fa' ? 'fa_IR' : 'en_GB');
    setMetaName('twitter:title', meta.title);
    setMetaName('twitter:description', meta.description);
    setMetaName('twitter:image', meta.image);
    setMetaName('theme-color', state.theme === 'dark' ? '#0e100c' : '#f4f1e8');

    var ld = document.getElementById('page-jsonld');
    if (meta.jsonld && Object.keys(meta.jsonld).length) {
      if (!ld) {
        ld = document.createElement('script');
        ld.type = 'application/ld+json';
        ld.id = 'page-jsonld';
        document.head.appendChild(ld);
      }
      ld.textContent = JSON.stringify(meta.jsonld);
    } else if (ld) {
      ld.remove();
    }
  }

  /* ---------- Interactions ---------- */

  function updateThemeButtons() {
    document.querySelectorAll('[data-action="theme"]').forEach(function (button) {
      button.innerHTML = state.theme === 'dark' ? ICONS.sun : ICONS.moon;
      var label = state.theme === 'dark' ? t('themeLight') : t('themeDark');
      button.setAttribute('aria-label', label);
      button.setAttribute('title', label);
    });
  }

  function setTheme(theme) {
    state.theme = theme;
    document.documentElement.dataset.theme = theme;
    writeRaw(LS.theme, theme);
    updateThemeButtons();
    updateDocumentMeta();
  }

  function toggleTheme() {
    setTheme(state.theme === 'dark' ? 'light' : 'dark');
  }

  function setLang(lang) {
    if (lang !== 'en' && lang !== 'fa') return;
    state.lang = lang;
    var html = document.documentElement;
    html.lang = lang;
    html.dir = lang === 'fa' ? 'rtl' : 'ltr';
    html.dataset.lang = lang;
    writeRaw(LS.lang, lang);
    closeDrawers();
    renderAll();
  }

  function toggleBookmark(slugValue, silent) {
    if (!ARTICLE_BY_SLUG[slugValue]) return;
    if (state.bookmarks.has(slugValue)) {
      state.bookmarks.delete(slugValue);
    } else {
      state.bookmarks.add(slugValue);
    }
    writeJSON(LS.bookmarks, Array.from(state.bookmarks));
    updateBookmarkUI();
    if (document.body.dataset.page === 'bookmarks') renderPage();
    if (!silent) toast(state.bookmarks.has(slugValue) ? t('savedToast') : t('removedToast'));
  }

  function updateBookmarkUI() {
    var count = state.bookmarks.size;
    document.querySelectorAll('[data-bookmark-count]').forEach(function (el) {
      el.textContent = num(count);
      el.hidden = count === 0;
    });
    document.querySelectorAll('[data-action="bookmark"]').forEach(function (button) {
      var saved = state.bookmarks.has(button.dataset.slug);
      button.classList.toggle('is-saved', saved);
      button.setAttribute('aria-pressed', saved ? 'true' : 'false');
      button.setAttribute('aria-label', saved ? t('removeBookmark') : t('save'));
      var label = button.querySelector('[data-save-label]');
      if (label) label.textContent = saved ? t('savedLabel') : t('saveForLater');
    });
  }

  function clearBookmarks() {
    if (!state.bookmarks.size) return;
    if (!window.confirm(t('clearConfirm'))) return;
    state.bookmarks.clear();
    writeJSON(LS.bookmarks, []);
    updateBookmarkUI();
    renderPage();
    toast(t('removedToast'));
  }

  function toast(message) {
    var existing = document.querySelector('.toast');
    if (existing) existing.remove();
    var wrapper = document.createElement('div');
    wrapper.className = 'toast';
    wrapper.setAttribute('role', 'status');
    var text = document.createElement('span');
    text.textContent = message;
    wrapper.appendChild(text);
    document.body.appendChild(wrapper);
    window.setTimeout(function () {
      if (wrapper.parentNode) wrapper.remove();
    }, 2600);
  }

  function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).then(function () {
        toast(t('linkCopied'));
      }).catch(function () {
        legacyCopy(text);
      });
    }
    legacyCopy(text);
    return Promise.resolve();
  }

  function legacyCopy(text) {
    var area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    var ok = false;
    try { ok = document.execCommand('copy'); } catch (error) { ok = false; }
    area.remove();
    toast(ok ? t('linkCopied') : t('shareFailed'));
  }

  function shareStory() {
    var a = ARTICLE_BY_SLUG[slug()];
    var data = {
      title: a ? a.title[state.lang] + ' — ' + site.name : document.title,
      text: a ? a.dek[state.lang] : site.description[state.lang],
      url: window.location.href
    };
    if (navigator.share) {
      navigator.share(data).catch(function (error) {
        if (error && error.name === 'AbortError') return;
        copyToClipboard(data.url);
      });
      return;
    }
    copyToClipboard(data.url);
  }

  function openDrawer(which) {
    var searchDrawer = document.getElementById('search-drawer');
    var mobileDrawer = document.getElementById('mobile-drawer');
    if (!searchDrawer || !mobileDrawer) return;
    if (which === 'search') {
      var open = searchDrawer.hidden;
      searchDrawer.hidden = !open;
      mobileDrawer.hidden = true;
      document.querySelectorAll('[data-action="search"]').forEach(function (button) {
        button.setAttribute('aria-expanded', open ? 'true' : 'false');
        button.setAttribute('aria-label', open ? t('closeSearch') : t('openSearch'));
      });
      document.querySelectorAll('[data-action="menu"]').forEach(function (button) {
        button.setAttribute('aria-expanded', 'false');
      });
      if (open) {
        var input = searchDrawer.querySelector('input[type="search"]');
        if (input) window.setTimeout(function () { input.focus(); }, 30);
      }
    } else {
      var menuOpen = mobileDrawer.hidden;
      mobileDrawer.hidden = !menuOpen;
      searchDrawer.hidden = true;
      document.querySelectorAll('[data-action="menu"]').forEach(function (button) {
        button.setAttribute('aria-expanded', menuOpen ? 'true' : 'false');
        button.setAttribute('aria-label', menuOpen ? t('closeMenu') : t('openMenu'));
      });
      document.querySelectorAll('[data-action="search"]').forEach(function (button) {
        button.setAttribute('aria-expanded', 'false');
      });
      if (menuOpen) {
        var first = mobileDrawer.querySelector('a');
        if (first) window.setTimeout(function () { first.focus(); }, 30);
      }
    }
  }

  function closeDrawers() {
    var searchDrawer = document.getElementById('search-drawer');
    var mobileDrawer = document.getElementById('mobile-drawer');
    if (searchDrawer) searchDrawer.hidden = true;
    if (mobileDrawer) mobileDrawer.hidden = true;
    document.querySelectorAll('[data-action="menu"]').forEach(function (button) {
      button.setAttribute('aria-expanded', 'false');
    });
    document.querySelectorAll('[data-action="search"]').forEach(function (button) {
      button.setAttribute('aria-expanded', 'false');
    });
  }

  function updateProgress() {
    var bar = document.querySelector('.reading-progress span');
    if (!bar) return;
    var doc = document.documentElement;
    var max = doc.scrollHeight - window.innerHeight;
    var value = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    bar.style.width = (value * 100) + '%';
  }

  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      updateProgress();
      ticking = false;
    });
  }

  function onAction(event) {
    var target = event.target.closest('[data-action]');
    if (!target) return;
    var action = target.dataset.action;
    if (action === 'theme') {
      event.preventDefault();
      toggleTheme();
    } else if (action === 'lang') {
      event.preventDefault();
      setLang(state.lang === 'fa' ? 'en' : 'fa');
    } else if (action === 'menu') {
      event.preventDefault();
      openDrawer('menu');
    } else if (action === 'search') {
      event.preventDefault();
      openDrawer('search');
    } else if (action === 'bookmark') {
      event.preventDefault();
      toggleBookmark(target.dataset.slug || '');
    } else if (action === 'copy') {
      event.preventDefault();
      copyToClipboard(window.location.href);
    } else if (action === 'share') {
      event.preventDefault();
      shareStory();
    } else if (action === 'clear-bookmarks') {
      event.preventDefault();
      clearBookmarks();
    } else if (action === 'top') {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function onSubmit(event) {
    var form = event.target.closest('[data-form="newsletter"]');
    if (!form) return;
    event.preventDefault();
    var input = form.querySelector('input[type="email"]');
    var status = form.querySelector('[data-status]');
    if (!input || !status) return;
    var email = input.value.trim();
    var valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
    if (!valid) {
      status.textContent = t('emailError');
      status.classList.add('is-error');
      input.focus();
      return;
    }
    writeJSON(LS.newsletter, { email: email, savedAt: new Date().toISOString() });
    status.classList.remove('is-error');
    status.textContent = t('subscribedNote');
    form.reset();
    toast(t('subscribedToast'));
  }

  function onChange(event) {
    var select = event.target.closest('[data-sort]');
    if (!select) return;
    var params = new URLSearchParams(window.location.search);
    params.set('c', currentParam('c'));
    params.set('sort', select.value);
    window.location.search = params.toString();
  }

  function onKeydown(event) {
    if (event.key !== 'Escape') return;
    var searchDrawer = document.getElementById('search-drawer');
    var mobileDrawer = document.getElementById('mobile-drawer');
    var searchOpen = searchDrawer && !searchDrawer.hidden;
    var menuOpen = mobileDrawer && !mobileDrawer.hidden;
    if (!searchOpen && !menuOpen) return;
    closeDrawers();
    var button = document.querySelector('[data-action="' + (searchOpen ? 'search' : 'menu') + '"]');
    if (button) button.focus();
  }

  function registerServiceWorker() {
    if (!('serviceWorker' in navigator)) return;
    if (window.location.protocol !== 'http:' && window.location.protocol !== 'https:') return;
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('sw.js').catch(function () {
        /* the site still works without offline caching */
      });
    });
  }

  function init() {
    var savedLang = readRaw(LS.lang, '');
    state.lang = savedLang === 'fa' ? 'fa' : 'en';
    var savedTheme = readRaw(LS.theme, '');
    state.theme = savedTheme === 'dark' ? 'dark' : (savedTheme === 'light' ? 'light' : (document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'));
    var stored = readJSON(LS.bookmarks, []);
    state.bookmarks = new Set(Array.isArray(stored) ? stored.filter(function (item) { return typeof item === 'string'; }) : []);

    document.documentElement.lang = state.lang;
    document.documentElement.dir = state.lang === 'fa' ? 'rtl' : 'ltr';
    document.documentElement.dataset.lang = state.lang;
    document.documentElement.dataset.theme = state.theme;

    renderAll();
    setTheme(state.theme);

    document.addEventListener('click', onAction);
    document.addEventListener('click', function (event) {
      var header = document.getElementById('site-header');
      if (!header || header.contains(event.target)) return;
      closeDrawers();
    });
    document.addEventListener('submit', onSubmit);
    document.addEventListener('change', onChange);
    document.addEventListener('keydown', onKeydown);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateProgress);
    updateProgress();
    registerServiceWorker();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
