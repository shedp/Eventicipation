"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "@react-hook/media-query";

const Logo = () => {
  const router = useRouter();
  const isSmallScreen = useMediaQuery("(max-width: 770px)");
  const src = isSmallScreen ? "/images/favicon.png" : "/images/logo.png";
  const width = isSmallScreen ? "60" : "180";

  if (isSmallScreen) {
    return (
      <Image
        onClick={() => router.push("/")}
        alt="logo"
        className="curser-pointer small-logo"
        width="56"
        height="56"
        src="/images/favicon.png"
      />
    );
  }

  return (
    <Image
      onClick={() => router.push("/")}
      alt="logo"
      className="curser-pointer large-logo"
      width="180"
      height="60"
      src="/images/logo.png"
    />
  );
};

export default Logo;
