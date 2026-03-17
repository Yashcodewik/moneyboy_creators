import PostPage from "@/components/PostPage/index";
import { Metadata } from "next";

async function getPost(publicId: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/post/${publicId}`,
      { cache: "no-store" }
    );
    return res.json();
  } catch {
    return null;
  }
}

export async function generateMetadata({ searchParams }: any): Promise<Metadata> {
  const publicId = searchParams.publicId;

  if (!publicId) return {};

  const post = await getPost(publicId);

  // 🔥 VERY IMPORTANT (match your structure)
  const image =
    post?.media?.[0]?.mediaFiles?.[0] ||
    "https://yourdomain.com/default.jpg";

  const text = post?.text || "Check out this post";

  return {
    title: text,
    description: text,
    openGraph: {
      title: text,
      description: text,
      url: `https://yourdomain.com/post?publicId=${publicId}`,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: text,
      description: text,
      images: [image],
    },
  };
}

const Index = () => {
  return <PostPage />;
};

export default Index;