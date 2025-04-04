import Header from '../components/Header';
import VideoGrid from '../components/VideoGrid';
import Bio from '../components/Bio';
import Contact from '../components/Contact';
import ItalExpertiseNav from '../components/ItalExpertiseNav.jsx';
import FeaturedVideo from '../components/FeaturedVideo';
import ExpertiseDescriptions from '../components/ExpertiseDescriptions';
import { ExpertiseProvider } from '../context/ExpertiseContext';

export default function Home() {
  return (
    <div className="bg-black min-h-screen text-white">
      <Header />
      
      <main>
        <ExpertiseProvider>
          <section className="pt-[5vh] pb-0 flex items-center justify-center flex-col">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold">ITAN</h1>
            </div>
            <ItalExpertiseNav />
          </section>
          
          <FeaturedVideo />
          
          <ExpertiseDescriptions />
        </ExpertiseProvider>
        
        <VideoGrid />
        <Bio />
        <Contact />
      </main>
      
      <footer className="py-8 bg-black text-white text-center">
        <p>© {new Date().getFullYear()} Itan. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
