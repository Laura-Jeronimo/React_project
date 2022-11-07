import Styled from "./Submit.module.css"

function Submit({text}){
    return(
        <div className={Styled.center}>
            <button className={Styled.button}>{text}</button>
        </div>
    )
}

export default Submit