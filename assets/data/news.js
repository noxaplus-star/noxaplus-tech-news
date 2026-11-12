/*
 * NoxaPlus Tech News — editorial data
 *
 * Every article in this file is an original demo editorial sample written for
 * this open-source template. Nothing here is live reporting. Replace the data
 * with your own newsroom output, or keep it as a fully working demo.
 *
 * Developed by NoxaPlus — https://www.noxaplus.ir
 */
(function () {
  'use strict';

  var p = function (en, fa) { return { type: 'p', en: en, fa: fa }; };
  var h = function (en, fa) { return { type: 'h2', en: en, fa: fa }; };
  var q = function (en, fa, citeEn, citeFa) {
    return { type: 'quote', en: en, fa: fa, citeEn: citeEn || '', citeFa: citeFa || '' };
  };
  var ul = function (en, fa) { return { type: 'list', en: en, fa: fa }; };

  var SITE = {
    name: 'NoxaPlus Tech News',
    shortName: 'NoxaPlus',
    tagline: {
      en: 'Signals, not noise.',
      fa: 'سیگنال، نه هیاهو.'
    },
    description: {
      en: 'A bilingual technology newsroom about the systems, devices, and ideas that will still matter next year.',
      fa: 'یک خبرگزاری دوزبانهٔ فناوری دربارهٔ سیستم‌ها، دستگاه‌ها و ایده‌هایی که سال آینده هم مهم می‌مانند.'
    },
    url: 'https://noxaplus-star.github.io/noxaplus-tech-news/',
    developer: 'NoxaPlus',
    website: 'https://www.noxaplus.ir',
    email: 'NoxaPlus2025@gmail.com',
    phone: '09198690446',
    established: '2026',
    edition: { en: 'Independent · Bilingual · Open source', fa: 'مستقل · دوزبانه · متن‌باز' }
  };

  var CATEGORIES = [
    {
      id: 'ai',
      en: 'Artificial Intelligence',
      fa: 'هوش مصنوعی',
      shortEn: 'AI',
      shortFa: 'هوش مصنوعی',
      desc: {
        en: 'Models, agents, and the practical economics of machine intelligence.',
        fa: 'مدل‌ها، عامل‌های هوشمند و اقتصاد عملی هوش ماشینی.'
      },
      color: '#6d4aff',
      soft: 'rgba(109, 74, 255, .14)'
    },
    {
      id: 'mobile',
      en: 'Mobile',
      fa: 'موبایل',
      shortEn: 'Mobile',
      shortFa: 'موبایل',
      desc: {
        en: 'Phones, chips, connectivity, and the computer in every pocket.',
        fa: 'گوشی‌ها، تراشه‌ها، اتصال و کامپیوتری که در هر جیب است.'
      },
      color: '#0d9f6e',
      soft: 'rgba(13, 159, 110, .14)'
    },
    {
      id: 'cyber',
      en: 'Cybersecurity',
      fa: 'امنیت سایبری',
      shortEn: 'Cyber',
      shortFa: 'امنیت',
      desc: {
        en: 'Identity, cryptography, and the unglamorous work of staying safe.',
        fa: 'هویت، رمزنگاری و کار بی‌زرق‌وبرقیِ امن ماندن.'
      },
      color: '#e5484d',
      soft: 'rgba(229, 72, 77, .14)'
    },
    {
      id: 'space',
      en: 'Space',
      fa: 'فضا',
      shortEn: 'Space',
      shortFa: 'فضا',
      desc: {
        en: 'Orbits, launch economics, and the software that leaves the planet.',
        fa: 'مدارها، اقتصاد پرتاب و نرم‌افزاری که سیاره را ترک می‌کند.'
      },
      color: '#1f6feb',
      soft: 'rgba(31, 111, 235, .14)'
    },
    {
      id: 'software',
      en: 'Software',
      fa: 'نرم‌افزار',
      shortEn: 'Software',
      shortFa: 'نرم‌افزار',
      desc: {
        en: 'Architecture, developer tools, and the craft of shipping reliable code.',
        fa: 'معماری، ابزارهای توسعه‌دهنده و هنر عرضهٔ کدِ قابل‌اعتماد.'
      },
      color: '#b7791f',
      soft: 'rgba(183, 121, 31, .16)'
    },
    {
      id: 'hardware',
      en: 'Hardware',
      fa: 'سخت‌افزار',
      shortEn: 'Hardware',
      shortFa: 'سخت‌افزار',
      desc: {
        en: 'Silicon, repairability, and the physical layer of computing.',
        fa: 'سیلیکون، قابلیت تعمیر و لایهٔ فیزیکی محاسبات.'
      },
      color: '#d9480f',
      soft: 'rgba(217, 72, 15, .14)'
    }
  ];

  var AUTHORS = {
    editorial: { en: 'NoxaPlus Editorial', fa: 'تحریریهٔ نواپلاس' },
    research: { en: 'NoxaPlus Research Desk', fa: 'میز پژوهش نواپلاس' },
    studio: { en: 'NoxaPlus Studio', fa: 'استودیو نواپلاس' }
  };

  var ARTICLES = [
    {
      slug: 'small-models-big-shift',
      category: 'ai',
      author: 'editorial',
      date: '2026-11-11',
      featured: true,
      trending: 1,
      cover: 'assets/covers/ai-small-models.svg',
      readMins: { en: 7, fa: 6 },
      title: {
        en: 'The small-model revolution: why the best AI of 2026 runs on your desk',
        fa: 'انقلاب مدل‌های کوچک: چرا بهترین هوش مصنوعی ۲۰۲۶ روی میز شما اجرا می‌شود'
      },
      dek: {
        en: 'Frontier labs still chase scale, but the most useful products of the year prove that a well-tuned three-billion-parameter model can beat a distant giant on cost, privacy, and latency.',
        fa: 'آزمایشگاه‌های پیشرو همچنان به دنبال مقیاس‌اند، اما مفیدترین محصولات امسال نشان می‌دهند یک مدل سه‌میلیارد پارامتریِ خوب‌تنظیم‌شده می‌تواند در هزینه، حریم خصوصی و تأخیر، غولِ دور از دسترس را شکست دهد.'
      },
      tags: [
        { en: 'On-device AI', fa: 'هوش مصنوعی روی دستگاه' },
        { en: 'Model efficiency', fa: 'کارایی مدل' },
        { en: 'Privacy', fa: 'حریم خصوصی' }
      ],
      takeaways: {
        en: [
          'Quantization and distillation have closed much of the quality gap for everyday tasks.',
          'Local inference turns privacy and latency from marketing claims into architecture.',
          'The winning product pattern is hybrid: a small local default with an optional cloud escalation path.'
        ],
        fa: [
          'کوانتیزه‌سازی و تقطیر بخش بزرگی از شکاف کیفیت را در کارهای روزمره پر کرده‌اند.',
          'استنتاج محلی، حریم خصوصی و تأخیر را از ادعای تبلیغاتی به تصمیم معماری تبدیل می‌کند.',
          'الگوی برندهٔ محصول، ترکیبی است: پیش‌فرضِ کوچکِ محلی با مسیر اختیاریِ ارتقا به ابر.'
        ]
      },
      body: [
        p(
          'For three years, the artificial intelligence conversation was a race upward. More parameters, more data, more accelerators, more watts. The assumption was simple: the best model is the biggest model, and the biggest model lives in a data center you will never see. In 2026, that assumption is starting to crack — not because frontier models got worse, but because a different class of model got good enough.',
          'سه سال، گفت‌وگو دربارهٔ هوش مصنوعی یک مسابقهٔ رو به بالا بود: پارامتر بیشتر، دادهٔ بیشتر، شتاب‌دهندهٔ بیشتر، وات بیشتر. فرض ساده بود: بهترین مدل، بزرگ‌ترین مدل است و بزرگ‌ترین مدل در مرکز داده‌ای زندگی می‌کند که هرگز آن را نمی‌بینید. در ۲۰۲۶ این فرض در حال ترک خوردن است؛ نه چون مدل‌های پیشرو بدتر شده‌اند، بلکه چون دستهٔ دیگری از مدل‌ها به اندازهٔ کافی خوب شده‌اند.'
        ),
        p(
          'A modern small language model — roughly one to eight billion parameters — now handles summarization, classification, rewriting, extraction, and basic tool use at a quality that would have looked implausible two years ago. The tricks are no longer exotic: aggressive quantization, distillation from larger teachers, speculative decoding, and routing that sends only the hard cases to a bigger model. What changed is that these techniques moved from research papers into default toolchains.',
          'یک مدل زبانی کوچکِ امروزی — تقریباً یک تا هشت میلیارد پارامتر — اکنون خلاصه‌سازی، دسته‌بندی، بازنویسی، استخراج اطلاعات و استفادهٔ ساده از ابزار را با کیفیتی انجام می‌دهد که دو سال پیش باورنکردنی به نظر می‌رسید. ترفندها دیگر عجیب نیستند: کوانتیزه‌سازی تهاجمی، تقطیر از معلم‌های بزرگ‌تر، رمزگشایی حدسی و مسیریابی‌ای که فقط موارد سخت را به مدل بزرگ‌تر می‌فرستد. چیزی که عوض شده این است که این تکنیک‌ها از مقاله‌های پژوهشی به زنجیرهٔ ابزار پیش‌فرض منتقل شده‌اند.'
        ),
        h(
          'The economics flipped before the benchmarks did',
          'اقتصاد، پیش از بنچمارک‌ها برگشت'
        ),
        p(
          'Cloud inference is billed per token, which means every always-on feature carries a variable cost that grows with engagement. A local model is billed once, in hardware you already sold. That difference changes product design. A feature that costs a fraction of a cent per use can be offered constantly; a feature that costs a few cents per use has to be rationed, gated, or hidden behind a subscription. Small models make ambient computing economically sane.',
          'استنتاج ابری بر اساس توکن صورت‌حساب می‌شود؛ یعنی هر قابلیت همیشه‌روشن یک هزینهٔ متغیر دارد که با تعامل کاربر رشد می‌کند. مدل محلی یک‌بار حساب می‌شود، در سخت‌افزاری که قبلاً فروخته‌اید. این تفاوت، طراحی محصول را تغییر می‌دهد. قابلیتی که هر بار کسری از یک سنت هزینه دارد می‌تواند دائماً ارائه شود؛ قابلیتی که هر بار چند سنت هزینه دارد باید سهمیه‌بندی، محدود یا پشت اشتراک پنهان شود. مدل‌های کوچک، رایانش محیطی را از نظر اقتصادی منطقی می‌کنند.'
        ),
        p(
          'Latency matters just as much. A local model answers before a network round trip can finish. For dictation, live translation, photo search, and autocomplete, that difference is the line between a tool that feels instant and one that feels like a request. Users do not grade latency on a curve; they simply stop using features that hesitate.',
          'تأخیر هم به همان اندازه مهم است. مدل محلی پیش از آنکه یک رفت‌وبرگشت شبکه تمام شود پاسخ می‌دهد. برای دیکته، ترجمهٔ زنده، جست‌وجوی عکس و تکمیل خودکار، این تفاوت مرز میان ابزاری است که فوری حس می‌شود و درخواستی که باید منتظرش ماند. کاربران تأخیر را با نمرهٔ تشویقی ارزیابی نمی‌کنند؛ فقط قابلیت‌هایی را که تعلل می‌کنند کنار می‌گذارند.'
        ),
        q(
          'The best model is not the biggest one you can reach. It is the smallest one that is good enough, close enough, and cheap enough to run without asking permission.',
          'بهترین مدل، بزرگ‌ترین مدلی نیست که می‌توانید به آن دسترسی داشته باشید. بهترین مدل، کوچک‌ترین مدلی است که به اندازهٔ کافی خوب، به اندازهٔ کافی نزدیک و به اندازهٔ کافی ارزان است تا بدون اجازه گرفتن اجرا شود.',
          'NoxaPlus Editorial',
          'تحریریهٔ نواپلاس'
        ),
        h(
          'Privacy becomes an architecture decision',
          'حریم خصوصی به یک تصمیم معماری تبدیل می‌شود'
        ),
        p(
          'When inference happens on the device, sensitive text and images do not need to leave it. That is not a promise in a privacy policy; it is a property of the system. For healthcare notes, legal drafts, personal journals, and workplace documents, this is often the deciding factor. Regulated buyers have learned to ask a sharper question than “do you train on our data?” — they now ask where inference physically occurs.',
          'وقتی استنتاج روی دستگاه انجام می‌شود، متن و تصویر حساس نیازی به ترک دستگاه ندارند. این وعدهٔ سیاست حریم خصوصی نیست؛ ویژگی خود سیستم است. برای یادداشت‌های پزشکی، پیش‌نویس‌های حقوقی، دفترهای شخصی و اسناد کاری، این اغلب عامل تعیین‌کننده است. خریداران در صنایع تنظیم‌شده یاد گرفته‌اند سؤال دقیق‌تری از «آیا روی دادهٔ ما آموزش می‌دهید؟» بپرسند؛ آن‌ها اکنون می‌پرسند استنتاج فیزیکاً کجا رخ می‌دهد.'
        ),
        p(
          'The catch is memory. Small models are cheap to compute but still hungry for bandwidth, and unified memory is the quiet bottleneck of every on-device AI story. Hardware makers that advertise raw TOPS without explaining memory bandwidth are selling a number, not an experience. The useful metric is how large a model can stay resident while the rest of the system keeps working.',
          'مشکل، حافظه است. مدل‌های کوچک برای محاسبه ارزان‌اند اما همچنان تشنهٔ پهنای باندند و حافظهٔ یکپارچه، گلوگاه خاموشِ هر داستان هوش مصنوعی روی دستگاه است. سازندگان سخت‌افزاری که TOPS خام را بدون توضیح پهنای باند حافظه تبلیغ می‌کنند، یک عدد می‌فروشند نه یک تجربه. معیار مفید این است که چه اندازه مدل می‌تواند مقیم بماند، در حالی که بقیهٔ سیستم کار می‌کند.'
        ),
        ul(
          [
            'Measure quality on your own tasks, not on a public leaderboard.',
            'Track memory residency and thermal throttling, not just tokens per second.',
            'Design an explicit escalation path for requests the small model should not answer.',
            'Version the model like any other dependency, and keep a rollback.'
          ],
          [
            'کیفیت را روی کارهای خودتان بسنجید، نه روی جدول رتبه‌بندی عمومی.',
            'اقامت حافظه و افت حرارتی را رصد کنید، نه فقط توکن بر ثانیه.',
            'برای درخواست‌هایی که مدل کوچک نباید پاسخ دهد، مسیر ارتقای صریح طراحی کنید.',
            'مدل را مثل هر وابستگی دیگری نسخه‌بندی کنید و راه بازگشت نگه دارید.'
          ]
        ),
        p(
          'None of this makes frontier models irrelevant. Difficult reasoning, long-horizon planning, and open-ended research still belong in the cloud, where compute is elastic and models can be updated without a device refresh. The interesting engineering is in the seam: deciding, request by request, where intelligence should live. Teams that treat that decision as a product surface — visible, tunable, and explainable — will build the AI features people actually keep using.',
          'هیچ‌کدام از این‌ها مدل‌های پیشرو را بی‌اهمیت نمی‌کند. استدلال دشوار، برنامه‌ریزی بلندمدت و پژوهش باز همچنان به ابر تعلق دارند، جایی که محاسبه کشسان است و مدل‌ها بدون تعویض دستگاه به‌روز می‌شوند. مهندسی جذاب در همان درز است: تصمیم‌گیری، درخواست به درخواست، دربارهٔ اینکه هوشمندی کجا زندگی کند. تیم‌هایی که این تصمیم را به سطحی از محصول تبدیل کنند — قابل‌مشاهده، قابل‌تنظیم و قابل‌توضیح — قابلیت‌های هوش مصنوعی‌ای می‌سازند که مردم واقعاً استفاده را با آن ادامه می‌دهند.'
        )
      ]
    },
    {
      slug: 'local-first-business-model',
      category: 'software',
      author: 'editorial',
      date: '2026-11-10',
      featured: true,
      trending: 2,
      cover: 'assets/covers/software-local-first.svg',
      readMins: { en: 8, fa: 7 },
      title: {
        en: 'Local-first is back, and this time it has a business model',
        fa: 'Local-first بازگشته است و این بار مدل کسب‌وکار دارد'
      },
      dek: {
        en: 'Offline-first apps used to be an ideological stance. A new generation of sync engines makes them cheaper to build, easier to trust, and surprisingly sellable.',
        fa: 'اپلیکیشن‌های آفلاین‌محور زمانی یک موضع ایدئولوژیک بودند. نسل تازه‌ای از موتورهای همگام‌سازی ساختشان را ارزان‌تر، اعتماد به آن‌ها را ساده‌تر و فروششان را به‌طور غافلگیرکننده ممکن کرده است.'
      },
      tags: [
        { en: 'Local-first', fa: 'محلی‌محور' },
        { en: 'Sync engines', fa: 'موتورهای همگام‌سازی' },
        { en: 'Product strategy', fa: 'استراتژی محصول' }
      ],
      takeaways: {
        en: [
          'Local-first is a latency strategy and a trust strategy, not only a privacy feature.',
          'CRDT-based sync engines remove most of the hard distributed-systems work from product teams.',
          'The durable business model charges for collaboration and sync, while the local core stays usable forever.'
        ],
        fa: [
          'Local-first یک استراتژی تأخیر و اعتماد است، نه صرفاً یک ویژگی حریم خصوصی.',
          'موتورهای همگام‌سازی مبتنی بر CRDT بیشتر کار سخت سیستم‌های توزیع‌شده را از دوش تیم محصول برمی‌دارند.',
          'مدل کسب‌وکار ماندگار، هزینهٔ همکاری و همگام‌سازی را می‌گیرد و هستهٔ محلی را برای همیشه قابل‌استفاده نگه می‌دارد.'
        ]
      },
      body: [
        p(
          'The first wave of local-first software was a reaction. Cloud apps had made the local disk feel obsolete, and a generation of developers pushed back: the data is mine, the app should work on a train, and losing the network should not mean losing the afternoon. The principles were right, but the engineering was brutal. Every team that tried to build offline sync ended up writing a small, badly tested distributed database.',
          'موج اول نرم‌افزارهای Local-first یک واکنش بود. اپلیکیشن‌های ابری دیسک محلی را منسوخ نشان داده بودند و نسلی از توسعه‌دهندگان مقاومت کردند: داده مال من است، برنامه باید در قطار کار کند و از دست دادن شبکه نباید یعنی از دست دادن یک بعدازظهر. اصول درست بودند، اما مهندسی بی‌رحمانه بود. هر تیمی که تلاش می‌کرد همگام‌سازی آفلاین بسازد، در نهایت یک پایگاه‌دادهٔ توزیع‌شدهٔ کوچک و بدآزموده می‌نوشت.'
        ),
        p(
          'That barrier is falling. Modern sync engines package conflict resolution, change tracking, presence, and durable queues behind an API that a product team can adopt in a sprint rather than a quarter. Under the hood the good ones are serious systems: CRDTs for concurrent edits, operation logs for auditability, and server components that handle the messy parts without pretending the network is reliable.',
          'این سد در حال فروریختن است. موتورهای همگام‌سازی مدرن حل تعارض، ردیابی تغییرات، حضور و صف‌های پایدار را پشت APIای بسته‌بندی می‌کنند که تیم محصول می‌تواند در یک اسپرینت به کار بگیرد، نه در یک فصل. موتورهای خوب در زیر پوست سیستم‌های جدی‌اند: CRDT برای ویرایش‌های هم‌زمان، گزارش عملیات برای قابلیت حسابرسی، و اجزای سمت سرور که بخش‌های شلوغ را مدیریت می‌کنند بدون آنکه ادعا کنند شبکه قابل‌اعتماد است.'
        ),
        h(
          'What changed is not the philosophy. It is the bill of materials.',
          'چیزی که عوض شده فلسفه نیست؛ صورت مواد اولیه است.'
        ),
        p(
          'When the cost of offline sync drops, the decision stops being ideological and becomes ordinary product math. A note-taking app can open in milliseconds because it reads from disk first. A field-service tool keeps working in a basement. A desktop editor renders a long document without waiting for a server round trip. Each of these is a UX win that customers can feel, and none of them requires a lecture about data sovereignty.',
          'وقتی هزینهٔ همگام‌سازی آفلاین پایین می‌آید، تصمیم از ایدئولوژیک بودن خارج می‌شود و به حساب‌وکتاب عادی محصول تبدیل می‌شود. یک اپلیکیشن یادداشت می‌تواند در میلی‌ثانیه باز شود چون اول از دیسک می‌خواند. ابزار خدمات میدانی در زیرزمین هم کار می‌کند. ویرایشگر دسکتاپ یک سند بلند را بدون انتظار برای رفت‌وبرگشت سرور نمایش می‌دهد. هر کدام یک برد تجربهٔ کاربری است که مشتری حس می‌کند و هیچ‌کدام سخنرانی دربارهٔ حاکمیت داده لازم ندارد.'
        ),
        q(
          'Offline is not a fallback state. For a well-built local-first app, the network is an enhancement.',
          'آفلاین یک حالت اضطراری نیست. برای یک برنامهٔ خوبِ Local-first، شبکه یک قابلیت افزودنی است.',
          'NoxaPlus Editorial',
          'تحریریهٔ نواپلاس'
        ),
        h(
          'The business model that finally fits',
          'مدل کسب‌وکاری که بالاخره جور درمی‌آید'
        ),
        p(
          'The old tension was simple: if the app works offline forever, why would anyone pay monthly? The answer that stuck is to charge for the multiplayer layer. Local editing and local storage stay free and genuinely useful. Real-time collaboration, shared workspaces, version history, managed backup, and cross-device presence are the things that cost money to operate — and the things teams are happy to pay for. It is the same bargain as open-source infrastructure: the core earns trust, the hosted coordination earns revenue.',
          'تنش قدیمی ساده بود: اگر برنامه برای همیشه آفلاین کار کند، چرا کسی ماهانه پول بدهد؟ پاسخی که جا افتاد این است که برای لایهٔ چندنفره هزینه بگیریم. ویرایش و ذخیره‌سازی محلی رایگان و واقعاً مفید می‌مانند. همکاری هم‌زمان، فضای کاری مشترک، تاریخچهٔ نسخه‌ها، پشتیبان‌گیری مدیریت‌شده و حضور میان دستگاه‌ها چیزهایی هستند که نگهداری‌شان هزینه دارد — و چیزهایی که تیم‌ها با خوشحالی بابتشان پول می‌دهند. همان معاملهٔ زیرساخت متن‌باز است: هسته اعتماد می‌سازد، هماهنگی میزبانی‌شده درآمد.'
        ),
        p(
          'This also fixes the scariest failure mode of cloud software: the app disappears and takes your work with it. A local-first product can offer an exit that is not a marketing PDF. The file is on your disk, in a documented format, and the community can build a reader if the company vanishes. That is a stronger retention argument than any lock-in feature, because it lowers the perceived risk of starting.',
          'این ترسناک‌ترین حالت شکست نرم‌افزار ابری را هم درمان می‌کند: برنامه ناپدید می‌شود و کار شما را با خود می‌برد. یک محصول Local-first می‌تواند خروجی‌ای ارائه دهد که یک PDF تبلیغاتی نیست. فایل روی دیسک شماست، با قالبی مستند، و اگر شرکت ناپدید شود جامعه می‌تواند یک خواننده بسازد. این استدلال نگه‌داشت قوی‌تری از هر ویژگی قفل‌کننده است، چون ریسک درک‌شدهٔ شروع را کم می‌کند.'
        ),
        ul(
          [
            'Start with one offline-critical workflow instead of rewriting the whole product.',
            'Define what “local” means for every data type, including attachments and search indexes.',
            'Make sync state visible: pending, synced, conflicted, and resolved.',
            'Publish an export format and test it on a machine that has never seen your app.'
          ],
          [
            'به جای بازنویسی کل محصول، با یک جریان کاری حیاتیِ آفلاین شروع کنید.',
            'برای هر نوع داده، از جمله پیوست‌ها و نمایهٔ جست‌وجو، مشخص کنید «محلی» یعنی چه.',
            'وضعیت همگام‌سازی را قابل‌مشاهده کنید: در انتظار، همگام، متعارض و حل‌شده.',
            'قالب خروجی را منتشر کنید و آن را روی ماشینی آزمایش کنید که هرگز برنامهٔ شما را ندیده است.'
          ]
        ),
        p(
          'Local-first is not a religion, and it is not the right answer for every product. A social feed or a live auction still belongs on a server. But for the large middle ground — notes, documents, design files, field tools, personal finance, anything someone uses for hours — the default assumption is finally being questioned. The network is wonderful. It should not be the only place your work exists.',
          'Local-first یک مذهب نیست و برای هر محصولی پاسخ درست نیست. فید اجتماعی یا حراج زنده همچنان به سرور تعلق دارد. اما برای میانهٔ بزرگ — یادداشت‌ها، اسناد، فایل‌های طراحی، ابزارهای میدانی، مالی شخصی، هر چیزی که کسی ساعت‌ها با آن کار می‌کند — فرض پیش‌فرض بالاخره زیر سؤال رفته است. شبکه شگفت‌انگیز است. نباید تنها جایی باشد که کار شما وجود دارد.'
        )
      ]
    },
    {
      slug: 'battery-new-benchmark',
      category: 'mobile',
      author: 'studio',
      date: '2026-11-08',
      featured: true,
      trending: 0,
      cover: 'assets/covers/mobile-battery.svg',
      readMins: { en: 6, fa: 5 },
      title: {
        en: 'The battery is the new benchmark',
        fa: 'باتری، معیار سنجش جدید'
      },
      dek: {
        en: 'Phone launches still lead with TOPS and megapixels, but the specification that decides whether a device is good is the one you cannot see on a slide: sustained efficiency.',
        fa: 'معرفی گوشی‌ها هنوز با TOPS و مگاپیکسل شروع می‌شود، اما مشخصه‌ای که خوب بودن دستگاه را تعیین می‌کند همان چیزی است که روی اسلاید نمی‌بینید: کارایی پایدار.'
      },
      tags: [
        { en: 'Batteries', fa: 'باتری' },
        { en: 'Silicon', fa: 'سیلیکون' },
        { en: 'User experience', fa: 'تجربهٔ کاربری' }
      ],
      takeaways: {
        en: [
          'Peak performance numbers hide the thermal and efficiency curve that users actually live on.',
          'Always-on AI features make sustained power draw a first-class product constraint.',
          'Battery health, charging speed, and repairability matter as much as capacity in milliamp-hours.'
        ],
        fa: [
          'اعداد اوج عملکرد، منحنی حرارت و کارایی‌ای را که کاربر واقعاً در آن زندگی می‌کند پنهان می‌کنند.',
          'قابلیت‌های همیشه‌روشن هوش مصنوعی، مصرف توان پایدار را به محدودیت درجه‌یک محصول تبدیل می‌کنند.',
          'سلامت باتری، سرعت شارژ و قابلیت تعمیر به اندازهٔ ظرفیت بر حسب میلی‌آمپرساعت مهم‌اند.'
        ]
      },
      body: [
        p(
          'Every phone launch follows the same choreography. A stage, a montage, a number that is bigger than last year. The number used to be megapixels, then screen refresh rate, then benchmark scores. This year it is TOPS — trillions of operations per second — because every vendor wants to claim the fastest on-device AI. The trouble is that TOPS describes a peak that a phone can reach for a few seconds before heat and power limits pull it back to reality.',
          'هر معرفی گوشی همان نمایش همیشگی را دارد: یک صحنه، یک ویدیوی تدوینی و عددی که از سال گذشته بزرگ‌تر است. عدد قبلاً مگاپیکسل بود، بعد نرخ نوسازی نمایشگر و بعد امتیاز بنچمارک. امسال TOPS است — تریلیون عملیات بر ثانیه — چون هر فروشنده می‌خواهد سریع‌ترین هوش مصنوعی روی دستگاه را ادعا کند. مشکل این است که TOPS یک اوج را توصیف می‌کند که گوشی چند ثانیه به آن می‌رسد و بعد گرما و توان آن را به واقعیت برمی‌گرداند.'
        ),
        p(
          'What users experience is the sustained curve. Can the camera process a burst of photos without the viewfinder stuttering? Does the transcription app still keep up after ten minutes? Does the phone feel the same at 4 p.m. as it did at 9 a.m.? These questions are answered by efficiency — work per watt, heat per operation, and the software that decides when to sprint and when to coast.',
          'چیزی که کاربر تجربه می‌کند منحنی پایدار است. آیا دوربین می‌تواند یک رشته عکس را بدون لگ کردن نمایاب پردازش کند؟ آیا اپلیکیشن رونویسی بعد از ده دقیقه هم همراهی می‌کند؟ آیا گوشی ساعت چهار بعدازظهر همان حس ساعت نه صبح را دارد؟ پاسخ این پرسش‌ها را کارایی می‌دهد — کار به ازای هر وات، گرما به ازای هر عملیات، و نرم‌افزاری که تصمیم می‌گیرد کِی بدود و کِی قدم بزند.'
        ),
        h(
          'Always-on AI changes the math',
          'هوش مصنوعی همیشه‌روشن حساب‌وکتاب را عوض می‌کند'
        ),
        p(
          'A camera burst is a spike. An assistant that listens for a wake word, indexes photos in the background, or summarizes notifications is a baseline load. Baseline load is far more dangerous for battery life than any benchmark, because it runs while the screen is off and the user is not thinking about the phone. The best implementations use tiny dedicated models for detection and wake the larger model only when there is something worth doing.',
          'عکاسی پی‌درپی یک جهش است. دستیاری که منتظر کلمهٔ بیدارباش است، عکس‌ها را در پس‌زمینه نمایه می‌کند یا اعلان‌ها را خلاصه می‌کند، یک بار پایه است. بار پایه برای عمر باتری بسیار خطرناک‌تر از هر بنچمارکی است، چون وقتی اجرا می‌شود که صفحه خاموش است و کاربر به گوشی فکر نمی‌کند. بهترین پیاده‌سازی‌ها از مدل‌های کوچک اختصاصی برای تشخیص استفاده می‌کنند و مدل بزرگ‌تر را فقط وقتی بیدار می‌کنند که کاری ارزش انجام دادن وجود دارد.'
        ),
        q(
          'A phone spec sheet tells you how fast a device can be. A battery curve tells you how good it is to live with.',
          'مشخصات فنی گوشی می‌گوید دستگاه چقدر می‌تواند سریع باشد. منحنی باتری می‌گوید زندگی با آن چقدر خوب است.',
          'NoxaPlus Studio',
          'استودیو نواپلاس'
        ),
        h(
          'The unglamorous levers',
          'اهرم‌های بی‌زرق‌وبرقی'
        ),
        p(
          'Efficiency is rarely one breakthrough. It is a stack of small decisions: a modem that sleeps more aggressively, a display driver that adapts refresh rate to content, a scheduler that understands which background jobs can wait, and a battery management system that does not panic-charge at every opportunity. None of these makes a good slide. Together they decide whether a phone ends the day at 15 percent or 40 percent.',
          'کارایی به‌ندرت یک جهش است. انباشتی از تصمیم‌های کوچک است: مودمی که تهاجمی‌تر می‌خوابد، درایور نمایشگری که نرخ نوسازی را با محتوا سازگار می‌کند، زمان‌بندهایی که می‌دانند کدام کارهای پس‌زمینه می‌توانند صبر کنند، و سیستم مدیریت باتری‌ای که در هر فرصتی با وحشت شارژ نمی‌کند. هیچ‌کدام اسلاید خوبی نمی‌سازند. با هم تصمیم می‌گیرند گوشی روز را با ۱۵ درصد تمام کند یا ۴۰ درصد.'
        ),
        p(
          'Battery health is the other half of the story. A device with a 5,000 mAh cell that loses a fifth of its capacity in eighteen months is worse than a device with a 4,400 mAh cell that holds up for four years. Charging limits, heat management, and replaceable cells are not exotic features; they are the difference between a two-year product and a five-year one. The market is slowly rewarding the companies that say so out loud.',
          'سلامت باتری نیمهٔ دیگر ماجراست. دستگاهی با باتری ۵۰۰۰ میلی‌آمپرساعت که در هجده ماه یک‌پنجم ظرفیتش را از دست می‌دهد، بدتر از دستگاهی با باتری ۴۴۰۰ میلی‌آمپرساعت است که چهار سال دوام می‌آورد. محدودیت شارژ، مدیریت گرما و سلول‌های قابل‌تعویض ویژگی‌های عجیب نیستند؛ تفاوت میان یک محصول دوساله و یک محصول پنج‌ساله‌اند. بازار آرام‌آرام شرکت‌هایی را پاداش می‌دهد که این را بلند می‌گویند.'
        ),
        p(
          'The next time a launch event throws a large number at you, look for the smaller ones: watts under load, charge cycles to 80 percent health, and how many screws stand between you and a new cell. Those numbers will not trend on social media. They will determine whether the phone earns a place in your life.',
          'دفعهٔ بعد که یک مراسم معرفی عدد بزرگی به سمت شما پرتاب کرد، دنبال عددهای کوچک‌تر بگردید: وات زیر بار، چرخه‌های شارژ تا ۸۰ درصد سلامت، و اینکه چند پیچ بین شما و یک باتری تازه فاصله است. آن عددها در شبکه‌های اجتماعی ترند نمی‌شوند. آن‌ها تعیین می‌کنند گوشی جایگاهی در زندگی شما پیدا می‌کند یا نه.'
        )
      ]
    },
    {
      slug: 'repairable-laptop',
      category: 'hardware',
      author: 'studio',
      date: '2026-11-06',
      trending: 0,
      cover: 'assets/covers/hardware-repairable.svg',
      readMins: { en: 6, fa: 5 },
      title: {
        en: 'The quiet rise of the repairable laptop',
        fa: 'ظهور آرام لپ‌تاپ‌های قابل تعمیر'
      },
      dek: {
        en: 'Modular ports, standard screws, documented parts, and batteries you can actually replace are moving from enthusiast projects to mainstream purchasing criteria.',
        fa: 'درگاه‌های ماژولار، پیچ‌های استاندارد، قطعات مستند و باتری‌هایی که واقعاً می‌توان تعویض کرد، از پروژه‌های علاقه‌مندان به معیارهای خرید جریان اصلی تبدیل می‌شوند.'
      },
      tags: [
        { en: 'Repairability', fa: 'قابلیت تعمیر' },
        { en: 'Right to repair', fa: 'حق تعمیر' },
        { en: 'Hardware design', fa: 'طراحی سخت‌افزار' }
      ],
      takeaways: {
        en: [
          'Repairability is a supply-chain decision: parts, documentation, and screws all have to agree.',
          'Total cost of ownership is making modular laptops easier to justify than the sticker price suggests.',
          'Regulation is pushing in one direction; customer expectations are pushing in the same direction.'
        ],
        fa: [
          'قابلیت تعمیر یک تصمیم زنجیرهٔ تأمین است: قطعات، مستندات و پیچ‌ها باید با هم هماهنگ باشند.',
          'هزینهٔ کل مالکیت، توجیه لپ‌تاپ‌های ماژولار را آسان‌تر از آنچه قیمت روی برچسب می‌گوید می‌کند.',
          'قانون‌گذاری در یک جهت فشار می‌آورد؛ انتظارات مشتری هم در همان جهت فشار می‌آورد.'
        ]
      },
      body: [
        p(
          'For most of the last decade, buying a thin laptop meant accepting a sealed object. Memory was soldered, storage was proprietary, the battery was glued, and a cracked port meant a mainboard replacement. The trade-off was presented as inevitable: if you want thin and light, you give up serviceability. A growing category of laptops is proving that the trade-off was a choice, not a law of physics.',
          'در بیشتر دههٔ گذشته، خرید یک لپ‌تاپ باریک یعنی پذیرش یک شیء مهروموم. حافظه لحیم بود، حافظهٔ ذخیره‌سازی اختصاصی، باتری چسبیده و یک درگاه ترک‌خورده یعنی تعویض مادربرد. این معامله اجتناب‌ناپذیر نشان داده می‌شد: اگر باریک و سبک می‌خواهی، از قابلیت سرویس‌دهی بگذر. دستهٔ رو به رشدی از لپ‌تاپ‌ها نشان می‌دهند این معامله یک انتخاب بود، نه قانون فیزیک.'
        ),
        p(
          'The design language is consistent: captive screws instead of glue, labeled connectors, published part numbers, and a repair guide that does not require a forum thread from 2019. Some models go further with hot-swappable ports, so a USB-A module can become HDMI or Ethernet without a dongle. The point is not nostalgia for thick machines. It is that a laptop is a tool with a ten-year useful life, and the owner should be able to decide which parts age out first.',
          'زبان طراحی یکسان است: پیچ‌های مهارشده به جای چسب، اتصال‌دهنده‌های برچسب‌دار، شمارهٔ قطعات منتشرشده و راهنمای تعمیر که به یک رشتهٔ انجمن از سال ۲۰۱۹ نیاز ندارد. برخی مدل‌ها با درگاه‌های قابل‌تعویضِ داغ پیش‌تر می‌روند، تا ماژول USB-A بدون مبدل به HDMI یا Ethernet تبدیل شود. نکته نوستالژی برای دستگاه‌های ضخیم نیست. نکته این است که لپ‌تاپ ابزاری با عمر مفید ده‌ساله است و مالک باید بتواند تصمیم بگیرد کدام قطعه اول فرسوده شود.'
        ),
        h(
          'The economics are catching up',
          'اقتصاد دارد جبران می‌کند'
        ),
        p(
          'A repairable laptop often costs more up front. It can also cost far less over five years. A battery replacement is a routine service instead of a factory visit. A storage upgrade postpones a full replacement. A broken hinge does not total the machine. For schools, small businesses, and anyone who keeps a device longer than a phone contract, that math is persuasive. Resale value improves too, because a buyer can see what is serviceable and what is not.',
          'یک لپ‌تاپ قابل تعمیر اغلب قیمت اولیهٔ بالاتری دارد. می‌تواند در پنج سال بسیار کمتر هزینه بدهد. تعویض باتری یک سرویس معمول است نه سفر به کارخانه. ارتقای حافظه، تعویض کامل را به تعویق می‌اندازد. لولای شکسته دستگاه را از کار نمی‌اندازد. برای مدرسه‌ها، کسب‌وکارهای کوچک و هر کسی که دستگاهی را بیشتر از قرارداد یک گوشی نگه می‌دارد، این حساب قانع‌کننده است. ارزش فروش دست‌دوم هم بهتر می‌شود، چون خریدار می‌بیند چه چیزی قابل سرویس است و چه چیزی نیست.'
        ),
        q(
          'A screw is a promise that the product will still be yours in five years.',
          'یک پیچ، وعده‌ای است که محصول پنج سال دیگر هم مال شما خواهد بود.',
          'NoxaPlus Studio',
          'استودیو نواپلاس'
        ),
        p(
          'Regulation is accelerating the shift. Rules that require spare parts, repair information, and longer software support are turning repairability from a nice-to-have into a procurement checkbox. Manufacturers that treated serviceability as a compliance cost are discovering it can also be a brand differentiator. The companies that started early have a catalog of parts, a repair network, and the institutional knowledge that competitors now have to build from scratch.',
          'قانون‌گذاری این تغییر را شتاب می‌دهد. قواعدی که قطعات یدکی، اطلاعات تعمیر و پشتیبانی نرم‌افزاری طولانی‌تر را الزامی می‌کنند، قابلیت تعمیر را از یک ویژگی خوب به یک گزینهٔ چک‌لیست خرید تبدیل می‌کنند. سازندگانی که قابلیت سرویس را هزینهٔ انطباق می‌دیدند، درمی‌یابند که می‌تواند تمایز برند هم باشد. شرکت‌هایی که زود شروع کردند کاتالوگ قطعات، شبکهٔ تعمیر و دانش نهادی دارند که رقبا اکنون باید از صفر بسازند.'
        ),
        ul(
          [
            'Check whether the battery, storage, and memory are user-replaceable before comparing prices.',
            'Look for published service manuals, not just teardown videos.',
            'Ask how many years of security updates are included, in writing.',
            'Weigh five-year total cost, not the launch-day discount.'
          ],
          [
            'پیش از مقایسهٔ قیمت‌ها بررسی کنید باتری، حافظهٔ ذخیره‌سازی و رم قابل‌تعویض توسط کاربر هستند یا نه.',
            'به دنبال راهنمای سرویس منتشرشده باشید، نه فقط ویدیوی بازکردن دستگاه.',
            'بپرسید چند سال به‌روزرسانی امنیتی ارائه می‌شود، به‌صورت مکتوب.',
            'هزینهٔ کل پنج‌ساله را بسنجید، نه تخفیف روز عرضه.'
          ]
        ),
        p(
          'The repairable laptop will not win every buyer. Many people want the thinnest possible machine and will happily trade serviceability for it. That is a legitimate choice. What is changing is that the choice is becoming visible. For a decade, the industry pretended there was only one answer. The growing shelf of modular machines is a reminder that good design includes the day after you buy it.',
          'لپ‌تاپ قابل تعمیر همهٔ خریداران را جذب نمی‌کند. بسیاری باریک‌ترین دستگاه ممکن را می‌خواهند و با خوشحالی قابلیت سرویس را فدا می‌کنند. این انتخابی مشروع است. چیزی که عوض می‌شود این است که انتخاب دارد قابل‌مشاهده می‌شود. یک دهه، صنعت تظاهر کرد فقط یک پاسخ وجود دارد. قفسهٔ رو به رشد دستگاه‌های ماژولار یادآوری می‌کند که طراحی خوب شامل روز بعد از خرید هم می‌شود.'
        )
      ]
    },
    {
      slug: 'passkeys-hard-part',
      category: 'cyber',
      author: 'research',
      date: '2026-11-05',
      trending: 3,
      cover: 'assets/covers/cyber-passkeys.svg',
      readMins: { en: 7, fa: 6 },
      title: {
        en: 'Passkeys are winning quietly. The hard part starts now',
        fa: 'پس‌کی‌ها بی‌سروصدا برنده می‌شوند؛ بخش سخت تازه شروع شده است'
      },
      dek: {
        en: 'Phishing-resistant sign-in is finally normal. The remaining work is account recovery, legacy systems, and the support desk that has to explain it all.',
        fa: 'ورود مقاوم در برابر فیشینگ بالاخره عادی شده است. کار باقی‌مانده، بازیابی حساب، سیستم‌های قدیمی و میز پشتیبانی‌ای است که باید همه‌چیز را توضیح دهد.'
      },
      tags: [
        { en: 'Passkeys', fa: 'پس‌کی' },
        { en: 'Identity', fa: 'هویت' },
        { en: 'Account recovery', fa: 'بازیابی حساب' }
      ],
      takeaways: {
        en: [
          'Passkeys remove the shared secret, which removes entire classes of phishing and credential stuffing.',
          'Recovery is the new attack surface; design it with the same rigor as sign-in.',
          'A staged rollout with fallback methods beats a forced migration that locks people out.'
        ],
        fa: [
          'پس‌کی‌ها رمز مشترک را حذف می‌کنند و با آن کل دسته‌هایی از فیشینگ و تزریق اعتبارنامه را از بین می‌برند.',
          'بازیابی، سطح حملهٔ جدید است؛ آن را با همان دقتی طراحی کنید که برای ورود دارید.',
          'عرضهٔ مرحله‌به‌مرحله با روش‌های جایگزین، بهتر از مهاجرت اجباری‌ای است که مردم را بیرون می‌گذارد.'
        ]
      },
      body: [
        p(
          'Passkeys have crossed the boring threshold. They appear in operating systems, password managers, and the sign-in pages of services people use every day. The pitch is easy to understand: instead of a password that can be phished, guessed, reused, or leaked, you hold a cryptographic key that never leaves your device. The server stores a public key. There is no shared secret to steal.',
          'پس‌کی‌ها از آستانهٔ خسته‌کننده گذشته‌اند. در سیستم‌عامل‌ها، مدیران رمز و صفحه‌های ورود سرویس‌هایی که مردم هر روز استفاده می‌کنند ظاهر شده‌اند. وعده آسان است: به جای رمزی که می‌توان فیش کرد، حدس زد، دوباره استفاده کرد یا لو داد، شما یک کلید رمزنگاری در دست دارید که هرگز دستگاه را ترک نمی‌کند. سرور فقط کلید عمومی را ذخیره می‌کند. رمز مشترکی برای دزدیدن وجود ندارد.'
        ),
        p(
          'The security case is strong enough that adoption no longer needs a lecture. What it needs now is operational maturity. A sign-in method is not finished when it works for the happy path; it is finished when it works for the person who lost their phone, changed jobs, switched platforms, or forgot which account is which. That is where the hard work lives.',
          'دلیل امنیتی به اندازهٔ کافی قوی است که پذیرش دیگر به سخنرانی نیاز ندارد. چیزی که اکنون لازم است بلوغ عملیاتی است. یک روش ورود وقتی تمام نمی‌شود که برای مسیر خوش‌بینانه کار کند؛ وقتی تمام می‌شود که برای کسی کار کند که گوشی‌اش را گم کرده، شغلش را عوض کرده، پلتفرم را تغییر داده یا فراموش کرده کدام حساب کدام است. کار سخت همان‌جا زندگی می‌کند.'
        ),
        h(
          'Recovery is the real test',
          'بازیابی، آزمون واقعی است'
        ),
        p(
          'Every passkey deployment needs an answer to a simple question: how does a legitimate user get back in after losing every authenticator? If the answer is a weak email reset, the attacker will aim at the reset flow instead of the login. If the answer is a support agent with broad override powers, social engineering moves to the support desk. Recovery has to be designed as a security boundary, with its own threat model, rate limits, and audit trail.',
          'هر پیاده‌سازی پس‌کی به یک پرسش ساده پاسخ نیاز دارد: کاربر مشروع پس از از دست دادن همهٔ احرازگرها چگونه برمی‌گردد؟ اگر پاسخ یک بازنشانی ضعیف ایمیلی باشد، مهاجم به جای ورود، جریان بازنشانی را هدف می‌گیرد. اگر پاسخ یک کارشناس پشتیبانی با اختیارات گسترده باشد، مهندسی اجتماعی به میز پشتیبانی منتقل می‌شود. بازیابی باید به‌عنوان یک مرز امنیتی طراحی شود، با مدل تهدید، محدودیت نرخ و ردپای حسابرسی خودش.'
        ),
        q(
          'Passkeys solve the password problem. They do not solve the “I lost my phone at the airport” problem.',
          'پس‌کی‌ها مسئلهٔ رمز عبور را حل می‌کنند. مسئلهٔ «گوشی‌ام را در فرودگاه گم کردم» را حل نمی‌کنند.',
          'NoxaPlus Research Desk',
          'میز پژوهش نواپلاس'
        ),
        p(
          'The good news is that recovery can be stronger than the password era. Multiple passkeys per account, synced across a trusted ecosystem, plus a printed recovery code and a time-delayed fallback can be more resilient than a security question. The key is to give users a clear mental model: which devices hold keys, what happens if one is lost, and how to add or revoke one before an emergency.',
          'خبر خوب این است که بازیابی می‌تواند از دوران رمز عبور قوی‌تر باشد. چند پس‌کی برای هر حساب، همگام‌شده در یک بوم‌سازگان قابل‌اعتماد، به‌همراه یک کد بازیابی چاپ‌شده و یک روش جایگزینِ تأخیردار می‌تواند مقاوم‌تر از یک سؤال امنیتی باشد. نکته این است که به کاربران مدل ذهنی روشن بدهیم: کدام دستگاه‌ها کلید دارند، اگر یکی گم شود چه می‌شود، و چگونه پیش از بحران کلید اضافه یا باطل کنیم.'
        ),
        h(
          'The long tail of legacy systems',
          'دنبالهٔ بلند سیستم‌های قدیمی'
        ),
        p(
          'Large organizations rarely have the luxury of a clean slate. A single employee may touch a modern SaaS product, an on-premise application from 2014, a VPN concentrator, and a factory-floor terminal. Passkeys can cover the modern edge; the rest needs a transition plan. Forced migration is the fastest way to create a password-reset queue and a support backlog. A staged rollout that lets early adopters move first, measures failure modes, and keeps a monitored fallback is slower — and far more likely to last.',
          'سازمان‌های بزرگ به‌ندرت لوکس شروع از صفر را دارند. یک کارمند ممکن است با یک محصول SaaS مدرن، یک برنامهٔ درون‌سازمانی از ۲۰۱۴، یک متمرکزکنندهٔ VPN و یک ترمینال کف کارخانه سر و کار داشته باشد. پس‌کی‌ها می‌توانند لبهٔ مدرن را پوشش دهند؛ بقیه برنامهٔ گذار لازم دارند. مهاجرت اجباری سریع‌ترین راه برای ساختن صف بازنشانی رمز و انبوه تیکت‌های پشتیبانی است. عرضهٔ مرحله‌به‌مرحله که به پیشروها اجازهٔ حرکت اول می‌دهد، حالت‌های شکست را می‌سنجد و یک روش جایگزین پایش‌شده نگه می‌دارد کندتر است — و بسیار محتمل‌تر که دوام بیاورد.'
        ),
        p(
          'Passkeys are a rare security upgrade that also improves the everyday experience. That combination is why they are spreading. The teams that finish the job will be the ones that treat recovery, support, and legacy integration as part of the product — not as edge cases to document later.',
          'پس‌کی‌ها ارتقای امنیتی نادری هستند که تجربهٔ روزمره را هم بهتر می‌کنند. همین ترکیب دلیل گسترش آن‌هاست. تیم‌هایی که کار را تمام می‌کنند همان‌هایی خواهند بود که بازیابی، پشتیبانی و یکپارچگی با سیستم‌های قدیمی را بخشی از محصول می‌بینند — نه موارد حاشیه‌ای برای مستندسازی بعدی.'
        )
      ]
    },
    {
      slug: 'small-satellites-data',
      category: 'space',
      author: 'research',
      date: '2026-11-03',
      trending: 0,
      cover: 'assets/covers/space-small-sats.svg',
      readMins: { en: 7, fa: 6 },
      title: {
        en: 'Small satellites are turning orbit into a data platform',
        fa: 'ماهواره‌های کوچک مدار را به یک پلتفرم داده تبدیل می‌کنند'
      },
      dek: {
        en: 'The launch cost story is familiar. The more interesting shift is on the ground, where automated downlink, cloud processing, and subscription analytics are remaking the economics of Earth observation.',
        fa: 'داستان هزینهٔ پرتاب آشناست. تغییر جالب‌تر روی زمین رخ می‌دهد؛ جایی که دریافت خودکار داده، پردازش ابری و تحلیل اشتراکی اقتصاد رصد زمین را از نو می‌سازند.'
      },
      tags: [
        { en: 'Earth observation', fa: 'رصد زمین' },
        { en: 'Small satellites', fa: 'ماهواره‌های کوچک' },
        { en: 'Data platforms', fa: 'پلتفرم‌های داده' }
      ],
      takeaways: {
        en: [
          'The bottleneck has moved from launch to downlink, processing, and distribution.',
          'Operators that sell answers instead of raw imagery capture more value.',
          'Ground-segment automation and data licensing are becoming the competitive moat.'
        ],
        fa: [
          'گلوگاه از پرتاب به دریافت داده، پردازش و توزیع منتقل شده است.',
          'اپراتورهایی که به جای تصویر خام، پاسخ می‌فروشند ارزش بیشتری جذب می‌کنند.',
          'خودکارسازی بخش زمینی و مجوز داده به خندق رقابتی تبدیل می‌شوند.'
        ]
      },
      body: [
        p(
          'The small-satellite story is usually told in kilograms and dollars: a spacecraft the size of a shoebox, a rideshare launch, a fraction of the cost of the old institutional platforms. That story is true, and it is also becoming less interesting. When launching a satellite is no longer the hard part, the hard part moves to everything that happens after the solar panels deploy.',
          'داستان ماهواره‌های کوچک معمولاً با کیلوگرم و دلار گفته می‌شود: فضاپیمایی به اندازهٔ یک جعبهٔ کفش، پرتاب اشتراکی و کسری از هزینهٔ پلتفرم‌های نهادی قدیمی. این داستان درست است و در عین حال کمتر جالب می‌شود. وقتی پرتاب ماهواره دیگر بخش سخت نیست، بخش سخت به هر چیزی منتقل می‌شود که بعد از باز شدن پنل‌های خورشیدی رخ می‌دهد.'
        ),
        p(
          'A modern imaging constellation can produce terabytes per day. Getting that data to the ground is constrained by radio spectrum, ground-station availability, and the physics of a few minutes of contact per pass. The operators that win are not necessarily the ones with the most satellites; they are the ones that can turn a pass into a clean, calibrated, searchable product with minimal human intervention.',
          'یک صورت‌فلکی تصویربرداری مدرن می‌تواند روزانه ترابایت داده تولید کند. رساندن این داده به زمین به طیف رادیویی، دسترسی به ایستگاه زمینی و فیزیک چند دقیقه تماس در هر گذر محدود است. اپراتورهایی که برنده می‌شوند لزوماً بیشترین ماهواره را ندارند؛ آن‌هایی هستند که می‌توانند یک گذر را با کمترین دخالت انسانی به محصولی تمیز، کالیبره و قابل‌جست‌وجو تبدیل کنند.'
        ),
        h(
          'From pixels to decisions',
          'از پیکسل به تصمیم'
        ),
        p(
          'Raw imagery is a commodity. What buyers actually want is a decision: which field is stressed, which road is blocked, which port is congested, how much forest was lost since last month. That requires more than a camera. It requires radiometric calibration, cloud masking, change detection, and an API that fits into a customer’s existing workflow. The value shifts from the spacecraft to the software stack around it.',
          'تصویر خام یک کالای عمومی است. چیزی که خریدار واقعاً می‌خواهد یک تصمیم است: کدام مزرعه تحت تنش است، کدام جاده مسدود شده، کدام بندر شلوغ است، از ماه گذشته چقدر جنگل از دست رفته. این به بیش از یک دوربین نیاز دارد. به کالیبراسیون رادیومتریک، پوشاندن ابر، تشخیص تغییر و APIای نیاز دارد که در جریان کاری موجود مشتری جا شود. ارزش از فضاپیما به پشتهٔ نرم‌افزاری اطراف آن منتقل می‌شود.'
        ),
        q(
          'The satellite is the sensor. The product is the answer.',
          'ماهواره حسگر است. محصول، پاسخ است.',
          'NoxaPlus Research Desk',
          'میز پژوهش نواپلاس'
        ),
        p(
          'This is why so many operators now talk like software companies. They publish APIs, offer usage-based pricing, and build dashboards. They also form partnerships with analytics firms rather than trying to own the entire chain. The most durable position is often a narrow one: excellent data, reliable delivery, and clear licensing, with partners building the last mile of interpretation for specific industries.',
          'به همین دلیل بسیاری از اپراتورها اکنون مثل شرکت‌های نرم‌افزاری صحبت می‌کنند. API منتشر می‌کنند، قیمت‌گذاری مصرفی ارائه می‌دهند و داشبورد می‌سازند. همچنین با شرکت‌های تحلیل داده شریک می‌شوند به جای آنکه بخواهند کل زنجیره را مالک شوند. ماندگارترین موقعیت اغلب محدود است: دادهٔ عالی، تحویل قابل‌اعتماد و مجوز شفاف، در حالی که شرکا آخرین مایل تفسیر را برای صنایع خاص می‌سازند.'
        ),
        p(
          'The risks are real. Orbit is getting crowded, spectrum is contested, and a single collision can create debris that affects everyone. Sustainable operations, accurate tracking, and responsible deorbiting are not optional costs; they are the license to operate. The same is true of data governance: imagery of conflict zones, private property, and sensitive infrastructure raises questions that a terms-of-service page cannot answer alone.',
          'ریسک‌ها واقعی‌اند. مدار شلوغ می‌شود، طیف محل نزاع است و یک برخورد می‌تواند زباله‌ای بسازد که همه را تحت تأثیر قرار دهد. عملیات پایدار، ردیابی دقیق و خروج مسئولانه از مدار هزینه‌های اختیاری نیستند؛ مجوز فعالیت‌اند. همین دربارهٔ حاکمیت داده صادق است: تصویر مناطق درگیری، ملک خصوصی و زیرساخت حساس پرسش‌هایی مطرح می‌کند که یک صفحهٔ شرایط استفاده به‌تنهایی پاسخشان را نمی‌دهد.'
        ),
        p(
          'The small-satellite era is not mainly about cheaper rockets. It is about a new data supply chain being assembled in orbit and on the ground at the same time. The companies that understand both halves — the sensor and the answer — will define what the market looks like when the novelty wears off.',
          'دوران ماهواره‌های کوچک عمدتاً دربارهٔ موشک‌های ارزان‌تر نیست. دربارهٔ زنجیرهٔ تأمین دادهٔ جدیدی است که هم‌زمان در مدار و روی زمین ساخته می‌شود. شرکت‌هایی که هر دو نیمه را درک کنند — حسگر و پاسخ — تعیین می‌کنند بازار وقتی تازگی تمام شود چه شکلی خواهد داشت.'
        )
      ]
    },
    {
      slug: 'post-quantum-checklist',
      category: 'cyber',
      author: 'research',
      date: '2026-10-27',
      trending: 0,
      cover: 'assets/covers/cyber-quantum.svg',
      readMins: { en: 8, fa: 7 },
      title: {
        en: 'Post-quantum cryptography: a practical migration checklist for small teams',
        fa: 'رمزنگاری پساکوانتومی: چک‌لیست مهاجرت عملی برای تیم‌های کوچک'
      },
      dek: {
        en: 'You do not need a quantum computer to start. You need an inventory, crypto agility, and a plan for the data that must stay secret for decades.',
        fa: 'برای شروع به کامپیوتر کوانتومی نیاز ندارید. به فهرستی از دارایی‌ها، چابکی رمزنگاری و برنامه‌ای برای داده‌ای نیاز دارید که باید دهه‌ها محرمانه بماند.'
      },
      tags: [
        { en: 'Post-quantum', fa: 'پساکوانتوم' },
        { en: 'Cryptography', fa: 'رمزنگاری' },
        { en: 'Compliance', fa: 'انطباق' }
      ],
      takeaways: {
        en: [
          'Harvest-now-decrypt-later makes long-lived secrets urgent even before quantum machines arrive.',
          'Crypto agility — the ability to swap algorithms without rewriting products — is the real deliverable.',
          'Start with inventory and TLS, then signing and long-term archives, then custom protocols.'
        ],
        fa: [
          '«امروز برداشت کن، بعداً رمزگشایی کن» رازهای بلندعمر را حتی پیش از رسیدن ماشین‌های کوانتومی فوری می‌کند.',
          'چابکی رمزنگاری — توانایی تعویض الگوریتم بدون بازنویسی محصول — خروجی واقعی است.',
          'با فهرست دارایی‌ها و TLS شروع کنید، بعد امضا و آرشیو بلندمدت، سپس پروتکل‌های اختصاصی.'
        ]
      },
      body: [
        p(
          'Post-quantum cryptography has a reputation problem: it sounds like a problem for people with a quantum computer and a budget the size of a small country. The practical reality is the opposite. The migration is mostly ordinary engineering — finding where cryptography lives, removing assumptions about key sizes, and making algorithms replaceable. The organizations that start now are not early adopters; they are on schedule.',
          'رمزنگاری پساکوانتومی مشکل شهرت دارد: به نظر می‌رسد مسئلهٔ کسانی است که کامپیوتر کوانتومی و بودجه‌ای به اندازهٔ یک کشور کوچک دارند. واقعیت عملی برعکس است. مهاجرت عمدتاً مهندسی معمولی است — پیدا کردن جایی که رمزنگاری زندگی می‌کند، حذف فرض‌ها دربارهٔ اندازهٔ کلید و قابل‌تعویض کردن الگوریتم‌ها. سازمان‌هایی که اکنون شروع می‌کنند پیشرو نیستند؛ طبق برنامه‌اند.'
        ),
        p(
          'The urgency comes from a simple asymmetry. Encrypted traffic can be recorded today and decrypted later. If a secret must remain confidential for twenty years, then the threat model includes a machine that may exist in ten. Health records, legal settlements, source code, identity documents, and long-lived signing keys all fall into this category. The sensitive data is already being collected; the question is whether it will still be safe when the math changes.',
          'فوریت از یک عدم‌تقارن ساده می‌آید. ترافیک رمزنگاری‌شده را می‌توان امروز ضبط و بعداً رمزگشایی کرد. اگر رازی باید بیست سال محرمانه بماند، مدل تهدید شامل ماشینی می‌شود که ممکن است ده سال دیگر وجود داشته باشد. پرونده‌های پزشکی، توافق‌های حقوقی، کد منبع، اسناد هویت و کلیدهای امضای بلندعمر همه در این دسته‌اند. دادهٔ حساس همین حالا جمع‌آوری می‌شود؛ پرسش این است که آیا وقتی ریاضیات عوض شد هنوز امن خواهد بود.'
        ),
        h(
          'Build for agility, not for one algorithm',
          'برای چابکی بسازید، نه برای یک الگوریتم'
        ),
        p(
          'The most important outcome of a migration program is not a particular algorithm. It is the ability to change algorithms without a product rewrite. That means centralizing cryptographic policy, versioning key material, and testing the rollback path. Standards will evolve; implementations will have bugs; a hybrid mode may be required for years. A team that can swap a library behind a stable interface can respond to all of those. A team with cryptography scattered across twelve services cannot.',
          'مهم‌ترین نتیجهٔ یک برنامهٔ مهاجرت، یک الگوریتم خاص نیست. توانایی تغییر الگوریتم بدون بازنویسی محصول است. این یعنی متمرکز کردن سیاست رمزنگاری، نسخه‌بندی مواد کلید و آزمایش مسیر بازگشت. استانداردها تکامل می‌یابند؛ پیاده‌سازی‌ها باگ خواهند داشت؛ ممکن است سال‌ها به حالت ترکیبی نیاز باشد. تیمی که می‌تواند کتابخانه‌ای را پشت یک رابط پایدار عوض کند از پس همهٔ این‌ها برمی‌آید. تیمی که رمزنگاری‌اش در دوازده سرویس پراکنده است نمی‌تواند.'
        ),
        q(
          'The deliverable is not a new cipher. It is the confidence that you can replace one.',
          'خروجی یک رمز جدید نیست. اطمینان از اینکه می‌توانید یکی را جایگزین کنید.',
          'NoxaPlus Research Desk',
          'میز پژوهش نواپلاس'
        ),
        h(
          'A small-team sequence',
          'یک ترتیب کاری برای تیم کوچک'
        ),
        ul(
          [
            'Inventory every place cryptography appears: TLS, signatures, at-rest encryption, tokens, backups, and third-party dependencies.',
            'Classify secrets by how long they must stay confidential. A session token and a twenty-year archive are different problems.',
            'Enable hybrid post-quantum key exchange where your TLS stack supports it, and measure the performance cost.',
            'Move signing keys and code-signing pipelines onto paths you can upgrade.',
            'Ask vendors for their roadmap in writing, and put crypto agility in contracts.',
            'Rehearse a rollback: rotate a key, swap an algorithm, and verify old data still opens.'
          ],
          [
            'هر جایی که رمزنگاری ظاهر می‌شود را فهرست کنید: TLS، امضاها، رمزنگاری در حالت سکون، توکن‌ها، پشتیبان‌ها و وابستگی‌های شخص ثالث.',
            'رازها را بر اساس مدت محرمانگی دسته‌بندی کنید. توکن نشست و آرشیو بیست‌ساله دو مسئلهٔ متفاوت‌اند.',
            'هر جا پشتهٔ TLS پشتیبانی می‌کند، تبادل کلید پساکوانتومی ترکیبی را فعال کنید و هزینهٔ عملکرد را بسنجید.',
            'کلیدهای امضا و خطوط امضای کد را به مسیرهایی منتقل کنید که قابل ارتقا باشند.',
            'از فروشندگان نقشهٔ راه را مکتوب بخواهید و چابکی رمزنگاری را در قرارداد بگنجانید.',
            'بازگشت را تمرین کنید: کلیدی را بچرخانید، الگوریتمی را عوض کنید و بررسی کنید دادهٔ قدیمی هنوز باز می‌شود.'
          ]
        ),
        p(
          'None of this requires a quantum computer in the lab. It requires the same discipline as any other dependency migration, applied to the part of the system where mistakes are least visible. The teams that treat cryptography as infrastructure rather than magic will find the transition boring. That is exactly the goal.',
          'هیچ‌کدام از این‌ها به کامپیوتر کوانتومی در آزمایشگاه نیاز ندارد. به همان نظمی نیاز دارد که هر مهاجرت وابستگی دیگری، اعمال‌شده به بخشی از سیستم که خطاها کمترین دیده‌شدن را دارند. تیم‌هایی که رمزنگاری را زیرساخت می‌بینند نه جادو، گذار را خسته‌کننده خواهند یافت. هدف دقیقاً همین است.'
        )
      ]
    },
    {
      slug: 'agent-infrastructure',
      category: 'ai',
      author: 'editorial',
      date: '2026-10-22',
      trending: 4,
      cover: 'assets/covers/ai-agents.svg',
      readMins: { en: 7, fa: 6 },
      title: {
        en: 'Agents at work: the unglamorous infrastructure that decides who wins',
        fa: 'عامل‌های هوشمند در محل کار: زیرساخت‌های بی‌زرق‌وبرقی که برنده را تعیین می‌کنند'
      },
      dek: {
        en: 'The demo is a model that books a flight. The product is permissions, retries, audit logs, cost controls, and a human who can say no.',
        fa: 'نمایش، مدلی است که پرواز رزرو می‌کند. محصول، مجوزها، تلاش دوباره، گزارش حسابرسی، کنترل هزینه و انسانی است که می‌تواند «نه» بگوید.'
      },
      tags: [
        { en: 'AI agents', fa: 'عامل‌های هوش مصنوعی' },
        { en: 'Platform engineering', fa: 'مهندسی پلتفرم' },
        { en: 'Reliability', fa: 'قابلیت اطمینان' }
      ],
      takeaways: {
        en: [
          'Agent reliability is an infrastructure problem more than a model problem.',
          'Give every agent an identity, a scoped credential, and a complete audit trail.',
          'Design approval gates for irreversible actions instead of hoping the model behaves.'
        ],
        fa: [
          'قابلیت اطمینان عامل‌ها بیشتر یک مسئلهٔ زیرساختی است تا مسئلهٔ مدل.',
          'به هر عامل یک هویت، یک اعتبارنامهٔ محدود و یک ردپای حسابرسی کامل بدهید.',
          'برای اقدام‌های بازگشت‌ناپذیر دروازهٔ تأیید طراحی کنید، نه اینکه امیدوار باشید مدل درست رفتار می‌کند.'
        ]
      },
      body: [
        p(
          'An agent demo is easy to love. You type a goal, the model decomposes it, calls a few tools, and returns a result. The audience applauds. Then the agent reaches production, where it meets rate limits, expired credentials, ambiguous instructions, partial failures, and a finance team that wants to know why the API bill tripled. The gap between the demo and the deployment is almost entirely infrastructure.',
          'نمایش یک عامل آسان است دوست داشته شود. هدفی تایپ می‌کنید، مدل آن را تجزیه می‌کند، چند ابزار را صدا می‌زند و نتیجه را برمی‌گرداند. تماشاگران تشویق می‌کنند. بعد عامل به محیط عملیاتی می‌رسد، جایی که با محدودیت نرخ، اعتبارنامه‌های منقضی، دستورهای مبهم، شکست‌های جزئی و تیم مالی‌ای روبه‌رو می‌شود که می‌خواهد بداند چرا صورتحساب API سه‌برابر شده. شکاف میان نمایش و استقرار تقریباً کاملاً زیرساختی است.'
        ),
        p(
          'The first missing piece is identity. A person has an account, a role, and a history. Too many agents still run as a shared service key with broad access, which makes every action indistinguishable and every breach catastrophic. An agent should have its own identity, scoped to the minimum permissions it needs, with credentials that rotate and expire. That single change turns “what happened?” from an investigation into a query.',
          'اولین قطعهٔ گمشده هویت است. یک انسان حساب، نقش و تاریخچه دارد. بسیاری از عامل‌ها هنوز با یک کلید سرویس مشترک با دسترسی گسترده اجرا می‌شوند، که هر اقدام را غیرقابل‌تشخیص و هر نفوذ را فاجعه‌بار می‌کند. عامل باید هویت خودش را داشته باشد، محدود به کمترین مجوزهای لازم، با اعتبارنامه‌هایی که می‌چرخند و منقضی می‌شوند. همین تغییر واحد، «چه اتفاقی افتاد؟» را از یک تحقیق به یک پرس‌وجو تبدیل می‌کند.'
        ),
        h(
          'The three gates',
          'سه دروازه'
        ),
        ul(
          [
            'A permission gate: the agent can only call tools that its role allows, with parameters validated at the boundary.',
            'An approval gate: irreversible actions wait for a human, and the human sees exactly what will change.',
            'A budget gate: every run has a token and tool-call ceiling, and the ceiling is enforced outside the model.'
          ],
          [
            'دروازهٔ مجوز: عامل فقط می‌تواند ابزارهایی را صدا بزند که نقشش اجازه می‌دهد، با پارامترهایی که در مرز اعتبارسنجی می‌شوند.',
            'دروازهٔ تأیید: اقدام‌های بازگشت‌ناپذیر منتظر انسان می‌مانند و انسان دقیقاً می‌بیند چه چیزی تغییر خواهد کرد.',
            'دروازهٔ بودجه: هر اجرا سقف توکن و فراخوانی ابزار دارد و سقف بیرون از مدل اعمال می‌شود.'
          ]
        ),
        q(
          'A model that can do anything is a security incident waiting for a reason. A model that can do exactly one thing well is a product.',
          'مدلی که هر کاری می‌تواند بکند، یک حادثهٔ امنیتی است که منتظر دلیل است. مدلی که دقیقاً یک کار را خوب انجام می‌دهد، یک محصول است.',
          'NoxaPlus Editorial',
          'تحریریهٔ نواپلاس'
        ),
        p(
          'Reliability is the next layer. Agents fail in ways traditional software does not: they loop, hallucinate tool arguments, misread a successful response as an error, or quietly give up. The system around them needs idempotency keys, bounded retries with backoff, dead-letter queues, and a way to resume a run without repeating side effects. None of these are new ideas. They are the ideas that made payment systems and message queues reliable, applied to a new kind of caller.',
          'قابلیت اطمینان لایهٔ بعدی است. عامل‌ها به روش‌هایی شکست می‌خورند که نرم‌افزار سنتی نمی‌خورد: در حلقه می‌افتند، آرگومان ابزار را توهم می‌کنند، پاسخ موفق را اشتباه به‌عنوان خطا می‌خوانند یا بی‌صدا تسلیم می‌شوند. سیستم اطرافشان به کلیدهای idempotency، تلاش دوبارهٔ محدود با فاصله‌گذاری، صف نامه‌های مرده و راهی برای ادامهٔ اجرا بدون تکرار عوارض جانبی نیاز دارد. هیچ‌کدام ایدهٔ جدیدی نیستند. همان ایده‌هایی هستند که سیستم‌های پرداخت و صف پیام را قابل‌اعتماد کردند، اعمال‌شده به نوع جدیدی از فراخواننده.'
        ),
        p(
          'The last layer is observable behavior. A production agent should emit structured events: what it intended, which tools it called, what it received, how much it spent, and where a human intervened. Those events are how teams debug, how auditors verify, and how product managers decide which capabilities are worth keeping. The winning agent platforms of the next year will not be the ones with the most impressive demo. They will be the ones whose failures are easiest to see and cheapest to reverse.',
          'لایهٔ آخر رفتار قابل‌مشاهده است. یک عامل عملیاتی باید رویدادهای ساخت‌یافته منتشر کند: چه قصدی داشت، کدام ابزارها را صدا زد، چه دریافت کرد، چقدر خرج کرد و کجا انسان دخالت کرد. این رویدادها ابزار اشکال‌زدایی تیم‌ها، راستی‌آزمایی حسابرسان و تصمیم مدیران محصول دربارهٔ اینکه کدام قابلیت ارزش نگه داشتن دارد هستند. پلتفرم‌های عامل برندهٔ سال آینده آن‌هایی نیستند که چشمگیرترین نمایش را دارند. آن‌هایی هستند که شکست‌هایشان آسان‌ترین دیده‌شدن و ارزان‌ترین بازگشت را دارند.'
        )
      ]
    },
    {
      slug: 'boring-stack-return',
      category: 'software',
      author: 'editorial',
      date: '2026-10-20',
      trending: 0,
      cover: 'assets/covers/software-boring.svg',
      readMins: { en: 6, fa: 5 },
      title: {
        en: 'The return of the boring stack',
        fa: 'بازگشت پشتهٔ خسته‌کننده'
      },
      dek: {
        en: 'Postgres, server-rendered HTML, a queue, and a monolith are not a compromise anymore. They are a competitive advantage in a world where code is cheap to generate and expensive to understand.',
        fa: 'Postgres، HTML رندرشده در سرور، یک صف و یک مونولیت دیگر سازش نیستند. در دنیایی که تولید کد ارزان و فهمیدن آن گران است، این‌ها مزیت رقابتی‌اند.'
      },
      tags: [
        { en: 'Architecture', fa: 'معماری' },
        { en: 'Developer experience', fa: 'تجربهٔ توسعه‌دهنده' },
        { en: 'Simplicity', fa: 'سادگی' }
      ],
      takeaways: {
        en: [
          'When code generation gets cheap, review and comprehension become the constraint.',
          'A smaller set of well-understood components lowers operational and onboarding costs.',
          'Boring does not mean stagnant: Postgres, HTTP, and queues keep absorbing new capabilities.'
        ],
        fa: [
          'وقتی تولید کد ارزان می‌شود، بازبینی و فهمیدن گلوگاه می‌شوند.',
          'مجموعهٔ کوچک‌تری از اجزای خوب‌فهم، هزینهٔ عملیات و آموزش را کم می‌کند.',
          'خسته‌کننده یعنی راکد نه: Postgres، HTTP و صف‌ها همچنان قابلیت‌های تازه را جذب می‌کنند.'
        ]
      },
      body: [
        p(
          'For a while, the default advice for a new product was to assemble a constellation: a separate frontend, a GraphQL gateway, three microservices, a message bus, a search cluster, and a cache tier. Each piece was defensible on its own. Together they created a system that only the people who built it could operate, and only on a good day. The reaction now underway is not anti-technology. It is pro-comprehension.',
          'مدتی، توصیهٔ پیش‌فرض برای یک محصول جدید مونتاژ یک صورت‌فلکی بود: فرانت‌اند جدا، دروازهٔ GraphQL، سه میکروسرویس، یک گذرگاه پیام، یک خوشهٔ جست‌وجو و یک لایهٔ کش. هر قطعه به‌تنهایی قابل دفاع بود. با هم سیستمی ساختند که فقط سازندگانش می‌توانستند اداره کنند، آن هم در روزهای خوب. واکنشی که اکنون در جریان است ضد فناوری نیست. طرفدار فهمیدن است.'
        ),
        p(
          'The boring stack looks unremarkable: a relational database, a server that renders HTML, a background queue, and a single deployable application. It is unremarkable in the same way a good foundation is. It gives a small team one place to look when something breaks, one transaction boundary, one set of logs, and one deployment story. The constraints are real, but they are visible constraints — the kind you can design around instead of discovering at 3 a.m.',
          'پشتهٔ خسته‌کننده بی‌اهمیت به نظر می‌رسد: یک پایگاه‌دادهٔ رابطه‌ای، سروری که HTML رندر می‌کند، یک صف پس‌زمینه و یک برنامهٔ قابل استقرار واحد. بی‌اهمیت است همان‌طور که یک فونداسیون خوب بی‌اهمیت است. به تیم کوچک یک جا برای نگاه کردن هنگام خرابی می‌دهد، یک مرز تراکنش، یک مجموعه لاگ و یک داستان استقرار. محدودیت‌ها واقعی‌اند، اما محدودیت‌های قابل‌مشاهده‌اند — از آن نوعی که می‌توان دورشان طراحی کرد نه اینکه ساعت سه بامداد کشفشان کرد.'
        ),
        h(
          'Why now',
          'چرا حالا'
        ),
        p(
          'Two forces are pushing teams back toward simplicity. The first is AI-assisted coding. Generating a service is now cheap; reviewing, securing, and operating it is not. When the volume of code rises, the cost of understanding becomes the dominant cost. The second is the maturity of the boring components themselves. Postgres handles JSON, full-text search, queues, and vector indexes well enough for a surprising range of products. A single server can handle more traffic than most teams will ever see.',
          'دو نیرو تیم‌ها را به سمت سادگی برمی‌گردانند. اولی کدنویسی به کمک هوش مصنوعی است. تولید یک سرویس اکنون ارزان است؛ بازبینی، ایمن‌سازی و ادارهٔ آن نیست. وقتی حجم کد بالا می‌رود، هزینهٔ فهمیدن هزینهٔ غالب می‌شود. دومی بلوغ خود اجزای خسته‌کننده است. Postgres به‌اندازهٔ کافی برای طیف غافلگیرکننده‌ای از محصولات، JSON، جست‌وجوی متن کامل، صف‌ها و نمایه‌های برداری را مدیریت می‌کند. یک سرور می‌تواند ترافیک بیشتری از آنچه بیشتر تیم‌ها می‌بینند را تحمل کند.'
        ),
        q(
          'Complexity is a loan. You get capability today and pay interest in every future incident.',
          'پیچیدگی یک وام است. امروز قابلیت می‌گیرید و بهره‌اش را در هر حادثهٔ آینده می‌پردازید.',
          'NoxaPlus Editorial',
          'تحریریهٔ نواپلاس'
        ),
        p(
          'This is not an argument against scale. Companies with genuinely different workloads will still need specialized systems, and a monolith can become a bottleneck if it is never allowed to evolve. The point is sequencing. Earn the complexity. Split a service when a measurable constraint demands it, not because a conference talk made a diagram look elegant. The best architecture is the one your team can still explain after a long weekend.',
          'این استدلالی علیه مقیاس نیست. شرکت‌هایی با بارهای کاری واقعاً متفاوت همچنان به سیستم‌های تخصصی نیاز دارند و یک مونولیت اگر اجازهٔ تکامل نیابد می‌تواند گلوگاه شود. نکته ترتیب است. پیچیدگی را استحقاق پیدا کنید. زمانی سرویسی را جدا کنید که محدودیتی قابل‌اندازه‌گیری آن را طلب کند، نه چون یک سخنرانی کنفرانسی نمودار را زیبا نشان داده. بهترین معماری همان است که تیم شما بعد از یک آخر هفتهٔ طولانی هنوز می‌تواند توضیحش دهد.'
        ),
        p(
          'The boring stack will not win awards. It will ship, stay up, and be handed over to the next developer without a three-week archaeology project. In an industry that loves novelty, that is a remarkably durable advantage.',
          'پشتهٔ خسته‌کننده جایزه نمی‌برد. عرضه می‌شود، بالا می‌ماند و بدون یک پروژهٔ باستان‌شناسی سه‌هفته‌ای به توسعه‌دهندهٔ بعدی تحویل داده می‌شود. در صناعتی که عاشق تازگی است، این مزیتی به‌طرز قابل‌توجهی ماندگار است.'
        )
      ]
    },
    {
      slug: 'satellite-messaging-roaming',
      category: 'mobile',
      author: 'studio',
      date: '2026-10-17',
      trending: 0,
      cover: 'assets/covers/mobile-satellite.svg',
      readMins: { en: 6, fa: 5 },
      title: {
        en: 'Satellite messaging is quietly becoming the new roaming',
        fa: 'پیام‌رسانی ماهواره‌ای آرام‌آرام جای رومینگ را می‌گیرد'
      },
      dek: {
        en: 'Direct-to-cell coverage is moving from emergency novelty to everyday expectation. The technology is impressive; the business model and the spectrum rules are the hard parts.',
        fa: 'پوشش مستقیم به گوشی از یک ویژگی اضطراری به انتظار روزمره تبدیل می‌شود. فناوری چشمگیر است؛ مدل کسب‌وکار و قواعد طیف بخش‌های سخت‌اند.'
      },
      tags: [
        { en: 'Satellite', fa: 'ماهواره' },
        { en: 'Connectivity', fa: 'اتصال' },
        { en: 'Telecom', fa: 'مخابرات' }
      ],
      takeaways: {
        en: [
          'Direct-to-cell turns the phone in your pocket into a satellite terminal, with no extra hardware.',
          'Capacity is limited, so the first products will be messaging and low-bandwidth data, not video.',
          'Coverage claims need clear maps: outdoor sky view, message delay, and supported devices matter.'
        ],
        fa: [
          'فناوری مستقیم به گوشی، گوشی جیب شما را بدون سخت‌افزار اضافه به یک پایانهٔ ماهواره‌ای تبدیل می‌کند.',
          'ظرفیت محدود است، پس محصولات اول پیام و دادهٔ کم‌پهنا خواهند بود، نه ویدیو.',
          'ادعاهای پوشش به نقشهٔ شفاف نیاز دارند: دید آسمان در فضای باز، تأخیر پیام و دستگاه‌های پشتیبانی‌شده مهم‌اند.'
        ]
      },
      body: [
        p(
          'The first time a phone connects to a satellite, it feels like a magic trick. There is no dish, no external antenna, no special app. You point the phone at the sky, wait a little longer than usual, and a message leaves. For most of the history of mobile networks, that was impossible: the link budget was too tight, the satellites were too far, and the handset antennas were too small. New constellations and new radio techniques have made the impossible merely inconvenient.',
          'اولین باری که گوشی به ماهواره وصل می‌شود، مثل یک شعبده بازی حس می‌شود. بشقاب نیست، آنتن بیرونی نیست، اپلیکیشن خاصی نیست. گوشی را به آسمان می‌گیرید، کمی بیشتر از معمول صبر می‌کنید و پیامی می‌رود. در بیشتر تاریخ شبکه‌های موبایل این غیرممکن بود: بودجهٔ لینک خیلی تنگ بود، ماهواره‌ها خیلی دور بودند و آنتن‌های گوشی خیلی کوچک. صورت‌فلکی‌های جدید و تکنیک‌های رادیویی تازه، غیرممکن را فقط ناخوشایند کرده‌اند.'
        ),
        p(
          'The early products are deliberately modest: emergency texts, location sharing, and short status messages. That is not a lack of ambition; it is physics. A satellite covering a large cell has limited capacity, and a smartphone transmitter is weak. Video calls and unlimited browsing are not around the corner. The realistic near-term promise is continuity — the network does not disappear completely when you leave the city.',
          'محصولات اولیه عمداً فروتن‌اند: پیام‌های اضطراری، اشتراک موقعیت و پیام‌های وضعیت کوتاه. این کمبود جاه‌طلبی نیست؛ فیزیک است. ماهواره‌ای که یک سلول بزرگ را پوشش می‌دهد ظرفیت محدودی دارد و فرستندهٔ گوشی ضعیف است. تماس ویدیویی و مرور نامحدود در راه نیستند. وعدهٔ واقع‌بینانهٔ نزدیک، تداوم است — شبکه وقتی شهر را ترک می‌کنید کاملاً ناپدید نمی‌شود.'
        ),
        h(
          'The roaming analogy',
          'قیاس رومینگ'
        ),
        p(
          'The industry keeps reaching for the roaming analogy, and it is a useful one. When you travel, your phone joins a partner network and the bill follows you. Satellite messaging wants the same seamlessness: one number, one identity, one bill, with coverage that extends beyond terrestrial towers. That requires agreements between mobile operators and satellite providers, consistent authentication, and clear pricing. The technology is only one line in the contract.',
          'صنعت مدام به قیاس رومینگ می‌رسد و قیاس مفیدی است. وقتی سفر می‌کنید، گوشی شما به شبکهٔ شریک می‌پیوندد و صورتحساب دنبالتان می‌آید. پیام‌رسانی ماهواره‌ای همین یکپارچگی را می‌خواهد: یک شماره، یک هویت، یک صورتحساب، با پوششی که فراتر از برج‌های زمینی می‌رود. این به توافق میان اپراتورهای موبایل و ارائه‌دهندگان ماهواره، احراز هویت سازگار و قیمت‌گذاری شفاف نیاز دارد. فناوری فقط یک خط از قرارداد است.'
        ),
        q(
          '“Coverage everywhere” is a marketing sentence. “A message gets out when you can see the sky” is an engineering promise.',
          '«پوشش همه‌جا» یک جملهٔ تبلیغاتی است. «وقتی آسمان را می‌بینید پیام خارج می‌شود» یک وعدهٔ مهندسی است.',
          'NoxaPlus Studio',
          'استودیو نواپلاس'
        ),
        h(
          'What to watch',
          'چه چیزی را دنبال کنیم'
        ),
        p(
          'Spectrum policy will shape the market as much as any launch. Satellite operators need permission to use terrestrial frequencies, and mobile operators need confidence that the service will not interfere with their own networks. Device support is another gate: a phone needs the right modem, antenna design, and software to participate. And pricing will decide whether satellite messaging is an emergency feature everyone has or a premium add-on most people ignore.',
          'سیاست طیف به اندازهٔ هر پرتابی بازار را شکل می‌دهد. اپراتورهای ماهواره به اجازهٔ استفاده از فرکانس‌های زمینی نیاز دارند و اپراتورهای موبایل به اطمینان از اینکه سرویس با شبکهٔ خودشان تداخل نمی‌کند. پشتیبانی دستگاه دروازهٔ دیگری است: گوشی به مودم، طراحی آنتن و نرم‌افزار درست نیاز دارد. و قیمت‌گذاری تعیین می‌کند پیام‌رسانی ماهواره‌ای ویژگی اضطراریِ همه باشد یا افزونهٔ گران‌قیمتی که بیشتر مردم نادیده می‌گیرند.'
        ),
        p(
          'The most likely future is not satellite replacing cellular. It is satellite filling the gaps — the mountain trail, the rural road, the disaster zone — and becoming invisible when terrestrial coverage is good. That is a genuinely useful outcome. It just does not make for a very dramatic advertisement.',
          'محتمل‌ترین آینده این نیست که ماهواره جای شبکهٔ سلولی را بگیرد. این است که ماهواره شکاف‌ها را پر کند — مسیر کوهستان، جادهٔ روستایی، منطقهٔ فاجعه — و وقتی پوشش زمینی خوب است نامرئی شود. این نتیجهٔ واقعاً مفیدی است. فقط تبلیغات چندان دراماتیکی نمی‌سازد.'
        )
      ]
    },
    {
      slug: 'lunar-software-harder',
      category: 'space',
      author: 'research',
      date: '2026-10-13',
      trending: 0,
      cover: 'assets/covers/space-lunar.svg',
      readMins: { en: 7, fa: 6 },
      title: {
        en: 'Why lunar software is harder than lunar hardware',
        fa: 'چرا نرم‌افزار ماه سخت‌تر از سخت‌افزار ماه است'
      },
      dek: {
        en: 'A lander can be tested in a vacuum chamber. Its software has to survive radiation, communication gaps, dust, and a two-second round trip that makes every remote fix feel like a negotiation.',
        fa: 'یک فرودگر را می‌توان در اتاق خلأ آزمایش کرد. نرم‌افزارش باید در برابر تابش، قطع ارتباط، گرد و غبار و رفت‌وبرگشت دوثانیه‌ای دوام بیاورد که هر تعمیر از راه دور را به یک مذاکره تبدیل می‌کند.'
      },
      tags: [
        { en: 'Lunar missions', fa: 'مأموریت‌های ماه' },
        { en: 'Embedded systems', fa: 'سیستم‌های نهفته' },
        { en: 'Autonomy', fa: 'خودمختاری' }
      ],
      takeaways: {
        en: [
          'Communication delay turns every recovery into an autonomous decision made by the spacecraft.',
          'Radiation, thermal cycling, and dust create failure modes that are hard to reproduce on Earth.',
          'Verification and fault management dominate the schedule, far more than feature code.'
        ],
        fa: [
          'تأخیر ارتباط هر بازیابی را به تصمیمی خودمختار تبدیل می‌کند که فضاپیما می‌گیرد.',
          'تابش، چرخهٔ حرارتی و گرد و غبار حالت‌های شکستی می‌سازند که بازتولیدشان روی زمین سخت است.',
          'راستی‌آزمایی و مدیریت خطا بر برنامه تسلط دارند، بسیار بیشتر از کد قابلیت‌ها.'
        ]
      },
      body: [
        p(
          'Space hardware gets the glamour. Engines, solar arrays, landing legs, and a camera pointed at the Earth make for a good photo. But ask anyone who has shipped a lunar mission and the conversation turns to software: the state machine that has to land a vehicle on a surface no one has touched, with a communication link that is slow, intermittent, and sometimes absent.',
          'سخت‌افزار فضایی جذابیت را می‌برد. موتورها، آرایه‌های خورشیدی، پایه‌های فرود و دوربینی که به زمین نشانه رفته، عکس خوبی می‌سازند. اما از هر کسی که مأموریت ماه را عرضه کرده بپرسید، گفت‌وگو به نرم‌افزار می‌رسد: ماشین حالتی که باید وسیله‌ای را روی سطحی فرود آورد که هیچ‌کس لمسش نکرده، با لینک ارتباطی‌ای که کند، متناوب و گاهی غایب است.'
        ),
        p(
          'The round-trip light time to the Moon is about two and a half seconds. That sounds manageable until you remember that a landing burn is measured in milliseconds. By the time mission control sees a problem, the vehicle has already made several decisions. The software must therefore be a competent operator, not a remote-controlled puppet. It has to detect anomalies, choose a safe response, and explain itself later in telemetry that may arrive in fragments.',
          'زمان رفت‌وبرگشت نور تا ماه حدود دو و نیم ثانیه است. این قابل‌مدیریت به نظر می‌رسد تا وقتی یادتان بیاید که یک سوختن فرود با میلی‌ثانیه اندازه‌گیری می‌شود. وقتی مرکز کنترل مشکل را می‌بیند، وسیله قبلاً چندین تصمیم گرفته است. پس نرم‌افزار باید یک اپراتور شایسته باشد، نه عروسکِ کنترل از راه دور. باید ناهنجاری را تشخیص دهد، پاسخ امن انتخاب کند و بعداً خودش را در تله‌متری‌ای توضیح دهد که ممکن است تکه‌تکه برسد.'
        ),
        h(
          'The environment is a test-case generator',
          'محیط، یک تولیدکنندهٔ مورد آزمون است'
        ),
        p(
          'Radiation can flip a bit in memory. Thermal cycling can make a sensor report plausible nonsense. Lunar dust is abrasive, electrostatically charged, and hostile to mechanisms. A software team cannot simulate all of this perfectly, so it builds for detection and recovery: watchdogs, redundant state, checksums, safe modes, and a clear hierarchy of what to sacrifice first. The goal is not a system that never fails. It is a system that fails in a known direction.',
          'تابش می‌تواند بیتی در حافظه را برگرداند. چرخهٔ حرارتی می‌تواند باعث شود حسگر داده‌ای بی‌معنا اما باورپذیر گزارش کند. گرد و غبار ماه ساینده، باردار الکترواستاتیکی و دشمن مکانیزم‌هاست. تیم نرم‌افزار نمی‌تواند همهٔ این‌ها را بی‌نقص شبیه‌سازی کند، پس برای تشخیص و بازیابی می‌سازد: نگهبان‌ها، حالت افزونه، جمع کنترلی، حالت‌های امن و سلسله‌مراتب روشن از اینکه اول چه چیزی فدا شود. هدف سیستمی نیست که هرگز شکست نمی‌خورد. سیستمی است که در جهت معلومی شکست می‌خورد.'
        ),
        q(
          'On the Moon, the spacecraft is the last responder. The ground is a very slow advisor.',
          'روی ماه، فضاپیما آخرین امدادگر است. زمین یک مشاور بسیار کند است.',
          'NoxaPlus Research Desk',
          'میز پژوهش نواپلاس'
        ),
        p(
          'Verification is where the schedule goes. Every line of flight software needs a requirement, a test, and a reason to believe the test represents reality. Hardware-in-the-loop rigs, Monte Carlo simulations, and fault injection campaigns consume months. Teams that try to save time here usually spend it later in anomaly review, or lose the mission. The code that lands is often less complex than the code that proves it can land.',
          'راستی‌آزمایی همان جایی است که برنامه زمان‌بندی می‌رود. هر خط نرم‌افزار پرواز به یک نیاز، یک آزمون و دلیلی برای باور به اینکه آزمون واقعیت را نمایندگی می‌کند نیاز دارد. تجهیزات سخت‌افزار-در-حلقه، شبیه‌سازی مونت‌کارلو و کمپین‌های تزریق خطا ماه‌ها وقت می‌برند. تیم‌هایی که می‌خواهند اینجا وقت صرفه‌جویی کنند معمولاً بعداً آن را در بازبینی ناهنجاری خرج می‌کنند، یا مأموریت را از دست می‌دهند. کدی که فرود را انجام می‌دهد اغلب از کدی که اثبات می‌کند می‌تواند فرود بیاید، کمتر پیچیده است.'
        ),
        p(
          'The lesson generalizes beyond space. Any system that operates far from its operators, with delayed feedback and expensive failure, benefits from autonomy, observability, and a rehearsed safe mode. The Moon is simply the most demanding classroom. The software that survives it is not heroic. It is carefully boring, in the best sense of the word.',
          'درس فراتر از فضا می‌رود. هر سیستمی که دور از اپراتورهایش کار می‌کند، با بازخورد تأخیری و شکست گران، از خودمختاری، قابل‌مشاهده بودن و حالت امنِ تمرین‌شده سود می‌برد. ماه فقط سخت‌ترین کلاس درس است. نرم‌افزاری که در آن دوام می‌آورد قهرمانانه نیست. به بهترین معنای کلمه، با دقت خسته‌کننده است.'
        )
      ]
    },
    {
      slug: 'edge-silicon',
      category: 'hardware',
      author: 'research',
      date: '2026-10-09',
      trending: 0,
      cover: 'assets/covers/hardware-edge.svg',
      readMins: { en: 7, fa: 6 },
      title: {
        en: 'Edge silicon: the chip race moves off the cloud',
        fa: 'سیلیکون لبه: مسابقهٔ تراشه از ابر خارج می‌شود'
      },
      dek: {
        en: 'NPUs are becoming standard equipment, but the winners will be decided by memory bandwidth, thermal design, and whether developers can actually ship to the hardware.',
        fa: 'واحدهای پردازش عصبی به تجهیزات استاندارد تبدیل می‌شوند، اما برنده را پهنای باند حافظه، طراحی حرارتی و اینکه توسعه‌دهندگان واقعاً بتوانند برای سخت‌افزار عرضه کنند تعیین می‌کند.'
      },
      tags: [
        { en: 'NPU', fa: 'واحد پردازش عصبی' },
        { en: 'Edge computing', fa: 'رایانش لبه' },
        { en: 'Semiconductors', fa: 'نیمه‌هادی‌ها' }
      ],
      takeaways: {
        en: [
          'TOPS is a peak number; memory bandwidth and sustained thermals decide real performance.',
          'Fragmented toolchains are the biggest tax on edge AI developers.',
          'The winning platforms will make it easy to move a model from laptop to phone to embedded board.'
        ],
        fa: [
          'TOPS یک عدد اوج است؛ پهنای باند حافظه و حرارت پایدار عملکرد واقعی را تعیین می‌کنند.',
          'زنجیره‌های ابزار پراکنده بزرگ‌ترین مالیات بر توسعه‌دهندگان هوش مصنوعی لبه است.',
          'پلتفرم‌های برنده جابه‌جایی مدل از لپ‌تاپ به گوشی و برد نهفته را آسان می‌کنند.'
        ]
      },
      body: [
        p(
          'Every device launch now includes a slide with a neural processing unit and a large number followed by TOPS. The number is easy to market and hard to interpret. It describes a peak throughput under ideal conditions, for a particular data type, with a model that fits entirely in on-chip memory. Real workloads rarely match all three conditions at once.',
          'هر معرفی دستگاهی اکنون اسلایدی دارد با واحد پردازش عصبی و عدد بزرگی که بعد از آن TOPS آمده. عدد برای بازاریابی آسان و برای تفسیر سخت است. اوج گذردهی زیر شرایط ایده‌آل را توصیف می‌کند، برای یک نوع دادهٔ خاص، با مدلی که کاملاً در حافظهٔ روی تراشه جا می‌شود. بارهای کاری واقعی به‌ندرت هم‌زمان هر سه شرط را دارند.'
        ),
        p(
          'The first thing that breaks the illusion is memory. Neural networks stream weights and activations constantly; if the memory bus cannot feed the compute units, the expensive matrix engine sits idle. This is why two chips with the same TOPS can feel completely different in a photo editor or a live translator. The useful questions are about bandwidth, cache size, and how the software schedules data movement — not the headline peak.',
          'اولین چیزی که توهم را می‌شکند حافظه است. شبکه‌های عصبی مدام وزن‌ها و فعال‌سازی‌ها را جریان می‌دهند؛ اگر گذرگاه حافظه نتواند واحدهای محاسبه را تغذیه کند، موتور ماتریسی گران‌قیمت بیکار می‌ماند. به همین دلیل دو تراشه با TOPS یکسان می‌توانند در یک ویرایشگر عکس یا مترجم زنده کاملاً متفاوت حس شوند. پرسش‌های مفید دربارهٔ پهنای باند، اندازهٔ کش و نحوهٔ زمان‌بندی جابه‌جایی داده توسط نرم‌افزار است — نه اوج تیتروار.'
        ),
        h(
          'The toolchain tax',
          'مالیات زنجیرهٔ ابزار'
        ),
        p(
          'Hardware without developers is a benchmark, not a platform. Each vendor has its own compiler, quantization format, runtime, and set of supported operators. A model that runs beautifully on one laptop may need days of conversion for a phone, and may not run at all on an embedded board. This fragmentation is the largest hidden cost in edge AI, and it is where platform strategy matters more than raw silicon.',
          'سخت‌افزار بدون توسعه‌دهنده یک بنچمارک است، نه یک پلتفرم. هر فروشنده کامپایلر، قالب کوانتیزه‌سازی، runtime و مجموعهٔ عملگرهای پشتیبانی‌شدهٔ خودش را دارد. مدلی که روی یک لپ‌تاپ عالی اجرا می‌شود ممکن است برای گوشی به روزها تبدیل نیاز داشته باشد و روی یک برد نهفته اصلاً اجرا نشود. این پراکندگی بزرگ‌ترین هزینهٔ پنهان هوش مصنوعی لبه است و همان‌جایی است که استراتژی پلتفرم از سیلیکون خام مهم‌تر می‌شود.'
        ),
        q(
          'The best edge chip is the one a developer can actually target on a Tuesday afternoon.',
          'بهترین تراشهٔ لبه آن است که توسعه‌دهنده بتواند سه‌شنبه بعدازظهر واقعاً برایش برنامه بنویسد.',
          'NoxaPlus Research Desk',
          'میز پژوهش نواپلاس'
        ),
        p(
          'Thermals complete the picture. A thin laptop or a phone cannot dissipate unlimited heat, so the sustained clock is far below the peak. The software has to decide which parts of a workload run on the NPU, which on the GPU, and which on the CPU, then adapt as the device warms up. Good scheduling is invisible when it works and painfully obvious when it does not: the camera preview stutters, the fan spins up, the battery drains.',
          'حرارت تصویر را کامل می‌کند. یک لپ‌تاپ باریک یا گوشی نمی‌تواند گرمای نامحدود را دفع کند، پس فرکانس پایدار بسیار پایین‌تر از اوج است. نرم‌افزار باید تصمیم بگیرد کدام بخش بار کاری روی NPU، کدام روی GPU و کدام روی CPU اجرا شود، سپس با گرم شدن دستگاه سازگار شود. زمان‌بندی خوب وقتی کار می‌کند نامرئی است و وقتی نمی‌کند دردناک واضح: پیش‌نمایش دوربین لگ می‌کند، فن بالا می‌رود، باتری خالی می‌شود.'
        ),
        p(
          'The edge silicon race will not be won by the biggest number on a slide. It will be won by the vendor that gives developers a predictable path from a prototype to a shipped product, with honest performance data and a thermal budget that matches the device in someone’s hand. That is a less exciting story, but it is the one that ends up in stores.',
          'مسابقهٔ سیلیکون لبه با بزرگ‌ترین عدد روی اسلاید برده نمی‌شود. با فروشنده‌ای برده می‌شود که به توسعه‌دهندگان مسیری قابل‌پیش‌بینی از نمونهٔ اولیه تا محصول عرضه‌شده می‌دهد، با دادهٔ عملکرد صادقانه و بودجهٔ حرارتی‌ای که با دستگاه در دست کسی مطابقت دارد. این داستان هیجان‌انگیز کمتری است، اما همانی است که به فروشگاه می‌رسد.'
        )
      ]
    }
  ];

  window.NOXA_NEWS = {
    site: SITE,
    categories: CATEGORIES,
    authors: AUTHORS,
    articles: ARTICLES
  };
})();
