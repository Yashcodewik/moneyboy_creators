import Header from "@/components/Layouts/Header";
import CmsPage from "@/components/CmsPage";

const Index = () => {
  return (
    <div className="moneyboy-layout-container">
      <Header />
      <CmsPage slug="terms-of-service" defaultTitle="Terms of Service" />
    </div>
  );
};

export default Index;