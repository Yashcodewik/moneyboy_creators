import Header from "@/components/Layouts/Header";
import CmsPage from "@/components/CmsPage";

const Index = () => {
  return (
    <div className="moneyboy-layout-container">
      <Header />
      <CmsPage slug="privacy policy" defaultTitle="Privacy Policy" />
    </div>
  );
};

export default Index;