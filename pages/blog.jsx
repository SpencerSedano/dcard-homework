export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch("https://api.github.com/repos/vercel/next.js");
  const repo = await res.json();
  // Pass data to the page via props
  return { props: { repo } };
}

export default function Blog({ repo }) {
  return (
    <div>
      <h1>helloooo</h1>
      <p>{repo.stargazers_count}</p>
    </div>
  );
}
