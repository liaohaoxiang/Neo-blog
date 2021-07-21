import Head from 'next/head'

import Layout from '../../component/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head> 
      <article className="">
      <h1 className="text-sm sm:text-3xl font-extrabold my-4 leading-tight">{postData.title}</h1>
      {/* {postData.id} */}
      <div className="text-sm text-gray-500">编辑于:{postData.date}</div>
      <br />
      <div dangerouslySetInnerHTML={{ __html: postData.content }}></div>
      </article>
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

//从客户端拿到props，这是静态渲染页面
export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}