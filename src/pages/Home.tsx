import { AvatarList, CardComponent, Header, CustomTable } from '@/components'
import { Container } from '@mui/material'
import { currencyConverter } from '@/utils'

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

  const mockTableData = {
    headers: ['Name', 'Emails', 'Actions'],
    rows: [
      [
        <span>Nome 1</span>,
        <span>Nome1@gmail.com</span>,
        <button>ACTION</button>,
      ],
      [
        <span>Nome 2</span>,
        <span>Nome2@gmail.com</span>,
        <button>ACTION</button>,
      ],
      [
        <span>Nome 3</span>,
        <span>Nome3@gmail.com</span>,
        <button>ACTION</button>,
      ],
    ],
  }

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <CardComponent>CARD</CardComponent>
        <CardComponent>
          <AvatarList listsData={mockListData} />
        </CardComponent>
        <CardComponent>
          <CustomTable
            headers={mockTableData.headers}
            rows={mockTableData.rows}
          />
        </CardComponent>
      </Container>
    </>
  )
}

export default Home
