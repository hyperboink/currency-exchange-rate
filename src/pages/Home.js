import React, {useState, useEffect, useRef} from 'react'
import axios from 'axios'

export default function Home() {

    const [data, setData] = useState([])
    const selectCurrencyRef = useRef()
    const BASE_RATES_URL = 'https://open.er-api.com/v6/latest'
    const CURRENCY_KEY = 'currency-key'
    const storedCurrency = localStorage.getItem(CURRENCY_KEY);

    useEffect(() => {
        axios.get(BASE_RATES_URL + (storedCurrency ? '/' + storedCurrency : ''))
            .then((res) => setData(res.data)).catch((err) => console.log(err));
    }, [storedCurrency])

    function handleSelectCurrency(e){
        const currency = selectCurrencyRef.current.value;

        if(currency){
            axios.get(BASE_RATES_URL + '/' + currency)
                .then((res) => {
                    setData(res.data);
                    localStorage.setItem(CURRENCY_KEY, currency);
                }).catch((err) => console.log(err));
        }
    }

    return (
        <div className="page flex">
            <div className="panel-left">
                <select className="select-currency" ref={selectCurrencyRef} onChange={handleSelectCurrency}>
                    {data.rates ? Object.entries(data.rates).map(([key, value]) => <option key={key} value={key} >{key}</option>) : ''}
                </select>

                <div className="exchange-rate-lists">
                        <div className="exchange-rate-list-item">
                            <div><strong>CURRENCY</strong></div>
                            <div><strong>VALUE</strong></div>
                        </div>
                    {data.rates ? Object.entries(data.rates).map(([key, value]) => {
                        return(
                            <div className="exchange-rate-list-item" key={key}>
                                <div>{key}</div>
                                <div>{value}</div>
                            </div>
                        )
                    }) : ''}
                </div>
            </div>

            <div className="panel-right">
                <div className="panel-right-text">
                    <span className="base-currency">Base currency is <strong>{data.base_code}</strong></span><br/>
                    <span>Last update: {new Date(data.time_last_update_utc).toLocaleDateString("en-US")}</span><br/>
                    <span>Next update: {new Date(data.time_next_update_utc).toLocaleDateString("en-US")}</span>
                </div>
            </div>
        </div>
    )
}
