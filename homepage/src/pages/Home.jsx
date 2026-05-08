import { lazy, Suspense, useRef, useState, useEffect } from 'react';
import Hero from '../components/Hero';
import Cards from '../components/Cards';
import Events from '../components/Events';
import Stats from '../components/Stats';
import CTA from '../components/CTA';

// Lazy-load the heavy Three.js scene — only downloaded when user scrolls near it
const ThreeDScene = lazy(() => import('../components/ThreeDScene'));

function LazyThreeDScene() {
  const sentinelRef = useRef(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setShouldRender(true); },
      { rootMargin: '300px' } // start loading 300px before it enters view
    );
    if (sentinelRef.current) obs.observe(sentinelRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={sentinelRef}>
      {shouldRender && (
        <Suspense fallback={
          <div style={{ height: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.2)', fontSize: '0.85rem', letterSpacing: '2px' }}>
            LOADING 3D SCENE...
          </div>
        }>
          <ThreeDScene />
        </Suspense>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Cards />
      <LazyThreeDScene />
      <Events />
      <Stats />
      <CTA />
    </>
  );
}
