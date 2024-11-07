import { useQuery } from "@tanstack/react-query";
import ServiceCard from "./ServiceCard";

const Services = () => {
  const {
    isPending,
    isError,
    error,
    data: services,
  } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const result = await fetch("http://localhost:5000/services");
      return result.json();
    },
  });

  if (isPending) {
    return <span className="loading loading-spinner text-primary"></span>;
  }
  if (isError) {
    return <p className="text-red-500 text-3xl">{error.message}</p>;
  }

  return (
    <div className="mt-14">
      <div className="text-center">
        <h3 className="text-3xl text-red-500 font-bold">Service</h3>
        <h3 className="text-5xl text-black font-bold">Our Service Area</h3>
        <p>
          the majority have suffered alteration in some form, by injected
          humour, or randomised <br />
          words which dont look even slightly believable.{" "}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <ServiceCard key={service._id} service={service} />
        ))}
      </div>
    </div>
  );
};

export default Services;
