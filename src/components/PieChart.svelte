<script lang="ts">
  import { onMount, afterUpdate } from 'svelte';
  import * as d3 from 'd3';
  import type { PieChartData } from '$lib/types';

  export let data: PieChartData[] = [];

  let svg: d3.Selection<SVGGElement, unknown, HTMLElement, any>;
  let arc: d3.Arc<any, d3.PieArcDatum<PieChartData>>;
  let labelArc: d3.Arc<any, d3.PieArcDatum<PieChartData>>;
  let pie: d3.Pie<unknown, PieChartData>;
  let color: d3.ScaleOrdinal<string, string>;

  const width = 400;
  const height = 400;
  const radius = Math.min(width, height) / 2;

  function drawChart() {
    // Clear existing content
    svg.selectAll('*').remove();

    const pieData = pie(data);

    svg.selectAll('path')
      .data(pieData)
      .enter().append('path')
      .attr('d', arc)
      .attr('fill', d => color(d.data.option))
      .attr('stroke', '#fff')
      .attr('stroke-width', '2px');

    svg.selectAll('text')
      .data(pieData)
      .enter().append('text')
      .attr('transform', d => `translate(${labelArc.centroid(d)})`)
      .attr('dy', '0.35em')
      .style('text-anchor', 'middle')
      .text(d => d.data.option);
  }

  onMount(() => {
    svg = d3.select('#pie-chart')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    color = d3.scaleOrdinal(d3.schemeCategory10);

    pie = d3.pie<PieChartData>()
      .value(d => d.vote_count)
      .sort(null);

    arc = d3.arc<d3.PieArcDatum<PieChartData>>()
      .outerRadius(radius - 10)
      .innerRadius(0);

    labelArc = d3.arc<d3.PieArcDatum<PieChartData>>()
      .outerRadius(radius - 40)
      .innerRadius(radius - 40);

    drawChart();
  });

  afterUpdate(() => {
    drawChart();  // Re-draw the chart whenever the data changes
  });
</script>

<svg id="pie-chart"></svg>

<style>
  svg {
    max-width: 100%;
  }
</style>
