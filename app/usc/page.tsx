import Header from "@/components/Layouts/Header";
import CmsPage from "@/components/CmsPage";

const Index = () => {
  return (
    <div className="moneyboy-layout-container">
      <Header />
      <CmsPage slug="usc2257" defaultTitle="U.S.C 2257" />
    </div>
  );
};

export default Index;