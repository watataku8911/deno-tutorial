/** @jsx h */
import { h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/src/runtime/head.ts";
import { tw } from "@twind";
import Card from "../islands/Card.tsx";
type Response = {
  feed: Feed;
  items: Items[];
  status: string;
};

type Feed = {
  author: string;
  description: string;
  image: string;
  link: string;
  title: string;
  url: string;
};

type Items = {
  author: string;
  categories: string[];
  content: string;
  description: string;
  enclosure: Enclosure;
  guid: string;
  link: string;
  pubDate: string;
  thumbnail: string;
  title: string;
};

type Enclosure = {
  link: string;
  type: string;
};

export const handler: Handlers<Response | null> = {
  async GET(_, ctx) {
    const endpoint = "https://api.rss2json.com/v1/api.json";
    const feed_url = "https://zenn.dev/watataku/feed";

    const resp: globalThis.Response = await fetch(
      `${endpoint}?rss_url=${feed_url}`
    );
    const data: Response = await resp.json();

    return ctx.render(data);
  },
};
export default function Home({ data }: PageProps<Response | null>) {
  return (
    <div>
      <Head>
        <title>Fresh tutorial</title>
        <link rel="stylesheet" href="/Card.css" />
      </Head>
      <section>
        <h1>Fresh tutorial</h1>
        <nav>
          <p>
            <a href="/about">About</a>
          </p>
          <p>
            <a href="/greet/fresh">greet</a>
          </p>
          <p>
            <a href="/github/denoland">github</a>
          </p>
          <p>
            <a href="/countdown">countdown</a>
          </p>
        </nav>
      </section>
      <main>
        <h2>WatatakuのZenn</h2>
        <ul>
          {data?.items.map((item, index) => {
            return (
              <Card
                link={item.link}
                imagePath={item.thumbnail}
                title={item.title}
                key={index}
              />
            );
          })}
        </ul>
      </main>
    </div>
  );
}
