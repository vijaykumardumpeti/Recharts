import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'

const App = props => {
  const {byAgeData} = props
  console.log(byAgeData)
  return (
    <ResponsiveContainer width={1000} height={400}>
      <PieChart>
        <Pie
          cx="50%"
          cy="40%"
          data={byAgeData}
          startAngle={0}
          endAngle={360}
          outerRadius="70%"
          dataKey="count"
        >
          <Cell name="18-44" fill="#2d87bb" />
          <Cell name="44-60" fill=" #a3df9f" />
          <Cell name="Above 60" fill="#64c2a6" />
        </Pie>

        <Legend
          iconType="circle"
          layout="horizontal"
          verticalAlign="end"
          align="center"
        />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default App
