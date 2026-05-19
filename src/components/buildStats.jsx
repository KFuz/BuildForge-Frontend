import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function BuildStats({ build, items }) {
  const budget = Number(build.budget) || 0;

  const purchasedItems = items.filter((item) => {
    return item.status === "Purchased";
  });

  const notPurchasedItems = items.filter((item) => {
    return item.status === "Not purchased";
  });

  const spent = purchasedItems.reduce((total, item) => {
    return total + (Number(item.cost) || 0);
  }, 0);

  const leftToBuy = notPurchasedItems.reduce((total, item) => {
    return total + (Number(item.cost) || 0);
  }, 0);

  const remaining = budget - spent;

  const chartData = [
    { name: "Budget", amount: budget },
    { name: "Spent", amount: spent },
    { name: "Left To Buy", amount: leftToBuy },
    { name: "Remaining", amount: remaining },
  ];

  return (
    <div>
      <h2>Build Stats</h2>

      <p>Budget: {budget} BHD</p>
      <p>Spent: {spent} BHD</p>
      <p>Left To Buy: {leftToBuy} BHD</p>
      <p>Remaining: {remaining} BHD</p>

      <p>Purchased Items: {purchasedItems.length}</p>
      <p>Not Purchased Items: {notPurchasedItems.length}</p>

      <div style={{ width: "50%", height: "150px" }}>
        <ResponsiveContainer>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default BuildStats;