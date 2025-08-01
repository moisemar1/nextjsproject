type CabinPageProps = {
  params: {
    cabinid: string;
  };
};

export default async function CabinPage({ params }: CabinPageProps) {
  return <h1>{params.cabinid}</h1>;
}
