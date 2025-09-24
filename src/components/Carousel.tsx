import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'

const Carousel = () => {
  const [emblaRef] = useEmblaCarousel()

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex">
        <div className="min-w-full flex justify-center items-center bg-gray-800 text-white h-60">
          Slide 1
        </div>
        <div className="min-w-full flex justify-center items-center bg-gray-600 text-white h-60">
          Slide 2
        </div>
        <div className="min-w-full flex justify-center items-center bg-gray-400 text-black h-60">
          Slide 3
        </div>
      </div>
    </div>
  )
}

export default Carousel
