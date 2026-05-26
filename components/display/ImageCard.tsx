import Image from "next/image";
import React from "react";

interface ImageCardProps {
  mediaDetail: {
    poster_path: string | null;
    title?: string;
    name?: string;
  };
}

const ImageCard = ({ mediaDetail }: ImageCardProps) => {
  let poster_path = `https://image.tmdb.org/t/p/w342/${mediaDetail.poster_path}`;
  if (mediaDetail.poster_path === null) {
    poster_path = "https://i.imgur.com/wjVuAGb.png";
  }
  return (
    <div className="w-52 h-72 rounded-3xl overflow-hidden border border-white/10 bg-[#090909] shadow-[0_20px_60px_-30px_rgba(229,9,20,0.55)] m-3">
      <Image
        src={poster_path}
        alt={`${
          mediaDetail.title || mediaDetail.name || "Untitled"
        } poster image`}
        className="h-full w-full object-cover"
        width={208}
        height={288}
        unoptimized
      />
    </div>
  );
};

export default ImageCard;
