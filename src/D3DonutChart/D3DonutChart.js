import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { getBudgetData } from '../api/budgetAPI';

function D3DonutChart() {
  const svgRef = useRef();

  useEffect(() => {
    getBudgetData().then(data => {
      const width = 400, height = 400, radius = Math.min(width, height) / 2;

      const svg = d3.select(svgRef.current)
        .attr('width', width)
        .attr('height', height)
        .selectAll('*').remove(); // clear previous chart

      const g = d3.select(svgRef.current)
        .append('g')
        .attr('transform', `translate(${width / 2}, ${height / 2})`);

      const color = d3.scaleOrdinal(d3.schemeCategory10);
      const pie = d3.pie().value(d => d.budget)(data);
      const arc = d3.arc().innerRadius(radius * 0.5).outerRadius(radius * 0.8);

      g.selectAll('path')
        .data(pie)
        .join('path')
        .attr('d', arc)
        .attr('fill', (d, i) => color(i));
    });
  }, []);

  return <svg ref={svgRef}></svg>;
}

export default D3DonutChart;
