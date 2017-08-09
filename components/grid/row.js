/**
 * Copyright 2017 Autre planete Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

/* eslint-disable */

import classnames from 'classnames';
import Scss from '../../scss/main.scss'

export default ({className, align, justify, children, ...props}) => {

  const rowClassNames = [Scss['mdc-layout-grid__inner']];

  switch (align) {
    case 'start':
      rowClassNames.push(Scss['mdc-layout-grid__inner'])
      break;
    case 'center':
      rowClassNames.push(Scss['mdc-layout-grid__inner'])
      break;
    case 'end':
      rowClassNames.push(Scss['mdc-layout-grid__inner'])
      break;
  }

  switch (justify) {
    case 'start':
      rowClassNames.push(Scss['mdc-layout-grid__inner'])
      break;
    case 'center':
      rowClassNames.push(Scss['mdc-layout-grid__inner'])
      break;
    case 'end':
      rowClassNames.push(Scss['mdc-layout-grid__inner'])
      break;
    case 'around':
      rowClassNames.push(Scss['mdc-layout-grid__inner'])
      break;
    case 'between':
      rowClassNames.push(Scss['mdc-layout-grid__inner'])
      break;
  }

  return (
    <div
      {...props}
      className={classnames(rowClassNames, className)}>
      {children}
    </div>
  );
}
