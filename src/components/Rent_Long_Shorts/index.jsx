import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { useSelector } from "react-redux";
import "./Rent_Long_Shorts.css"

const Rent_Long_Shorts = () => {
  const operations = useSelector((state) => state.operations || []);

  const tiposLong = ["long", "En largo", "Largo", "largo"];
  const tiposShort = ["short", "En corto", "Corto", "corto"];

  
  const totalLong = operations
    .filter((op) => tiposLong.includes(op.tipo || op.posicion || op.posición))
    .reduce((acc, op) => acc + Number(op.ganancia || 0), 0);

  const totalShort = operations
    .filter((op) => tiposShort.includes(op.tipo || op.posicion || op.posición))
    .reduce((acc, op) => acc + Number(op.ganancia || 0), 0);

  const chartData = [
    {
      name: "Long",
      Rentabilidad: totalLong,
    },
    {
      name: "Short",
      Rentabilidad: totalShort,
    },
  ];

  return (
    <div className="containerRent mb-4">
      <ResponsiveContainer width="100%" height={300}>
        <h3 className="text-white text-center">
          Rent Longs y Shorts
        </h3>

        <BarChart
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip
            contentStyle={{ backgroundColor: "#000", color: "#fff" }}
            labelStyle={{ color: "#fff" }}
            itemStyle={{ color: "#fff" }}
          />
          <Legend />
          <ReferenceLine y={0} stroke="#000" />
          <Bar dataKey="Rentabilidad" fill="#fff">
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.Rentabilidad < 0 ? "#838383" : "white"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Rent_Long_Shorts;
