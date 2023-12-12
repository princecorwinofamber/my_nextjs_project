import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import { getSortedPostsData } from '../lib/posts';
import Date from '../components/date';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';


console.log("index.js run");

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  const [postText, setPostText] = useState('Type here!');

  const router = useRouter();

  useEffect(() => {
    router.push('/threads-overview');
  }, []);

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Link href="/threads-overview">Threads</Link>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>          
          ))}
        </ul>
      </section>
      <section className={utilStyles.headingMd}>
        <p>[Your Self Introduction]</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
        <h1>
          Read <Link href="/posts/first-post">this page!</Link>
        </h1>
      </section>
      <input type="text" value={postText} onChange={(ev) => setPostText(ev.target.value)} />
      <button onClick={() => fetch(`/api/post?thread_id=${1}&author_id=${3}&postText=${postText}`)}>
        Post a cat photo!
      </button>
    </Layout>
  );
}
