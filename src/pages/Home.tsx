
// Default Imports
import Layout from '../components/layout/Layout';
import Hero from '../components/home/Hero';
import Benefits from '../components/home/Benefits';
import CorporateFleet from '../components/home/CorporateFleet';
import Steps from '../components/home/Steps';
import OrangeBanner from '../components/home/OrangeBanner';

export default function Home() {
    return (
        <Layout>
            <Hero />
            <Benefits />
            <CorporateFleet />
            <Steps />
            <OrangeBanner />
            {/* Testimonials would go here */}
        </Layout>
    );
}
