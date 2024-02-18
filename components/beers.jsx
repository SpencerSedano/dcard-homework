export function Beers({ beers }) {
  return (
    <>
      {beers ? (
        beers.map((beer) => (
          <h1 key={beer.id}>
            <div className="flex flex-col items-center justify-center p-4">
              <img
                src={beer.image_url}
                alt={beer.name}
                className="object-contain h-48 rounded"
              />
            </div>
            <div className="text-center flex flex-col p-4">
              <p className="my-2">{beer.name}</p>
              <h3>{beer.tagline}</h3>
            </div>
          </h1>
        ))
      ) : (
        <div className="text-xl font-bold">No beers available !! </div>
      )}
    </>
  );
}
