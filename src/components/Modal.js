export default function Modal(props){
    return(
        <div className="modal">
            <button onClick={props.closeModal} className="modal-close"></button>
            <h4 className="modal-title">Tem certeza que deseja excluir esse produto?</h4>
            <section className="modal-action">
                <button onClick={props.closeModal}>Cancelar</button>
                <button onClick={props.removeItem}>Excluir</button>
            </section>
        </div>
    )
}