# Contributing Guidelines

---

`// TODO: How can we clarify this?`
Additional features beyond the weblog and static site should be documented and proposed in a new directory pushed to the /dev branch.
Feature proposals should include the proposed functionality, purpose, a timeline for development, and list any
additional Gatsby plugins needed (or external technologies required).

# Getting Started

---

To get started, fork this repo and open it in your editor of choice. For the best developer experience, [VSCode](code.visualstudio.com/download) is recommended, as are the recommended extensions configured for the workspace.

## Prerequisites:
 - [Node.js](https://nodejs.org/en/download/)
 - npm 16.4.2 (later versions are not yet supported). You can use [nvm](https://github.com/nvm-sh/nvm) for switching between versions.
 - gatsby-cli
 - yarn

**Install nvm**:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```
or, using wget:
```bash
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```
 
**Install npm and yarn**:

```bash
nvm install 16.14.2
npm install -g yarn
```

**Install dependencies**:

```bash
 yarn global add gatsby-cli && yarn install
```

**Start the development server:**
```bash
yarn run develop
```

If you encounter unexpected behavior, first try clearing the cache and generated types with `yarn run clean`.

**It is highly recommended that you familiarize yourself with the following**:

- [React 17+](https://reactjs.org/docs/getting-started.html#learn-react) (especially [React Hooks](https://reactjs.org/docs/hooks-reference.html))
- [Gatsby 4+](#gatsby)
- [GraphQL](#graphql)
- [Tailwind CSS](#tailwind)
- [Typescript](#typescript) (_Optional_)

If you can't install VSCode locally, you can use it in the browser for free with either [vscode.dev](vscode.dev) or [Gitpod](gitpod.io), both of which you can use with your Github account. Gitpod's free tier includes 50hours/month. Unfortunatly, the recommended workspace extensions currently only work in the browser when using Gitpod.

## Gatsby

---

**[Full Documentation](https://www.gatsbyjs.com/docs/)**

Gatsby is a React framework for building static websites. It's main feature is a Graph-QL data layer which is composed from the configured data sources at build-time. For example, the data can be sourced from the filesystem, external database queries, or API calls. This project currently pulls data from the following sources:

- [gatsby-source-filesystem](https://www.gatsbyjs.com/plugins/gatsby-source-filesystem) pulls from the filesystem to add the following nodes to the GraphQL schema:
  - file / allFile
  - dir / allDir
  - markdownRemark / allMarkdownRemark (via [gatsby-transformer-remark](https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-transformer-remark/README.md))
  - imageSharp / allImageSharp (via [gatsby-transformer-sharp](https://www.gatsbyjs.com/plugins/gatsby-transformer-sharp/))
- **Coming Soon**: [gatsby-source-apiserver](https://www.gatsbyjs.com/plugins/gatsby-source-apiserver) will add Nodes for event data fetched from the Meetup API

## GraphQL

---

**[Full Documentation](https://graphql.org/learn/)**

While a full understanding of GraphQL is not required in order to contribute, the following guidelines provide context for GraphQL features used in this website and their relation to the Gatsby framework.

### **GraphQL in Gatsby** ([docs](https://www.gatsbyjs.com/docs/reference/graphql-data-layer/))

If you already have the GraphQL query defined for the feature you're working on, you don't need to know much (if anything) about GraphQL.

- [Read Here](#typescript) to see how you can get code hinting and type checking for the data returned by queries
- [Read Here](#graphql-in-components) to learn about consuming queries in components
- [Read Here](#graphql-in-pages) to learn about consuming queries in Pages (including pages generated by gatsby-node.ts)

If you are creating, editing, or extending a GraphQL query, see [Creating Queries](#creating-queries) below.

#### **GraphQL in Components**

GraphQL queries can be used in components in one of two ways

- The [StaticQuery component](https://www.gatsbyjs.com/docs/how-to/querying-data/static-query/)
- The [useStaticQuery Custom Hook](https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/)

#### **GraphQL in Pages**

GraphQL queries in pages are exported from the page component and passed into the component as props.

Read more about **[page queries](https://www.gatsbyjs.com/docs/how-to/querying-data/page-query/)**

Read about using **[arguments](https://graphql.org/learn/queries/#arguments)** in GraphQL queries

### **Creating Queries** ([docs](https://www.gatsbyjs.com/docs/how-to/querying-data/))

When creating GraphQL Queries, please follow the following guidelines:

- Make use of the GraphiQL explorer at [host]:[port]/\_\_graphql
- Name your queries (this makes it easy to use types generated by gatsby-plugin-graphql-codegen)

In addition to the nodes [described above](#gatsby), The following nodes in the GraphQL schema store information about the project and site metadata:

 - site / allSite
 - siteBuildMetadata / allSiteBuildMetadata
 - siteFunction / allSiteFunction
 - sitePage / allSitePage
 - sitePlugin / allSitePlugin

## Tailwind

---

**[Full Documentation](https://tailwindcss.com)**

If you're unfamiliar with Tailwind CSS, you'll want to brush up on the [Core Concenpts](https://tailwindcss.com/docs/utility-first).

It's recommended that developers stick with the idiomatic approach of preferring in-line utility classes. The recommended vscode extensions in this workspace enable code hinting for the predefined classes.

## Typescript

---

**[Full Documentation](https://www.typescriptlang.org/docs/)**

Using Typescript is optional (though recommended). TypeScript is supported, out of the box, by [gatsby-plugin-typescript](https://www.gatsbyjs.com/plugins/gatsby-plugin-typescript)

If you don't want to use typescript, simply create any new files with a `.js` or `.jsx` file extension, and ignore any TypeScript warnings (indicated by `ts(...)` near the end of the warning) in existing `.ts` or `.tsx` files.

Check out the [React-Typescript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/) for an excellent reference on all things React + TypeScript.

Data returned from a GraphQL query can be typed by [gatsby-plugin-graphql-codegen](https://www.gatsbyjs.com/plugins/gatsby-plugin-graphql-codegen). Check out the existing Typescript files for examples.

In summary:

1. Name any GraphQL queries (ensure that query names do not conflict).
2. Import the type from `gatsby-graphql.ts` as `[QueryName]Query`.
3. For components, type the props passed to the componenet using the imported type.
4. For pages, import the `PageProps` type from `gatsby`, and use it to wrap the imported types to create the prop type, e.g. `type Props = PageProps< [QueryName]Query >`.

**Note:** It is recommended to seperate type imports from regular imports using the `import type { x } from "y"` syntax in order to reduce the size of the production bundle.