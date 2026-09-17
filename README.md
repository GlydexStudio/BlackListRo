🇷🇴 Romanian BlackList

Romanian BlackList este un proiect web construit cu o arhitectură front-end-first, Firebase și o structură de date pregătită pentru integrarea ulterioară cu o aplicație Android.

Proiectul poate fi dezvoltat și administrat exclusiv de pe Android, folosind Termux, Acode, Chrome și Firebase Console. Nu este necesar un PC pentru workflow-ul de dezvoltare de bază.

---

📱 Dezvoltare exclusiv de pe Android

Cerințe

- Telefon Android
- "Acode" (https://play.google.com/store/apps/details?id=com.foxdebug.acode)
- Termux
- Chrome
- Cont GitHub
- Cont Firebase

---

🚀 Instalarea proiectului în Termux

Actualizează pachetele și instalează dependențele necesare:

pkg update
pkg install git nodejs-lts python

Clonează repository-ul:

cd ~
git clone <URL_REPOSITORY> romanian-blacklist
cd romanian-blacklist

Instalează dependențele:

pnpm install

Dacă "pnpm" nu este disponibil:

npm install --global pnpm
pnpm install

---

📝 Deschiderea proiectului în Acode

În Acode:

Open folder → Internal storage → romanian-blacklist

Zone importante ale proiectului:

client/
components.json
js/
server/
shared/
firestore.rules
storage.rules
FIREBASE_STRUCTURE.md
MOBILE_DEVELOPMENT.md

UI-ul principal poate fi modificat în "client/", iar configurația Firebase și codul aferent se află în zonele dedicate ale proiectului.

---

🌐 Pornirea serverului local

Pentru versiunea React/Vite:

pnpm dev --host 0.0.0.0

În Chrome:

http://127.0.0.1:5173

Pentru un folder HTML simplu, fără build system:

python -m http.server 8080

Apoi:

http://127.0.0.1:8080

Pentru testare de pe un alt dispozitiv din aceeași rețea, află IP-ul telefonului:

ip addr

și accesează:

http://IP_TELEFON:PORT

---

📐 Testare responsive

Interfața trebuie verificată în special la:

- "360px"
- "375px"
- "390px"
- "412px"

Testează în Chrome și, atunci când este posibil, direct pe telefoane cu dimensiuni diferite.

Verifică în special:

- navigarea mobilă;
- meniurile;
- formularele;
- login/register;
- empty states;
- listele de meet-uri;
- profilurile;
- imaginile;
- butoanele;
- overflow-ul orizontal.

---

🔥 Configurarea Firebase

1. Crearea proiectului

Deschide:

https://console.firebase.google.com

Creează sau selectează proiectul Firebase.

Apoi:

Project settings → Your apps → Web app

Copiază configurația Web Firebase.

În versiunea Acode a proiectului, configurația trebuie introdusă în:

js/firebase-config.js

Configurația conține valori precum:

apiKey
authDomain
projectId
storageBucket
messagingSenderId
appId

⚠️ Securitate

Configurația Web Firebase nu este un secret în sine.

Protecția reală trebuie făcută prin:

- Firestore Security Rules;
- Storage Security Rules;
- Authentication;
- validarea server-side;
- controlul accesului admin.

Nu publica niciodată service account keys, parole sau alte credențiale private în frontend sau GitHub.

---

🔐 Authentication

În Firebase:

Build → Authentication → Get started → Sign-in method

Activează:

Email/Password

Dacă proiectul necesită, poate fi activat și:

Email link

Aplicația trebuie să suporte:

- Register
- Login
- Logout
- Password reset
- Email verification

---

🗄️ Firestore

În Firebase:

Build → Firestore Database → Create database

Folosește production mode.

După configurare, publică regulile din:

firestore.rules

Structura Firestore trebuie să respecte contractul de date de mai jos.

---

🗂️ Structura Firestore

Structura reprezintă contractul comun dintre website și viitoarea aplicație Android.

Toate datele sunt concepute pentru Firestore și pot fi utilizate atât prin Firebase Web SDK, cât și prin Android SDK.

Collections

Collection| Scop| Document ID| Acces implicit
"users"| Profil și control acces| "uid"| Public pentru câmpurile publice; scriere proprie
"garages"| Mașinile utilizatorilor| Auto ID| Public dacă "visibility == public"; scriere proprie
"meets"| Meet-uri și evenimente| Auto ID| Public dacă "visibility == public" și "status == published"
"meetParticipants"| Relația utilizator–meet| "${meetId}_${uid}"| Utilizatorul își poate gestiona participarea
"results"| Rezultate publice| Auto ID| Public read; admin write
"invitations"| Coduri individuale de acces| Auto ID| Admin read/write
"activity"| Activitate administrativă| Auto ID| Admin read/write

---

"users/{uid}"

uid: string
username: string
avatarUrl: string | null
rank: string
accessLevel: "safe" | "blacklist"
isAdmin: boolean
isSuspended: boolean
mainCarId: string | null
publicStats: {
  meetCount: number,
  buildCount: number,
  resultCount: number
}
createdAt: Timestamp
updatedAt: Timestamp

"email" nu este câmp public în profil și nu trebuie afișat în Community.

---

"garages/{garageId}"

ownerId: string
brand: string
model: string
year: number
engine: string
power: number | null
drive: string
modifications: string[]
images: string[]
description: string
visibility: "public" | "private"
createdAt: Timestamp
updatedAt: Timestamp

---

"meets/{meetId}"

title: string
description: string
coverImage: string | null
location: string
date: Timestamp
time: string
organizerId: string
visibility: "public" | "blacklist"
status: "draft" | "published" | "cancelled" | "completed"
participantsCount: number
carsCount: number
createdAt: Timestamp
updatedAt: Timestamp

---

"meetParticipants/{meetId}_{uid}"

Document ID:

${meetId}_${uid}

Această colecție reprezintă relația dintre un utilizator și un meet.

Utilizatorul trebuie să poată crea sau șterge propria participare, conform regulilor Firebase.

---

"results/{resultId}"

Rezultatele sunt date publice asociate meet-urilor.

Utilizatorii normali pot citi rezultatele, însă scrierea și modificarea acestora trebuie să fie limitate la administratori.

---

"invitations/{invitationId}"

code: string
email: string
accessLevel: "safe" | "blacklist"
status: "active" | "used" | "revoked" | "expired"
createdAt: Timestamp
expiresAt: Timestamp
usedAt: Timestamp | null
usedBy: string | null

Codurile de acces:

- sunt generate server-side sau printr-o tranzacție Firestore;
- nu sunt hardcodate;
- nu sunt păstrate într-o listă statică în frontend;
- trebuie verificate atomic.

La utilizarea unui cod trebuie verificat:

status
expiresAt
usedAt
usedBy

și actualizarea codului trebuie făcută atomic.

---

"activity/{activityId}"

Colecția este destinată activității administrative.

Accesul este limitat administratorilor:

admin read
admin write

---

🔒 Reguli de relaționare și acces

Regulile principale ale aplicației:

Users

users.uid == request.auth.uid

Utilizatorul își poate actualiza propriul profil.

Aceste câmpuri nu trebuie să poată fi modificate din client:

isAdmin
accessLevel

---

Garages

garages.ownerId == request.auth.uid

Doar proprietarul poate:

- crea;
- modifica;
- șterge.

Documentele publice pot fi citite atunci când:

visibility == "public"

---

Meets

Crearea și actualizarea trebuie să fie asociate organizatorului:

meets.organizerId == request.auth.uid

Operațiile administrative precum:

- publish;
- cancel;
- delete;

trebuie limitate la administratori.

---

Results

Utilizatorii normali:

read

Administratorii:

read + write

---

Invitations

Administratorii au acces la gestionarea codurilor.

Utilizarea unui cod trebuie să verifice:

status
expiresAt
usedAt

și să marcheze utilizarea atomic.

---

BlackList visibility

Un utilizator cu acces "safe" nu trebuie să poată citi documente:

visibility == "blacklist"

și nici date marcate ca private.

---

🖼️ Firebase Storage

În Firebase:

Build → Storage → Get started

Publică regulile din:

storage.rules

Imaginile trebuie:

- comprimate pentru conexiuni mobile;
- limitate ca dimensiune;
- validate înainte de upload;
- asociate utilizatorului autentificat.

---

🛡️ Security Rules

După configurare, publică:

firestore.rules
storage.rules

Testează regulile pentru cel puțin:

User Safe
User BlackList
User suspendat
Admin

Verifică în special că:

- utilizatorii nu își pot modifica "accessLevel";
- utilizatorii nu își pot acorda "isAdmin";
- utilizatorii nu pot accesa documente private;
- utilizatorii Safe nu pot accesa conținut BlackList;
- utilizatorii nu pot modifica datele altor utilizatori;
- codurile de invitație nu pot fi reutilizate.

Folosește Rules Playground pentru testare.

---

🏗️ Build

Pentru a genera versiunea de producție:

pnpm build

Într-un proiect Vite, rezultatul este de regulă:

dist/

Înainte de build verifică:

- login;
- register;
- formulare;
- Firebase;
- empty states;
- responsive layout;
- meniul mobil;
- Community;
- meet-uri;
- profiluri;
- încărcarea imaginilor.

---

🚀 Firebase Hosting

Instalează Firebase CLI:

npm install --global firebase-tools

Autentifică-te:

firebase login

Inițializează Hosting:

firebase init hosting

Selectează directorul de build, de regulă:

dist

Pentru aplicațiile SPA activează rewrite-ul către:

index.html

Deploy:

firebase deploy

Dacă Firebase CLI nu funcționează corespunzător în Termux, proiectul poate fi urcat pe GitHub și build/deploy-ul poate fi realizat prin GitHub Actions.

---

🐛 Depanare

Pentru development, păstrează log-uri clare.

Exemplu:

const log = (message, data) => {
  if (import.meta.env?.DEV) {
    console.log("[BlackList]", message, data ?? "");
  }
};

Nu ascunde erorile Firebase.

Erori comune:

auth/invalid-credential
permission-denied
failed-precondition

Identifică mai întâi:

1. configurația Firebase;
2. autentificarea;
3. Security Rules;
4. Firestore indexes;
5. query-ul care produce eroarea.

Pentru probleme Firestore, indexurile necesare pot fi sugerate direct de mesajul de eroare și trebuie create în Firebase Console.

---

🔄 Actualizarea proiectului

După modificări:

git pull
pnpm install
pnpm build
git add .
git commit -m "actualizare BlackList"
git push

Dacă folosești Firebase Hosting:

firebase deploy

---

📱 Workflow recomandat pe Android

Fluxul complet poate fi realizat direct de pe telefon:

Android
   │
   ├── Termux
   │     ├── Git
   │     ├── Node.js
   │     ├── pnpm
   │     └── Build
   │
   ├── Acode
   │     └── Editare cod
   │
   ├── Chrome
   │     ├── Testare website
   │     └── Firebase Console
   │
   └── GitHub
         └── Repository + version control

---

📚 Documentație

Fișiere importante ale proiectului:

README.md
FIREBASE_STRUCTURE.md
MOBILE_DEVELOPMENT.md
firestore.rules
storage.rules

"README.md" reprezintă ghidul principal.

Structura Firebase trebuie păstrată sincronizată cu website-ul și viitoarea aplicație Android.

---

⚠️ Security checklist

Înainte de publicarea proiectului:

- [ ] Firebase Authentication configurat
- [ ] Firestore în production mode
- [ ] "firestore.rules" publicate și testate
- [ ] "storage.rules" publicate și testate
- [ ] "isAdmin" protejat
- [ ] "accessLevel" protejat
- [ ] datele private protejate
- [ ] codurile de invitație validate atomic
- [ ] service account keys excluse din Git
- [ ] parolele și secretele excluse din Git
- [ ] upload-urile Storage limitate
- [ ] Firestore indexes configurate
- [ ] website testat pe mobil
- [ ] build-ul de producție testat

---

📄 License

Adaugă aici licența proiectului atunci când este stabilită.

---

Romanian BlackList — proiect dezvoltat mobile-first, cu Firebase și pregătit pentru integrarea Web + Android.
