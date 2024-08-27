<script lang="ts">
  import { onMount } from 'svelte';
  import { supabase } from '$lib/supabaseClient';
  import type { Poll } from '$lib/types';
  // @ts-ignore
  import * as d3 from 'd3';


  let polls: Poll[] = [];

  // Data and dimensions
  let data = [
    { label: 'Red', value: 4 },
    { label: 'Blue', value: 20 },
    { label: 'Green', value: 30 },
    { label: 'Yellow', value: 40 }
  ];
  let width = 400;
  let height = 400;
  let radius = Math.min(width, height) / 2;

  async function loadPolls(): Promise<void> {
  const { data: pollsData, error } = await supabase
    .from('Polls')
    .select('*'); // Let Supabase infer the correct return type
  if (error) {
    console.error('Error loading polls:', error);
  } else {
    polls = pollsData ? pollsData : []; // Handle potential nulls
  }

  // Create SVG container
  const svg = d3.select("#chart")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    // Define the pie layout
    const pie = d3.pie<{ label: string; value: number }>()
      .value(d => d.value)
      .sort(null); // Disable sorting

    // Define the arc generator
    const arc = d3.arc<d3.PieArcDatum<{ label: string; value: number }>>()
      .outerRadius(radius - 10)
      .innerRadius(0);

    // Define color scale
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    // Create the pie chart slices
    const g = svg.selectAll(".arc")
      .data(pie(data))
      .enter().append("g")
      .attr("class", "arc");

    // Append the path for each slice
    g.append("path")
      .attr("d", arc)
      .style("fill", d => color(d.index.toString()));

    // Append labels to each slice
    g.append("text")
      .attr("transform", d => `translate(${arc.centroid(d)})`)
      .attr("dy", ".35em")
      .style("text-anchor", "middle")
      .text(d => d.data.label);

}

  onMount(loadPolls);
</script>

{#each polls as poll}
  <div>
    <p>{poll.title}</p>
  </div>
  {/each}
  
  <div id="chart"></div>

<style>
  #chart {
    display: block;
    margin: auto;
    text-align: center;
  }

  .arc path {
    stroke: #fff;
    stroke-width: 1px;
  }

  .arc text {
    font-size: 12px;
    fill: #fff;
  }
</style>