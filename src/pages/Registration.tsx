import styled from 'styled-components'

const RegistrationArea = styled.div`
  background: #333;
`
const RegistrationImage = styled.div`
  background-image: url(/dnc-image.svg);
  background-size: cover;
  height: 100vh;
  width: 50vw;
`

function Registration() {
  return (
    <>
      <RegistrationArea>REGISTRATION</RegistrationArea>
      <RegistrationImage />
    </>
  )
}

export default Registration
