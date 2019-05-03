const URL_ENDPOINT = 'https://swapi.co/'
const ENDPOINTS = {
  LIST: `${URL_ENDPOINT}/starships`,
}

const startShipsMock = {
  "count": 37,
  "next": "https://swapi.co/api/starships/?page=2",
  "previous": null,
  "results": [
    {
      "name": "Executor",
      "model": "Executor-class star dreadnought",
      "manufacturer": "Kuat Drive Yards, Fondor Shipyards",
      "cost_in_credits": "1143350000",
      "length": "19000",
      "max_atmosphering_speed": "n/a",
      "crew": "279144",
      "passengers": "38000",
      "cargo_capacity": "250000000",
      "consumables": "6 years",
      "hyperdrive_rating": "2.0",
      "MGLT": "40",
      "starship_class": "Star dreadnought",
      "pilots": [],
      "films": [
        "https://swapi.co/api/films/2/",
        "https://swapi.co/api/films/3/"
      ],
      "created": "2014-12-15T12:31:42.547000Z",
      "edited": "2017-04-19T10:56:06.685592Z",
      "url": "https://swapi.co/api/starships/15/"
    },
    {
      "name": "Sentinel-class landing craft",
      "model": "Sentinel-class landing craft",
      "manufacturer": "Sienar Fleet Systems, Cyngus Spaceworks",
      "cost_in_credits": "240000",
      "length": "38",
      "max_atmosphering_speed": "1000",
      "crew": "5",
      "passengers": "75",
      "cargo_capacity": "180000",
      "consumables": "1 month",
      "hyperdrive_rating": "1.0",
      "MGLT": "70",
      "starship_class": "landing craft",
      "pilots": [],
      "films": [
        "https://swapi.co/api/films/1/"
      ],
      "created": "2014-12-10T15:48:00.586000Z",
      "edited": "2014-12-22T17:35:44.431407Z",
      "url": "https://swapi.co/api/starships/5/"
    }
  ]
}

export default {
  get: jest.fn((url) => {
    switch (url) {
      case ENDPOINTS.LIST:
        return Promise.resolve({
          data: startShipsMock
        })
      default:
        return Promise.resolve({
          data: {}
        })
    }
  }),
  post: jest.fn(() => Promise.resolve({ data: {} }))
}