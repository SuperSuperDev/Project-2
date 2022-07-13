import axios from 'axios'
import React from 'react'
import { Link, useHistory } from 'react-router-dom'
// ! Added preloader
import Preloader from '../preloader/Preloader'


function Coins() {
  const history = useHistory()
  const [coins, setAllCoins] = React.useState(null)
  const [searchTerm, setSearchTerm] = React.useState('')

  React.useEffect(() => {
    // ! Added interval
    const interval = setInterval(() => {
      const getData = async () => {
        try {
          const response = await axios.get('https://api.coincap.io/v2/assets/')
          // const response = await axios.get('/api/coins')
          console.log(response.data)
          setAllCoins(response.data)
        } catch (err) {
          console.log('ERROR:>>', err)
          history.push('./error')
        }
      }
      getData()
    }, 15000)
    return () => clearInterval(interval)
  }, [coins, history])

  const handleInput = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleClear = () => {
    setSearchTerm('')
  }

  const filteredCoins = coins?.filter((coin) => { // ? was -  coins.data?.filter((coin) =>{
    return (
      coin.name.toLowerCase().includes(searchTerm) ||
      coin.rank.includes(searchTerm) ||
      coin.symbol.toLowerCase().includes(searchTerm)
    )
  })
  // ! Added Float Function
  const toFloat = (num, places) => Number.parseFloat(num).toFixed(places)

  console.log(searchTerm)

  return (
    // ! Added hero, placed search form into hero
    // ! Added css styling to search form
    <>
      <section className="hero is-primary">
        <div className="hero-body">
          <p className="title">Search Coins</p>
          <p className="subtitle">The top 100 coins by market cap</p>
          <div className="field is-grouped">
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Search by currency name, rank or symbol..."
                onChange={handleInput}
                value={searchTerm}
              />
            </div>
            <div className="control">
              <button className="button" onClick={handleClear}>
                Clear
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="section">
          <div className="columns is-multiline">
            {filteredCoins ? (
              console.log(coins),
              filteredCoins.map((coin) => (
                <div
                  className="column is-one-quarter-desktop is-one-third-tablet"
                  key={coin._id}
                >
                  <div className="card">
                    <Link to={`coins/${coin.id}`}>
                      <div className="card-header">
                        <div className="card-header-title">
                          {' '}
                          {coin.name} ({coin.symbol})
                        </div>
                      </div>
                      <div className="card-content is-flex is-horizontal-center">
                        <img // ! Added new img url
                          src={`https://assets.coincap.io/assets/icons/${coin.symbol.toLowerCase()}@2x.png`}
                        />
                      </div>
                      <div className="card-footer">
                        <span // ! Added Footer Items
                          className="card-footer-item"
                        >
                          Rank: # {coin.rank}
                        </span>
                        <span className="card-footer-item subtitle">
                          ${toFloat(coin.priceUsd, 2)}
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <>
                <Preloader />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Coins
