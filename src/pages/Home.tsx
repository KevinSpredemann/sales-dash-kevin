// COMPONENTS
import {
  AvatarList,
  CardComponent,
  Header,
  CustomTable,
  CustomChart,
  StyledH2,
  StyledH3,
  StyledSpan,
} from '@/components'
import { Container, Grid } from '@mui/material'

// HOOKS
import { useGet } from '@/hooks'

// UTILS
import { currencyConverter, highlightTextConverter } from '@/utils'
import { Link } from 'react-router-dom'

// TYPES
import { HightlightsData, StarsData, NewsData, CustomChartProps } from '@/types'

function Home() {
  const {
    data: hightlightsData,
    loading: hightlightsLoading,
    error: hightlightsError,
  } = useGet<HightlightsData[]>('sales/highlights')

  const {
    data: salesMonthData,
    loading: salesMonthLoading,
    error: salesMonthError,
  } = useGet<CustomChartProps>('sales/month')

  const {
    data: salesStartsData,
    loading: salesStartsLoading,
    error: salesStartsError,
  } = useGet<StarsData[]>('sales/stars')

  const {
    data: newsData,
    loading: newsLoading,
    error: newsError,
  } = useGet<NewsData[]>('news')

  const {
    data: salesYearData,
    loading: salesYearLoading,
    error: salesYearError,
  } = useGet<CustomChartProps>('sales/year')

  return (
    <>
      <Header />
      <Container className="mb-2" maxWidth="lg">
        <Grid container spacing={4}>
          {!hightlightsError && (
            <>
              <Grid item xs={12} md={4}>
                <CardComponent
                  id="total-sales"
                  className={
                    hightlightsLoading
                      ? 'skeleton-loading skeleton-loading-mh-1'
                      : ''
                  }
                >
                  {!hightlightsLoading && hightlightsData && (
                    <>
                      <StyledH2 className="mb-1">
                        Total de vendas do mês
                      </StyledH2>
                      <StyledH3 className="mb-1" size={40} lineheight={40}>
                        {currencyConverter(hightlightsData[0].value)}
                      </StyledH3>
                      <StyledSpan>{hightlightsData[0].subtitle}</StyledSpan>
                    </>
                  )}
                </CardComponent>
              </Grid>
              <Grid item xs={12} md={4}>
                <CardComponent
                  id="month-goals"
                  className={
                    hightlightsData
                      ? hightlightsData[1].subtitle
                      : 'skeleton-loading skeleton-loading-mh-1'
                  }
                >
                  {!hightlightsLoading && hightlightsData && (
                    <>
                      <StyledH2 className="mb-1" color="white">
                        Meta do mês
                      </StyledH2>
                      <StyledH3
                        color="white"
                        className="mb-1"
                        size={40}
                        lineheight={40}
                      >
                        {currencyConverter(hightlightsData[1].value)}
                      </StyledH3>
                      <StyledSpan color="white">
                        {highlightTextConverter(hightlightsData[1].subtitle)}
                      </StyledSpan>
                    </>
                  )}
                </CardComponent>
              </Grid>
              <Grid item xs={12} md={4}>
                <CardComponent
                  id="total-leads"
                  className={
                    hightlightsLoading
                      ? 'skeleton-loading skeleton-loading-mh-1'
                      : ''
                  }
                >
                  {!hightlightsLoading && hightlightsData && (
                    <>
                      <Link to="/leads">
                        <StyledH2 className="mb-1">Leads contactados</StyledH2>
                        <StyledH3 className="mb-1" size={40} lineheight={40}>
                          {hightlightsData[2].value}
                        </StyledH3>
                        <StyledSpan>{hightlightsData[2].subtitle}</StyledSpan>
                      </Link>
                    </>
                  )}
                </CardComponent>
              </Grid>
            </>
          )}
          <Grid item xs={12} md={7}>
            {!salesMonthError && (
              <CardComponent
                id="month-sales-chart"
                className={
                  salesMonthLoading
                    ? 'skeleton-loading skeleton-loading-mh-2'
                    : ''
                }
              >
                {!salesMonthLoading && salesMonthData && (
                  <>
                    <StyledH2 className="mb-1">Valor de vendas no mês</StyledH2>
                    <CustomChart
                      labels={salesMonthData.labels.map((label) => label)}
                      data={salesMonthData.data.map((data) => data)}
                      type={salesMonthData.type}
                    />
                  </>
                )}
              </CardComponent>
            )}
          </Grid>
          <Grid item xs={12} md={5}>
            {!salesStartsError && (
              <CardComponent
                id="sales-stars"
                className={
                  salesStartsLoading
                    ? 'skeleton-loading skeleton-loading-mh-2'
                    : ''
                }
              >
                {!salesStartsLoading && salesStartsData && (
                  <>
                    <StyledH2 className="mb-1">
                      Maiores vendedores do mês
                    </StyledH2>
                    <AvatarList
                      listsData={salesStartsData.map((star) => ({
                        avatar: '/Avatar.svg',
                        name: star.name,
                        subtitle: currencyConverter(star.value),
                      }))}
                    />
                  </>
                )}
              </CardComponent>
            )}
          </Grid>
          <Grid item xs={12} md={5}>
            {!newsError && (
              <CardComponent
                id="news"
                className={
                  newsLoading ? 'skeleton-loading skeleton-loading-mh-2' : ''
                }
              >
                {!newsLoading && newsData && (
                  <>
                    <StyledH2 className="mb-1">Notícias relevantes</StyledH2>
                    <CustomTable
                      headers={['Título', 'Horário']}
                      rows={newsData.map((news) => [
                        <a
                          className="ellipsis ellipsis-sm"
                          href={news.link}
                          target="_blank"
                        >
                          {news.title}
                        </a>,
                        <a href={news.link} target="_blank">
                          {news.date}
                        </a>,
                      ])}
                    />
                  </>
                )}
              </CardComponent>
            )}
          </Grid>
          <Grid item xs={12} md={7}>
            {!salesYearError && (
              <CardComponent
                id="year-sales-chart"
                className={
                  salesYearLoading
                    ? 'skeleton-loading skeleton-loading-mh-2'
                    : ''
                }
              >
                {!salesYearLoading && salesYearData && (
                  <>
                    <StyledH2 className="mb-1">
                      Valor de vendas por mês
                    </StyledH2>
                    <CustomChart
                      labels={salesYearData.labels.map((label) => label)}
                      data={salesYearData.data.map((data) => data)}
                      type={salesYearData.type}
                    />
                  </>
                )}
              </CardComponent>
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default Home
