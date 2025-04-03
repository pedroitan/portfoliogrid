import Header from '../components/Header';
import VideoGrid from '../components/VideoGrid';
import Bio from '../components/Bio';
import Contact from '../components/Contact';

export default function Home() {
  return (
    <div className="bg-black min-h-screen text-white">
      <Header />
      
      <main>
        <section className="h-[15vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold">ITAN</h1>
            <p className="text-sm md:text-base mt-1 opacity-80">
              Film Director · Music Producer · Audiovisual Engineer
            </p>
          </div>
        </section>
        
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
