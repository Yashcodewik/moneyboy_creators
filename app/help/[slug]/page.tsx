import Header from "@/components/Layouts/Header";
import CmsPage from "@/components/CmsPage";

const slugMap: Record<string, { slug: string; title: string }> = {
  faq: {
    slug: "frequently_asked_questions",
    title: "Frequently Asked Questions",
  },
  "for-creators": {
    slug: "creators_on_moneyboy",
    title: "For Creators",
  },
  "how-it-works": {
    slug: "moneyboy_works",
    title: "How It Works",
  },
  "what-is-moneyboy": {
    slug: "what_is_money_boy",
    title: "What Is Moneyboy",
  },
};

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const page = slugMap[slug];
  if (!page) {
    return (
      <div className="nofound h-full">
        <h3 className="first">Page not found</h3>
        <h3 className="second">Page not found</h3>
      </div>
    );
  }

  return (
    <div className="moneyboy-layout-container">
      <Header />
      <CmsPage
        slug={page.slug}
        defaultTitle={page.title}
        backUrl="/help?tab=guides"
      />
    </div>
  );
}
