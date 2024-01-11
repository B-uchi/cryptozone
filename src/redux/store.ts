import {configureStore} from "@reduxjs/toolkit"

import {cryptocurrencyApi} from "../services/cryptocurrencyAPI"

export default configureStore({
    reducer: {
        [cryptocurrencyApi.reducerPath]: cryptocurrencyApi.reducer
    }
})