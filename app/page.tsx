import Categories from "./Categories";
import Hero from "./Hero";
import Inspirations from "./Inspirations";
import Products from "./Products";
import Share from "./Share";
import PromotionalBanner from "./components/PromotionalBanner";

export default function Home() {
  return (
    <>
      <Hero/>
      <PromotionalBanner placement="home" />
      <Categories/>
      <Products/>
      <Inspirations/>
      <Share/>
    </>
  );
}
