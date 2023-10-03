'use client'

import { FC, useCallback, useEffect, useRef, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import type EditorJS from '@editorjs/editorjs'

import '@/styles/editor.scss'
import { uploadFiles } from '@/lib/uploadthing'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { PostPayload, PostValidator } from '@/lib/validators/post'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { toast } from '@/hooks/use-toast'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'

interface EditorProps {
  subredditId: string
}

const Editor: FC<EditorProps> = ({subredditId}) => {
  const [isMounted, setIsMounted] = useState(false)
  const titleRef = useRef<HTMLTextAreaElement>(null)
  const editorRef = useRef<EditorJS>()
  const pathname = usePathname()
  const router = useRouter()

  const { mutate: createPost, isLoading } = useMutation({
    mutationFn: async (postData: PostPayload) => {
      const payload: PostPayload = postData
      const { data } = await axios.post('/api/post', payload)
      return data as string
    },
    onError: () =>
      toast({
        title: 'Qualcosa è andato storto.',
        description: 'Non è stato possibile pubblicare il tuo post. Per piacere riprova più tardi.',
        variant: 'destructive',
      }),
    onSuccess: () => {
      const subredditPath = pathname.split('/').slice(0, -1).join('/')
      router.push(subredditPath)
      router.refresh()

      toast({
        description: 'Il tuo post è stato pubblicato.',
      })
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<PostPayload>({
    resolver: zodResolver(PostValidator),
    defaultValues: {
      subredditId
    }
  })

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
            captionPlaceholder: 'Autore...',
          },
        },
        table: {
          class: Table,
          inlineToolbar: true,
        },
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

  const { ref: titleRefCb, ...rest } = register('title')

  const submitFn = async (data: PostPayload) => {
    const blocks = await editorRef.current?.save()

    const payload: PostPayload = {
      title: data.title,
      content: blocks,
      subredditId
    }

    createPost(payload)
  }

  return (
    <>
      <div className='bg-popover p-4 rounded-lg border'>
        <form id='post-editor-form' onSubmit={handleSubmit(submitFn)}>
          <TextareaAutosize
            ref={(e) => {
              titleRefCb(e)
              // @ts-ignore
              titleRef.current = e
            }}
            className='bg-transparent resize-none border-none w-full focus:ring-0 text-5xl font-bold'
            placeholder='Titolo'
            {...rest}
          />
          <div id='editorjs' className='min-h-[500px]' />
        </form>
      </div>
      <Button type='submit' form='post-editor-form' className='w-full' disabled={!isValid} loader={isLoading}>Posta</Button>
    </>
  )
}

export default Editor
