import React from 'react';

class Form extends React.Component {
    state = {
        inputTarefa: '',
        savedList: [],
    }

    componentDidMount() {
        const listLS = JSON.parse(localStorage.getItem('ListSaved'));
        console.log(listLS);
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

    render() {
        const { inputTarefa, savedList } = this.state;
        return (
            <>
                <header>Minha Lista de Tarefas</header>
                <p id="funcionamento">Clique duas vezes em um item para marcá-lo como completo</p>
                <input id="texto-tarefa" value={inputTarefa} type="text" name="inputTarefa" onChange={this.handleChange} />
                <button type="button" id="criar-tarefa" onClick={this.handleClick}>criar tarefa</button>
                <ol id="lista-tarefas">
                    {savedList.length > 0 && savedList.map((list) => (
                        <li key={list}>
                      {list}
                        </li>
                    ))}
                </ol>
            </>
        );
    }
}

export default Form;
