import PageLayout from '@/components/PageLayout';
import { generatePageMetadata } from '@/components/PageLayout';
import { Metadata } from 'next';

export const metadata: Metadata = generatePageMetadata(
  '10 Years phpMyFAQ',
  'Some information about the first 10 years of phpMyFAQ with interesting statistics and facts about its usage',
);

export default function TenYearsPage() {
  return (
    <PageLayout title="Celebrating 10 years of phpMyFAQ">
      <div className="row">
        <div className="col-xs-12">
          <p>
            <strong>February 2011. The internet.</strong>
            <br />
            The development of phpMyFAQ started back in february 2001 then Thorsten Rinne and Bastian Pöttner wrote the
            first lines of PHP 3 code for a inofficial FAQ for the German webhosting company Strato. First they tried to
            sell the distribution to companies and give it away for free for everyone else but this never really worked
            for several reasons. Beginning with the development of phpMyFAQ 1.2.0 back in summer 2002 they decided to
            open source the code under the terms of the Mozilla Public License Version 1.1 (MPL). Since then the user
            and code base grows and grows ... :-)
          </p>
          <h2>Interesting facts</h2>
          <ul>
            <li>
              The first ever released 0.6 version was developed with PHP 3.0 and MySQL 3.22 on Debian GNU/Linux 2.2 and
              Windows 2000.
            </li>
            <li>We used several version control systems: 7,5 years CVS, 1 year SVN and 1,5 years now with Git</li>
            <li>We released 124 different versions from 0.6 back in february 2001 to 2.6.14 in january 2011</li>
            <li>phpMyFAQ 1.0 was a 100KB package, phpMyFAQ 2.7 is a 3.5MB package</li>
            <li>phpmyfaq.de generates between 20 and 30 GB traffic per month, most of it for downloads</li>
            <li>
              Language distribution: 30% English, 21% German, 14% Simplified Chinese, 11% Japanese, 5% French, 3%
              Spanish, all others are under 2%
            </li>
            <li>Currently 70% of our users are running on PHP 5.2, 30% are already using PHP 5.3</li>
            <li>
              47% of the phpMyFAQ installations are running on the Windows platform as intranet installations, 47% of
              the installations are running on Linux, mainly not as intranet installations
            </li>
            <li>53% of the installations are running on shared webhosting servers</li>
            <li>33% of our installation base are companies</li>
          </ul>

          <h2>Thank you!</h2>
          <p>The phpMyFAQ Team wants to thank the following persons and/or companies:</p>
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
              <strong>Mayflower GmbH</strong> for supporting phpMyFAQ and being Thorsten&apos;s employer 2004-2012
            </li>
            <li>
              <strong>Tom Zeithaml</strong> for helping with SEO
            </li>
            <li>everyone who sent patches and translations over the years</li>
            <li>everyone who donated something over the years</li>
            <li>and of course everyone who is using phpMyFAQ!</li>
          </ul>
        </div>
      </div>
    </PageLayout>
  );
}
