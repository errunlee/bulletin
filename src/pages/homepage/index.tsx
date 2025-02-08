import NewsFeed from "@/components/homepage/newsfeed";
import PartnersSection from "@/components/homepage/partnersSection";
import TopPicks from "@/components/homepage/toppicks";

const Homepage = () => {
  return (
    <div className=" ">
      <section className="md:grid lg:grid-cols-3 gap-3">
        <div className="md:col-span-2">
          <NewsFeed />
        </div>
        <aside className="p-3">
          <PartnersSection />
          <TopPicks />
        </aside>
      </section>
    </div>
  );
};

export default Homepage;
