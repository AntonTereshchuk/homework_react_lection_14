import React, { useEffect, useState } from "react";
import Currency from "./Currency";
import { Table } from "react-bootstrap";
import Search from './Search';

function Currencies() {

    const [currencies, setCurrencies] = useState([]);
    const currentDate = new Date().toJSON().split('T')[0].replaceAll('-', '');
    const [filteredCurrencies, setFilteredCurrencies] = useState([]);
    const [searchValue, setSearchValue] = useState("");

    useEffect( () => {
        
        fetch(`https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=${currentDate}&json`).then(res => res.json()).then(data => {
       
            setCurrencies(data.map(currency => ({
                code: currency.r030,
                name: currency.txt,
                rate: currency.rate,
                exchangeDate: currency.exchangedate
            })));

        });

    }, []);

    function searchByCurrencyName(currentSearchValue) {
        
        const searchResult = currencies.filter(currency => currency.name.toLowerCase().includes(currentSearchValue));
        setFilteredCurrencies(searchResult);
        
        setSearchValue(currentSearchValue);

    }

    return <div>
        
        <Search searchByCountryName={searchByCurrencyName} />

        <Table striped bordered hover>
            <thead>
              <tr><th>Currency</th><th>Rate</th><th>Exchange date</th></tr>
            </thead>
            <tbody>
                {(searchValue.length ? filteredCurrencies : currencies).map(currency => <Currency currency={currency}/>)}
            </tbody>
        </Table>

    </div>;

}

export default Currencies;