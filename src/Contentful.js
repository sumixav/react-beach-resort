import { createClient } from 'contentful'
require('dotenv').config()
export default createClient({
    
    space: process.env.REACT_APP_API_SPACE,
    
    accessToken: process.env.REACT_APP_ACCESS_TOKEN
})