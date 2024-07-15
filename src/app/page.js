import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar/Navbar";
import AboutSection from "@/components/sections/home/AboutSection";
import ContactSection from "@/components/sections/home/ContactSection";
import EventsSection from "@/components/sections/home/EventsSection";
import GallerySection from "@/components/sections/home/GallerySection";
import HeroSection from "@/components/sections/home/HeroSection";
import TestimonialsSection from "@/components/sections/home/TestimonialsSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <EventsSection />
      <AboutSection />
      <TestimonialsSection />
      <GallerySection />
      <ContactSection />
      <Footer />
      {/* <NewsletterSignup /> */}
    </>
  );
}
