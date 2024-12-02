import "@/styles/project-create.css";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function CreateBanner() {
  return (
    <div className="projectBannerCreate">
      <div className="inner">
        <div>
          <h1 className="title">Projects</h1>
          <div className="desc">Managed your project and tasks</div>
        </div>
        <div>
          <Button variant="appWhite" size="lg" asChild>
            <Link href="/project/create" className="flex gap-2 items-center">
              <Plus /> Create New with AI
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
