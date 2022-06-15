import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { useState } from "react";
import Planet from "./Planet";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

const Planets = () => {
  const [page, setPage] = useState(1);

  const fetchPlanets = (page = 0) =>
    fetch("https://swapi.dev/api/planets/?page=" + page).then((res) =>
      res.json()
    );

  const {
    data,
    status,
    isLoading,
    isError,
    error,
  } = useQuery(["planets", "hello,ninjas", page], () => fetchPlanets(page), {
    keepPreviousData: true,
  });
  console.log("data", data, "status", status);

  return (
    <>
      <div>
        <h2>Planets</h2>
        {isLoading ? (
          <div>Loading...</div>
        ) : isError ? (
          <div>Error: {error.message}</div>
        ) : (
          <div>
            <>
              <button
                onClick={() => setPage((old) => Math.max(old - 1, 1))}
                disabled={page === 1}
              >
                Previous Page
              </button>
              <span>{page}</span>
              <button
                onClick={() =>
                  setPage((old) => (!data || !data.next ? old : old + 1))
                }
                disabled={!data || !data.next}
              >
                Next Page
              </button>
              {data.results.map((planet) => (
                <Planet key={planet.name} planet={planet} />
              ))}
            </>
          </div>
        )}
        <ReactQueryDevtools initialIsOpen={false} />
      </div>
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
