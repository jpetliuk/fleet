
import Layout from '../components/layout/Layout';
import Hero from '../components/home/Hero';
import Benefits from '../components/home/Benefits';
import CorporateFleet from '../components/home/CorporateFleet';
import HowItWorks from '../components/home/HowItWorks';
import Testimonials from '../components/home/Testimonials';
import OrangeBanner from '../components/home/OrangeBanner';

export default function Home() {
    return (
        <Layout>
            <Hero />
            <Benefits />
            <CorporateFleet />
            <HowItWorks />
            <Testimonials />
            <OrangeBanner />
        </Layout>
    );
}
