"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import PostCard from "@/components/FeedPage/PostCard";
import { getApiWithOutQuery } from "@/utils/endpoints/common";
import { API_GET_POST_BY_PUBLIC_ID } from "@/utils/api/APIConstant";

export default function FeedPostPage() {
  const { publicId } = useParams();
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    if (!publicId) return;

    getApiWithOutQuery({
      url: `${API_GET_POST_BY_PUBLIC_ID}/${publicId}`,
    }).then((res) => {
      if (res?.success) setPost(res.post);
    });
  }, [publicId]);

  if (!post) return <div style={{ padding: 20 }}>Loading...</div>;

  return (
    <div className="moneyboy-posts-wrapper">
      <PostCard post={post} onLike={() => {}} onSave={() => {}} />
    </div>
  );
}
