import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";
import ConfirmModal from "./ConfirmModal";
import InformModal from "./InformModal";
import { authHeader } from "../services/authServices";

const TableInstrutores = ({ instrutores, setInstrutores }) => {
    const [instrutorExcluir, setInstrutorExcluir] = useState(null);
    const [modal, setModal] = useState(undefined);

    function confirmarExclusao(instrutor) {
        setInstrutorExcluir(instrutor);
        const confirmModal = new bootstrap.Modal("#confirmModal", {});
        setModal(confirmModal);
        confirmModal.show();
    }

    function sexo(vSexo) {
        switch (vSexo) {
            case "M":
                return "Masculino";
            case "F":
                return "Feminino"
            default:
                return "Outro"
        }
    }

    function excluirInstrutor() {
        axios
            .delete(`http://localhost:8080/api/instrutores/${instrutorExcluir._id}`, { headers: authHeader() })
            .then((data) => {
                const instrutoresAtualizados = instrutores.filter((instrutor) => instrutor._id !== instrutorExcluir._id);
                setInstrutores(instrutoresAtualizados);
                modal.hide();
                const informModal = new bootstrap.Modal("#informModal", {});
                informModal.show();
            })
            .catch((error) => {
                console.log(error);
                modal.hide();
            });
    }

    return instrutores.length === 0 ? (
        <div className="alert alert-info">Nenhum instrutor cadastrado</div>
    ) : (
        <>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Data Nascimento</th>
                        <th>E-mail</th>
                        <th>Sexo</th>
                        <th>Situação</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {instrutores.map((instrutor) => (
                        <tr key={instrutor._id}>
                            <td>{instrutor.nome}</td>
                            <td>{new Date(instrutor.dataNascimento.substring(0, 10) + "T12:00:00").toLocaleDateString()}</td>
                            <td>{instrutor.email}</td>
                            <td>{sexo(instrutor.sexo)}</td>
                            <td>{instrutor.ativo ? "Ativo" : "Inativo"}</td>
                            <td>
                                <Link className="btn btn-sm btn-warning me-1" to={`/instrutores/alterar/${instrutor._id}`}>
                                    <i className="bi bi-pen"></i>
                                </Link>
                                <button className="btn btn-sm btn-danger" onClick={() => confirmarExclusao(instrutor)}>
                                    <i className="bi bi-trash"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <ConfirmModal question={`Deseja realmente excluir o instrutor <b>${instrutorExcluir?.nome}</b>?`} action={excluirInstrutor} />
            <InformModal info={`Instrutor <b>${instrutorExcluir?.nome}</b> excluído com sucesso.`} />
        </>
    );
};

export default TableInstrutores;
