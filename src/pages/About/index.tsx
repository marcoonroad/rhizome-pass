import React from 'react'
import styled from 'styled-components'
import install from '../../utils/install'

const DefaultButton = styled.button`
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 12px 24px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 5px;
`

const Button = styled(DefaultButton)`
  margin: 5px;
  margin-left: 0px;
  margin-right: 5px;
`

// TODO: abstract the whole animation as a separated component

const lines = [
  'Fountain Pass is an offline password manager / generator',
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
          title='Fountain Pass repository'>https://github.com/marcoonroad/fountain</a><br/>
      </p>

      <Button onClick={install} className={'form-component'}>INSTALL</Button>
    </div>
  )
}

export default AboutPage
