import Header from "@/components/Layouts/Header";
import CmsPage from "@/components/CmsPage";

const Index = () => {
  return (
    <div className="moneyboy-layout-container">
      <Header />
      <CmsPage slug="dmca" defaultTitle="DMCA" />
    </div>
  );
};

export default Index;