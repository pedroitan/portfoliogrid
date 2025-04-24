import HeroVideoDynamic from '../components/HeroVideoDynamic';
// import HeroVideo from '../components/HeroVideo'; 
import ExpertiseSwipeContainer from '../components/ExpertiseSwipeContainer';
import ItalExpertiseNav from '../components/ItalExpertiseNav';
import VideoCarousel from '../components/VideoCarousel';
import ExpertiseDescriptions from '../components/ExpertiseDescriptions';
import VideoGrid from '../components/VideoGrid';
import Bio from '../components/Bio';
import Contact from '../components/Contact';
import { ExpertiseProvider } from '../context/ExpertiseContext';

export default function Home() {
  return (
    <ExpertiseProvider>
      <div className="bg-black min-h-screen text-white">
        {/* HERO SECTION - Fullscreen video with overlay */}
        <HeroVideoDynamic />

        {/* Main content */}
        {/* <Header /> */}
        <main>
          <ExpertiseSwipeContainer>
            {/* Removed ItalExpertiseNav navbar below ver portfólio */}
            {/* <section className="pt-[80px] md:pt-2 pb-0 mb-[-10px] flex items-center justify-center flex-col w-full">
              <ItalExpertiseNav />
            </section> */}
            <div className="m-0 p-0" style={{ height: 0, minHeight: 0, marginBottom: '-10px' }} />
            <VideoCarousel />
            <ExpertiseDescriptions />
          </ExpertiseSwipeContainer>
          <VideoGrid />
          <Bio />
          <Contact />
        </main>
        <footer className="py-8 bg-black text-white text-center">
          <p>&copy; {new Date().getFullYear()} Itan. All Rights Reserved.</p>
        </footer>
      </div>
    </ExpertiseProvider>
  );
}
