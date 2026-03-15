import { Button } from '@/components/ui/button'
import React from 'react'

const Page = () => {
  return (
    <div>
      <h1 className="text-2xl underline">
        Welcome to the Saas App
        <Button className=''>
            Let's get started
        </Button>
      </h1>
    </div>
  )
}

export default Page