import React from 'react';

class Form extends React.Component {
    state = {
        inputTarefa: '',
        savedList: [],
    }

    componentDidMount() {
        const listLS = JSON.parse(localStorage.getItem('ListSaved'));
        if (listLS !== null) {
            this.setState({
                savedList: listLS,
            });
        };
    }

    saveLocalStorage = () => {
        const { savedList } = this.state;
        localStorage.setItem('ListSaved', JSON.stringify(savedList));
    };

    handleChange = ({ target }) => {
        const { name, value } = target;
        this.setState({
            [name]: value,
        });
    };

    handleClick = () => {
        const { inputTarefa, savedList } = this.state;
        this.setState({
            savedList: [
                ...savedList,
                inputTarefa,
            ],
        }, this.saveLocalStorage);
        this.setState({
            inputTarefa: '',
        })
    };

    onClickLi = ({ target }) => {
        const itemSelecionado = document.getElementsByClassName("item-selecionado")[0];
        if (target.className === "item") {
            if (itemSelecionado) {
                itemSelecionado.className = "item"
            }
            target.className = "item-selecionado";
        } else if (target.className === "item-selecionado") {
            target.className = "item"
            console.log("aa");
        };
    };

    dubleClick = ({ target }) => {
        if (target.className === "item" || target.className === "item-selecionado") {
            target.className = "completed"
        } else {
            target.className = "item"
        }
    };

    render() {
        const { inputTarefa, savedList } = this.state;
        return (
            <>
                <header>Minha Lista de Tarefas</header>
                <p id="funcionamento">Clique duas vezes em um item para marcá-lo como completo</p>
                <input id="texto-tarefa" value={inputTarefa} type="text" name="inputTarefa" onChange={this.handleChange} />
                <button type="button" id="criar-tarefa" onClick={this.handleClick}>Adicionar Tarefa</button>
                <ol id="lista-tarefas">
                    {savedList.length > 0 && savedList.map((list) => (
                        <li key={list} className="item" onClick={this.onClickLi} onDoubleClick={this.dubleClick}>
                            {list}
                        </li>
                    ))}
                </ol>
            </>
        );
    }
}

export default Form;
