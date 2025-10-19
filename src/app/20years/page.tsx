import PageLayout from '@/components/PageLayout'
import { generatePageMetadata } from '@/components/PageLayout'
import { Metadata } from 'next';

export const metadata: Metadata = generatePageMetadata(
  '20 Years phpMyFAQ',
  'Some information about the first 20 years of phpMyFAQ with interesting statistics and facts about its usage'
)

export default function TwentyYearsPage() {
  return (
    <PageLayout title="Celebrating 20 years of phpMyFAQ">
      <div className="row">
        <div className="col-xs-12">
          <p>
            <strong>February 2021. The internet.</strong><br />
            The development of phpMyFAQ started back in february 2001 then Thorsten Rinne and Bastian
            Pöttner wrote the first lines of PHP 3 code for a nonofficial FAQ for the German hosting
            company Strato. First they tried to sell the distribution to companies and give it away for
            free for everyone else but this never really worked for several reasons. Beginning with the
            development of phpMyFAQ 1.2.0 back in summer 2002 they decided to open source the code under the
            terms of the Mozilla Public License Version 1.1 (MPL), since phpMyFAQ 2.8 the code is licensed
            under the terms of the Mozilla Public License Version 2.0. Nowadays phpMyFAQ supports PHP 7.2+
            and PHP 8.
          </p>
          <h2>Interesting facts</h2>
          <ul>
            <li>
              The first ever released 0.6 version was developed with PHP 3.0 and MySQL 3.22 on Debian
              GNU/Linux 2.2 and Windows 2000.
            </li>
            <li>
              We used several version control systems: 7,5 years CVS, 1 year SVN and 11,5 years now with Git
            </li>
            <li>
              We released almost 200 different versions from 0.6 back in February 2001 to 3.0.7 in December 2020
            </li>
            <li>
              phpMyFAQ 1.0 was a 100KB package, phpMyFAQ 3.0 is a 7MB package
            </li>
            <li>
              phpmyfaq.de generates between 30 and 40 GB traffic per month, most of it for downloads
            </li>
            <li>
              demo.phpmyfaq.de serves phpMyFAQ running on PHP 7 and PHP 8.
            </li>
          </ul>

          <h2>Thank you!</h2>
          <p>
            The phpMyFAQ Team wants to thank the following persons and/or companies:
          </p>
          <ul>
            <li>
              <strong>Bastian Pöttner</strong> for his initial work
            </li>
            <li>
              <strong>Lieven Op De Beeck</strong> for the phpMyFAQ logo
            </li>
            <li>
              <strong>David Soria Parra</strong> for Git support and being a friend
            </li>
            <li>
              <strong>Tom Rochester</strong> for the initial PostgreSQL port and being a friend
            </li>
            <li>
              <strong>Mathias Schindler</strong> for early propaganda
            </li>
            <li>
              <strong>Jens Grochtdreis</strong> for helping with CSS nightmares
            </li>
            <li>
              <strong>Daniel Richter</strong> for alpha testing
            </li>
            <li>
              <strong>Johannes Schlüter</strong> for testing phpMyFAQ and being a friend
            </li>
            <li>
              <strong>Tom Zeithaml</strong> for helping with SEO
            </li>
            <li>
              <strong>Qafoo</strong> for using Tideways and friendship
            </li>
            <li>
              everyone who sent patches and translations over the years
            </li>
            <li>
              everyone who donated something over the years
            </li>
            <li>
              and of course everyone who is using phpMyFAQ!
            </li>
          </ul>
        </div>
      </div>
    </PageLayout>
  )
}