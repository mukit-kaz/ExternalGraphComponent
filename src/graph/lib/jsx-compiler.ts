/**
 * @license
 * This app exhibits yFiles for HTML functionalities.
 * Copyright (c) 2023 by yWorks GmbH, Vor dem Kreuzberg 28,
 * 72070 Tuebingen, Germany. All rights reserved.
 *
 * yFiles demo files exhibit yFiles for HTML functionalities.
 * Any redistribution of demo files in source code or binary form, with
 * or without modification, is not permitted.
 *
 * Owners of a valid software license for a yFiles for HTML
 * version are allowed to use the app source code as basis for their
 * own yFiles for HTML powered applications. Use of such programs is
 * governed by the rights and conditions as set out in the yFiles for HTML
 * license agreement. If in doubt, please mail to contact@yworks.com.
 *
 * THIS SOFTWARE IS PROVIDED ''AS IS'' AND ANY EXPRESS OR IMPLIED
 * WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN
 * NO EVENT SHALL yWorks BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import { ReactComponentSvgNodeStyle } from './ReactComponentSvgNodeStyle'
import { ReactComponentHtmlNodeStyle } from './ReactComponentHtmlNodeStyle'
import { SvgText } from './SvgText'
import { transform } from '@babel/standalone'
import * as React from 'react'

// We need a global React at runtime
window.React = React

/**
 * The following is a simple "compile" function that is inherently unsafe in that
 * it executes the code in the string.
 * Make sure that the code comes from a trusted source.
 * @param jsx the trusted JSX string that will be compiled by this function
 */
function compileRenderFunction(jsx: string): (props: any) => any {
  const transpiledCode = transform('const renderFunction = ' + jsx, {
    presets: ['react', 'env'],
  }).code as string
  // eslint-disable-next-line
  const renderFn = new Function(
    'SvgText',
    transpiledCode + '\n return renderFunction'
  )(SvgText)
  return (props) => {
    try {
      return renderFn(props)
    } catch (e: any) {
      return React.createElement('text', {}, `Invalid template: ${e.message}`)
    }
  }
}

type JSXCacheType<T> = T & { jsx: string }
export type ReactComponentSvgNodeStyleEx<T> = JSXCacheType<
  ReactComponentSvgNodeStyle<T>
>
export type ReactComponentHtmlNodeStyleEx<T> = JSXCacheType<
  ReactComponentHtmlNodeStyle<T>
>

export function isReactComponentSvgNodeStyleEx(
  o: any
): o is ReactComponentSvgNodeStyleEx<unknown> {
  return (
    o && typeof o.jsx === 'string' && o instanceof ReactComponentSvgNodeStyle
  )
}

export function isReactComponentHtmlNodeStyleEx(
  o: any
): o is ReactComponentHtmlNodeStyleEx<unknown> {
  return (
    o && typeof o.jsx === 'string' && o instanceof ReactComponentHtmlNodeStyle
  )
}

export function isReactComponentStyleEx(o: any): o is { jsx: string } {
  return o && typeof o.jsx === 'string'
}

export function createReactComponentSvgNodeStyleFromJSX(
  jsx: string
): ReactComponentSvgNodeStyle<unknown> {
  const style = new ReactComponentSvgNodeStyle(
    compileRenderFunction(jsx)
  ) as ReactComponentSvgNodeStyleEx<unknown>
  style.jsx = jsx
  return style
}

export function createReactComponentHtmlNodeStyleFromJSX(
  jsx: string
): ReactComponentHtmlNodeStyle<unknown> {
  const style = new ReactComponentHtmlNodeStyle(
    compileRenderFunction(jsx)
  ) as ReactComponentHtmlNodeStyleEx<unknown>
  style.jsx = jsx
  return style
}
