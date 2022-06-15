import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { useState } from "react";
import Person from "./Person";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

const People = () => {
  const [page, setPage] = useState(1);

  const fetchPeople = (page = 0) =>
    fetch("https://swapi.dev/api/people/?page=" + page).then((res) =>
      res.json()
    );

  const {
    data,
    status,
    isLoading,
    isError,
    error,
  } = useQuery(["people", "hello,ninjas", page], () => fetchPeople(page), {
    keepPreviousData: true,
  });

  return (
    <>
    <div>
      <h2>People</h2>
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
            {data.results.map((person) => (
              <Person key={person.name} person={person} />
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
      <People />
    </QueryClientProvider>
  );
}
