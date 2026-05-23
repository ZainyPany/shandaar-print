import Hero from "@/components/sections/Hero";
import BrandStatement from "@/components/sections/BrandStatement";
import ProductGrid from "@/components/sections/ProductGrid";
import Customizer from "@/components/sections/Customizer";
import AboutBrand from "@/components/sections/AboutBrand";
import Newsletter from "@/components/sections/Newsletter";

export default function Page() {
  return (
    <>
      <Hero />
      <BrandStatement />
      <ProductGrid />
      <Customizer />
      <AboutBrand />
      <Newsletter />
    </>
  );
}
