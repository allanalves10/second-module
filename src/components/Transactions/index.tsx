import { useEffect } from "react";
import { useTransactions } from "../../hooks/useTransactions";
import { Button, Container } from "./styles";

export function Transaction() {
    const { transactions } = useTransactions();

    function handleRemove(transaction: any) {

    }

    return(
        <Container>
            {transactions && transactions.length > 0 &&
                <table>
                    <thead>
                        <tr>
                            <th>Título</th>
                            <th>Valor</th>
                            <th>Categoria</th>
                            <th>Data</th>
                            <th>Editar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map(transaction => (
                            <tr key={transaction.id}>
                                <td>{transaction.title}</td>
                                <td className={transaction.type}>
                                    {new Intl.NumberFormat('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL'
                                }).format(transaction.amount)}</td>
                                <td>{transaction.category}</td>
                                <td>
                                    {new Intl.DateTimeFormat('pt-BR').format(new Date(transaction.createdAt))}
                                </td>
                                <td>
                                    <Button type="button" className="btn btn-warning" onClick={() => handleRemove(transaction)}>X</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }
        </Container>
    );
}