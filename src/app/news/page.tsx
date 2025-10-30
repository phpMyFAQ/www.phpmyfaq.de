import PageLayout from '@/components/PageLayout'
import { generatePageMetadata } from '@/components/PageLayout'
import Link from 'next/link'

export const metadata = generatePageMetadata(
  'News archive',
  'News archive overview about all news about phpMyFAQ since 2001'
)

export default function NewsPage() {
  return (
    <PageLayout title="News archive">
      <div className="row">
        <div className="col-12">
          <ul className="list-unstyled">
            <li className="mb-4">
              <h2>
                <Link href="/news/2025">2025</Link>
              </h2>
              <h3 className="text-muted">
                Working hard on phpMyFAQ 4.1, getting all ready for PHP 8.5
              </h3>
            </li>
            <li className="mb-4">
              <h2>
                <Link href="/news/2024">2024</Link>
              </h2>
              <h3 className="text-muted">
                Finally, releasing phpMyFAQ 4.0, getting all ready for PHP 8.4, started working on phpMyFAQ 4.1
              </h3>
            </li>
            <li className="mb-4">
              <h2>
                <Link href="/news/2023">2023</Link>
              </h2>
              <h3 className="text-muted">
                Finally, releasing phpMyFAQ 3.2, getting all ready for PHP 8.3, started working on phpMyFAQ 4.0
              </h3>
            </li>
            <li className="mb-4">
              <h2>
                <Link href="/news/2022">2022</Link>
              </h2>
              <h3 className="text-muted">
                Finally, releasing phpMyFAQ 3.1, getting all ready for PHP 8.2, working hard on phpMyFAQ 3.2
              </h3>
            </li>
            <li className="mb-4">
              <h2>
                <Link href="/news/2021">2021</Link>
              </h2>
              <h3 className="text-muted">
                Still struggling with the Corona pandemic, getting all ready for PHP 8.1, working hard on phpMyFAQ 3.1
              </h3>
            </li>
            <li className="mb-4">
              <h2>
                <Link href="/news/2020">2020</Link>
              </h2>
              <h3 className="text-muted">
                Finally releasing phpMyFAQ 3.0, struggling with the Corona pandemic, getting all ready for PHP 8.0 and working
                hard on phpMyFAQ 3.1
              </h3>
            </li>
            <li className="mb-4">
              <h2>
                <Link href="/news/2019">2019</Link>
              </h2>
              <h3 className="text-muted">
                Working hard on phpMyFAQ 3.0 and dropped support for PHP 5.
              </h3>
            </li>
            <li className="mb-4">
              <h2>
                <Link href="/news/2018">2018</Link>
              </h2>
              <h3 className="text-muted">
                Finally, added PHP namespaces and Docker support for the upcoming phpMyFAQ 3.0 milestone
              </h3>
            </li>
            <li className="mb-4">
              <h2>
                <Link href="/news/2017">2017</Link>
              </h2>
              <h3 className="text-muted">
                Improving the 2.9 version and working hard on phpMyFAQ 3.0
              </h3>
            </li>
            <li className="mb-4">
              <h2>
                <Link href="/news/2016">2016</Link>
              </h2>
              <h3 className="text-muted">
                Celebrated 15 years of phpMyFAQ and released phpMyFAQ 2.9
              </h3>
            </li>
            <li className="mb-4">
              <h2>
                <Link href="/news/2015">2015</Link>
              </h2>
              <h3 className="text-muted">Working on 2.8 and 2.9, getting everything ready for PHP 7 and HHVM</h3>
            </li>
            <li className="mb-4">
              <h2>
                <Link href="/news/2014">2014</Link>
              </h2>
              <h3 className="text-muted">Improving the 2.8 version and working hard on phpMyFAQ 2.9</h3>
            </li>
            <li className="mb-4">
              <h2>
                <Link href="/news/2013">2013</Link>
              </h2>
              <h3 className="text-muted">Using PHP 5.3 and Bootstrap for phpMyFAQ 2.8</h3>
            </li>
            <li className="mb-4">
              <h2>
                <Link href="/news/2012">2012</Link>
              </h2>
              <h3 className="text-muted">Improving the 2.7 version and working on phpMyFAQ 2.8</h3>
            </li>
            <li className="mb-4">
              <h2>
                <Link href="/news/2011">2011</Link>
              </h2>
              <h3 className="text-muted">Celebrated 10 years of phpMyFAQ, worked on better usability and HTML5 support with phpMyFAQ 2.7</h3>
            </li>
            <li className="mb-4">
              <h2>
                <Link href="/news/2010">2010</Link>
              </h2>
              <h3 className="text-muted">Everything&apos;s UTF-8 encoded now with phpMyFAQ 2.6</h3>
            </li>
            <li className="mb-4">
              <h2>
                <Link href="/news/2009">2009</Link>
              </h2>
              <h3 className="text-muted">Using PHP 5.2 with phpMyFAQ 2.5</h3>
            </li>
            <li className="mb-4">
              <h2>
                <Link href="/news/2008">2008</Link>
              </h2>
              <h3 className="text-muted">Improving the 2.0 version and working on phpMyFAQ 2.5</h3>
            </li>
            <li className="mb-4">
              <h2>
                <Link href="/news/2007">2007</Link>
              </h2>
              <h3 className="text-muted">Better user management and permissions with phpMyFAQ 2.0</h3>
            </li>
            <li className="mb-4">
              <h2>
                <Link href="/news/2006">2006</Link>
              </h2>
              <h3 className="text-muted">Revisions and better spam protection with phpMyFAQ 1.6</h3>
            </li>
            <li className="mb-4">
              <h2>
                <Link href="/news/2005">2005</Link>
              </h2>
              <h3 className="text-muted">Support for PHP 5, PostgreSQL, MS SQL and SEO optimized URLs with 1.5</h3>
            </li>
            <li className="mb-4">
              <h2>
                <Link href="/news/2004">2004</Link>
              </h2>
              <h3 className="text-muted">Now with a WYSIWYG editor and XHTML support with phpMyFAQ 1.4</h3>
            </li>
            <li className="mb-4">
              <h2>
                <Link href="/news/2003">2003</Link>
              </h2>
              <h3 className="text-muted">Adding simple multi-language and PDF support in phpMyFAQ 1.3</h3>
            </li>
            <li className="mb-4">
              <h2>
                <Link href="/news/2002">2002</Link>
              </h2>
              <h3 className="text-muted">New features and PHP 4 support with phpMyFAQ 1.1 and going open source with phpMyFAQ 1.2</h3>
            </li>
            <li className="mb-4">
              <h2>
                <Link href="/news/2001">2001</Link>
              </h2>
              <h3 className="text-muted">The PHP3 beginnings with phpMyFAQ 0.x and the final 1.0 release</h3>
            </li>
          </ul>
        </div>
      </div>
    </PageLayout>
  )
}