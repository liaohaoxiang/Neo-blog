import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
// import MarkdownIt from 'markdown-it';

import remark from 'remark';
import markdown from 'remark-parse';
import html from 'remark-html';
import highlight from 'remark-highlight.js';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);
    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    };
  });
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    // if (a.date < b.date) {
    //   return 1
    // } else {
    //   return -1
    // }
    return a.date - b.date;
  });
}

//获取posts文件夹里的所有md文件的名称
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);
  //使用md库把markdown文件内容转换成html结构
  // const content = await md.render(matterResult.content);
  // console.log('matterResult',matterResult);
  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(markdown)
    .use(highlight)
    .use(html)
    .process(matterResult.content);
  const content = processedContent.toString();
  // Combine the data with the id
  return {
    id,
    content,
    ...matterResult.data,
  };
}
