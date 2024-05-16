# Véradás nyilvántartó rendszer <br />

A program egy véradásokkal kapcsolatos adminisztrációt segítő nyilvántartó rendszer. <br />

## Véradó pontok:
Adatok: id, intézmény neve, cím, fogadóképesség.<br />
Ugyan ezek adatok kilistázása, módosítása és törlése. <br />
Véradópontokhoz tartozó foglalások listázása, módosítása és törtlése. <br />

## Véradók: <br />

Adatok: id, név, nem, állampolgárság, születési hely, születési idő, lakcím, telefonszám, TAJ szám. <br />
Ugyan ezek adatok kilistázása, módosítása és törlése. <br />
Véradókhoz tartozó foglalások listázása, módosítása és törtlése. <br />

## TAJ szám ellenörzése: <br />

Egy 9 jegyű szám, a kilencedik számjegy egy ellenörző CDV kód. <br />
Képzési algoritmusa az alábbi: A TAJ szám első nyolc számjegyéből a páratlan helyen állókat hárommal, a páros helyen állókat héttel szorozzuk, és a szorzatokat összeadjuk.
Az összeget tízzel elosztva a maradékot tekintjük a kilencedik, azaz CDV kódnak. <br />
Amennyiben a TAJ szám formátuma nem megfelelő, hibaüzenet és az adatok nem mentődnek.<br />

## Véradások rögzítése: <br />
1. A véradás helyszínét, majd a véradó személyét kell kiválasztani.
2. Meg kell adni a véradás napját, ami alapértelmezetten az aktuális dátum.
3. Rögzíteni kell, hogy a jelölt alkalmas-e a véradásra. Amennyiben nem, el kell tárolni ennek okát is. Mindkét esetben tárolni kell továbbá a vizsgálatot elvégző orvos nevét.
4. Rögzíteni kell, hogy irányított véradás történik-e. Amennyiben igen, meg kell adni a beteg teljes nevét és TAJ számát is.


## Authentikáció: <br />

Ha nincs bejelentkezve a felhasználó, akkor csak a véradókat és a véradó pontokat tudja listáci, módosítani és törötlni nem tudja őket. <br />
Regisztráció: id, név, nem, állampolgárság, születési hely, születési idő, lakcím, telefonszám, TAJ szám, e-mail, jelszó <br />
Ha a felhasználó bejelentkezett akkor minden funkció elérhető, a regisztráció és bejelentkezés fül átvált kijelentkezésre. <br />
