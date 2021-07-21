import Head from "next/head";
import { useState } from "react";
import classNames from "classnames";

import Layout, { siteTitle } from "../component/layout";
import BlogList from "../component/blogList";
import Footer from "../component/footer";
import { getSortedPostsData } from "../lib/posts";

export default function Home({ allPostsData }) {
  const navBar = ["Base", "Tech", "Life", "About"];
  const [currentPath, setCurrentPath] = useState("Base");
  const [currentActive, setCurrentActive] = useState(0);
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section>
        <p className="flex justify-center my-4 text-xs sm:text-sm lg:text-lg  text-gray-700 ">
          Record Life and Technology in this Blog.
        </p>
      </section>
      <section>
        {/* NavBar in index */}
        <ul className="blog-list-ul nav__list-style-none">
          {navBar.map((nav, index) => (
            <li
              key={index}
              onClick={() => {
                setCurrentPath(nav);
                setCurrentActive(index);
              }}
              className={classNames("blog-list-li", {
                "is-active": currentActive === index,
              })}
            >
              {nav}
            </li>
          ))}
        </ul>
        {/* 展示blog内容,来源自lib/post的getSortedPostsData获取本地md文件展示 */}
        <BlogList blogData={allPostsData} current={currentPath} />
      </section>
      <footer>
        <Footer />
      </footer>
    </Layout>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}
