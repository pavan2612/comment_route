import QuoteList from '../components/quotes/QuoteList';
import useHttp from '../components/hooks/use-http';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import { getAllQuotes } from '../components/lib/api';
import NoQuotesFound from '../components/quotes/NoQuotesFound'
import { useEffect } from 'react';


const AllQuotes = () => {
    const {sendRequest,status,data:dataLoading,error} =useHttp(getAllQuotes,true)
    useEffect(() => {
        sendRequest()
    },[sendRequest])
    
    if(status==='pending'){
        return(
        <div className='centered'><LoadingSpinner/></div>
        )}
    if(error){
        return(
        <div className='centered'>{error}</div>
        )}
    if(status==='completed' && (dataLoading.length===0 || !dataLoading)){
        return(
        <NoQuotesFound />
        )}
    return(
        <QuoteList quotes={dataLoading}/>
    )
}
export default AllQuotes