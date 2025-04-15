import Header from '../components/Header';
import VideoGrid from '../components/VideoGrid';
import Bio from '../components/Bio';
import Contact from '../components/Contact';
import ItalExpertiseNav from '../components/ItalExpertiseNav';
import VideoCarousel from '../components/VideoCarousel';
import ExpertiseDescriptions from '../components/ExpertiseDescriptions';
import { ExpertiseProvider } from '../context/ExpertiseContext';
import ExpertiseSwipeContainer from '../components/ExpertiseSwipeContainer';

export default function Home() {
  return (
    <div className="bg-black min-h-screen text-white">
      <Header />
      
      <main>
        <ExpertiseProvider>
          <ExpertiseSwipeContainer>
            <section className="pt-6 md:pt-2 pb-0 flex items-center justify-center flex-col w-full">
              <ItalExpertiseNav />
            </section>
            
            <VideoCarousel />
            
            <ExpertiseDescriptions />
          </ExpertiseSwipeContainer>
        </ExpertiseProvider>
        
        <VideoGrid />
        <Bio />
        <Contact />
      </main>
      
      <footer className="py-8 bg-black text-white text-center">
        <p>&copy; {new Date().getFullYear()} Itan. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
