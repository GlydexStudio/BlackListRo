# Romanian BlackList — dezvoltare exclusiv de pe Android

Ghidul de mai jos presupune doar un telefon Android, Acode, Termux, Chrome și Firebase Console. Nu este necesar un PC.

## 1. Instalează proiectul în Termux

```bash
pkg update
pkg install git nodejs-lts python
cd ~
git clone <URL_REPOSITORY> romanian-blacklist
cd romanian-blacklist
pnpm install
```

Dacă `pnpm` nu există:

```bash
npm install --global pnpm
pnpm install
```

## 2. Deschide în Acode

În Acode: **Open folder → Internal storage → romanian-blacklist**. Editează fișierele din `client/src/` pentru UI și documentația din root pentru setup.

## 3. Pornește serverul local

Pentru versiunea React/WebDev:

```bash
pnpm dev --host 0.0.0.0
```

Pentru un folder HTML simplu, fără build:

```bash
python -m http.server 8080
```

## 4. Testează în Chrome

În Chrome deschide `http://127.0.0.1:5173` pentru Vite sau `http://127.0.0.1:8080` pentru serverul Python. Pentru testare pe alt dispozitiv din aceeași rețea, folosește IP-ul afișat de `ip addr` și portul serverului.

Verifică obligatoriu la 360 px, 375 px, 390 px și 412 px lățime în Chrome → **⋮ → Developer tools** doar dacă folosești un browser mobil care oferă emulare; altfel redimensionează fereastra sau testează fizic pe telefoane diferite.

## 5. Configurează Firebase din telefon

1. Deschide `https://console.firebase.google.com` în Chrome.
2. Creează sau selectează proiectul.
3. Project settings → Your apps → Web app → copiază config-ul.
4. În varianta Acode a proiectului, creează `js/firebase-config.js`.
5. Adaugă valorile `apiKey`, `authDomain`, `projectId`, `storageBucket`, `messagingSenderId`, `appId`.
6. Nu publica cheia privată sau service account-ul în frontend.

Config-ul Web Firebase nu este un secret în sine; Security Rules sunt protecția reală.

## 6. Configurează Firestore

Firebase Console → Build → Firestore Database → Create database → production mode. Publică regulile din `firestore.rules`. Creează collections conform `FIREBASE_STRUCTURE.md` și adaugă indexurile sugerate de erorile Firestore.

## 7. Configurează Authentication

Firebase Console → Build → Authentication → Get started → Sign-in method → activează Email/Password. În aplicație implementează register, login, logout, resetare parolă și `sendEmailVerification`.

## 8. Configurează Storage

Firebase Console → Build → Storage → Get started. Publică `storage.rules`. Păstrează imaginile comprimate pentru conexiuni mobile și limitează upload-ul la utilizatorul autentificat.

## 9. Configurează Security Rules

Copiază regulile din `firestore.rules` și `storage.rules` în Firebase Console. Testează cu Rules Playground pentru: user Safe, user BlackList, user suspendat și admin. Confirmă că `isAdmin` și `accessLevel` nu pot fi schimbate din client.

## 10. Deploy de pe Android

Pentru Firebase Hosting:

```bash
npm install --global firebase-tools
firebase login
firebase init hosting
firebase deploy
```

La init selectează directorul de build (de regulă `dist`) și activează SPA rewrite către `index.html`. Dacă Firebase CLI nu funcționează în Termux, urcă proiectul într-un repository GitHub și folosește GitHub Actions pentru build/deploy din browser.

## 11. Depanare Firebase în browser

Folosește Chrome → **⋮ → More tools → WebView/Console** dacă browserul oferă această opțiune. În cod, păstrează log-uri clare în development:

```js
const log = (message, data) => {
  if (import.meta.env?.DEV) console.log("[BlackList]", message, data ?? "");
};
```

Nu ascunde erorile Firebase. Notează codul (`auth/invalid-credential`, `permission-denied`, `failed-precondition`) și rezolvă întâi configurația sau regula indicată.

## 12. Actualizează website-ul

```bash
git pull
pnpm install
pnpm build
git add .
git commit -m "actualizare BlackList"
git push
```

Pentru Firebase Hosting, rulează apoi `firebase deploy`. Înainte de deploy testează home, formularele, stările fără date, meniul mobil și login-ul pe o copie locală.

