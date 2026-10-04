import Hero from '@/components/Hero';
import TrustStrip from '@/components/TrustStrip';
import Showcase from '@/components/Showcase';
import Highlights from '@/components/Highlights';
import RecentNews from '@/components/RecentNews';
import WhatsNext from '@/components/WhatsNext';
import Sponsors from '@/components/Sponsors';
import JsonLd from '@/components/JsonLd';
import { requireVersions } from '@/lib/data';
import { softwareApplication } from '@/lib/structuredData';

export default function Home() {
  return (
    <>
      <JsonLd data={softwareApplication(requireVersions())} />
      <Hero />
      <TrustStrip />
      <Showcase />
      <Highlights />
      <WhatsNext />
      <RecentNews />
      <Sponsors />
    </>
  );
}