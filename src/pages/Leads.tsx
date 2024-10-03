import { ChangeEvent, useEffect, useState } from 'react'

// MUI
import {
  Header,
  FormComponent,
  CustomTable,
  CardComponent,
  StyledH2,
  StyledButton,
  StyledP,
  StyledSpan,
} from '@/components'
import { Container, Grid } from '@mui/material'

// HOOK
import { useFormValidation, useGet, usePost, useDelete } from '@/hooks'

// TYPES
import { InputProps, LeadsData, LeadPostData, MessageProps } from '@/types'

function Leads() {
  // HOOKS
  const {
    data: createLeadsData,
    loading: createLeadsLoading,
    error: createLeadsError,
    postData: createLeadsPostData,
  } = usePost<LeadsData, LeadPostData>('leads/create', true)

  const {
    data: leadsData,
    loading: leadsLoading,
    error: leadsError,
    getData: getLeadsData,
  } = useGet<LeadsData[]>('leads')

  const { deleteData: leadsDeleteData, loading: leadsDeleteLoading } =
    useDelete('leads/delete')

  // FORM
  const inputs: InputProps[] = [
    { name: 'name', placeholder: 'Nome', type: 'text', required: true },
    { name: 'email', type: 'email', placeholder: 'Email', required: true },
    { name: 'phone', placeholder: 'Telefone', type: 'tel', required: true },
  ]

  const { formValues, formValid, handleChange } = useFormValidation(inputs)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    await createLeadsPostData({
      name: String(formValues[0]),
      email: String(formValues[1]),
      phone: String(formValues[2]),
    })
  }

  const handleDelete = async (id: number) => {
    if (confirm('Deseja excluir seu lead?') === true) {
      try {
        await leadsDeleteData({ params: { id: id } })
        alert('Lead excluída com sucesso')
        getLeadsData()
      } catch (error) {
        alert(
          'Não foi possível realizar a operação. Entre em contanto com o suporte'
        )
      }
    }
  }

  const [createMessage, setCreateMessage] = useState<MessageProps>({
    type: 'success',
    msg: '',
  })

  const clearMessage = () => {
    setTimeout(() => {
      setCreateMessage({
        type: 'success',
        msg: '',
      })
    }, 3000)
  }

  useEffect(() => {
    if (createLeadsData?.id) {
      setCreateMessage({
        msg: 'Lead criado com sucesso',
        type: 'success',
      })
      getLeadsData()
      clearMessage()
    } else if (createLeadsError) {
      setCreateMessage({
        msg: 'Não foi possível realizar a operação. Entre em contanto com o suporte',
        type: 'error',
      })
    } else {
      clearMessage()
    }
  }, [createLeadsData, createLeadsError])

  return (
    <>
      <Header />
      <Container className="mb-2" maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={7}>
            <CardComponent
              className={
                leadsLoading
                  ? 'skeleton-loading skeleton-loading-mh-2'
                  : ''
              }
            >
              {!leadsError && !leadsLoading && (
                <>
                  <StyledH2 className="mb-1">Meus leads</StyledH2>
                  {leadsData?.length ? (
                    <CustomTable
                      headers={['Nome', 'Email', 'Telefone', '']}
                      rows={leadsData.map((lead) => [
                        <StyledP>{lead.name}</StyledP>,
                        <StyledP>{lead.email}</StyledP>,
                        <StyledP>{lead.phone}</StyledP>,
                        <StyledButton
                          className="borderless-alert"
                          onClick={() => handleDelete(lead.id)}
                          disabled={leadsDeleteLoading}
                        >
                          Excluir
                        </StyledButton>,
                      ])}
                    />
                  ) : (
                    <StyledSpan>Voce não possui leads</StyledSpan>
                  )}
                </>
              )}
            </CardComponent>
          </Grid>
          <Grid item xs={12} sm={5}>
            <CardComponent>
              <StyledH2 className="mb-1">Cadastrar leads</StyledH2>
              <FormComponent
                inputs={inputs.map((input, index) => ({
                  type: input.type,
                  placeholder: input.placeholder,
                  value: formValues[index] || '',
                  onChange: (event: ChangeEvent<HTMLInputElement>) =>
                    handleChange(
                      index,
                      (event.target as HTMLInputElement).value
                    ),
                }))}
                buttons={[
                  {
                    className: 'primary',
                    disabled:
                      !formValid || createLeadsLoading || leadsDeleteLoading,
                    type: 'submit',
                    onClick: handleSubmit,
                    children: 'Cadastrar lead',
                  },
                ]}
                message={createMessage}
              />
            </CardComponent>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default Leads
