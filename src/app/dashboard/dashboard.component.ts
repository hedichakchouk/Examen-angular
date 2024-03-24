import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {StudentService} from "../../Services/student.service";
import {ChartOptions, ChartType} from "chart.js";
import {FlexModule} from "@angular/flex-layout";
import {BaseChartDirective, NgChartsModule} from "ng2-charts";


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FlexModule, NgChartsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements  OnInit{
  constructor(private studentService: StudentService) {
  }
  ngOnInit(): void {
    this.updateGenderCounts();
  }

  chartDataPie: any[] | undefined ; // Initialize as null

  chartLabelsPie: string[] =["female" , "male"];

  chartOptionsPie: any = {
    plugins: {
      legend: {
        display: true
      },
    }
  }

  updateGenderCounts(): void {
    this.studentService.getGenderCounts().subscribe({
      next: ({ maleCount, femaleCount }) => {
        // Transform the counts into an array
        this.chartDataPie = [
          {
            label: 'student',
            data: [femaleCount, maleCount],
            pointHitRadius: 15,
            pointHoverRadius: 8
          }
        ];
        console.log('Female count:', femaleCount);
        console.log('Male count:', maleCount);
      },
      error: (error) => {
        console.error('Error fetching gender counts:', error);
      }
    });
  }

  chartClicked(event: any): void {
    // Handle chart click event
  }

  chartHovered(event: any): void {
    // Handle chart hover event
  }
}

