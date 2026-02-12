import ProblemWorkspace from '@/app/components/ProblemWorkspace';

export default async function ProblemPage({ 
  params,
  searchParams 
}: { 
  params: Promise<{ category: string; slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { category, slug } = await params;
  const { room } = await searchParams;
  
  // Ensure room is a string if present
  const roomId = typeof room === 'string' ? room : undefined;

  return <ProblemWorkspace params={{ category, slug }} roomSessionId={roomId} />;
}
