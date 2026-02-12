import ProblemWorkspace from '@/app/components/ProblemWorkspace';

export default async function ProblemPage({ params }: { params: Promise<{ category: string; slug: string }> }) {
  const { category, slug } = await params;
  return <ProblemWorkspace params={{ category, slug }} />;
}
