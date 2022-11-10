const express = require('express')
const router = express.Router()
const { getSearchResults, setSearch } = require('../controllers/searchController')

router.route("/").get(getSearchResults).post(setSearch)

module.exports = router