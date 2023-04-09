import {BarChart, Bar, XAxis, YAxis, Legend} from 'recharts'

const App = props => {
  const {coverageData} = props
  console.log(coverageData)
  const DataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }

  return (
    <BarChart
      width={1000}
      height={300}
      data={coverageData}
      margin={{
        top: 5,
      }}
    >
      <XAxis
        dataKey="vaccineDate"
        tick={{
          stroke: 'gray',
          strokeWidth: 1,
        }}
      />
      <YAxis
        tickFormatter={DataFormatter}
        tick={{
          stroke: 'gray',
          strokeWidth: 0,
        }}
      />
      <Legend
        wrapperStyle={{
          padding: 30,
        }}
      />
      <Bar dataKey="dose1" name="Dose 1" fill="#5a8dee" barSize="20%" />
      <Bar dataKey="dose2" name="Dose 2" fill="#f54394" barSize="20%" />
    </BarChart>
  )
}

export default App
