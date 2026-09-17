# Romanian BlackList — Firebase structure

Acest document este contractul comun dintre website și viitoarea aplicație Android. Toate datele sunt concepute pentru Firestore și pot fi citite din Firebase Web SDK sau Android SDK fără transformări.

## Collections

| Collection | Scop | Document ID | Acces implicit |
|---|---|---|---|
| `users` | profil public și control acces | `uid` | public pentru câmpurile publice; scriere proprie |
| `garages` | mașinile utilizatorului | auto ID | public dacă `visibility == public`; scriere proprie |
| `meets` | meet-uri și evenimente | auto ID | public dacă `visibility == public` și `status == published` |
| `meetParticipants` | relația utilizator–meet | `${meetId}_${uid}` | utilizatorul poate crea/șterge propria participare |
| `results` | rezultate publice pentru meet-uri | auto ID | public read; admin write |
| `invitations` | coduri individuale de acces | auto ID | admin read/write; validarea este făcută prin tranzacție |
| `activity` | activitatea administrativă | auto ID | admin read; admin write |

## `users/{uid}`

```text
uid: string
username: string
avatarUrl: string | null
rank: string
accessLevel: "safe" | "blacklist"
isAdmin: boolean
isSuspended: boolean
mainCarId: string | null
publicStats: { meetCount: number, buildCount: number, resultCount: number }
createdAt: Timestamp
updatedAt: Timestamp
```

`email` nu este câmp public în profil și nu trebuie afișat în Community.

## `garages/{garageId}`

```text
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
```

## `meets/{meetId}`

```text
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
```

## `invitations/{invitationId}`

```text
code: string
email: string
accessLevel: "safe" | "blacklist"
status: "active" | "used" | "revoked" | "expired"
createdAt: Timestamp
expiresAt: Timestamp
usedAt: Timestamp | null
usedBy: string | null
```

Codurile sunt generate server-side sau printr-o tranzacție Firestore, nu sunt hardcodate și nu sunt incluse într-o listă din frontend.

## Reguli de relaționare

- `users.uid == request.auth.uid` pentru actualizarea propriului profil; `isAdmin` și `accessLevel` nu sunt modificabile din client.
- `garages.ownerId == request.auth.uid` pentru create/update/delete.
- `meets.organizerId == request.auth.uid` pentru create/update; operațiile de publish, cancel și delete sunt admin-only.
- `results` sunt read-only pentru utilizatorii normali și write-only pentru admin.
- `invitations` sunt write-only pentru admin; folosirea unui cod trebuie să verifice `status`, `expiresAt`, `usedAt` și să seteze `usedBy` atomic.
- Un utilizator Safe nu poate citi documente `visibility == "blacklist"` sau date private.

## Firebase setup

1. Creează un proiect Firebase.
2. Activează Authentication → Email/Password și Email link dacă este necesar.
3. Creează Firestore în production mode și publică regulile din `firestore.rules`.
4. Creează Storage și publică regulile din `storage.rules`.
5. Copiază obiectul de configurare Web în `js/firebase-config.js` din versiunea Android/Acode a proiectului.
6. Creează indexurile Firestore cerute de query-urile meet-urilor și rezultatelor.

Acest proiect WebDev este front-end-first și nu include credențiale Firebase. UI-ul folosește empty states până când config-ul este adăugat în aplicația de producție.

