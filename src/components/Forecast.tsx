import Degree from './Degree'


import { forecastType,fiveDaysType } from '../types'

type Props = {
  data: forecastType,
  fiveDaysData:fiveDaysType
}

const Forecast = ({ data,fiveDaysData  }: Props) => {
  
const formatDate =((date :string) =>{
  const currentDate = new Date(date);
  const dayOfMonth = currentDate.getDate();
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const monthIndex = currentDate.getMonth();
const monthName = monthNames[monthIndex].slice(0,3);
return `${dayOfMonth} ${monthName}`

} )


  const today = data.list[0]
  console.log('fiveDaysData in foreCast',fiveDaysData)

  return (
    <div className="w-full md:max-w-[500px] py-4 md:py-4 md:px-10 lg:px-24 h-full lg:h-auto bg-white bg-opacity-20 backdrop-blur-ls rounded drop-shadow-lg">
      <div className="mx-auto w-[300px]">
        <section className="text-center">
          <h2 className="text-2xl font-black">
            {data.name} <span className="font-thin">{data.country}</span>
          </h2>
          <h1 className="text-4xl font-extrabold">
            <Degree temp={Math.round(today.main.temp)} />
          </h1>
          <p className="text-sm">
            {today.weather[0].main} ({today.weather[0].description})
          </p>
          <p className="text-sm">
            H: <Degree temp={Math.ceil(today.main.temp_max)} /> L:{' '}
            <Degree temp={Math.floor(today.main.temp_min)} />
          </p>
        </section>

        {/* <section className="flex overflow-x-scroll mt-4 pb-2 mb-5"> */}
        <section className="flex mt-4 pb-2 mb-5">
      
          {fiveDaysData.map((item, i) => (
            <div
              key={i}
              className="inline-block text-center w-[50px] flex-shrink-0"
            >
              <p className="text-sm">
                {/* {i === 0 ? 'Now' : new Date(item.dt * 1000).getHours()} */}
                {i === 0 ? 'Today' : formatDate(item.dt_txt)}
              </p>
              <img
                alt={`weather-icon-weather`}
                src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
              />
              <p className="text-sm font-bold">
                <Degree temp={Math.round(item.main.temp)} />
              </p>
            </div>
          ))}
        </section>

       
      </div>
    </div>
  )
}

export default Forecast
