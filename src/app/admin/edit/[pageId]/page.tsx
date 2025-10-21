import { LandingPageEditor } from "@/components/admin/LandingPageEditor";

interface PageProps {
  params: {
    pageId: string;
  };
}

export default function EditPage({ params }: PageProps) {
  return <LandingPageEditor pageId={params.pageId} />;
}
