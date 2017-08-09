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
import classnames from 'classnames'
import Scss from '../../scss/main.scss'

import PropTypes from 'prop-types'

export default ({children, span = false, phone = false, tablet = false, desktop = false, align = false, order = false, className = '', ...props}) => {

  const cellClassNames = []
  cellClassNames.push(Scss['mdc-layout-grid__cell'])

  if(span != false) {
    cellClassNames.push(Scss['mdc-layout-grid__cell--span-' + span])
  }

  if(phone != false) {
    cellClassNames.push(Scss['mdc-layout-grid__cell--span-' + phone + '-phone'])
  }

  if(tablet != false) {
    cellClassNames.push(Scss['mdc-layout-grid__cell--span-' + tablet + '-tablet'])
  }

  if(desktop != false) {
    cellClassNames.push(Scss['mdc-layout-grid__cell--span-' + desktop + '-desktop'])
  }

  if(order != false) {
    cellClassNames.push(Scss['mdc-layout-grid__cell--order-' + order])
  }

  if(align != false) {
    cellClassNames.push(Scss['mdc-layout-grid__cell--align-' + align])
  }

  // mdc-layout-grid__cell--align-top

  return (
    <div
      { ...props }
      className={ classnames(cellClassNames, className) }>
      { children }
    </div>
  );
}
