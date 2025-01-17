import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRemarkSync } from "react-remark";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
//import rehypeDocument from "rehype-document";
import rehypeSanitize from "rehype-sanitize";
import rehypeHighlight from "rehype-highlight";
import rehypeFormat from "rehype-format";

import SeoHead from "../../features/SeoHead";
import DefaultLayout from "../../features/DefaultLayout";
import customComponentMap from "../../features/blog/components/prose";
import blogPostsSingleton from "../../features/blog/blogdata";
import { hostname } from "../../constants";

import type { GetStaticPaths, GetStaticProps } from "next";
import type { NextPageWithLayout } from "../_app";
import type { BlogPost } from "../../features/blog/blogdata";

/**
 * @see https://nextjs.org/docs/basic-features/data-fetching/get-static-paths
 * @see https://nextjs.org/docs/api-reference/data-fetching/get-static-paths
 * @returns an instance of `Promise<GetStaticPathsResult<{slug: string}>>`
 */
export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  const blogs = await blogPostsSingleton;
  return {
    // Map blog slugs to URL paths
    paths: Array.from(blogs.keys()).map((slug) => `/blog/${slug}`),
    // Paths not returned here result in a 404 response
    fallback: false,
  };
};

/**
 * @returns an object with a property `props` of type `BlogPost`
 * @see https://nextjs.org/docs/basic-features/data-fetching/get-static-props
 * @see https://nextjs.org/docs/api-reference/data-fetching/get-static-props
 */
export const getStaticProps: GetStaticProps<
  BlogPost,
  { slug: string },
  never
> = async ({ params }) => {
  // Nullish parameters should resolve to blog/index.tsx, so we can assert `params` does exist with '!'
  // We also know every slug came from a valid blog entry, so we can assert that `blog` is not null, too.
  return { props: (await blogPostsSingleton).get(params!.slug)! };
};

const BlogPage: NextPageWithLayout<BlogPost> = (props) => {
  //render the markdown into react components with react-remark
  const rendered = useRemarkSync(props.markdown, {
    //@ts-expect-error
    remarkPlugins: [[remarkParse], [remarkGfm]],
    //@ts-expect-error
    rehypePlugins: [[rehypeSanitize], [rehypeHighlight], [rehypeFormat]],
    onError: (error) => {
      throw error;
    },
    rehypeReactOptions: {
      Fragment: React.Fragment,
      createElement: React.createElement,
      prefix: "react-rehype-generated",
      components: customComponentMap
    },
  });

  return (
    <>
      <SeoHead
        title={props.title}
        description={props.preview}
        url={`${hostname}${useRouter().route}`}
      />
      <article>
        <address>
          by: {props.author}
          <br />
          <small>{props.date}</small>
        </address>
        {rendered}
      </article>
      {props.prev && (
        <Link href={`/blog/${props.prev}`}>
          <a>{"< [ Previous Post ]"}</a>
        </Link>
      )}
      <Link href="/blog">
        <a>{"[ All Posts ]"}</a>
      </Link>
      {props.next && (
        <Link href={`/blog/${props.next}`}>
          <a>{"[ Next Post ] > "}</a>
        </Link>
      )}
    </>
  );
};

// Override the default layout, if desired
BlogPage.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export default BlogPage;
