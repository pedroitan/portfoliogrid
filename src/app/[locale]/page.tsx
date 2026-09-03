import HeroVideoDynamic from '@/components/HeroVideoDynamic';
import VideoGrid from '@/components/VideoGrid';
import Bio from '@/components/Bio';
import Contact from '@/components/Contact';
import { ExpertiseProvider } from '@/context/ExpertiseContext';
import Footer from '@/components/Footer';
import CourseBanner from '@/components/CourseBanner';

export default function Home() {
  return (
    <ExpertiseProvider>
      <div className="min-h-screen text-white">
        <HeroVideoDynamic />
        <CourseBanner />
        <main>
          {/* <ExpertiseSwipeContainer>
            <div className="m-0 p-0" style={{ height: 0, minHeight: 0, marginBottom: '-10px' }} />
            <ExpertiseDescriptions />
          </ExpertiseSwipeContainer> */}
          <VideoGrid />
          <Bio />
          <Contact />
        </main>
        <Footer />
      </div>
    </ExpertiseProvider>
  );
}
