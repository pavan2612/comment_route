import { Fragment, useEffect } from "react"
import { Link, Route,useParams, useRouteMatch } from "react-router-dom"
import Comments from '../components/comments/Comments'
import HighlightedQuote from '../components/quotes/HighlightedQuote'
import useHttp from "../components/hooks/use-http"
import { getSingleQuote } from "../components/lib/api"
import LoadingSpinner from "../components/UI/LoadingSpinner"
import NoQuotesFound from "../components/quotes/NoQuotesFound"


const QuoteDetails = () => {
    const params = useParams()
    const {quoteId} = params
    console.log(quoteId)
    const match = useRouteMatch()
    const {sendRequest,status,data:loadedQuote,error} = useHttp(getSingleQuote,true)
    
    useEffect(() => {
        sendRequest(quoteId)
    },[sendRequest,quoteId])

    console.log('pending')

    if(status==='pending'){
        return(
        <div className='centered'><LoadingSpinner /></div>
        )}

    console.log('error')
    if(status==='error'){
        return(
        <div className='centered'>{error}</div>
        )}

    console.log('text')
    if(!loadedQuote.text){
        return(
        <div className='centered'><NoQuotesFound/></div>
        )}
    console.log('quoteId')
    console.log(match)

    return(
        <Fragment>
            <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author}/>
            <Route path={match.path} exact>
                <div className='centered'>
                    <Link className='btn--flat' to={`${match.url}/comments`}>Load Comments</Link>
                </div>
            </Route>
            <Route path={`${match.path}/comments`}>
                <Comments />
            </Route>
        </Fragment>
    )
}
export default QuoteDetails