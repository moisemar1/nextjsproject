type CabinPageProps = {
  params: Promise<{ cabinid: string }>;
};

export default async function CabinPage({ params }: CabinPageProps) {
  const finishedParams = await params;
  return <h1>{finishedParams.cabinid}</h1>;
}
