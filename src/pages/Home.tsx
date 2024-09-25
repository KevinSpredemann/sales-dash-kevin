import {
  AvatarList,
  CardComponent,
  Header,
  CustomTable,
  CustomChart,
} from '@/components'
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
        <CardComponent>
          <CustomChart
            labels={['Jan', 'Fev', 'Mar', 'Abr', 'Mai']}
            data={[1000.12, 4325.45, 9875.875, 566.563, 7434.645, 744.645]}
            type="bar"
          />
        </CardComponent>
      </Container>
    </>
  )
}

export default Home
