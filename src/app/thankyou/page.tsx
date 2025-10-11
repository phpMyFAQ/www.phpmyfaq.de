import PageLayout from '@/components/PageLayout'
import { generatePageMetadata } from '@/components/PageLayout'

export const metadata = generatePageMetadata(
  'Thank You!',
  'Thank you to all contributors and supporters of phpMyFAQ'
)

export default function ThankYouPage() {
  return (
    <PageLayout title="Thank You!">
      <div className="row">
        <div className="col-xs-12">
          <p>
            The phpMyFAQ Team wants to thank the following persons and/or companies:
          </p>
          <ul>
            <li>
              <strong>Lieven Op De Beeck</strong> for the initial phpMyFAQ logo
            </li>
            <li>
              <a rel="nofollow" target="_blank" href="http://www.grochtdreis.de/">Jens Grochtdreis</a> for
              helping with (X)HTML and CSS nightmares on phpMyFAQ and phpmyfaq.de
            </li>
            <li>
              <strong>David Soria Parra</strong> for git support and bugfixing the MySQLi and SQLite
              support
            </li>
            <li>
              <strong>Tom Rochester</strong> for the initial PostgreSQL port
            </li>
            <li>
              <strong>Adam Greene</strong> for the Sybase port
            </li>
            <li>
              <strong>Stephan Hochhaus</strong> for the initial English documentation
            </li>
            <li>
              <strong>Robin Wood</strong> for patches and improvements
            </li>
            <li>
              <strong>Minoru Toda</strong> for the original Ajax based link verifier
            </li>
            <li>
              <strong>Helmut Tessarek</strong> for helping with the IBM DB2 support
            </li>
            <li>
              <strong>Periklis Tsirakidis</strong> for the Mozilla Firefox search plugin and the Greek
              translation
            </li>
            <li>
              <strong>Mathias Schindler</strong> for the Google searching, Freshmeat work and propaganda
            </li>
            <li><strong>Jan Kneschke</strong> for helping with the lighttpd rewrite rules</li>
            <li><strong>Stefan Esser</strong> for fixing PHP and keeping security in mind</li>
            <li>
              <strong>Sarah Hermann</strong>, <strong>Elger Thiele</strong>, and <strong>Jan Mergler</strong>
              for their contributions during the Mayflower Barcamp 2008
            </li>
            <li><strong>Daniel Richter</strong> for alpha version and Apple testing</li>
            <li><strong>Rene Treffer</strong> for the SVN administration and daily SVN snapshots</li>
            <li><strong>Tadashi Jokagi</strong> for the Japanese translation and MIME support</li>
            <li>and everyone we might forgot</li>
            <li>and of course everyone who is using phpMyFAQ!</li>
          </ul>

          <p>Thanks for the presents from our amazon.de wishlists and other things:</p>

          <ul>
            <li><strong>Gerhard van der Molen</strong></li>
            <li><strong>Michael van Grinsven</strong></li>
            <li><strong>Stephan Hochhaus</strong></li>
            <li><strong>Mathias Schindler</strong></li>
            <li><strong>ESTO IndustrieTechnik Stoltzenburg GmbH</strong></li>
            <li><strong>Thimo Kling</strong></li>
            <li><a rel="nofollow" target="_blank" href="http://www.theganggreen.de">Joachim Reuß</a></li>
            <li><strong>Hermann Degel</strong></li>
            <li><a rel="nofollow" target="_blank" href="http://www.strichcode-etikettendrucker.de/">www.strichcode-etikettendrucker.de</a>
            </li>
            <li><a rel="nofollow" target="_blank" href="http://www.vd-server.de/">vd-server.de</a></li>
            <li><a rel="nofollow" target="_blank" href="http://www.webchills.at/">webchills - Webdesign &amp;
              Internetservices</a></li>
            <li><strong>Lars Vilhuber</strong></li>
            <li><a rel="nofollow" target="_blank" href="http://www.dialyse-online.de">dialyse-online.de</a></li>
            <li><strong>Jürgen Bschaden (TCM-Praxis)</strong></li>
            <li><a rel="nofollow" target="_blank" href="http://www.serverschleuder.de">Heizmann und Schmitt GbR -
              Serverschleuder.de</a></li>
            <li><a rel="nofollow" target="_blank" href="http://www.internet.xonline.de/">Xonline GmbH</a></li>
            <li><a rel="nofollow" target="_blank" href="http://www.sikkumo.com/">Sikkumo Handels GmbH</a></li>
            <li><a rel="nofollow" target="_blank" href="http://www.servopack.de">Servopack Haftetiketten GmbH</a></li>
            <li><a rel="nofollow" target="_blank" href="http://www.smcm.edu">St. Mary&apos;s College of Maryland</a></li>
            <li><strong>William Casey</strong></li>
            <li><a rel="nofollow" target="_blank" href="http://www.petsnature.de">Pets Nature GmbH</a></li>
            <li><a rel="nofollow" target="_blank" href="http://www.sectoor.de">sectoor GmbH</a></li>
            <li><a rel="nofollow" target="_blank" href="http://www.tech.corradofreunde.de/">Corradofreunde Rhein-Main</a>
            </li>
            <li><strong>Johannes M. Driessen</strong></li>
            <li><a rel="nofollow" target="_blank" href="http://www.yalwa.com/">Yalwa - Free Business Directory</a></li>
            <li><a rel="nofollow" target="_blank" href="http://www.singernet.com">SingerNet</a></li>
            <li><a rel="nofollow" target="_blank" href="http://www.torontowebservices.com">Toronto Search Engine
              Optimization</a></li>
            <li><strong>Mark Kitchen</strong></li>
            <li><a rel="nofollow" target="_blank" href="http://www.maxicard.de">Maxicard GmbH</a></li>
            <li><a rel="nofollow" target="_blank" href="http://www.amicron.org">Amicron Software</a></li>
            <li><a rel="nofollow" target="_blank" href="http://www.nu-mediadisplays.com">LED Displays Electronic Signs</a>
            </li>
            <li><a rel="nofollow" target="_blank" href="http://www.howardnet.net/">Howard Development LLC</a></li>
            <li><strong>Daniel Guttstein</strong></li>
            <li><strong>Pierre Gronau</strong></li>
            <li><a rel="nofollow" target="_blank" href="http://www.gevesoft.de/">GeveSoft</a></li>
            <li><strong>Jörg Bucher</strong></li>
            <li><a rel="nofollow" target="_blank" href="http://www.konze.de">Arthur Konze</a></li>
            <li><a rel="nofollow" target="_blank" href="http://www.mctechproducciones.com.mx/">Manuel Quinones
              Martinez</a></li>
            <li><a rel="nofollow" target="_blank" href="http://www.professorjam.com/">William P. Rader</a></li>
            <li><strong>Paul D. Bucl</strong></li>
            <li><strong>Sakthi Kannan</strong></li>
            <li><strong>Valentin Bachem</strong></li>
            <li><strong>Andrea Doering</strong></li>
            <li><strong>Print Equipment e.K.</strong></li>
            <li><a rel="nofollow" target="_blank" href="http://www.very-clever.com">Ewald Kicker</a></li>
            <li><strong>Sylconia Webhosting</strong></li>
            <li><strong>Santiago Carrillo</strong></li>
            <li><strong>Conor Scolard</strong></li>
            <li><a rel="nofollow" target="_blank" href="http://www.severud.org/">Kevin Severud</a></li>
            <li><a rel="nofollow" target="_blank" href="http://www.elfio.de">Elfio GmbH</a></li>
            <li><strong>Matthias Süß</strong></li>
            <li><a rel="nofollow" target="_blank" href="http://www.content.shoppic.de">Mario Göttsche</a></li>
            <li><strong>Ralph Huchtemann</strong></li>
            <li><a rel="nofollow" target="_blank" href="http://www.baby-lexikon.net">Thomas Zeithaml</a></li>
            <li><a rel="nofollow" target="_blank" href="http://www.nikon-fotografie.de/">Klaus Harms
              (nikon-fotografie.de</a></li>
            <li><strong>STRENGTHFOOD - Zlatko Margeta</strong></li>
            <li><a rel="nofollow" target="_blank" href="http://www.mailclub.fr">Mailclub</a></li>
            <li><a rel="nofollow" target="_blank" href="http://www.siedeln.de">siedeln.de Team</a> (Marc Ehrich und Peter
              Gustav Bartschat)
            </li>
            <li><a rel="nofollow" target="_blank" href="http://www.c-kn.de">Kirsch Krienke Milz Nolte GbR</a></li>
            <li><a rel="nofollow" target="_blank" href="http://www.steffen-klausing.de/">Steffen Klausing</a></li>
            <li><a rel="nofollow" target="_blank" href="http://faq.winboard.org">Andreas Höschele</a></li>
            <li><strong>Olaf Heeg</strong></li>
            <li><a rel="nofollow" target="_blank" href="http://www.rothundlorenz.de">Roth &amp; Lorenz GmbH</a></li>
            <li><a rel="nofollow" target="_blank" href="http://www.ipconsult.nl/">IPConsult B.V.</a></li>
            <li><strong>Sakis Efthimiadis</strong></li>
            <li><strong>Timothy Alsberg</strong></li>
            <li><a rel="nofollow" target="_blank" href="http://www.tantrapedia.org/faq//">Edi Goetschel</a></li>
            <li><a rel="nofollow" target="_blank" href="http://www.auto24.de/">auto24.de</a></li>
            <li><strong>Filippo Toso</strong></li>
            <li><strong>Peter Lehmann</strong></li>
            <li><a rel="nofollow" target="_blank" href="http://www.p-roadsters.de/">Petra Wershofen</a></li>
            <li><strong>Minoru Toda</strong></li>
            <li><a rel="nofollow" target="_blank" href="http://www.orthopaedie-stuttgart.de/">Orthopädie
              Stuttgart</a></li>
            <li><a rel="nofollow" target="_blank" href="http://www.datango.de/">datango AG</a></li>
            <li><a rel="nofollow" target="_blank" href="http://www.sozialprojekte.de/">Reinhard Bogg</a></li>
            <li><a rel="nofollow" target="_blank" href="http://www.hollinae.com/faq/">Sebastien Gaspari</a></li>
            <li><a rel="nofollow" target="_blank" href="http://www.ropa.de/">ropa GmbH</a></li>
            <li><strong>Hannelore Vonier</strong></li>
            <li><strong>Vanessa Suen</strong></li>
            <li><strong>Claudia Güner</strong></li>
            <li><strong>Muhamed Osmani</strong></li>
            <li><strong>E-Fitness</strong></li>
            <li><strong>Dirk Bösche</strong></li>
            <li><strong>Massimo Blangiardi</strong></li>
            <li><strong>Martin Hinnen</strong></li>
            <li><strong>Link Building Services</strong></li>
            <li><strong>Rosemary Royle</strong></li>
            <li><strong>Raymond Fink</strong></li>
            <li><strong>Daniel Rexter</strong></li>
            <li><strong>Allen Pauna</strong></li>
            <li><strong>Daniel Siefert</strong></li>
            <li><strong>Khoo Eng Foo</strong></li>
            <li><strong>John Weldon</strong></li>
            <li><strong>Coz Baldwin</strong></li>
            <li><strong>e-VeriFILE.us</strong></li>
          </ul>
        </div>
      </div>
    </PageLayout>
  )
}
