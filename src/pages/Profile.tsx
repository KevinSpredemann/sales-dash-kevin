import { ChangeEvent, useContext, useEffect, useState } from 'react'
import { AppThemeContext } from '@/contexts/AppThemeContext'

// MUI
import {
  Header,
  FormComponent,
  CardComponent,
  StyledH2,
  StyledButton,
} from '@/components'
import { Container, Grid } from '@mui/material'

// SERVICES
import { Logout } from '@/services'

// HOOK
import { useFormValidation, useGet, usePut, useDelete } from '@/hooks'

// TYPES
import {
  InputProps,
  ProfileData,
  ProfileEditableData,
  MessageProps,
} from '@/types'
import Cookies from 'js-cookie'
function Profile() {
  const themeContext = useContext(AppThemeContext)

  // HOOKS

  const [updateMessage, setUpdateMessage] = useState<MessageProps>({
    type: 'success',
    msg: '',
  })

  const clearMessage = () => {
    setTimeout(() => {
      setUpdateMessage({
        type: 'success',
        msg: '',
      })
    }, 3000)
  }

  const {
    data: profileData,
    loading: profileLoading,
    error: profileError,
  } = useGet<ProfileData>('profile')

  const {
    data: profileUpdateData,
    putData: profilePutData,
    loading: profileUpdateLoading,
    error: profileUpdateError,
  } = usePut<ProfileEditableData>('profile/update')

  const { deleteData: profileDeleteData, loading: profileDeleteLoading } =
    useDelete('profile/delete')

  useEffect(() => {
    if (profileData) {
      handleChange(0, profileData.name)
      handleChange(1, profileData.email)
      handleChange(2, profileData.phone)
    }
  }, [profileData])

  // FORM
  const inputs: InputProps[] = [
    { name: 'name', placeholder: 'Nome', type: 'text', required: true },
    { name: 'email', type: 'email', placeholder: 'Email', disabled: true },
    { name: 'phone', placeholder: 'Telefone', type: 'tel', required: true },
  ]
  const { formValues, formValid, handleChange } = useFormValidation(inputs)
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    await profilePutData({
      name: String(formValues[0]),
      phone: String(formValues[2]),
    })
  }
  const handleDelete = async () => {
    if (
      confirm(
        'Deseja excluir sua conta? Se sim, certifique de excluir seus leads antes'
      ) === true
    ) {
      try {
        await profileDeleteData()
        alert('Conta excluída com sucesso')
        Cookies.remove('Authorization')
        window.location.href = '/'
      } catch (error) {
        alert(
          'Não foi possível realizar a operação. Entre em contanto com o suporte'
        )
      }
    }
  }

  useEffect(() => {
    if (profileUpdateData !== null) {
      setUpdateMessage({
        msg: 'Perfil atualizado com sucesso',
        type: 'success',
      })
    } else if (profileUpdateError) {
      setUpdateMessage({
        msg: 'Não foi possível realizar a operação. Entre em contanto com o suporte',
        type: 'error',
      })
    }
    clearMessage()
  }, [profileUpdateData, profileUpdateError])

  return (
    <>
      <Header />
      <Container className="mb-2" maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            {!profileError && (
              <CardComponent
                className={
                  profileLoading ? 'skeleton-loading skeleton-loading-mh-2' : ''
                }
              >
                {!profileLoading && profileData && (
                  <>
                    <FormComponent
                      inputs={inputs.map((input, index) => ({
                        ...input,
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
                          id: 'update-profile',
                          disabled: !formValid || profileUpdateLoading,
                          type: 'submit',
                          onClick: handleSubmit,
                          children: profileUpdateLoading
                            ? 'Aguarde...'
                            : 'Atualizar meu perfil',
                        },
                        {
                          className: 'alert',
                          id: 'delete-profile',
                          disabled: profileDeleteLoading,
                          type: 'button',
                          onClick: handleDelete,
                          children: profileDeleteLoading
                            ? 'Aguarde...'
                            : 'Exluir minha conta',
                        },
                      ]}
                      message={updateMessage}
                    />
                  </>
                )}
              </CardComponent>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <CardComponent>
              <StyledH2 className="mb-1">Definições de conta</StyledH2>
              <StyledButton
                id="theme-switch"
                className="primary mb-1"
                onClick={themeContext?.toggleTheme}
              >
                Trocar para tema
                {themeContext?.appTheme === 'light' ? ' escuro' : ' claro'}
              </StyledButton>
              <StyledButton id='logout' className="alert" onClick={Logout}>
                Logout
              </StyledButton>
            </CardComponent>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default Profile
