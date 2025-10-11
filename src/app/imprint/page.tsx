import PageLayout from '@/components/PageLayout'
import { generatePageMetadata } from '@/components/PageLayout'
import { Metadata } from 'next';

export const metadata: Metadata = generatePageMetadata(
  'Imprint',
  'Imprint for phpmyfaq.de'
)

export default function ImprintPage() {
  return (
    <PageLayout title="Imprint">
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
            Internet: phpmyfaq.de
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
        </div>
      </div>
    </PageLayout>
  )
}
