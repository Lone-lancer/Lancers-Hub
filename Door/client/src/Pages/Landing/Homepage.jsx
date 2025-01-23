import { Fragment } from "react";
import Header from "../../Components/Landing/Header";
import Hero2 from "../../Components/Landing/Hero2";
import About2 from "../../Components/Landing/About2";
import AboutTab from "../../Components/Landing/AbourTab";
import TeamSection from "../../Components/Landing/TeamSection";
import PartnerSection from "../../Components/Landing/PartnerSection";
import Footer from "../../Components/Landing/Footer";
import Scrollbar from "../../Components/Landing/Scrollbar";

const Homepage = () => {
  return (
    <Fragment>
      <div>
        <Header hclass={"header--styleTwo"} />
        <main className="page_content">
          <Hero2 />
          <About2 />
          <AboutTab />
          <TeamSection />
          <PartnerSection />
          <Footer />
        </main>
        <Scrollbar />
      </div>
    </Fragment>
  );
};
export default Homepage;
