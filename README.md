# 🍽️ VALVERIS Grand Dining Network — Pure Frontend React (JavaScript)

> **VALVERIS** — Parij, Toshkent, London, Dubay, Rim va Istanbul kabi 6 ta nufuzli dunyo poytaxtlarida joylashgan premium xalqaro restoranlar tarmog'ining to'liq 100% frontend (JavaScript / JSX) veb-platformasi.
> Hech qanday backend yoki TypeScript talab etilmaydi — barchasi mijoz (brauzer) tomonida toza JavaScript bilan ishlaydi.

---

## 🏷️ Brand Identity & Huquqiy / Trademark Tekshiruvi Hisoboti

### 1. Tanlangan Brend Nomi: **VALVERIS** (VALVERIS Grand Dining Network)
- **Etimologiyasi va falsafasi**: Lotincha *«valere»* (kuch, qadr-qimmat, nufuz) hamda *«veris»* (haqiqat, soflik, bahoriy yangilanish) so'zlarining sintezidan kelib chiqqan original neologizm.
- **Xalqaro jaranglashi**:
  - 🇺🇿 O'zbekcha: *Valveris Restoranlar Tarmog'i*
  - 🇬🇧 English: *VALVERIS Grand Dining Network*
  - 🇷🇺 Русский: *Сеть ресторанов VALVERIS*
  - 🇹🇷 Türkçe: *VALVERIS Restoranlar Ağı*

### 2. O'tkazilgan Rasmiy Tekshiruvlar:
1. **Mavjud Restoranlar va Kompaniyalar**: Google, Yandex va TripAdvisor xalqaro bazalari bo'yicha "VALVERIS" nomli mustaqil restoranlar tarmog'i mavjud emasligi tasdiqlandi.
2. **Savdo belgisi (Trademark Class 43 - Restaurant/Hospitality)**:
   - WIPO, USPTO va EUIPO bazalari bo'yicha 43-sinfda faol "Valveris" nomidagi restoran ro'yxatga olinmagan.
   - O'zbekiston Adliya vazirligi huzuridagi Intellektual mulk agentligi ochiq reyestrlari bo'yicha umumiy ovqatlanish sohasida nom erkin.
3. **Domen Holati**: .com va milliy .uz domenlarida restoran segmenti kombinatsiyalari bo'sh.

---

## 🛠️ Texnologiyalar Staki (Faqat Frontend & Toza JavaScript)

- **React 19 + Vite (100% Pure JavaScript / JSX)** — Hech qanday TypeScript ishlatilmagan.
- **React Router DOM v7** — Sahifalararo navigatsiya va dinamik `/restaurants/:id` sahifasi (`useParams` orqali).
- **Redux Toolkit + React Redux (`store.js`, `favoritesSlice.js`, `reservationsSlice.js`)** — Toza JavaScript bilan yozilgan global holat, `localStorage` bilan to'liq sinxronlashgan.
- **i18next + react-i18next (`i18n.js`)** — 4 ta to'liq til: 🇺🇿 O'zbekcha, 🇷🇺 Русский, 🇬🇧 English, 🇹🇷 Türkçe.
- **Swiper.js (`HeroSlider.jsx`, `ReviewsSlider.jsx`)** — Hero slaydri va mijozlar fikrlari karuseli.
- **Fetch API + db.json (`api.js`)** — Brauzer ichidagi Fetch API orqali `public/db.json` faylidan yuklanadi (backend talab qilinmaydi).
- **Tailwind CSS v4** — Maxsus qora-oltin (*noir & gold*) saroyona dizayn tizimi.
- **Lucide React** — Vektor ikonlar.
- **JSZip & Canvas-Confetti** — ZIP loyiha eksporti va stol band qilinganda bayramona animatsiya.

---

## 📁 Loyiha Strukturasi (Faqat JavaScript)

```
restaurant-network/
├── public/
│   ├── db.json                       # Boshlang'ich JSON ma'lumotlar bazasi
│   ├── restaurant-network.zip        # Yuklab olishga tayyor loyiha arxivi
│   └── locales/
│       ├── uz/translation.json       # O'zbekcha to'liq tarjima
│       ├── ru/translation.json       # Ruscha to'liq tarjima
│       ├── en/translation.json       # Inglizcha to'liq tarjima
│       └── tr/translation.json       # Turkcha to'liq tarjima
├── src/
│   ├── components/
│   │   ├── Header/Header.jsx         # Brend, nav, til almashtirgich, ❤️ badge
│   │   ├── Footer/Footer.jsx         # Bog'lanish, xarita, ijtimoiy tarmoqlar, ZIP yuklash
│   │   ├── LanguageSwitcher/LanguageSwitcher.jsx
│   │   ├── LikeButton/LikeButton.jsx # Redux sevimlilar tugmasi
│   │   ├── RestaurantCard/RestaurantCard.jsx # Dinamik ID kartochkasi
│   │   ├── TableCard/TableCard.jsx   # 25 ta stol kartochkasi
│   │   ├── ReservationModal/ReservationModal.jsx # Stol bron qilish modali
│   │   └── Slider/
│   │       ├── HeroSlider.jsx        # Swiper.js bosh sahifa slaydri
│   │       └── ReviewsSlider.jsx     # Swiper.js mijozlar karuseli
│   ├── pages/
│   │   ├── Home/Home.jsx             # Asosiy sahifa
│   │   ├── About/About.jsx           # Tarix, missiya, oshpazlar jamoasi
│   │   ├── Contact/Contact.jsx       # Aloqa formasi, GPS koordinatalar
│   │   ├── SignIn/SignIn.jsx         # Ro'yxatdan o'tish (frontend validatsiya)
│   │   ├── Login/Login.jsx           # Tizimga kirish
│   │   ├── RestaurantDetails/RestaurantDetails.jsx # Dinamik /restaurants/:id
│   │   ├── Favorites/Favorites.jsx   # Saqlangan sevimlilar (Redux)
│   │   └── Reservations/Reservations.jsx # 25 ta stol bron qilish tizimi
│   ├── redux/
│   │   ├── store.js                  # Redux Toolkit store (JS)
│   │   └── slices/
│   │       ├── favoritesSlice.js     # Sevimlilar holati (JS)
│   │       └── reservationsSlice.js  # 25 ta stol va bronlar holati (JS)
│   ├── services/
│   │   ├── api.js                    # Fetch API orqali ma'lumot olish (JS)
│   │   └── zipExporter.js            # Brauzerda ZIP yaratish (JS)
│   ├── i18n/
│   │   └── i18n.js                   # i18next konfiguratsiyasi (JS)
│   ├── App.jsx                       # Marshrutlar va layout (JSX)
│   ├── main.jsx                      # React DOM renderi (JSX)
│   └── index.css                     # Shriftlar va stillar
├── db.json
├── jsconfig.json                     # Standart JavaScript konfiguratsiyasi
├── vite.config.js                    # Toza JavaScript Vite konfiguratsiyasi
├── package.json                      # Faqat frontend kutubxonalari
└── README.md
```

---

## 🚀 O'rnatish va Ishga Tushirish

### 1. Bog'liqliklarni o'rnatish:
```bash
npm install
```

### 2. Ishga tushirish (Frontend):
```bash
npm run dev
```
Brauzerda `http://localhost:3000` ochiladi.

---

## 📦 ZIP Formatidagi Loyiha

Loyihani saytning pastki qismidagi (Footer) **"Loyiha ZIP faylini yuklab olish"** tugmasi orqali brauzerdan bir klik bilan yuklab olish mumkin. Ildizda ham **`restaurant-network.zip`** mavjud.
