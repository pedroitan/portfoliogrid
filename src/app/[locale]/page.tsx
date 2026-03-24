import HeroVideoDynamic from '@/components/HeroVideoDynamic';
import ExpertiseSwipeContainer from '@/components/ExpertiseSwipeContainer';
import VideoCarousel from '@/components/VideoCarousel';
import ExpertiseDescriptions from '@/components/ExpertiseDescriptions';
import VideoGrid from '@/components/VideoGrid';
import Bio from '@/components/Bio';
import Contact from '@/components/Contact';
import { ExpertiseProvider } from '@/context/ExpertiseContext';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <ExpertiseProvider>
      <div className="bg-black min-h-screen text-white">
        <HeroVideoDynamic />
        <main>
          <ExpertiseSwipeContainer>
            <div className="m-0 p-0" style={{ height: 0, minHeight: 0, marginBottom: '-10px' }} />
            <VideoCarousel />
            <ExpertiseDescriptions />
          </ExpertiseSwipeContainer>
          <VideoGrid />
          <Bio />
          <Contact />
        </main>
        <Footer />
      </div>
    </ExpertiseProvider>
  );
}
