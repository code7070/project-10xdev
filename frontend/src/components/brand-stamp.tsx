import Image from "next/image";

export default function BrandStamp() {
  return (
    <div className="pointer-events-none flex flex-col gap-1 items-center text-gray-400 select-none">
      <div className="pointer-events-none text-xs">Design & developed by</div>
      <Image
        alt="Underline"
        title="Underline"
        src="/underline-logo.png"
        width={108}
        height={24}
        quality={100}
        className="block pointer-events-none"
      />
      <div className="text-[6px] animate-bounce pointer-events-none">
        Please pay to remove this badge
      </div>
    </div>
  );
}
