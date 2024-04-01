import { useState, useEffect } from 'react'

interface VideoLoaderResult {
  videoUrl: string | null
  loading: boolean
}

function useVideoLoader(videoPath: string): VideoLoaderResult {
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    async function fetchVideo() {
      try {
        const response = await fetch(videoPath)
        if (!response.ok) throw new Error('Failed to fetch video')

        const blob = await response.blob()
        setVideoUrl(URL.createObjectURL(blob))
        setLoading(false)
      } catch (error) {
        console.error('Error fetching video:', error)
        setLoading(false)
      }
    }

    fetchVideo()
  }, [videoPath])

  return { videoUrl, loading }
}

export default useVideoLoader
