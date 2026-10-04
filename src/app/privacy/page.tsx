import PageLayout from '@/components/PageLayout';
import { generatePageMetadata } from '@/components/PageLayout';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = generatePageMetadata(
  'Privacy Notice',
  'Privacy policy and data protection information for phpMyFAQ website users',
);

// Written against what the site actually does: a static export without
// accounts, forms, cookies, analytics or third-party embeds. Keep this page in
// step when any of that changes (see the Search and local storage sections).
const LAST_REVISED = '4. Oktober 2026';

export default function PrivacyPage() {
  return (
    <PageLayout title="Privacy Notice">
      <p>
        <em>
          This privacy notice is provided in German, as the site is operated from Germany and the GDPR applies. In
          short: this is a static website without accounts, forms, cookies, analytics or third-party embeds. The only
          personal data processed are the server log files of our German hosting provider and e-mails you choose to send
          us. If you have any questions in English, please contact us at{' '}
          <a href="mailto:info@phpmyfaq.de">info@phpmyfaq.de</a>.
        </em>
      </p>

      <h2 id="ueberblick">Überblick</h2>
      <p>
        Diese Datenschutzerklärung informiert über die Verarbeitung personenbezogener Daten beim Besuch von
        www.phpmyfaq.de. Die Website ist eine rein informative, statisch ausgelieferte Seite: Es gibt keine
        Benutzerkonten, keine Formulare, keine Kommentare, keine Cookies, keine Reichweitenmessung und keine
        eingebundenen Inhalte Dritter. Schriftarten, Bilder und Skripte werden ausschließlich von unserem eigenen Server
        geladen. Verarbeitet werden damit nur die Server-Logfiles unseres Hosting-Anbieters sowie E-Mails, die Sie uns
        schreiben.
      </p>

      <h2 id="verantwortlicher">Verantwortlicher</h2>
      <p>
        Thorsten Rinne
        <br />
        Hermann-Hesse-Straße 16
        <br />
        86830 Schwabmünchen
        <br />
        Deutschland
        <br />
        E-Mail:{' '}
        {/* oxlint-disable-next-line nextjs/no-html-link-for-pages -- entity-obfuscated mailto:, not an internal route */}
        <a rel="nofollow" href="&#109;&#97;ilto&#58;thor%73%74&#37;6&#53;n&#64;p&#104;p&#109;y%66&#97;q&#46;&#100;e">
          thorsten@phpmyfaq.de
        </a>
      </p>

      <h2 id="hosting">Hosting und Server-Logfiles</h2>
      <p>
        Die Website wird gehostet bei ALL-INKL.COM – Neue Medien Münnich, Inhaber René Münnich, Hauptstraße 68, 02742
        Friedersdorf, Deutschland. Mit dem Anbieter besteht ein Vertrag zur Auftragsverarbeitung nach Art. 28 DSGVO. Die
        Server stehen in Deutschland.
      </p>
      <p>
        Bei jedem Aufruf einer Seite oder Datei speichert der Webserver automatisch Zugriffsdaten in Logfiles: die
        aufgerufene Adresse, Datum und Uhrzeit, die übertragene Datenmenge, den HTTP-Statuscode, die zuvor besuchte
        Seite (Referrer), Browsertyp und Betriebssystem sowie die IP-Adresse des anfragenden Geräts. Diese Daten werden
        nicht mit anderen Datenquellen zusammengeführt und nicht zur Erstellung von Nutzungsprofilen verwendet.
      </p>
      <p>
        Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse liegt im sicheren und stabilen
        Betrieb der Website sowie in der Aufklärung von Missbrauch. Die Logfiles werden nach sieben Tagen gelöscht;
        Daten, deren Aufbewahrung zur Aufklärung eines konkreten Vorfalls erforderlich ist, bleiben bis zu dessen
        Klärung von der Löschung ausgenommen.
      </p>

      <h2 id="speicherung">Keine Cookies, lokale Speicherung der Darstellung</h2>
      <p>
        Die Website setzt keine Cookies. Wenn Sie zwischen hellem und dunklem Design umschalten, wird Ihre Wahl unter
        dem Schlüssel „theme“ im Local Storage Ihres Browsers gespeichert, damit die Darstellung beim nächsten Besuch
        erhalten bleibt. Dieser Wert verlässt Ihr Gerät nicht und wird nicht an uns übertragen. Die Speicherung ist für
        die von Ihnen ausdrücklich gewünschte Funktion erforderlich (§ 25 Abs. 2 Nr. 2 TDDDG) und bedarf keiner
        Einwilligung. Sie können den Eintrag jederzeit über die Einstellungen Ihres Browsers löschen.
      </p>

      <h2 id="suche">Suche</h2>
      <p>
        Die Suchfunktion läuft vollständig in Ihrem Browser. Beim ersten Öffnen der Suche lädt der Browser einen beim
        Erstellen der Website erzeugten Suchindex von unserem Server, wie jede andere Datei dieser Website. Ihre
        Suchbegriffe werden ausschließlich lokal verarbeitet und weder an uns noch an Dritte übermittelt.
      </p>

      <h2 id="kontakt">Kontakt per E-Mail</h2>
      <p>
        Wenn Sie uns per E-Mail kontaktieren, verarbeiten wir Ihre Angaben (E-Mail-Adresse, Name, Inhalt der Nachricht)
        zur Bearbeitung Ihres Anliegens. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit es um die Anbahnung oder
        Erfüllung eines Vertrags geht, im Übrigen Art. 6 Abs. 1 lit. f DSGVO auf Grundlage unseres berechtigten
        Interesses an der Beantwortung von Anfragen. Die Nachrichten werden gelöscht, sobald das Anliegen abschließend
        bearbeitet ist und keine gesetzlichen Aufbewahrungspflichten entgegenstehen. Sicherheitsrelevante Meldungen zu
        phpMyFAQ behandeln wir nach der auf der Seite <Link href="/security">Security</Link> beschriebenen
        Vorgehensweise.
      </p>

      <h2 id="externe-links">Externe Links und Social-Media-Präsenzen</h2>
      <p>
        Die Website verlinkt auf Angebote Dritter, insbesondere auf den Quellcode und das Sponsoring bei GitHub, den
        Discord-Server, unsere Profile bei Facebook und Bluesky, die Dokumentation bei Read the Docs, die
        Demo-Installation sowie auf PayPal und Amazon für Spenden. Beim Klick auf einen solchen Link verlassen Sie
        unsere Website; ab dann gelten die Datenschutzbestimmungen des jeweiligen Anbieters. Es werden keine Inhalte
        dieser Anbieter in unsere Seiten eingebettet, und beim bloßen Besuch unserer Website werden keine Daten an sie
        übertragen.
      </p>
      <p>
        Innerhalb von GitHub, Discord, Facebook und Bluesky verarbeiten wir Daten von Nutzern, die dort mit uns
        kommunizieren, zum Beispiel durch Beiträge, Issues oder Nachrichten. Verantwortlich für die Verarbeitung auf
        diesen Plattformen sind in erster Linie deren Betreiber; einige von ihnen haben ihren Sitz in den USA, sodass
        dort eine Verarbeitung in einem Drittland stattfinden kann. Einzelheiten entnehmen Sie bitte den
        Datenschutzerklärungen der Plattformen.
      </p>

      <h2 id="drittlaender">Keine Übermittlung in Drittländer</h2>
      <p>
        Durch den Besuch dieser Website werden keine Daten in Länder außerhalb der Europäischen Union oder des
        Europäischen Wirtschaftsraums übermittelt. Hosting und Logfile-Verarbeitung finden in Deutschland statt.
      </p>

      <h2 id="sicherheit">Sicherheit</h2>
      <p>
        Die Website ist ausschließlich über eine verschlüsselte HTTPS-Verbindung erreichbar. Darüber hinaus treffen wir
        nach Art. 32 DSGVO angemessene technische und organisatorische Maßnahmen, um die verarbeiteten Daten zu
        schützen.
      </p>

      <h2 id="rechte">Ihre Rechte</h2>
      <p>
        Sie haben gegenüber uns das Recht auf Auskunft über die Sie betreffenden Daten (Art. 15 DSGVO), auf Berichtigung
        (Art. 16 DSGVO), auf Löschung (Art. 17 DSGVO), auf Einschränkung der Verarbeitung (Art. 18 DSGVO), auf
        Datenübertragbarkeit (Art. 20 DSGVO) sowie das Recht, einer Verarbeitung, die auf Art. 6 Abs. 1 lit. f DSGVO
        beruht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben, zu widersprechen (Art. 21 DSGVO). Wenden
        Sie sich dazu an die oben genannte Kontaktadresse.
      </p>
      <p>
        Außerdem haben Sie das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren (Art. 77 DSGVO). Für uns
        zuständig ist das Bayerische Landesamt für Datenschutzaufsicht, Promenade 18, 91522 Ansbach,{' '}
        <a href="https://www.lda.bayern.de/" rel="noopener noreferrer" target="_blank">
          www.lda.bayern.de
        </a>
        .
      </p>

      <h2 id="aenderungen">Änderungen dieser Erklärung</h2>
      <p>
        Wir passen diese Datenschutzerklärung an, wenn sich die Website oder die Rechtslage ändert. Es gilt jeweils die
        hier veröffentlichte Fassung.
      </p>
      <p>
        <small>Stand: {LAST_REVISED}</small>
      </p>
    </PageLayout>
  );
}