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

import React, { useMemo } from 'react';
import { toUrl } from 'gatsby-source-gravatar';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  icon: {
    width: '45px',
    height: '45px',
    overflow: 'hidden',
    borderRadius: '50%',
  },
}));

function GravatarIcon({
  email,
  size,
}: { email: string, size: any }) {
  const url = useMemo(() => toUrl(email || ''), []);
  const classes = useStyles();
  return (
    <img
      className={classes.icon}
      style={{
        width: size,
        height: size,
      }}
      src={url}
    />
  );
}

export default GravatarIcon;
