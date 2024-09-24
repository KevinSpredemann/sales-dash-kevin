import { AvatarList, CardComponent, Header } from "@/components"
import { Container } from "@mui/material"
import { currencyConverter } from "@/utils"

function Home() {

  const mockListData = [
    {
      avatar: '/Avatar.svg',
      name: 'Nome Sobrenome 1',
      subtitle: currencyConverter(12345.545),
    },
    {
      avatar: '/Avatar.svg',
      name: 'Nome Sobrenome 2',
      subtitle: currencyConverter(3495.55),
    },
    {
      avatar: '/Avatar.svg',
      name: 'Nome Sobrenome 3',
      subtitle: currencyConverter(12555.45),
    },
  ]

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <CardComponent>CARD</CardComponent>
        <CardComponent>< AvatarList listsData={mockListData} /></CardComponent>
      </Container>
    </>
  )
}

export default Home
