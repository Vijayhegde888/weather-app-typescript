import { useState, useEffect, ChangeEvent } from 'react'

import { optionType, forecastType ,fiveDaysType} from './../types/index'

const BASE_URL = 'http://api.openweathermap.org'

const useForecast = () => {
  const [city, setCity] = useState<optionType | null>(null)
  const [term, setTerm] = useState<string>('')
  const [options, setOptions] = useState<[]>([])
  const [forecast, setForecast] = useState<forecastType | null>(null)
  const [fiveDaysData, setFiveDayaData] = useState<fiveDaysType | null>(null)

  const getSearchOptions = async (term: string) => {
    fetch(
      `${BASE_URL}/geo/1.0/direct?q=${term.trim()}&limit=5&lang=en&appid=${
        process.env.REACT_APP_API_KEY
      }`
    )
      .then((res) => res.json())
      .then((data) => setOptions(data))
      .catch((e) => console.log({ e }))
  }

  const onSubmit = () => {
    if (!city) return

    getForecast(city)
  }

  const getForecast = (data: optionType) => {
    fetch(
      `${BASE_URL}/data/2.5/forecast?lat=${data.lat}&lon=${data.lon}&units=metric&lang=en&appid=${process.env.REACT_APP_API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log('full forcast data',data)

// get fiveDaysData only 
// const allDateWithHours=data.list?.map((ele:{ [x: string]: string } )=> ele.dt_txt.split(' ')[0])
//  const fiveDaysForcastData= allDateWithHours.filter((_: any,i: number,arr: { [x: string]: string })=> {
//     return arr[i].split('-')[2] !==  arr[i+1]?.split('-')[2] 
//   })

  data.list.forEach((ele:{ [x: string]: string } ) => {
    ele.dt_txt=ele.dt_txt.split(' ')[0] 
});
const fiveDaysForcastData= data.list?.filter((_: any,i: number,arr: { [x: string]: { dt_txt: string } })=> {
   return arr[i].dt_txt.split('-')[2] !==  arr[i+1]?.dt_txt.split('-')[2] 
 })
 
        const forecastData = {
          ...data.city,
          list: data.list.slice(0, 16),
        }
setFiveDayaData(fiveDaysForcastData)
        setForecast(forecastData)
      })
      .catch((e) => console.log({ e }))
  }

  const onOptionSelect = (option: optionType) => {
    setCity(option)
  }

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setTerm(e.target.value)

    if (value !== '') {
      getSearchOptions(value)
    }
  }

  useEffect(() => {
    if (city) {
      setTerm(city.name)
      setOptions([])
    }
  }, [city])

  return {
    forecast,
    fiveDaysData,
    options,
    term,
    onOptionSelect,
    onSubmit,
    onInputChange,
  }
}

export default useForecast