import { createContext, useEffect, useState, ReactNode, useContext } from 'react';
import { api } from './../services/api';

interface Transaction {
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createdAt: string;
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;
// type TransactionInput = Pick<Transaction, 'title' | 'amount' | 'type' | 'category'>;

interface TransactionsProviderProps {
    children: ReactNode;
}

interface TransactionsContextData {
    transactions : Transaction[],
    createTransaction: (transaction: TransactionInput) => Promise<void>;
}

const TransactionContext = createContext<TransactionsContextData>(
    {} as TransactionsContextData,
);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        if (localStorage.getItem('data')) {
            const transactionsStorage = JSON.parse(localStorage.getItem('data') || '[]');
            transactionsStorage.forEach((element: Transaction) => {
                element.id = Math.random();
            });
            setTransactions(transactionsStorage);
        } else {
            api.get('transactions').then(response => {
                setTransactions(response.data.transactions);
            })
        }
    }, []);

    async function createTransaction(transactionInput: TransactionInput) {

        const response = await api.post('/transactions', {
            ...transactionInput, 
            createdAt: new Date()
        });

        const { transaction } = response.data;

        setTransactions([
            ...transactions,
            transaction,
        ]);
    }

    return (
        <TransactionContext.Provider value={{transactions, createTransaction}}>
            { children }
        </TransactionContext.Provider>
    );
}

export function useTransactions() {
    const context = useContext(TransactionContext);

    return context;
}