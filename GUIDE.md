# Projektverzeichnis

Das Template enthält derzeit folgende Ordnerstruktur:

* `assets/`
* `src/`
* `.browserslistrc`
* `.editorconfig`
* `.eslintignore`
* `.eslintrc.json`
* `.gitignore`
* `.gitlab-ci.yml`
* `CONTRIBUTERS.md`
* `LICENSE`
* `package.json`
* `package-lock.json`
* `README.md`
* `webpack.config.js`

Dateien mit vorangestelltem Punkt werden durch die meisten Betriebssysteme als "unsichtbare" Dateien interpretiert. Im Kontext der (Web-)Entwicklung handelt es sich bei diesen Dateien zumeist um Konfigurationsdateien.

Das Verzeichnis `assets/` enthält statische Inhalte, die beim "Bauen" der Anwendung nicht weiterverarbeitet werden müssen. Der eigentliche Quellcode dieses Projekts ist im Verzeichnis `src/` hinterlegt.

Wenn Sie den Inhalt dieses Verzeichnisses einsehen, werden Sie feststellen, dass die einzelnen Programmbestandteile nicht in einer großen Datei gesammelt, sondern logisch in JavaScript-Module gegliedert sind. Außerdem wurden die Komponenten als JavaScript-Klassen definiert. Die Demo bedient sich dabei Sprachkonstrukten des ECMAScript 6 Standards, welcher wesentliche Verbesserungen bei der JavaScript-Entwicklung gebracht hat.

Leider wird diese Version der Programmiersprache noch immer nicht in allen Browsern unterstützt. Deshalb wird mit diesem Template eine Entwicklungsumgebung vorgestellt, die es Ihnen ermöglichen soll, diese modernen Sprachmittel einzusetzen. Ihnen stehen so zur Verfügung:

* Versionskontrolle via Git
* ein Paketmanagementsystem zum installieren von Tools & Bibliotheken
* ein lokal ausführbarer Entwicklungsserver
* eine automatisierte Prüfung der Quellcodequalität (Linter)
* eine minimal vorkonfigurierte Continuous-Integration-Umgebung (CI)
* ein Build-System, dass aus Ihrem modularen Quellcode einen optimierten "Build" zur Ausführung beim Endanwender erstellt

Die Grundlage der meisten dieser Komponenten ist die Nutzung von Node.js, das im folgenden Abschnitt näher beschrieben ist.

## Node.js (`package.json`)

Allgemein gesprochen ist Node.js eine JavaScript-Laufzeitumgebung. Sie basiert auf der im Google Chrome-Browser integrierten JavaScript-Engine V8 - der Komponente des Browsers, die die Ausführung von JavaScript erst möglich macht.

Zunächst war diese Entwicklung dazu gedacht, Programmierern zu ermöglichen JavaScript sowohl auf Client-, als auch auf Server-Seite einzusetzen. Mittlerweile bietet Node aber eine schier unerschöpfliche Anzahl an Tools, die auch jenseits der klassischen Webentwicklung eingesetzt werden können. Grundlage dessen ist zumeist das Kommandozeilentool `npm` - der Node Package Manager. NPM erlaubt das Installieren und Ausführen vieler Anwendungen, Bibliotheken und Module, die über ein [öffentliches Repository](https://www.npmjs.com) zur Verfügung gestellt werden.

````bash
$ npm --help
````

Der wichtigste Einstiegspunkt für jedes Node-Paket und damit auch für die Demo-Anwendung ist die Datei `package.json`. Es handelt sich hierbei um die zentrale Konfigurationsdatei die durch `npm` ausgewertet wird. Sie enthält grundlegende Metainformationen zum Projekt und listet Abhängigkeiten zu anderen Bibliotheken. Laufzeitabhängigkeiten die auch während der Ausführung der Anwendung zur Verfügung stehen müssen, können dem Schlüssel "dependencies" entnommen werden. Bibliotheken die nur zur Entwicklungszeit zur Verfügung stehen müssen, sind unter "devDependencies" aufgelistet.

Um nach dem Klonen eines Node-Projekts die notwendigen Abhängigkeiten zu installieren, ist der folgende Befehl im Projektverzeichnis notwendig:

````bash
$ npm install
````

`npm` wird die Datei `package.json` auswerten, Abhängigkeiten laden und im Verzeichnis `node_modules` speichern. Dieses Verzeichnis sollte also nicht händisch verändert werden.

Eine Besonderheit von NPM sollte beim Durchführen dieses Schrittes offensichtlich werden: Alle Projektabhängigkeiten werden lokal im Projektverzeichnis installiert. Es entsteht also eine abgeschlossene Entwicklungsumgebung und es sind keine Administrationsrechte auf dem Computer notwendig. Das kann die Arbeit mit vielen Projekten enorm erleichtern.

Ein genauer Blick in die mitgelieferte `package.json`-Datei offenbart außerdem, dass unter dem Schlüssel `scripts` bereits  Befehle definiert sind, die per `npm run-script` ausgeführt werden können:

* `start` startet einen Entwicklungsserver und lädt die Demo-Anwendung in Ihrem Browser.
* `build` erstellt eine optimierte und minifizierte Version der Demo-Anwendung.
* `lint` erlaubt das manuelle Durchführen einer statischen Analyse des Quellcodes, um Probleme frühzeitig aufzudecken.
* `test` ist das Standardkommando zum Ausführen von Testfällen. (Hinweis: In der aktuellen Version der Demo sind keine Testfälle definiert.)

Um die Demo-Anwendung zu starten, muss der folgende Befehl im Projektverzeichnis abgesetzt werden:

````bash
$ npm run-script start

> es-project-template@1.0.0 start /Users/Student/Developer/Projekte/project-template
> webpack-dev-server --open --mode development

ℹ ｢wds｣: Project is running at http://localhost:3000/
ℹ ｢wds｣: webpack output is served from /js/
ℹ ｢wds｣: Content not from webpack is served from /Users/Student/Developer/Projekte/project-template/dist
ℹ ｢wdm｣: wait until bundle finished: /js/bundle.js
ℹ ｢wdm｣: Hash: 703416af955dbe345345
Version: webpack 4.25.1
Time: 2028ms
Built at: 2018-11-16 11:52:37
````

Es sollte sich Ihr Standardbrowser öffnen und die Seite `http://localhost:3000/` aufgerufen werden. Änderungen im Verzeichnis `src/` werden durch den Entwicklungsserver registriert und führen zu einem Neuladen des Browser-Fensters.

* [Node.js-Projektseite](https://nodejs.org/en/)
* [Node.js-Dokumentation](https://nodejs.org/en/docs/)
* [NPM Repository](https://www.npmjs.com)
* [NPM Dokumentation](https://docs.npmjs.com)

## Module Bundler "Webpack" (`webpack.config.js`)

Nach dem Starten des Entwicklungsservers können Sie der Kommandozeilenausgabe bereits entnehmen, dass eine Komponente namens "Webpack" an diesem "Build"-Prozess beteiligt ist. Webpack wird als statischer Module Bundler bezeichnet. Es handelt sich um ein Tool, das beliebige Dateien sammelt, nach vorgegebenen Vorschriften verarbeitet und schließlich in beliebiger Form gebündelt ausgibt. Diese allgemein gehaltene Beschreibung lässt bereits erahnen, dass das Tool vielseitig einsetzbar ist. Selbst die Konfiguration kann dynamisch in Form von JavaScript-Dateien erfolgen (s. `webpack.config.js`). Durch eine große Anzahl unabhängig entwickelter Plugins, lässt sich der Webpack-Funktionsumfang jederzeit erweitern.

In diesem Projekt übernimmt der Bundler beim Ausführen des NPM-Skripts `start` folgende Schritte:

* Erstelle den temporären Ordner `dist/` im Projektverzeichnis.
* Leere den Ordner `dist/`.
* Kopiere alle statischen "Assets" in den Distributionsordner.
* Sammle ausgehend von der Datei `src/js/index.js` alle importierten JavaScript-Module der Anwendung und löse die dabei bestehenden Abhängigkeiten in eine eindeutige Reihenfolge auf.
* Übersetzt den ES6-Code in eine für die anvisierten Browser-Plattformen verständliche Syntax (derzeit zumeist ECMAScript 5.1) (umgesetzt durch das Webpack-Plugin `babel-loader`).
* Verpacke den JavaScript-Quellcode der Anwendung in eine Datei `dist/js/bundle.js`.
* Sammle alle CSS-Imports im JS-Quellcode (bspw. `import 'main.css'`) und kombiniere diese in eine Datei `dist/css/bundle.css`. (umgesetzt durch die Plugins `css-loader` und `MiniCssExtractPlugin`).
* Starte den Entwicklungsserver im Verzeichnis `dist/`.

Das "fertige" Bundle wird durch die Startseite `assets/index.html` der Webanwendung referenziert. Bei jeder Änderung des Quellcodes werden die erforderlichen Schritte wiederholt und die Anwendung im Browser neu geladen.

Soll schließlich eine Produktions-Version der Anwendung per Kommando `build` erstellt werden, entfällt das Starten des Entwicklungsservers. Zusätzlich wird der Quellcode per [Tree-Shaking-Methodik](https://webpack.js.org/guides/tree-shaking/) optimiert und [minifiziert](https://en.wikipedia.org/wiki/Minification_(programming)). Das Ergebnis ist eine statische Web-Anwendung die direkt auf einen Webserver kopiert werden könnte.

Der Übersetzungsvorgang, von „modernem“ JavaScript hin zu einer weithin unterstützten, älteren Sprachversion, wird im allgemeinen als "transpilieren" bezeichnet. Auch der Begriff "kompilieren" wird genutzt, auch wenn dieser aus technischer Sicht nicht vollkommen korrekt angewandt wird.

* [Webpack-Dokumentation](https://webpack.js.org/concepts/)
* [Übersicht zu Webpack-Plugins](https://webpack.js.org/plugins/)
* [Übersicht zu Webpack-Loadern](https://webpack.js.org/loaders/)

## JavaScript Transpiler Babel.js

Die Demo-Anwendung integriert in der gegebene Webpack-Pipeline das Tool [Babel](https://babeljs.io) für eben dieses „Transpilieren“. Der Funktionsumfang geht aber über das einfache  Übersetzen von ES6+-Code hin zu dem älteren JavaScript 5.1 weit hinaus:

Wie bereits festgestellt, unterstützen leider nicht alle Browser alle Sprach- und Darstellungsfunktionen die HTML5, ES6 und CSS 3.0 bieten. Oft stehen bestimmte Funktionen gar nicht, nicht im vollen Umfang oder nur in eingeschränkter Qualität zur Verfügung. Dieser Umstand führt insbesondere bei der Entwicklung großer Web-Anwendungen zu Problemen. Oft kann man diese Funktionen aber durch sogenannte ["Polyfills"](https://de.wikipedia.org/wiki/Polyfill) nachrüsten. Mit der Anwendung mitgelieferte Skripte testen dann die Ausführungsumgebung auf die Unterstützung eines Features und simulieren, wenn nötig die API einer neueren Sprachversion. Würde man aber bei diesem Verfahren alle denkbaren Plattformen berücksichtigen und jedes Feature per Polyfill "nachrüsten", würde dies wiederum zu unwahrscheinlich großen Anwendungen führen. Diese müssten zunächst an den Client übertragen, durch diesen interpretiert und schließlich ausgeführt werden - problematisch insbesondere für "schwache" oder per Netzwerk schlecht angebundene Clients.

Die Datei `.browserslistrc` wird deshalb dazu genutzt die Zielplattform der Anwendung genauer zu definieren. Das Tool Browserslist - welches wiederum in Babel integriert ist - nutzt diese Information, um über die Online-Datenbank [caniuse.com](https://caniuse.com) die voraussichtlichen Plattformen, die die Zielgruppe der Anwendung verwendet, abzuleiten. Tools die diese Möglichkeit nutzen, können so maßgeschneiderte und optimierte Anwendungspakete bauen, welche weniger Netzwerk- und Rechenressourcen zur Ausführung erfordern.

In der mitgelieferten Konfiguration wird eine 99-prozentige Abdeckung des deutschen Browser-Markts angestrebt. Allein diese Abdeckung führt zu einer überraschend großen Browser-Landschaft: [https://browserl.ist/](https://browserl.ist/?q=cover+99%25+in+DE)

* [Babel.js]([Babel](https://babeljs.io))
* [Babel.js-Dokumentation](https://babeljs.io/docs/en/)
* [Dokumentation Browserslist](https://github.com/browserslist/browserslist/)
* [Browserslist Testseite](https://browserl.ist/)

## Versionskontrolle (`.gitignore`)

Dieses Projekt-Template wird über die Versionskontrolle Git vertrieben. Um zu verhindern, dass beim Arbeiten mit Git versehentlich arbeitsplatzspezifische, temporäre oder gar geheime Dateien und Verzeichnisse im (öffentlichen) Repository
gespeichert werden, können diese in der Datei `.gitignore` aufgelistet werden.

Darüber hinaus sollten hier Dateien und Verzeichnisse aufgelistet werden, die automatisiert erstellt und jederzeit wiederhergestellt werden können. Als Beispiel wird das Verzeichnis `node_modules/` durch Git ignoriert, da die Abhängigkeiten auf jedem Arbeitsplatzrechner zuverlässig durch NPM installiert werden können. Auch das Verzeichnis `dist/` wird nicht eingecheckt. In diesem Verzeichnis wird die fertige Anwendung für die Auslieferung generiert. Auch dieser Schritt ist beliebig wiederholbar.

* [Dokumentation](https://git-scm.com/docs/gitignore/)
* [weitere Beispieldateien](https://github.com/github/gitignore)

## IDE/Editor-Konfiguration (`.editorconfig`)

EditorConfig erlaubt es über eine einfache Konfigurationsdatei im INI-Format, viele Editoren und IDEs zum einhalten
eines gemeinsamen [Programmierstils](https://de.wikipedia.org/wiki/Programmierstil) zu bewegen. Die wichtigsten Regeln
ihres Projekts können so explizit mit dem Quellcode an andere Bearbeiter übergeben werden.

Dies schützt sie insbesondere bei der Arbeit im Team, über verschiedene Entwicklungsumgebungen und Betriebssystemen
hinaus vor häufigen Fehler- und Frustrationsquellen. Beispielsweise kann so festgelegt werden:

* ob Tabstopps oder Leerzeichen für die Einrückung von Code-Zeilen genutzt werden sollen,
* in welchem Zeichensatz gespeichert wird
* oder welcher [Zeilenumbruch](https://de.wikipedia.org/wiki/Zeilenumbruch) zum Einsatz kommen soll.

Viele Editoren erkennen die Datei `.editorconfig` automatisch und übernehmen die Einstellungen aus der Datei für das
geöffnete Projekt. Für die Arbeit mit VS Code wurde das
[Plugin](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig) für Sie vorinstalliert das diese Funktion umsetzt.

* Dokumentation: https://editorconfig.org/

## Linter-Konfiguration (`.eslintignore`, `.eslintrc.json`)

Linter sind Programme die mögliche Fehler, stilistische Abweichungen und verdächtigen Quellcode aufspüren. Der Begriff
geht auf ein Tool zurück, das für die Programmiersprache C entwickelt wurde. Mittlerweile gibt es Linter für jede
Programmiersprache - so auch JavaScript. Gerade im Team erleichtert eine strikte Linter-Konfiguration die Arbeit, da
häufige Bagatelle, komplizierte Sprachkonstrukte und schwer auffindbare Fehler effektiv unterbunden werden. Dadurch führt die stringente Umsetzung eines definierten Programmierstils auch zu einem besser lesbaren und damit leichter zu wartenden Quellcode.

Im Projekt-Template ist das Linter Tool ESlint mit dem Airbnb-JavaScript-Stil vorkonfiguriert (siehe `.eslintrc.json`).
Die Datei `.eslintignore` hat eine ähnliche Funktion wie die zuvor beschriebene Datei `.gitignore`: Hier enthaltene
Dateien und Ordner werden durch den Linter ignoriert.

ESLint kann ebenfalls per NPM im Projekt installiert und ausgeführt werden. Für die Demo-Anwendung ist dies vorkonfiguriert und kann wie folgt getestet werden.

````
$ npm run-script lint
````

Im GI-Labor ist außerdem das ESLint-Plugin im Editor Visual Studio Code für Sie vorinstalliert. Dieses Plugin startet den Linting-Vorgang bei jeder Änderung und gibt direktes Feedback in der Oberfläche des Editors.

* [Dokumentation ESLint](https://eslint.org)
* [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)

## Continuous Integration (CI) (`.gitlab-ci.yml`)

In größeren Entwicklungsprojekten ist das Verfahren der "kontinuierlichen Integration" üblich. Gemeint ist dabei das
ständige automatisierte Kompilieren, Testen und Veröffentlichen des Softwareprodukts. Ausgeführt werden diese Schritte
bei jedem Einchecken von Änderungen in die zentrale Versionskontrolle. Üblicherweise werden auftretende Fehler oder
Verschlechterungen der Quellcodequalität dabei sofort an den Entwickler zurückgemeldet. Durch dieses ständige Feedback kann eine höhere Softwarequalität erreicht werden.

Der für die Fakultät zur Verfügung stehende GitLab-Server unterstützt diese Funktionen. Es können isolierte Laufzeitumgebungen (Docker-Container) gestartet werden, in denen beliebige Arbeitsschritte ausgeführt werden. Die konkret zum Einsatz kommende Laufzeitumgebung und die durchzuführenden Schritte sind in der Datei `.gitlab-ci.yml` beschrieben.

Nach jedem Einchecken einer Änderung auf dem GitLab-Server wird diese Datei erkannt, ausgelesen und es werden die darin
definierten Schritte abgearbeitet. Das Ergebnis eines solchen "Jobs" wird in der Benutzeroberfläche kenntlich gemacht
([Beispiel](https://kis5.geoinformation.htw-dresden.de/gitlab/gi/js-project-template/pipelines)).
Je nach GitLab-Projekteinstellungen kann das Einmischen von Änderung, die Probleme beim durchlaufen der CI-Pipeline
verursachen, unterbunden GUwerden.

Das Projekt-Template ist darauf vorkonfiguriert, bei einer Änderung des Quellcodes, auf stilistische Fehler zu
überprüft zu werden. Dafür startet der GitLab-Server jeweils einen isolierten "Job", in dem die Anwendung installiert und per Linter geprüft wird. Werden Probleme festgestellt, schlägt der CI-Job fehl.

* [GitLab CI](https://docs.gitlab.com/ee/ci/)
