import { Loader } from "@/components/Loader";
import { Nav } from "@/components/Nav";
import { ScrollProgress } from "@/components/ScrollProgress";
import { WhatsAppFAB } from "@/components/WhatsAppFAB";
import { Hero } from "@/components/sections/Hero";
import { Statement } from "@/components/sections/Statement";
import { Cifras } from "@/components/sections/Cifras";
import { Productos } from "@/components/sections/Productos";
import { Sectores } from "@/components/sections/Sectores";
import { Proceso } from "@/components/sections/Proceso";
import { Cobertura } from "@/components/sections/Cobertura";
import { Aliados } from "@/components/sections/Aliados";
import { CtaFinal } from "@/components/sections/CtaFinal";
import { Footer } from "@/components/sections/Footer";

export default function Page() {
  return (
    <>
      <Loader />
      <ScrollProgress />
      <Nav />
      <WhatsAppFAB />
      <main>
        <Hero />
        <Statement />
        <Cifras />
        <Productos />
        <Sectores />
        <Proceso />
        <Cobertura />
        <Aliados />
        <CtaFinal />
        <Footer />
      </main>
    </>
  );
}
