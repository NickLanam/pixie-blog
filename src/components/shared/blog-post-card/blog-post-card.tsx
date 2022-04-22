/*
 * Copyright 2018- The Pixie Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link } from 'gatsby';

import { Box } from '@mui/system';
import { Chip, Typography } from '@mui/material';
import { GatsbyImage } from 'gatsby-plugin-image';
import slugify from 'slugify';
import { urlFromSlug } from '../../utils';
import PostPlaceholder from '../../post-placeholder';
import GravatarIcon from '../../gravatar';
import BlogAuthorsHeader from '../blog-authors-header';

// @ts-ignore
function BlogPostCard({ post }) {
  const {
    excerpt,
    timeToRead,
    frontmatter: {
      title,
      categories,
      featured_image: featuredImage,
      authors,
      date,
    },
    fields: { slug },
  } = post;
  return (
    <article className='blog-post-card'>
      <Link to={urlFromSlug(slug)}>
        <Box borderRadius='10px' className='blog-post-card-image'>
          {featuredImage
            ? <GatsbyImage image={featuredImage.childImageSharp.gatsbyImageData} alt={title} />
            : <PostPlaceholder />}
        </Box>
      </Link>

      <Box mb={4}>
        <Link to={urlFromSlug(slug)}>
          <Typography variant='h5' sx={{ mt: 3 }}>{title}</Typography>
          <Typography variant='body1' sx={{ my: 2 }}>{excerpt}</Typography>
          <BlogAuthorsHeader authors={authors} timeToRead={timeToRead} date={date} />
        </Link>
        {(categories || []).map((c:string) => (

          <Chip
            variant='outlined'
            size='small'
            clickable
            component={Link}
            to={`/${slugify(c)
              .toLowerCase()}`}
            sx={{
              mr: 1, fontSize: 12, mt: 1, cursor: 'pointer',
            }}
            label={c}
          />
        ))}
      </Box>
    </article>
  );
}

export default BlogPostCard;
