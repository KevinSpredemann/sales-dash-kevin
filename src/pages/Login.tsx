import { ChangeEvent, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import Cookies from 'js-cookie'

// COMPONENTS
import { Box, Container, Grid } from '@mui/material'
import {
  BannerImage,
  FormComponent,
  Logo,
  StyledH1,
  StyledP,
} from '@/components'

// HOOKS
import { useFormValidation, usePost } from '@/hooks'

// UTILS
import { jwtExpirationDateConverter,pxToRem } from '@/utils'

//TYPES
import { DecodedJwt, MessageProps, LoginData, LoginPostData } from '@/types'

function Login() {
  const navigate = useNavigate()
  const inputs = [
    { type: 'email', placeholder: 'Email' },
    { type: 'password', placeholder: 'Senha' },
  ]

  const { data, loading, error, postData } = usePost<LoginData, LoginPostData>(
    'login'
  )
  const { formValues, formValid, handleChange } = useFormValidation(inputs)

  const handleMessage = (): MessageProps => {
    if (!error) return { msg: '', type: 'success' }
    switch (error) {
      case 401:
        return { msg: 'Email e/ou senha inválidos', type: 'error' }
      default:
        return {
          msg: 'Não foi possível realizar a operação. Entre em contanto com o suporte',
          type: 'error',
        }
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    await postData({
      email: String(formValues[0]),
      password: String(formValues[1]),
    })
  }

  useEffect(() => {
    if (data?.jwt_token) {
      const decoded: DecodedJwt = jwtDecode(data?.jwt_token)
      Cookies.set('Authorization', data?.jwt_token, {
        expires: jwtExpirationDateConverter(decoded.exp),
        secure: true,
      })
    }
    if (Cookies.get('Authorization')) navigate('/home')
  }, [data, navigate])

  return (
    <>
      <Box>
        <Grid container>
          <Grid
            item
            xs={12}
            sm={6}
            sx={{ alignItems: 'center', display: 'flex', height: '100vh' }}
          >
            <Container maxWidth="sm">
              <Box sx={{ marginBottom: pxToRem(24) }}>
                <Logo height={41} width={100} />
              </Box>
              <Box sx={{ marginBottom: pxToRem(24) }}>
                <StyledH1>Bem-vindo</StyledH1>
                <StyledP>Digite sua senha e email para logar</StyledP>
              </Box>
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
                    disabled: !formValid || loading,
                    type: 'submit',
                    onClick: handleSubmit,
                    children: loading ? 'Aguarde...' : 'Login',
                  },
                ]}
                message={handleMessage()}
              />
            </Container>
          </Grid>
          <Grid item sm={6} sx={{ display: { xs: 'none', sm: 'block' } }}>
            <BannerImage />
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default Login
