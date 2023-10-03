'use client'

import { FC, useCallback, useEffect, useRef, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import type EditorJS from '@editorjs/editorjs'

import '@/styles/editor.scss'
import { uploadFiles } from '@/lib/uploadthing'

interface EditorProps {}

const Editor: FC<EditorProps> = ({}) => {
  const [isMounted, setIsMounted] = useState(false)
  const titleRef = useRef<HTMLTextAreaElement>(null)
  const editorRef = useRef<EditorJS>()

  useEffect(() => {
    if (typeof window !== 'undefined') setIsMounted(true)
  }, [])

  const initializeEditor = useCallback(async () => {
    const Editor = (await import('@editorjs/editorjs')).default
    const Header = (await import('@editorjs/header')).default
    const Link = (await import('@editorjs/link')).default
    const Image = (await import('@editorjs/image')).default
    const Delimiter = (await import('@editorjs/delimiter')).default
    const Checklist = (await import('@editorjs/checklist')).default
    const List = (await import('@editorjs/list')).default
    const Quote = (await import('@editorjs/quote')).default
    const Table = (await import('@editorjs/table')).default

    const editor = new Editor({
      holder: 'editorjs',
      autofocus: false,
      onReady() {
        editorRef.current = editor
        titleRef.current?.focus()
      },
      placeholder: 'Scrivi qui il tuo post...',
      inlineToolbar: true,
      minHeight: 50,
      tools: {
        header: {
          class: Header,
          inlineToolbar: true,
          config: {
            placeholder: 'Inserisci qui un titolo...',
            levels: [1, 2, 3],
            defaultLevel: 1,
          },
        },
        link: {
          class: Link,
          config: {
            endpoint: '/api/post/link',
          },
        },
        image: {
          class: Image,
          config: {
            uploader: {
              async uploadByFile(file: File) {
                const [fileRes] = await uploadFiles({ endpoint: 'imageUploader', files: [file] })

                return {
                  success: 1,
                  file: {
                    url: fileRes.url,
                  },
                }
              },
            },
          },
        },
        delimiter: Delimiter,
        checklist: Checklist,
        list: List,
        quote: {
          class: Quote,
          inlineToolbar: true,
          config: {
            quotePlaceholder: 'Inserisci qui una citazione...',
            captionPlaceholder: "Autore...",
          },
        },
        table: {
          class: Table,
          inlineToolbar: true
        }
      },
    })
  }, [])

  useEffect(() => {
    const init = async () => {
      await initializeEditor()
    }
    if (isMounted) init()

    return () => editorRef.current?.destroy()
  }, [isMounted, initializeEditor])

  return (
    <div className='bg-popover p-4 rounded-lg border'>
      <form id='post-editor-form'>
        <TextareaAutosize ref={titleRef} className='bg-transparent resize-none border-none w-full focus:ring-0 text-5xl font-bold' placeholder='Titolo' />
        <div id='editorjs' className='min-h-[500px]' />
      </form>
    </div>
  )
}

export default Editor
