import { Component, ElementRef, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-bar-chart',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.css',
})
export class BarChartComponent {
  @ViewChild('chart') private chartContainer: ElementRef | undefined;
  inputData: string = '';
  data: number[] = [];

  constructor(private snackBar: MatSnackBar) {}
  renderData() {
    this.data = this.inputData
      .split(',')
      .map((num) => Number(num.trim()))
      .filter((num) => !isNaN(num));

    if (this.inputData === '' || this.data.length === 0) {
      this.showError('Please check the data');
    } else {
      this.createBarChart();
    }
  }
  // Function to create a horizontal bar chart
  createBarChart() {
    // First, check if the chartContainer is defined
    if (!this.chartContainer?.nativeElement) {
      console.error('Chart container is not available.');
      return;
    }

    const element = this.chartContainer?.nativeElement;
    const margin = { top: 20, right: 30, bottom: 20, left: 40 };
    const width = 900 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Clear the chart container before rendering the new chart
    d3.select(element).selectAll('*').remove();

    const svg = d3
      .select(element)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Y axis (categories of data)
    const y = d3
      .scaleBand()
      .domain(this.data.map((d, i) => i.toString())) // Use indices as categories
      .range([0, height])
      .padding(0.3);

    // X axis (values of data)
    const x = d3
      .scaleLinear()
      .domain([0, d3.max(this.data) || 0]) // The values are mapped along the X axis
      .nice()
      .range([0, width]);

    svg
      .selectAll('.bar')
      .data(this.data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', 0) // Bars start at 0 on the X axis
      .attr('y', (d, i) => y(i.toString()) || 0) // Bars are aligned vertically along the Y axis
      .attr('width', (d) => x(d)) // The width of the bars is determined by the data value mapped to the X axis
      .attr('height', y.bandwidth()) // The height of the bars is the size of the band on the Y axis
      .attr('fill', 'steelblue');

    // Add the data labels inside the bars
    svg
      .selectAll('.bar-label')
      .data(this.data)
      .enter()
      .append('text')
      .attr('class', 'bar-label')
      .attr('x', (d) => x(d) - 10) // Position the text 10px from the end of the bar
      .attr('y', (d, i) => (y(i.toString()) ?? 0) + y.bandwidth() / 2) // Fallback to 0 if y(i.toString()) is undefined
      .attr('dy', '.35em') // Vertical alignment for the text
      .attr('text-anchor', 'end') // Align the text to the right (end of the bar)
      .attr('fill', 'white') // Set label text color to white
      .text((d) => d); // Display the value of each bar
  }
  showError(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000, // Duration in milliseconds
      verticalPosition: 'bottom', // Optional: position of snack bar
      horizontalPosition: 'right', // Optional: position of snack bar
      panelClass: ['error-snackbar'], // Optional: custom styling
    });
  }
}
