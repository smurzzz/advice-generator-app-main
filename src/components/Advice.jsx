import React, { useEffect, useState } from 'react';
import patternDividerDesktop from '../assets/patternDividerDesktop.svg'
import patternDividerMobile from '../assets/patternDividerMobile.svg'
import iconDice from '../assets/iconDice.svg'


const Advice = () => {
  const [advice, setAdvice] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [imageSrc, setImageSrc] = useState(window.innerWidth < 760 ? patternDividerMobile : patternDividerDesktop )

  const apiUrl = "https://api.adviceslip.com/advice"

  const fetchAdvices = () => {
    setLoading(true)
    fetch(apiUrl).then((response) => {
      if(!response.ok) {
        throw new error('Network response was not okay')
      }
      return response.json()
    }).then((data) => {
      setAdvice(data.slip)
      localStorage.setItem('advice', JSON.stringify(data.slip))
      setLoading(false)
    }).catch((error) => {
      setError(error)
      setLoading(false)
    })
  }

  useEffect(() => {
    const storageAdvice = localStorage.getItem('advice')

    if(storageAdvice) {
      setAdvice(JSON.parse(storageAdvice))
      setLoading(false)
    }else{
      fetchAdvices()
    }
  }, [apiUrl])

  const handleRandomAdvice = () => {
      fetchAdvices()
  }

  if(loading){
    return(
      <div className='text-white'>Loading...</div>
    )
  }

  if(!advice) {
    return(
      <div>No advice available at the moment</div>
    )
  }

  return (
    <div className='p-5 relative   rounded-md bg-DarkGrayishBlue text-center max-width'>
      <p className='text-NeonGreen spacing'>advice {advice.id}</p>
      <p className='fon-[800] text-[28px] text-white'>{advice.advice}</p>
      <div className='mt-5 mb-10'>
          <img src={imageSrc} alt="patternDividerDesktop" />
      </div>
      <div className='mt-5 w-full flex position items-center justify-center'>
        <div className='p-5 cursor-pointer rounded-full position bg-NeonGreen'>
          <img src={iconDice} alt="iconDice" onClick={handleRandomAdvice} />
        </div>
      </div>
    </div>
  )
}

export default Advice
