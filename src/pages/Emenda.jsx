import Header from "../components/Header";
import css from "./Feriados.module.css";
import Modal from "react-modal";
import {useContext, useEffect, useState} from "react";
import { HiArchiveBoxXMark } from "react-icons/hi2";
import {Dados} from "../contexts/context";

Modal.setAppElement("#root");

export default function Emenda() {
    const [emenda, setEmenda] = useState([]);
    const [ignore, setIgnore] = useState(0);
    const [expandedIndex, setExpandedIndex] = useState(null);
    const { fetchData } = useContext(Dados);

    async function sendChange(id, checked) {
        console.log(id, checked)
        await fetchData("/emenda", "PUT", {"emenda": checked}, id)
        let resp = await fetchData("/emenda", "GET");
        setEmenda(resp.response);
    }

    function toggleExpansion(index) {
        setExpandedIndex(expandedIndex === index ? null : index);
    }

    useEffect(() => {
        const handleFeriado = async () => {
            let resp = await fetchData("/emenda", "GET");
            setEmenda(resp.response);
        };

        handleFeriado();
    }, [ignore]);


    return (
        <div className={css.td}>
            <Header />
            <div className={css.lista_feriados}>
                <div className={css.container}>
                    <h3 className={css.titulo}>Dias não letivos Cadastrados</h3>
                    <div className={css.listar_feriados}>
                        {emenda?.map((item_emenda, index) => (
                            <div key={index} className={css.feriado_item}>
                                <div className={css.itens2} onClick={() => toggleExpansion(index)}>
                                    <p>Nome: {item_emenda.nome}</p>
                                    <p>Data: {item_emenda.data_emenda}</p>
                                    <input onChange={(event) => sendChange(item_emenda.id, event.target.checked)} checked={item_emenda.emenda} type={"checkbox"}/>
                                </div>
                            </div>
                        ))}
                    </div>
                 </div>
            </div>
        </div>
    );}
