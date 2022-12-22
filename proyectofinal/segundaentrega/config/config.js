
// const cnxStr = 'mongodb+srv://admin:<password>@cluster0.iygr0f4.mongodb.net/test' original de mongoexport const CNX_STR = 'mongodb+srv://admin:1234@cluster0.iygr0f4.mongodb.net/test'
const cnxStrRemota = 'mongodb+srv://admin:1234@cluster0.iygr0f4.mongodb.net/test'

export const CNX_STR = cnxStrRemota
export const DB_NAME = 'ecommerce'
// export const PERSISTENCIA = 'mongodb'
export const PERSISTENCIA = 'firestore'
// export const PERSISTENCIA = 'fs'

/*
export const FIREBASE_CREDENTIALS = {
    type: "service_account",
    project_id: "ecommercebe-47be4",
    private_key_id: "21661cb9c3bc77bb242139d97d023a5e6b9f5827",
    private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDG218tK9SAI/Lv\nuPCaThqJt3RU6FGaYaWbGFrgD3vkNKoijLkhJ+5ll7PyL9+MUqAF/eMDXZOXem+Q\nQPwNfySFoB1GpXyccjrfNIAMfb0qfzpJdJhB0CFgtPbPA/0xCZ7QbEFblf5scl5r\nAdX21FGgh/3YoqUruhk3zsdegdOj3kO/cmHeUWrUGfsiHREzLMvDT5lL3KATruv8\nzX6EuZcXDG/nlMiSOHdgWJheC71QwIYk9U8gKUZ+o/ofJ/Yf5+jj0JT06TFMb5DT\nq1VxcBZeiZWRbWUvCP9qRjLNuL/h6FNWa95xLGR/AmvTgf2Gxaef3iLFPHM4EQbA\nIf4DbaIVAgMBAAECggEAH5cth0xJeaLcXttjM6w5OIwRmcR/ZDZje+BSXXpwPNhl\n98+hwGPq0i5Xqp+S1KSyockLxZbZ0cxkSUcdk5pRZ74AMJ8tDOBzvE5HklRuVwA3\ntwAkCP6Csu2EsO3qDN6BoYw1FNLfBITlvXug7VGc9xLrj30FHs11YKGDmB6pS8SF\nQ/oON1w+lEpznWNFDK2ak2kaUHG7IEc5fJV62en4CGQYuZz+Mb5f6eoiycjllwRg\nk0BNey9nnJCRuTd7CM5f4csGDdaFBa/ohOU8c22jJ89qa0m9y2HnzfiELuPuJalg\nd06eOKqoLeQqSdYxi8FhMsr57L2lTGJIHg3qW0Um6QKBgQD3JuNpKaSeWL563ft9\nD60D4569FQRbQdFJnwdYzE0FuSe4ZE0UpqtifhXCYW0pnDSxTiQEaGpikkxWqrGs\n4Nhp9IfjsHl79maBts2dTEqRMBU1fCX+t7Eo+KkmVvNwn215GH1P9evwP7BChw3d\nN1gabRo69s9MJHETeUfX1fTkfQKBgQDN+d3qSutqY+L80YT/sov6CNkc2D6WUbAm\nmOLjF/MmVD7Lhd5srKhNu22ShfSfU1j5LzFRUfUAwRrK6CD7P/Kt5rxLU1wlL3UQ\n/IA/svQ+BEO+0AO2IXyIJmaZZAZwMB4c3equ4em2/Hx+Hhw/r9LuqGmDAvb4yZxP\npgjW2xSfeQKBgQDqXxJgc4EMOBPJ6B/IpMjpWzz5Cakr8OpK6mfJKVQRDVhBX7xI\nzRTRPcfcoQ8n2l2NlhBJrcrU1u9VcGE1E7OmJqGGpZ9Okob6kyPA+svrirFSGvzc\n4804kTW2idYpAsaJg1OyM/8dwQegzvmywfzmcnfhWpOSHSytzuD2KIsm8QKBgDfZ\namyex9pfHysB/JgAZ6fyQjxp/f5wQ90TU2HUGp/n8+bnc3nwDuqUyY8TN1MEHHnk\na/Dq0g3UTll6O4ckvb6dc6zQ+4kxpwJmFLgw47z1FxFkAb2ess+P6f3pez1sLp4R\nJhMpOl/dcjwYGfzCxeTkUUeuxByNPg7yrC7l1F+xAoGAdH0Gc7Ejm/WSbESNKV4T\nJwhA+Hb9yDq5C3zvgbRl0aXNMYKeGyYUWXWn+sGcet5g3fx5qIvnEXxTtseOu45x\nyBhOwL5nrBE/x+eG4nmMCFWHvmN74BYpmvvKRkytYxDYZgKpOmk7U8qoBM8mwUwe\nr1H87+jxZPJYG6oU74ky8oI=\n-----END PRIVATE KEY-----\n",
    client_email: "firebase-adminsdk-8ybru@ecommercebe-47be4.iam.gserviceaccount.com",
    client_id: "107217714511750528915",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-8ybru%40ecommercebe-47be4.iam.gserviceaccount.com"
  }
  */