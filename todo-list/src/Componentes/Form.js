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
            target.className = "item item-selecionado";
        } else if (target.className === "item-selecionado") {
            target.className = "item"
        };
    };

    dubleClick = ({ target }) => {
        if (target.className === "item" || target.className === "item item-selecionado") {
            target.className = "item completed"
        } else {
            target.className = "item"
        }
    };

    removeSelect = () => {
        const itemSelect = document.querySelectorAll(".item");
        const verifySelect = [...itemSelect].filter((item) => item.className !== "item item-selecionado");
        const filterSelect = verifySelect.map((item) => item.innerText);
        console.log(filterSelect);
        this.setState({
            savedList: filterSelect,
        }, this.saveLocalStorage);
    };

    removeList = () => {
        const { savedList } = this.state;
        this.setState({
            savedList: '',
        }, this.saveLocalStorage);
    };

    removeFinalized = () => {
        const { savedList } = this.state;
        const itens = document.querySelectorAll(".item");
        console.log(itens);
        const verifyItens = [...itens].filter((item) => item.className !== "item completed");
        const filterItens = verifyItens.map((item) => item.innerText)
        console.log(filterItens);
        this.setState({
            savedList: filterItens,
        }, this.saveLocalStorage);
    };

    moverParaBaixo = () => {
        const itens = document.querySelectorAll(".item");
        const itemSelect = document.querySelector(".item-selecionado");
        if (!itemSelect) {
            alert("Selecione uma tarefa")
        } else {
            const proximoItem = itemSelect.nextElementSibling;
            if (itemSelect !== itens.lastChild) {
                proximoItem.insertAdjacentElement('afterend', itemSelect);
            };
        };
    };

    moveParaCima = () => {
        const itens = document.querySelectorAll(".item");
        const itemSelect = document.querySelector(".item-selecionado");
        if (!itemSelect) {
            alert("Selecione uma tarefa")
        } else {
            const itemAnterior = itemSelect.previousElementSibling;
            if (itemSelect !== itens.firstChild) {
                itemAnterior.insertAdjacentElement('beforebegin', itemSelect);
            };
        };
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
                    <div id="buttons">
                        <button type="button" id="mover-cima" onClick={this.moveParaCima}>subir</button>
                        <button type="button" id="mover-baixo" onClick={this.moverParaBaixo}>descer</button>
                        <button type="button" id="remover-selecionado" onClick={this.removeSelect}>Remover Item</button>
                        <button type="button" id="apaga-tudo" onClick={this.removeList}>Remover Lista</button>
                        <button type="button" id="remover-finalizados" onClick={this.removeFinalized}> Remover Finalizados</button>
                    </div>
            </>
        );
    }
}

export default Form;
