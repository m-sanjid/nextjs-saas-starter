import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href="/" className="inline-flex items-center gap-2">
      <Image src="/logo.svg" alt="Logo" width={32} height={32} />
      <span className="text-xl font-bold">Logo</span>
    </Link>
  );
};

export default Logo;
