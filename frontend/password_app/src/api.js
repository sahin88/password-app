import axios from 'axios';
import React, { Fragment, useState } from 'react'

const  api = axios.create({
    baseURL: 'http://localhost:8080',
})

export default api;