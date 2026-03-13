import Header from "@/components/Layouts/Header";
import CmsPage from "@/components/CmsPage";

export default function Page() {
  return (
    <div className="moneyboy-layout-container">
      <Header />
      <CmsPage slug="help & support" defaultTitle="Help & Support" showGuidesTab/>
    </div>
  );
}