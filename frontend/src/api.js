import axios from 'axios';
import React, { Fragment, useState } from 'react'

const  api = axios.create({
    baseURL: 'http://0.0.0.0:8000',
})

export default api;