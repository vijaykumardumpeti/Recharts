import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const CustomBar = props => {
  const {fill, x, y, width, height} = props
  const radius = 7

  return (
    <path
      d={`M${x},${y + radius} 
              A${radius},${radius} 0 0 1 ${x + radius},${y} 
              L${x + width - radius},${y} 
              A${radius},${radius} 0 0 1 ${x + width},${y + radius} 
              L${x + width},${y + height} 
              L${x},${y + height} Z`}
      fill={fill}
    />
  )
}

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
    <ResponsiveContainer width="100%" height={500}>
      <BarChart
        width={1000}
        height={300}
        borderRadius={10}
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
        <Bar
          dataKey="dose1"
          name="Dose 1"
          fill="#5a8dee"
          barSize="20%"
          shape={<CustomBar />}
        />
        <Bar
          dataKey="dose2"
          name="Dose 2"
          fill="#f54394"
          barSize="20%"
          shape={<CustomBar />}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default App
