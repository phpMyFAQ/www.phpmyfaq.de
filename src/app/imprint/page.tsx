import PageLayout from '@/components/PageLayout'
import { generatePageMetadata } from '@/components/PageLayout'

export const metadata = generatePageMetadata(
  'Imprint / Impressum',
  'Imprint for phpmyfaq.de / phpmyfaq.net / phpmyfaq.org / phpmyfaq.eu'
)

export default function ImprintPage() {
  return (
    <PageLayout title="Imprint / Impressum">
      <div className="row">
        <div className="col-xs-12">
          <p>
            <strong>
              Thorsten Rinne<br />
              Hermann-Hesse-Straße 16<br />
              86830 Schwabmünchen<br />
              Deutschland / Germany<br />
              Telefon: +49 82 32 / 78 93 6*
            </strong>
          </p>
          <p>
            E-Mail: <a rel="nofollow" href="&#109;&#97;ilto&#58;thor%73%74&#37;6&#53;n&#64;p&#104;p&#109;y%66&#97;q&#46;&#100;e">thorsten@phpmyfaq.de</a><br />
            Internet: phpmyfaq.de / phpmyfaq.net / phpmyfaq.org / phpmyfaq.eu
          </p>
          <p>
            Inhaltlich Verantwortlicher gemäß § 10 Absatz 3 MDStV:<br />
            Thorsten Rinne (Anschrift wie oben)
          </p>
          <p>
            Haftungshinweis: Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die
            Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber
            verantwortlich.
          </p>
          <p>
            <small>
              * Das ist meine Telefonnummer. Es ist wirklich meine Telefonnummer. Sie ist für Freunde und
              Bekannte. Sie ist nicht für Kontaktaufnahme wegen Fragen zu phpMyFAQ oder für "mal eben eine
              Frage zu PHP". Dafür gibt es E-Mail.
            </small>
          </p>

          <h2>Credits</h2>
          <p>
            The layout of this page is based on the <a rel="nofollow" target="_blank" href="http://themes.3rdwavemedia.com/website-templates/devaid-free-bootstrap-theme-developers/">
            devAid</a> theme created by made by <a rel="nofollow" target="_blank" href="https://twitter.com/3rdwave_themes">
            Xiaoying Riley</a>. You can grab the whole source code of our website at <a rel="nofollow" target="_blank" href="https://github.com/phpMyFAQ/www.phpmyfaq.de">
            Github</a>, it&apos;s open source and licensed under the terms of the MPL 2.0 license. The following
            open source tools were used to create this website:
          </p>
          <ul>
            <li><a rel="nofollow" target="_blank" href="http://yeoman.io/">Yeoman</a></li>
            <li><a rel="nofollow" target="_blank" href="http://gruntjs.com/">Grunt</a></li>
            <li><a rel="nofollow" target="_blank" href="http://bower.io/">Bower</a></li>
            <li><a rel="nofollow" target="_blank" href="http://handlebarsjs.com/">Handlebars</a></li>
            <li><a rel="nofollow" target="_blank" href="http://assemble.io/">Assemble</a></li>
            <li><a rel="nofollow" target="_blank" href="http://getbootstrap.com/">Bootstrap</a></li>
            <li><a rel="nofollow" target="_blank" href="http://fontawesome.io/">Font Awesome</a></li>
          </ul>
        </div>
      </div>
    </PageLayout>
  )
}
