import { Box, Text } from "@chakra-ui/react";
import axios from "axios";

import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";

const Result = () => {
  const [user, setUser] = useState("");
  const [singleResult, setSingleResult] = useState([]);

  const fetchSingleResult = () => {
    return axios.get(`http://localhost:3000/api/results`);
    // return axios.get(`http://localhost:3000/api/results?name=${user}`);
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["IndividualResult"],
    queryFn: () => fetchSingleResult(),
  });

  useEffect(() => {
    setUser(sessionStorage.getItem("username"));
    // setSingleResult(data?.data[user]);
    // console.log(data?.data);
    // const unique = [...new Set(data?.data[user].map((item) => item.question))];

    const uniqueResult = [
      ...new Map(
        data?.data[user].map((item) => [item["question"], item])
      ).values(),
    ];
    setSingleResult(uniqueResult);

    return () => {};
  }, [data]);

  if (isLoading) return "Loading...";

  return (
    <Box width="100vw" height="100vh" display="grid" placeItems="center">
      Show Result Here of User: {user}
      {singleResult && (
        <ResponsiveBar
          data={graphData}
          keys={["hot dog", "burger", "sandwich", "kebab", "fries", "donut"]}
          indexBy="country"
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          padding={0.3}
          valueScale={{ type: "linear" }}
          indexScale={{ type: "band", round: true }}
          colors={{ scheme: "nivo" }}
          defs={[
            {
              id: "dots",
              type: "patternDots",
              background: "inherit",
              color: "#38bcb2",
              size: 4,
              padding: 1,
              stagger: true,
            },
            {
              id: "lines",
              type: "patternLines",
              background: "inherit",
              color: "#eed312",
              rotation: -45,
              lineWidth: 6,
              spacing: 10,
            },
          ]}
          fill={[
            {
              match: {
                id: "fries",
              },
              id: "dots",
            },
            {
              match: {
                id: "sandwich",
              },
              id: "lines",
            },
          ]}
          borderColor={{
            from: "color",
            modifiers: [["darker", 1.6]],
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "country",
            legendPosition: "middle",
            legendOffset: 32,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "food",
            legendPosition: "middle",
            legendOffset: -40,
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{
            from: "color",
            modifiers: [["darker", 1.6]],
          }}
          legends={[
            {
              dataFrom: "keys",
              anchor: "bottom-right",
              direction: "column",
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: "left-to-right",
              itemOpacity: 0.85,
              symbolSize: 20,
              effects: [
                {
                  on: "hover",
                  style: {
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
          role="application"
          ariaLabel="Nivo bar chart demo"
          barAriaLabel={(e) =>
            e.id + ": " + e.formattedValue + " in country: " + e.indexValue
          }
        />
      )}
    </Box>
  );
};

export const graphData = [
  {
    country: "AD",
    "hot dog": 134,
    "hot dogColor": "hsl(282, 70%, 50%)",
    burger: 56,
    burgerColor: "hsl(104, 70%, 50%)",
    sandwich: 45,
    sandwichColor: "hsl(87, 70%, 50%)",
    kebab: 22,
    kebabColor: "hsl(302, 70%, 50%)",
    fries: 47,
    friesColor: "hsl(176, 70%, 50%)",
    donut: 46,
    donutColor: "hsl(343, 70%, 50%)",
  },
  {
    country: "AE",
    "hot dog": 101,
    "hot dogColor": "hsl(164, 70%, 50%)",
    burger: 126,
    burgerColor: "hsl(107, 70%, 50%)",
    sandwich: 42,
    sandwichColor: "hsl(304, 70%, 50%)",
    kebab: 110,
    kebabColor: "hsl(153, 70%, 50%)",
    fries: 175,
    friesColor: "hsl(10, 70%, 50%)",
    donut: 186,
    donutColor: "hsl(34, 70%, 50%)",
  },
  {
    country: "AF",
    "hot dog": 114,
    "hot dogColor": "hsl(177, 70%, 50%)",
    burger: 62,
    burgerColor: "hsl(329, 70%, 50%)",
    sandwich: 102,
    sandwichColor: "hsl(242, 70%, 50%)",
    kebab: 52,
    kebabColor: "hsl(66, 70%, 50%)",
    fries: 174,
    friesColor: "hsl(91, 70%, 50%)",
    donut: 85,
    donutColor: "hsl(298, 70%, 50%)",
  },
  {
    country: "AG",
    "hot dog": 29,
    "hot dogColor": "hsl(307, 70%, 50%)",
    burger: 124,
    burgerColor: "hsl(38, 70%, 50%)",
    sandwich: 4,
    sandwichColor: "hsl(240, 70%, 50%)",
    kebab: 71,
    kebabColor: "hsl(350, 70%, 50%)",
    fries: 67,
    friesColor: "hsl(355, 70%, 50%)",
    donut: 200,
    donutColor: "hsl(246, 70%, 50%)",
  },
  {
    country: "AI",
    "hot dog": 180,
    "hot dogColor": "hsl(308, 70%, 50%)",
    burger: 192,
    burgerColor: "hsl(268, 70%, 50%)",
    sandwich: 115,
    sandwichColor: "hsl(183, 70%, 50%)",
    kebab: 28,
    kebabColor: "hsl(335, 70%, 50%)",
    fries: 56,
    friesColor: "hsl(54, 70%, 50%)",
    donut: 129,
    donutColor: "hsl(197, 70%, 50%)",
  },
  {
    country: "AL",
    "hot dog": 192,
    "hot dogColor": "hsl(274, 70%, 50%)",
    burger: 130,
    burgerColor: "hsl(115, 70%, 50%)",
    sandwich: 124,
    sandwichColor: "hsl(282, 70%, 50%)",
    kebab: 103,
    kebabColor: "hsl(222, 70%, 50%)",
    fries: 151,
    friesColor: "hsl(337, 70%, 50%)",
    donut: 92,
    donutColor: "hsl(143, 70%, 50%)",
  },
  {
    country: "AM",
    "hot dog": 123,
    "hot dogColor": "hsl(98, 70%, 50%)",
    burger: 32,
    burgerColor: "hsl(256, 70%, 50%)",
    sandwich: 4,
    sandwichColor: "hsl(341, 70%, 50%)",
    kebab: 63,
    kebabColor: "hsl(73, 70%, 50%)",
    fries: 129,
    friesColor: "hsl(94, 70%, 50%)",
    donut: 181,
    donutColor: "hsl(196, 70%, 50%)",
  },
];

export default Result;
