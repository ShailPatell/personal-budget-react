import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { getBudgetData } from '../api/budgetAPI';

function D3DonutChart() {
  const svgRef = useRef();

  useEffect(() => {
    getBudgetData().then(data => {
      const width = 400;
      const height = 400;
      const radius = Math.min(width, height) / 2;

      const svg = d3.select(svgRef.current)
        .attr('width', width)
        .attr('height', height);

      // Clear previous chart
      svg.selectAll('*').remove();

      const g = svg.append('g')
        .attr('transform', `translate(${width / 2}, ${height / 2})`);

      const color = d3.scaleOrdinal(d3.schemeCategory10);

      const pie = d3.pie()
        .value(d => d.budget)
        (data);

      const arc = d3.arc()
        .innerRadius(radius * 0.5)  // donut hole
        .outerRadius(radius * 0.8);

      // Draw arcs
      g.selectAll('path')
        .data(pie)
        .join('path')
        .attr('d', arc)
        .attr('fill', (d, i) => color(i))
        .attr('stroke', 'white')
        .attr('stroke-width', 2);

      // Optional: add labels
      const labelArc = d3.arc()
        .innerRadius(radius * 0.85)
        .outerRadius(radius * 0.85);

      g.selectAll('text')
        .data(pie)
        .join('text')
        .attr('transform', d => `translate(${labelArc.centroid(d)})`)
        .attr('text-anchor', 'middle')
        .attr('alignment-baseline', 'middle')
        .style('font-size', '12px')
        .text(d => d.data.title);
    });
  }, []);

  return <svg ref={svgRef}></svg>;
}

export default D3DonutChart;
