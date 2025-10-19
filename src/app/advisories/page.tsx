import PageLayout from '@/components/PageLayout'
import { generatePageMetadata } from '@/components/PageLayout'
import Link from 'next/link'
import { Metadata } from 'next';

export const metadata: Metadata = generatePageMetadata(
  'List of Security Advisories',
  'We seriously take care about any security issues found in phpMyFAQ or bundled components. This page provides links to all our security advisories.'
)

export default function AdvisoriesPage() {
  return (
    <PageLayout title="List of Security Advisories">
      <div className="row">
        <div className="col-12">
          <p>
            Here you can find our advisories:
          </p>

          <h2>2025</h2>
          <ul>
            <li><Link href="/security/advisory-2025-10-03">Security Advisory 2025-10-03</Link></li>
            <li><Link href="/security/advisory-2025-01-02">Security Advisory 2025-01-02</Link></li>
          </ul>

          <h2>2024</h2>
          <ul>
            <li><Link href="/security/advisory-2024-12-13">Security Advisory 2024-12-13</Link></li>
            <li><Link href="/security/advisory-2024-12-06">Security Advisory 2024-12-06</Link></li>
            <li><Link href="/security/advisory-2024-07-21">Security Advisory 2024-07-21</Link></li>
            <li><Link href="/security/advisory-2024-03-25">Security Advisory 2024-03-25</Link></li>
            <li><Link href="/security/advisory-2024-02-05">Security Advisory 2024-02-05</Link></li>
          </ul>

          <h2>2023</h2>
          <ul>
            <li><Link href="/security/advisory-2023-10-27">Security Advisory 2023-10-27</Link></li>
            <li><Link href="/security/advisory-2023-09-21">Security Advisory 2023-09-21</Link></li>
            <li><Link href="/security/advisory-2023-08-27">Security Advisory 2023-08-27</Link></li>
            <li><Link href="/security/advisory-2023-07-16">Security Advisory 2023-07-16</Link></li>
            <li><Link href="/security/advisory-2023-05-17">Security Advisory 2023-05-17</Link></li>
            <li><Link href="/security/advisory-2023-04-23">Security Advisory 2023-04-23</Link></li>
            <li><Link href="/security/advisory-2023-03-20">Security Advisory 2023-03-20</Link></li>
            <li><Link href="/security/advisory-2023-02-12">Security Advisory 2023-02-12</Link></li>
            <li><Link href="/security/advisory-2023-01-15">Security Advisory 2023-01-15</Link></li>
          </ul>

          <h2>2022</h2>
          <ul>
            <li><Link href="/security/advisory-2022-12-11">Security Advisory 2022-12-11</Link></li>
            <li><Link href="/security/advisory-2022-10-24">Security Advisory 2022-10-24</Link></li>
            <li><Link href="/security/advisory-2022-10-02">Security Advisory 2022-10-02</Link></li>
            <li><Link href="/security/advisory-2022-07-23">Security Advisory 2022-07-23</Link></li>
            <li><Link href="/security/advisory-2022-01-17">Security Advisory 2022-01-17</Link></li>
          </ul>

          <h2>2021</h2>
          <ul>
            <li><Link href="/security/advisory-2021-10-22">Security Advisory 2021-10-22</Link></li>
          </ul>

          <h2>2020</h2>
          <ul>
            <li><Link href="/security/advisory-2020-12-23">Security Advisory 2020-12-23</Link></li>
          </ul>

          <h2>2018</h2>
          <ul>
            <li><Link href="/security/advisory-2018-09-02">Security Advisory 2018-09-02</Link></li>
          </ul>

          <h2>2017</h2>
          <ul>
            <li><Link href="/security/advisory-2017-10-19">Security Advisory 2017-10-19</Link></li>
            <li><Link href="/security/advisory-2017-07-12">Security Advisory 2017-07-12</Link></li>
            <li><Link href="/security/advisory-2017-04-02">Security Advisory 2017-04-02</Link></li>
            <li><Link href="/security/advisory-2017-01-27">Security Advisory 2017-01-27</Link></li>
          </ul>

          <h2>2016</h2>
          <ul>
            <li><Link href="/security/advisory-2016-05-31">Security Advisory 2016-05-31</Link></li>
            <li><Link href="/security/advisory-2016-04-11">Security Advisory 2016-04-11</Link></li>
          </ul>

          <h2>2014</h2>
          <ul>
            <li><Link href="/security/advisory-2014-11-30">Security Advisory 2014-11-30</Link></li>
            <li><Link href="/security/advisory-2014-09-16">Security Advisory 2014-09-16</Link></li>
            <li><Link href="/security/advisory-2014-02-04">Security Advisory 2014-02-04</Link></li>
          </ul>

          <h2>2013</h2>
          <ul>
            <li><Link href="/security/advisory-2013-11-26">Security Advisory 2013-11-26</Link></li>
            <li><Link href="/security/advisory-2013-11-18">Security Advisory 2013-11-18</Link></li>
          </ul>

          <h2>2012</h2>
          <ul>
            <li><Link href="/security/advisory-2012-04-14">Security Advisory 2012-04-14</Link></li>
          </ul>

          <h2>2011</h2>
          <ul>
            <li><Link href="/security/advisory-2011-10-25">Security Advisory 2011-10-25</Link></li>
            <li><Link href="/security/advisory-2011-09-28">Security Advisory 2011-09-28</Link></li>
          </ul>

          <h2>2010</h2>
          <ul>
            <li><Link href="/security/advisory-2010-12-15">Security Advisory 2010-12-15</Link></li>
            <li><Link href="/security/advisory-2010-09-28">Security Advisory 2010-09-28</Link></li>
          </ul>

          <h2>2009</h2>
          <ul>
            <li><Link href="/security/advisory-2009-12-01">Security Advisory 2009-12-01</Link></li>
            <li><Link href="/security/advisory-2009-09-01">Security Advisory 2009-09-01</Link></li>
            <li><Link href="/security/advisory-2009-06-02">Security Advisory 2009-06-02</Link></li>
          </ul>

          <h2>2008</h2>
          <ul>
            <li><Link href="/security/advisory-2008-09-11">Security Advisory 2008-09-11</Link></li>
          </ul>

          <h2>2007</h2>
          <ul>
            <li><Link href="/security/advisory-2007-02-18">Security Advisory 2007-02-18</Link></li>
          </ul>

          <h2>2006</h2>
          <ul>
            <li><Link href="/security/advisory-2006-12-15">Security Advisory 2006-12-15</Link></li>
            <li><Link href="/security/advisory-2006-04-21">Security Advisory 2006-04-21</Link></li>
          </ul>

          <h2>2005</h2>
          <ul>
            <li><Link href="/security/advisory-2005-11-18">Security Advisory 2005-11-18</Link></li>
            <li><Link href="/security/advisory-2005-09-23">Security Advisory 2005-09-23</Link></li>
            <li><Link href="/security/advisory-2005-08-15">Security Advisory 2005-08-15</Link></li>
            <li><Link href="/security/advisory-2005-06-29">Security Advisory 2005-06-29</Link></li>
            <li><Link href="/security/advisory-2005-03-06">Security Advisory 2005-03-06</Link></li>
          </ul>

          <h2>2004</h2>
          <ul>
            <li><Link href="/security/advisory-2004-07-27">Security Advisory 2004-07-27</Link></li>
            <li><Link href="/security/advisory-2004-05-18">Security Advisory 2004-05-18</Link></li>
          </ul>
        </div>
      </div>
    </PageLayout>
  )
}