// Write your code here
import {PieChart, Pie, Legend, Cell} from 'recharts'

const VaccinationByGender = props => {
  const {byGenderData} = props
  console.log(byGenderData)

  const data = [...byGenderData].reverse()

  return (
    <PieChart width={1000} height={300}>
      <Pie
        cx="50%"
        cy="40%"
        data={data}
        startAngle={0}
        endAngle={180}
        innerRadius="40%"
        outerRadius="70%"
        dataKey="count"
      >
        <Cell name="Others" fill=" #2cc6c6" />
        <Cell name="Female" fill="#5a8dee" />
        <Cell name="Male" fill="#f54394" />
      </Pie>
      <Legend
        iconType="circle"
        layout="horizontal"
        verticalAlign="middle"
        align="center"
      />
    </PieChart>
  )
}

export default VaccinationByGender
