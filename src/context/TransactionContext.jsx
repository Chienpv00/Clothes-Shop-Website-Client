import { createContext, useEffect, useState } from 'react'
import { contractABI, contractAddress } from '~/utils/constant'

const ethers = require('ethers')
export const TransactionContext = createContext()

const { ethereum } = window

const createEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(contractAddress, contractABI, signer)
    return contract
}

export const TransactionProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState('')

    const [transactionForm, setTransactionForm] = useState()

    const [loading, setLoading] = useState(false)

    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount') || 0)
    const [transactions, setTransactions] = useState([])

    const handleChange = (e, name) => {
        setTransactionForm((prevState) => ({ ...prevState, [name]: e.target.value }))
    }

    const checkIfWalletIsConnect = async () => {
        try {
            if (!ethereum) return alert('Please install MetaMask.')

            const accounts = await ethereum.request({ method: 'eth_accounts' })

            if (accounts.length) {
                setCurrentAccount(accounts[0])
                getAllTransactions()
            } else {
                console.log('No accounts found')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const checkIfTransactionsExists = async () => {
        try {
            if (ethereum) {
                const transactionsContract = createEthereumContract()
                const currentTransactionCount = await transactionsContract.getTransactionCount()

                window.localStorage.setItem('transactionCount', currentTransactionCount)
            }
        } catch (error) {
            console.log(error)

            throw new Error('No ethereum object')
        }
    }

    const connectWallet = async () => {
        try {
            if (!ethereum) return alert('Please install MetaMask.')

            const accounts = await ethereum.request({ method: 'eth_requestAccounts' })

            setCurrentAccount(accounts[0])
            window.location.reload()
        } catch (error) {
            console.log(error)

            throw new Error('No ethereum object')
        }
    }

    const getAllTransactions = async () => {
        try {
            if (ethereum) {
                const transactionsContract = createEthereumContract()

                const availableTransactions = await transactionsContract.getAllTransactions()

                console.log('availableTransactions', availableTransactions)
                const structuredTransactions = availableTransactions.map((transaction) => ({
                    addressTo: transaction.receiver,
                    addressFrom: transaction.sender,
                    timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
                    fullName: transaction.fullName,
                    deliveryAddress: transaction.deliveryAddress,
                    paymentMethod: transaction.paymentMethod,
                    phoneNumber: transaction.phoneNumber,
                    items: JSON.parse(transaction.items),
                    userId: transaction.userId,
                    orderStatus: transaction.orderStatus,
                }))

                console.log('structuredTransactions', structuredTransactions)

                setTransactions(structuredTransactions)
            } else {
                console.log('Ethereum is not present')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const sendTransaction = async () => {
        try {
            if (!ethereum) return alert('Please install MetaMask.')

            // get data from form
            const { fullName, phoneNumber, deliveryAddress, paymentMethod, items, userId, orderStatus } = transactionForm;
            const transactionsContract = createEthereumContract()

            await ethereum.request({
                method: 'eth_sendTransaction',
                params: [
                    {
                        from: currentAccount,
                        to: '0xa514E61D90b9C699aC5fd99dedc5AA55B45e4318',
                        gas: '0x5208',
                    },
                ],
            })

            const transactionHash = await transactionsContract.addToBlockchain(
                '0xa514E61D90b9C699aC5fd99dedc5AA55B45e4318',
                fullName,
                phoneNumber,
                deliveryAddress,
                paymentMethod,
                items,
                userId,
                orderStatus
            )

            setLoading(true)
            await transactionHash.wait()
            setLoading(false)
            console.log('Transaction hash: ', transactionHash)

            const transactionsCount = await transactionsContract.getTransactionCount()

            setTransactionCount(transactionsCount.toNumber())

            window.location.reload()
        } catch (error) {
            console.log(error)
            throw new Error('No ethereum object')
        }
    }

    useEffect(() => {
        checkIfWalletIsConnect()
        checkIfTransactionsExists()
    }, [transactionCount])

    return (
        <TransactionContext.Provider
            value={{
                connectWallet,
                currentAccount,
                transactionForm,
                setTransactionForm,
                handleChange,
                sendTransaction,
                transactions,
                getAllTransactions,
            }}
        >
            {children}
        </TransactionContext.Provider>
    )
}

window.ethereum.request({ method: 'eth_requestAccounts' })
