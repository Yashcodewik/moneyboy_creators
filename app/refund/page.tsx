import Header from "@/components/Layouts/Header";
import CmsPage from "@/components/CmsPage";

const Index = () => {
  return (
    <div className="moneyboy-layout-container">
      <Header />
      <CmsPage slug="refund & cancellation policy" defaultTitle="Refund & Cancellation Policy"/>
    </div>
  );
};

export default Index;