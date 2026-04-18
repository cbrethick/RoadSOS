import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface TacticalMapProps {
  units: any[];
  incidents: any[];
}

export const TacticalMap: React.FC<TacticalMapProps> = ({ units, incidents }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;

    // Draw Grid
    const gridSize = 40;
    const gridGroup = svg.append('g').attr('class', 'grid');
    
    for (let x = 0; x <= width; x += gridSize) {
      gridGroup.append('line')
        .attr('x1', x).attr('y1', 0)
        .attr('x2', x).attr('y2', height)
        .attr('stroke', '#2A2D31')
        .attr('stroke-width', 0.5);
    }
    for (let y = 0; y <= height; y += gridSize) {
      gridGroup.append('line')
        .attr('x1', 0).attr('y1', y)
        .attr('x2', width).attr('y2', y)
        .attr('stroke', '#2A2D31')
        .attr('stroke-width', 0.5);
    }

    // Draw Concentric Circles
    const center = { x: width / 2, y: height / 2 };
    [100, 200, 300, 400].forEach(r => {
      svg.append('circle')
        .attr('cx', center.x)
        .attr('cy', center.y)
        .attr('r', r)
        .attr('fill', 'none')
        .attr('stroke', '#2A2D31')
        .attr('stroke-width', 1)
        .attr('stroke-dasharray', '4 4')
        .attr('opacity', 0.3);
    });

    // Draw Scanning Line (Radar)
    const radar = svg.append('line')
      .attr('x1', center.x)
      .attr('y1', center.y)
      .attr('x2', center.x)
      .attr('y2', center.y - 400)
      .attr('stroke', '#E53935')
      .attr('stroke-width', 2)
      .attr('opacity', 0.5);

    function rotateRadar() {
      radar.transition()
        .duration(4000)
        .ease(d3.easeLinear)
        .attrTween('transform', () => {
          return d3.interpolateString(`rotate(0, ${center.x}, ${center.y})`, `rotate(360, ${center.x}, ${center.y})`);
        })
        .on('end', rotateRadar);
    }
    rotateRadar();

    // Draw Units
    units.forEach((unit, i) => {
      const uGroup = svg.append('g')
        .attr('transform', `translate(${center.x + (i * 100 - 150)}, ${center.y + (i * 50 - 100)})`);

      uGroup.append('circle')
        .attr('r', 8)
        .attr('fill', unit.status === 'OnTask' ? '#FB8C00' : '#43A047')
        .attr('class', 'unit-node');

      uGroup.append('text')
        .attr('y', 20)
        .attr('text-anchor', 'middle')
        .attr('fill', '#8E9299')
        .attr('font-size', '8px')
        .attr('font-family', 'JetBrains Mono')
        .text(unit.id);
    });

    // Draw Incidents
    incidents.forEach((inc, i) => {
      const iGroup = svg.append('g')
        .attr('transform', `translate(${center.x + (i * 120 - 200)}, ${center.y - (i * 80 - 150)})`);

      iGroup.append('rect')
        .attr('x', -6)
        .attr('y', -6)
        .attr('width', 12)
        .attr('height', 12)
        .attr('fill', '#E53935')
        .attr('opacity', 0.8)
        .append('animate')
        .attr('attributeName', 'opacity')
        .attr('values', '0.8;0.2;0.8')
        .attr('dur', '1s')
        .attr('repeatCount', 'indefinite');

      iGroup.append('text')
        .attr('y', -12)
        .attr('text-anchor', 'middle')
        .attr('fill', '#E53935')
        .attr('font-size', '8px')
        .attr('font-weight', 'bold')
        .text(inc.id);
    });

  }, [units, incidents]);

  return (
    <svg ref={svgRef} className="w-full h-full" />
  );
};
