import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'


export const getPersons = () => {
    const response = axios.get(baseUrl)
    return response.then(response => response.data)
}
  
export const createPerson = (newObject) => {
    const response = axios.post(baseUrl, newObject)
    return response.then(response => response.data)
}

export const deletePerson = (id) => {
    const response = axios.delete(`${baseUrl}/${id}`)
    return response.then(() => 
        getPersons()
    )
}

export const updatePerson = (id, person) => {
    const response = axios.put(`${baseUrl}/${id}`,person)
    return response.then(response => response.data)
}

//export default {getPersons,createPerson}