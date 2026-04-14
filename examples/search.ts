import { ParagraphAPI } from "../src";

// Search endpoints are public — no API key needed
const api = new ParagraphAPI();

async function main() {
  // Search for posts
  const posts = await api.search.posts("ethereum");
  console.log(
    "Posts found:",
    posts.map((p) => p.post.title)
  );

  // Search for blogs (publications)
  const blogs = await api.search.blogs("web3");
  console.log(
    "Blogs found:",
    blogs.map((b) => b.blog.name)
  );

  // Search for coins
  const coins = await api.search.coins("test");
  console.log(
    "Coins found:",
    coins.map((c) => c.coin.ticker)
  );
}

main().catch(console.error);
