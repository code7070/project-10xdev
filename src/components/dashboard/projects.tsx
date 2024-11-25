import BrandArrow from "../brand-arrow";
import OrnamentBox from "../ornament-box";

export default function DashboardProjects() {
  return (
    <div className="relative w-full rounded-app-radius bg-stone-800 text-white py-8 px-6 flex flex-col gap-4 justify-between">
      <div className="w-full flex justify-between">
        <div className="text-[24px] font-semibold font-secondary">Projects</div>
        <BrandArrow arrowColor="#292524" circleColor="#fff" size="md" />
      </div>
      <div>
        <div className="font-semibold font-secondary text-5xl">3</div>
        <div className="text-sm">Active projects</div>
      </div>
      <div className="absolute bottom-0 right-0 p-2">
        <OrnamentBox />
      </div>
    </div>
  );
}
