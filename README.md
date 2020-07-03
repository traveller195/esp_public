# Vorwort

Diese Dokumentation ist im [Markdown-Format](https://de.wikipedia.org/wiki/Markdown) gesetzt, eine einfache 
Auszeichnungssprache, die mit vielen Tools direkt in ein formatiertes PDF-Dokument oder eine HTML-Seite gewandelt werden kann. 

Wenn Sie das Dokument in Visual Studio Code geöffnet haben, können Sie beispielsweise leicht eine formatierte Vorschau über die Befehlszeile des Editors aufrufen:

<kbd>SHIFT</kbd> + <kbd>STRG</kbd> + <kbd>V</kbd>


Viele Onlinedienste unterstützen dieses Format zur einfachen Eingabe von formatiertem Text.

Bei diesem Projekt-Template handelt es sich um das Skelett einer modernen ECMAScript 6-Anwendung (ES6). Die enthaltene
Demo dient ausschließlich als Ausgangspunkt Ihrer eigenen Entwicklung und soll die möglichen JavaScript-Features die zur
Anwendung kommen könnten verdeutlichen. Ziel ist es Einsteigern die JavaScript-Programmierung in einer komfortablen Arbeitsumgebung zu ermöglichen.

Im Folgenden sind die enthaltenen Dateien, Ordner, die vorkonfigurierten Tools und die eingerichteten Hilfsmittel kurz beschrieben. Detailinformationen können über die angefügten Links nachgelesen werden. Allgemein ist diese Dokumentation nur als Wegweiser zu verstehen - ein Selbststudium ist unerlässlich.

**Ergänzen Sie dieses Dokument um relevante Informationen zu der von Ihnen angelegten Projektstruktur, Skripten und um Zusatzinformationen zu der von Ihnen definierten Entwicklungsumgebung. Ergänzen Sie außerdem das Dokument `CONTRIBUTERS.md` um die Namen der an der Entwicklung beteiligten Kommilitonen.**

Beachten Sie auch das Dokument `GUIDE.md`, welches weiterführende Informationen zum Umgang mit dem Projekt-Template liefert.

# Ausführen der Demo

Dieses Projekt setzt die Installation einer aktuellen Version von `Node.js` voraus. Im Labor GI wurde die Installation 
bereits vorgenommen. Wenn Sie die folgenden Schritte an einem privaten Rechner durchführen möchten, stellen Sie sicher, 
dass eine [Node.js](https://nodejs.org/en/) Version `>=8.12` installiert ist.

## Installieren der Abhängigkeiten

`````bash
$ npm install
`````

## Starten des Development-Servers

`````bash
$ npm run-script start
`````

## Linten des Quellcodes

`````bash
$ npm run-script lint
`````

## Erstellen eines Production-Builds

`````bash
$ npm run-script build
`````
