import QuoteForm from "../components/quotes/QuoteForm"
import { useHistory } from "react-router-dom"
import useHttp from "../components/hooks/use-http"
import { addQuote } from "../components/lib/api"
import { useEffect } from "react"

const NewQuote= () => {
    const {sendRequest,status} = useHttp(addQuote)
    const history = useHistory()

    const quoteHandler = (quoteData) => {
        sendRequest(quoteData)
    }
    useEffect(() => {
        if(status==='completed'){
            history.push('/quotes')
        }
    },[status,history])

    return(
        <QuoteForm isLoading={status==='pending'} onAddQuote={quoteHandler}/>
    )
}
export default NewQuote