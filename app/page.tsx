import Categories from "./Categories";
import Hero from "./Hero";
import Inspirations from "./Inspirations";
import Products from "./Products";
import Share from "./Share";

export default function Home() {
  return (
    <div>
    <Hero/>
    <Categories/>
    <Products/>
    <Inspirations/>
    <Share/>
    </div>
  );
}
