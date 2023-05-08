# Der B.R.A.H.M.S. Explorer
[Der B.R.A.H.M.S. Explorer](https://github.com/somecho/brahms-explorer) ist ein durchsuchbarer Katalog für zeitgenössische Musik, der für MusikerInnen, Studierende, Lehrende und KonzertorganisatorInnen erstellt wurde. Er ermöglicht eine einfache Suche nach Stichwörtern für Stücke im zeitgenössischen Repertoire. Es ist dafür super geeignet, wenn man nach einem zeitgenössischen Stück für eine obskure Besetzung _(sagen wir mal ... [Viola und Tuba](https://brahmsexplorer.onrender.com/?keywords=viola%2Ctuba))_ sucht, das man als nächstes aufführen möchten. Probier es aml selbst aus [hier](https://brahmsexplorer.onrender.com/).

<div align="center">
<img src="https://raw.githubusercontent.com/somecho/brahms-explorer/master/assets/UI.png" width="720" />
<p><em>Benutzeroberfläche des B.R.A.H.M.S. Explorers</em></p>
</div>

#### Features
- Über 40.000 Stücke aus der [B.R.A.H.M.S.-Datenbank](https://brahms.ircam.fr/en/) des IRCAM gesammelt
- Einfache, leistungsstarke Suche nach Stichwörtern
- Sortierbare Ergebnisse
- Hinzufügen, Bearbeiten oder Löschen von Stücken für Administratorinnen und Administratoren
- Google OAuth zur Benutzerauthentifizierung
- Synchronisation mit der Datenbank des IRCAM

### Wofür ist das?
Die B.R.A.H.M.S.-Datenbank des IRCAM ist eine wertvolle Ressource, die große Mengen an Daten über zeitgenössische Stücke, KomponistInnen und sogar Ereignisse enthält. Als Interpret_in neuer Musik finde ich mich oft auf der Suche nach meinen nächsten Stücken in dieser Datenbank wieder. Die [Suchseite](https://brahms.ircam.fr/en/composers/search/) ist jedoch ein komplexes Formular zum Ausfüllen. Es verfügt über mehrere Suchfelder, einige für seltsam spezifische Details wie den musikalischen Assistenten oder ob das Stück im IRCAM geschrieben wurde. Die Suche nach Instrumentierung ist ebenfalls eher umständlich. Eine willkürliche Reihe von [Besetzungsgruppen](https://brahms.ircam.fr/en/works/genre/) wie "Non-standard mixed instrumental ensemble" oder "single wind orchestra" wird verwendet, um die Stücke zu kategorisieren.

<div align="center">
<img src="https://raw.githubusercontent.com/somecho/brahms-explorer/master/assets/ircam.png" width="480" />
<p><em>Suchseite des IRCAM</em></p>
</div>

Der B.R.A.H.M.S. Explorer löst das Problem, indem er einen super einfachen Suchmechanismus hat: Stichwörter. Einfach die Stichwörter eingeben, die man in seinem Suchergebnis haben will. Zusätzlich können Ergebnisse nach Titel, Vorname oder Nachname des KomponistInnen, Jahr und Untertitel sortiert werden. Dies war auf der Suchseite von IRCAM's B.R.A.H.M.S. nicht möglich.

### Die Daten
Wie bereits erwähnt, werden die Daten durch Scraping der B.R.A.H.M.S.-Datenbank Seite für Seite gesammelt. Dies geschieht mit [einer Flask-Anwendung](https://github.com/somecho/brahms-explorer/tree/master/sync), die jede Seite in der IRCAM-Datenbank abruft, prüft, ob es neue Stücke oder KomponistInnen gibt, und sie dann in einer auf [Planetscale](https://planetscale.com/) gehosteten MySQL-Datenbank speichert. [Eine Github-Aktion](https://github.com/somecho/brahms-explorer/blob/master/.github/workflows/sync.yaml) führt die Synchronisationsanwendung einmal pro Woche aus, um die Daten aktualisiert zu halten.

<div align="center">
<img src="https://raw.githubusercontent.com/somecho/brahms-explorer/master/assets/addpiece.PNG" width="480" />
<p><em>Dialog zum Hinzufügen eines Stücks</em></p>
</div>

Dieser Explorer ermöglicht es auch AdministratorInnen (ausgewählten BenutzerInnen, die von mir autorisiert wurden), Stücke manuell zur Datenbank hinzuzufügen, zu bearbeiten und zu löschen. Mit anderen Worten, diese Datenbank enthält zusätzliche Daten, die die B.R.A.H.M.S.-Datenbank von IRCAM ergänzen. Ein [Flask-Backend](https://github.com/somecho/brahms-explorer/tree/master/backend) wird verwendet, um Daten aus der MySQL-Datenbank bereitzustellen, die dann von [dem React-Frontend](https://github.com/somecho/brahms-explorer/tree/master/frontend) verbraucht werden.

### Ansatz
Ich habe diesen serverlosen Ansatz gewählt, weil ich mehr über Microservices lernen wollte. Abgesehen davon wollte ich das Free-Tier des PaaS-Anbieters [Render](https://render.com/) nutzen. Sowohl Front- als auch Backend sind auf Render gehostet, wobei das Frontend eine statische Website mit hoher Verfügbarkeit auf der ganzen Welt und das Backend ein kleiner Webservice ist. Durch diese modulare Architektur sind die Dienste nicht an einen Anbieter gebunden und bei Bedarf wäre eine Migration einfach. 
