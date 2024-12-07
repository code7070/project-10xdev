"use client";

import FormProject from "@/components/project/form-project";
import { useProjectDetail } from "@/services/useProjectServices";
import { Loader } from "lucide-react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function CreateProjectPage() {
  const router = useRouter();

  const params = useParams<{ id: string }>();

  const { data, isLoading, mutate } = useProjectDetail(true, params.id);

  function onSuccess() {
    toast.success("Project berhasil diupdate");
    mutate();
    router.push("/project");
  }

  return (
    <div className="page-wrapper projectPage mb-40">
      <div className="w-full max-w-xl mx-auto">
        {isLoading && !(data && data.data && data.data.id) ? (
          <Loader className="size-8 animate-spin" />
        ) : (
          <FormProject
            defaultValues={data && data.data ? data.data : {}}
            isEdit
            onSuccess={onSuccess}
          />
        )}
      </div>
    </div>
  );
}
