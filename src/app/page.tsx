import Hero from '@/components/Hero';
import TrustStrip from '@/components/TrustStrip';
import Showcase from '@/components/Showcase';
import Highlights from '@/components/Highlights';
import RecentNews from '@/components/RecentNews';
import WhatsNext from '@/components/WhatsNext';
import Sponsors from '@/components/Sponsors';

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Showcase />
      <Highlights />
      <RecentNews />
      <WhatsNext />
      <Sponsors />
    </>
  );
}