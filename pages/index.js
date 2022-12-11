import Head from "next/head";
import EventList from "../components/events/event-list";
import { getFeaturedEvents } from "../helpers/api-utils";

export default function Home(props) {
  const { featuredEvents } = props;
  return (
    <div>
      <Head>
        <title>Events</title>
        <meta name="description" content="Find a lot of great events that allow you to evolve" />
      </Head>
      <EventList items={featuredEvents} />
    </div>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      featuredEvents,
    },
    revalidate: 1800,
  };
}
