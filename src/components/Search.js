import React from "react";
import {FormControl} from "react-bootstrap";

function Search({searchByCurrencyName}) {

    return <FormControl className="mb-3"
    placeholder="Search"
    aria-label="Search"
    onKeyUp={event => searchByCurrencyName(event.currentTarget.value.toLowerCase())}
    />

}

export default Search;