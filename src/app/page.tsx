import HeroVideo from '../components/HeroVideo';

export default function Home() {
  return (
    <div className="bg-black min-h-screen text-white">
      {/* HERO SECTION - Fullscreen video with overlay */}
      <HeroVideo 
        videoUrl="https://www.youtube.com/watch?v=gxTSuCtx510" 
      />

      {/* Main content hidden behind hero for now */}
      {/*
      <Header />
      <main>
        <ExpertiseProvider>
          <ExpertiseSwipeContainer>
            <section className="pt-[80px] md:pt-2 pb-0 mb-[-10px] flex items-center justify-center flex-col w-full">
              <ItalExpertiseNav />
            </section>
            <div className="m-0 p-0" style={{ height: 0, minHeight: 0, marginBottom: '-10px' }} />
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
      */}
    </div>
  );
}
