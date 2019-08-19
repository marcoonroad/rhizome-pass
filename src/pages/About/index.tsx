import React from 'react'

const lines = [
  'Fountain Pass is an offline password manager/generator',
  'developed by @marcoonroad (Marco Aurélio da Silva). This',
  'password generator uses cryptographic primitives such as',
  'HMAC, hashes, KDF and PRNG. We don\'t store anything except',
  'for hash images of refreshed generated passwords. This',
  'project is hosted at: '
]

const fullText = lines.join(' ')

const AboutPage : React.FC = () => {
  const [current, update] = React.useState({
    counter: 0,
    blink: true,
  })

  React.useEffect(() => {
    if (current.counter === fullText.length) {
      const timeout = setTimeout(() => {
        update(current => {
          const blink = !current.blink
          return { ...current, blink }
        })
      }, 400)
  
      return () => clearTimeout(timeout)
    }

    const timeout = setTimeout(() => {
      console.log('Counter timeout triggered!')
      update(current => {
        const counter = Math.min(current.counter + 1, fullText.length)
        return { ...current, counter }
      })
    }, 70)

    return () => clearTimeout(timeout)
  }, [current.counter, current.blink])

  const suffix = current.blink ? '_' : ''
  const animatedText = fullText.substr(0, current.counter) + suffix

  return (
    <div className='about-container'>
      <p>
        {animatedText}<br/><br/>

        <a href='https://github.com/marcoonroad/fountain' className='text-link'
          title='Fountain Pass repository'>github.com/marcoonroad/fountain</a>
      </p>
    </div>
  )
}

export default AboutPage
