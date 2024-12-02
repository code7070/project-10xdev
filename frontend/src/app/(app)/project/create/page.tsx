import FormProject from "@/components/project/form-project";

export default function CreateProjectPage() {
  return (
    <div className="px-8 mt-6 flex flex-col gap-6 projectPage mb-40">
      <div className="w-full max-w-xl mx-auto">
        <FormProject />
      </div>
    </div>
  );
}
