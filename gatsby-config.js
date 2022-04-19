/** @type {import('gatsby').GatsbyConfig} */

const activeEnv = process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || 'dev';
const containers = require('remark-containers');
require('dotenv')
    .config();
// const unwrapImages = require('remark-unwrap-images');

require('dotenv')
    .config({
        path: `.env.${activeEnv}`,
    });

let algoliaApiKey = process.env.ALGOLIA_DEV_API_KEY;
let algoliaIndex = process.env.GATSBY_ALGOLIA_DEV_INDEX_NAME;
switch (process.env.GATSBY_DEPLOY_ENV) {
    case 'main':
        algoliaApiKey = process.env.ALGOLIA_MAIN_API_KEY;
        break;
    case 'prod':
        algoliaApiKey = process.env.ALGOLIA_PROD_API_KEY;
        algoliaIndex = process.env.GATSBY_ALGOLIA_PROD_INDEX_NAME;
        break;
    default:
    // Assume dev environment.
}



module.exports = {
    siteMetadata: {
        title: 'Pixie Labs Blog',
        description: 'Pixie Blog',
        author: 'Pixie Labs',
        siteUrl: 'https://blog.px.dev',
    },
    plugins: [
        'gatsby-plugin-top-layout',
        'gatsby-plugin-sass',
        'gatsby-plugin-react-helmet',
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                'name': 'images',
                'path': './src/images/'
            },
            __key: 'images'
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                'name': 'pages',
                'path': './src/pages/'
            },
            __key: 'pages'
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: 'images',
                path: `${__dirname}/src/images`,
            },
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                path: `${__dirname}/content/blog`,
                name: 'posts',
            },
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                path: `${__dirname}/content`,
                name: 'data',
            },
        },
        {
            resolve: 'gatsby-plugin-react-helmet-canonical-urls',
            options: {
                siteUrl: 'https://blog.px.dev',
            },
        },
        {
            resolve: 'gatsby-plugin-mdx',
            options: {
                gatsbyRemarkPlugins: [
                    {
                        resolve: 'gatsby-remark-relative-images',
                    },
                    {
                        resolve: 'gatsby-remark-images',
                        options: {
                            maxWidth: 1035,
                            showCaptions: true,
                            markdownCaptions: false,
                            linkImagesToOriginal: false,
                        },
                    },
                    {
                        resolve: 'gatsby-remark-copy-linked-files',
                    },
                ],
                remarkPlugins: [containers],
                extensions: ['.mdx', '.md'],
            },
        },
        'gatsby-plugin-sharp',
        'gatsby-transformer-sharp',
        {
            resolve: 'gatsby-remark-unwrap-images',
        },
        'gatsby-plugin-mui-emotion',
        'gatsby-transformer-yaml',
        'gatsby-plugin-netlify',
        'gatsby-plugin-sitemap',
        {
            resolve: 'gatsby-plugin-google-fonts',
            options: {
                fonts: [
                    'manrope:400,700',
                    'roboto:400,700',
                ],
                display: 'block',
            },
        },
        {
            resolve: 'gatsby-plugin-manifest',
            options: {
                name: 'gatsby-starter-default',
                short_name: 'starter',
                start_url: '/',
                background_color: '#132E38',
                theme_color: '#132E38',
                display: 'minimal-ui',
                icon: 'src/images/p_circle_big.png', // This path is relative to the root of the site.
                include_favicon: false,
            },
        },
        {
            // This plugin must be placed last in your list of plugins to ensure that it can query
            // all the GraphQL data.
            resolve: 'gatsby-plugin-algolia',
            options: {
                appId: process.env.GATSBY_ALGOLIA_APP_ID,
                // Use Admin API key without GATSBY_ prefix, so that the key isn't exposed in the application.
                // Tip: use Search API key with GATSBY_ prefix to access the service from within components.
                apiKey: algoliaApiKey,
                indexName: algoliaIndex, // for all queries
                // eslint-disable-next-line global-require
                queries: require("./src/utils/algolia-queries"),
                settings: {
                    // optional, any index settings
                    searchableAttributes: [
                        'value',
                    ],
                },
                enablePartialUpdates: true,
                matchFields: ['slug', 'modified'],
            },
        }
    ],
    mapping: {
        'Mdx.frontmatter.authors': 'authorYaml',
    },
};
