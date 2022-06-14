import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { useState } from "react";
import Planet from "./Planet";
import { ReactQueryDevtools } from "react-query/devtools";

const fetchPlanets = async (key, greeting, page) => {
  console.log(greeting);
  const result = await fetch(`https://swapi.dev/api/planets/?page=${page}`);
  return result.json();
};

const queryClient = new QueryClient();

const Planets = () => {
  const [page, setPage] = useState(1);
  const { data, status } = useQuery(["planets", "hello,ninjas", page], fetchPlanets);
  console.log("data", data, "status", status);

  return (
    <>
      <div>
        <h2>Planets</h2>

        <button onClick={() => setPage(3)}>page 3</button>
        {status === "loading" && <div>Loading data ...</div>}

        {status === "error" && <div>Error fetching data</div>}

        {status === "success" && (
          <div>
            {data.results.map((planet) => (
              <Planet key={planet.name} planet={planet} />
            ))}
          </div>
        )}
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
};

export default function Wraped() {
  return (
    <QueryClientProvider client={queryClient}>
      <Planets />
    </QueryClientProvider>
  );
}
