
import ENV from 'environment'

defaultsValues={
    username: ''
    password: ''
}

if (ENV.environment=='development'){
    defaultsValues.username='dracks',
    defaultsValues.password='123456'
}

export default defaultsValues