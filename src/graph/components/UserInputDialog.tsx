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

import { useEffect, useRef, useState } from 'react'
import './UserInputDialog.scss'


export interface DialogOptions {
  setVisible(v: boolean): void
  setValue(s: string): void
  setQuery(s: string): void
  setPlaceholder(s: string): void
  setResolve(fn: () => (s: string) => void): void
}

export function UserInputDialog() {
  const dialog = useRef<HTMLInputElement>(null)
  const [visible, setVisible] = useState(false)
  const [value, setValue] = useState('')
  const [query, setQuery] = useState('')
  const [placeholder, setPlaceholder] = useState('')
  const [resolve, setResolve] = useState<((s: string) => void) | null>(null)

  function commit(s: string) {
    setVisible(false)
    if (resolve) {
      resolve(s)
    }
  }

  function submit() {
    commit(value)
  }

  function cancel() {
    commit('')
  }

  useEffect(() => {
    const input = dialog.current
    if (input) {
      (input as any).dialogOptions = {
        setVisible,
        setValue,
        setQuery,
        setPlaceholder,
        setResolve,
      } as DialogOptions
      input.setAttribute('data-initialized', '')
    }

    return () => {
      cancel()
      if (input) {
        delete (input as any).dialogOptions
      }
    }
  }, [dialog, setVisible, setValue, setQuery, setPlaceholder, setResolve])

  return (
    <div
      className={`user-input-container absolute top-[20%] left-[20%] z-[100] ${visible ? 'block' : 'hidden'}`}
      id="user-input-dialog"
      ref={dialog}
    >
      <div className="user-input-title">
        User Input
        <div className="spacer" />
      </div>
      <div className="user-input-text">
        <p>{query}</p>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            submit()
          }}
        >
          <div className="user-input">
            <input
              placeholder={placeholder!}
              type="text"
              value={value!}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
        </form>
      </div>
      <div className="user-input-actions">
        <div className="spacer"></div>
        <button type="button" className="user-input-button" onClick={cancel}>
          Cancel
        </button>
        <button type="button" className="user-input-button" onClick={submit}>
          Submit
        </button>
      </div>
    </div>
  )
}

export type UserInputConfiguration = {
  query: string
  defaultText: string | null
  placeholder: string | null
  resolve?: (s: string) => void
}
