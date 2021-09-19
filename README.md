# BusyDesk

## Identyfikacja zagadnienia biznesowego

### Cel projektu

Celem projektu jest umożliwienie jak najbardziej komfortowej i bezpiecznej pracy z biura. Pandemia COVID-19 sprawiła, że większą uwagę przywiązujemy do naszego bezpieczeństwa, a co za tym idzie bardziej dbamy o higienę jak i zachowujemy dystans społeczny. Obecna sytuacja sprawiła iż wiele firm zostało zmuszoncyh do przeorganizowania przestrzeni biurowej, zmniejszając liczbę dostępnych biurek. System ma za zadanie umożliwić rezerwację i koordynację użycia biurek przy ich ograniczonej ilości.

### Cele szczegółowe

-   wsparcie dla urządzeń mobilnych,
-   umożliwienie szybkiej rezerwacji w drodze do pracy,
-   kategoryzacja przestrzeni biurowej według jej przeznaczenia,
-   wykrywanie kolizji rezerwacji

## Wymagania

### Techniczne

-   aplikacja w architekturze klient-serwer,
-   moduł kliencki dostępny poprzez przeglądarkę WWW w postacji SPA,
-   komunikacja między serwerem, a klientem z wykorzystaniem RESTa,
-   skalowalna i prosta w utrzymaniu baza danych zapewniająca autentykacje

### Funkcjonale

-   możliwość utworzenia indywidualnego konta,
-   manualne dodawanie, usuwanie i modyfikowanie użytkowników,
-   manualne dodawanie, usuwanie i modyfikowanie biurek,
-   manualne dodawanie, usuwanie i modyfikowanie przestrzeni biurowej,
-   manualne dodawanie, usuwanie i modyfikowanie rezerwacji,
-   wyświetlanie historii transakcji,

## Harmonogram prac

-   [x] stworzenie bazy danych - 1h,
-   [x] stworzenie repozytoriów i podstawowych projektów - 1h,
-   [x] implementacja autentykacji - 3h,
-   [x] implementacja połączenia z bazą danych - 1h,
-   [x] stworzeniu REST API z CRUD dla modeli - 6h,
-   [x] implementacja logiki dla danych analitycznych - 8h,

## Struktura bazt danych

![DB DIAGRAM](/docs/db.png "DB DIAGRAM")

## Podsumowanie

Cel projektowy został osiągnięty. Została stworzona aplikacja pozwalająca na sprawne zarządzanie przestrzenią biurową. Nie napotkano trudności podczas realizacji.

### Kierunek rozwoju

Aplikacja umożliwia wiele kierunków rozwoju, wśród których warto wymienić:
-   integracja z Google umożliwiająca logowanie za pomocą służbowego konta,
-   umożliwienie zarezerwowania przestrzeni przez zespoły pracownicze,
-   integracja z kalendarzem celem łatwiejszego zarządzania aktualnie zajętymi biurkami,
-   implementacja listy oczekujących na zwolnienie się biurka.
