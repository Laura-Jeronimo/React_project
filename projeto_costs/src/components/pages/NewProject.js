import { useNavigate } from "react-router-dom"
import Styled from './NewProject.module.css'
import Form from '../projects/Form'

function NewProject() {

    const navigate = useNavigate() 

    function createPost(project){
        project.cost = 0
        project.services = []

        fetch('http://localhost:5000/projects', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project),
        })
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data)
            navigate('/projects',{ state: { message: 'Projeto criado com sucesso!' }})
        })
        .catch(err => console.log(err))
    }

    return(
        <div className={Styled.newProject_container}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            <Form handleSubmit={createPost} btnText="Criar Projeto"/>
        </div>
    )
}

export default NewProject