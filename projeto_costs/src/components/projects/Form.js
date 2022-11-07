import {useState, useEffect} from 'react'

import Input from '../Form/Input'
import Select from '../Form/Select'
import Submit from '../Form/Submit'
import Styled from './Form.module.css'

function Form({handleSubmit, btnText, projectData}){

    const [categorias, setCategorias] = useState([])
    const [project, setProject] = useState(projectData || {})

    useEffect(() => {
    fetch('http://localhost:5000/categorias', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then((resp) => resp.json())
        .then((data) => {setCategorias(data)})
        .catch((err) => console.log(err))
    }, []
    )

    const submit = (e) => {
        e.preventDefault()
        handleSubmit(project)
    }

    function handleChange(e) {
        setProject({...project, [e.target.name]: e.target.value})
    }

    function handleCategoria(e) {
        setProject({ ...project, categoria: {
            id: e.target.value,
            name: e.target.options[e.target.selectedIndex].text,
        },
    })
    }

    return (
        <form onSubmit={submit} className={Styled.form}>
            <Input type="text" text="Nome do Projeto" name="name" placeholder="Insira o nome do projeto" handleOnChange={handleChange} value={project.name ? project.name : ''}/>
            <Input type="number" text="Orçamento do Projeto" name="budget" placeholder="Insira o valor do orçamento" handleOnChange={handleChange} value={project.budget ? project.budget : ''}/>
            <Select name="IDcategoria" text="Categoria do Projeto" options={categorias} handleOnChange={handleCategoria} value={project.categoria ? project.categoria.id : ''}/>
            <Submit text={btnText}/>
        </form>
    )
}

export default Form 